import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from '../../../components/ui'
import { DashboardSidebar } from '../../../components/dashboard'

export default function ConsultationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-tactic-bold text-brand-primary text-2xl">
                    Consultation Management
                  </h1>
                  <p className="text-gray-600">
                    Manage upcoming and past consultations with clients.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    📧 Send Reminders
                  </Button>
                  <Button variant="outline" size="sm">
                    📊 Export Data
                  </Button>
                  <Button variant="primary" size="sm">
                    + Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Filter Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
                    <Input
                      label="Search"
                      placeholder="Client name or project..."
                    />
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">
                        Status
                      </label>
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary w-full">
                        <option value="">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">
                        Team Member
                      </label>
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary w-full">
                        <option value="">All Team Members</option>
                        <option value="mark-harris">Mark Harris</option>
                        <option value="sarah-harris">Sarah Harris</option>
                        <option value="jim-rodriguez">Jim Rodriguez</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">
                        Date Range
                      </label>
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary w-full">
                        <option value="this-week">This Week</option>
                        <option value="this-month">This Month</option>
                        <option value="next-week">Next Week</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Calendar View */}
              <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Consultation Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 p-8 rounded-lg text-center">
                        <div className="mb-4 text-4xl">📅</div>
                        <h3 className="mb-2 font-semibold text-gray-700 text-lg">
                          Interactive Calendar
                        </h3>
                        <p className="text-gray-600">
                          Full calendar integration would be implemented here
                          with drag-and-drop scheduling, time slot management,
                          and real-time updates.
                        </p>
                        <Button variant="primary" className="mt-4">
                          Open Calendar View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <div className="font-tactic-bold text-blue-600 text-2xl">
                            3
                          </div>
                          <div className="text-blue-800 text-sm">Today</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <div className="font-tactic-bold text-green-600 text-2xl">
                            12
                          </div>
                          <div className="text-green-800 text-sm">
                            This Week
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-center">
                          <div className="font-tactic-bold text-yellow-600 text-2xl">
                            2
                          </div>
                          <div className="text-yellow-800 text-sm">Pending</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <div className="font-tactic-bold text-purple-600 text-2xl">
                            95%
                          </div>
                          <div className="text-purple-800 text-sm">
                            Show Rate
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Consultation Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: 'Consultation Completed',
                        client: 'John Mitchell',
                        time: '2 hours ago',
                        teamMember: 'Mark Harris',
                        type: 'Initial Consultation',
                        status: 'success',
                      },
                      {
                        action: 'Consultation Scheduled',
                        client: 'Maria Rodriguez',
                        time: '4 hours ago',
                        teamMember: 'Jim Rodriguez',
                        type: 'Technical Consultation',
                        status: 'info',
                      },
                      {
                        action: 'Consultation Rescheduled',
                        client: 'Robert Chen',
                        time: '1 day ago',
                        teamMember: 'Sarah Harris',
                        type: 'Design Consultation',
                        status: 'warning',
                      },
                      {
                        action: 'Follow-up Required',
                        client: 'David Thompson',
                        time: '2 days ago',
                        teamMember: 'Mark Harris',
                        type: 'Estimate Review',
                        status: 'error',
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center hover:bg-gray-50 p-4 border rounded-lg"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-4 ${
                              activity.status === 'success'
                                ? 'bg-green-500'
                                : activity.status === 'info'
                                ? 'bg-blue-500'
                                : activity.status === 'warning'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                          ></div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {activity.action}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {activity.client} • {activity.type} •{' '}
                              {activity.teamMember}
                            </p>
                          </div>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {activity.time}
                        </div>
                      </div>
                    ))}
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
