// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Scroll Reveal Animation
  window.addEventListener('load', function() {
    // Activate header animation on load
    setTimeout(() => {
      const exploreCards = document.querySelectorAll('.explore__card');
      exploreCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('active');
        }, index * 200);
      });
    }, 500);
    
    // Scroll reveal functionality
    function revealOnScroll() {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    }
    
    // Add reveal class to elements
    document.querySelectorAll('.section__header, .section__subheader, .explore__card, .join__card, .price__card, .class__image, .class__content').forEach(element => {
      element.classList.add('reveal');
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on load
  });
  
  // Mobile Menu Toggle
  document.addEventListener('DOMContentLoaded', function() {
    // Create a mobile menu toggle button
    const nav = document.querySelector('nav');
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu__toggle');
    menuToggle.innerHTML = '<i class="ri-menu-line"></i>';
    nav.appendChild(menuToggle);
    
    // Add click event
    const navLinks = document.querySelector('.nav__links');
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="ri-close-line"></i>';
      } else {
        menuToggle.innerHTML = '<i class="ri-menu-line"></i>';
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      const navLinks = document.querySelector('.nav__links');
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.querySelector('.menu__toggle').innerHTML = '<i class="ri-menu-line"></i>';
      }
    });
  });
  
  // Pricing cards hover effect enhancement
  const priceCards = document.querySelectorAll('.price__card');
  priceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      priceCards.forEach(c => c.style.transform = 'scale(0.95)');
      this.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      priceCards.forEach(c => c.style.transform = '');
    });
  });
  
  // Testimonial slider functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Sample testimonial data (in a real app, this would come from a database)
    const testimonials = [
      {
        text: "What truly sets this gym apart is their expert team of trainers. The trainers are knowledgeable, approachable, and genuinely invested in helping members achieve their fitness goals. They take the time to understand individual needs and create personalized workout plans, ensuring maximum results and safety.",
        name: "John Abraham",
        title: "Actor & Athlete",
        image: "Images/member.jpg",
        rating: 4.5
      },
      {
        text: "The community at FitClub is incredibly supportive and motivating. I've made friends who push me to be better every day. The facilities are state-of-the-art and always clean, which makes every workout session enjoyable.",
        name: "Emily Rodriguez",
        title: "Fitness Enthusiast",
        image: "Images/member.jpg",
        rating: 5
      },
      {
        text: "I've been to many gyms before, but FitClub truly stands out. The personal training sessions have transformed my body and mindset. I'm stronger, more confident, and healthier than I've ever been.",
        name: "Michael Chen",
        title: "Software Engineer",
        image: "Images/member.jpg",
        rating: 4.5
      }
    ];
    
    let currentTestimonial = 0;
    const prevBtn = document.querySelector('.review__nav span:first-child');
    const nextBtn = document.querySelector('.review__nav span:last-child');
    
    // Function to update testimonial content
    function updateTestimonial() {
      const testimonial = testimonials[currentTestimonial];
      
      // Fade out
      const reviewContent = document.querySelector('.review__content');
      reviewContent.style.opacity = 0;
      
      setTimeout(() => {
        // Update content
        document.querySelector('.review__content p').textContent = testimonial.text;
        document.querySelector('.review__member__details h4').textContent = testimonial.name;
        document.querySelector('.review__member__details p').textContent = testimonial.title;
        
        // Update rating
        const ratingStars = document.querySelector('.review__rating');
        let ratingHTML = '';
        for (let i = 1; i <= 5; i++) {
          if (i <= testimonial.rating) {
            ratingHTML += '<span><i class="ri-star-fill"></i></span>';
          } else if (i - 0.5 === testimonial.rating) {
            ratingHTML += '<span><i class="ri-star-half-fill"></i></span>';
          } else {
            ratingHTML += '<span><i class="ri-star-line"></i></span>';
          }
        }
        ratingStars.innerHTML = ratingHTML;
        
        // Fade in
        reviewContent.style.opacity = 1;
      }, 300);
    }
    
    // Event listeners for navigation
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
      });
      
      nextBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
      });
    }
  });
  
  // Program cards slider
  document.addEventListener('DOMContentLoaded', function() {
    const exploreNav = document.querySelector('.explore__nav');
    const exploreGrid = document.querySelector('.explore__grid');
    const prevBtn = exploreNav.querySelector('span:first-child');
    const nextBtn = exploreNav.querySelector('span:last-child');
    
    let scrollAmount = 0;
    const cardWidth = 300; // Approximate width of card + gap
    
    prevBtn.addEventListener('click', function() {
      scrollAmount -= cardWidth;
      if (scrollAmount < 0) scrollAmount = 0;
      exploreGrid.scroll({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    nextBtn.addEventListener('click', function() {
      scrollAmount += cardWidth;
      const maxScroll = exploreGrid.scrollWidth - exploreGrid.clientWidth;
      if (scrollAmount > maxScroll) scrollAmount = maxScroll;
      exploreGrid.scroll({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  });
  
  // Animation for counters
  document.addEventListener('DOMContentLoaded', function() {
    // You could add counters in the HTML to showcase statistics
    function animateCounters() {
      const counters = document.querySelectorAll('.counter');
      
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(() => animateCounters(), 10);
        } else {
          counter.innerText = target;
        }
      });
    }
    
    // Call this function when counters are in viewport
    // You'd need to add counter elements to your HTML
  });

  // Dumbbell cursor following the mouse
document.addEventListener('DOMContentLoaded', function() {
    // Create the dumbbell SVG element
    const dumbbellCursor = document.createElement('div');
    dumbbellCursor.classList.add('dumbbell-cursor');
    
    // Use SVG for better quality
    dumbbellCursor.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="80" height="10" rx="5" fill="#eb0029" />
        <circle cx="15" cy="30" r="15" fill="#333333" />
        <circle cx="85" cy="30" r="15" fill="#333333" />
        <circle cx="15" cy="30" r="8" fill="#666666" />
        <circle cx="85" cy="30" r="8" fill="#666666" />
      </svg>
    `;
    
    // Append to body
    document.body.appendChild(dumbbellCursor);
    
    // Variables for smooth movement
    let cursorX = 0;
    let cursorY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
      // Store the target position
      cursorX = e.clientX;
      cursorY = e.clientY;
    });
    
    // Animation loop for smooth cursor movement
    function animateCursor() {
      // Calculate movement with easing
      const easeFactor = 0.15;
      currentX += (cursorX - currentX) * easeFactor;
      currentY += (cursorY - currentY) * easeFactor;
      
      // Apply the position
      dumbbellCursor.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentX * 0.05}deg)`;
      
      // Continue the animation loop
      requestAnimationFrame(animateCursor);
    }
    
    // Start the animation
    animateCursor();
    
    // Add hover effects for buttons and links
    const interactiveElements = document.querySelectorAll('a, button, .explore__card, .price__card, .join__card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dumbbellCursor.classList.add('dumbbell-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        dumbbellCursor.classList.remove('dumbbell-hover');
      });
    });
    
    // Hide the cursor when mouse leaves the window
    document.addEventListener('mouseout', function(e) {
      if (e.relatedTarget === null) {
        dumbbellCursor.style.opacity = '0';
      }
    });
    
    // Show the cursor when mouse enters the window
    document.addEventListener('mouseover', function() {
      dumbbellCursor.style.opacity = '1';
    });
    
    // Add click animation
    document.addEventListener('mousedown', function() {
      dumbbellCursor.classList.add('clicking');
    });
  
    document.addEventListener('mouseup', function() {
      dumbbellCursor.classList.remove('clicking');
    });
  });