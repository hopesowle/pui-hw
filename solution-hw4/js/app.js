class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const cart = [];

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



//pack and glaze changes

var basePrice = rolls[rollType]["basePrice"];
var gPrice = 0.00;
var pPrice = 1.00;
var glazeType = 'Keep original';
var packSize = '1';

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

let glazeSelect = document.getElementById("glaze-select");

for (var i = 0; i < allGlazes.length; i++){
    let gOption = document.createElement('option');
    gOption.text = allGlazes[i].type;
    gOption.value = allGlazes[i].price;
    glazeSelect.add(gOption);
}

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

let packSelect = document.getElementById("pack-select");

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

var currentRoll = new Roll(rollType, glazeType, packSize, basePrice);

function glazingChange(element) {
    console.log("printing the element:")
    console.log(element);
    gPrice = element.value;
    glazeType = element.options[element.selectedIndex].text;

    //check prior
    console.log(glazeType);
    console.log(currentRoll.glazing);

    currentRoll.glazing = glazeType;

    //check change
    console.log(currentRoll.glazing);

    updatePrice();
}

function packChange(element) {
    pPrice = element.value;
    packSize = element.options[element.selectedIndex].text;

    //check prior
    console.log(packSize);
    console.log(currentRoll.size);

    currentRoll.size = packSize;

    //check change
    console.log(currentRoll.size);

    updatePrice();
}

function addToCart() {
    console.log(currentRoll);
    cart.push(currentRoll);
    console.log(cart);
}

document.getElementById("cartBtn").addEventListener("click", addToCart);
