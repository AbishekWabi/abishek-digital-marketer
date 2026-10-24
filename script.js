document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinksBox = document.getElementById("navLinks");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");

    const ICON_BARS = '<i class="fa-solid fa-bars"></i>';
    const ICON_CLOSE = '<i class="fa-solid fa-xmark"></i>';


    /* =========================
       MOBILE MENU
    ========================= */
    function closeMenu() {
        if (!menuToggle || !navLinksBox) return;
        navLinksBox.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.innerHTML = ICON_BARS;
    }

    if (menuToggle && navLinksBox) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinksBox.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
            menuToggle.innerHTML = isOpen ? ICON_CLOSE : ICON_BARS;
        });

        // Close the menu after tapping a link
        navLinksBox.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when tapping outside it
        document.addEventListener("click", (e) => {
            if (!navLinksBox.classList.contains("open")) return;
            if (!navLinksBox.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close the menu with the Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });

        // Reset the menu if the screen becomes wide
        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) closeMenu();
        });
    }


    /* =========================
       SCROLL EFFECTS
       (navbar shadow + active link, one throttled listener)
    ========================= */
    let ticking = false;

    function onScroll() {

        // Navbar shadow
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }

        // Active navigation link (only links that point to a section on this page)
        let currentSection = "";

        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                link.classList.toggle("active", href === `#${currentSection}`);
            }
        });

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    onScroll();


    /* =========================
       SMOOTH SCROLL
       (links that point to a section on the same page)
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });


    /* =========================
       SCROLL REVEAL
    ========================= */
    document.body.classList.remove("no-js");

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
        );

        revealElements.forEach(el => revealObserver.observe(el));

    } else {
        // Very old browsers: show everything
        revealElements.forEach(el => el.classList.add("active"));
    }


    /* =========================
       FAQ ACCORDION
    ========================= */
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (!question) return;

        question.setAttribute("aria-expanded", "false");

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            faqItems.forEach(other => {
                other.classList.remove("active");
                const q = other.querySelector(".faq-question");
                if (q) q.setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });


    /* =========================
       CONTACT FORM
    ========================= */
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                formMessage.textContent = "Please fill in all fields.";
                return;
            }

            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            );

            window.location.href =
                `mailto:abishek1234ab@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            formMessage.textContent = "Opening your email app...";
        });
    }


    /* =========================
       BUTTON RIPPLE
    ========================= */
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();

            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            ripple.classList.add("ripple");

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });


    /* =========================
       FLOATING CARD PARALLAX
       (desktop with a mouse only)
    ========================= */
    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual && window.matchMedia("(hover: hover) and (min-width: 851px)").matches) {

        const cards = heroVisual.querySelectorAll(".floating-card");

        heroVisual.addEventListener("mousemove", (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            cards.forEach((card, index) => {
                const movement = (index + 1) * 8;
                card.style.transform = `translate(${x * movement}px, ${y * movement}px)`;
            });
        });

        heroVisual.addEventListener("mouseleave", () => {
            cards.forEach(card => {
                card.style.transform = "";
            });
        });
    }


    /* =========================
       CURRENT YEAR IN FOOTER
    ========================= */
    const footerBottom = document.querySelector(".footer-bottom");

    if (footerBottom) {
        footerBottom.innerHTML = footerBottom.innerHTML.replace(
            /©\s*\d{4}/,
            `© ${new Date().getFullYear()}`
        );
    }

});
