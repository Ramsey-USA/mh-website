'use client'

import React from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '../ui'

export function ProjectsOverview() {
  const projects = [
    {
      id: 'P001',
      name: 'Mitchell Family Custom Home',
      client: 'John & Sarah Mitchell',
      type: 'Custom Home',
      status: 'in-progress',
      progress: 45,
      value: '$425,000',
      startDate: '2025-08-15',
      expectedCompletion: '2025-12-15',
      teamLead: 'Mark Harris',
      isVeteran: true,
      phase: 'Foundation & Framing',
    },
    {
      id: 'P002',
      name: 'Downtown Office Complex',
      client: 'Pacific Northwest Holdings',
      type: 'Commercial',
      status: 'in-progress',
      progress: 75,
      value: '$1,200,000',
      startDate: '2025-06-01',
      expectedCompletion: '2025-10-30',
      teamLead: 'Jim Rodriguez',
      isVeteran: false,
      phase: 'Interior Finishing',
    },
    {
      id: 'P003',
      name: 'Chen Kitchen Renovation',
      client: 'Robert Chen',
      type: 'Kitchen Remodel',
      status: 'planning',
      progress: 15,
      value: '$45,000',
      startDate: '2025-10-01',
      expectedCompletion: '2025-11-15',
      teamLead: 'Sarah Harris',
      isVeteran: false,
      phase: 'Design & Permits',
    },
    {
      id: 'P004',
      name: 'Thompson Home Addition',
      client: 'David Thompson',
      type: 'Addition',
      status: 'in-progress',
      progress: 30,
      value: '$85,000',
      startDate: '2025-09-01',
      expectedCompletion: '2025-11-30',
      teamLead: 'Mark Harris',
      isVeteran: true,
      phase: 'Structural Work',
    },
    {
      id: 'P005',
      name: 'Rodriguez Warehouse',
      client: 'Rodriguez Logistics',
      type: 'Commercial',
      status: 'completed',
      progress: 100,
      value: '$650,000',
      startDate: '2025-04-01',
      expectedCompletion: '2025-08-15',
      teamLead: 'Jim Rodriguez',
      isVeteran: false,
      phase: 'Project Complete',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'on-hold':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress >= 25) return 'bg-blue-500'
    return 'bg-gray-500'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Active Projects</CardTitle>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm">
              📊 Project Reports
            </Button>
            <Button variant="primary" size="sm">
              + New Project
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-semibold text-gray-700">
                  Project
                </th>
                <th className="text-left py-3 font-semibold text-gray-700">
                  Client
                </th>
                <th className="text-left py-3 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 font-semibold text-gray-700">
                  Progress
                </th>
                <th className="text-left py-3 font-semibold text-gray-700">
                  Value
                </th>
                <th className="text-left py-3 font-semibold text-gray-700">
                  Team Lead
                </th>
                <th className="text-left py-3 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  <td className="py-4">
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900">
                          {project.name}
                        </span>
                        {project.isVeteran && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            🎖️
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {project.type}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {project.id}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm text-gray-900">
                      {project.client}
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}
                      >
                        {project.status.replace('-', ' ')}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {project.phase}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="w-24">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold text-gray-900">
                      {project.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      Expected: {project.expectedCompletion}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm text-gray-900">
                      {project.teamLead}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-1">
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Project Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-tactic-bold text-blue-600">3</div>
              <div className="text-sm text-blue-800">Planning</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-tactic-bold text-yellow-600">3</div>
              <div className="text-sm text-yellow-800">In Progress</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-tactic-bold text-green-600">2</div>
              <div className="text-sm text-green-800">Completed</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-tactic-bold text-purple-600">
                $2.4M
              </div>
              <div className="text-sm text-purple-800">Total Value</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
