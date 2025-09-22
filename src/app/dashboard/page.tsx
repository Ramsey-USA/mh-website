import { Button, Card, CardHeader, CardTitle, CardContent } from '../../components/ui'
import { 
  DashboardSidebar, 
  DashboardStats, 
  RecentConsultations, 
  ProjectsOverview, 
  TeamSchedule 
} from '../../components/dashboard'

export default function DashboardPage() {
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
                  <h1 className="text-2xl font-tactic-bold text-brand-primary">Team Dashboard</h1>
                  <p className="text-gray-600">Welcome back! Here's your MH Construction overview.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="secondary" size="sm">
                    📊 Reports
                  </Button>
                  <Button variant="primary" size="sm">
                    + New Project
                  </Button>
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    MH
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6">
            <div className="space-y-6">
              
              {/* Stats Overview */}
              <DashboardStats />

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Recent Consultations */}
                <div className="xl:col-span-2">
                  <RecentConsultations />
                </div>

                {/* Team Schedule */}
                <div>
                  <TeamSchedule />
                </div>

                {/* Projects Overview */}
                <div className="lg:col-span-2 xl:col-span-3">
                  <ProjectsOverview />
                </div>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="secondary" className="h-20 flex-col">
                      <span className="text-2xl mb-1">📅</span>
                      <span>Schedule Consultation</span>
                    </Button>
                    <Button variant="secondary" className="h-20 flex-col">
                      <span className="text-2xl mb-1">📋</span>
                      <span>Create Estimate</span>
                    </Button>
                    <Button variant="secondary" className="h-20 flex-col">
                      <span className="text-2xl mb-1">🏗️</span>
                      <span>Add Project</span>
                    </Button>
                    <Button variant="secondary" className="h-20 flex-col">
                      <span className="text-2xl mb-1">👥</span>
                      <span>Manage Team</span>
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