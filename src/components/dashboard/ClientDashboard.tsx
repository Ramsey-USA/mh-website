"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "../ui";
import { ProjectTracking, ProjectNotifications } from "./ProjectTracking";
import { DocumentSharing } from "./DocumentSharing";

// Dashboard interfaces
interface ProjectStatus {
  id: string;
  name: string;
  status: "planning" | "in-progress" | "on-hold" | "completed" | "cancelled";
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  budget: number;
  spent: number;
  description: string;
  category: "residential" | "commercial" | "renovation" | "emergency";
  priority: "low" | "medium" | "high" | "urgent";
  lastUpdate: string;
  nextMilestone: string;
  assignedTeam: string[];
  photos: string[];
  documents: Document[];
}

interface Document {
  id: string;
  name: string;
  type: "contract" | "permit" | "invoice" | "photo" | "plan" | "other";
  url: string;
  uploadDate: string;
  size: string;
}

interface Communication {
  id: string;
  type: "message" | "update" | "milestone" | "issue";
  title: string;
  content: string;
  author: string;
  date: string;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  projectId?: string;
}

interface DashboardStats {
  activeProjects: number;
  completedProjects: number;
  upcomingMilestones: number;
  totalBudget: number;
  unreadMessages: number;
  documentsShared: number;
}

// Mock data
const mockProjects: ProjectStatus[] = [
  {
    id: "proj-001",
    name: "Custom Kitchen Renovation",
    status: "in-progress",
    progress: 65,
    startDate: "2024-11-01",
    estimatedCompletion: "2025-01-15",
    budget: 45000,
    spent: 29250,
    description:
      "Complete kitchen renovation with custom cabinets and granite countertops",
    category: "renovation",
    priority: "high",
    lastUpdate: "2024-12-20",
    nextMilestone: "Countertop installation scheduled for Jan 5",
    assignedTeam: ["Mike Rodriguez", "Sarah Chen", "David Kim"],
    photos: [
      "/images/kitchen-progress-1.jpg",
      "/images/kitchen-progress-2.jpg",
    ],
    documents: [
      {
        id: "doc-001",
        name: "Kitchen Plans.pdf",
        type: "plan",
        url: "#",
        uploadDate: "2024-11-01",
        size: "2.3 MB",
      },
      {
        id: "doc-002",
        name: "Permit Application.pdf",
        type: "permit",
        url: "#",
        uploadDate: "2024-11-05",
        size: "890 KB",
      },
    ],
  },
  {
    id: "proj-002",
    name: "Bathroom Addition",
    status: "planning",
    progress: 15,
    startDate: "2025-01-20",
    estimatedCompletion: "2025-03-30",
    budget: 28000,
    spent: 4200,
    description:
      "Master bathroom addition with walk-in shower and double vanity",
    category: "residential",
    priority: "medium",
    lastUpdate: "2024-12-18",
    nextMilestone: "Final design approval needed",
    assignedTeam: ["Lisa Thompson", "Mark Wilson"],
    photos: [],
    documents: [
      {
        id: "doc-003",
        name: "Bathroom Design.pdf",
        type: "plan",
        url: "#",
        uploadDate: "2024-12-15",
        size: "1.8 MB",
      },
    ],
  },
];

const mockCommunications: Communication[] = [
  {
    id: "comm-001",
    type: "update",
    title: "Kitchen Progress Update",
    content:
      "Electrical work completed today. Plumbing installation begins tomorrow.",
    author: "Mike Rodriguez - Project Manager",
    date: "2024-12-20",
    isRead: false,
    priority: "medium",
    projectId: "proj-001",
  },
  {
    id: "comm-002",
    type: "milestone",
    title: "Bathroom Design Approval Required",
    content:
      "Please review the attached bathroom design plans and provide approval to proceed.",
    author: "Lisa Thompson - Design Lead",
    date: "2024-12-18",
    isRead: false,
    priority: "high",
    projectId: "proj-002",
  },
  {
    id: "comm-003",
    type: "message",
    title: "Material Delivery Schedule",
    content:
      "Your granite countertops are scheduled for delivery on January 3rd. Please ensure access to the property.",
    author: "Sarah Chen - Materials Coordinator",
    date: "2024-12-17",
    isRead: true,
    priority: "medium",
    projectId: "proj-001",
  },
];

