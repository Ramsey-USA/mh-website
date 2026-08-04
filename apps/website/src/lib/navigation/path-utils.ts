export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function toSafeErrorContext(error: Error & { digest?: string }) {
  return {
    errorName: error.name,
    digest: error.digest ?? null,
  };
}
