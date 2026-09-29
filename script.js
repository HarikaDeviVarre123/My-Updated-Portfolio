/* =========================================================
   HARIKA DEVI VARRE - MODERN PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. STICKY NAVBAR ACTIVE LINK ON SCROLL
    ===================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();


    /* =====================================================
       2. SMOOTH OFFSET SCROLLING FOR NAV LINKS
    ===================================================== */
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || !targetId.startsWith("#")) return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const navbar = document.querySelector(".navbar");
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =====================================================
       3. INTERSECTION OBSERVER FOR SCROLL REVEALS
    ===================================================== */
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* =====================================================
       4. INTERACTIVE 3D TILT EFFECT ON CARDS
    ===================================================== */
    const interactiveCards = document.querySelectorAll(
        ".project-card, .cert-card, .edu-card, .skill-card, .about-card"
    );

    interactiveCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        });
    });


    /* =====================================================
       5. DYNAMIC FOOTER YEAR
    ===================================================== */
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});