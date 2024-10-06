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

    function hideShareButton() {
        const posts = document.querySelectorAll('shreddit-post');

        posts.forEach(post => {
            const shadowRoot = post.shadowRoot;
            if (shadowRoot) {
                const shareButton = shadowRoot.querySelector('shreddit-post-share-button');
                if (shareButton) {
                    shareButton.style.display = 'none';
                }
            }
        });
    }

    function hideAwardButton() {
        const posts = document.querySelectorAll('shreddit-post');

        posts.forEach(post => {
            const shadowRoot = post.shadowRoot;
            if (shadowRoot) {
                const shareButton = shadowRoot.querySelector('award-button');
                if (shareButton) {
                    shareButton.style.display = 'none';
                }
            }
        });
    }

  const elementsToStyle = [
    {
        shadowHost: 'reddit-search-large',
        selector: '.reddit-search-bar',
        styles: {
            backdropFilter: 'blur(10px) brightness(1.2) saturate(1.3)',
            background: 'rgba(253, 253, 253, 0.062)',
            borderRadius: '1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.562)',
            transition: 'all 0.1s ease-in-out',
        }
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '.reddit-search-bar:focus-within',
        styles: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxWidth: '600px',
            zIndex: '1000',
        }
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '.reddit-search-bar:not(:focus-within)',
        styles: {
            position: 'static',
            transform: 'none',
            top: 'auto',
            left: 'auto',
            width: 'auto',
            maxWidth: 'none',
            zIndex: 'auto',
        }
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '.reddit-search-bar:focus-within .dropdown-class',
        styles: {
            position: 'fixed',
            top: 'calc(50% + 40px)',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '50%',
            maxWidth: '600px',
            zIndex: '999',
            display: 'block',
            backdropFilter: 'blur(10px) brightness(1.2) saturate(1.3)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
    },
    {
        shadowHost: 'reddit-search-large',
        selector: 'a:hover',
        styles: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
    },
    {
        shadowHost: 'reddit-search-large',
        selector: 'body:has(.search-input:focus), body:has(.search-container:focus-within)',
        styles: {
            filter: 'blur(10px)',
        },
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '.search-input, .search-container, [class*="flex justify-between relative px-md gap-[0.5rem]"]',
        styles: {
            filter: 'none !important',
            position: 'relative',
            zIndex: '100',
        },
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '.search-input',
        styles: {
            fontSize: '14px',
            width: '300px',
            padding: '10px',
            position: 'relative',
            transition: 'all 0.3s ease-in-out',
        },
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '[class*="flex justify-between relative px-md gap-[0.5rem]"]:hover',
        styles: {
            backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
        },
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '.reddit-search-bar *',
        styles: {
            position: 'static !important',
        },
    },
    {
        shadowHost: 'reddit-search-large',
        selector: '.reddit-search-bar:focus-within .dropdown-class',
        styles: {
            position: 'fixed !important',
            top: 'calc(50% + 40px) !important',
            left: '50% !important',
            transform: 'translate(-50%, 0) !important',
            width: '50% !important',
            maxWidth: '600px !important',
            zIndex: '999 !important',
            display: 'block !important',
            backdropFilter: 'blur(10px) brightness(1.2) saturate(1.3) !important',
            background: 'rgba(255, 255, 255, 0.2) !important',
            borderRadius: '0.5rem !important',
            border: '1px solid rgba(255, 255, 255, 0.3) !important',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1) !important',
        },
    },
];

// Function to apply styles to regular and shadow DOM elements
function applyStyles() {
    elementsToStyle.forEach(entry => {
        if (entry.shadowHost) {
            // Handle Shadow DOM elements
            const hosts = document.querySelectorAll(entry.shadowHost);
            hosts.forEach(host => {
                const shadowRoot = host.shadowRoot;
                if (shadowRoot) {
                    const element = shadowRoot.querySelector(entry.selector);
                    if (element) {
                        Object.assign(element.style, entry.styles);

                        // Add focus and blur event listeners to handle the movement of the bar
                        if (entry.selector === '.reddit-search-bar') {
                            addFocusAndBlurListeners(element);
                        }
                    }
                }
            });
        } else {
            // Handle regular DOM elements
            const elements = document.querySelectorAll(entry.selector);
            elements.forEach(element => {
                Object.assign(element.style, entry.styles);

                // Add focus and blur event listeners to handle the movement of the bar
                if (entry.selector === '.reddit-search-bar') {
                    addFocusAndBlurListeners(element);
                }
            });
        }
    });
}

// Function to add focus and blur event listeners
function addFocusAndBlurListeners(element) {
    // Apply styles when focused (center in screen)
    element.addEventListener('focus', () => {
        element.style.position = 'fixed';
        element.style.top = '50%';
        element.style.left = '50%';
        element.style.transform = 'translate(-50%, -50%)';
        element.style.width = '50%';
        element.style.maxWidth = '600px';
        element.style.zIndex = '1000';
    });

    // Reset styles when focus is lost (return to original position)
    element.addEventListener('blur', () => {
        element.style.position = 'static';
        element.style.transform = 'none';
        element.style.top = 'auto';
        element.style.left = 'auto';
        element.style.width = 'auto';
        element.style.maxWidth = 'none';
        element.style.zIndex = 'auto';
    });
}






   // Initialize functions
    hideAwardButton();
    hideShareButton();
    addFooter();
    modifyShadowDomBackground();
    modifyShredditCommentBackground();
    applyStyles();


  // Mutation observer to reapply styles on DOM changes
    const observer = new MutationObserver(applyStyles);
    observer.observe(document.body, { childList: true, subtree: true });

})();
