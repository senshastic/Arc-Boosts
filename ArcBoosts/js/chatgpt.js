// ==UserScript==
// @name        Collapsible Sidebar for ChatGPT
// @version     1.1
// @description Collapse the sidebar 
// @match       https://chat.openai.com/*
// @author      sensha + FallenStar
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
  
    function initializeSidebar() {
        // Select the sidebar element by using the "draggable" class
        let sidebar = document.querySelector('.draggable');
        
        // Select both possible sidebar toggle buttons (for open and close states)
        let sidebarToggleButtonOpen = document.querySelector('button[aria-label="Open sidebar"]');
        let sidebarToggleButtonClose = document.querySelector('button[data-testid="close-sidebar-button"]');

        // Determine which button is currently available
        let sidebarToggleButton = sidebarToggleButtonOpen || sidebarToggleButtonClose;
    
        if (sidebar && sidebarToggleButton) {
            // Apply acrylic effect to the sidebar
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.left = '0'; // Adjust to left side for ChatGPT
            sidebar.style.width = '280px'; // Adjust the width as needed
            sidebar.style.height = '100vh'; // Full height
            sidebar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Transparent background for acrylic effect
            sidebar.style.backdropFilter = 'blur(25px) saturate(200%) contrast(90%)'; // Acrylic effect
            sidebar.style.webkitBackdropFilter = 'blur(25px) saturate(200%) contrast(90%)'; // Safari compatibility
            sidebar.style.color = 'white';
            sidebar.style.opacity = '0';
            sidebar.style.pointerEvents = 'none';
            sidebar.style.transition = 'opacity 0.3s ease-in-out';
            sidebar.style.zIndex = '1000';
            sidebar.style.overflowY = 'auto';
            sidebar.style.scrollbarWidth = "none";
            sidebar.style.border = '1px solid rgba(255, 255, 255, 0.2)'; // Light border
            sidebar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Subtle shadow
    
            // Trigger zone for the sidebar
            let triggerZone = document.createElement('div');
            triggerZone.style.position = 'fixed';
            triggerZone.style.top = '0';
            triggerZone.style.left = '0'; // Adjust to left side
            triggerZone.style.width = '50px';
            triggerZone.style.height = '100vh'; // Full height
            triggerZone.style.backgroundColor = 'rgba(255, 255, 255, 0.0)';
            triggerZone.style.zIndex = '0';
            triggerZone.style.pointerEvents = 'none';
    
            document.body.appendChild(triggerZone);
    
            // Update the opacity of the trigger zone based on mouse position
            function updateTriggerZoneOpacity(distance) {
                let opacity = Math.max(0, (300 - distance) / 300);
                triggerZone.style.backgroundColor = `rgba(255, 255, 255, ${opacity * 0.1})`;
            }
    
            // Show/hide the sidebar smoothly
            function handleMouseMove(e) {
                const leftEdgeDistance = e.clientX;

                // Refresh the toggle button references
                sidebarToggleButtonOpen = document.querySelector('button[aria-label="Open sidebar"]');
                sidebarToggleButtonClose = document.querySelector('button[data-testid="close-sidebar-button"]');
                sidebarToggleButton = sidebarToggleButtonOpen || sidebarToggleButtonClose;
    
                // Show sidebar
                if (leftEdgeDistance < 50) {
                    sidebar.style.opacity = '1';
                    sidebar.style.pointerEvents = 'auto'; // Enable interactions
                    triggerZone.style.display = "none";
    
                    // Ensure the sidebar toggle button is in the "open" state
                    if (sidebarToggleButton && sidebarToggleButton.getAttribute('aria-label') === 'Open sidebar') {
                        sidebarToggleButton.click(); // Simulate button click to open the sidebar
                    }
                }
                // Hide sidebar
                else if (leftEdgeDistance > 280) { // Adjusted to the new width
                    sidebar.style.opacity = '0';
                    sidebar.style.pointerEvents = 'none'; // Disable interactions
                    triggerZone.style.display = "block";
    
                    // Ensure the sidebar toggle button is in the "closed" state
                    if (sidebarToggleButton && sidebarToggleButton.getAttribute('data-testid') === 'close-sidebar-button') {
                        sidebarToggleButton.click(); // Simulate button click to close the sidebar
                    }
                }
    
                // Update opacity of trigger zone
                updateTriggerZoneOpacity(leftEdgeDistance);
            }
    
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            // Retry after a short delay if the sidebar or button is not found
            setTimeout(initializeSidebar, 500); // 500ms delay
        }
    }
  
    // Initialize the sidebar with acrylic effect
    initializeSidebar();
})();
