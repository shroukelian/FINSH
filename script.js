document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. معالجة تبديل اللغة (بشكل آمن) ---
    const langBtn = document.getElementById('langSwitcher');
    const htmlTag = document.getElementById('mainHtml');

    function applyLanguage(lang) {
        if (!htmlTag) return;
        
        htmlTag.setAttribute('lang', lang);
        htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // التحقق من وجود الزر قبل محاولة تغيير نصه لمنع الخطأ (null error)
        if (langBtn) {
            langBtn.textContent = (lang === 'ar') ? 'English' : 'العربية';
        }
        
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
            e.stopPropagation(); // منع إغلاق القائمة فور فتحها بسبب الـ document listener
            navMenu.classList.toggle('active');
            
            // تغيير شكل الأيقونة
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // إغلاق القائمة عند الضغط على أي رابط بالداخل
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
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. كود تبديل اللغة (الكرة الأرضية) ---
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
            applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    const savedLang = localStorage.getItem('userLang') || 'ar';
    applyLanguage(savedLang);


    // --- 2. أنيميشن السكرول المتكرر (Scroll Observer) ---
    const observerOptions = {
        threshold: 0.1 // يبدأ الأنيميشن بمجرد ظهور 10% من العنصر
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة الكلاس عند دخول العنصر للشاشة
                entry.target.classList.add('active');
            } else {
                // حذف الكلاس عند خروجه (وهذا ما يجعل الأنيميشن يتكرر)
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // ابحث عن كل العناصر التي تحمل كلاس reveal وراقبها
    const revealElements = document.querySelectorAll('.reveal, .gallery-item, .service-card, .teaser-card');
    revealElements.forEach(el => {
        observer.observe(el);
    });
});