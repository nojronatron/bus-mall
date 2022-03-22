'use strict';

/* global variables */
let products = [];
let threeImages = [];
let maximumVotes = 5; //  remember to change this to 25 before submission

/* objects */
function MarketingImage(imgName, imgExtension = 'jpg') {
  this.name = imgName;
  this.imgUrl = `img/${imgName}.${imgExtension}`;
  this.clicks = 0;
  this.votes = 0;
  products.push(this);
}

/* instantiate all of the image objects */
function instantiateImages() {
  new MarketingImage('bag');
  new MarketingImage('banana');
  new MarketingImage('bathroom');
  new MarketingImage('boots');
  new MarketingImage('breakfast');
  new MarketingImage('bubblegum');
  new MarketingImage('chair');
  new MarketingImage('cthulhu');
  new MarketingImage('dog-duck');
  new MarketingImage('dragon');
  
  new MarketingImage('pen');
  new MarketingImage('pet-sweep');
  new MarketingImage('scissors');
  new MarketingImage('shark');
  new MarketingImage('sweep', 'png');
  
  new MarketingImage('tauntaun');
  new MarketingImage('unicorn');
  new MarketingImage('water-can');
  new MarketingImage('wine-glass');
};

/* functions */

//  HELPER FUNCTION returns an image path from the array
function getRandomProduct() {
  let randNum = Math.floor(Math.random() * (products.length));
  return products[randNum];
}

//  HELPER FUNCTION selects three distict images
function getThreeImages() {
  //  select random products and return 3 in an array
  let leftProduct = getRandomProduct();
  let middleProduct = getRandomProduct();
  let rightProduct = getRandomProduct();

  while (leftProduct.name === middleProduct.name) {
    alert(`left===middle: ${leftProduct.name} === ${middleProduct.name}`);
    middleProduct = getRandomProduct();
  }
  while (leftProduct.name === rightProduct.name || middleProduct.name === rightProduct.name)
  {
    alert(`left===right: ${leftProduct.name} === ${rightProduct.name} or middle===right: ${middleProduct.name} === ${rightProduct.name}`);
    rightProduct = getRandomProduct();
  }
  
  return [leftProduct, middleProduct, rightProduct];
}

//  render images on the screen
function renderImages(threeImgs) {
  console.log(threeImgs[0].imgUrl);
  let leftImageEl = document.getElementById('left-img');
  leftImageEl.src = threeImgs[0].imgUrl;
  leftImageEl.alt = threeImgs[0].name;

  console.log(threeImgs[1].imgUrl);
  let middleImageEl = document.getElementById('middle-img');
  middleImageEl.src = threeImgs[1].imgUrl;
  middleImageEl.alt = threeImgs[1].name;

  console.log(threeImgs[2].imgUrl);
  let rightImageEl = document.getElementById('right-img');
  rightImageEl.src = threeImgs[2].imgUrl;
  rightImageEl.alt = threeImgs[2].name;
}

/* event handlers */


/* event listeners */

/* trigger script execution */
instantiateImages();
threeImages = getThreeImages();
renderImages(threeImages);

/*
console.log(getThreeImages());
console.dir(threeImgsArr);
*/
