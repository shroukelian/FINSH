document.addEventListener('DOMContentLoaded', () => {
    
    const langBtn = document.getElementById('langSwitcher');
    const htmlTag = document.getElementById('mainHtml');

    function applyLanguage(lang) {
        if (!htmlTag) return;
        
        htmlTag.setAttribute('lang', lang);
        htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        localStorage.setItem('userLang', lang);
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = htmlTag.getAttribute('lang') || 'ar';
            const nextLang = (currentLang === 'ar') ? 'en' : 'ar';
            applyLanguage(nextLang);
        });
    }

    const savedLang = localStorage.getItem('userLang') || 'ar';
    applyLanguage(savedLang);


    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            navMenu.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }


    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .gallery-item, .service-card, .teaser-card, .pro-card, .about-service-box');
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

});
// تأكد أن هذا الكود خارج قوس الـ DOMContentLoaded
function orderViaWhatsApp(productName) {
    const phoneNumber = "966544028428"; // رقم الواتساب الخاص بك
    const message = `السلام عليكم، أريد الاستفسار عن منتج: (${productName})`;
    
    // تحويل النص لصيغة روابط الويب
    const encodedMessage = encodeURIComponent(message);
    
    // فتح رابط الواتساب في صفحة جديدة
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}