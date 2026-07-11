#!/usr/bin/env bash

set -euo pipefail

DOMAIN="${1:-mhc-gc.com}"
AUTODISCOVER_HOST="${2:-autodiscover.${DOMAIN}}"

green='\033[0;32m'
yellow='\033[1;33m'
red='\033[0;31m'
reset='\033[0m'

pass() { echo -e "${green}PASS${reset}  $1"; }
warn() { echo -e "${yellow}WARN${reset}  $1"; }
fail() { echo -e "${red}FAIL${reset}  $1"; }

has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

txt_lookup() {
  local host="$1"
  if has_cmd dig; then
    dig +short TXT "${host}" | tr -d '"'
    return 0
  fi
  if has_cmd nslookup; then
    nslookup -type=TXT "${host}" 2>/dev/null \
      | sed -n 's/.*text = "\(.*\)"/\1/p'
    return 0
  fi
  return 1
}

cname_lookup() {
  local host="$1"
  if has_cmd dig; then
    dig +short CNAME "${host}" | sed 's/\.$//'
    return 0
  fi
  if has_cmd nslookup; then
    nslookup -type=CNAME "${host}" 2>/dev/null \
      | sed -n 's/.*canonical name = \([^ ]*\)\.?$/\1/p'
    return 0
  fi
  return 1
}

a_lookup() {
  local host="$1"
  if has_cmd dig; then
    dig +short A "${host}"
    return 0
  fi
  if has_cmd getent; then
    getent ahostsv4 "${host}" 2>/dev/null | awk '{print $1}' | sort -u
    return 0
  fi
  if has_cmd nslookup; then
    nslookup "${host}" 2>/dev/null | awk '/^Address: / {print $2}'
    return 0
  fi
  return 1
}

echo "Cloudflare Phase 1 quick check"
echo "Domain: ${DOMAIN}"
echo "Autodiscover host: ${AUTODISCOVER_HOST}"
echo

# 1) security.txt must resolve with HTTP 200 and contain a Contact line.
tmp_file="$(mktemp)"
http_code="$(curl -sS -L -A "MH-Security-Check/1.0" -o "${tmp_file}" -w "%{http_code}" "https://${DOMAIN}/.well-known/security.txt" || true)"
if [[ "${http_code}" == "200" ]]; then
  if grep -qi '^Contact:' "${tmp_file}"; then
    pass "security.txt reachable and contains Contact"
  else
    warn "security.txt reachable but missing Contact line"
  fi
elif [[ "${http_code}" == "403" ]]; then
  warn "security.txt returned HTTP 403 (likely bot/WAF challenge). Verify from browser and Cloudflare Security Events."
else
  fail "security.txt not reachable at https://${DOMAIN}/.well-known/security.txt (HTTP ${http_code:-unknown})"
fi
rm -f "${tmp_file}"

# 2) SPF should be exactly one record at root.
if has_cmd dig || has_cmd nslookup; then
  spf_records="$(txt_lookup "${DOMAIN}" | grep -i '^v=spf1' || true)"
  spf_count="$(printf "%s\n" "${spf_records}" | sed '/^$/d' | wc -l | tr -d ' ')"
  if [[ "${spf_count}" == "1" ]]; then
    pass "exactly one SPF record at ${DOMAIN}"
    echo "      ${spf_records}"
  elif [[ "${spf_count}" == "0" ]]; then
    fail "no SPF record found at ${DOMAIN}"
  else
    fail "multiple SPF records found at ${DOMAIN} (${spf_count})"
    printf "%s\n" "${spf_records}" | sed 's/^/      /'
  fi
else
  warn "neither dig nor nslookup is available; skipping SPF check"
fi

# 3) DMARC should exist at _dmarc.<domain>.
if has_cmd dig || has_cmd nslookup; then
  dmarc_record="$(txt_lookup "_dmarc.${DOMAIN}" | grep -i 'v=DMARC1' || true)"
  if [[ -n "${dmarc_record}" ]]; then
    pass "DMARC record found at _dmarc.${DOMAIN}"
    echo "      ${dmarc_record}"
  else
    fail "no DMARC record found at _dmarc.${DOMAIN}"
  fi
else
  warn "neither dig nor nslookup is available; skipping DMARC check"
fi

# 4) Autodiscover should generally remain DNS-only for Outlook.
autodiscover_cname="$(cname_lookup "${AUTODISCOVER_HOST}" || true)"
if [[ -n "${autodiscover_cname}" ]]; then
  pass "${AUTODISCOVER_HOST} resolves as CNAME (${autodiscover_cname}); typically DNS-only"
else
  autodiscover_a="$(a_lookup "${AUTODISCOVER_HOST}" || true)"
  if [[ -n "${autodiscover_a}" ]]; then
    warn "${AUTODISCOVER_HOST} does not expose CNAME directly (possible proxy or flattening). Verify in Cloudflare DNS that mail hosts remain DNS-only."
    printf "%s\n" "${autodiscover_a}" | sed 's/^/      A: /'
  else
    warn "${AUTODISCOVER_HOST} has no public CNAME/A response. Verify DNS record manually."
  fi
fi

echo
echo "Tip: This script validates public DNS/HTTP state only."
echo "     Managed Rules, Bot Fight Mode, and MFA must still be confirmed in Cloudflare dashboard."
