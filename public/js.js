document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const accueilButton = document.querySelector('nav ul li:nth-child(2) a');
    const indexSection = document.querySelector('.index-contenu');

    accueilButton.addEventListener('click', function(event) {
        event.preventDefault();
        indexSection.scrollIntoView({ behavior: 'smooth' });
    });

    const presentationButton = document.querySelector('#scroll-to-presentation');
    const presentationSection = document.querySelector('#presentation');

    presentationButton.addEventListener('click', function() {
        presentationSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Ajouter la classe "active" à la section correspondante dans la navbar
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach((item) => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
});


function typeWriter(text, targetElement, speed) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            targetElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

document.addEventListener("DOMContentLoaded", function() {
    const targetElement = document.querySelector('.index-contenu-p');
    const textToType = "Étudiant en informatique - 19 ans"; // Texte à écrire
    const typingSpeed = 100; // Vitesse de frappe en millisecondes par caractère

    typeWriter(textToType, targetElement, typingSpeed);
});


document.addEventListener("mousemove", e => {
    document.documentElement.style.setProperty("--mouse-x", e.clientX +'px');
    document.documentElement.style.setProperty("--mouse-y", e.clientY +'px');
  });


document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menuList = document.getElementById('menuList');

    menuButton.addEventListener('click', function() {
        menuList.classList.toggle('show');
    });
});