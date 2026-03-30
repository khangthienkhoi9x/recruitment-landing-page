/* =========================================================
   GoldLand Recruitment Landing Page - JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // Preloader
    // =====================================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1800);
    });

    // Fallback if load event already fired
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // =====================================================
    // Navbar Scroll Effect
    // =====================================================
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active nav link based on section
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Back to Top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =====================================================
    // Mobile Menu
    // =====================================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // =====================================================
    // Hero Particles
    // =====================================================
    const particlesContainer = document.getElementById('heroParticles');
    
    function createParticles() {
        const count = window.innerWidth < 768 ? 15 : 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // =====================================================
    // Intersection Observer for Animations
    // =====================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // =====================================================
    // Counter Animation
    // =====================================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    // =====================================================
    // Position Filter
    // =====================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const positionCards = document.querySelectorAll('.position-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            positionCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // =====================================================
    // Testimonial Slider
    // =====================================================
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    const slides = track.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            resetAutoSlide();
        }
    }, { passive: true });

    // =====================================================
    // File Upload Display
    // =====================================================
    const fileInput = document.getElementById('resume');
    const fileNameDisplay = document.getElementById('fileName');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            fileNameDisplay.innerHTML = `<i class="fas fa-file-alt"></i> ${file.name} (${sizeMB} MB)`;
        } else {
            fileNameDisplay.textContent = '';
        }
    });

    // =====================================================
    // Form Submission
    // =====================================================
    const form = document.getElementById('applicationForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const position = document.getElementById('position').value;

        if (!fullName || !phone || !email || !position) {
            showToast('Vui lòng điền đầy đủ thông tin bắt buộc (*)', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            showToast('Số điện thoại không hợp lệ', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Email không hợp lệ', 'error');
            return;
        }

        // Simulate submission
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Đang gửi...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            modal.classList.add('active');
            form.reset();
            fileNameDisplay.textContent = '';
            submitBtn.innerHTML = '<span>Gửi Đơn Ứng Tuyển</span> <i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }, 1500);
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // =====================================================
    // Toast Notification
    // =====================================================
    function showToast(message, type = 'info') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
        `;

        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            padding: '14px 28px',
            background: type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(34, 197, 94, 0.95)',
            color: 'white',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: '9999',
            opacity: '0',
            transition: '0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            fontFamily: 'var(--font-primary)'
        });

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // =====================================================
    // Smooth scroll for anchor links
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
