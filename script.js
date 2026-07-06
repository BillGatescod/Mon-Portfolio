document.addEventListener('DOMContentLoaded', () => {

  /* =====  OMBRE QUI SUIVE LA SOURIS ===== */
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

  /* ===== ROTATION DES RÔLES (hero) ===== */
  const roles = document.querySelectorAll('.role-word');
  let current = 0;
  if (roles.length) {
    setInterval(() => {
      roles[current].classList.remove('active');
      current = (current + 1) % roles.length;
      roles[current].classList.add('active');
    }, 2800);
  }

  /* ===== NOM EN GRADIENT ANIMÉ ===== */
  const heroName = document.getElementById('heroName');
  if (heroName && heroName.textContent.trim() === 'Ton Nom') {
    heroName.textContent = 'NOBOU NGOUNOU WUILLIAM GATES';
  }

  /* =====  BURGER MENU ===== */
  const burger  = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const navCta   = document.getElementById('navCta');
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('open');
      navCta.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('open');
        navCta.classList.remove('open');
      });
    });
  }

  /* ===== NAVBAR SHADOW AU SCROLL ===== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 30 ? '0 8px 32px rgba(0,0,0,.5)' : 'none';
  });

  /* =====  LIEN ACTIF SELON SECTION VISIBLE ===== */
  const sections = document.querySelectorAll('main > section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  /* =====  REVEAL AU SCROLL ===== */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // délai décalé si plusieurs éléments d'une même grille
        const delay = Array.from(reveals).indexOf(entry.target) % 4 * 100;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  /* =====  PHOTOS — PLACEHOLDER AUTO ===== */

  ['heroPhoto', 'aboutPhoto'].forEach(id => {
    const img = document.getElementById(id);
    if (!img) return;
    if (!img.getAttribute('src')) {
      img.style.display = 'none';
    } else {
      img.addEventListener('error', () => { img.style.display = 'none'; });
      img.addEventListener('load',  () => {
        const ph = img.closest('.profile-img-wrap, .about-img-frame')
                       ?.querySelector('.profile-placeholder, .about-img-placeholder');
        if (ph) ph.style.display = 'none';
      });
    }
  });

  // Même logique pour images projets
  document.querySelectorAll('.project-img').forEach(img => {
    if (!img.getAttribute('src')) {
      img.style.display = 'none';
    } else {
      img.addEventListener('error', () => { img.style.display = 'none'; });
      img.addEventListener('load', () => {
        const ph = img.closest('.project-img-wrap')?.querySelector('.project-img-placeholder');
        if (ph) ph.style.display = 'none';
      });
    }
  });

  /* ===== PARALLAX LÉGER SUR ORBES ===== */
  window.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 20;
    const cy = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.orb').forEach((orb, i) => {
      const depth = (i + 1) * 0.6;
      orb.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  });

/* ===== BOUTON RETOUR EN HAUT ===== */
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    });
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  /* ===== 10. ANNÉE FOOTER ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

const emailImg = document.getElementById('emailIcon');
const emailEmoji = document.getElementById('emailEmoji');

if (emailImg) {
  emailImg.src = 'assets/projects/Mail_(Apple)_logo.png';
  emailImg.addEventListener('load', () => {
    emailImg.style.display = 'block';
    if (emailEmoji) emailEmoji.style.display = 'none';
  });
  emailImg.addEventListener('error', () => {
    if (emailEmoji) emailEmoji.style.display = 'inline';
  });
}

/* ===== FORMULAIRE DE CONTACT ===== */
const contactForm = document.getElementById('contactForm');
const contactShare = document.getElementById('contactShare');
const whatsappShare = document.getElementById('whatsappShare');
const telegramShare = document.getElementById('telegramShare');
const linkedinShare = document.getElementById('linkedinShare');

