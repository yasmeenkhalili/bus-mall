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

function Product(name,imgExt){
  this.name=name;
  this.views=0;
  this.votes=0;
  this.clicks=0;
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
function render(){
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
}

imageSection.addEventListener('click',clickHandler);

function clickHandler(event){
  if (event.target.id === 'leftImage' || event.target.id === 'middleImage' || event.target.id === 'rightImage'){
    for(let i=0;i<Product.all.length ;i++){
      if (Product.all[i].name === event.target.title){
        Product.all[i].votes++;
        console.table(Product.all[i]);
      }
    }Product.clicks++;
    render();
  }
  if (event.target.id !== 'imagesSection' ){
    for(let i=0;i<Product.all.length;i++){
      if (Product.all[i].name === event.target.title){
        Product.all[i].votes++;
        Product.all[i].views++;
        Product.clicks++;
        console.table(Product.all[i]);
      }
    }Product.clicks++;
    console.log(Product.clicks);
    render();
  }
  
  }



function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();


if (Product.clicks===25){
    let form=document.getElementById('results');
    form.addEventListener('View Results', function(event){
      event.preventDefault();
      let unorderedList=document.createElement('ul');
      form.appendChild(unorderedList);
      for(let i=0;i<products.length;i++){
        let resultList=document.createElement('li');
        unorderedList.appendChild(resultList);
        let final=Product.all[i].name+' has '+ Product.all[i].votes+' votes.';
        resultList.innerText=final;
      }
    });
}
