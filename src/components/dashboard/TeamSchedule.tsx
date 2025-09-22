'use client'

import React from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../ui'

export function TeamSchedule() {
  const today = new Date()
  const teamSchedule = [
    {
      id: 'mark-harris',
      name: 'Mark Harris',
      title: 'Founder & Lead',
      avatar: '👨‍💼',
      status: 'available',
      currentTask: 'Mitchell Home Site Visit',
      nextAppointment: {
        time: '9:00 AM',
        client: 'Mitchell Family',
        type: 'Initial Consultation'
      },
      todaySchedule: [
        { time: '9:00 AM', task: 'Mitchell Consultation', type: 'consultation' },
        { time: '11:00 AM', task: 'Thompson Site Visit', type: 'site-visit' },
        { time: '2:00 PM', task: 'Team Meeting', type: 'internal' },
        { time: '3:30 PM', task: 'Estimate Review', type: 'consultation' }
      ]
    },
    {
      id: 'sarah-harris',
      name: 'Sarah Harris',
      title: 'Design Director',
      avatar: '👩‍💼',
      status: 'busy',
      currentTask: 'Chen Kitchen Design Review',
      nextAppointment: {
        time: '2:00 PM',
        client: 'Robert Chen',
        type: 'Design Consultation'
      },
      todaySchedule: [
        { time: '10:00 AM', task: 'Design Review', type: 'internal' },
        { time: '2:00 PM', task: 'Chen Design Consultation', type: 'consultation' },
        { time: '4:00 PM', task: 'Material Selection', type: 'internal' }
      ]
    },
    {
      id: 'jim-rodriguez',
      name: 'Jim Rodriguez',
      title: 'Project Manager',
      avatar: '👨‍🔧',
      status: 'on-site',
      currentTask: 'Downtown Complex Inspection',
      nextAppointment: {
        time: '10:00 AM',
        client: 'Maria Rodriguez',
        type: 'Technical Consultation'
      },
      todaySchedule: [
        { time: '8:00 AM', task: 'Site Inspection', type: 'site-visit' },
        { time: '10:00 AM', task: 'Rodriguez Technical Consultation', type: 'consultation' },
        { time: '1:00 PM', task: 'Permit Review', type: 'internal' },
        { time: '3:00 PM', task: 'Contractor Meeting', type: 'external' }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'on-site': return 'bg-blue-500'
      case 'unavailable': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return '👥'
      case 'site-visit': return '🏗️'
      case 'internal': return '🏢'
      case 'external': return '🤝'
      default: return '📋'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Schedule</CardTitle>
          <Button variant="secondary" size="sm">
            📅 Full Calendar
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Today, {today.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {teamSchedule.map((member) => (
            <div key={member.id} className="border-b pb-4 last:border-b-0">
              
              {/* Team Member Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{member.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.title}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)} mr-2`}></div>
                  <span className="text-sm text-gray-600 capitalize">{member.status}</span>
                </div>
              </div>

              {/* Current Task */}
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Current Task:</span>
                    <span className="ml-2 text-sm text-gray-900">{member.currentTask}</span>
                  </div>
                  {member.status !== 'available' && (
                    <Button variant="secondary" size="sm">
                      Contact
                    </Button>
                  )}
                </div>
              </div>

              {/* Next Appointment */}
              {member.nextAppointment && (
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-blue-700">Next:</span>
                      <span className="ml-2 text-sm text-blue-900">
                        {member.nextAppointment.time} - {member.nextAppointment.client}
                      </span>
                    </div>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                      {member.nextAppointment.type}
                    </span>
                  </div>
                </div>
              )}

              {/* Today's Schedule */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Today's Schedule:</h5>
                <div className="space-y-2">
                  {member.todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getTaskTypeIcon(item.type)}</span>
                        <span className="text-gray-600 w-16">{item.time}</span>
                        <span className="text-gray-900">{item.task}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.type === 'consultation' ? 'bg-green-100 text-green-800' :
                        item.type === 'site-visit' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'internal' ? 'bg-gray-100 text-gray-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Actions */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="primary" size="sm" className="w-full">
              📅 Schedule Meeting
            </Button>
            <Button variant="secondary" size="sm" className="w-full">
              👥 Team Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}