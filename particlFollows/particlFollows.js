let canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.pointerEvents = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

let particleArray = [];
class particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = (Math.random() * 255) | 0;
    this.vx = 0.5 - Math.random();
    this.vy = 0.5 - Math.random();
    this.age = (Math.random() * 100) | 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.01;
    this.age--;
    this.color++;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${this.color % 255}deg,50%,50%)`;
    ctx.arc(this.x, this.y, this.color % 3, Math.PI * 2, false);
    ctx.fill();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    let particle = particleArray[i];
    particle.update();
    particle.draw();

    if (particle.age < 0) {
      particleArray.splice(i, 1);
    }
  }
}

setInterval(draw, 10);
window.addEventListener("mousemove", (evt) => {
  for (let i = 0; i < 10; i++) {
    particleArray.push(new particle(evt.x, evt.y));
  }
});
