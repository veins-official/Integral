const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

context.lineWidth = 3;
let a = 0;
let b = Math.PI * 3;
let result = 0
let resolution = 25
let zoom = 100
let f = 'x'
let startX = 0
let startY = 0
context.fillStyle = "black";

function y(x) { return eval(f); }


let x = a;
async function tick() {
    if(x >= b) return;

    requestAnimationFrame(tick);

    context.clearRect(0, 0, canvas.width/5, 20)
    context.font = "bold 16px Arial";
    context.fillText(result.toFixed(3), 8, 16);

    context.strokeStyle = "lime";

    let x1 = x;
    let x2 = x + 1/resolution;
    let y1 = y(x1)
    let y2 = y(x2)

    context.beginPath()
    context.lineTo(startX + x1 * zoom, canvas.height - startY);
    context.lineTo(startX + x1 * zoom, canvas.height - y1 * zoom - startY);
    context.lineTo(startX + x2 * zoom, canvas.height - y2 * zoom - startY);
    context.lineTo(startX + x2 * zoom, canvas.height - startY);
    context.closePath()
    context.fill();
    context.stroke();

    result += Math.abs((1/resolution) * (y1 + y2) / 2);
    x += 1/resolution;
}


function calculate() {
    startX = parseFloat(document.getElementById('startX').value); if(!startX) startX = 0;
    startY = parseFloat(document.getElementById('startY').value); if(!startY) startY = 0;
    zoom = parseFloat(document.getElementById('zoom').value); if(!zoom) zoom = 100;
    a = parseFloat(document.getElementById('id_bottom').value); if(!a) a = 0;
    b = parseFloat(document.getElementById('id_top').value); if(!b) b = 1;
    f = document.getElementById('f').value; if(!f) f = 'x';
    resolution = document.getElementById('res').value; if(!resolution) resolution = 10;
    context.clearRect(0, 0, canvas.width, canvas.height)
    x = a
    result = 0
    requestAnimationFrame(tick);
}


const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
      // удалим у кнопки класс btn-up_hide
      this.el.classList.remove('btn-up_hide');
    },
    hide() {
      // добавим к кнопке класс btn-up_hide
      this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
      // при прокрутке содержимого страницы
      window.addEventListener('scroll', () => {
        // определяем величину прокрутки
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
        scrollY > 400 ? this.show() : this.hide();
      });
      // при нажатии на кнопку .btn-up
      document.querySelector('.btn-up').onclick = () => {
        // переместим в начало страницы
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }
  
  btnUp.addEventListener();