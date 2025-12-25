"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { HoverScale } from "@/components/animations/FramerMotionComponents";

interface GrantType {
  category: string;
  icon: string;
  programs: string[];
}

interface InteractiveGrantSelectorProps {
  grantTypes: GrantType[];
}

export function InteractiveGrantSelector({
  grantTypes,
}: InteractiveGrantSelectorProps) {
  const [selectedGrantType, setSelectedGrantType] = useState<string | null>(
    null,
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {grantTypes.map((type) => (
        <HoverScale key={type.category}>
          <div
            className="h-full cursor-pointer"
            onClick={() =>
              setSelectedGrantType(
                selectedGrantType === type.category ? null : type.category,
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedGrantType(
                  selectedGrantType === type.category ? null : type.category,
                );
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View ${type.category} grant programs`}
          >
            <Card className="dark:bg-gray-700 hover:shadow-xl dark:hover:shadow-gray-600/50 h-full transition-all">
              <CardHeader>
                <MaterialIcon
                  icon={type.icon}
                  size="3xl"
                  className="mb-4 text-gray-700 dark:text-gray-300"
                />
                <CardTitle className="mb-4 dark:text-white text-2xl">
                  {type.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {type.programs.map((program, pIdx) => (
                    <li key={pIdx} className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-0.5 mr-2 text-gray-600 dark:text-gray-400"
                        size="sm"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {program}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </HoverScale>
      ))}
    </div>
  );
}
