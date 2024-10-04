// ==UserScript==
// @name        Animated Acrylic Sidebar for Reddit
// @version     1.0
// @description Adds an animated acrylic effect to the Reddit sidebar.
// @match       https://www.reddit.com/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    function initializeSidebar() {
        // Select the sidebar element using the provided selector
        let sidebar = document.querySelector('.nd\\:visible.block.w-full.sticky.top-\\[56px\\].h-screen-without-header.styled-scrollbars.overflow-y-scroll.overflow-x-hidden.bg-neutral-background.box-border.px-md');

        if (sidebar) {
            // Apply initial styling to the sidebar
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.left = '0';
            sidebar.style.width = '300px'; // Set the desired width of the sidebar
            sidebar.style.height = '100vh'; // Full height
            sidebar.style.background = 'linear-gradient(109.6deg, #081336 13.4%, #0d0d29 25%, #1a3a66 70%, rgb(122, 2, 54) 100.2%)';
            sidebar.style.backgroundSize = '400% 400%';
            sidebar.style.backdropFilter = 'blur(25px) saturate(200%) contrast(90%)'; // Acrylic effect
            sidebar.style.webkitBackdropFilter = 'blur(25px) saturate(200%) contrast(90%)'; // Safari compatibility
            sidebar.style.color = 'white';
            sidebar.style.opacity = '0';
            sidebar.style.pointerEvents = 'none';
            sidebar.style.transition = 'opacity 0.3s ease-in-out';
            sidebar.style.zIndex = '1000';
            sidebar.style.overflowY = 'auto';
            sidebar.style.scrollbarWidth = 'none';
            sidebar.style.border = '1px solid rgba(255, 255, 255, 0.2)'; // Light border
            sidebar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Subtle shadow

            // Add CSS keyframes animation for background gradient movement
            const styleSheet = document.createElement('style');
            styleSheet.innerHTML = `
                @keyframes gradientAnimation {
                    0% { background-position: 0% 0%; }
                    50% { background-position: 100% 100%; }
                    100% { background-position: 0% 0%; }
                }
                .animated-gradient {
                    animation: gradientAnimation 20s ease infinite;
                }
            `;
            document.head.appendChild(styleSheet);

            // Add gradient animation to the sidebar
            sidebar.classList.add('animated-gradient');

            // Trigger zone for showing/hiding the sidebar
            let triggerZone = document.createElement('div');
            triggerZone.style.position = 'fixed';
            triggerZone.style.top = '0';
            triggerZone.style.left = '0';
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

            // Show/hide the sidebar smoothly based on mouse movement
            function handleMouseMove(e) {
                const leftEdgeDistance = e.clientX;

                // Show sidebar when the mouse is close to the left edge
                if (leftEdgeDistance < 50) {
                    sidebar.style.opacity = '1';
                    sidebar.style.pointerEvents = 'auto'; // Enable interactions
                    triggerZone.style.display = 'none';
                }
                // Hide sidebar when the mouse moves away
                else if (leftEdgeDistance > 300) {
                    sidebar.style.opacity = '0';
                    sidebar.style.pointerEvents = 'none'; // Disable interactions
                    triggerZone.style.display = 'block';
                }

                // Update opacity of trigger zone
                updateTriggerZoneOpacity(leftEdgeDistance);
            }

            document.addEventListener('mousemove', handleMouseMove);
        } else {
            // Retry after a short delay if the sidebar is not found
            setTimeout(initializeSidebar, 500); // 500ms delay
        }
    }

    // Initialize the sidebar with acrylic and animation effect
    initializeSidebar();
})();
