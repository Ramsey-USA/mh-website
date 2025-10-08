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
        <div className="flex justify-between items-center">
          <CardTitle>Active Projects</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              📊 Project Reports
            </Button>
            <Button variant="default" size="sm">
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
                <th className="py-3 font-semibold text-gray-700 text-left">
                  Project
                </th>
                <th className="py-3 font-semibold text-gray-700 text-left">
                  Client
                </th>
                <th className="py-3 font-semibold text-gray-700 text-left">
                  Status
                </th>
                <th className="py-3 font-semibold text-gray-700 text-left">
                  Progress
                </th>
                <th className="py-3 font-semibold text-gray-700 text-left">
                  Value
                </th>
                <th className="py-3 font-semibold text-gray-700 text-left">
                  Team Lead
                </th>
                <th className="py-3 font-semibold text-gray-700 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50 border-b">
                  <td className="py-4">
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900">
                          {project.name}
                        </span>
                        {project.isVeteran && (
                          <span className="bg-blue-100 ml-2 px-2 py-1 rounded-full text-blue-800 text-xs">
                            🎖️
                          </span>
                        )}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {project.type}
                      </div>
                      <div className="text-gray-500 text-xs">
                        ID: {project.id}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-gray-900 text-sm">
                      {project.client}
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status.replace('-', ' ')}
                      </span>
                      <div className="mt-1 text-gray-500 text-xs">
                        {project.phase}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="w-24">
                      <div className="flex justify-between items-center mb-1 text-gray-600 text-xs">
                        <span>{project.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full w-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            project.progress
                          )}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold text-gray-900">
                      {project.value}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Expected: {project.expectedCompletion}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-gray-900 text-sm">
                      {project.teamLead}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
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
          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="font-tactic-bold text-blue-600 text-2xl">3</div>
              <div className="text-blue-800 text-sm">Planning</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="font-tactic-bold text-yellow-600 text-2xl">3</div>
              <div className="text-yellow-800 text-sm">In Progress</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="font-tactic-bold text-green-600 text-2xl">2</div>
              <div className="text-green-800 text-sm">Completed</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="font-tactic-bold text-purple-600 text-2xl">
                $2.4M
              </div>
              <div className="text-purple-800 text-sm">Total Value</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
