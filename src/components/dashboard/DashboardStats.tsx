'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui'

export function DashboardStats() {
  const stats = [
    {
      title: 'Active Projects',
      value: '8',
      change: '+2 this month',
      changeType: 'positive',
      icon: '🏗️',
      color: 'bg-blue-500',
    },
    {
      title: 'Pending Consultations',
      value: '3',
      change: 'Next: Tomorrow 9AM',
      changeType: 'neutral',
      icon: '📅',
      color: 'bg-green-500',
    },
    {
      title: 'This Month Revenue',
      value: '$847K',
      change: '+15% vs last month',
      changeType: 'positive',
      icon: '💰',
      color: 'bg-yellow-500',
    },
    {
      title: 'AI Estimates Generated',
      value: '142',
      change: '+28 this week',
      changeType: 'positive',
      icon: '🎯',
      color: 'bg-purple-500',
    },
    {
      title: 'Veteran Projects',
      value: '5',
      change: 'Wounded Warrior: 2',
      changeType: 'neutral',
      icon: '🎖️',
      color: 'bg-red-500',
    },
    {
      title: 'Team Utilization',
      value: '87%',
      change: 'Optimal range',
      changeType: 'positive',
      icon: '👥',
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} hover={true}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-tactic-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : stat.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-gray-500'
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white text-xl`}
              >
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
