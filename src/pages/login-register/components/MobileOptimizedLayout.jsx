import React from 'react';

const MobileOptimizedLayout = ({ children }) => {
  return (
    <div className="bg-background">
      {/* Mobile-First Container */}
      <div className="flex flex-col min-h-screen">
        {/* Main Content Area */}
        <main className="flex flex-1 items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center w-full min-h-[60vh]">
              <div className="bg-card rounded-2xl shadow-academic-lg p-8 w-full max-w-md mx-auto">
                {/* Only Left Column - Form Content */}
                {children}
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default MobileOptimizedLayout;