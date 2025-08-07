import React from 'react';

const MobileOptimizedLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-First Container */}
      <div className="flex flex-col min-h-screen">
        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Form Content */}
              <div className="order-2 lg:order-1">
                {children}
              </div>

              {/* Right Column - Visual/Branding (Desktop) */}
              <div className="order-1 lg:order-2 hidden lg:block">
                <div className="relative">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative p-8 lg:p-12">
                    <div className="text-center space-y-6">
                      {/* Large Icon */}
                      <div className="flex items-center justify-center w-24 h-24 bg-primary rounded-3xl shadow-academic-lg mx-auto">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-12 h-12 text-primary-foreground"
                          fill="currentColor"
                        >
                          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </div>

                      {/* Heading */}
                      <div>
                        <h2 className="text-3xl font-heading font-bold text-foreground mb-3">
                          Welcome to PSG Tech
                        </h2>
                        <p className="text-lg text-muted-foreground">
                          Advanced attendance management for the digital age
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">5000+</div>
                          <div className="text-sm text-muted-foreground">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-secondary mb-1">200+</div>
                          <div className="text-sm text-muted-foreground">Faculty</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} PSG College of Technology. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Coimbatore, Tamil Nadu</span>
                <span>•</span>
                <span>India</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MobileOptimizedLayout;