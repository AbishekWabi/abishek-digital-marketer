(function () {
    "use strict";

    /* This file is loaded with "defer", so the page is already parsed. */

    var $ = function (selector, scope) { return (scope || document).querySelector(selector); };
    var $$ = function (selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); };

    var navbar = $("#navbar");
    var menuToggle = $("#menuToggle");
    var navLinksBox = $("#navLinks");

    var ICON_BARS = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    var ICON_CLOSE = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';


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

        menuToggle.addEventListener("click", function () {
            var isOpen = navLinksBox.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
            menuToggle.innerHTML = isOpen ? ICON_CLOSE : ICON_BARS;
        });

        // Close the menu after tapping a link
        $$("a", navLinksBox).forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when tapping outside it
        document.addEventListener("click", function (e) {
            if (!navLinksBox.classList.contains("open")) return;
            if (!navLinksBox.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close the menu with the Escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMenu();
        });

        // Reset the menu if the screen becomes wide
        window.addEventListener("resize", function () {
            if (window.innerWidth > 850) closeMenu();
        });
    }


    /* =========================
       NAVBAR SHADOW ON SCROLL
       (one passive listener, no layout reads)
    ========================= */
    if (navbar) {
        var ticking = false;

        var updateNavbar = function () {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
            ticking = false;
        };

        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });

        updateNavbar();
    }


    /* =========================
       ACTIVE NAV LINK
       (IntersectionObserver instead of measuring on every scroll)
    ========================= */
    var linkMap = {};

    $$('.nav-links a[href^="#"]').forEach(function (link) {
        linkMap[link.getAttribute("href").slice(1)] = link;
    });

    if ("IntersectionObserver" in window && Object.keys(linkMap).length) {

        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                Object.keys(linkMap).forEach(function (id) {
                    linkMap[id].classList.remove("active");
                });

                var active = linkMap[entry.target.id];
                if (active) active.classList.add("active");
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        $$("main section[id]").forEach(function (section) {
            spy.observe(section);
        });
    }


    /* =========================
       SCROLL REVEAL
    ========================= */
    document.body.classList.remove("no-js");

    var revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {

        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

        revealElements.forEach(function (el) { revealObserver.observe(el); });

    } else {
        // Very old browsers: show everything
        revealElements.forEach(function (el) { el.classList.add("active"); });
    }


    /* =========================
       FAQ ACCORDION
    ========================= */
    var faqItems = $$(".faq-item");

    faqItems.forEach(function (item) {
        var question = $(".faq-question", item);
        if (!question) return;

        question.addEventListener("click", function () {
            var isActive = item.classList.contains("active");

            faqItems.forEach(function (other) {
                other.classList.remove("active");
                var q = $(".faq-question", other);
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
       (opens the visitor's email app)
    ========================= */
    var contactForm = $("#contactForm");
    var formMessage = $("#formMessage");

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = $("#name").value.trim();
            var email = $("#email").value.trim();
            var subject = $("#subject").value.trim();
            var message = $("#message").value.trim();

            if (!name || !email || !subject || !message) {
                formMessage.textContent = "Please fill in all fields.";
                return;
            }

            var body = encodeURIComponent(
                "Name: " + name + "\nEmail: " + email + "\n\n" + message
            );

            window.location.href =
                "mailto:abishek1234ab@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + body;

            formMessage.textContent = "Opening your email app...";
        });
    }


    /* =========================
       BUTTON RIPPLE
    ========================= */
    $$(".btn").forEach(function (button) {
        button.addEventListener("click", function (e) {
            var ripple = document.createElement("span");
            var rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";
            ripple.classList.add("ripple");

            this.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 600);
        });
    });


    /* =========================
       CURRENT YEAR IN FOOTER
    ========================= */
    $$(".js-year").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

})();
