// constructor and variable declaration
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.element = null
    }
}

//array of glaze types and prices
let allGlazes = [
    {
        type: 'Keep original',
        price: 0.00,
    },
    {
        type: 'Sugar milk',
        price: 0.00,
    },
    {
        type: 'Vanilla milk',
        price: 0.50,
    },
    {
        type: 'Double chocolate',
        price: 1.50,
    },
];

//array of pack sizes and prices
let allPacks = [
    {
        size: '1',
        price: 1,
    },
    {
        size: '3',
        price: 3,
    },
    {
        size: '6',
        price: 5,
    },
    {
        size: '12',
        price: 10,
    },
];

//create an empty Set, which will hold all roll objects
const cart = new Set();
//create a cart total which will allow us to manipulate to total price
let cartTotal = 0;

// DETAILS 

//roll
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

// rollcheck -> console.log(rollType);

//header
const headerElement = document.querySelector('#roll-header-text');
headerElement.innerText = rollType + ' Cinnamon Roll';

// headcheck -> console.log(rollType + ' Cinnamon Roll');

//img
const rollImage = document.querySelector('#roll-img');
rollImage.src = rolls[rollType]["imageFile"];

//price
var rollPrice = document.querySelector('#roll-price');
rollPrice.innerText = rolls[rollType]["basePrice"];

//pricecheck console.log(rolls[rollType]["basePrice"]);


//instantiating base price and pack and glaze prices and types/sizes
var basePrice = rolls[rollType]["basePrice"];
var gPrice = 0.00;
var pPrice = 1.00;
var glazeType = 'Keep original';
var packSize = '1';

let glazeSelect = document.getElementById("glaze-select");

for (var i = 0; i < allGlazes.length; i++){
    let gOption = document.createElement('option');
    gOption.text = allGlazes[i].type;
    gOption.value = allGlazes[i].price;
    glazeSelect.add(gOption);
}

let packSelect = document.getElementById("pack-select");

var currentRoll = new Roll(rollType, glazeType, packSize, basePrice);

for (var j = 0; j < allPacks.length; j++){
    let pOption = document.createElement('option');
    pOption.text = allPacks[j].size;
    pOption.value = allPacks[j].price;
    packSelect.add(pOption);
}

function updatePrice() {
    /* PRICE CHECKS
    console.log(parseFloat(basePrice));
    console.log(parseFloat(gPrice));
    console.log(parseInt(pPrice)); */

    var finalPrice = (parseFloat(basePrice) + parseFloat(gPrice)) * parseInt(pPrice);
    //FINAL CHECK console.log(finalPrice);
    rollPrice.innerText = Math.round(100 * finalPrice) / 100;
}

function glazingChange(element) {
    //console.log("printing the element:")
    //console.log(element);
    gPrice = element.value;
    glazeType = element.options[element.selectedIndex].text;

    //check prior
    //console.log(glazeType);
    //console.log(currentRoll.glazing);

    currentRoll.glazing = glazeType;

    //check change
    //console.log(currentRoll.glazing);

    updatePrice();
}

function packChange(element) {
    pPrice = element.value;
    packSize = element.options[element.selectedIndex].text;

    //check prior
    //console.log(packSize);
    //console.log(currentRoll.size);

    currentRoll.size = packSize;

    //check change
    //console.log(currentRoll.size);

    updatePrice();
}


function addToCart() {
    //console.log(currentRoll);
    cart.add(currentRoll);
    console.log(cart);
    saveToLocalStorage();
}

document.getElementById("cartBtn").addEventListener("click", addToCart);

function submitRoll(){
    const rollType = document.querySelector('#roll-header-text');
    const rollTypeText = rollType.value;

    const rollGlaze = document.querySelector('#glaze-select');
    const rollGlazeText = rollGlaze.value;

    const rollPack = document.querySelector('#pack-select');
    const rollPackText = rollPack.value;

    const rollPrice = document.querySelector('#roll-price');
    const rollPriceText = rollPrice.value;

    const roll = addNewNote(rollTypeText, rollGlazeText, rollPackText, rollPriceText);

    saveToLocalStorage();
}

function saveToLocalStorage() {
    const cartArr = Array.from(cart);
    //CHECK: print array
    console.log(cartArr);

    const cartArrStr = JSON.stringify(cartArr);
    //CHECK: print string array
    console.log(cartArrStr);

    localStorage.setItem('storedCart', cartArrStr);
}

//CART

