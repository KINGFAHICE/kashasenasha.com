//        preloader  //
let fakeProgress = 0;
const preloader = document.getElementById('preloader');

// Simulated loading progress
const progressInterval = setInterval(() => {
  fakeProgress += Math.random() * 15; // smooth increments

  if (fakeProgress >= 75) {
    clearInterval(progressInterval);

    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';

    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
}, 200);

// Safety fallback (in case page loads fast)
window.addEventListener('load', () => {
  fakeProgress = 75;
});
// End of preloder js       //
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Mobile menu toggle (basic implementation)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '80%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.flexDirection = 'column';
        nav.style.background = 'var(--primary)';
        nav.style.padding = '1rem';
        nav.style.gap = '1rem';
      });
    }

 
  /* =========================
   contact for js
  ========================= */
    (function() {
      const form = document.getElementById('contactForm');
      const submitBtn = document.getElementById('submitBtn');
      const successMessage = document.getElementById('successMessage');
      const resetBtn = document.getElementById('resetBtn');

      // Validation functions
      function validateName(value) {
        const trimmed = value.trim();
        if (!trimmed) return 'Name is required';
        if (trimmed.length > 100) return 'Name must be less than 100 characters';
        return '';
      }

      function validateEmail(value) {
        const trimmed = value.trim();
        if (!trimmed) return 'Email is required';
        if (trimmed.length > 255) return 'Email must be less than 255 characters';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) return 'Invalid email address';
        return '';
      }

      function validateSubject(value) {
        const trimmed = value.trim();
        if (!trimmed) return 'Subject is required';
        if (trimmed.length > 200) return 'Subject must be less than 200 characters';
        return '';
      }

      function validateMessage(value) {
        const trimmed = value.trim();
        if (!trimmed) return 'Message is required';
        if (trimmed.length > 1000) return 'Message must be less than 1000 characters';
        return '';
      }

      function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorEl = document.getElementById(inputId + 'Error');
        if (message) {
          input.classList.add('error');
          errorEl.textContent = message;
        } else {
          input.classList.remove('error');
          errorEl.textContent = '';
        }
      }

      // Clear error on input
      ['name', 'email', 'subject', 'message'].forEach(function(id) {
        const input = document.getElementById(id);
        input.addEventListener('input', function() {
          showError(id, '');
        });
      });

      // Form submission
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const subjectError = validateSubject(subject);
        const messageError = validateMessage(message);

        showError('name', nameError);
        showError('email', emailError);
        showError('subject', subjectError);
        showError('message', messageError);

        if (nameError || emailError || subjectError || messageError) {
          return;
        }

        // Disable button
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // Create WhatsApp message
        const whatsappMessage = encodeURIComponent(
          '*New Inquiry from Website*\n\n' +
          '*Name:* ' + name.trim() + '\n' +
          '*Email:* ' + email.trim() + '\n' +
          '*Phone:* ' + (phone.trim() || 'Not provided') + '\n' +
          '*Subject:* ' + subject.trim() + '\n\n' +
          '*Message:*\n' + message.trim()
        );

        // Open WhatsApp
        window.open('https://wa.me/256702445852?text=' + whatsappMessage, '_blank');

        // Show success
        form.style.display = 'none';
        successMessage.classList.add('show');

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
      });

      // Reset form
      resetBtn.addEventListener('click', function() {
        form.reset();
        form.style.display = 'grid';
        successMessage.classList.remove('show');
      });
    })();
  })