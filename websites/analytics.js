// Analytics tracking
const Analytics = {
    init() {
        this.trackPageView();
        this.trackEvents();
    },

    trackPageView() {
        // Implement your analytics service here
        // Example: Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'UA-XXXXXXXX-X', {
                page_path: window.location.pathname
            });
        }
    },

    trackEvents() {
        // Track coupon copies
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-code')) {
                this.trackEvent('Coupon', 'Copy', e.target.dataset.code);
            }
        });

        // Track filter usage
        document.querySelectorAll('.filter-group select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.trackEvent('Filter', 'Change', 
                    `${e.target.id}: ${e.target.value}`);
            });
        });
    },

    trackEvent(category, action, label) {
        // Implement your analytics service here
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }
};

// Initialize analytics
Analytics.init();