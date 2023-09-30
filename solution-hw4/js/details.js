const cart = {}

//roll
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

//header
const headerElement = document.querySelector('roll-header-text');
headerElement.innerText = rollType;

//price
const rollPrice = document.querySelector('roll-price');
rollPrice.innerText = rollPrice;

//img
const rollImage = document.querySelector("#roll-img");
rollImage.src = "../assets/products/" + rollType + "-cinnamon-roll.jpg";
