// ── PARTICLES ──
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function mkParticle() {
  return {
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.5 + .4,
    vx: (Math.random() - .5) * .15,
    vy: -Math.random() * .25 - .05,
    alpha: Math.random() * .5 + .1,
    color: Math.random() < .6 ? '#c2566a' : '#c9a06a'
  };
}
for (let i = 0; i < 80; i++) particles.push(mkParticle());

(function anim() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.y < -4) { Object.assign(p, mkParticle()); p.y = H + 4; }
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  requestAnimationFrame(anim);
})();

// ── MUSIC ──
// We link to a YouTube embed as audio — user clicks play
let playing = false;
let audio = null;

// function toggleMusic() {
//   if (!audio) {
//     // YouTube iframe approach — opens in small overlay
//     const overlay = document.createElement('div');
//     overlay.id = 'ytOverlay';
//     overlay.style.cssText = 'position:fixed;bottom:80px;right:24px;z-index:200;border-radius:8px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.6)';
//     overlay.innerHTML = <source src="voices/pm.mp3" type="audio/mpeg">voices/pm.mp3</source>;
//     document.body.appendChild(overlay);
//     playing = true;
//   } else {
//     playing = !playing;
//   }
//   document.getElementById('playBtn').textContent = playing ? '⏸' : '▶';
//   document.getElementById('eq').classList.toggle('paused', !playing);
//   audio = true;
// }

// ── NAME CLOUD ──
const names = [
  { text: 'Hersheyss', size: '2.8rem' },
  { text: 'Gotuu',     size: '2.2rem' },
  { text: 'my love',   size: '1.6rem' },
  { text: 'Hersheyss', size: '1.3rem' },
  { text: 'baby',      size: '1.9rem' },
  { text: 'Gotuu',     size: '1.4rem' },
  { text: 'mine',      size: '2rem'   },
  { text: 'Hersheyss', size: '3.2rem' },
  { text: 'my girl',   size: '1.5rem' },
  { text: 'Gotuu',     size: '2.6rem' },
  { text: 'Hersheyss', size: '1.8rem' },
  { text: 'always',    size: '1.4rem' },
  { text: 'Gotuu',     size: '1.2rem' },
  { text: 'my person', size: '1.6rem' },
  { text: 'Hersheyss', size: '2.4rem' },
];

const cloud = document.getElementById('namesCloud');
names.forEach((n, i) => {
  const span = document.createElement('span');
  span.className = 'name-word';
  span.textContent = n.text;
  span.style.fontSize = n.size;
  span.style.animationDelay = (i * 0.12) + 's';
  cloud.appendChild(span);
});

// ── PHOTO UPLOAD ──
function triggerUpload(photoDiv) {
  photoDiv.querySelector('.photo-input').click();
}

function loadPhoto(input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const photoDiv = input.closest('.memory-photo');
    photoDiv.querySelector('.photo-placeholder').remove();
    const img = document.createElement('img');
    img.src = e.target.result;
    photoDiv.insertBefore(img, photoDiv.querySelector('.upload-overlay'));
  };
  reader.readAsDataURL(input.files[0]);
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.style.opacity = '1';
  });
}, { threshold: .1 });
document.querySelectorAll('.memory-card').forEach(c => {
  c.style.opacity = '0';
  c.style.transition = 'opacity .8s ease';
  observer.observe(c);
});
