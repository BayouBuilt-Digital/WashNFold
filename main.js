/* ============================================================
   C'est Bon Laundry — main.js
   Shared scripts: mobile nav toggle + async form submission
   ============================================================ */

/* ------ MOBILE NAV TOGGLE ------ */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('nav-open');
    toggle.classList.toggle('nav-toggle--active');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close on link tap (single-page anchor nav)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('nav-open');
      toggle.classList.remove('nav-toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ------ ASYNC FORM SUBMISSION (Formspree) ------
   Usage on any <form>:
     data-form-id="YOUR_FORMSPREE_ID"
     onsubmit="handleFormSubmit(event, 'btn-id', 'Success message')"

   Setup:
     1. Go to formspree.io and create a free account
     2. Create a new form for each submission type
     3. Replace YOUR_XXX_FORM_ID with the ID from your dashboard
------ */
async function handleFormSubmit(e, btnId, successText) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById(btnId);
  const formId = form.dataset.formId;

  if (!formId || formId.startsWith('YOUR_')) {
    // Formspree not yet configured — show friendly message
    btn.textContent = 'Coming Soon — Check Back Shortly!';
    btn.disabled = true;
    btn.style.opacity = '0.65';
    return;
  }

  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/' + formId, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      btn.textContent = successText;
      btn.style.opacity = '0.65';
      form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Connection error — try again';
    btn.disabled = false;
  }
}

/* ------ EMAIL NOTIFICATION CAPTURE (subscribe.html) ------ */
async function handleNotifySubmit(e) {
  e.preventDefault();
  const form  = e.target;
  const btn   = form.querySelector('button[type="submit"]');
  const input = form.querySelector('input[type="email"]');
  const formId = form.dataset.formId;

  if (!formId || formId.startsWith('YOUR_')) {
    btn.textContent = 'Got it — we\'ll be in touch!';
    btn.disabled = true;
    input.disabled = true;
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/' + formId, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      btn.textContent = 'You\'re on the list!';
      btn.style.opacity = '0.65';
      input.disabled = true;
    } else {
      btn.textContent = 'Try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Connection error — try again';
    btn.disabled = false;
  }
}
