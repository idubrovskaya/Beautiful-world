let zSpacing = -1000; // отвечает за расстояние между текстом и фото по оси z
let lastPos = zSpacing / 5; //стартовая позиция
let $frames = document.getElementsByClassName('frame'); //именно этот, чтобы можно было сделать массив
let frames = Array.from($frames); // все элементы, кот гнайдет на стр и преобразует в массив
zVals = []; //получит значения по оси z

window.onscroll = function () {
  let top = document.documentElement.scrollTop, //расстояние от верха страницы до тек позиции
    delta = lastPos - top; //хак, чтобы фреймы двигались по оси z, хоть и position:fixed; меняется в зависимости от того, а какую сторону мы скролим

  lastPos = top;

  frames.forEach(function (element, index) {
    zVals.push(index * zSpacing + zSpacing);
    zVals[index] += delta * -5; //можем управлять скоростью пролистывания
    let frame = frames[index];
    let transform = `translateZ(${zVals[index]}px)`;
    let opacity = zVals[index] < Math.abs(zSpacing) / 1.8 ? 1 : 0; // чем боольше этот параметр, тем раньше будет применяться opacity
    frame.setAttribute('style', `transform:${transform}; opacity:${opacity}`);
  });
};

window.scrollTo(0, 1); //триггер-скролл

//Audio

let soundButton = document.querySelector('.soundbutton');
let audio = document.querySelector('.audio');

soundButton.addEventListener('click', (e) => {
  soundButton.classList.toggle('paused');
  audio.paused ? audio.play() : audio.pause();
});

window.onfocus = function () {
  soundButton.classList.contains('paused') ? audio.pause() : audio.play();
};

window.onblur = function () {
  audio.pause();
};
