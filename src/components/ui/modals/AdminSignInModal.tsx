"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card, CardHeader, CardContent } from "@/components/ui";

interface AdminSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Admin Sign-In Modal
 * Restricted access for Matt and Jeremy only
 * Triple-click on footer copyright to access
 */
export function AdminSignInModal({ isOpen, onClose }: AdminSignInModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token
        localStorage.setItem("admin_token", data.accessToken);
        localStorage.setItem("admin_user", JSON.stringify(data.user));

        // Redirect to dashboard
        router.push("/dashboard");
        onClose();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error("Admin login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-modal-backdrop">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 w-full max-w-md animate-modal-slide">
        <Card className="bg-white dark:bg-gray-900 shadow-2xl border-2 border-brand-primary/30">
          <CardHeader className="relative bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary p-6 overflow-hidden text-white">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <MaterialIcon
                      icon="admin_panel_settings"
                      size="lg"
                      className="text-white"
                    />
                  </div>
                  <h2 className="text-2xl font-black">Admin Access</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                  aria-label="Close modal"
                >
                  <MaterialIcon icon="close" size="md" />
                </button>
              </div>
              <p className="text-white/90 text-sm">
                Restricted access for authorized personnel only
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
                  <MaterialIcon
                    icon="error"
                    size="sm"
                    className="text-red-600 dark:text-red-400 mt-0.5"
                  />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="admin@mhc-gc.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-secondary hover:to-brand-primary rounded-lg text-white font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <MaterialIcon
                        icon="hourglass_empty"
                        size="sm"
                        className="animate-spin"
                      />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <MaterialIcon icon="login" size="sm" />
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-2">
                <MaterialIcon
                  icon="security"
                  size="sm"
                  className="text-gray-400 mt-0.5"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This is a secure administrative area. All access attempts are
                  logged.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
