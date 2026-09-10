/* =========================================
   ELEMENTS
========================================= */

const header = document.getElementById("header");

const mobileToggle =
    document.getElementById("mobileToggle");

const mobileMenu =
    document.getElementById("mobileMenu");

const cursorGlow =
    document.querySelector(".cursor-glow");

const scrollProgress =
    document.querySelector(".scroll-progress");



/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;


    // Add glass effect

    if (currentScroll > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    // Hide navbar when scrolling down
    // Show when scrolling up

    if (
        currentScroll > lastScroll &&
        currentScroll > 300
    ) {

        header.style.transform =
            "translateY(-100%)";

    } else {

        header.style.transform =
            "translateY(0)";

    }


    lastScroll = currentScroll;


    /* =====================================
       SCROLL PROGRESS
    ===================================== */

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (currentScroll / documentHeight) * 100;

    scrollProgress.style.width =
        `${progress}%`;

});



/* =========================================
   MOBILE MENU
========================================= */

mobileToggle.addEventListener("click", () => {

    const isOpen =
        mobileMenu.classList.toggle("open");

    mobileToggle.classList.toggle("open");

    mobileToggle.setAttribute(
        "aria-expanded",
        isOpen
    );


    document.body.style.overflow =
        isOpen ? "hidden" : "";

});



/* =========================================
   CLOSE MOBILE MENU
   WHEN LINK IS CLICKED
========================================= */

const mobileLinks =
    document.querySelectorAll(".mobile-link, .mobile-cta");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        mobileToggle.classList.remove("open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";

    });

});



/* =========================================
   CURSOR GLOW
========================================= */

if (window.matchMedia("(pointer: fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });


    function animateCursor() {

        glowX +=
            (mouseX - glowX) * 0.08;

        glowY +=
            (mouseY - glowY) * 0.08;


        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();

}



/* =========================================
   MAGNETIC BUTTONS
========================================= */

const magneticElements =
    document.querySelectorAll(".magnetic");


magneticElements.forEach(element => {

    element.addEventListener("mousemove", (event) => {

        const rect =
            element.getBoundingClientRect();


        const x =
            event.clientX -
            rect.left -
            rect.width / 2;


        const y =
            event.clientY -
            rect.top -
            rect.height / 2;


        const moveX = x * 0.15;
        const moveY = y * 0.15;


        element.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform =
            "translate(0, 0)";

    });

});



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(
        ".desktop-nav > .nav-link"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const activeLink =
                        document.querySelector(
                            `.desktop-nav a[href="#${entry.target.id}"]`
                        );


                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );

                    }

                }

            });

        },
        {
            threshold: 0.4
        }
    );


sections.forEach(section => {

    observer.observe(section);

});



/* =========================================
   ESCAPE KEY
   CLOSE MOBILE MENU
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        mobileMenu.classList.remove("open");

        mobileToggle.classList.remove("open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";

    }

});