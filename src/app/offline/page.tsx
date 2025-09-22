'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Wifi, WifiOff, RefreshCw, Home, Phone, Calendar, Calculator, MessageSquare, Hammer, CheckCircle } from 'lucide-react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true)
  const [isRetrying, setIsRetrying] = useState(false)
  const [cachedData, setCachedData] = useState<any>(null)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      window.location.reload()
    }
    
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load cached data
    loadCachedContent()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const loadCachedContent = async () => {
    try {
      // Try to load cached content from service worker
      const cache = await caches.open('mh-construction-dynamic-v2.2.0')
      const cachedPages = await cache.keys()
      
      setCachedData({
        pages: cachedPages.length,
        lastUpdate: localStorage.getItem('lastCacheUpdate') || 'Unknown'
      })
    } catch (error) {
      console.log('Could not load cache info:', error)
    }
  }

  const retryConnection = async () => {
    setIsRetrying(true)
    
    try {
      // Try to fetch a simple endpoint to test connectivity
      const response = await fetch('/', { cache: 'no-cache' })
      if (response.ok) {
        setIsOnline(true)
        window.location.href = '/'
      }
    } catch (error) {
      console.log('Still offline')
    }
    
    setTimeout(() => setIsRetrying(false), 2000)
  }

  const cachedFeatures = [
    {
      title: 'Contact Information',
      description: 'Phone numbers and emergency contacts are available offline',
      icon: <Phone className="h-5 w-5" />
    },
    {
      title: 'Project Gallery',
      description: 'Browse previously loaded project photos and details',
      icon: <Hammer className="h-5 w-5" />
    },
    {
      title: 'Service Information',
      description: 'Learn about our construction services and capabilities',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      title: 'Cached Content',
      description: 'Access recently viewed pages and information',
      icon: <MessageSquare className="h-5 w-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        {/* Status Icon */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isOnline ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {isOnline ? (
              <Wifi className="h-8 w-8 text-green-600" />
            ) : (
              <WifiOff className="h-8 w-8 text-gray-600" />
            )}
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {isOnline ? 'Back Online!' : 'You\'re Offline'}
          </h1>
          
          <p className="text-gray-600 text-sm">
            {isOnline 
              ? 'Your connection has been restored.'
              : 'Don\'t worry - you can still access some content while offline.'
            }
          </p>
        </div>

        {/* Retry Button */}
        {!isOnline && (
          <div className="mb-6">
            <button
              onClick={retryConnection}
              disabled={isRetrying}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Checking...' : 'Try Again'}
            </button>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">Emergency Contact</h3>
          <div className="text-red-700">
            <p className="font-medium">📞 (509) 555-HELP</p>
            <p className="text-sm">Available 24/7 for construction emergencies</p>
          </div>
        </div>

        {/* Offline Features */}
        {!isOnline && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Available Offline:</h3>
            
            {cachedFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600 mt-0.5">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}

            {/* Cache Info */}
            {cachedData && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 text-sm mb-1">Cached Content</h4>
                <p className="text-blue-700 text-xs">
                  {cachedData.pages} pages available offline
                </p>
                <p className="text-blue-600 text-xs">
                  Last updated: {cachedData.lastUpdate}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Home
            </Link>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact
            </Link>
            <Link href="/services" className="text-blue-600 hover:text-blue-700 font-medium">
              Services
            </Link>
          </div>
        </div>

        {/* PWA Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            This is a Progressive Web App (PWA) that works offline
          </p>
        </div>
      </div>
    </div>
  )
}