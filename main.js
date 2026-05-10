// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}

// ===== FADE IN AU SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isOpen = answer.style.display === 'block';
    // Fermer toutes les réponses
    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
    // Ouvrir celle cliquée si elle était fermée
    if (!isOpen) answer.style.display = 'block';
  });
});

// Cacher toutes les réponses FAQ au départ
document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');

// ===== FORMULAIRE =====
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!nom || !email || !message) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }
    alert(`Merci ${nom}, votre message a bien été envoyé !`);
    form.reset();
  });
}
