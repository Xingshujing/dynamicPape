/* 
 在body中创建一个id = "canvas"  的画布
*/
var canvasElement = document.createElement("canvas");
canvasElement.setAttribute("id", "canvas");
document.body.appendChild(canvasElement);

/* 
 获取页面canvas标签 
*/
var canvas = document.getElementById("canvas");

/* 
设置画布宽高为当前窗口宽高
*/
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* 
设置为2d画布
*/
var canvasContext = canvas.getContext("2d");

/* 
设置指针坐标位置
*/
var mouse = {
  x: 0,
  y: 0,
};

/* 
创建监听鼠标位置
*/
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX; // 改变鼠标x坐标位置
  mouse.y = e.clientY; // 改变鼠标y坐标位置
});

/* 
建立粒子数组
*/
var particlesArray = []; //粒子数组

/* 
定义粒子数量
*/
var count = 30;

class particle {
  /* 
  创建粒子对象   （半径、角速度、尺寸）
  */
  constructor(radius, speed, size) {
    this.radius = radius;
    this.x = 0; //默认x坐标为 0
    this.y = 0; //默认y坐标为 0
    this.angle = Math.random() * 360; // 初始角度为随机
    this.speed = speed;
    this.color = "hsl(" + ((Math.random() * 360) | 0) + ",80%,50%)"; //颜色随机
    this.size = size;
  }

  /* 
  跟新粒子
  */
  update() {
    this.angle += this.speed; //利用角速度值改变角度
    this.x =
      mouse.x + this.radius * Math.cos(((this.angle % 360) * Math.PI) / 180);
    this.y =
      mouse.y + this.radius * Math.sin(((this.angle % 360) * Math.PI) / 180);
  }

  /* 
  绘制粒子
  */
  draw() {
    canvasContext.beginPath(); //开始绘制路径
    canvasContext.fillStyle = this.color; //填充样式
    canvasContext.globalAlpha = 1; //粒子透明的为1
    canvasContext.arc(this.x, this.y, this.size, 0, Math.PI * 2); //绘制圆形
    canvasContext.fill(); //填充当前图像
  }
}

/* 
初始化生成粒子函数
*/
function init() {
  for (let index = 0; index < count; index++) {
    particlesArray.push(
      new particle(index * 2 + 35, Math.random() + 2, Math.random() * 2 + 1)
    ); // 按照粒子数量生成粒子
  }
}

init(); //执行初始化函数

/* 
制作动画函数
*/
function animate() {
  /* 
    利用透明度为0.1黑色填充来表现出拖影效果
  */
  canvasContext.globalAlpha = 0.1;
  canvasContext.fillStyle = "black";

  /* 
   fillRect 绘制“已填色”的矩形  默认黑色
   重新渲染画布
  */
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  /* 
    循环跟新绘制 
 */
  for (let index = 0; index < count; index++) {
    particlesArray[index].update();
    particlesArray[index].draw();
  }

  /* 
    利用动画回调函数绘制动画
  */
  requestAnimationFrame(animate);
}

animate(); // 执行制作动画函数
