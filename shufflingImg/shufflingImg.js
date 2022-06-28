let index = 0;
let time;
let img = document.querySelectorAll(".box-img");
let iconBtn = document.querySelector(".box-btn");
let leftBtn = document.querySelector(".box-left");
let rightBtn = document.querySelector(".box-right");
let item = iconBtn.querySelectorAll("li");

console.log(leftBtn);

function interval() {
  time = setInterval(() => {
    changeImg();
  }, 3000);
}

/**
 * 轮播变换
 */
const changeImg = () => {
  img[index].style.opacity = 0;
  item[index].style["background-color"] = "#ccc";
  index++;
  if (index >= img.length) index = 0;
  item[index].style["background-color"] = "red";
  img[index].style.opacity = 1;
};

/**
 * 左点击
 */
leftBtn.onclick = () => {
  clearInterval(time);
  item[index].style["background-color"] = "#ccc";
  img[index].style.opacity = 0;
  if (index === 0) {
    index = img.length - 1;
  } else {
    index--;
  }
  item[index].style["background-color"] = "red";
  img[index].style.opacity = 1;
  interval();
};
/**
 * 右点击
 */
rightBtn.onclick = () => {
  clearInterval(time);
  changeImg();
  interval();
};

iconBtn.onclick = (e) => {
  clearInterval(time);

  img[index].style.opacity = 0;
  item[index].style["background-color"] = "#ccc";
  index = Array.from(item).indexOf(e.target);
  img[index].style.opacity = 1;
  item[index].style["background-color"] = "red";
  interval();
};

interval();
