'use strict';

/* global variables */
let products = [];
let threeImages = [];
let maximumVotes = 5; //  remember to change this to 25 before submission
let resultsButton = document.getElementById('results-button');  //  for captures results button click
let currentVoteCount = 0;
let ulElement = document.getElementById('results-ul');  //  for displaying results
let threeImagesEl = document.getElementById('images-view'); //  for displaying images

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
  console.log('instantiateImages called.');
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
  console.log('getThreeImages called');
  console.log(`products.length: ${products.length}`);
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
  console.log(`renderImages() called`);
  console.log(`products.length: ${products.length}`);

  console.log(threeImgs[0].imgUrl);
  let leftImageEl = document.getElementById('left-img');
  leftImageEl.src = threeImgs[0].imgUrl;
  leftImageEl.alt = threeImgs[0].name;
  threeImages[0].displayed++;

  console.log(threeImgs[1].imgUrl);
  let middleImageEl = document.getElementById('middle-img');
  middleImageEl.src = threeImgs[1].imgUrl;
  middleImageEl.alt = threeImgs[1].name;
  threeImages[1].displayed++;

  console.log(threeImgs[2].imgUrl);
  let rightImageEl = document.getElementById('right-img');
  rightImageEl.src = threeImgs[2].imgUrl;
  rightImageEl.alt = threeImgs[2].name;
  threeImages[2].displayed++;
}

/*  render report on screen */
function displayResults(ulEl) {
  console.log(`products.length: ${products.length}`);

  for (let idx = 0; idx < products.length; idx++)
  {
    let liEl = document.createElement('li');
    liEl.textContent = `${products[idx].name} has ${products[idx].votes} votes, and was seen ${products[idx].displayed} times.`;
    ulEl.appendChild(liEl);
  }
}

/*  primary executable code */
function main() {
  console.log(`products.length: ${products.length}`);
  instantiateImages();
  console.log(`products.length: ${products.length}`);
  threeImages = getThreeImages();
  renderImages(threeImages);  
}

main();

/* event listener for user click on favorite image */
threeImagesEl.addEventListener('click', function(e) { //  anonyfunc to insert param into registerVote
  console.log(`addEventListener called.`);
  registerVote(e);
}, false);

/* event handlers */

//  register vote with params
function registerVote(event) {
  console.log(`products.length: ${products.length}`);

  currentVoteCount++;
  console.log(`currentVoteCount: ${currentVoteCount}`);
  let targetOfEvent = event.target.alt;
  console.log(`registerVote targetOfEvent: ${targetOfEvent}`);
  
  for (let idx = 0; idx < products.length; idx++) {
    
    if (products[idx].name === targetOfEvent) {
      console.log(`found ${products[idx].name} with vote count ${products[idx].votes} incrementing vote count.`);
      products[idx].votes++;
      console.log(`${products[idx].name} now has ${products[idx].votes} votes.`);
      break;
    }
  }

  console.log(`currentVotCount: ${currentVoteCount}; maximumVotes: ${maximumVotes}`);
 
  //  check vote count if less than maximum then continue else allow results to be shown
  if (currentVoteCount < maximumVotes) {
    console.log(`currentVoteCount is less than maximumVotes: ${currentVoteCount} < ${maximumVotes}`);
    threeImages = getThreeImages();
    renderImages(threeImages);  
  } else {
    console.log(`removingEventListener for image selection.....`);
    threeImagesEl.removeEventListener('click', function () { },true);

    //  adding event listener for Show Results button
    resultsButton.addEventListener('click', function (e) {
      console.log(`entered ulElement.addEventListener anonymous method`);
      displayResults(ulElement);
    }, false);
  }

}