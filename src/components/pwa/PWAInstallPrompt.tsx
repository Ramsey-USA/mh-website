'use client'

import { useState, useEffect } from 'react'
import { Download, X, Smartphone, Monitor, Zap, Wifi } from 'lucide-react'

interface PWAInstallPromptProps {
  className?: string
  variant?: 'banner' | 'card' | 'modal'
  showOnMobile?: boolean
  showOnDesktop?: boolean
}

export default function PWAInstallPrompt({ 
  className = '',
  variant = 'banner',
  showOnMobile = true,
  showOnDesktop = true
}: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if PWA is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone) {
        setIsInstalled(true)
        return
      }
    }

    // Detect mobile and iOS
    const checkDevice = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const ios = /iphone|ipad|ipod/i.test(userAgent)
      
      setIsMobile(mobile)
      setIsIOS(ios)
    }

    // Check if user has dismissed the prompt recently
    const checkDismissed = () => {
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      const dismissedTime = dismissed ? parseInt(dismissed) : 0
      const dayInMs = 24 * 60 * 60 * 1000
      
      // Show again after 7 days
      return (Date.now() - dismissedTime) < (7 * dayInMs)
    }

    checkIfInstalled()
    checkDevice()

    if (isInstalled || checkDismissed()) {
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('[PWA] Install prompt event triggered')
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show install prompt based on device preferences
      if ((isMobile && showOnMobile) || (!isMobile && showOnDesktop)) {
        setIsVisible(true)
      }
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('[PWA] App was installed')
      setIsInstalled(true)
      setIsVisible(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // For iOS, show manual install instructions
    if (isIOS && !isInstalled && !checkDismissed()) {
      setTimeout(() => {
        if (showOnMobile) {
          setIsVisible(true)
        }
      }, 3000) // Show after 3 seconds on iOS
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [showOnMobile, showOnDesktop, isMobile, isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        // Show iOS install instructions
        setIsVisible(true)
        return
      }
      return
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt()
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      
      console.log('[PWA] User choice:', outcome)
      
      if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt')
      } else {
        console.log('[PWA] User dismissed the install prompt')
      }
      
      // Clear the prompt
      setDeferredPrompt(null)
      setIsVisible(false)
    } catch (error) {
      console.error('[PWA] Install prompt error:', error)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  if (!isVisible || isInstalled) {
    return null
  }

  const features = [
    { icon: Zap, text: 'Faster loading and performance' },
    { icon: Wifi, text: 'Works offline with cached content' },
    { icon: Smartphone, text: 'Full-screen mobile experience' },
    { icon: Monitor, text: 'Desktop shortcut access' }
  ]

  if (variant === 'banner') {
    return (
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg ${className}`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Download className="h-6 w-6" />
            <div>
              <div className="font-semibold">Install MH Construction App</div>
              <div className="text-sm text-blue-100">
                Get faster access and offline capabilities
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isIOS ? (
              <div className="text-sm text-blue-100">
                Tap the share button and select &quot;Add to Home Screen&quot;
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Install
              </button>
            )}
            
            <button
              onClick={handleDismiss}
              className="text-blue-100 hover:text-white p-1"
              aria-label="Dismiss install prompt"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Install Our App</h3>
              <p className="text-sm text-gray-600">Enhanced mobile experience</p>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
              <feature.icon className="h-4 w-4 text-blue-600" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {isIOS ? (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>To install on iOS:</strong><br />
              1. Tap the share button in Safari<br />
              2. Select &quot;Add to Home Screen&quot;<br />
              3. Tap &quot;Add&quot; to install
            </p>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Install App
          </button>
        )}
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 ${className}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Install MH Construction
                </h3>
                <p className="text-gray-600">Get the best mobile experience</p>
              </div>
            </div>
            
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-700">
                <feature.icon className="h-5 w-5 text-blue-600" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {isIOS ? (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                Installation Instructions for iOS:
              </h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Open this site in Safari</li>
                <li>2. Tap the share button (square with arrow)</li>
                <li>3. Scroll down and tap &quot;Add to Home Screen&quot;</li>
                <li>4. Tap &quot;Add&quot; to install the app</li>
              </ol>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <Download className="h-5 w-5" />
              Install Now
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    )
  }

  return null
}