// ====================== SCRIPT.JS - COMPLETE FUNCTIONALITY ======================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAOS();
    initNavigation();
    initTypingEffect();
    initFABModals();
    initAIChat();
    initFAQ();
    initNewsletterForm();
    initStatsCounter();
    initScrollEffects();
    initSmoothScroll();
    loadDynamicContent();
});

// ====================== AOS INITIALIZATION ======================
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// ====================== NAVIGATION ======================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ====================== TYPING EFFECT ======================
function initTypingEffect() {
    const typedText = document.getElementById('typed-text');
    if (!typedText) return;
    
    const words = ['Maryam Shahrukh', 'Nutritionist', 'Wellness Expert', 'Health Coach'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
            }, 2000);
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, isWaiting ? 2000 : speed);
    }
    
    type();
}

// ====================== FAB MODALS ======================
function initFABModals() {
    const aiChatBtn = document.getElementById('aiChatBtn');
    const quickContactBtn = document.getElementById('quickContactBtn');
    const aiModal = document.getElementById('aiModal');
    const quickModal = document.getElementById('quickContactModal');
    const aiCloseBtn = document.getElementById('aiCloseBtn');
    const quickCloseBtn = document.getElementById('quickCloseBtn');
    
    // Open AI Chat
    if (aiChatBtn) {
        aiChatBtn.addEventListener('click', function() {
            aiModal.classList.add('active');
            quickModal.classList.remove('active');
        });
    }
    
    // Open Quick Contact
    if (quickContactBtn) {
        quickContactBtn.addEventListener('click', function() {
            quickModal.classList.add('active');
            aiModal.classList.remove('active');
        });
    }
    
    // Close AI Chat
    if (aiCloseBtn) {
        aiCloseBtn.addEventListener('click', function() {
            aiModal.classList.remove('active');
        });
    }
    
    // Close Quick Contact
    if (quickCloseBtn) {
        quickCloseBtn.addEventListener('click', function() {
            quickModal.classList.remove('active');
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (aiModal && e.target === aiModal) {
            aiModal.classList.remove('active');
        }
        if (quickModal && e.target === quickModal) {
            quickModal.classList.remove('active');
        }
    });
}

// ====================== AI CHAT FUNCTIONALITY ======================
function initAIChat() {
    const chatBody = document.getElementById('aiChatBody');
    const userInput = document.getElementById('aiUserInput');
    const sendBtn = document.getElementById('aiSendBtn');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    
    if (!chatBody || !userInput || !sendBtn) return;
    
    // AI Response database
    const aiResponses = {
        'pcos': 'For PCOS management, I recommend focusing on: 1) Low glycemic index foods 2) Anti-inflammatory diet 3) Regular meal timings 4) Adequate protein intake. Would you like a detailed PCOS diet plan?',
        'weight loss': 'For healthy weight loss, consider: 1) Calorie deficit of 300-500 kcal 2) High protein intake 3) Regular exercise 4) Adequate sleep. I can create a personalized plan for you!',
        'weight gain': 'For healthy weight gain: 1) Calorie surplus 2) Strength training 3) Frequent meals 4) Healthy fats. Let me know your current weight and target!',
        'diabetes': 'Diabetes management focuses on: 1) Consistent carb intake 2) Fiber-rich foods 3) Regular monitoring 4) Portion control. Would you like specific meal suggestions?',
        'appointment': 'You can book an appointment through our Appointment page, call +92 320 9758905, or send a message on WhatsApp. We offer both in-person and online consultations.',
        'cost': 'Initial consultation is PKR 2,500. Follow-up sessions are PKR 1,500. Monthly packages start from PKR 5,000 including weekly check-ins.',
        'online': 'Yes! We offer online consultations via Zoom or WhatsApp video call for clients worldwide. Same quality service from the comfort of your home.',
        'meal plan': 'I create personalized meal plans based on your: 1) Health goals 2) Food preferences 3) Lifestyle 4) Medical conditions. Book a consultation to get started!',
        'pcos diet': 'For PCOS, include: Whole grains, lean proteins, leafy greens, berries, nuts, seeds. Avoid: Sugary foods, processed carbs, dairy (for some).',
        'detox': 'I don\'t recommend extreme detox diets. Instead, focus on whole foods, adequate water, and removing processed foods for natural body cleansing.',
        'hello': 'Hello! 👋 I\'m Maryam\'s AI assistant. How can I help you with your nutrition questions today?',
        'hi': 'Hi there! 👋 Great to hear from you. What nutrition topic would you like to discuss?',
        'thank': 'You\'re welcome! 😊 Feel free to ask if you have more questions.',
        'thanks': 'You\'re welcome! 😊 Feel free to ask if you have more questions.'
    };
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get AI response
        setTimeout(() => {
            removeTypingIndicator();
            const response = getAIResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <span class="message-time">${time}</span>
        `;
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'ai-message bot-message typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="message-content">
                <p><i class="fas fa-circle" style="font-size: 0.5rem; margin: 0 2px; animation: bounce 1s infinite;"></i>
                <i class="fas fa-circle" style="font-size: 0.5rem; margin: 0 2px; animation: bounce 1s infinite 0.2s;"></i>
                <i class="fas fa-circle" style="font-size: 0.5rem; margin: 0 2px; animation: bounce 1s infinite 0.4s;"></i></p>
            </div>
        `;
        chatBody.appendChild(indicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Get AI response based on message
    function getAIResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // Check for keywords
        for (const [key, response] of Object.entries(aiResponses)) {
            if (lowerMsg.includes(key)) {
                return response;
            }
        }
        
        // Default response
        return "I understand you're asking about nutrition. Could you please be more specific? You can ask about PCOS, weight loss, diabetes, meal plans, appointments, or costs. I'm here to help! 😊";
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            userInput.value = this.textContent;
            sendMessage();
        });
    });
}

