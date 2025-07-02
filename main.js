// Partículas animadas en el header
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const colors = ['#00e6ff', '#fff', '#2c5364'];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.hero').offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  function createParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }
  createParticles();
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}
// Animación al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('hidden');
  observer.observe(sec);
});
// Estilos para animación scroll
const style = document.createElement('style');
style.innerHTML = `
  section.hidden { opacity: 0; transform: translateY(60px); transition: all 0.8s cubic-bezier(.4,2,.3,1); }
  section.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(style);
// Menú hamburguesa mejorado
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
  });
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burger.classList.remove('active');
    });
  });
}
// Filtros de proyectos
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 100);
      } else {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});
// Animar barras de habilidades al hacer scroll
function animateSkills() {
  document.querySelectorAll('.progress').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { 
      bar.style.width = width; 
    }, 400);
  });
}
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  let skillsAnimated = false;
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
      }
    });
  }, { threshold: 0.3 });
  
  skillsObserver.observe(skillsSection);
}
// Fondo de partículas mejorado
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { 
        value: 60,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: { value: '#d4af37' },
      shape: { type: 'circle' },
      opacity: { 
        value: 0.5,
        random: false,
        anim: {
          enable: false
        }
      },
      size: { 
        value: 3,
        random: true,
        anim: {
          enable: false
        }
      },
      line_linked: { 
        enable: true, 
        distance: 120, 
        color: '#d4af37', 
        opacity: 0.3, 
        width: 1 
      },
      move: { 
        enable: true, 
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { 
          enable: true, 
          mode: 'repulse' 
        },
        onclick: { 
          enable: true, 
          mode: 'push' 
        },
        resize: true
      },
      modes: {
        repulse: { 
          distance: 80,
          duration: 0.4
        },
        push: { 
          particles_nb: 4 
        }
      }
    },
    retina_detect: true
  });
}
// Validación del formulario de contacto mejorada
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    
    if (!name || !email || !subject || !message) {
      showNotification('Por favor, completa todos los campos.', 'error');
      return;
    }
    
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showNotification('Por favor, ingresa un email válido.', 'error');
      return;
    }
    
    showNotification('¡Gracias por tu mensaje! Pronto te contactaré.', 'success');
    form.reset();
  });
}
// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1em 2em;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
// Animación de entrada para elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('section, .project-card, .skill-category, .social-link').forEach(el => {
  el.classList.add('hidden');
  animationObserver.observe(el);
});

// Agregar estilos para animaciones de entrada
const style = document.createElement('style');
style.innerHTML = `
  .hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
// Dark/Light mode toggle (opcional)
// Puedes agregar un botón en el nav para cambiar el modo 