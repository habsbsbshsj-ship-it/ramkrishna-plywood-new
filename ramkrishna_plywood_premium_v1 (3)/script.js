// Ramkrishna Plywood - navigation and enquiry interactions
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navUl = document.querySelector('nav ul');

  if (menuBtn && navUl) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.addEventListener('click', () => {
      const isOpen = navUl.classList.toggle('show');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuBtn.textContent = isOpen ? '×' : '☰';
    });
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        menuBtn.textContent = '☰';
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        navUl.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        menuBtn.textContent = '☰';
      }
    });
  }

  // The static website has no server/database. Send submitted enquiries to the
  // business WhatsApp number with all entered details instead of showing a fake success.
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const fields = contactForm.querySelectorAll('input, select, textarea');
      const name = fields[0]?.value.trim() || '';
      const phone = fields[1]?.value.trim() || '';
      const product = fields[2]?.value.trim() || 'General enquiry';
      const message = fields[3]?.value.trim() || 'Please contact me with more details.';
      if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
      }
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 13) {
        alert('Please enter a valid phone number.');
        return;
      }
      const text = [
        'Hello Ramkrishna Plywood, I want to make an enquiry.',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Product: ${product}`,
        `Requirement: ${message}`
      ].join('\n');
      const url = 'https://wa.me/919831412708?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