// ====================== FAQ ACCORDION ======================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ====================== NEWSLETTER FORM ======================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const privacyChecked = this.querySelector('input[type="checkbox"]').checked;
            
            if (!privacyChecked) {
                showNotification('Please accept the privacy policy', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for subscribing! 🎉', 'success');
            this.reset();
            
            // Here you can integrate with email service
            console.log('Newsletter subscription:', email);
        });
    }
}

// ====================== STATS COUNTER ======================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumber(element, target) {
        let current = 0;
        const increment = target / 50; // 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.id === 'statSuccess' ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.id === 'statSuccess' ? '%' : '+');
            }
        }, 20);
    }
    
    // Intersection Observer for stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateNumber(stat, target);
                });
                observer.disconnect(); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ====================== SCROLL EFFECTS ======================
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
}

// ====================== SMOOTH SCROLL ======================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================== DYNAMIC CONTENT LOADING ======================
function loadDynamicContent() {
    // Load certificates from localStorage or use default
    loadCertificates();
    
    // Load blog posts from localStorage or use default
    loadBlogPosts();
}

function loadCertificates() {
    const certificatesGrid = document.getElementById('certificatesGrid');
    if (!certificatesGrid) return;
    
    // Get certificates from localStorage (if any)
    let certificates = JSON.parse(localStorage.getItem('certificates')) || [
        {
            icon: 'fa-graduation-cap',
            title: 'BS in Nutrition',
            description: 'Strong academic foundation in human nutrition and diet planning from recognized institution'
        },
        {
            icon: 'fa-flask',
            title: 'MPhil (HND)',
            description: 'Advanced studies focusing on clinical and therapeutic nutrition with research experience'
        },
        {
            icon: 'fa-certificate',
            title: 'Certified Clinical Nutritionist',
            description: 'Professional certification in nutrition counseling and medical nutrition therapy'
        },
        {
            icon: 'fa-briefcase',
            title: 'Clinical Experience',
            description: '1+ year experience in clinical settings helping clients achieve sustainable results'
        }
    ];
    
    // Clear existing content
    certificatesGrid.innerHTML = '';
    
    // Add certificates to grid
    certificates.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'certificate-card';
        card.setAttribute('data-aos', 'flip-up');
        card.setAttribute('data-aos-delay', index * 100);
        
        card.innerHTML = `
            <div class="card-icon">
                <i class="fas ${cert.icon}"></i>
            </div>
            <h3>${cert.title}</h3>
            <p>${cert.description}</p>
        `;
        
        certificatesGrid.appendChild(card);
    });
}

