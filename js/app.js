'use strict';

const products = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];
const imageSection = document.getElementById('imagesSection');
const leftImage = document.getElementById('leftImage');
const middleImage = document.getElementById('middleImage');
const rightImage = document.getElementById('rightImage');
let clicks = 0;
// Product.data = [];

function Product(name, imgExt) {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.path = `./assets/${name}.${imgExt}`;
  Product.all.push(this);
}

function updateStorage() {
  const arrayString = JSON.stringify(Product.all);
  console.log(arrayString);
  localStorage.setItem('products', arrayString);
}

function getVoting() {
  const data = localStorage.getItem('products');
  const votingAndViews = JSON.parse(data);
  return votingAndViews;
  // if (votingAndViews === null) {
  //   Product.all = votingAndViews;
  // }

}console.log(getVoting());


Product.all = [];
for (let i = 0; i < products.length; i++) {
  if (products[i] === 'sweep') {
    new Product(products[i], 'png');
  } else if (products[i] === 'usb') {
    new Product(products[i], 'gif');
  } else {
    new Product(products[i], 'jpg');
  }

}

let resultButton = document.getElementById('results');
resultButton.addEventListener('click', viewResult);
function viewResult(event) {
  theResults();
  createChart();
  resultButton.removeEventListener('click',viewResult);
}


function theResults() {
  let unorderedList = document.createElement('ul');
  unorderedList.innerText='';
  for (let i = 0; i < products.length; i++) {
    let resultList = document.createElement('li');
    unorderedList.appendChild(resultList);
    let final = products[i] + ' has ' + getVoting()[i].votes + ' votes, ' + ' and was seen ' + getVoting()[i].views + ' times.';
    resultList.innerText = final;
    // Product.all.push(this);
  }
  resultButton.appendChild(unorderedList);
}

let olderArray = [];
function render() {
  if (clicks === 25) {
    imageSection.removeEventListener('click', clickHandler);
    updateStorage();
  }
  let leftIndex;
  let middleIndex;
  let rightIndex;
  do {
    leftIndex = randomNumber(0, Product.all.length - 1);
    middleIndex = randomNumber(0, Product.all.length - 1);
    rightIndex = randomNumber(0, Product.all.length - 1);

  }
  while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex || olderArray.includes(leftIndex) || olderArray.includes(middleIndex) || olderArray.includes(rightIndex));

  const leftRandomProduct = Product.all[leftIndex];
  leftImage.src = leftRandomProduct.path;
  leftImage.title = leftRandomProduct.name;
  leftImage.alt = leftRandomProduct.name;
  olderArray[0] = leftIndex;
  const middleRandomProduct = Product.all[middleIndex];
  middleImage.src = middleRandomProduct.path;
  middleImage.title = middleRandomProduct.name;
  middleImage.alt = middleRandomProduct.name;
  olderArray[1] = middleIndex;

  const rightRandomProduct = Product.all[rightIndex];
  rightImage.src = rightRandomProduct.path;
  rightImage.title = rightRandomProduct.name;
  rightImage.alt = rightRandomProduct.name;
  olderArray[2] = rightIndex;

  console.log(clicks);
}

imageSection.addEventListener('click', clickHandler);
render();
function clickHandler(event) {
  // const data = localStorage.getItem('[products]');
  // const votingAndViews = JSON.parse(data);

  if (event.target.id === 'leftImage' || event.target.id === 'middleImage' || event.target.id === 'rightImage') {
    let productList = getVoting();
    if (productList === null) {
      productList = Product.all;
    }
    for (let i = 0; i < Product.all.length; i++) {
      if (Product.all[i].name === event.target.title) {
        Product.all[i].votes++;
        clicks++;
        console.table(Product.all[i]);
      }
    }
    for (let i = 0; i < products.length; i++) {
      if (products.indexOf(products[i]) === olderArray[0] || products.indexOf(products[i]) === olderArray[1] || products.indexOf(products[i]) === olderArray[2]) {
        Product.all[i].views++;
      }
    }
    render();
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createChart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let getProductsName = [];
  let getProductsVotes = [];
  let getProductsViews = [];

  for (let i = 0; i < products.length; i++) {
    getProductsName.push(getVoting()[i].name);
  }

  for (let i = 0; i < products.length; i++) {
    getProductsVotes.push(getVoting()[i].votes);
  }

  for (let i = 0; i < products.length; i++) {
    getProductsViews.push(getVoting()[i].views);
  }

  let chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: getProductsName,
      datasets: [{
        label: 'Voting',
        backgroundColor: 'rgb(138,43,226)',
        borderColor: 'rgb(255, 99, 132)',
        data: getProductsVotes
      },
      {
        label: 'Views',
        backgroundColor: 'rgb(205,92,92)',
        borderColor: 'rgb(0, 99, 132)',
        data: getProductsViews
      }

      ]
    },
    options: {}
  });
} getVoting();