if (contactForm && contactShare && whatsappShare && telegramShare && linkedinShare) {
  const buildMessage = (name, email, subject, message) => {
    return `Bonjour, je m'appelle ${name}\nEmail: ${email}\nSujet: ${subject}\n\n${message}`;
  };

  const updateShareLinks = (text) => {
    const pageUrl = encodeURIComponent(window.location.href);
    const encodedText = encodeURIComponent(text);
    whatsappShare.href = `https://wa.me/237655066729?text=${encodedText}`;
    telegramShare.href = `https://t.me/share/url?url=${pageUrl}&text=${encodedText}`;
    linkedinShare.href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${encodeURIComponent('Contact via portfolio')}&summary=${encodedText}`;
  };

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Merci de compléter tous les champs avant d\'envoyer.');
      return;
    }

    const text = buildMessage(name, email, subject, message);
    updateShareLinks(text);
    contactShare.classList.add('active');
    contactShare.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ===== FILTRES PROJETS ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const categories = document.querySelectorAll('.project-category');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    categories.forEach(cat => {
      if (filter === 'all' || cat.dataset.category === filter) {
        cat.classList.remove('hidden');
      } else {
        cat.classList.add('hidden');
      }
    });
  });
});

/* ===== CAROUSEL — DRAG + AUTO-SCROLL AU SURVOL SOURIS ===== */
document.querySelectorAll('.carousel-track').forEach(track => {

  // --- DRAG avec la souris ---
  let isDragging = false;
  let startX, scrollStart;

  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    scrollStart = track.scrollLeft;
    track.classList.add('grabbing');
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    track.classList.remove('grabbing');
  });
  track.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.4;
    track.scrollLeft = scrollStart - walk;
  });

  // --- AUTO-SCROLL gauche/droite selon position souris ---
  let autoScrollId = null;
  const SPEED = 2.5;

  track.addEventListener('mousemove', e => {
    if (isDragging) return;
    const rect  = track.getBoundingClientRect();
    const relX  = e.clientX - rect.left;
    const width = rect.width;
    const zone  = width * 0.22; // 22% depuis chaque bord

    cancelAnimationFrame(autoScrollId);

    if (relX < zone) {
      // Zone gauche → scroll vers la gauche
      const intensity = 1 - relX / zone;
      const scroll = () => {
        track.scrollLeft -= SPEED * (1 + intensity * 3);
        autoScrollId = requestAnimationFrame(scroll);
      };
      autoScrollId = requestAnimationFrame(scroll);
    } else if (relX > width - zone) {
      // Zone droite → scroll vers la droite
      const intensity = (relX - (width - zone)) / zone;
      const scroll = () => {
        track.scrollLeft += SPEED * (1 + intensity * 3);
        autoScrollId = requestAnimationFrame(scroll);
      };
      autoScrollId = requestAnimationFrame(scroll);
    }
  });

  track.addEventListener('mouseleave', () => {
    cancelAnimationFrame(autoScrollId);
  });

  // --- Flèches gauche / droite ---
  const wrap  = track.closest('.carousel-track-wrap');
  const btnL  = wrap.querySelector('.carousel-arrow.left');
  const btnR  = wrap.querySelector('.carousel-arrow.right');
  const STEP  = 300;

  if (btnL) btnL.addEventListener('click', () => {
    track.scrollBy({ left: -STEP, behavior: 'smooth' });
  });
  if (btnR) btnR.addEventListener('click', () => {
    track.scrollBy({ left: STEP, behavior: 'smooth' });
  });

  // --- Touch mobile (swipe) ---
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchmove', e => {
    const dx = touchStartX - e.touches[0].clientX;
    track.scrollLeft += dx * 0.8;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
});

/* ===== SCROLL INDICATION RESPONSIF ===== */

const scrollIndicator=document.querySelector('.scroll-indicator');
if(scrollIndicator){
  //cacheé la souris après 80px de scroll
  window.addEventListener('scroll', ()=>{
if(window.scrollY>80){
  scrollIndicator.style.opacity='0';
  scrollIndicator.style.pointerEvents='none';
}else{
  scrollIndicator.style.opacity='1';
  scrollIndicator.style.pointerEvents='auto';
}
  }, {passive:true });
  //mm pour mobile
  const checkHeight= () =>{
    if(window.innerHeight< 500){
      scrollIndicator.style.display='none';
    }else{
      scrollIndicator.style.display='flex';
    }
  };
  checkHeight();
  window.addEventListener('resize', checkHeight);
}