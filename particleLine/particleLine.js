//获取元素canvas
var canvas = document.getElementById("canvas");
//设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//二维渲染上下文
var ctx = canvas.getContext("2d");
//存放粒子数
var particlesArray = [];
// 根据画面尺寸生成粒子数，大概每100*100的范围有一粒
var count = parseInt(canvas.height / 130 * canvas.width / 130);
//利用类的方式来设置粒子
class Particle {
    //创建和初始化类中的元素对象   类的属性只包括X,Y坐标即可
    constructor(x, y) {
            this.x = x;
            this.y = y;
            //随机生成移动的方向
            this.directionY = 0.5 - Math.random();
            this.directionX = 0.5 - Math.random();
        }
        //update 方法来改变粒子的坐标
    update() {
            this.y += this.directionY;
            this.x += this.directionX;
        }
        //draw方法根据粒子的X,Y属性绘制圆点
    draw() {
        //beginPath()开始一条路径
        ctx.beginPath();
        //arc((圆的中心的 x 坐标),(圆的中心的 y 坐标),(圆的半径),(起始角，以弧度计 [弧的圆形的三点钟位置是 0 度]),(结束角，以弧度计),(counterclockwise [可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针]))   用来创建弧/曲线
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        //填充绘画颜色
        ctx.fillStyle = "white";
        //填充当前的图像（路径）。默认颜色是黑色
        ctx.fill();
    }
}

//创建粒子函数
function createPartiicle() {
    //在画布范围内随机生成粒子即可
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y));
}

//粒子处理函数
function handleParticle() {
    //首先遍历粒子
    for (var i = 0; i < particlesArray.length; i++) {
        var particle = particlesArray[i];
        //调用Update 方法跟新
        particle.update();
        //再调用draw 方法绘制
        particle.draw();
        //边界值判断 当粒子飞出画面，则删除
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
            particlesArray.splice(i, 1);
        }
        //绘制连线
        //方法：每生成一个粒子都去遍历一遍尚未生成的粒子，根据俩粒子之间的距离去判断是否需要画线
        for (let j = i; j < particlesArray.length; j++) {
            dx = particlesArray[i].x - particlesArray[j].x;
            dy = particlesArray[i].y - particlesArray[j].y;
            //利用平面几何来计算两点的距离
            //sqrt求平方根  pow(x,y) x的Y次
            long = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            //距离小于100链接两点
            if (long < 130) {
                ctx.beginPath();
                //strokeStyle 设置或返回笔触颜色
                ctx.strokeStyle = "rgba(255,255,255," + (1 - long / 130) + ""; //rgba使其连接线透明化
                //移动位置
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                //创建到达位置的线
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.lineWidth = 1;
                //使用 stroke() 方法在画布上绘制确切的路径。
                ctx.stroke();
            }
        }
    }
}

//绘制函数
function draw() {
    //先清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //如果当前粒子数小于预设的数量，则生成新的粒子
    if (particlesArray.length < count) {
        createPartiicle();
    }
    //继续调用处理粒子函数来改变粒子位置及绘制粒子
    handleParticle();
}
setInterval(() => {
    draw(), 1
})