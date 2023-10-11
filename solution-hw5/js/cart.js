class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.element = null
    }
}

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

function getGlazePrice (rollGlazing){
    for (let i = 0; i < allGlazes.length; i++) {
        if (allGlazes[i].type === rollGlazing) {
            console.log(allGlazes[i].price);
            return allGlazes[i].price;
        }
    }
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

function getPackPrice (packSize){
    for (let i = 0; i < allPacks.length; i++) {
        if (allPacks[i].size === packSize) {
            console.log(allPacks[i].price);
            return allPacks[i].price;
        }
    }
}

function calculatePrice(basePrice, gPrice, pPrice) {
    let finalPrice = (parseFloat(basePrice) + parseFloat(gPrice)) * parseInt(pPrice);
    return Math.round(100 * finalPrice) / 100;
}

const cart = new Set();
let cartTotal = 0;

function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.add(roll);
    return roll;
}

const roll1 = addNewRoll('Original', 'Sugar milk', '1', 2.49);
const roll2 = addNewRoll('Walnut', 'Vanilla milk', '12', 3.49);
const roll3 = addNewRoll('Raisin', 'Sugar milk', '3', 2.99);
const roll4 = addNewRoll('Apple', 'Keep original', '3', 3.49);

for (const roll of cart) {
    createElement(roll);
}

function createElement(roll) {
    const template = document.querySelector('#roll-template');
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector('.roll');

    const btnDelete = roll.element.querySelector('.roll-remove');
    btnDelete.addEventListener('click', () => {
        deleteRoll(roll);
    });

    const rollListElement = document.querySelector('#roll-list');
    rollListElement.append(roll.element);
    updateElement(roll);
}

function updateElement(roll) {
    const rollImageElement = roll.element.querySelector('.roll-img');
    const rollTypeElement = roll.element.querySelector('.roll-type');
    const rollGlazeElement = roll.element.querySelector('.roll-glaze');
    const rollPackElement = roll.element.querySelector('.roll-pack');
    const rollPriceElement = roll.element.querySelector('.roll-calculated-price');

    let gPrice = getGlazePrice (roll.glazing);
    let pPrice = getPackPrice (roll.size);
    let calculatedPrice = calculatePrice(roll.basePrice, gPrice, pPrice);
    addCartTotal(calculatedPrice);

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
    cartTotalElement.innerText = "$ " + cartTotal.toFixed(2);
}

function deleteRoll(roll) {
    roll.element.remove();
    subtractCartTotal(roll);
    cart.delete(roll);
}


