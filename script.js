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

        // ملاحظة: لم نضع تغيير نص (textContent) هنا لنحافظ على أيقونة الكرة الأرضية
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


    // --- 3. أنيميشن السكرول المتكرر (Scroll Observer) ---
    const observerOptions = {
        threshold: 0.1 // يبدأ الأنيميشن بمجرد ظهور 10% من العنصر
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة الكلاس عند دخول العنصر للشاشة
                entry.target.classList.add('active');
            } else {
                // حذف الكلاس عند خروجه لتكرار الأنيميشن
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // مراقبة كل العناصر التي تحتاج أنيميشن
    const revealElements = document.querySelectorAll('.reveal, .gallery-item, .service-card, .teaser-card, .pro-card');
    revealElements.forEach(el => {
        observer.observe(el);
    });

});