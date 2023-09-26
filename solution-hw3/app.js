var price = document.getElementById('roll-price');
var basePrice = 2.49;
var gPrice = basePrice;
price.innerText = basePrice;

let allGlazes = [
    {
        type: 'Keep original',
        price: 0,
    },
    {
        type: 'Sugar milk',
        price: 0,
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

function glazingChange(element) {
    const gPriceChange = element.value;
    gPrice = parseFloat(basePrice) + parseFloat(gPriceChange);
    price.innerText = gPrice;
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

function packChange(element) {
    const pPriceChange = element.value;
    const pPrice = parseFloat(gPrice) * parseFloat(pPriceChange);
    price.innerText = pPrice;
}
