document.addEventListener("DOMContentLoaded", () => {

    /* NAVBAR SCROLL EFFECT */
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    /* MOBILE MENU */
    const menuToggle = document.getElementById("menuToggle");
    const navLinksBox = document.getElementById("navLinks");

    if (menuToggle && navLinksBox) {
        menuToggle.addEventListener("click", () => {
            const open = navLinksBox.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
            menuToggle.innerHTML = open
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinksBox.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinksBox.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /* ACTIVE NAVIGATION LINK */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
                currentSection = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
        });
    });

    /* SCROLL REVEAL */
    document.body.classList.remove("no-js");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("active");
            });
        },
        { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    /* FAQ ACCORDION */
    document.querySelectorAll(".faq-question").forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains("active");
            document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));
            if (!isActive) faqItem.classList.add("active");
        });
    });

    /* CONTACT FORM */
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
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

            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            window.location.href =
                `mailto:abishek1234ab@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            formMessage.textContent = "Opening your email app...";
        });
    }

    /* BUTTON RIPPLE */
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

    /* FLOATING CARD PARALLAX (desktop with mouse only) */
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
            cards.forEach(card => { card.style.transform = ""; });
        });
    }

    /* CURRENT YEAR */
    const footerBottom = document.querySelector(".footer-bottom");
    if (footerBottom) {
        footerBottom.innerHTML = footerBottom.innerHTML.replace(/©\s*\d{4}/, `© ${new Date().getFullYear()}`);
    }
});
