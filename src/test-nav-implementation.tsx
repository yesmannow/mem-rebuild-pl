// Test file to verify navigation implementation
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Test imports
import MainNav from './components/nav/MainNav';
import CommandMenu from './components/command/CommandMenu';
import CommandMenuToggle from './components/command/CommandMenuToggle';
import { Tooltip } from './components/ui/tooltip';
import { HoverCard } from './components/ui/hover-card';
import { ScrollArea } from './components/ui/scroll-area';

export function TestNavigationImplementation() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cave-bg">
        {/* Test MainNav */}
        <MainNav />

        {/* Test Command Menu */}
        <CommandMenu open={commandMenuOpen} onClose={() => setCommandMenuOpen(false)} />
        <CommandMenuToggle />

        {/* Test UI Components */}
        <div className="pt-32 p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-cave-text mb-4">Navigation Test</h2>
            <p className="text-cave-text/70">Testing all navigation components...</p>
          </div>

          {/* Test Tooltip */}
          <div>
            <h3 className="text-lg font-semibold text-turquoise mb-2">Tooltip Test</h3>
            <Tooltip content="This is a test tooltip" variant="turquoise">
              <button className="px-4 py-2 bg-turquoise text-cave-bg rounded-lg">
                Hover me
              </button>
            </Tooltip>
          </div>

          {/* Test HoverCard */}
          <div>
            <h3 className="text-lg font-semibold text-turquoise mb-2">HoverCard Test</h3>
            <HoverCard
              content={
                <div>
                  <h4 className="font-semibold text-turquoise">Project Preview</h4>
                  <p className="text-sm text-cave-text/70 mt-1">
                    This is a rich preview card for project information.
                  </p>
                </div>
              }
            >
              <div className="p-4 bg-cave-border rounded-lg cursor-pointer">
                Hover for preview
              </div>
            </HoverCard>
          </div>

          {/* Test ScrollArea */}
          <div>
            <h3 className="text-lg font-semibold text-turquoise mb-2">ScrollArea Test</h3>
            <ScrollArea className="h-32 w-full border border-cave-border rounded-lg p-4">
              <div className="space-y-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="h-8 bg-cave-border rounded"></div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default TestNavigationImplementation;