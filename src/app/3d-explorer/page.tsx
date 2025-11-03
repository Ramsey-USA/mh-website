"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

/**
 * 3D Explorer - Under Construction Page
 *
 * Minimal page to track interest in the 3D project visualization feature
 * while the software is being developed.
 */
export default function ThreeDExplorerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,104,81,0.1)_0%,transparent_50%)] opacity-60"></div>
      <div className="absolute top-20 right-20 bg-brand-primary/10 blur-3xl rounded-full w-96 h-96"></div>
      <div className="absolute bottom-20 left-20 bg-brand-accent/10 blur-3xl rounded-full w-96 h-96"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <FadeInWhenVisible className="space-y-8">
          {/* Veteran-Owned Badge */}
          <div className="inline-flex items-center bg-brand-primary/10 dark:bg-brand-primary/20 shadow-lg backdrop-blur-sm mb-6 px-6 py-3 border border-brand-primary/20 dark:border-brand-primary/30 rounded-full">
            <MaterialIcon
              icon="military_tech"
              size="sm"
              className="text-brand-accent"
            />
            <span className="ml-3 font-bold text-brand-accent text-xs uppercase tracking-wider">
              Veteran-Owned Excellence
            </span>
          </div>

          {/* Under Construction Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-full border border-white/20">
              <MaterialIcon
                icon="visibility"
                className="text-brand-accent text-8xl"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="mb-6 pb-2 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
            <span className="block mb-3 font-semibold text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              3D Project
            </span>
            <span className="block bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary text-transparent drop-shadow-sm">
              Explorer
            </span>
          </h1>

          {/* Primary Tagline */}
          <div className="bg-white/10 backdrop-blur-sm p-4 border border-white/20 rounded-xl inline-block mb-6">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-brand-accent tracking-wide">
              "Building for the Owner, NOT the Dollar"
            </p>
          </div>

          {/* Under Construction Message */}
          <div className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <MaterialIcon
                icon="construction"
                size="lg"
                className="text-brand-accent mr-3"
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Coming Soon
              </h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We're developing an immersive 3D visualization platform that will
              bring your construction projects to life before breaking ground.
              Experience HD walkthroughs, real-time design adjustments, and
              collaborative project planning.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                <MaterialIcon
                  icon="view_in_ar"
                  size="md"
                  className="text-brand-accent mb-2"
                />
                <span>HD Visualization</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                <MaterialIcon
                  icon="edit"
                  size="md"
                  className="text-brand-accent mb-2"
                />
                <span>Real-time Edits</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                <MaterialIcon
                  icon="groups"
                  size="md"
                  className="text-brand-accent mb-2"
                />
                <span>Collaboration</span>
              </div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/estimator">
              <Button
                variant="primary"
                size="lg"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <MaterialIcon icon="calculate" size="lg" className="mr-3" />
                <span className="font-medium">Try AI Estimator</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <MaterialIcon icon="contact_phone" size="lg" className="mr-3" />
                <span className="font-medium">Contact Us</span>
              </Button>
            </Link>
          </div>

          {/* Interest Note */}
          <p className="text-sm text-gray-400 pt-6">
            Interested in learning more? Contact us to be notified when this
            feature launches.
          </p>

          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center text-brand-accent hover:text-brand-secondary transition-colors duration-200 pt-4"
          >
            <MaterialIcon icon="arrow_back" size="sm" className="mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
