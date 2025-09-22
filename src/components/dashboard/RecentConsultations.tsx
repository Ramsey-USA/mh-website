'use client'

import React from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../ui'

export function RecentConsultations() {
  const consultations = [
    {
      id: 'C001',
      clientName: 'John & Sarah Mitchell',
      projectType: 'Custom Home',
      consultationType: 'Initial Consultation',
      date: '2025-09-23',
      time: '09:00 AM',
      teamMember: 'Mark Harris',
      status: 'confirmed',
      isVeteran: true,
      priority: 'high',
      estimatedValue: '$425,000'
    },
    {
      id: 'C002',
      clientName: 'Robert Chen',
      projectType: 'Kitchen Remodel',
      consultationType: 'Design Consultation',
      date: '2025-09-23',
      time: '02:00 PM',
      teamMember: 'Sarah Harris',
      status: 'confirmed',
      isVeteran: false,
      priority: 'medium',
      estimatedValue: '$45,000'
    },
    {
      id: 'C003',
      clientName: 'Maria Rodriguez',
      projectType: 'Commercial Building',
      consultationType: 'Technical Consultation',
      date: '2025-09-24',
      time: '10:00 AM',
      teamMember: 'Jim Rodriguez',
      status: 'pending',
      isVeteran: false,
      priority: 'high',
      estimatedValue: '$850,000'
    },
    {
      id: 'C004',
      clientName: 'David Thompson',
      projectType: 'Home Addition',
      consultationType: 'Estimate Review',
      date: '2025-09-24',
      time: '03:00 PM',
      teamMember: 'Mark Harris',
      status: 'confirmed',
      isVeteran: true,
      priority: 'medium',
      estimatedValue: '$85,000'
    },
    {
      id: 'C005',
      clientName: 'Lisa Park',
      projectType: 'Bathroom Remodel',
      consultationType: 'Initial Consultation',
      date: '2025-09-25',
      time: '11:00 AM',
      teamMember: 'Sarah Harris',
      status: 'confirmed',
      isVeteran: false,
      priority: 'low',
      estimatedValue: '$22,000'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Consultations</CardTitle>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              
              {/* Priority Indicator */}
              <div className={`w-1 h-16 rounded-full mr-4 ${getPriorityColor(consultation.priority)}`}></div>
              
              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-semibold text-gray-900">{consultation.clientName}</h4>
                      {consultation.isVeteran && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          🎖️ Veteran
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {consultation.projectType} • {consultation.consultationType}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {consultation.id} • Est. Value: {consultation.estimatedValue}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(consultation.status)}`}>
                      {consultation.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-4">📅 {consultation.date}</span>
                    <span className="mr-4">🕐 {consultation.time}</span>
                    <span>👨‍💼 {consultation.teamMember}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex space-x-3">
            <Button variant="primary" size="sm" className="flex-1">
              + Schedule New Consultation
            </Button>
            <Button variant="secondary" size="sm">
              📊 Consultation Reports
            </Button>
            <Button variant="secondary" size="sm">
              📧 Send Reminders
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}