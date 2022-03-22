'use strict';

/* global variables */
let products = [];
let threeImages = [];
let maximumVotes = 5; //  remember to change this to 25 before submission
let resultsButton = document.getElementById('results-button');  //  for captures results button click
let currentVoteCount = 0;
let ulElement = document.getElementById('results-ul');  //  for displaying results
let threeImagesEl = document.getElementById('images-view'); //  for displaying images
let leftImageEl = document.getElementById('left-img');
let middleImageEl = document.getElementById('middle-img');
let rightImageEl = document.getElementById('right-img');

/* objects representing image files */
function MarketingImage(imgName, imgExtension = 'jpg') {
  this.name = imgName;
  this.imgUrl = `img/${imgName}.${imgExtension}`;
  this.displayed = 0;
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

//  HELPER FUNCTION selects three distinct images
function getThreeImages() {
  let leftProduct = getRandomProduct();
  let middleProduct = getRandomProduct();
  let rightProduct = getRandomProduct();

  while (leftProduct.name === middleProduct.name) {
    middleProduct = getRandomProduct();
  }
  while (leftProduct.name === rightProduct.name || middleProduct.name === rightProduct.name)
  {
    rightProduct = getRandomProduct();
  }
  
  return [leftProduct, middleProduct, rightProduct];
}

//  render images on the screen
function renderImages(threeImgs) {
  //  set left image src and alt (name)
  leftImageEl.src = threeImgs[0].imgUrl;
  leftImageEl.alt = threeImgs[0].name;
  threeImages[0].displayed++;

  //  set middle image src and alt (name)
  middleImageEl.src = threeImgs[1].imgUrl;
  middleImageEl.alt = threeImgs[1].name;
  threeImages[1].displayed++;

  //  set right image src and alt (name)
  rightImageEl.src = threeImgs[2].imgUrl;
  rightImageEl.alt = threeImgs[2].name;
  threeImages[2].displayed++;
}

/*  render report on screen */
function displayResults(ulEl) {
  for (let idx = 0; idx < products.length; idx++)
  {
    let liEl = document.createElement('li');
    liEl.textContent = `${products[idx].name} has ${products[idx].votes} votes, and was seen ${products[idx].displayed} times.`;
    ulEl.appendChild(liEl);
  }
}

/*  primary executable code */
function main() {
  instantiateImages();
  threeImages = getThreeImages();
  renderImages(threeImages);  
}

main();

/* event listener for user click on favorite image */
threeImagesEl.addEventListener('click', function(e) { //  anonyfunc to insert param into registerVote
  registerVote(e);
}, false);

/* event handlers */

//  register vote function
function registerVote(event) {
  currentVoteCount++;
  let targetOfEvent = event.target.alt;
  
  for (let idx = 0; idx < products.length; idx++) {
    
    if (products[idx].name === targetOfEvent) {
      products[idx].votes++;
      break;
    }
  }
 
  //  check vote count if less than maximum then continue else allow results to be shown
  if (currentVoteCount < maximumVotes) {
    threeImages = getThreeImages();
    renderImages(threeImages);  
  } else {
    //  remove images event listener
    threeImagesEl.removeEventListener('click', function () { }, true);

    //  remove images from the page
    threeImagesEl.remove();

    //  add an event listener to activate Show Results button
    resultsButton.addEventListener('click', function (e) {
      displayResults(ulElement);
    }, false);
  }

}