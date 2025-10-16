"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui";

export function DashboardStats() {
  const stats = [
    {
      title: "Active Projects",
      value: "8",
      change: "+2 this month",
      changeType: "positive",
      icon: "[CONSTRUCTION]",
      color: "bg-blue-500",
    },
    {
      title: "Pending Consultations",
      value: "3",
      change: "Next: Tomorrow 9AM",
      changeType: "neutral",
      icon: "[EVENT]",
      color: "bg-green-500",
    },
    {
      title: "This Month Revenue",
      value: "$847K",
      change: "+15% vs last month",
      changeType: "positive",
      icon: "[ATTACH_MONEY]",
      color: "bg-yellow-500",
    },
    {
      title: "AI Estimates Generated",
      value: "142",
      change: "+28 this week",
      changeType: "positive",
      icon: "[GPS_FIXED]",
      color: "bg-purple-500",
    },
    {
      title: "Veteran Projects",
      value: "5",
      change: "Wounded Warrior: 2",
      changeType: "neutral",
      icon: "[MILITARY_TECH]",
      color: "bg-red-500",
    },
    {
      title: "Team Utilization",
      value: "87%",
      change: "Optimal range",
      changeType: "positive",
      icon: "[GROUPS]",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-shadow duration-200"
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium text-gray-600 text-sm">
                  {stat.title}
                </p>
                <p className="mt-1 font-tactic-bold text-gray-900 text-2xl">
                  {stat.value}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white text-xl`}
              >
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
