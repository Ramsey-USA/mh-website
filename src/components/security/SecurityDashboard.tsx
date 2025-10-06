/**
 * Security Dashboard Component
 * Real-time security monitoring and vulnerability management interface
 */

'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Eye,
  Download,
  RefreshCw,
  Clock,
  Users,
  Globe,
  Lock,
  Unlock,
  Bug,
  Zap,
  TrendingUp,
  TrendingDown,
  FileText,
  Search,
  Filter,
} from 'lucide-react'

// Mock data types (in real app, these would come from security services)
interface SecurityMetrics {
  totalEvents: number
  criticalVulnerabilities: number
  activeThreats: number
  riskScore: number
  lastScanTime: Date
  systemStatus: 'secure' | 'warning' | 'critical'
  trends: {
    events: number
    vulnerabilities: number
    riskScore: number
  }
}

interface VulnerabilitySummary {
  total: number
  critical: number
  high: number
  medium: number
  low: number
  fixed: number
  pending: number
}

interface SecurityEvent {
  id: string
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  source: string
  description: string
  status: 'new' | 'investigating' | 'resolved'
}

interface AuditData {
  date: string
  events: number
  riskScore: number
  vulnerabilities: number
}

// Mock data
const mockSecurityMetrics: SecurityMetrics = {
  totalEvents: 1247,
  criticalVulnerabilities: 3,
  activeThreats: 1,
  riskScore: 73,
  lastScanTime: new Date(),
  systemStatus: 'warning',
  trends: {
    events: 12,
    vulnerabilities: -2,
    riskScore: 5,
  },
}

const mockVulnerabilities: VulnerabilitySummary = {
  total: 18,
  critical: 3,
  high: 5,
  medium: 7,
  low: 3,
  fixed: 12,
  pending: 6,
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    type: 'Rate Limit Exceeded',
    severity: 'medium',
    timestamp: new Date(),
    source: '192.168.1.100',
    description: 'Multiple failed login attempts detected',
    status: 'investigating',
  },
  {
    id: '2',
    type: 'XSS Attempt',
    severity: 'high',
    timestamp: new Date(Date.now() - 300000),
    source: '10.0.0.50',
    description: 'Malicious script injection detected in user input',
    status: 'new',
  },
  {
    id: '3',
    type: 'CSRF Token Invalid',
    severity: 'medium',
    timestamp: new Date(Date.now() - 600000),
    source: '203.0.113.25',
    description: 'Request submitted without valid CSRF token',
    status: 'resolved',
  },
]

