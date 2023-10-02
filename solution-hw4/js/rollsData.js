const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "../assets/products/original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "../assets/products/apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "../assets/products/raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "../assets/products/walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "../assets/products/double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "../assets/products/strawberry-cinnamon-roll.jpg"
    }    
};

var cart = {};

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




var basePrice = rolls[rollType]["basePrice"];
var gPrice = 0.00;
var pPrice = 1.00;

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
    console.log(parseInt(pPrice));*/

    var finalPrice = (parseFloat(basePrice) + parseFloat(gPrice)) * parseInt(pPrice);
    //FINAL CHECK console.log(finalPrice);
    rollPrice.innerText = Math.round(100 * finalPrice) / 100;
}

function glazingChange(element) {
    gPrice = element.value;
    updatePrice();
    addToCart();
}

function packChange(element) {
    pPrice = element.value;
    updatePrice();
    addToCart();
}


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

function addToCart() {
    var currentRoll = {type: this.type, glazing: this.glazing, size: this.size, basePrice: this.baseprice}
    console.log(currentRoll);
    cart.append(currentRoll);
    console.log(cart);
}

document.getElementById("cartBtn").addEventListener("click", addToCart);
