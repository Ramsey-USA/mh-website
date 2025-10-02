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
        type: 'Initial Consultation',
      },
      todaySchedule: [
        {
          time: '9:00 AM',
          task: 'Mitchell Consultation',
          type: 'consultation',
        },
        { time: '11:00 AM', task: 'Thompson Site Visit', type: 'site-visit' },
        { time: '2:00 PM', task: 'Team Meeting', type: 'internal' },
        { time: '3:30 PM', task: 'Estimate Review', type: 'consultation' },
      ],
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
        type: 'Design Consultation',
      },
      todaySchedule: [
        { time: '10:00 AM', task: 'Design Review', type: 'internal' },
        {
          time: '2:00 PM',
          task: 'Chen Design Consultation',
          type: 'consultation',
        },
        { time: '4:00 PM', task: 'Material Selection', type: 'internal' },
      ],
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
        type: 'Technical Consultation',
      },
      todaySchedule: [
        { time: '8:00 AM', task: 'Site Inspection', type: 'site-visit' },
        {
          time: '10:00 AM',
          task: 'Rodriguez Technical Consultation',
          type: 'consultation',
        },
        { time: '1:00 PM', task: 'Permit Review', type: 'internal' },
        { time: '3:00 PM', task: 'Contractor Meeting', type: 'external' },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500'
      case 'busy':
        return 'bg-yellow-500'
      case 'on-site':
        return 'bg-blue-500'
      case 'unavailable':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return '👥'
      case 'site-visit':
        return '🏗️'
      case 'internal':
        return '🏢'
      case 'external':
        return '🤝'
      default:
        return '📋'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Team Schedule</CardTitle>
          <Button variant="outline" size="sm">
            📅 Full Calendar
          </Button>
        </div>
        <p className="text-gray-600 text-sm">
          Today,{' '}
          {today.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {teamSchedule.map(member => (
            <div key={member.id} className="pb-4 border-b last:border-b-0">
              {/* Team Member Header */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="mr-3 text-2xl">{member.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {member.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{member.title}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      member.status
                    )} mr-2`}
                  ></div>
                  <span className="text-gray-600 text-sm capitalize">
                    {member.status}
                  </span>
                </div>
              </div>

              {/* Current Task */}
              <div className="bg-gray-50 mb-3 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-700 text-sm">
                      Current Task:
                    </span>
                    <span className="ml-2 text-gray-900 text-sm">
                      {member.currentTask}
                    </span>
                  </div>
                  {member.status !== 'available' && (
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  )}
                </div>
              </div>

              {/* Next Appointment */}
              {member.nextAppointment && (
                <div className="bg-blue-50 mb-3 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-blue-700 text-sm">
                        Next:
                      </span>
                      <span className="ml-2 text-blue-900 text-sm">
                        {member.nextAppointment.time} -{' '}
                        {member.nextAppointment.client}
                      </span>
                    </div>
                    <span className="bg-blue-200 px-2 py-1 rounded-full text-blue-800 text-xs">
                      {member.nextAppointment.type}
                    </span>
                  </div>
                </div>
              )}

              {/* Today's Schedule */}
              <div>
                <h5 className="mb-2 font-medium text-gray-700 text-sm">
                  Today&apos;s Schedule:
                </h5>
                <div className="space-y-2">
                  {member.todaySchedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center">
                        <span className="mr-2 text-lg">
                          {getTaskTypeIcon(item.type)}
                        </span>
                        <span className="w-16 text-gray-600">{item.time}</span>
                        <span className="text-gray-900">{item.task}</span>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.type === 'consultation'
                            ? 'bg-green-100 text-green-800'
                            : item.type === 'site-visit'
                            ? 'bg-blue-100 text-blue-800'
                            : item.type === 'internal'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
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
          <div className="gap-3 grid grid-cols-2">
            <Button variant="primary" size="sm" className="w-full">
              📅 Schedule Meeting
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              👥 Team Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
