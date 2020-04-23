"use strict";

let state = 'waiting'; 
//выбрали чашку

let cupImg = document.querySelector('.coffee-cup img');
let progressBar = document.querySelector('.progress-bar');
let balanceInput = document.querySelector('input[placeholder="Баланс"]');

cupImg.onclick = takeCoffee;

function buyCoffee(name, price, element) {
  //console.log([name, prise, element]);
  
  if (state != 'waiting') {
    return; //прекратит действие 
  }
  
  //let balanceInput = document.querySelector('input[placeholder="Баланс"]'); вынесли в глобал
  
  if (+balanceInput.value < price) {
    changeDisplayText("Недостаточно средств");
    balanceInput.style.border = "2px solid red";
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = ""; //уберет наш стиль если денег хватает
    state = "cooking"; //не даст заказать новую чашку
    cookCoffee(name, element);
  }
}

function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовиться");
  //let progressBar = document.querySelector('.progress-bar'); вынесли в глобал
  let buttonImg = buttonElement.querySelector("img");
  let cupSrc = buttonImg.getAttribute('src');
 // let cupImg = document.querySelector('.coffee-cup img'); //вынесли в глобал
  
  cupImg.setAttribute('src', cupSrc);
  cupImg.classList.remove('d-none'); //возращает картинку кружки при выборе напитка с кружкой - в php d-none ьы убрали кружку
  
  
  let i = 0;
  let interval = setInterval(function () {
    i++;
    progressBar.style.width = i + "%"; //width: 10% строка в которую записан символ "%"
    cupImg.style.opacity = i + '%';
    if (i == 110) {
      clearInterval(interval);
      changeDisplayText("Ваш " + name + " готов!");
      cupImg.style.cursor = "pointer";
      state = "ready";
    }
  }, 100);
}

function takeCoffee() {
  if (state != "ready") {//если стейт не равно реди то тогда ретюрн этот код не даст забрать чашку во время приготовления
    return;
  }
  state = "waiting";
  cupImg.style.opacity = 0;
  cupImg.style.cursor = "";
  cupImg.classList.add("d-none");
  changeDisplayText("Выберите кофе");
  progressBar.style.width = 0;
}

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text;
}

//---------Купюры---------------------


let bills = document.querySelectorAll(".bills img");//найти все купюры
for (let i=0; i < bills.length; i++) {//повесить событие на все купюры - bills это массив.length это длина массива 
    bills[i].onmousedown = takeMoney; /*  bills[i].onmousedown = function (event) {
    takeMoney(event); //можно через функцию обертку
    }*/
}

function takeMoney(event) {//запись ранозначная функции обертке в onmousedown = takeMoney
 event.preventDefault(); //убирает призрачность
 let bill = event.target;
 
 bill.style.position = "absolute";
 bill.style.transform = "rotate(90deg)";
 bill.style.margin = 0;
 //console.log(event.target) эта запись то же что и console.log(this);
 //console.log(this); эта запись то же что и console.log(event.target);
 //для того чтоб узнать положение нашей мыши и купюры есть метод getBoundingClientRect();
 let billCoords = bill.getBoundingClientRect();
 let billWidth = billCoords.width;
 let billHeight = billCoords.height;
 //console.log(event.clientX, event.clientY); //даст нам координаты оси x и y
 
 bill.style.top = event.clientY - billWidth/2 + "px"; //вычислили при нажатии по центру купюру
 bill.style.left = event.clientX - billHeight/2 + "px";
 //чтоб на всем окне отловить событие нужно на элемент window повесить событие
 window.onmousemove = function(event) { 
  bill.style.top = event.clientY - billWidth/2 + "px"; 
 bill.style.left = event.clientX - billHeight/2 + "px";
 }
 
 bill.onmouseup = function() {
   window.onmousemove = null;//сбросили значения
   if ( inAtm(bill) ) {
     let billCost = +bill.getAttribute("cost");
     balanceInput.value = +balanceInput.value + billCost;
     bill.remove(); //этод метод ремув на всегда удаляет элемент
   } 
 }
 function inAtm(bill) {
   let atm = document.querySelector('.atm img');
   
   let atmCoords = atm.getBoundingClientRect();//координаты атм
   let billCoords = bill.getBoundingClientRect();//координаты купюры
   
   let billLeftTopCorner = {"x" : billCoords.x, "y" : billCoords.y};
   let billRightTopCorner = {"x" : billCoords.x + billCoords.width, "y" : billCoords.y};
   
   
   let atmLeftTopCorner = {"x" : atmCoords.x, "y" : atmCoords.y};
   let atmRightTopCorner = {"x" : atmCoords.x + atmCoords.width, "y" : atmCoords.y};
   let atmLeftBottomCorner = {"x" : atmCoords.x, "y" : atmCoords.y + atmCoords.height/3};
   
   //return [atmLeftTopCorner, atmRightTopCorner, atmLeftBottomCorner];
   if (billLeftTopCorner.x > atmLeftTopCorner.x
        && billRightTopCorner.x < atmRightTopCorner.x
        && billLeftTopCorner.y > atmLeftTopCorner.y
        && billLeftTopCorner.y < atmLeftBottomCorner.y
     ) {
       return true;
     } else {
       return false;
     }
 }
 
}

