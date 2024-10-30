document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const images = document.querySelectorAll('.image-container');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    let recentlyViewedImages = [];

    function filterImages(category) {
        images.forEach(image => {
            const shouldShow = category === 'all' || 
                               image.classList.contains(category) || 
                               (category === 'visited' && recentlyViewedImages.includes(image));
            
            if (shouldShow) {
                image.style.display = 'block';
                setTimeout(() => {
                    image.style.opacity = '1';
                    image.style.transform = 'scale(1)';
                }, 50);
            } else {
                image.style.opacity = '0';
                image.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    image.style.display = 'none';
                }, 300);
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterImages(tab.getAttribute('data-filter'));
        });
    });

    // Initial animation
    images.forEach((image, index) => {
        setTimeout(() => {
            image.style.opacity = '1';
            image.style.transform = 'scale(1)';
        }, index * 100);
    });

    // Modal functionality
    images.forEach(image => {
        image.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.querySelector('img').src;
            setTimeout(() => modal.classList.add('show'), 10);
            
            // Add to recently viewed
            const index = recentlyViewedImages.indexOf(this);
            if (index > -1) {
                recentlyViewedImages.splice(index, 1);
            }
            recentlyViewedImages.unshift(this);
            
            // Keep only the last 10 viewed images
            if (recentlyViewedImages.length > 10) {
                recentlyViewedImages.pop();
            }
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    closeBtn.onclick = closeModal;

    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});