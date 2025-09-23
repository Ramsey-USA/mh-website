import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from '../../../components/ui'
import { DashboardSidebar } from '../../../components/dashboard'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-tactic-bold text-brand-primary">
                    Project Management
                  </h1>
                  <p className="text-gray-600">
                    Oversee all construction projects from planning to
                    completion.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="secondary" size="sm">
                    📊 Project Reports
                  </Button>
                  <Button variant="secondary" size="sm">
                    📋 Export List
                  </Button>
                  <Button variant="primary" size="sm">
                    + New Project
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Active Projects',
                    value: '8',
                    color: 'blue',
                    change: '+2 this month',
                  },
                  {
                    title: 'Total Value',
                    value: '$2.1M',
                    color: 'green',
                    change: '+15% from last quarter',
                  },
                  {
                    title: 'Avg. Completion',
                    value: '67%',
                    color: 'purple',
                    change: 'On schedule',
                  },
                  {
                    title: 'Client Satisfaction',
                    value: '4.8/5',
                    color: 'yellow',
                    change: '+0.2 this quarter',
                  },
                ].map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div
                          className={`text-3xl font-tactic-bold ${
                            stat.color === 'blue'
                              ? 'text-blue-600'
                              : stat.color === 'green'
                                ? 'text-green-600'
                                : stat.color === 'purple'
                                  ? 'text-purple-600'
                                  : 'text-yellow-600'
                          }`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-gray-900 mt-2">
                          {stat.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {stat.change}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Project Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Filter Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Input
                      label="Search"
                      placeholder="Project name or client..."
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        <option value="">All Statuses</option>
                        <option value="planning">Planning</option>
                        <option value="in-progress">In Progress</option>
                        <option value="on-hold">On Hold</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        <option value="">All Types</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="renovation">Renovation</option>
                        <option value="custom">Custom Build</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team Lead
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        <option value="">All Leads</option>
                        <option value="mark-harris">Mark Harris</option>
                        <option value="sarah-harris">Sarah Harris</option>
                        <option value="jim-rodriguez">Jim Rodriguez</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary">
                        <option value="">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projects Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Project
                          </th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Client
                          </th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Type
                          </th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Progress
                          </th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Team Lead
                          </th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Value
                          </th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Status
                          </th>
                          <th className="text-left py-3 px-2 font-medium text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: 'Veterans Memorial Center',
                            client: 'City of Riverside',
                            type: 'Commercial',
                            progress: 85,
                            lead: 'Mark Harris',
                            value: '$650K',
                            status: 'In Progress',
                            priority: 'high',
                          },
                          {
                            name: 'Johnson Family Home',
                            client: 'Robert Johnson',
                            type: 'Residential',
                            progress: 45,
                            lead: 'Sarah Harris',
                            value: '$450K',
                            status: 'In Progress',
                            priority: 'medium',
                          },
                          {
                            name: 'Downtown Office Renovation',
                            client: 'Phoenix Enterprises',
                            type: 'Renovation',
                            progress: 72,
                            lead: 'Jim Rodriguez',
                            value: '$320K',
                            status: 'In Progress',
                            priority: 'high',
                          },
                          {
                            name: 'Miller Deck Addition',
                            client: 'Janet Miller',
                            type: 'Residential',
                            progress: 90,
                            lead: 'Mark Harris',
                            value: '$85K',
                            status: 'Finishing',
                            priority: 'low',
                          },
                          {
                            name: 'Legacy Manufacturing Facility',
                            client: 'Legacy Corp',
                            type: 'Commercial',
                            progress: 25,
                            lead: 'Sarah Harris',
                            value: '$1.2M',
                            status: 'Planning',
                            priority: 'high',
                          },
                        ].map((project, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {project.name}
                                </div>
                                <div
                                  className={`text-xs ${
                                    project.priority === 'high'
                                      ? 'text-red-600'
                                      : project.priority === 'medium'
                                        ? 'text-yellow-600'
                                        : 'text-green-600'
                                  }`}
                                >
                                  {project.priority.toUpperCase()} PRIORITY
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-gray-700">
                              {project.client}
                            </td>
                            <td className="py-3 px-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  project.type === 'Commercial'
                                    ? 'bg-blue-100 text-blue-800'
                                    : project.type === 'Residential'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {project.type}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    project.progress >= 80
                                      ? 'bg-green-500'
                                      : project.progress >= 50
                                        ? 'bg-yellow-500'
                                        : 'bg-blue-500'
                                  }`}
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {project.progress}%
                              </div>
                            </td>
                            <td className="py-3 px-2 text-gray-700">
                              {project.lead}
                            </td>
                            <td className="py-3 px-2 font-medium text-gray-900">
                              {project.value}
                            </td>
                            <td className="py-3 px-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  project.status === 'In Progress'
                                    ? 'bg-blue-100 text-blue-800'
                                    : project.status === 'Planning'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {project.status}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex space-x-2">
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
                </CardContent>
              </Card>

              {/* Project Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline & Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <div className="text-4xl mb-4">🗓️</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Interactive Project Timeline
                    </h3>
                    <p className="text-gray-600">
                      Gantt chart and timeline view would be implemented here
                      showing project dependencies, milestones, and critical
                      path analysis for all active projects.
                    </p>
                    <Button variant="primary" className="mt-4">
                      Open Timeline View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
