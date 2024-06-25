document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const slides = slider.getElementsByClassName('slide');
    let currentSlide = 0;

    function showSlide(index) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.transform = `translateX(-${index * 100}%)`;
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000);

    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burgerMenu.classList.toggle('toggle');
    });

    async function fetchProducts() {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
        const productList = document.getElementById('productList');

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;
            productList.appendChild(productDiv);
        });
    }

    fetchProducts();

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        saveFormData(name, email, message);
        alert('Thank you for your message!');
        contactForm.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function saveFormData(name, email, message) {
        const formData = { name, email, message };
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    }
});
