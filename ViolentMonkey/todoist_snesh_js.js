// ==UserScript==
// @name        Snesh Todoist
// @version     2.4
// @namespace   Violentmonkey Scripts
// @description Collapse the sidebar, apply acrylic effect to additional elements, replace button with an image, and add footer text.
// @match       https://app.todoist.com/*
// @author      sensha
// @grant       none
// ==/UserScript==
// Self-invoking function to initialize functionalities

(function() {
    'use strict';

    // Function to initialize sidebar styling and interactions
    function initializeSidebar() {
        let sidebar = document.querySelector('.sgZf_PQ');
        let sidebarToggleButton = document.querySelector('button[aria-controls="sidebar"]');

        if (sidebar && sidebarToggleButton) {
            // Apply acrylic effect and styling to the sidebar
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.left = '0';
            sidebar.style.width = '280px';
            sidebar.style.height = '100vh';
            sidebar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            sidebar.style.backdropFilter = 'blur(25px) saturate(200%) contrast(90%)';
            sidebar.style.webkitBackdropFilter = 'blur(25px) saturate(200%) contrast(90%)';
            sidebar.style.color = 'white';
            sidebar.style.opacity = '0';
            sidebar.style.pointerEvents = 'none';
            sidebar.style.transition = 'opacity 0.3s ease-in-out';
            sidebar.style.zIndex = '1000';
            sidebar.style.overflowY = 'auto';
            sidebar.style.scrollbarWidth = "none";
            sidebar.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            sidebar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

            // Create and append trigger zone for sidebar interaction
            let triggerZone = document.createElement('div');
            triggerZone.style.position = 'fixed';
            triggerZone.style.top = '0';
            triggerZone.style.left = '0';
            triggerZone.style.width = '50px';
            triggerZone.style.height = '100vh';
            triggerZone.style.backgroundColor = 'rgba(255, 255, 255, 0.0)';
            triggerZone.style.zIndex = '0';
            triggerZone.style.pointerEvents = 'none';

            document.body.appendChild(triggerZone);

            // Update trigger zone opacity based on mouse position
            function updateTriggerZoneOpacity(distance) {
                let opacity = Math.max(0, (300 - distance) / 300);
                triggerZone.style.backgroundColor = `rgba(255, 255, 255, ${opacity * 0.1})`;
            }

            // Show or hide the sidebar based on mouse movement
            function handleMouseMove(e) {
                const leftEdgeDistance = e.clientX;

                if (leftEdgeDistance < 50) {
                    sidebar.style.opacity = '1';
                    sidebar.style.pointerEvents = 'auto';
                    triggerZone.style.display = "none";

                    if (sidebarToggleButton.getAttribute('aria-expanded') === 'false') {
                        sidebarToggleButton.click();
                    }
                } else if (leftEdgeDistance > 280) {
                    sidebar.style.opacity = '0';
                    sidebar.style.pointerEvents = 'none';
                    triggerZone.style.display = "block";

                    if (sidebarToggleButton.getAttribute('aria-expanded') === 'true') {
                        sidebarToggleButton.click();
                    }
                }

                updateTriggerZoneOpacity(leftEdgeDistance);
            }

            document.addEventListener('mousemove', handleMouseMove);
        } else {
            // Retry if sidebar or toggle button is not found
            setTimeout(initializeSidebar, 500);
        }
    }

    // Function to apply acrylic effect to a specific element
    function initializeAcrylicElement() {
        let acrylicElement = document.querySelector('.afs9Aky.fb8d74bb.e4e217d4.b9ff0c93');

        if (acrylicElement) {
            acrylicElement.style.position = 'relative';
            acrylicElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            acrylicElement.style.backdropFilter = 'blur(25px) saturate(200%) contrast(90%)';
            acrylicElement.style.webkitBackdropFilter = 'blur(25px) saturate(200%) contrast(90%)';
            acrylicElement.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            acrylicElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            acrylicElement.style.zIndex = '100';
            acrylicElement.style.borderRadius = '8px';
        } else {
            // Retry if the acrylic element is not found
            setTimeout(initializeAcrylicElement, 500);
        }
    }

    // Function to replace the sidebar toggle button with an image
    function replaceButtonWithImage() {
        let button = document.querySelector('button[aria-controls="sidebar"]');

        if (button) {
            let svg = button.querySelector('svg');
            if (svg) {
                svg.remove();
            }

            button.style.background = 'none';
            button.style.border = 'none';
            button.style.padding = '0';

            let newImage = document.createElement('img');
            newImage.src = 'https://cdn.discordapp.com/emojis/1245456048383459439.webp?size=240&quality=lossless';
            newImage.alt = 'Button Image';
            newImage.style.width = '24px';
            newImage.style.height = '24px';
            newImage.style.cursor = 'pointer';

            button.appendChild(newImage);
        } else {
            // Retry if the button is not found
            setTimeout(replaceButtonWithImage, 500);
        }
    }

    // Function to add a footer to the page
    function addFooter() {
        let mainElement = document.querySelector('main');

        if (mainElement) {
            let footer = document.createElement('div');
            footer.style.position = 'fixed';
            footer.style.bottom = '10px';
            footer.style.right = '10px';
            footer.style.fontSize = '12px';
            footer.style.color = 'rgba(255, 255, 255, 0.7)';
            footer.style.zIndex = '2000';

            let linkSensha = document.createElement('a');
            linkSensha.href = 'https://github.com/senshastic';
            linkSensha.innerText = 'SneshCorp. @1984. All rights reserved (to ';
            linkSensha.style.textDecoration = 'none';
            linkSensha.style.color = 'rgba(255, 255, 255, 0.7)';

            let linkFallenStar = document.createElement('a');
            linkFallenStar.href = 'https://github.com/senshastic';
            linkFallenStar.innerText = 'FallenStar';
            linkFallenStar.style.textDecoration = 'none';
            linkFallenStar.style.color = 'rgba(255, 255, 255, 0.7)';

            linkFallenStar.addEventListener('mouseenter', function() {
                linkFallenStar.href = 'https://github.com/FallenStar08';
            });

            linkFallenStar.addEventListener('mouseleave', function() {
                linkFallenStar.href = 'https://github.com/senshastic';
            });

            let endText = document.createTextNode(').');

            footer.appendChild(linkSensha);
            footer.appendChild(linkFallenStar);
            footer.appendChild(endText);

            mainElement.appendChild(footer);
        } else {
            // Retry if the main element is not found
            setTimeout(addFooter, 500);
        }
    }

    // Initialize all functionalities
    initializeSidebar();
    initializeAcrylicElement();
    replaceButtonWithImage();
    addFooter();
})();
