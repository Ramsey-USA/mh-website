"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CDN_TEAM_OPTIONS,
  normalizeCdnVoteId,
} from "@/lib/events/cool-desert-nights";

interface BbqTally {
  id: string;
  label: string;
  count: number;
}

interface HiltiEntry {
  name: string;
  phone: string;
  guess: number;
}

interface Results {
  totalEntries: number;
  bbqTallies: BbqTally[];
  hiltiEntries: HiltiEntry[];
}

interface CachedEventEntry {
  fullName?: string;
  phone?: string;
  email?: string;
  hiltiguess?: number;
  bbqVote?: string;
  cachedAt?: string;
}

const LS_ENTRY_PREFIX = "cdn26_entry_";

function readCachedEntries(): CachedEventEntry[] {
  if (typeof window === "undefined") return [];

  const entries: CachedEventEntry[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index) ?? "";
    if (!key.startsWith(LS_ENTRY_PREFIX)) continue;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as CachedEventEntry;
      entries.push(parsed);
    } catch {
      // Ignore malformed cache entries.
    }
  }
  return entries;
}

function mergeResultsWithCache(
  results: Results,
  cachedEntries: CachedEventEntry[],
): Results {
  if (cachedEntries.length === 0) return results;

  const bbqCounts = new Map<string, number>();
  for (const tally of results.bbqTallies) {
    bbqCounts.set(tally.id, tally.count);
  }

  const seenPhone = new Set<string>();
  const mergedHilti: HiltiEntry[] = [...results.hiltiEntries];
  for (const entry of results.hiltiEntries) {
    if (entry.phone) seenPhone.add(entry.phone);
  }

  for (const cached of cachedEntries) {
    const phone = String(cached.phone ?? "").trim();
    if (!phone || seenPhone.has(phone)) continue;

    const voteId = normalizeCdnVoteId(String(cached.bbqVote ?? ""));
    if (voteId) {
      bbqCounts.set(voteId, (bbqCounts.get(voteId) ?? 0) + 1);
    }

    const guess = Number(cached.hiltiguess ?? 0);
    if (Number.isFinite(guess) && guess > 0) {
      mergedHilti.push({
        name: String(cached.fullName ?? "").trim() || "Cached entry",
        phone,
        guess,
      });
      seenPhone.add(phone);
    }
  }

  const mergedTallies = CDN_TEAM_OPTIONS.map((team) => ({
    id: team.id,
    label: team.label,
    count: bbqCounts.get(team.id) ?? 0,
  })).sort((a, b) => b.count - a.count);

  mergedHilti.sort((a, b) => a.guess - b.guess);

  return {
    totalEntries: Math.max(results.totalEntries, mergedHilti.length),
    bbqTallies: mergedTallies,
    hiltiEntries: mergedHilti,
  };
}

