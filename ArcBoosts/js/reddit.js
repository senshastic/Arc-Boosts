// ==UserScript==
// @name        JS for Reddit
// @version     1.4
// @description Changes the link at the bottom right and modifies background color.
// @match       https://www.reddit.com/*
// @grant       none
// @author      sensha
// ==/UserScript==

(function() {
    'use strict';

    function addFooter() {
        // Select the element to which you want to add the footer (based on the CSS class you provided)
        let targetElement = document.querySelector('.no-underline.text-tone-2.text-10.px-md');

        if (targetElement) {
            // Create a container to wrap the footer text and links
            let footerContainer = document.createElement('div');
            footerContainer.style.position = 'relative';
            footerContainer.style.fontFamily = "'Consolas', sans-serif";
            footerContainer.style.fontSize = '6px';
            footerContainer.style.textAlign = 'center';
            footerContainer.style.color = 'lightblue';
            footerContainer.style.pointerEvents = 'none';

            // Create the link for "SneshCorp."
            let linkSensha = document.createElement('a');
            linkSensha.href = 'https://github.com/senshastic';
            linkSensha.innerText = 'SneshCorp. © 1984. All rights reserved (to ';
            linkSensha.style.textDecoration = 'none';
            linkSensha.style.color = 'lightblue';
            linkSensha.style.pointerEvents = 'auto';

            // Create the link for "FallenStar"
            let linkFallenStar = document.createElement('a');
            linkFallenStar.href = 'https://github.com/senshastic';
            linkFallenStar.innerText = 'FallenStar';
            linkFallenStar.style.textDecoration = 'none';
            linkFallenStar.style.color = 'lightblue';
            linkFallenStar.style.pointerEvents = 'auto';

            // Change href on hover
            linkFallenStar.addEventListener('mouseenter', function() {
                linkFallenStar.href = 'https://github.com/FallenStar08';
            });

            linkFallenStar.addEventListener('mouseleave', function() {
                linkFallenStar.href = 'https://github.com/senshastic';
            });

            // Add punctuation and complete footer text
            let endText = document.createTextNode(').');

            // Append everything to the footer container
            footerContainer.appendChild(linkSensha);
            footerContainer.appendChild(linkFallenStar);
            footerContainer.appendChild(endText);

            // Clear any existing content from the target element and add the footerContainer
            targetElement.innerHTML = '';
            targetElement.appendChild(footerContainer);
        } else {
            // Retry if the target element is not found
            setTimeout(addFooter, 500); // 500ms delay
        }
    }

    function modifyShadowDomBackground() {
        const recentPosts = document.querySelector('recent-posts');

        if (recentPosts && recentPosts.shadowRoot) {
            const shadowRoot = recentPosts.shadowRoot;

            if (shadowRoot) {
                const style = document.createElement('style');
                style.textContent = `
                    .bg-neutral-background-weak {
                        background-color: rgba(48, 51, 50, 0.38) !important;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        border-radius: 12px;
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
                    }
                `;
                shadowRoot.appendChild(style);
            }
        } else {
            setTimeout(modifyShadowDomBackground, 500); // 500ms delay
        }
    }

    function modifyShredditCommentBackground() {
        // Function to access and modify the shadow DOM for shreddit-comment elements
        const shredditComments = document.querySelectorAll('shreddit-comment');

        shredditComments.forEach((shredditComment) => {
            if (shredditComment.shadowRoot) {
                const shadowRoot = shredditComment.shadowRoot;

                if (shadowRoot) {
                    // Create a <style> element to inject the desired styles
                    const style = document.createElement('style');
                    style.textContent = `
                        .bg-neutral-background {
                            background-color: rgba(91, 91, 92, 0) !important;
                        }
                    `;

                    // Append the style element to the shadow root
                    shadowRoot.appendChild(style);
                }
            }
        });

        // Retry to make sure all dynamically loaded elements are updated
        setTimeout(modifyShredditCommentBackground, 1000); // 1 second delay
    }

    // Initialize functions
    addFooter();
    modifyShadowDomBackground();
    modifyShredditCommentBackground();
})();
