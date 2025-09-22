'use client'

import { useState, useEffect } from 'react'
import { Bell, BellOff, Check, X, Settings, AlertCircle, CheckCircle, Calendar, MessageSquare, Hammer } from 'lucide-react'

interface PushNotification {
  id: string
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  data?: any
  timestamp: number
  read: boolean
  type: 'project' | 'appointment' | 'message' | 'general'
}

interface PushNotificationsProps {
  onPermissionChange?: (permission: NotificationPermission) => void
  onNotificationReceived?: (notification: PushNotification) => void
}

export default function PushNotifications({ 
  onPermissionChange, 
  onNotificationReceived 
}: PushNotificationsProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [notifications, setNotifications] = useState<PushNotification[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  useEffect(() => {
    // Check if push notifications are supported
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
    setIsSupported(supported)

    if (supported) {
      // Get current permission status
      setPermission(Notification.permission)
      
      // Check if already subscribed
      navigator.serviceWorker.ready.then(async (registration) => {
        const existingSubscription = await registration.pushManager.getSubscription()
        setIsSubscribed(!!existingSubscription)
        setSubscription(existingSubscription)
      })

      // Load stored notifications
      loadStoredNotifications()
    }
  }, [])

  useEffect(() => {
    if (onPermissionChange) {
      onPermissionChange(permission)
    }
  }, [permission, onPermissionChange])

  const loadStoredNotifications = () => {
    try {
      const stored = localStorage.getItem('mh-notifications')
      if (stored) {
        const parsed = JSON.parse(stored)
        setNotifications(parsed.sort((a: PushNotification, b: PushNotification) => b.timestamp - a.timestamp))
      }
    } catch (error) {
      console.error('Error loading stored notifications:', error)
    }
  }

  const saveNotifications = (notifs: PushNotification[]) => {
    try {
      localStorage.setItem('mh-notifications', JSON.stringify(notifs))
    } catch (error) {
      console.error('Error saving notifications:', error)
    }
  }

  const requestPermission = async () => {
    if (!isSupported) {
      alert('Push notifications are not supported in this browser.')
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      
      if (result === 'granted') {
        await subscribeToPush()
        return true
      } else {
        console.log('Notification permission denied')
        return false
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      
      // VAPID public key (in production, this would be your actual VAPID public key)
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BMqSvZTDRZhUqQZCiK6ARr6jxJEa-XmbmGWgSJF1rRLyf5QrZVKnJV_8UaW4Nkr_r5HX-5Q6_2mVhE_U3d7J8yY'
      
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource
      })

      setSubscription(pushSubscription)
      setIsSubscribed(true)

      // Send subscription to server
      await sendSubscriptionToServer(pushSubscription)
      
      console.log('Push subscription successful:', pushSubscription)
    } catch (error) {
      console.error('Error subscribing to push notifications:', error)
      setIsSubscribed(false)
    }
  }

  const unsubscribeFromPush = async () => {
    try {
      if (subscription) {
        await subscription.unsubscribe()
        await removeSubscriptionFromServer(subscription)
        setSubscription(null)
        setIsSubscribed(false)
        console.log('Push unsubscription successful')
      }
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error)
    }
  }

  const sendSubscriptionToServer = async (subscription: PushSubscription) => {
    try {
      // In a real app, send this to your backend
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to send subscription to server')
      }
    } catch (error) {
      console.log('Note: Subscription not sent to server (demo mode):', error)
      // In demo mode, just log the subscription
      console.log('Subscription object:', subscription.toJSON())
    }
  }

  const removeSubscriptionFromServer = async (subscription: PushSubscription) => {
    try {
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON()
        })
      })
    } catch (error) {
      console.log('Note: Unsubscription not sent to server (demo mode):', error)
    }
  }

  // Demo: Add a test notification
  const addTestNotification = () => {
    const testNotification: PushNotification = {
      id: Date.now().toString(),
      title: 'Test Notification',
      body: 'This is a test notification from MH Construction',
      type: 'general',
      timestamp: Date.now(),
      read: false,
      icon: '/icons/icon-96x96.png'
    }

    const updatedNotifications = [testNotification, ...notifications]
    setNotifications(updatedNotifications)
    saveNotifications(updatedNotifications)

    if (onNotificationReceived) {
      onNotificationReceived(testNotification)
    }

    // Show browser notification if permission granted
    if (permission === 'granted') {
      new Notification(testNotification.title, {
        body: testNotification.body,
        icon: testNotification.icon,
        tag: testNotification.id
      })
    }
  }

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    )
    setNotifications(updatedNotifications)
    saveNotifications(updatedNotifications)
  }

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id)
    setNotifications(updatedNotifications)
    saveNotifications(updatedNotifications)
  }

  const clearAllNotifications = () => {
    setNotifications([])
    saveNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'project': return <Hammer className="h-4 w-4" />
      case 'appointment': return <Calendar className="h-4 w-4" />
      case 'message': return <MessageSquare className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
        title="Notifications"
      >
        {isSubscribed ? (
          <Bell className="h-5 w-5" />
        ) : (
          <BellOff className="h-5 w-5" />
        )}
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {showSettings && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Permission Status */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${
                permission === 'granted' ? 'bg-green-500' : 
                permission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {permission === 'granted' ? 'Enabled' : 
                 permission === 'denied' ? 'Blocked' : 'Not enabled'}
              </span>
            </div>

            {/* Enable/Disable Buttons */}
            <div className="space-y-2">
              {permission !== 'granted' && (
                <button
                  onClick={requestPermission}
                  className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Enable Notifications
                </button>
              )}
              
              {isSubscribed && (
                <button
                  onClick={unsubscribeFromPush}
                  className="w-full bg-gray-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Disable Notifications
                </button>
              )}

              {/* Demo Button */}
              {permission === 'granted' && (
                <button
                  onClick={addTestNotification}
                  className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Test Notification
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No notifications yet
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1 rounded ${
                        notification.type === 'project' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'appointment' ? 'bg-green-100 text-green-600' :
                        notification.type === 'message' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {notification.body}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 p-1"
                            title="Mark as read"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clear All */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={clearAllNotifications}
                className="w-full text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Utility function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return new Uint8Array(outputArray.buffer)
}

// Notification types for different use cases
export const NotificationTypes = {
  PROJECT_UPDATE: 'project',
  APPOINTMENT_REMINDER: 'appointment', 
  MESSAGE_RECEIVED: 'message',
  GENERAL: 'general'
} as const

// Helper function to send notifications (for use in other components)
export const sendNotification = async (title: string, body: string, type: string = 'general') => {
  if ('serviceWorker' in navigator && Notification.permission === 'granted') {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, {
        body,
        icon: '/icons/icon-96x96.png',
        badge: '/icons/icon-96x96.png',
        tag: `mh-${type}-${Date.now()}`,
        data: { type, timestamp: Date.now() },
        requireInteraction: type === 'appointment'
      })
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }
}