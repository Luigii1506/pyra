/**
 * Navigation Component
 * Sidebar navigation with Next.js routing
 * @created 2024-12-19
 */

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ sections, isSidebarOpen, isMobile, onSectionSelect }) => {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <div className="px-3 md:px-4 space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = pathname === section.href;

          return (
            <Link
              key={section.id}
              href={section.href}
              onClick={onSectionSelect}
              className={`
                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group
                ${
                  isActive
                    ? "bg-amber-700 text-amber-100"
                    : "text-amber-200 hover:bg-amber-800 hover:text-amber-100"
                }
                ${!isSidebarOpen && !isMobile ? "justify-center px-2" : ""}
              `}
            >
              <Icon
                size={18}
                className={`
                  ${!isSidebarOpen && !isMobile ? "" : "mr-3"}
                  ${
                    isActive
                      ? "text-amber-100"
                      : "text-amber-300 group-hover:text-amber-100"
                  }
                `}
              />
              {(isSidebarOpen || isMobile) && (
                <span className="truncate">{section.name}</span>
              )}
              {!isSidebarOpen && !isMobile && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {section.name}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
