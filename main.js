/* ========================================
   BURGER MENU
======================================== */
const burger = document.getElementById('burger');
const mainNav = document.querySelector('.main-nav');

if (burger && mainNav) {
  burger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });
}

/* ========================================
   CAROUSEL
======================================== */
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

if (track) {
  const slides = track.querySelectorAll('.carousel-slide');
  let current = 0;
  let autoPlay;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active-dot');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active-dot', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoPlay(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoPlay(); });

  function startAutoPlay() {
    autoPlay = setInterval(() => goTo(current + 1), 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  startAutoPlay();
}

/* ========================================
   STATS COUNTER ANIMATION
======================================== */
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

if (statNumbers.length > 0) {
  const statsSection = document.querySelector('.stats');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) observer.observe(statsSection);
}

/* ========================================
   FILTRE MODULES (formations.html)
======================================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const moduleCards = document.querySelectorAll('.module-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');

    const filter = btn.getAttribute('data-filter');

    moduleCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-cat') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ========================================
   RECHERCHE ENSEIGNANTS (equipe.html)
======================================== */
const searchInput = document.getElementById('searchTeacher');
const teacherCards = document.querySelectorAll('.teacher-card');
const noResult = document.getElementById('noResult');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    let found = 0;

    teacherCards.forEach(card => {
      const name = card.getAttribute('data-name').toLowerCase();
      const spec = card.querySelector('.teacher-spec').textContent.toLowerCase();
      if (name.includes(query) || spec.includes(query)) {
        card.style.display = 'block';
        found++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResult) {
      noResult.style.display = found === 0 ? 'block' : 'none';
    }
  });
}

/* ========================================
   VALIDATION FORMULAIRE (contact.html)
======================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');

    const errNom = document.getElementById('err-nom');
    const errEmail = document.getElementById('err-email');
    const errSujet = document.getElementById('err-sujet');
    const errMessage = document.getElementById('err-message');

    // Reset erreurs
    [errNom, errEmail, errSujet, errMessage].forEach(e => e.textContent = '');
    [nom, email, sujet, message].forEach(f => f.style.borderColor = '#dee2e6');

    // Validation nom
    if (nom.value.trim().length < 2) {
      errNom.textContent = 'Le nom doit contenir au moins 2 caractères.';
      nom.style.borderColor = '#e63946';
      valid = false;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      errEmail.textContent = 'Veuillez entrer un email valide.';
      email.style.borderColor = '#e63946';
      valid = false;
    }

    // Validation sujet
    if (sujet.value === '') {
      errSujet.textContent = 'Veuillez choisir un sujet.';
      sujet.style.borderColor = '#e63946';
      valid = false;
    }

    // Validation message
    if (message.value.trim().length < 10) {
      errMessage.textContent = 'Le message doit contenir au moins 10 caractères.';
      message.style.borderColor = '#e63946';
      valid = false;
    }

    // Si tout est valide
    if (valid) {
      const successMsg = document.getElementById('form-success');
      successMsg.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }
  });
}

/* ========================================
   FADE IN AU SCROLL
======================================== */
const fadeElements = document.querySelectorAll('.card, .module-card, .teacher-card, .team-member, .agenda-day');

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));