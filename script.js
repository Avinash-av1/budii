const herName = "My Love";

const loveMessage = `Yayyy ${herName} 💕
You just made my heart the happiest ❤️
Forever and always 😘`;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const loveText = document.getElementById("loveText");
const buttonsBox = document.querySelector(".buttons");

let yesScale = 1;

/* Smooth growth function */
function growYes() {
  yesScale += 0.12;
  yesBtn.style.transform = `scale(${yesScale})`;
}

/* Move NO only when clicked/touched */
function moveNo(e) {
  e.preventDefault();

  const box = buttonsBox.getBoundingClientRect();

  const maxX = box.width - noBtn.offsetWidth;
  const maxY = box.height + 100;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  growYes();
}

/* Desktop + Mobile */
noBtn.addEventListener("click", moveNo);
noBtn.addEventListener("touchstart", moveNo);

/* YES button */
yesBtn.addEventListener("click", () => {
  buttonsBox.style.display = "none";
  loveText.style.display = "block";
  loveText.innerText = loveMessage;
  startFireworks();
});

/* Floating hearts */
function heart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 18 + Math.random() * 22 + "px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}
setInterval(heart, 280);

/* Fireworks */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.onresize = resize;

let particles = [];

function startFireworks() {
  setInterval(() => {
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 100
      });
    }
  }, 600);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