//loop through glaze array to get glaze price based on glaze type
function getGlazePrice (rollGlazing){
    for (let i = 0; i < allGlazes.length; i++) {
        if (allGlazes[i].type === rollGlazing) {
            console.log(allGlazes[i].price);
            return allGlazes[i].price;
        }
    }
}

//loop through array of packs to get the price based on the size of a pack
function getPackPrice (packSize){
    for (let i = 0; i < allPacks.length; i++) {
        if (allPacks[i].size === packSize) {
            console.log(allPacks[i].price);
            return allPacks[i].price;
        }
    }
}

//using the base price, glaze price, and pack price, 
//compute the total price of a roll
function calculatePrice(basePrice, gPrice, pPrice) {
    let finalPrice = (parseFloat(basePrice) + parseFloat(gPrice)) * parseInt(pPrice);
    return Math.round(100 * finalPrice) / 100;
}


function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
    //create a new roll object using constructor args: 
    //roll type, glazing, pack size, and base price
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
    
    //add roll object to roll set
    cart.add(roll);
    
    return roll;
}

function createElement(roll) {
    //make a clone of the roll template
    const template = document.querySelector('#roll-template');
    const clone = template.content.cloneNode(true);
    
    //connect this clone to our roll.element
    //now we only need to refer to roll.element
    roll.element = clone.querySelector('.roll');

    const btnDelete = roll.element.querySelector('.roll-remove');
    btnDelete.addEventListener('click', () => {
        deleteRoll(roll);
    });

    //add roll clone to DOM
    //find roll parent (#roll-lost) and add roll as its child
    const rollListElement = document.querySelector('#roll-list');
    rollListElement.append(roll.element);

    //populate roll clone w/ actual roll content
    updateElement(roll);
}

function updateElement(roll) {
    //get the HTML elements that need to be updated
    const rollImageElement = roll.element.querySelector('.roll-img');
    const rollTypeElement = roll.element.querySelector('.roll-type');
    const rollGlazeElement = roll.element.querySelector('.roll-glaze');
    const rollPackElement = roll.element.querySelector('.roll-pack');
    const rollPriceElement = roll.element.querySelector('.roll-calculated-price');

    //calculate total based on base price of roll
    let gPrice = getGlazePrice (roll.glazing);
    let pPrice = getPackPrice (roll.size);
    let calculatedPrice = calculatePrice(roll.basePrice, gPrice, pPrice);
    addCartTotal(calculatedPrice);

    //copy roll content over to the corresponding HTML elements
    rollImageElement.src = rolls[roll.type]["imageFile"];
    rollTypeElement.innerText = roll.type + ' Cinnamon Roll';
    rollGlazeElement.innerText = 'Glazing: ' + roll.glazing;
    rollPackElement.innerText = 'Pack Size: ' + roll.size;
    rollPriceElement.innerText = '$ ' + calculatedPrice.toFixed(2);
}

function addCartTotal(calculatedPrice) {
    const cartTotalElement = document.querySelector('.cart-price');
    cartTotal += calculatedPrice;
    cartTotalElement.innerText = "$ " + cartTotal.toFixed(2);
}

function subtractCartTotal(roll) {
    let gPrice = getGlazePrice (roll.glazing);
    let pPrice = getPackPrice (roll.size);
    let calculatedPrice = calculatePrice(roll.basePrice, gPrice, pPrice);

    const cartTotalElement = document.querySelector('.cart-price');
    cartTotal -= calculatedPrice;
    cartTotalElement.innerText = "$ " + Math.abs(cartTotal).toFixed(2);
}

function deleteRoll(roll) {
    //remove the roll DOM object from UI
    roll.element.remove();

    //update cart total based on the roll removed
    subtractCartTotal(roll);

    //remove actual roll from set of rolls
    cart.delete(roll);

    //update local storage
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const cartArr = Array.from(cart);
    //CHECK: print array
    console.log(cartArr);

    const cartArrStr = JSON.stringify(cartArr);
    //CHECK: print string array
    console.log(cartArrStr);

    localStorage.setItem('storedCart', cartArrStr);
}

function retrieveFromLocalStorage() {
    const cartArrStr = localStorage.getItem('storedCart');
    const cartArr = JSON.parse(cartArrStr);
    for (const rollData of cartArr) {
        const roll = addNewRoll(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
        createElement(roll);
    }
}

if (localStorage.getItem('storedCart') != null) {
    retrieveFromLocalStorage();
}