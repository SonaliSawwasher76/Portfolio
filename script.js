// Basic interactions: theme toggle, burger nav, smooth scroll, contact form & filtering
document.addEventListener('DOMContentLoaded', ()=> {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const yearEl = document.getElementById('year');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const filter = document.getElementById('filter');
  const projectsGrid = document.getElementById('projects-grid');
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');

  yearEl.textContent = new Date().getFullYear();

  // theme
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){ body.classList.add('dark'); themeToggle.textContent = '☀️'; }
  themeToggle.addEventListener('click', ()=>{
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // burger
  burger.addEventListener('click', ()=> {
    nav.classList.toggle('open');
  });

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      if(nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // contact form (static): simulate sending
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formMsg.textContent = 'Sending…';
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){ formMsg.textContent = 'Please complete all fields.'; return; }
    setTimeout(()=> {
      formMsg.textContent = 'Thanks — your message has been noted. I will reply via email soon.';
      form.reset();
    }, 800);
  });

  // project filter
  filter.addEventListener('change', (e)=>{
    const v = e.target.value;
    Array.from(projectsGrid.children).forEach(card=>{
      const tags = card.getAttribute('data-tags').split(',');
      if(v === 'all' || tags.includes(v)) card.style.display = '';
      else card.style.display = 'none';
    });
  });
});
