'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from '@/components/animations/FramerMotionComponents'
import ContentManagement from '@/components/dashboard/ContentManagementSimple'
import { useAuth } from '@/lib/auth/AuthContext'
import { useAnalytics } from '@/components/analytics/enhanced-analytics'
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  TrendingUp,
  Eye,
  Clock,
  Star,
  Settings,
  Activity,
} from 'lucide-react'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore'
import { getFirebaseDb } from '@/lib/firebase/config'

interface DashboardStats {
  totalProjects: number
  totalBlogPosts: number
  totalTestimonials: number
  pendingTestimonials: number
  recentActivity: ActivityItem[]
  popularContent: ContentItem[]
}

interface ActivityItem {
  id: string
  type: 'project_added' | 'blog_published' | 'testimonial_received'
  title: string
  timestamp: Timestamp
  details: string
}

interface ContentItem {
  id: string
  title: string
  type: 'blog' | 'project' | 'testimonial'
  views: number
  engagement: number
}

type DashboardTab = 'overview' | 'content' | 'analytics' | 'settings'

const AdminDashboard = () => {
  const { user } = useAuth()
  const { trackEvent } = useAnalytics()

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview')
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalBlogPosts: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0,
    recentActivity: [],
    popularContent: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadDashboardData()
      trackEvent('admin_dashboard_view', {
        event_category: 'admin',
        event_label: 'Dashboard accessed',
      })
    }
  }, [user, trackEvent])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const firestore = getFirebaseDb()

      // Load projects count
      const projectsSnapshot = await getDocs(collection(firestore, 'projects'))
      const totalProjects = projectsSnapshot.size

      // Load blog posts count
      const blogQuery = query(
        collection(firestore, 'blog'),
        where('published', '==', true)
      )
      const blogSnapshot = await getDocs(blogQuery)
      const totalBlogPosts = blogSnapshot.size

      // Load testimonials
      const testimonialsSnapshot = await getDocs(
        collection(firestore, 'testimonials')
      )
      const totalTestimonials = testimonialsSnapshot.size

      // Count pending testimonials
      const pendingQuery = query(
        collection(firestore, 'testimonials'),
        where('approved', '==', false)
      )
      const pendingSnapshot = await getDocs(pendingQuery)
      const pendingTestimonials = pendingSnapshot.size

      // Load recent activity (mock data for now)
      const recentActivity: ActivityItem[] = [
        {
          id: '1',
          type: 'project_added',
          title: 'New project added',
          timestamp: Timestamp.now(),
          details: 'Kitchen renovation project in Spokane',
        },
        {
          id: '2',
          type: 'blog_published',
          title: 'Blog post published',
          timestamp: Timestamp.now(),
          details: 'Winter Construction Preparation Tips',
        },
        {
          id: '3',
          type: 'testimonial_received',
          title: 'New testimonial received',
          timestamp: Timestamp.now(),
          details: '5-star review from satisfied customer',
        },
      ]

      // Mock popular content data
      const popularContent: ContentItem[] = [
        {
          id: '1',
          title: 'Kitchen Renovation Trends 2024',
          type: 'blog',
          views: 1250,
          engagement: 85,
        },
        {
          id: '2',
          title: 'Luxury Mountain Home',
          type: 'project',
          views: 980,
          engagement: 92,
        },
        {
          id: '3',
          title: 'Outstanding Service Review',
          type: 'testimonial',
          views: 450,
          engagement: 95,
        },
      ]

      setStats({
        totalProjects,
        totalBlogPosts,
        totalTestimonials,
        pendingTestimonials,
        recentActivity,
        popularContent,
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    color = 'primary',
  }: {
    title: string
    value: number
    icon: any
    trend?: string
    color?: string
  }) => (
    <HoverScale
      className={`bg-white rounded-lg p-6 shadow-sm border-l-4 border-${color}-500`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-600 text-sm">{title}</p>
          <p className="font-bold text-gray-900 text-3xl">{value}</p>
          {trend && (
            <p className="mt-1 text-green-600 text-sm">
              <TrendingUp className="inline mr-1 w-4 h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </HoverScale>
  )

  const renderOverview = () => (
    <div className="space-y-6">
      <FadeInWhenVisible>
        <h2 className="mb-6 font-bold text-2xl">Dashboard Overview</h2>
      </FadeInWhenVisible>

      {/* Stats Grid */}
      <StaggeredFadeIn className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={BarChart3}
          trend="+12% this month"
          color="blue"
        />
        <StatCard
          title="Published Posts"
          value={stats.totalBlogPosts}
          icon={FileText}
          trend="+5% this month"
          color="green"
        />
        <StatCard
          title="Total Testimonials"
          value={stats.totalTestimonials}
          icon={Star}
          trend="+8% this month"
          color="yellow"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingTestimonials}
          icon={Clock}
          color="red"
        />
      </StaggeredFadeIn>

      <div className="gap-6 grid lg:grid-cols-2">
        {/* Recent Activity */}
        <FadeInWhenVisible className="bg-white shadow-sm p-6 rounded-lg">
          <h3 className="flex items-center mb-4 font-semibold text-lg">
            <Activity className="mr-2 w-5 h-5" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {stats.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.type === 'project_added' && (
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  {activity.type === 'blog_published' && (
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <FileText className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                  {activity.type === 'testimonial_received' && (
                    <div className="bg-yellow-100 p-1.5 rounded-full">
                      <Star className="w-4 h-4 text-yellow-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">
                    {activity.title}
                  </p>
                  <p className="text-gray-500 text-sm">{activity.details}</p>
                  <p className="mt-1 text-gray-400 text-xs">
                    {activity.timestamp.toDate().toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>

        {/* Popular Content */}
        <FadeInWhenVisible className="bg-white shadow-sm p-6 rounded-lg">
          <h3 className="flex items-center mb-4 font-semibold text-lg">
            <TrendingUp className="mr-2 w-5 h-5" />
            Popular Content
          </h3>
          <div className="space-y-4">
            {stats.popularContent.map(content => (
              <div
                key={content.id}
                className="flex justify-between items-center"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    {content.title}
                  </p>
                  <div className="flex items-center space-x-4 text-gray-500 text-xs">
                    <span className="flex items-center">
                      <Eye className="mr-1 w-3 h-3" />
                      {content.views} views
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="mr-1 w-3 h-3" />
                      {content.engagement}% engagement
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      content.type === 'blog'
                        ? 'bg-green-100 text-green-800'
                        : content.type === 'project'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {content.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <FadeInWhenVisible>
        <h2 className="mb-6 font-bold text-2xl">Analytics Overview</h2>
      </FadeInWhenVisible>

      <div className="bg-white shadow-sm p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-lg">Performance Metrics</h3>
        <div className="gap-6 grid md:grid-cols-3">
          <div className="text-center">
            <div className="font-bold text-blue-600 text-3xl">2.4k</div>
            <div className="text-gray-600 text-sm">Monthly Visitors</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-green-600 text-3xl">67%</div>
            <div className="text-gray-600 text-sm">Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-purple-600 text-3xl">3.2m</div>
            <div className="text-gray-600 text-sm">Page Views</div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-lg">Top Performing Pages</h3>
        <div className="space-y-3">
          {[
            { page: '/estimator', views: 890, conversions: 45 },
            { page: '/portfolio', views: 750, conversions: 32 },
            { page: '/services', views: 620, conversions: 28 },
            { page: '/blog', views: 540, conversions: 15 },
          ].map((page, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="font-medium">{page.page}</span>
              <div className="flex space-x-4 text-gray-600 text-sm">
                <span>{page.views} views</span>
                <span>{page.conversions} conversions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <FadeInWhenVisible>
        <h2 className="mb-6 font-bold text-2xl">Settings</h2>
      </FadeInWhenVisible>

      <div className="bg-white shadow-sm p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-lg">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-sm">Site Title</label>
            <input
              type="text"
              className="p-3 border rounded-lg w-full"
              defaultValue="MH Construction"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm">
              Company Description
            </label>
            <textarea
              className="p-3 border rounded-lg w-full"
              rows={3}
              defaultValue="Professional construction services in Washington State"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm">
              Contact Email
            </label>
            <input
              type="email"
              className="p-3 border rounded-lg w-full"
              defaultValue="info@mhconstruction.com"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button>Save Settings</Button>
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-lg">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-sm">
              Meta Description
            </label>
            <textarea
              className="p-3 border rounded-lg w-full"
              rows={2}
              defaultValue="Professional construction and renovation services in Washington State. Expert craftsmanship for residential and commercial projects."
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm">Keywords</label>
            <input
              type="text"
              className="p-3 border rounded-lg w-full"
              defaultValue="construction, renovation, Washington, contractor"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button>Update SEO</Button>
        </div>
      </div>
    </div>
  )

  if (!user) {
    return (
      <div className="py-8 text-center">
        <h1 className="mb-4 font-bold text-2xl">Access Denied</h1>
        <p>Please log in to access the admin dashboard.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-8">
            <h1 className="font-bold text-gray-900 text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your website content and monitor performance
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-gray-200 border-b">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'content', label: 'Content', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="mr-2 w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'content' && <ContentManagement />}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
