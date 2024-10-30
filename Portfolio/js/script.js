document.addEventListener('DOMContentLoaded', () => {
     // Mobile menu toggle
     const burger = document.querySelector('.burger');
     const nav = document.querySelector('.nav-links');
     const navLinks = document.querySelectorAll('.nav-links li');
 
     burger.addEventListener('click', () => {
         // Toggle Nav
         nav.classList.toggle('nav-active');
 
         // Animate Links
         navLinks.forEach((link, index) => {
             if (link.style.animation) {
                 link.style.animation = '';
             } else {
                 link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
             }
         });
 
         // Burger Animation
         burger.classList.toggle('toggle');
     });
 
     // Contact Form Handling
     const contactForm = document.getElementById('contactForm');
     if (contactForm) {
         const formFields = ['name', 'email', 'subject', 'message'];
         const submitBtn = contactForm.querySelector('.submit-btn');
         const formResponse = document.getElementById('formResponse');
 
         // Form validation
         const validateField = (field) => {
             const value = field.value.trim();
             const errorElement = document.getElementById(`${field.id}Error`);
             let isValid = true;
 
             if (value === '') {
                 showError(field, errorElement, 'This field is required');
                 isValid = false;
             } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                 showError(field, errorElement, 'Please enter a valid email address');
                 isValid = false;
             } else {
                 hideError(field, errorElement);
             }
 
             return isValid;
         };
 
         const showError = (field, errorElement, message) => {
             field.parentElement.classList.add('error');
             errorElement.textContent = message;
         };
 
         const hideError = (field, errorElement) => {
             field.parentElement.classList.remove('error');
             errorElement.textContent = '';
         };
 
         // Form submission
         contactForm.addEventListener('submit', (e) => {
             e.preventDefault();
 
             let isValid = true;
             formFields.forEach(fieldName => {
                 const field = document.getElementById(fieldName);
                 if (!validateField(field)) {
                     isValid = false;
                 }
             });
 
             if (isValid) {
                 // Show loading spinner
                 submitBtn.classList.add('loading');
 
                 // Simulate form submission (replace with actual form submission logic)
                 setTimeout(() => {
                     submitBtn.classList.remove('loading');
                     formResponse.textContent = 'Thank you for your message. We will get back to you soon!';
                     formResponse.classList.add('success');
                     contactForm.reset();
 
                     // Hide success message after 5 seconds
                     setTimeout(() => {
                         formResponse.classList.remove('success');
                         formResponse.textContent = '';
                     }, 5000);
                 }, 2000);
             }
         });
 
         // Real-time validation
         formFields.forEach(fieldName => {
             const field = document.getElementById(fieldName);
             field.addEventListener('blur', () => validateField(field));
             field.addEventListener('input', () => validateField(field));
         });
     }
 
     // Smooth scrolling for anchor links
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             e.preventDefault();
             document.querySelector(this.getAttribute('href')).scrollIntoView({
                 behavior: 'smooth'
             });
         });
     });
 
     // Animate on scroll
     const animateOnScroll = () => {
         const elements = document.querySelectorAll('.animate-on-scroll');
         elements.forEach(element => {
             const elementTop = element.getBoundingClientRect().top;
             const elementBottom = element.getBoundingClientRect().bottom;
             if (elementTop < window.innerHeight && elementBottom > 0) {
                 element.classList.add('animated');
             }
         });
     };
 
     window.addEventListener('scroll', animateOnScroll);
     animateOnScroll(); // Run once on load
 });