//------Сдача-------
//Прибавили в html атрибут cost, когда нужны данные html можем прибавить атрибут к html b с помощью getAttribute его вызвать
//вызвали событи и привязали его к элементу let changeButton = document.querySelector(".change-btn");
let changeButton = document.querySelector(".change-btn");
/*changeButton.onclick = funktion () {
  takeChange();
}*/
changeButton.onclick = takeChange;

function takeChange() {
  /*let changeBox = document.querySelector(".change-box");
  changeBox.innerHTML += `
  <img src="img/10rub.png">`;*/
  tossCoin("10"); //чтоб не захломлять вынесли takeChange в отдельную функцию эта функция которая вываливает нам монетки в наш див
  
}
function tossCoin(cost) {
  let changeBox = document.querySelector(".change-box");
  changeBox.style.position = "relative"; //нам дас позицию только в этом блоке (элементе)
  let changeBoxCoords = changeBox.getBoundingClientRect(); //метод который определяет координаты
  let randomWidth = getRandomInt(0, changeBoxCoords.width - 50); //получаем случайные координаты чтоб они вывалмвались в этот бокс и ограничели их ширину монеты накладываьются друг на друга
  let randomHeight = getRandomInt(0, changeBoxCoords.height - 50);//получаем случайные координаты чтоб они вывалмвались в этот бокс и ограничели их высоту
  console.log(randomWidth, randomHeight);
  
/*Альтернативный костыль.
Вместо changeBox.append(coin); можно добавлять в document.body.append(coin).
Тогда позиционирование работает нормально.*/
  
  let coin = document.createElement("img"); //создает элемент в вакууме и нам его нужно прицепить (если нужен див то див если спан то спан и т д)
  coin.setAttribute('src', 'img/10rub.png');//настраиваем элемент обращаемся к пути монетки
  coin.style.width = "50px";//меняем размер картинки монетки
  coin.style.height = "50px";//меняем размер картинки монетки
  
  coin.style.position = "absolute";//меняем позицию от края родительского элемента
  coin.style.top = randomHeight + 'px'; //на рандомной высоте
  coin.style.left = randomWidth + 'px';//на рандомной ширине
  
  changeBox.append(coin);//крепим элемент внутрь в конец родительского элемента
 // changeBox.prepend(coin); //крепим элемент внутрь в начало родительского элемента
  //changeBox.before(coin);//перед элементом вне элемента
  //changeBox.after(coin);//после элемента вне элемента
  //changeBox.replaceWith(coin); //заменит наш changeBox на монетку
  
}

function getRandomInt(min, max) { //взяли функцию из mozila developer
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}





