"use client";

import { useCallback, useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card, CardHeader, CardContent } from "@/components/ui";
import { Input } from "@/components/ui/forms/Input";
import { Button } from "@/components/ui/base/button";
import { logger } from "@/lib/utils/logger";
import { useDialogBehavior } from "@/hooks/useDialogBehavior";

interface AdminSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Admin Sign-In Modal
 * Restricted access for Matt and Jeremy only
 * Accessed through the private admin shortcut
 */
export function AdminSignInModal({ isOpen, onClose }: AdminSignInModalProps) {
  const router = useRouter();
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  }, [onClose]);

  useDialogBehavior({ isOpen, onClose: handleClose, dialogRef: modalRef });

  const handleSubmit = async (e: FormEvent) => {
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
        // Refresh token is persisted as an httpOnly cookie by the server.
        // Access token is short-lived and will be bootstrapped on /dashboard.
        router.push("/dashboard");
        onClose();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      logger.error("Admin login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-modal-backdrop">
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close admin sign-in modal"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 mx-4 w-full max-w-md animate-modal-slide"
      >
        <Card className="bg-white dark:bg-gray-900 shadow-2xl border-2 border-brand-primary/30">
          <CardHeader className="relative bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary p-6 overflow-hidden text-white">
            {/* Background decoration */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
              aria-hidden="true"
            />
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"
              aria-hidden="true"
            />

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
                  <h2 id={titleId} className="text-2xl font-black">
                    Admin Access
                  </h2>
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
                <div
                  role="alert"
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2"
                >
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

              <Input
                id="admin-email"
                type="email"
                label="Email Address"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@mhc-gc.com"
                autoComplete="email"
              />

              <Input
                id="admin-password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="flex-1"
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
                </Button>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-2">
                <MaterialIcon
                  icon="security"
                  size="sm"
                  className="text-gray-600 mt-0.5"
                />
                <p className="text-xs text-gray-500 dark:text-gray-300">
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