const mockAuditData: AuditData[] = [
  { date: '2024-01-01', events: 45, riskScore: 65, vulnerabilities: 8 },
  { date: '2024-01-02', events: 52, riskScore: 71, vulnerabilities: 9 },
  { date: '2024-01-03', events: 38, riskScore: 68, vulnerabilities: 7 },
  { date: '2024-01-04', events: 67, riskScore: 73, vulnerabilities: 8 },
  { date: '2024-01-05', events: 41, riskScore: 69, vulnerabilities: 6 },
  { date: '2024-01-06', events: 58, riskScore: 72, vulnerabilities: 7 },
  { date: '2024-01-07', events: 49, riskScore: 73, vulnerabilities: 6 },
]

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isScanning, setIsScanning] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [metrics, setMetrics] = useState<SecurityMetrics>(mockSecurityMetrics)
  const [vulnerabilities, setVulnerabilities] =
    useState<VulnerabilitySummary>(mockVulnerabilities)
  const [securityEvents, setSecurityEvents] =
    useState<SecurityEvent[]>(mockSecurityEvents)
  const [auditData, setAuditData] = useState<AuditData[]>(mockAuditData)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalEvents: prev.totalEvents + Math.floor(Math.random() * 3),
        riskScore: Math.max(
          0,
          Math.min(100, prev.riskScore + (Math.random() - 0.5) * 2)
        ),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleStartScan = async () => {
    setIsScanning(true)
    // Simulate scan duration
    setTimeout(() => {
      setIsScanning(false)
      setMetrics(prev => ({
        ...prev,
        lastScanTime: new Date(),
      }))
    }, 5000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#DC2626'
      case 'high':
        return '#EA580C'
      case 'medium':
        return '#D97706'
      case 'low':
        return '#059669'
      default:
        return '#6B7280'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Activity className="w-5 h-5 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-red-500" />
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-green-500" />
    return <Activity className="w-4 h-4 text-gray-500" />
  }

  const vulnerabilityData = [
    { name: 'Critical', value: vulnerabilities.critical, color: '#DC2626' },
    { name: 'High', value: vulnerabilities.high, color: '#EA580C' },
    { name: 'Medium', value: vulnerabilities.medium, color: '#D97706' },
    { name: 'Low', value: vulnerabilities.low, color: '#059669' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Security Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor security events, vulnerabilities, and system health
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleStartScan}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isScanning ? (
              <>
                <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="mr-2 w-4 h-4" />
                Start Scan
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      {metrics.systemStatus !== 'secure' && (
        <Alert
          className={
            metrics.systemStatus === 'critical'
              ? 'border-red-200 bg-red-50'
              : 'border-yellow-200 bg-yellow-50'
          }
        >
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>
            {metrics.systemStatus === 'critical'
              ? 'Critical Security Issues Detected'
              : 'Security Warnings'}
          </AlertTitle>
          <AlertDescription>
            {metrics.criticalVulnerabilities > 0 && (
              <>
                {metrics.criticalVulnerabilities} critical vulnerabilities
                require immediate attention.
                <Button variant="link" className="ml-1 p-0 h-auto">
                  View details
                </Button>
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">System Status</CardTitle>
            {getStatusIcon(metrics.systemStatus)}
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl capitalize">
              {metrics.systemStatus}
            </div>
            <p className="text-muted-foreground text-xs">
              Last scan: {metrics.lastScanTime.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Security Events
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {metrics.totalEvents.toLocaleString()}
            </div>
            <div className="flex items-center text-muted-foreground text-xs">
              {getTrendIcon(metrics.trends.events)}
              <span className="ml-1">
                {metrics.trends.events > 0 ? '+' : ''}
                {metrics.trends.events} from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Vulnerabilities
            </CardTitle>
            <Bug className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {vulnerabilities.total}
              <span className="ml-2 font-normal text-red-600 text-sm">
                ({vulnerabilities.critical} critical)
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-xs">
              {getTrendIcon(metrics.trends.vulnerabilities)}
              <span className="ml-1">
                {metrics.trends.vulnerabilities > 0 ? '+' : ''}
                {metrics.trends.vulnerabilities} from last scan
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Risk Score</CardTitle>
            <Shield className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{metrics.riskScore}/100</div>
            <Progress value={metrics.riskScore} className="mt-2" />
            <div className="flex items-center mt-1 text-muted-foreground text-xs">
              {getTrendIcon(metrics.trends.riskScore)}
              <span className="ml-1">
                {metrics.trends.riskScore > 0 ? '+' : ''}
                {metrics.trends.riskScore} from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="threats">Threat Intel</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="gap-4 grid md:grid-cols-2">
            {/* Vulnerability Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Distribution</CardTitle>
                <CardDescription>
                  Current vulnerabilities by severity level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={vulnerabilityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {vulnerabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Security Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Security Trends (7 days)</CardTitle>
                <CardDescription>
                  Events, risk score, and vulnerabilities over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={auditData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="events"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Events"
                    />
                    <Line
                      type="monotone"
                      dataKey="riskScore"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Risk Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Security Events */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>
                  Latest security incidents and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.slice(0, 5).map(event => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full bg-${getSeverityColor(event.severity).replace('#', '')}`}
                        />
                        <div>
                          <p className="font-medium">{event.type}</p>
                          <p className="text-muted-foreground text-sm">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-muted-foreground text-xs">
                            <span className="flex items-center">
                              <Globe className="mr-1 w-3 h-3" />
                              {event.source}
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 w-3 h-3" />
                              {event.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            event.severity === 'critical'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {event.severity}
                        </Badge>
                        <Badge variant="outline">{event.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 w-4 h-4" />
                    View All Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="gap-4 grid md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Critical Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-red-600 text-3xl">
                  {vulnerabilities.critical}
                </div>
                <p className="text-muted-foreground text-sm">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fixed This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-green-600 text-3xl">
                  {vulnerabilities.fixed}
                </div>
                <p className="text-muted-foreground text-sm">
                  Vulnerabilities resolved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-yellow-600 text-3xl">
                  {vulnerabilities.pending}
                </div>
                <p className="text-muted-foreground text-sm">
                  Awaiting assessment
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Trends</CardTitle>
              <CardDescription>
                Vulnerability discovery and resolution over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={auditData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="vulnerabilities"
                    stroke="#EF4444"
                    fill="#FEE2E2"
                    name="Vulnerabilities"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">Security Events</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {securityEvents.map(event => (
                  <div key={event.id} className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div
                          className="rounded-full w-4 h-4"
                          style={{
                            backgroundColor: getSeverityColor(event.severity),
                          }}
                        />
                        <div>
                          <h4 className="font-medium">{event.type}</h4>
                          <p className="text-muted-foreground text-sm">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-muted-foreground text-xs">
                            <span>Source: {event.source}</span>
                            <span>
                              Time: {event.timestamp.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            event.severity === 'critical'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {event.severity}
                        </Badge>
                        <Badge variant="outline">{event.status}</Badge>
                        <Button variant="ghost" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log Analytics</CardTitle>
              <CardDescription>
                Security event patterns and anomaly detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={auditData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="events" fill="#3B82F6" name="Events" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <div className="gap-4 grid md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence</CardTitle>
                <CardDescription>
                  Current threat landscape and indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active IOCs</span>
                    <Badge variant="destructive">24</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Blocked IPs</span>
                    <Badge variant="secondary">156</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Malware Signatures</span>
                    <Badge variant="secondary">1,847</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Update</span>
                    <span className="text-muted-foreground text-sm">
                      2 hours ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Sources</CardTitle>
                <CardDescription>
                  Geographic distribution of threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { country: 'Unknown', threats: 45, percentage: 35 },
                    { country: 'China', threats: 32, percentage: 25 },
                    { country: 'Russia', threats: 28, percentage: 22 },
                    { country: 'Brazil', threats: 15, percentage: 12 },
                    { country: 'Other', threats: 8, percentage: 6 },
                  ].map(item => (
                    <div
                      key={item.country}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{item.country}</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 rounded-full w-24 h-2">
                          <div
                            className="bg-red-500 rounded-full h-2"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="font-medium text-sm">
                          {item.threats}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="gap-4 grid md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Security framework compliance levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { framework: 'NIST CSF', compliance: 87, status: 'good' },
                    {
                      framework: 'ISO 27001',
                      compliance: 78,
                      status: 'warning',
                    },
                    { framework: 'SOC 2', compliance: 92, status: 'good' },
                    { framework: 'GDPR', compliance: 95, status: 'excellent' },
                  ].map(item => (
                    <div key={item.framework} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          {item.framework}
                        </span>
                        <span className="text-sm">{item.compliance}%</span>
                      </div>
                      <Progress value={item.compliance} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Controls</CardTitle>
                <CardDescription>
                  Implementation status of security controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      control: 'Access Controls',
                      status: 'implemented',
                      icon: Lock,
                    },
                    {
                      control: 'Encryption',
                      status: 'implemented',
                      icon: Shield,
                    },
                    { control: 'Monitoring', status: 'implemented', icon: Eye },
                    {
                      control: 'Incident Response',
                      status: 'partial',
                      icon: AlertTriangle,
                    },
                    {
                      control: 'Business Continuity',
                      status: 'pending',
                      icon: Unlock,
                    },
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.control}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.control}</span>
                        </div>
                        <Badge
                          variant={
                            item.status === 'implemented'
                              ? 'default'
                              : item.status === 'partial'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
