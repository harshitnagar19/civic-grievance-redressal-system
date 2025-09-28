import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  MapPin, 
  Bell, 
  Settings, 
  Star,
  User,
  ChevronRight
} from 'lucide-react';

export default function DeptSidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('complaints');
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { id: 'complaints', text: " Complaints", icon: FileText },
    { id: 'completed', text: "Your Completed Complaints", icon: CheckCircle },
    { id: 'rise', text: "Rise Complaints", icon: TrendingUp },
    { id: 'areas', text: "Issue In Areas", icon: MapPin },
    { id: 'announcements', text: "Announcements", icon: Bell },
    { id: 'settings', text: "Settings", icon: Settings },
    { id: 'feedback', text: "Feedback & Ratings", icon: Star }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-22 left-4 z-50 p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 md:hidden"
        >
          {isOpen ? <X className="w-3 h-3 text-gray-700" /> : <Menu className="w-3 h-3 text-gray-700" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 h-full z-40 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isMobile ? 'w-80' : 'w-72'}
      `}>
        <div className="h-full bg-white shadow-2xl flex flex-col">
          {/* Header with User Profile */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg">dept Doe</h2>
                <p className="text-blue-100 text-sm">dept.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                    text-left transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'}`} />
                  <span className="font-medium flex-1">{item.text}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}`} />
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-center text-sm text-gray-500">
              <p>© 2024 Complaint System</p>
             
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}