function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    // Get blog posts from localStorage (if any)
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [
        {
            image: 'images/blog1.jpg',
            category: 'Nutrition',
            title: 'Healthy Eating for Busy People',
            description: 'Learn how to maintain a balanced diet even with a busy lifestyle and demanding schedule.',
            link: '#'
        },
        {
            image: 'images/blog2.jpg',
            category: "Women's Health",
            title: 'PCOS Diet: What to Eat & Avoid',
            description: 'A complete guide to managing PCOS through nutrition and lifestyle modifications.',
            link: '#'
        },
        {
            image: 'images/blog3.jpg',
            category: 'Weight Management',
            title: 'Sustainable Weight Loss Tips',
            description: 'Evidence-based strategies for healthy, sustainable weight loss without extreme dieting.',
            link: '#'
        }
    ];
    
    // Clear existing content
    blogGrid.innerHTML = '';
    
    // Add blog posts to grid
    blogPosts.forEach((post, index) => {
        const article = document.createElement('article');
        article.className = 'blog-card';
        article.setAttribute('data-aos', 'fade-up');
        article.setAttribute('data-aos-delay', index * 100);
        
        article.innerHTML = `
            <div class="card-image">
                <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/400x300'">
                <div class="card-category">${post.category}</div>
            </div>
            <div class="card-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.link}" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        blogGrid.appendChild(article);
    });
}

// ====================== NOTIFICATION SYSTEM ======================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        color: #333;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideUp 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// ====================== ADDITIONAL STYLES FOR NOTIFICATIONS ======================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        transition: color 0.3s;
    }
    
    .notification-close:hover {
        color: #333;
    }
    
    .notification-success i {
        color: #4CAF50;
    }
    
    .notification-error i {
        color: #f44336;
    }
    
    .notification-info i {
        color: #2196F3;
    }
    
    /* Typing indicator animation */
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }
`;

document.head.appendChild(style);

// ====================== LOCAL STORAGE MANAGEMENT ======================
// Admin panel se data save karne ke liye functions
window.saveCertificates = function(certificates) {
    localStorage.setItem('certificates', JSON.stringify(certificates));
    loadCertificates(); // Reload certificates
    showNotification('Certificates updated successfully!', 'success');
};

window.saveBlogPosts = function(posts) {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    loadBlogPosts(); // Reload blog posts
    showNotification('Blog posts updated successfully!', 'success');
};

// ====================== APPOINTMENT FORM HANDLER ======================
// This will be used on appointment.html page
window.handleAppointmentSubmit = function(formData) {
    // Format message for WhatsApp
    const message = `*New Appointment Request*%0A
%0A*Name:* ${formData.name}
%0A*Email:* ${formData.email}
%0A*Phone:* ${formData.phone}
%0A*Date:* ${formData.date}
%0A*Time:* ${formData.time}
%0A*Service:* ${formData.service}
%0A*Message:* ${formData.message}
%0A
%0A*Submitted:* ${new Date().toLocaleString()}`;
    
    // Open WhatsApp with formatted message
    window.open(`https://wa.me/923209758905?text=${message}`, '_blank');
    
    showNotification('Redirecting to WhatsApp...', 'success');
};

// ====================== EXPORT FUNCTIONS FOR OTHER PAGES ======================
window.showNotification = showNotification;