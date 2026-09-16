document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    /* =========================
       SMOOTH SCROLL
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================
       ACTIVE NAVIGATION LINK
    ========================= */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */
   document.body.classList.remove("no-js");

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.1
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


    /* =========================
       FAQ ACCORDION
    ========================= */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {

            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });

            if (!isActive) {
                faqItem.classList.add("active");
            }
        });
    });


    /* =========================
       CONTACT FORM
    ========================= */
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

            const mailBody =
                `Name: ${name}%0D%0A` +
                `Email: ${email}%0D%0A%0D%0A` +
                `${message}`;

            const mailtoLink =
                `mailto:abishek1234ab@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${mailBody}`;

            window.location.href = mailtoLink;

            formMessage.textContent = "Opening your email app...";
        });
    }


    /* =========================
       BUTTON RIPPLE EFFECT
    ========================= */
    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            ripple.classList.add("ripple");

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

    });


    /* =========================
       FLOATING CARD PARALLAX
    ========================= */
    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual) {
        heroVisual.addEventListener("mousemove", (e) => {

            const rect = heroVisual.getBoundingClientRect();

            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const cards = heroVisual.querySelectorAll(".floating-card");

            cards.forEach((card, index) => {
                const movement = (index + 1) * 8;

                card.style.transform =
                    `translate(${x * movement}px, ${y * movement}px)`;
            });
        });

        heroVisual.addEventListener("mouseleave", () => {

            const cards = heroVisual.querySelectorAll(".floating-card");

            cards.forEach(card => {
                card.style.transform = "";
            });
        });
    }


    /* =========================
       CURRENT YEAR
    ========================= */
    const yearElement = document.querySelector(".footer-bottom");

    if (yearElement) {
        yearElement.innerHTML =
            yearElement.innerHTML.replace(
                /©\s*\d{4}/,
                `© ${new Date().getFullYear()}`
            );
    }

});