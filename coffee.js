"use strict"

function buyCoffee(name, price, element) {
  //console.log([name, prise, element]);
  let balanceInput = document.querySelector('input[placeholder="Баланс"]');
  if (+balanceInput.value < price) {
    changeDisplayText("Недостаточно средств");
    balanceInput.style.border = "2px solid red";
  } else {
    balanceInput.value -= price;
    balanceInput.style.border = ""; //уберет наш стиль если денег не хватает
    cookCoffee(name, element);
  }
}

function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовиться");
  let progressBar = document.querySelector('.progress-bar');
  console.log(progressBar);
}
function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text;
}