/**
 * 获取画布
 */
let canvas = document.getElementById("canvas");
/**
 * 将画布铺满整个页面
 */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width, canvas.height);
/**
 * 设置画布为2d
 */
let ctx = canvas.getContext("2d");
/**
 * 定义烟花弹数组  以及粒子数组
 */
let fireworksArray = [];
let particlesArray = [];
/**
 * 定义粒子类
 */
class Particle {
  constructor(x, y, color) {
    // 炸开坐标
    this.x = x;
    this.y = y;
    this.c = color;
    // 随机生成炸开方向
    this.vx = (0.5 - Math.random()) * 100;
    this.vy = (0.5 - Math.random()) * 100;
    // 随机生成有效期，判断粒子何时熄灭
    this.age = (Math.random() * 100) | 0;
  }
  update() {
    this.x += this.vx / 20;
    this.y += this.vy / 20;
    this.vy++;
    this.age--;
  }
  draw() {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fill();
  }
}
/**
 * 定义烟花弹类
 */
class Firework {
  constructor() {
    // 定义烟花弹的起点为页面下边缘
    this.y = canvas.height;
    // 水平位置为随机
    this.x = (Math.random() * canvas.width) | 0;
    // 确保烟花最高点位于页面偏上位置
    this.vel =
      -(
        (Math.random() * Math.sqrt(canvas.height)) / 3 +
        Math.sqrt(4 * canvas.height) / 2
      ) / 5;
    // 定义颜色随机
     this.c = "hsl(" + ((Math.random() * 365) | 0) + ",100%,75%)";
  }
  update() {
    // 利用y坐标的减少让其不断上升
    this.y += this.vel;
    this.vel += 0.04;
    if (this.vel >= 0) {
      // 当烟花弹达到最高时生成粒子
      for (let i = 0; i < 200; i++) {
        particlesArray.push(new Particle(this.x, this.y, this.c));
      }
      this.y = canvas.height;
      this.x = (Math.random() * canvas.width) | 0;
      this.vel =
        -(
          (Math.random() * Math.sqrt(canvas.height)) / 3 +
          Math.sqrt(4 * canvas.height) / 2
        ) / 5;
    }
  }
  draw() {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < ((canvas.width / 100) | 0); i++) {
    fireworksArray.push(new Firework());
  }
  console.log("fireworksArray", fireworksArray);
}

init();

function draw() {
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < fireworksArray.length; i++) {
    fireworksArray[i].update();
    fireworksArray[i].draw();
  }

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].age < 0) {
      particlesArray.splice(i, 1);
    }
  }

  requestAnimationFrame(draw);
}

draw();
