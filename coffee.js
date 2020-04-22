"use strict";

let state = 'waiting'; 
//выбрали чашку

let cupImg = document.querySelector('.coffee-cup img');
let progressBar = document.querySelector('.progress-bar');
cupImg.onclick = takeCoffee;

function buyCoffee(name, price, element) {
  //console.log([name, prise, element]);
  if (state != 'waiting') {
    return; //прекратит действие 
  }
  let balanceInput = document.querySelector('input[placeholder="Баланс"]');
  if (+balanceInput.value < price) {
    changeDisplayText("Недостаточно средств");
    balanceInput.style.border = "2px solid red";
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = ""; //уберет наш стиль если денег не хватает
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
for (let i=0; i < bills.length; i++) {//повесить событие на все купюры
    bills[i].onmousedown = takeMoney; /*  bills[i].onmousedown = function (event) {
    takeMoney(event); //можно через функцию обертку
    }*/
}

function takeMoney(event) {//запись ранозначная функции обертке в onmousedown = takeMoney
 event.preventDefault();
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
   console.log( inAtm(bill) );
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




