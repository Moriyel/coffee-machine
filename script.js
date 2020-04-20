"use strict"
/*//Поиск элементов
//----------устаревшие методы---------------------
/*let coffeeMachine = document.getElementById("coffee");//Поиск по id
console.log(coffeeMachine);
let images = document.getElementsByTagName('img');//Поиск по тегу
console.log(images);

let coffeeItems = document.getElementsByClassName("coffee-item"); //Поиск по классу
console.log(coffeeItems);
let firstImage =  coffeeItems[0].getElementsByTagName("img");
console.log(firstImage[0]);
//---------------------------------------
//--------Современные методы-------------
/*let coffeeMachine = document.querySelector('#coffee');
console.log(coffeeMachine);
//--если элементов много
let image = document.querySelector('img');
console.log(image);
//----найти все элемнты с определенным классом
let coffeeItems = document.querySelectorAll(".coffee-item"); //Поиск по классу
console.log(coffeeItems);

let itemImages = document.querySelectorAll(".coffee-item img");
console.log(itemImages);

let cupImages = document.querySelectorAll(".coffee-item img, .coffee-cup img");
console.log(cupImages);
//---------------------------------
//------работа с элементами---------
//Изменение CSS свойств
/*let coffeeMachine = document.querySelector('.coffee-machine');
coffeeMachine.style.border = "10px solid darkblue";
coffeeMachine.style.borderRadius = "20px";
coffeeMachine.style.position = "absolute";
coffeeMachine.style.top = "15px";//такими способами делается анимация в играх
coffeeMachine.style.left = "150px";
let coffeeMachineTop = coffeeMachine.style.top;
console.log( parseInt(coffeeMachineTop) );
//--Изменение атрибутов
/*let balance = document.querySelector("input[type='text']");
------let balanceType = balance.getAttribute("type");
console.log(balanceType);
balance.setAttribute("type", "date"); //"type" берем этот элемент и меняем его на этот, "date"
console.log( balance.hasAttribute("placeholder") );//проверит есть ли такой элемент
balance.removeAttribute("aria-label");-----
balance.value = 500; //==balance.getAttribute('value',500)
console.log(balance.value);//==balance.getAttribute('value') так можно обратиться к уже существующим в html атрибутам
//Изменения класов
/*let changeButton = document.querySelector('.btn');
console.log(changeButton.classList);
changeButton.classList.remove('btn-primary');
changeButton.classList.add('btn-success');
//changeButton.classList.toggle('ml-5');//вкл. / выкл.
//Изменение содержимого элементов
/*let displayText = document.querySelector('.display-text');
console.log( displayText.innerHTML );
console.log( displayText.innerText );
//displayText.innerHTML = "<b>Готовим кофе</b>";
displayText.innerText = "<b>Готовим кофе</b>";

//События и слушатели событий
//Мышь - click mouserover mouseup mousedown mousemove
// для input - focus change
//1. с помощью атрибута*/
//-------------планирование----------------
//таймаут
/*let timeout = setTimeout(paintBody, 5000, 'aqua');
let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearTimeout(timeout);
}
//setTimeout(function () {
//paintBody('aqua');
//}, 5000);
function paintBody(color) {
  document.body.style.background = color;
}
*/
let interval = setInterval(trashConsole, 1000);

let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearInterval(interval);
}
function trashConsole() {
  console.log(Math.random());
}
