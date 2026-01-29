document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     NAVBAR
  ========================= */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  let lastScrollTop = 0;

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('open');
      navLinks?.classList.remove('open');

      navLinkItems.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target)) {
      navToggle?.classList.remove('open');
      navLinks?.classList.remove('open');
    }
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
      if (scrollTop > lastScrollTop && scrollTop > 120) {
        navbar.classList.add('hide');
      } else {
        navbar.classList.remove('hide');
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  /* =========================
     PRELOADER
  ========================= */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }

  /* =========================
     EMAIL FALLBACK
  ========================= */
  const emailButton = document.getElementById('emailButton');
  const fallbackForm = document.getElementById('fallbackForm');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const yourEmail = 'example@example.com'; // change this

  if (emailButton) {
    emailButton.addEventListener('click', () => {
      window.location.href = `mailto:${yourEmail}`;
      setTimeout(() => {
        if (fallbackForm) fallbackForm.style.display = 'block';
      }, 1000);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formMessage) formMessage.style.display = 'block';
      contactForm.reset();
    });
  }

  /* =========================
     PHONE COPY (DESKTOP)
  ========================= */
  const phoneLink = document.getElementById('phoneLink');
  if (phoneLink) {
    phoneLink.addEventListener('click', (e) => {
      if (window.innerWidth > 768) {
        e.preventDefault();
        navigator.clipboard.writeText(phoneLink.textContent)
          .then(() => alert('Phone number copied'));
      }
    });
  }

});
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // stop actual submission

  let isValid = true;

  // Clear previous status message
  formStatus.textContent = '';
  formStatus.style.color = '';

  // Loop through all required fields
  form.querySelectorAll('[required]').forEach(input => {
    const errorDiv = form.querySelector(`.error[data-for="${input.name}"]`);

    if (!input.value || (input.type === 'checkbox' && !input.checked)) {
      isValid = false;
      errorDiv.textContent = 'This field is required';
    } else {
      errorDiv.textContent = '';
    }
  });

  if (!isValid) {
    // At least one field is missing
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.style.color = 'red';
    return;
  }

  // All fields valid → show success message
  formStatus.textContent = 'Message sent successfully! We’ll reply in less 24hours.';
  formStatus.style.color = 'green';

  // Optional: reset form after success
  form.reset();
});

$(document).ready(function() {
  // Initialize Select2 with flags
  
  $('#country-select').select2({
    templateResult: formatCountry,
    templateSelection: formatCountry,
    minimumResultsForSearch: 5 // optional: show search box
  });

  // Auto-paste country code in phone input when selected
  $('#country-select').on('change', function() {
    const code = $(this).val();
    const phoneInput = $('#phone');
    const currentValue = phoneInput.val();

    // If input already starts with a code, replace it
    const updatedValue = currentValue.replace(/^\+\d+/, code);
    phoneInput.val(updatedValue || code);
    phoneInput.focus(); // focus so user can continue typing
  });
});

$(document).ready(function() {
  $('#country-select').on('change', function() {
    const code = $(this).val();
    const phoneInput = $('#phone');
    const currentValue = phoneInput.val();

    // If input already starts with a code, replace it
    const updatedValue = currentValue.replace(/^\+\d+/, code);
    phoneInput.val(updatedValue || code);
    phoneInput.focus(); // user can start typing immediately
  });
});
// Quick order page behavior: update summary, simple validation, fake submit
        const productEl = document.getElementById('product');
        const qtyEl = document.getElementById('qty');
        const variantEl = document.getElementById('variant');
        const summaryItem = document.getElementById('summaryItem');
        const summaryVariant = document.getElementById('summaryVariant');
        const summaryQty = document.getElementById('summaryQty');
        const summarySubtotal = document.getElementById('summarySubtotal');
        const summaryShip = document.getElementById('summaryShip');
        const summaryTotal = document.getElementById('summaryTotal');
        const cardFields = document.getElementById('cardFields'); 
        //const form = document.getElementById('orderForm');
        const message = document.getElementById('message');
        const resetBtn = document.getElementById('resetBtn');

        function parseProduct() {
            try { return JSON.parse(productEl.value || 'null'); }
            catch { return null; }
        }

        function formatUSD(n){ return '$' + n.toFixed(2); }

        function updateSummary() {
            const prod = parseProduct();
            const qty = Math.max(1, Number(qtyEl.value) || 1);
            const variant = variantEl.value || '—';
            summaryItem.textContent = prod ? prod.name : '—';
            summaryVariant.textContent = variant;
            summaryQty.textContent = String(qty);
            const price = prod ? prod.price : 0;
            const subtotal = price * qty;
            let shipping = subtotal > 0 && subtotal < 50 ? 5.00 : 0.00;
            if (subtotal === 0) shipping = 0.00;
            summarySubtotal.textContent = formatUSD(subtotal);
            summaryShip.textContent = formatUSD(shipping);
            summaryTotal.textContent = formatUSD(subtotal + shipping);
        }

        productEl.addEventListener('change', updateSummary);
        qtyEl.addEventListener('input', updateSummary);
        variantEl.addEventListener('change', updateSummary);

        // Toggle payment fields
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', e => {
                cardFields.style.display = e.target.value === 'card' ? 'block' : 'none';
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            message.classList.add('hidden');
            // Basic validation
            const prod = parseProduct();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('address').value.trim();
            if (!prod) return alert('Please select a product.');
            if (!name || !email || !address) return alert('Please fill required contact and address fields.');
            // Fake process
            const qty = Math.max(1, Number(qtyEl.value) || 1);
            const subtotal = prod.price * qty;
            const shipping = subtotal > 0 && subtotal < 50 ? 5.00 : 0.00;
            const total = subtotal + shipping;
            message.textContent = `Thanks, ${name}! Your order for ${qty}× ${prod.name} (${variantEl.value}) has been received. Total: ${formatUSD(total)}. A confirmation was sent to ${email}.`;
            message.classList.remove('hidden');
            // Optionally, clear form or simulate redirect...
        });

        resetBtn.addEventListener('click', () => {
            form.reset();
            cardFields.style.display = 'block';
            updateSummary();
            message.classList.add('hidden');
        });

        // Initialize
        updateSummary();



