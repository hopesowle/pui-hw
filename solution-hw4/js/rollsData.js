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

const cart = {}

//roll
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

//header
const headerElement = document.querySelector('roll-header-text');
headerElement.innerText = rollType + 'Cinnamon Roll';

//headcheck
console.log(rollType);

//price
const rollPrice = document.querySelector('roll-price');
rollPrice.innerText = rolls.rollType.basePrice;

//pricecheck
console.log(rolls.rollType.basePrice);

//img
const rollImage = document.querySelector('#roll-img');
rollImage.src = rolls.rollType.imageFile;

//imgcheck
console.log(rollImage.src = rolls.rollType.imageFile);
