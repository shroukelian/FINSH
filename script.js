document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. معالجة تبديل اللغة (الأيقونة فقط) ---
    const langBtn = document.getElementById('langSwitcher');
    const htmlTag = document.getElementById('mainHtml');

    function applyLanguage(lang) {
        if (!htmlTag) return;
        
        htmlTag.setAttribute('lang', lang);
        htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // حفظ اللغة في المتصفح
        localStorage.setItem('userLang', lang);
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = htmlTag.getAttribute('lang') || 'ar';
            const nextLang = (currentLang === 'ar') ? 'en' : 'ar';
            applyLanguage(nextLang);
        });
    }

    // تطبيق اللغة المحفوظة عند التحميل
    const savedLang = localStorage.getItem('userLang') || 'ar';
    applyLanguage(savedLang);


    // --- 2. تشغيل قائمة الموبايل (Hamburger Menu) ---
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

        // إغلاق القائمة عند الضغط على أي رابط
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

        // إغلاق القائمة عند الضغط في أي مكان خارجها
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


    // --- 3. أنيميشن السكرول المتكرر (Scroll Observer) المحسن ---
    const observerOptions = {
        threshold: 0.05, // جعلناه 5% ليكون حساساً جداً للعناصر الموجودة في أعلى الصفحة
        rootMargin: "0px 0px -50px 0px" // تشغيل الأنيميشن قبل وصول العنصر بقليل
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة الكلاس عند دخول العنصر للشاشة
                entry.target.classList.add('active');
            } else {
                // حذف الكلاس عند خروجه لتكرار الأنيميشن كل مرة
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // مراقبة كل العناصر التي تحتاج أنيميشن
    // أضفنا .about-service-box لضمان عمله في صفحات الخدمات
    const revealElements = document.querySelectorAll('.reveal, .gallery-item, .service-card, .teaser-card, .pro-card, .about-service-box');
    
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // كود إضافي: تشغيل فحص يدوي فوراً بعد التحميل بـ 100 ملي ثانية
    // لضمان أن الصور والنصوص في أول الصفحة تظهر بحركتها فوراً
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

});