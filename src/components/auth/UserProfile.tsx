// User profile component for dashboard
'use client'

import React, { useState } from 'react'
import { useAuth } from '../../lib/auth/AuthContext'
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../ui'

export function UserProfile() {
  const { user, userProfile, updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    phoneNumber: userProfile?.phoneNumber || '',
    company: userProfile?.company || '',
    isVeteran: userProfile?.isVeteran || false
  })

  const handleSave = async () => {
    try {
      setLoading(true)
      setMessage('')
      await updateUserProfile(formData)
      setMessage('Profile updated successfully!')
      setIsEditing(false)
    } catch {
      setMessage('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      displayName: userProfile?.displayName || '',
      phoneNumber: userProfile?.phoneNumber || '',
      company: userProfile?.company || '',
      isVeteran: userProfile?.isVeteran || false
    })
    setIsEditing(false)
    setMessage('')
  }

  if (!user || !userProfile) {
    return null
  }

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    team_member: 'bg-blue-100 text-blue-800',
    client: 'bg-green-100 text-green-800'
  }

  const roleNames = {
    admin: 'Administrator',
    team_member: 'Team Member',
    client: 'Client'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {message && (
          <div className={`mb-4 p-3 rounded-md ${
            message.includes('success') 
              ? 'bg-success-light text-success' 
              : 'bg-error-light text-error'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
              {userProfile.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {userProfile.displayName || 'User'}
              </h3>
              <p className="text-text-secondary">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[userProfile.role]}`}>
                  {roleNames[userProfile.role]}
                </span>
                {userProfile.isVeteran && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-veteran-red/10 text-veteran-red">
                    🇺🇸 Veteran
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              {isEditing ? (
                <Input
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="Your display name"
                />
              ) : (
                <p className="text-text-primary">{userProfile.displayName || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Your phone number"
                />
              ) : (
                <p className="text-text-primary">{userProfile.phoneNumber || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              {isEditing ? (
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company name"
                />
              ) : (
                <p className="text-text-primary">{userProfile.company || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Created
              </label>
              <p className="text-text-primary">
                {userProfile.createdAt?.toLocaleDateString() || 'Unknown'}
              </p>
            </div>
          </div>

          {/* Veteran Status */}
          {isEditing && (
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isVeteran}
                  onChange={(e) => setFormData({ ...formData, isVeteran: e.target.checked })}
                  className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                />
                <span className="text-sm font-medium text-gray-700">
                  I am a military veteran 🇺🇸
                </span>
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}