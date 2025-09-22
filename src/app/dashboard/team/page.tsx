import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '../../../components/ui'
import { DashboardSidebar } from '../../../components/dashboard'

export default function TeamPage() {
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
                  <h1 className="text-2xl font-tactic-bold text-brand-primary">Team Management</h1>
                  <p className="text-gray-600">Manage team members, schedules, and veteran support services.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="secondary" size="sm">
                    🇺🇸 Veteran Resources
                  </Button>
                  <Button variant="secondary" size="sm">
                    📊 Team Reports
                  </Button>
                  <Button variant="primary" size="sm">
                    + Add Team Member
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            <div className="space-y-6">
              
              {/* Team Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Team Members', value: '12', color: 'blue', subtitle: '8 Active, 4 Part-time' },
                  { title: 'Veteran Team Members', value: '7', color: 'red', subtitle: '58% Veteran-owned team' },
                  { title: 'Average Experience', value: '15 yrs', color: 'green', subtitle: 'Construction expertise' },
                  { title: 'Team Satisfaction', value: '4.9/5', color: 'purple', subtitle: 'Internal rating' }
                ].map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className={`text-3xl font-tactic-bold ${
                          stat.color === 'blue' ? 'text-blue-600' :
                          stat.color === 'red' ? 'text-red-600' :
                          stat.color === 'green' ? 'text-green-600' :
                          'text-purple-600'
                        }`}>
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-gray-900 mt-2">{stat.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{stat.subtitle}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Team Members Grid */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        name: 'Mark Harris',
                        role: 'Owner & Project Manager',
                        veteran: true,
                        experience: '20 years',
                        specialties: ['Project Management', 'Commercial Construction'],
                        status: 'Available',
                        currentProject: 'Veterans Memorial Center',
                        avatar: '👨‍💼',
                        phone: '(555) 123-4567',
                        email: 'mark@mhconstruction.com'
                      },
                      {
                        name: 'Sarah Harris',
                        role: 'Co-Owner & Design Manager',
                        veteran: false,
                        experience: '18 years',
                        specialties: ['Interior Design', 'Project Coordination'],
                        status: 'On-site',
                        currentProject: 'Johnson Family Home',
                        avatar: '👩‍💼',
                        phone: '(555) 123-4568',
                        email: 'sarah@mhconstruction.com'
                      },
                      {
                        name: 'Jim Rodriguez',
                        role: 'Lead Carpenter',
                        veteran: true,
                        experience: '15 years',
                        specialties: ['Framing', 'Finish Carpentry'],
                        status: 'Available',
                        currentProject: 'Downtown Office Renovation',
                        avatar: '👷‍♂️',
                        phone: '(555) 123-4569',
                        email: 'jim@mhconstruction.com'
                      },
                      {
                        name: 'Mike Chen',
                        role: 'Electrical Contractor',
                        veteran: true,
                        experience: '12 years',
                        specialties: ['Commercial Electrical', 'Solar Installation'],
                        status: 'Busy',
                        currentProject: 'Legacy Manufacturing Facility',
                        avatar: '⚡',
                        phone: '(555) 123-4570',
                        email: 'mike@mhconstruction.com'
                      },
                      {
                        name: 'Tony Williams',
                        role: 'Plumbing Specialist',
                        veteran: true,
                        experience: '14 years',
                        specialties: ['Residential Plumbing', 'HVAC Integration'],
                        status: 'Available',
                        currentProject: 'Miller Deck Addition',
                        avatar: '🔧',
                        phone: '(555) 123-4571',
                        email: 'tony@mhconstruction.com'
                      },
                      {
                        name: 'Lisa Martinez',
                        role: 'Safety Coordinator',
                        veteran: false,
                        experience: '10 years',
                        specialties: ['OSHA Compliance', 'Site Safety'],
                        status: 'Available',
                        currentProject: 'Multi-site Safety Audits',
                        avatar: '🦺',
                        phone: '(555) 123-4572',
                        email: 'lisa@mhconstruction.com'
                      }
                    ].map((member, index) => (
                      <Card key={index} className="relative">
                        <CardContent className="p-6">
                          {member.veteran && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                🇺🇸 Veteran
                              </span>
                            </div>
                          )}
                          
                          <div className="text-center mb-4">
                            <div className="text-4xl mb-2">{member.avatar}</div>
                            <h3 className="font-tactic-bold text-lg text-gray-900">{member.name}</h3>
                            <p className="text-sm text-brand-primary font-medium">{member.role}</p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="text-xs font-medium text-gray-700 mb-1">Experience</div>
                              <div className="text-sm text-gray-600">{member.experience}</div>
                            </div>
                            
                            <div>
                              <div className="text-xs font-medium text-gray-700 mb-1">Specialties</div>
                              <div className="flex flex-wrap gap-1">
                                {member.specialties.map((specialty, idx) => (
                                  <span key={idx} className="bg-brand-primary/10 text-brand-primary text-xs px-2 py-1 rounded">
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className="text-xs font-medium text-gray-700 mb-1">Current Status</div>
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                  member.status === 'Available' ? 'bg-green-500' :
                                  member.status === 'On-site' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}></div>
                                <span className="text-sm text-gray-600">{member.status}</span>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs font-medium text-gray-700 mb-1">Current Project</div>
                              <div className="text-sm text-gray-600">{member.currentProject}</div>
                            </div>

                            <div className="pt-2 border-t">
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>📞 {member.phone}</div>
                                <div>✉️ {member.email}</div>
                              </div>
                            </div>

                            <div className="flex space-x-2 pt-2">
                              <Button variant="secondary" size="sm" className="flex-1">
                                Message
                              </Button>
                              <Button variant="secondary" size="sm" className="flex-1">
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Veteran Support Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Veteran Support & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-3xl mb-3">🇺🇸</div>
                        <h3 className="font-semibold text-red-800 mb-2">Veteran Benefits Portal</h3>
                        <p className="text-sm text-red-700 mb-4">
                          Access VA benefits, healthcare, and support services for our veteran team members.
                        </p>
                        <Button variant="secondary" size="sm">
                          Access Portal
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-3xl mb-3">🎓</div>
                        <h3 className="font-semibold text-blue-800 mb-2">Training & Development</h3>
                        <p className="text-sm text-blue-700 mb-4">
                          Continuing education programs and certification opportunities for skill advancement.
                        </p>
                        <Button variant="secondary" size="sm">
                          View Programs
                        </Button>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-3xl mb-3">🤝</div>
                        <h3 className="font-semibold text-green-800 mb-2">Peer Support Network</h3>
                        <p className="text-sm text-green-700 mb-4">
                          Connect with other veteran professionals in the construction industry.
                        </p>
                        <Button variant="secondary" size="sm">
                          Join Network
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Team Schedule Management</h3>
                    <p className="text-gray-600">
                      Interactive calendar showing team member schedules, project assignments,
                      time-off requests, and availability for new projects.
                    </p>
                    <div className="flex justify-center space-x-4 mt-4">
                      <Button variant="primary">
                        Open Schedule
                      </Button>
                      <Button variant="secondary">
                        Time-off Requests
                      </Button>
                    </div>
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