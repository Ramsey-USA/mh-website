/**
 * Security Demo Page
 * Demonstrates the security dashboard and features
 */

import React from "react";
import { Metadata } from "next";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import SecurityDashboard from "@/components/security/SecurityDashboard";

export const metadata: Metadata = {
  title: "Security Dashboard - MH Construction",
  description:
    "Real-time security monitoring and vulnerability management for MH Construction",
  robots: "noindex, nofollow", // Don't index security pages
};

export default function SecurityPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 py-8 container">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-accent rounded-full w-3 h-3 animate-pulse"></div>
              <h1 className="font-bold text-gray-900 text-2xl">
                MH Construction Security Center
              </h1>
            </div>
            <p className="mt-2 text-gray-600">
              Real-time monitoring and protection for veteran-owned construction
              services
            </p>
          </div>
        </div>

        {/* Security Dashboard */}
        <SecurityDashboard />

        {/* Security Features Info */}
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 mt-8">
          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <h3 className="flex items-center gap-2 mb-3 font-semibold text-lg">
              <MaterialIcon
                icon="security"
                size="md"
                className="text-blue-600"
              />
              Real-time Protection
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Rate limiting and DDoS protection</li>
              <li>• CSRF token validation</li>
              <li>• XSS and SQL injection prevention</li>
              <li>• Secure headers enforcement</li>
            </ul>
          </div>

          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <h3 className="flex items-center gap-2 mb-3 font-semibold text-lg">
              <MaterialIcon
                icon="bar_chart"
                className="text-blue-600"
                size="sm"
              />
              Advanced Analytics
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Security event tracking</li>
              <li>• Risk score monitoring</li>
              <li>• Vulnerability assessment</li>
              <li>• Compliance reporting</li>
            </ul>
          </div>

          <div className="bg-white shadow-sm p-6 border rounded-lg">
            <h3 className="flex items-center gap-2 mb-3 font-semibold text-lg">
              <MaterialIcon icon="search" className="text-blue-600" size="sm" />
              Threat Detection
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Automated vulnerability scanning</li>
              <li>• Anomaly detection</li>
              <li>• Threat intelligence integration</li>
              <li>• Incident response workflows</li>
            </ul>
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-white shadow-sm mt-8 p-6 border rounded-lg">
          <h3 className="mb-4 font-semibold text-lg">
            Current Security Posture
          </h3>
          <div className="gap-4 grid md:grid-cols-4">
            <div className="text-center">
              <div className="flex justify-center font-bold text-green-600 text-2xl">
                <MaterialIcon icon="check" size="xl" />
              </div>
              <div className="text-gray-600 text-sm">SSL/TLS Secured</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center font-bold text-green-600 text-2xl">
                <MaterialIcon icon="check" size="xl" />
              </div>
              <div className="text-gray-600 text-sm">Security Headers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center font-bold text-green-600 text-2xl">
                <MaterialIcon icon="check" size="xl" />
              </div>
              <div className="text-gray-600 text-sm">Input Validation</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center font-bold text-green-600 text-2xl">
                <MaterialIcon icon="check" size="xl" />
              </div>
              <div className="text-gray-600 text-sm">Audit Logging</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
