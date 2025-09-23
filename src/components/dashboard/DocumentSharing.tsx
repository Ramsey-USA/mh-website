'use client'

import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '../ui'

interface SharedDocument {
  id: string
  name: string
  type:
    | 'contract'
    | 'permit'
    | 'invoice'
    | 'photo'
    | 'plan'
    | 'report'
    | 'other'
  category: 'project' | 'legal' | 'financial' | 'progress' | 'reference'
  url: string
  uploadDate: string
  uploadedBy: string
  size: string
  description?: string
  projectId?: string
  isPrivate: boolean
  downloadCount: number
  version: string
  status: 'active' | 'archived' | 'pending-review'
}

interface DocumentSharingProps {
  projectId?: string
  canUpload?: boolean
  className?: string
}

const mockDocuments: SharedDocument[] = [
  {
    id: 'doc-001',
    name: 'Kitchen Renovation Contract.pdf',
    type: 'contract',
    category: 'legal',
    url: '#',
    uploadDate: '2024-11-01',
    uploadedBy: 'MH Construction Legal Team',
    size: '2.3 MB',
    description:
      'Signed contract for kitchen renovation project including all terms and conditions.',
    projectId: 'proj-001',
    isPrivate: false,
    downloadCount: 3,
    version: '1.0',
    status: 'active',
  },
  {
    id: 'doc-002',
    name: 'Building Permit - Bathroom Addition.pdf',
    type: 'permit',
    category: 'legal',
    url: '#',
    uploadDate: '2024-12-17',
    uploadedBy: 'Lisa Thompson',
    size: '890 KB',
    description:
      'Approved building permit for master bathroom addition project.',
    projectId: 'proj-002',
    isPrivate: false,
    downloadCount: 1,
    version: '1.0',
    status: 'active',
  },
  {
    id: 'doc-003',
    name: 'Progress Photos - Week 3.zip',
    type: 'photo',
    category: 'progress',
    url: '#',
    uploadDate: '2024-12-20',
    uploadedBy: 'Mike Rodriguez',
    size: '15.7 MB',
    description:
      'Weekly progress photos showing demolition completion and electrical rough-in.',
    projectId: 'proj-001',
    isPrivate: false,
    downloadCount: 5,
    version: '1.0',
    status: 'active',
  },
  {
    id: 'doc-004',
    name: 'Invoice #MH-2024-1205.pdf',
    type: 'invoice',
    category: 'financial',
    url: '#',
    uploadDate: '2024-12-15',
    uploadedBy: 'MH Construction Billing',
    size: '445 KB',
    description: 'Progress billing for work completed through December 15th.',
    projectId: 'proj-001',
    isPrivate: false,
    downloadCount: 2,
    version: '1.0',
    status: 'active',
  },
  {
    id: 'doc-005',
    name: 'Final Kitchen Design Plans.dwg',
    type: 'plan',
    category: 'project',
    url: '#',
    uploadDate: '2024-10-25',
    uploadedBy: 'Design Team',
    size: '5.2 MB',
    description:
      'Approved architectural drawings and design specifications for kitchen renovation.',
    projectId: 'proj-001',
    isPrivate: false,
    downloadCount: 8,
    version: '2.1',
    status: 'active',
  },
]

export const DocumentSharing: React.FC<DocumentSharingProps> = ({
  projectId,
  canUpload = true,
  className = '',
}) => {
  const [documents, setDocuments] = useState<SharedDocument[]>(mockDocuments)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredDocuments = documents.filter(doc => {
    const categoryMatch =
      selectedCategory === 'all' || doc.category === selectedCategory
    const projectMatch = !projectId || doc.projectId === projectId
    return categoryMatch && projectMatch
  })

  const categories = [
    { value: 'all', label: 'All Documents', icon: '📄' },
    { value: 'project', label: 'Project Files', icon: '🏗️' },
    { value: 'legal', label: 'Legal Documents', icon: '📋' },
    { value: 'financial', label: 'Financial', icon: '💰' },
    { value: 'progress', label: 'Progress Reports', icon: '📈' },
    { value: 'reference', label: 'Reference', icon: '📚' },
  ]

  const getDocumentIcon = (type: SharedDocument['type']) => {
    switch (type) {
      case 'contract':
        return '📋'
      case 'permit':
        return '📜'
      case 'invoice':
        return '💰'
      case 'photo':
        return '📸'
      case 'plan':
        return '📐'
      case 'report':
        return '📊'
      default:
        return '📄'
    }
  }

  const getStatusColor = (status: SharedDocument['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      case 'pending-review':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    // Add new document to the list
    const file = files[0]
    const newDocument: SharedDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: 'other',
      category: 'project',
      url: '#',
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'You',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      description: 'Recently uploaded document',
      projectId: projectId || 'proj-001',
      isPrivate: false,
      downloadCount: 0,
      version: '1.0',
      status: 'active',
    }

    setDocuments(prev => [newDocument, ...prev])
    setIsUploading(false)
    setUploadProgress(0)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDownload = (document: SharedDocument) => {
    // Simulate download
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === document.id
          ? { ...doc, downloadCount: doc.downloadCount + 1 }
          : doc
      )
    )

    // In a real app, this would trigger the actual download
    console.log('Downloading:', document.name)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
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
                variant="primary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? '📤 Uploading...' : '📤 Upload'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                Uploading...
              </span>
              <span className="text-sm text-blue-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📄</div>
              <p>No documents found for the selected category</p>
              {canUpload && (
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload First Document
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map(document => (
                <div
                  key={document.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {/* Document Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {getDocumentIcon(document.type)}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {document.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          v{document.version} • {document.size}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}
                    >
                      {document.status}
                    </span>
                  </div>

                  {/* Document Details */}
                  {document.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {document.description}
                    </p>
                  )}

                  {/* Document Meta */}
                  <div className="text-xs text-gray-500 space-y-1 mb-4">
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
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownload(document)}
                    >
                      📥 Download
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="px-3"
                      onClick={() => console.log('Share:', document.id)}
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
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-brand-primary">
                {filteredDocuments.length}
              </p>
              <p className="text-sm text-gray-600">Documents</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-primary">
                {filteredDocuments.reduce(
                  (sum, doc) => sum + doc.downloadCount,
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Downloads</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-primary">
                {(
                  filteredDocuments.reduce(
                    (sum, doc) =>
                      sum + parseFloat(doc.size.replace(/[^\d.]/g, '')),
                    0
                  ) / 1024
                ).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">GB Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-primary">
                {
                  filteredDocuments.filter(doc => doc.status === 'active')
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
