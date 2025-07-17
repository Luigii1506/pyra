import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NavigationProps {
  sections: Array<{
    id: string;
    name: string;
    icon: LucideIcon;
  }>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSidebarOpen: boolean;
  isMobile?: boolean;
  onSectionSelect?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  sections, 
  activeSection, 
  setActiveSection, 
  isSidebarOpen,
  isMobile = false,
  onSectionSelect
}) => {
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (onSectionSelect) {
      onSectionSelect();
    }
  };

  return (
    <nav className="flex-1 p-2 md:p-4 overflow-y-auto">
      <div className={`${isMobile ? 'space-y-1' : 'space-y-2'}`}>
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full flex items-center space-x-3 px-2 md:px-3 py-2 md:py-2 rounded-lg transition-all duration-200 text-left ${
                activeSection === section.id
                  ? 'bg-amber-700 text-amber-100'
                  : 'text-amber-300 hover:bg-amber-800 hover:text-amber-200'
              } ${isMobile ? 'text-base py-3' : ''}`}
            >
              <IconComponent size={isMobile ? 22 : 20} />
              {(isSidebarOpen || isMobile) && (
                <span className={`font-medium ${isMobile ? 'text-base' : ''}`}>
                  {section.name}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;