export default function EventResultsPage() {
  const [password, setPassword] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [actualCount, setActualCount] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/event/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.status === 401) {
        setError("Wrong password. Try again.");
        return;
      }
      if (!res.ok) {
        setError(
          "Something went wrong. Check that the site is deployed with D1.",
        );
        return;
      }
      const data = (await res.json()) as Results;

      const cachedEntries = readCachedEntries();
      setResults(mergeResultsWithCache(data, cachedEntries));
    } catch {
      setError("Network error — check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // Determine Hilti winner given an actual count
  const hiltiWinner =
    results && actualCount.trim()
      ? results.hiltiEntries.reduce(
          (best, entry) => {
            const diff = Math.abs(entry.guess - Number(actualCount));
            return diff < best.diff ? { entry, diff } : best;
          },
          { entry: results.hiltiEntries[0], diff: Infinity },
        ).entry
      : null;

  if (!results) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl dark:bg-white/5">
          <p className="text-xs font-black uppercase tracking-widest text-brand-secondary">
            Cool Desert Nights 2026
          </p>
          <h1 className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
            Event Results
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
            Enter the admin password to view live results.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-12 w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-brand-secondary focus:outline-none dark:border-white/25 dark:bg-white/8 dark:text-white"
              required
            />
            {error && (
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="min-h-12 w-full rounded-xl bg-brand-primary text-base font-bold text-white transition hover:bg-brand-primary-dark disabled:opacity-50"
            >
              {loading ? "Loading…" : "View Results →"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const topBbq = results.bbqTallies[0];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-secondary">
            Cool Desert Nights 2026 — Live Results
          </p>
          <h1 className="mt-1 text-3xl font-black text-gray-900 dark:text-white">
            {results.totalEntries} Entries
          </h1>
          <button
            onClick={() => setResults(null)}
            className="mt-2 text-xs text-gray-400 underline hover:text-gray-600 dark:text-white/40"
          >
            Sign out
          </button>
        </div>

        {/* BBQ Vote Tallies */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-white/20 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-brand-secondary">
              People's Choice BBQ Vote
            </h2>
            <Image
              src="/images/vendors/sunshine-cleaners-logo.webp"
              alt="Sunshine Cleaning Services logo"
              width={132}
              height={40}
              className="h-auto w-24 sm:w-32"
            />
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/50">
            Deduplicated by phone — first entry wins
          </p>
          <div className="mt-4 space-y-3">
            {results.bbqTallies.map((team, i) => {
              const pct =
                results.totalEntries > 0
                  ? Math.round((team.count / results.totalEntries) * 100)
                  : 0;
              const isLeader = i === 0 && team.count > 0;
              return (
                <div key={team.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`font-semibold ${isLeader ? "text-brand-secondary" : "text-gray-700 dark:text-white/80"}`}
                    >
                      {isLeader ? "🏆 " : ""}
                      {team.label}
                    </span>
                    <span className="font-black text-gray-900 dark:text-white">
                      {team.count} ({pct}%)
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all ${isLeader ? "bg-brand-secondary" : "bg-brand-primary/50"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {topBbq && topBbq.count > 0 && (
            <p className="mt-4 rounded-xl bg-brand-secondary/10 px-4 py-3 text-sm font-bold text-brand-secondary">
              Current winner: {topBbq.label} with {topBbq.count} vote
              {topBbq.count !== 1 ? "s" : ""}
            </p>
          )}
        </section>

        {/* Hilti Winner Finder */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-white/20 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-brand-secondary">
              Hilti Fastener Jar Challenge
            </h2>
            <Image
              src="/images/vendors/hilti-logo-red-text.webp"
              alt="Hilti red logo"
              width={120}
              height={32}
              className="h-auto w-24 sm:w-28"
            />
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/50">
            Enter the actual count to find the closest guess
          </p>
          <div className="mt-4 flex gap-3">
            <input
              type="number"
              min={1}
              max={9999}
              placeholder="Actual fastener count"
              value={actualCount}
              onChange={(e) => setActualCount(e.target.value)}
              className="min-h-12 flex-1 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-brand-secondary focus:outline-none dark:border-white/25 dark:bg-white/8 dark:text-white"
            />
          </div>
          {hiltiWinner && (
            <div className="mt-4 rounded-xl bg-brand-primary/10 px-4 py-3">
              <p className="text-sm font-black text-brand-primary dark:text-brand-secondary">
                🎉 Winner: {hiltiWinner.name}
              </p>
              <p className="text-sm text-gray-700 dark:text-white/80">
                Guessed {hiltiWinner.guess} — off by{" "}
                {Math.abs(hiltiWinner.guess - Number(actualCount))}
              </p>
              <p className="text-sm text-gray-500 dark:text-white/50">
                📞 {hiltiWinner.phone}
              </p>
            </div>
          )}
          <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-gray-100 dark:border-white/10">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600 dark:text-white/60">
                    Name
                  </th>
                  <th className="px-4 py-2 text-right font-semibold text-gray-600 dark:text-white/60">
                    Guess
                  </th>
                  {actualCount && (
                    <th className="px-4 py-2 text-right font-semibold text-gray-600 dark:text-white/60">
                      Off by
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {results.hiltiEntries.map((entry, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-100 dark:border-white/10 ${hiltiWinner?.name === entry.name && hiltiWinner?.phone === entry.phone ? "bg-brand-primary/8 font-bold" : ""}`}
                  >
                    <td className="px-4 py-2 text-gray-900 dark:text-white">
                      {entry.name}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-900 dark:text-white">
                      {entry.guess}
                    </td>
                    {actualCount && (
                      <td className="px-4 py-2 text-right text-gray-500 dark:text-white/60">
                        {Math.abs(entry.guess - Number(actualCount))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
