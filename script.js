if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});
const themeButton = document.getElementById("themeButton");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-tab");
        const targetPanel = document.getElementById(targetId);

        const parentSection = button.closest(".section-inner") || button.closest("section");
        const sectionTabButtons = parentSection.querySelectorAll(".tab-btn");
        const sectionTabPanels = parentSection.querySelectorAll(".tab-panel");

        sectionTabButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        sectionTabPanels.forEach(function (panel) {
            panel.classList.remove("active");
        });

        button.classList.add("active");
        if (targetPanel) {
            targetPanel.classList.add("active");
        }
    });
});

const header = document.querySelector(".site-header");

window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

/* Close menu when a nav link is clicked */
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    });
});

/* Close menu when clicking outside */
document.addEventListener("click", function (e) {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});
/* Copy email to clipboard when clicking the Email card */
const emailCard = document.getElementById("emailCard");
const emailHint = document.getElementById("emailHint");

if (emailCard) {
    emailCard.addEventListener("click", function (e) {
        // Let mailto: still try to open (so users with mail apps get compose window)
        // But also copy to clipboard as a safety net
        if (navigator.clipboard) {
            navigator.clipboard.writeText("enasjadaa70@gmail.com").then(function () {
                if (emailHint) {
                    emailHint.textContent = "Copied!";
                    emailHint.style.color = "var(--accent-2)";
                    setTimeout(function () {
                        emailHint.textContent = "Click to copy";
                        emailHint.style.color = "";
                    }, 1600);
                }
            }).catch(function () {
                // Silent fail — mailto still fires
            });
        }
    });
}