"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "../ui";

interface SharedDocument {
  id: string;
  name: string;
  type:
    | "contract"
    | "permit"
    | "invoice"
    | "photo"
    | "plan"
    | "report"
    | "other";
  category: "project" | "legal" | "financial" | "progress" | "reference";
  url: string;
  uploadDate: string;
  uploadedBy: string;
  size: string;
  description?: string;
  projectId?: string;
  isPrivate: boolean;
  downloadCount: number;
  version: string;
  status: "active" | "archived" | "pending-review";
}

interface DocumentSharingProps {
  projectId?: string;
  canUpload?: boolean;
  className?: string;
}

const mockDocuments: SharedDocument[] = [
  {
    id: "doc-001",
    name: "Kitchen Renovation Contract.pdf",
    type: "contract",
    category: "legal",
    url: "#",
    uploadDate: "2024-11-01",
    uploadedBy: "MH Construction Legal Team",
    size: "2.3 MB",
    description:
      "Signed contract for kitchen renovation project including all terms and conditions.",
    projectId: "proj-001",
    isPrivate: false,
    downloadCount: 3,
    version: "1.0",
    status: "active",
  },
  {
    id: "doc-002",
    name: "Building Permit - Bathroom Addition.pdf",
    type: "permit",
    category: "legal",
    url: "#",
    uploadDate: "2024-12-17",
    uploadedBy: "Lisa Thompson",
    size: "890 KB",
    description:
      "Approved building permit for master bathroom addition project.",
    projectId: "proj-002",
    isPrivate: false,
    downloadCount: 1,
    version: "1.0",
    status: "active",
  },
  {
    id: "doc-003",
    name: "Progress Photos - Week 3.zip",
    type: "photo",
    category: "progress",
    url: "#",
    uploadDate: "2024-12-20",
    uploadedBy: "Mike Rodriguez",
    size: "15.7 MB",
    description:
      "Weekly progress photos showing demolition completion and electrical rough-in.",
    projectId: "proj-001",
    isPrivate: false,
    downloadCount: 5,
    version: "1.0",
    status: "active",
  },
  {
    id: "doc-004",
    name: "Invoice #MH-2024-1205.pdf",
    type: "invoice",
    category: "financial",
    url: "#",
    uploadDate: "2024-12-15",
    uploadedBy: "MH Construction Billing",
    size: "445 KB",
    description: "Progress billing for work completed through December 15th.",
    projectId: "proj-001",
    isPrivate: false,
    downloadCount: 2,
    version: "1.0",
    status: "active",
  },
  {
    id: "doc-005",
    name: "Final Kitchen Design Plans.dwg",
    type: "plan",
    category: "project",
    url: "#",
    uploadDate: "2024-10-25",
    uploadedBy: "Design Team",
    size: "5.2 MB",
    description:
      "Approved architectural drawings and design specifications for kitchen renovation.",
    projectId: "proj-001",
    isPrivate: false,
    downloadCount: 8,
    version: "2.1",
    status: "active",
  },
];

