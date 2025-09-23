'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '../ui'

interface ProjectUpdate {
  id: string
  projectId: string
  title: string
  description: string
  type: 'milestone' | 'progress' | 'issue' | 'completion' | 'photo'
  timestamp: string
  author: string
  images?: string[]
  progress?: number
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}

interface ProjectTimelineProps {
  projectId: string
  className?: string
}

const mockUpdates: ProjectUpdate[] = [
  {
    id: 'update-001',
    projectId: 'proj-001',
    title: 'Kitchen Demolition Complete',
    description:
      'Successfully completed demolition of existing kitchen. All debris removed and area prepared for electrical work.',
    type: 'milestone',
    timestamp: '2024-12-20T14:30:00Z',
    author: 'Mike Rodriguez - Project Manager',
    images: ['/images/demolition-complete.jpg'],
    progress: 65,
  },
  {
    id: 'update-002',
    projectId: 'proj-001',
    title: 'Electrical Rough-In Progress',
    description:
      'Electrical rough-in work is 80% complete. New outlets and lighting circuits installed according to plans.',
    type: 'progress',
    timestamp: '2024-12-19T11:15:00Z',
    author: 'David Kim - Electrical Contractor',
    progress: 60,
  },
  {
    id: 'update-003',
    projectId: 'proj-001',
    title: 'Material Delivery Scheduled',
    description:
      'Granite countertops and custom cabinets confirmed for delivery January 3rd. Installation to begin immediately after.',
    type: 'milestone',
    timestamp: '2024-12-18T09:45:00Z',
    author: 'Sarah Chen - Materials Coordinator',
  },
  {
    id: 'update-004',
    projectId: 'proj-002',
    title: 'Permit Approval Received',
    description:
      'Building permit for bathroom addition has been approved. Construction can commence as scheduled.',
    type: 'milestone',
    timestamp: '2024-12-17T16:20:00Z',
    author: 'Lisa Thompson - Design Lead',
  },
]

export const ProjectTracking: React.FC<ProjectTimelineProps> = ({
  projectId,
  className = '',
}) => {
  const [updates, setUpdates] = useState<ProjectUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch project updates
    const fetchUpdates = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const projectUpdates = mockUpdates.filter(
        update => projectId === 'all' || update.projectId === projectId
      )

      setUpdates(
        projectUpdates.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      )
      setIsLoading(false)
    }

    fetchUpdates()
  }, [projectId])

  const getUpdateIcon = (type: ProjectUpdate['type']) => {
    switch (type) {
      case 'milestone':
        return '🎯'
      case 'progress':
        return '📈'
      case 'issue':
        return '⚠️'
      case 'completion':
        return '✅'
      case 'photo':
        return '📸'
      default:
        return '📋'
    }
  }

  const getUpdateColor = (type: ProjectUpdate['type']) => {
    switch (type) {
      case 'milestone':
        return 'border-blue-200 bg-blue-50'
      case 'progress':
        return 'border-green-200 bg-green-50'
      case 'issue':
        return 'border-red-200 bg-red-50'
      case 'completion':
        return 'border-purple-200 bg-purple-50'
      case 'photo':
        return 'border-yellow-200 bg-yellow-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    )

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Project Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
            <span className="ml-3 text-gray-600">Loading updates...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Project Timeline</span>
          <span className="text-sm text-gray-500">
            {updates.length} updates
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {updates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📋</div>
              <p>No updates available for this project</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>

              {updates.map((update, index) => (
                <div key={update.id} className="relative flex items-start pb-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-full">
                    <span className="text-xl">
                      {getUpdateIcon(update.type)}
                    </span>
                  </div>

                  {/* Update content */}
                  <div className="ml-6 flex-1">
                    <div
                      className={`p-4 rounded-lg border ${getUpdateColor(update.type)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {update.title}
                        </h4>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                          {formatTimestamp(update.timestamp)}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3">{update.description}</p>

                      {update.progress !== undefined && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Project Progress</span>
                            <span>{update.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${update.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {update.images && update.images.length > 0 && (
                        <div className="mb-3">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {update.images.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
                              >
                                <span className="text-2xl">📸</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {update.author}
                        </span>
                        {update.priority && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              update.priority === 'urgent'
                                ? 'bg-red-100 text-red-800'
                                : update.priority === 'high'
                                  ? 'bg-orange-100 text-orange-800'
                                  : update.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {update.priority} priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Real-time notifications component
export const ProjectNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<ProjectUpdate[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of new notification
        const newNotification: ProjectUpdate = {
          id: `notif-${Date.now()}`,
          projectId: 'proj-001',
          title: 'New Project Update',
          description: 'Your project team has posted a new update.',
          type: 'progress',
          timestamp: new Date().toISOString(),
          author: 'MH Construction Team',
        }

        setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
        setIsVisible(true)

        // Auto-hide after 5 seconds
        setTimeout(() => setIsVisible(false), 5000)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (!isVisible || notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
      <Card className="shadow-2xl border-brand-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>🔔 New Updates</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="p-1 h-6 w-6"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {notifications.slice(0, 3).map(notification => (
              <div
                key={notification.id}
                className="p-2 bg-brand-primary/5 rounded border"
              >
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-xs text-gray-600">
                  {notification.description}
                </p>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(notification.timestamp)}
                </span>
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" className="w-full mt-3">
            View All Updates
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  )

  if (diffInMinutes < 1) {
    return 'Just now'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60)
    return `${diffInHours} hours ago`
  }
}
