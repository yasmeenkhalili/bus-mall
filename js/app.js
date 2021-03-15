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
const imageSection=document.getElementById('imagesSection');
const leftImage=document.getElementById('leftImage');
const middleImage=document.getElementById('middleImage');
const rightImage=document.getElementById('rightImage');
let clicks=0;

function Product(name,imgExt){
  this.name=name;
  this.views=0;
  this.votes=0;
  this.path=`./assets/${name}.${imgExt}`;
  Product.all.push(this);
}
Product.all=[];
for(let i=0;i<products.length;i++){
  if(products[i]==='sweep'){
    new Product(products[i],'png');
  }else if (products[i]==='usb'){
    new Product(products[i],'gif');
  }else{
    new Product(products[i],'jpg');
  }

}

let form=document.getElementById('results');
form.addEventListener('submit', viewResult);
function viewResult(event){
  event.preventDefault();
  theResults();
}

// form.addEventListener('reset',function(event){
//   event.preventDefault();
//   form.removeEventListener('submit',viewResult);
//   render();

// });


function theResults(){
  let unorderedList=document.createElement('ul');
  for(let i=0;i<products.length;i++){
    let resultList=document.createElement('li');
    unorderedList.appendChild(resultList);
    let final=products[i]+' has '+ Product.all[i].views+' votes, '+' and was seen '+Product.all[i].votes+' times.';
    resultList.innerText=final;
  }
  form.appendChild(unorderedList);
}

function render(){
  if (clicks===25){
    imageSection.removeEventListener('click',clickHandler);
  }
  const leftIndex=randomNumber(0,Product.all.length-1);
  const leftRandomProduct=Product.all[leftIndex];
  leftImage.src=leftRandomProduct.path;
  leftImage.title=leftRandomProduct.name;
  leftImage.alt=leftRandomProduct.name;

  const middleIndex=randomNumber(0,Product.all.length-1);
  const middleRandomProduct=Product.all[middleIndex];
  middleImage.src=middleRandomProduct.path;
  middleImage.title=middleRandomProduct.name;
  middleImage.alt=middleRandomProduct.name;

  const rightIndex=randomNumber(0,Product.all.length-1);
  const rightRandomProduct=Product.all[rightIndex];
  rightImage.src=rightRandomProduct.path;
  rightImage.title=rightRandomProduct.name;
  rightImage.alt=rightRandomProduct.name;

  clicks++;
  console.log(clicks);
}

imageSection.addEventListener('click',clickHandler);

function clickHandler(event){
  if (event.target.id === 'leftImage' || event.target.id === 'middleImage' || event.target.id === 'rightImage'){
    for(let i=0;i<Product.all.length ;i++){
      if (Product.all[i].name === event.target.title){
        Product.all[i].votes++;
        console.table(Product.all[i]);
      }
    }
    render();
  }
  if (event.target.id !== 'imagesSection' ){
    for(let i=0;i<Product.all.length;i++){
      if (Product.all[i].name === event.target.title){
        Product.all[i].votes++;
        Product.all[i].views++;
        console.table(Product.all[i]);
      }
    }
    render();
  }

}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();