export const DocumentSharing: React.FC<DocumentSharingProps> = ({
  projectId,
  canUpload = true,
  className = "",
}) => {
  const [documents, setDocuments] = useState<SharedDocument[]>(mockDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocuments = documents.filter((doc) => {
    const categoryMatch =
      selectedCategory === "all" || doc.category === selectedCategory;
    const projectMatch = !projectId || doc.projectId === projectId;
    return categoryMatch && projectMatch;
  });

  const categories = [
    { value: "all", label: "All Documents", icon: "📄" },
    { value: "project", label: "Project Files", icon: "[CONSTRUCTION]" },
    { value: "legal", label: "Legal Documents", icon: "[ASSIGNMENT]" },
    { value: "financial", label: "Financial", icon: "[ATTACH_MONEY]" },
    { value: "progress", label: "Progress Reports", icon: "[TRENDING_UP]" },
    { value: "reference", label: "Reference", icon: "📚" },
  ];

  const getDocumentIcon = (type: SharedDocument["type"]) => {
    switch (type) {
      case "contract":
        return "[ASSIGNMENT]";
      case "permit":
        return "📜";
      case "invoice":
        return "[ATTACH_MONEY]";
      case "photo":
        return "[PHOTO_CAMERA]";
      case "plan":
        return "📐";
      case "report":
        return "[ANALYTICS]";
      default:
        return "📄";
    }
  };

  const getStatusColor = (status: SharedDocument["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "pending-review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    // Add new document to the list
    const file = files[0];
    const newDocument: SharedDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: "other",
      category: "project",
      url: "#",
      uploadDate: new Date().toISOString().split("T")[0],
      uploadedBy: "You",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      description: "Recently uploaded document",
      projectId: projectId || "proj-001",
      isPrivate: false,
      downloadCount: 0,
      version: "1.0",
      status: "active",
    };

    setDocuments((prev) => [newDocument, ...prev]);
    setIsUploading(false);
    setUploadProgress(0);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = (document: SharedDocument) => {
    // Simulate download
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === document.id
          ? { ...doc, downloadCount: doc.downloadCount + 1 }
          : doc,
      ),
    );

    // In a real app, this would trigger the actual download
    console.log("Downloading:", document.name);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Shared Documents</CardTitle>
          {canUpload && (
            <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.dwg,.zip"
              />
              <Button
                variant="default"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? "📤 Uploading..." : "📤 Upload"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Upload Progress */}
        {isUploading && (
          <div className="bg-blue-50 mb-6 p-4 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-800 text-sm">
                Uploading...
              </span>
              <span className="text-blue-600 text-sm">{uploadProgress}%</span>
            </div>
            <div className="bg-blue-200 rounded-full w-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <div className="py-8 text-gray-500 text-center">
              <div className="mb-4 text-4xl">📄</div>
              <p>No documents found for the selected category</p>
              {canUpload && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload First Document
                </Button>
              )}
            </div>
          ) : (
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="hover:shadow-md p-4 border border-gray-200 rounded-lg transition-shadow"
                >
                  {/* Document Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <span className="mr-3 text-2xl">
                        {getDocumentIcon(document.type)}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {document.name}
                        </h4>
                        <p className="mt-1 text-gray-500 text-xs">
                          v{document.version} • {document.size}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        document.status,
                      )}`}
                    >
                      {document.status}
                    </span>
                  </div>

                  {/* Document Details */}
                  {document.description && (
                    <p className="mb-3 text-gray-600 text-sm line-clamp-2">
                      {document.description}
                    </p>
                  )}

                  {/* Document Meta */}
                  <div className="space-y-1 mb-4 text-gray-500 text-xs">
                    <div className="flex justify-between">
                      <span>Uploaded by:</span>
                      <span className="font-medium">{document.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downloads:</span>
                      <span>{document.downloadCount}</span>
                    </div>
                  </div>

                  {/* Document Actions */}
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownload(document)}
                    >
                      📥 Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3"
                      onClick={() => console.log("Share:", document.id)}
                    >
                      🔗
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Document Statistics */}
        <div className="mt-8 pt-6 border-gray-200 border-t">
          <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-center">
            <div>
              <p className="font-bold text-brand-primary text-2xl">
                {filteredDocuments.length}
              </p>
              <p className="text-gray-600 text-sm">Documents</p>
            </div>
            <div>
              <p className="font-bold text-brand-primary text-2xl">
                {filteredDocuments.reduce(
                  (sum, doc) => sum + doc.downloadCount,
                  0,
                )}
              </p>
              <p className="text-gray-600 text-sm">Downloads</p>
            </div>
            <div>
              <p className="font-bold text-brand-primary text-2xl">
                {(
                  filteredDocuments.reduce(
                    (sum, doc) =>
                      sum + parseFloat(doc.size.replace(/[^\d.]/g, "")),
                    0,
                  ) / 1024
                ).toFixed(1)}
              </p>
              <p className="text-gray-600 text-sm">GB Total</p>
            </div>
            <div>
              <p className="font-bold text-brand-primary text-2xl">
                {
                  filteredDocuments.filter((doc) => doc.status === "active")
                    .length
                }
              </p>
              <p className="text-gray-600 text-sm">Active</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
