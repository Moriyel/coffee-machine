"use strict"
let state = "waiting"; //выбрали чашку
let cupImg = document.querySelector('.coffee-cup img');
let progressBar = document.querySelector('.progress-bar');
cupImg.onclick = takeCoffee;

function buyCoffee(name, price, element) {
  //console.log([name, prise, element]);
  if (state != "waiting") {
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

function takeCoffee(){
  if (state != "ready"){//если стейт не равно реди то тогда ретюрн этот код не даст забрать чашку во время приготовления
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