export const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "tracking" | "communications" | "documents"
  >("overview");
  const [projects] = useState<ProjectStatus[]>(mockProjects);
  const [communications, setCommunications] =
    useState<Communication[]>(mockCommunications);
  const [selectedProject, setSelectedProject] = useState<ProjectStatus | null>(
    null,
  );

  const stats: DashboardStats = {
    activeProjects: projects.filter(
      (p) => p.status === "in-progress" || p.status === "planning",
    ).length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    upcomingMilestones: 3,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    unreadMessages: communications.filter((c) => !c.isRead).length,
    documentsShared: projects.reduce((sum, p) => sum + p.documents.length, 0),
  };

  const getStatusColor = (status: ProjectStatus["status"]) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-green-100 text-green-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const markAsRead = (communicationId: string) => {
    setCommunications((prev) =>
      prev.map((comm) =>
        comm.id === communicationId ? { ...comm, isRead: true } : comm,
      ),
    );
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-tactic-bold text-gray-900 dark:text-gray-100 text-3xl">
          Your Partnership Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your partnership projects, collaborate with your team, and
          access important partnership documents.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 border-gray-200 border-b">
        <nav className="flex space-x-8 -mb-px">
          {[
            {
              id: "overview",
              label: "Partnership Overview",
              icon: "[ANALYTICS]",
            },
            {
              id: "projects",
              label: "Partnership Projects",
              icon: "[CONSTRUCTION]",
            },
            {
              id: "tracking",
              label: "Partnership Updates",
              icon: "[TRENDING_UP]",
            },
            { id: "communications", label: "Team Communications", icon: "💬" },
            { id: "documents", label: "Partnership Documents", icon: "📄" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as
                    | "overview"
                    | "projects"
                    | "tracking"
                    | "communications"
                    | "documents",
                )
              }
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              {tab.id === "communications" && stats.unreadMessages > 0 && (
                <span className="bg-red-500 ml-2 px-2 py-1 rounded-full text-white text-xs">
                  {stats.unreadMessages}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="mr-4 text-3xl">[CONSTRUCTION]</div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
                      {stats.activeProjects}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Active Partnership Projects
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="mr-4 text-3xl">[CHECK_CIRCLE]</div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
                      {stats.completedProjects}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Partnership Successes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="mr-4 text-3xl">[ATTACH_MONEY]</div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-2xl">
                      ${stats.totalBudget.toLocaleString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Partnership Investment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Partnership Projects Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Active Partnership Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects
                    .filter(
                      (p) =>
                        p.status === "in-progress" || p.status === "planning",
                    )
                    .map((project) => (
                      <div
                        key={project.id}
                        className="flex justify-between items-center p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {project.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {project.nextMilestone}
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between mb-1 text-gray-600 dark:text-gray-300 text-sm">
                              <span>Partnership Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full w-full h-2">
                              <div
                                className="bg-brand-primary rounded-full h-2"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            project.status,
                          )}`}
                        >
                          {project.status}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Partnership Communications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Partnership Updates
                  {stats.unreadMessages > 0 && (
                    <span className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded-full text-red-800 dark:text-red-200 text-xs">
                      {stats.unreadMessages} unread
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communications.slice(0, 3).map((comm) => (
                    <div
                      key={comm.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        !comm.isRead
                          ? "border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                      onClick={() => markAsRead(comm.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {comm.title}
                          </h4>
                          <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                            {comm.content}
                          </p>
                          <p className="mt-2 text-gray-500 dark:text-gray-400 text-xs">
                            {comm.author} • {comm.date}
                          </p>
                        </div>
                        <div className="flex items-center ml-4">
                          <span
                            className={`text-xs ${getPriorityColor(
                              comm.priority,
                            )}`}
                          >
                            {comm.priority}
                          </span>
                          {!comm.isRead && (
                            <div className="bg-brand-primary ml-2 rounded-full w-2 h-2"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
            {/* Project List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Partnership Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-6 border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                          selectedProject?.id === project.id
                            ? "border-brand-primary bg-brand-primary/5"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {project.name}
                            </h3>
                            <p className="text-gray-600">
                              {project.description}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              project.status,
                            )}`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <div className="gap-4 grid grid-cols-2 mb-4">
                          <div>
                            <p className="text-gray-600 text-sm">Start Date</p>
                            <p className="font-medium">
                              {new Date(project.startDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">
                              Est. Completion
                            </p>
                            <p className="font-medium">
                              {new Date(
                                project.estimatedCompletion,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Budget</p>
                            <p className="font-medium">
                              ${project.budget.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Spent</p>
                            <p className="font-medium">
                              ${project.spent.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between mb-2 text-gray-600 text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full w-full h-3">
                            <div
                              className="bg-brand-primary rounded-full h-3 transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-600 text-sm">
                              Next Milestone
                            </p>
                            <p className="font-medium text-sm">
                              {project.nextMilestone}
                            </p>
                          </div>
                          <Button variant="default" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Details Sidebar */}
            <div>
              {selectedProject ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedProject.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">Team Members</h4>
                        <div className="space-y-2">
                          {selectedProject.assignedTeam.map((member, index) => (
                            <div key={index} className="flex items-center">
                              <div className="flex justify-center items-center bg-brand-primary mr-3 rounded-full w-8 h-8 text-white text-sm">
                                {member
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="text-sm">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold">Recent Documents</h4>
                        <div className="space-y-2">
                          {selectedProject.documents.slice(0, 3).map((doc) => (
                            <div
                              key={doc.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-gray-900">{doc.name}</span>
                              <span className="text-gray-500">{doc.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button variant="default" className="mb-2 w-full">
                          [PHONE] Contact Team
                        </Button>
                        <Button variant="outline" className="w-full">
                          📄 View All Documents
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-gray-500 text-center">
                    <div className="mb-4 text-4xl">[CONSTRUCTION]</div>
                    <p>Select a project to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Communications Tab */}
      {activeTab === "communications" && (
        <Card>
          <CardHeader>
            <CardTitle>Project Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communications.map((comm) => (
                <div
                  key={comm.id}
                  className={`p-6 border rounded-lg ${
                    !comm.isRead
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="mr-2 text-lg">
                          {comm.type === "update"
                            ? "📢"
                            : comm.type === "milestone"
                              ? "[GPS_FIXED]"
                              : comm.type === "issue"
                                ? "[WARNING]"
                                : "💬"}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {comm.title}
                        </h3>
                        {!comm.isRead && (
                          <span className="bg-brand-primary ml-2 rounded-full w-2 h-2"></span>
                        )}
                      </div>
                      <p className="mb-3 text-gray-700">{comm.content}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{comm.author}</span>
                        <span className="mx-2">•</span>
                        <span>{comm.date}</span>
                        <span className="mx-2">•</span>
                        <span className={getPriorityColor(comm.priority)}>
                          {comm.priority} priority
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {!comm.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(comm.id)}
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Updates/Tracking Tab */}
      {activeTab === "tracking" && (
        <div className="space-y-8">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            <ProjectTracking projectId={selectedProject?.id || "all"} />
            <Card>
              <CardHeader>
                <CardTitle>Project Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="default" className="w-full">
                    [PHONE] Schedule Team Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    💬 Send Message to Team
                  </Button>
                  <Button variant="outline" className="w-full">
                    📄 Request Progress Report
                  </Button>
                  <Button variant="outline" className="w-full">
                    [ASSIGNMENT] View Change Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Communications Tab */}
      {activeTab === "communications" && (
        <Card>
          <CardHeader>
            <CardTitle>Project Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communications.map((comm) => (
                <div
                  key={comm.id}
                  className={`p-6 border rounded-lg ${
                    !comm.isRead
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="mr-2 text-lg">
                          {comm.type === "update"
                            ? "[INFO]"
                            : comm.type === "milestone"
                              ? "[GPS_FIXED]"
                              : comm.type === "issue"
                                ? "[WARNING]"
                                : "[NOTIFICATIONS]"}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {comm.title}
                        </h3>
                        {!comm.isRead && (
                          <span className="bg-brand-primary ml-2 rounded-full w-2 h-2"></span>
                        )}
                      </div>
                      <p className="mb-3 text-gray-700">{comm.content}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{comm.author}</span>
                        <span className="mx-2">•</span>
                        <span>{comm.date}</span>
                        <span className="mx-2">•</span>
                        <span className={getPriorityColor(comm.priority)}>
                          {comm.priority} priority
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {!comm.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(comm.id)}
                        >
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <DocumentSharing projectId={selectedProject?.id} canUpload={true} />
      )}

      {/* Real-time Notifications */}
      <ProjectNotifications />
    </div>
  );
};
