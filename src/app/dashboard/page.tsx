import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui'
import {
  DashboardSidebar,
  DashboardStats,
  RecentConsultations,
  ProjectsOverview,
  TeamSchedule,
} from '../../components/dashboard'

export default function DashboardPage() {
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
                    Team Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Welcome back! Here&apos;s your MH Construction overview.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    📊 Reports
                  </Button>
                  <Button variant="primary" size="sm">
                    + New Project
                  </Button>
                  <div className="flex justify-center items-center bg-brand-primary rounded-full w-8 h-8 font-bold text-white text-sm">
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
              <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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
                  <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
                    <Button
                      variant="primary"
                      className="flex-col h-20 text-white"
                    >
                      <span className="mb-1 text-2xl">📅</span>
                      <span>Schedule Consultation</span>
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-col h-20 text-white"
                    >
                      <span className="mb-1 text-2xl">📋</span>
                      <span>Create Estimate</span>
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-col h-20 text-white"
                    >
                      <span className="mb-1 text-2xl">🏗️</span>
                      <span>Add Project</span>
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-col h-20 text-white"
                    >
                      <span className="mb-1 text-2xl">👥</span>
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
