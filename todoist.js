// ==UserScript==
// @name        Collapsible Sidebar for Todoist with Acrylic Effect and New Element
// @version     2.4
// @description Collapse the sidebar, apply acrylic effect to additional elements, replace button with an image, and add footer text.
// @match       https://todoist.com/*
// @author      sensha + FallenStar
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
  
    function initializeSidebar() {
        // Select the sidebar element
        let sidebar = document.querySelector('.sgZf_PQ');
        
        // Select the sidebar toggle button
        let sidebarToggleButton = document.querySelector('button[aria-controls="sidebar"]');
    
        if (sidebar && sidebarToggleButton) {
            // Sidebar styling with acrylic effect
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.left = '0'; // Adjust to left side for Todoist
            sidebar.style.width = '280px'; // Adjust the width
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
            triggerZone.style.left = '0'; // Adjust to left side for Todoist
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
    
                // Show sidebar
                if (leftEdgeDistance < 50) {
                    sidebar.style.opacity = '1';
                    sidebar.style.pointerEvents = 'auto'; // Enable interactions
                    triggerZone.style.display = "none";
    
                    // Ensure the sidebar toggle button is in the "open" state
                    if (sidebarToggleButton.getAttribute('aria-expanded') === 'false') {
                        sidebarToggleButton.click(); // Simulate button click to open the sidebar
                    }
                }
                // Hide sidebar
                else if (leftEdgeDistance > 280) { // Adjusted to the new width
                    sidebar.style.opacity = '0';
                    sidebar.style.pointerEvents = 'none'; // Disable interactions
                    triggerZone.style.display = "block";
    
                    // Ensure the sidebar toggle button is in the "closed" state
                    if (sidebarToggleButton.getAttribute('aria-expanded') === 'true') {
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
  
    function initializeAcrylicElement() {
        // Select the additional element with the provided classes
        let acrylicElement = document.querySelector('.afs9Aky.fb8d74bb.e4e217d4.b9ff0c93');
        
        if (acrylicElement) {
            // Apply acrylic effect to this element
            acrylicElement.style.position = 'relative';
            acrylicElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Transparent background for acrylic effect
            acrylicElement.style.backdropFilter = 'blur(25px) saturate(200%) contrast(90%)'; // Acrylic effect
            acrylicElement.style.webkitBackdropFilter = 'blur(25px) saturate(200%) contrast(90%)'; // Safari compatibility
            acrylicElement.style.border = '1px solid rgba(255, 255, 255, 0.2)'; // Light border for visibility
            acrylicElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Subtle shadow for depth
            acrylicElement.style.zIndex = '100'; // Ensure it appears on top of other elements
            acrylicElement.style.borderRadius = '8px'; // Optional: Rounded corners for a polished look
        } else {
            // Retry after a short delay if the element is not found
            setTimeout(initializeAcrylicElement, 500); // 500ms delay
        }
    }

    function replaceButtonWithImage() {
        // Select the button using a broader selector for stability
        let button = document.querySelector('button[aria-controls="sidebar"]');

        if (button) {
            // Remove any existing SVG inside the button
            let svg = button.querySelector('svg');
            if (svg) {
                svg.remove();
            }

            // Make the button's background transparent
            button.style.background = 'none';
            button.style.border = 'none';
            button.style.padding = '0';

            // Create a new img element
            let newImage = document.createElement('img');
            newImage.src = 'https://cdn.discordapp.com/emojis/1245456048383459439.webp?size=240&quality=lossless';
            newImage.alt = 'Button Image';
            newImage.style.width = '24px';  // Set the desired size for the image
            newImage.style.height = '24px';
            newImage.style.cursor = 'pointer';

            // Append the new image to the button
            button.appendChild(newImage);
        } else {
            // Retry if the button is not found immediately
            setTimeout(replaceButtonWithImage, 500); // 500ms delay
        }
    }

    function addFooter() {
        let mainElement = document.querySelector('main');

        if (mainElement) {
            // Create a new footer element
            let footer = document.createElement('a');
            footer.href = 'https://github.com/senshastic';
            footer.innerText = 'SneshCorp. @1984. All rights reserved (to FallenStar).';
            footer.style.position = 'fixed';
            footer.style.bottom = '10px';
            footer.style.right = '10px';
            footer.style.fontSize = '12px';
            footer.style.color = 'rgba(255, 255, 255, 0.7)';
            footer.style.textDecoration = 'none';
            footer.style.zIndex = '2000';

            // Append footer to the main element
            mainElement.appendChild(footer);
        } else {
            // Retry if the main element is not found
            setTimeout(addFooter, 500); // 500ms delay
        }
    }
  
    // Initialize all functionalities
    initializeSidebar();
    initializeAcrylicElement();
    replaceButtonWithImage();
    addFooter();
})();
