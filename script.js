const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
    );
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    if (isLight) {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
        localStorage.setItem(
            "portfolio-theme",
            "light"
        );
    } 
    else {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );
    }
});
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    const isOpen = navLinks.classList.contains("active");
    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );
    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
});

const navigationItems = document.querySelectorAll(".nav-links a");
navigationItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const selectedFilter = button.getAttribute("data-filter");
        projectCards.forEach(function (project) {
            const projectCategory = project.getAttribute("data-category");
            if (
                selectedFilter === "all" ||
                selectedFilter === projectCategory
            ) 
            {
                project.classList.remove("hidden");
            } 
            else {
                project.classList.add("hidden");
            }
        });
    });
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const formSuccess = document.getElementById("form-success");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contactForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        formSuccess.textContent = "";
        nameInput.classList.remove("error");
        emailInput.classList.remove("error");
        messageInput.classList.remove("error");
        let isValid = true;

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            nameInput.classList.add("error");
            isValid = false;
        }

        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email address.";
            emailInput.classList.add("error");
            isValid = false;
        }
        else if (
            !emailPattern.test(
                emailInput.value.trim()
            )
        ) 
        {
            emailError.textContent =  "Please enter a valid email address.";
            emailInput.classList.add("error");
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please enter a message.";
            messageInput.classList.add("error");
            isValid = false;
        }
        else if (
            messageInput.value.trim().length < 10
        ) 
        {
            messageError.textContent = "Your message should be at least 10 characters.";
            messageInput.classList.add("error");
            isValid = false;
        }
        if (isValid) {
            formSuccess.textContent = "Thank you! Your message has been validated successfully.";
            contactForm.reset();
        }
    }
);

nameInput.addEventListener(
    "input",
    function () {
        if (nameInput.value.trim() !== "") {
            nameInput.classList.remove("error");
            nameError.textContent = "";
        }
    }
);


emailInput.addEventListener(
    "input",
    function () {
        if (
            emailPattern.test(
                emailInput.value.trim()
            )
        ) 
        {
            emailInput.classList.remove("error");
            emailError.textContent = "";
        }
    }
);


messageInput.addEventListener(
    "input",
    function () {
        if (
            messageInput.value.trim().length >= 10
        ) 
        {
            messageInput.classList.remove("error");
            messageError.textContent = "";
        }
    }
);

const currentYear = new Date().getFullYear();
const footer = document.querySelector(".footer p");
if (footer) {
    footer.innerHTML =
        `© ${currentYear} Benjamina Mbaki.
         Built with HTML, CSS & JavaScript.`;

}