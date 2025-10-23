/**
 * Business Analytics Widgets
 * Essential business metrics that Firebase doesn't track
 * Extracted from the large AnalyticsDashboard
 */

"use client";

import React from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Progress,
  Badge,
} from "./modules/UIComponents";

// Veteran Analytics Widget
export function VeteranAnalyticsWidget({
  veteranUserPercentage,
  totalVeteranUsers,
}: {
  veteranUserPercentage: number;
  totalVeteranUsers: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Veteran Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">
          {veteranUserPercentage.toFixed(1)}%
        </div>
        <Progress value={veteranUserPercentage} className="mt-2" />
        <Badge variant="secondary" className="mt-2">
          <MaterialIcon icon="military_tech" className="mr-1 w-3 h-3" />
          {totalVeteranUsers} Military Focus Users
        </Badge>
      </CardContent>
    </Card>
  );
}

// Estimator Usage Analytics Widget
export function EstimatorUsageWidget({
  data,
}: {
  data: {
    totalUsage: number;
    completionRate: number;
    averageProjectValue?: number;
    popularProjectTypes?: string[];
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Estimator Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="gap-4 grid grid-cols-2">
          <div>
            <div className="font-bold text-2xl">{data.totalUsage}</div>
            <p className="text-muted-foreground text-sm">Total Uses</p>
          </div>
          <div>
            <div className="font-bold text-2xl">{data.completionRate}%</div>
            <p className="text-muted-foreground text-sm">Completion Rate</p>
          </div>
          <div>
            <div className="font-bold text-2xl">
              ${data.averageProjectValue?.toLocaleString() || 0}
            </div>
            <p className="text-muted-foreground text-sm">Avg. Project Value</p>
          </div>
          <div>
            <div className="font-bold text-2xl">
              {data.popularProjectTypes?.length || 0}
            </div>
            <p className="text-muted-foreground text-sm">Project Types</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Lead Conversion Tracking Widget
export function LeadConversionWidget({
  estimatorToContact,
  contactToProject,
  totalLeads,
}: {
  estimatorToContact: number;
  contactToProject: number;
  totalLeads: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Estimator → Contact</span>
            <span className="font-medium">{estimatorToContact}%</span>
          </div>
          <Progress value={estimatorToContact} />

          <div className="flex justify-between items-center">
            <span>Contact → Project</span>
            <span className="font-medium">{contactToProject}%</span>
          </div>
          <Progress value={contactToProject} />

          <div className="pt-2 border-t">
            <div className="font-bold text-lg">{totalLeads}</div>
            <p className="text-muted-foreground text-sm">
              Total Leads This Month
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Combined Business Analytics Component
export function BusinessAnalytics({
  veteranData,
  estimatorData,
  conversionData,
}: {
  veteranData: {
    veteranUserPercentage: number;
    totalVeteranUsers: number;
  };
  estimatorData: {
    totalUsage: number;
    completionRate: number;
    averageProjectValue?: number;
    popularProjectTypes?: string[];
  };
  conversionData: {
    estimatorToContact: number;
    contactToProject: number;
    totalLeads: number;
  };
}) {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <VeteranAnalyticsWidget
        veteranUserPercentage={veteranData.veteranUserPercentage}
        totalVeteranUsers={veteranData.totalVeteranUsers}
      />
      <EstimatorUsageWidget data={estimatorData} />
      <LeadConversionWidget
        estimatorToContact={conversionData.estimatorToContact}
        contactToProject={conversionData.contactToProject}
        totalLeads={conversionData.totalLeads}
      />
    </div>
  );
}
