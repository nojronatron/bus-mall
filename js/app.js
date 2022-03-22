'use strict';

/* global variables */
let products = [];
let threeImages = [];
let maximumVotes = 5; //  remember to change this to 25 before submission
let resultsButton = document.getElementById('results-button');
let currentVoteCount = 0;
let ulElement = document.getElementById('results-ul');  //  for capturing user pressing results button
let resultsEl = document.getElementById('images-view'); //  for displaying images

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
  
  for (let idx = 0; idx < products.length; idx++)
  {
    let liEl = document.createElement('li');
    liEl.textContent = `${products[idx].name} has ${products[idx].votes}, and was seen ${products[idx].displayed} times.`;
    ulEl.appendChild(liEl);
  }
}

/*  primary executable code */
instantiateImages();
threeImages = getThreeImages();
renderImages(threeImages);

/* event handlers */

//  register vote with params
function registerVote(event) {
  currentVoteCount++;
  let targetOfEvent = event.target.alt;
  console.log(`registerVote targetOfEvent: ${targetOfEvent}`);

  for (let idx = 0; idx < products.length; idx++) {
    console.log(`registerVote fired: Event is ${targetOfEvent}`);

    if (products[idx].name === targetOfEvent) {
      console.log(`found ${products[idx].name} with vote count ${products[idx].votes} incrementing vote count.`);
      products[idx].votes++;
      console.log(`${products[idx].name} now has ${products[idx].votes} votes.`);
      break;
    }
  }

  console.log(`currentVotCount: ${currentVoteCount}; maximumVotes: ${maximumVotes}`);
  //  check to see if we continue or voting is over
  if (currentVoteCount < maximumVotes) {
    threeImages = getThreeImages();
    renderImages(threeImages);
  } else {
    resultsEl.removeEventListener('click', function () { },true);

    //  adding event listener for Show Results button
    resultsButton.addEventListener('click', function (e) {
      console.log(`entered ulElement.addEventListener anonymous method`);
      displayResults(ulElement);
    }, false);
  }

}


/* event listeners */
resultsEl.addEventListener('click', function(e) { //  anonyfunc to insert param into registerVote
  console.log(`addEventListener called.`);
  registerVote(e);
}, false);
