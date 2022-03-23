'use strict';

/* #################### global variables #################### */
let products = [];
let maximumVotes = 25; //  remember to change this to 25 before submission
let currentVoteCount = 0;
let resultsButton = document.getElementById('results-button');  //  for captures results button click
let ulElement = document.getElementById('results-ul');  //  for displaying results
let threeImagesEl = document.getElementById('images-view'); //  for displaying images
let leftImageEl = document.getElementById('left-img');
let middleImageEl = document.getElementById('middle-img');
let rightImageEl = document.getElementById('right-img');
let previousThreeImgIdx = []; //  holds last set of three image indices for uniqueness comparison

/* objects representing image files */
function MarketingImage(imgName, imgExtension = 'jpg') {
  this.name = imgName;
  this.imgUrl = `img/${imgName}.${imgExtension}`;
  this.displayed = 0;
  this.votes = 0;
  products.push(this);
}

/* instantiate all image objects */
let imageArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair',
  'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark',
  'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

function instantiateImages() {
  for (let idx = 0; idx < imageArray.length; idx++) {

    if (imageArray[idx] === 'sweep') {
      new MarketingImage(imageArray[idx], 'png');
    } else {
      new MarketingImage(imageArray[idx]);
    }
  }
};

/* #################### functions #################### */

//  Helper Function returns a random integer between 0 and products.length, inclusive but unique vs previous 3
function getRandomImageIntegers() {
  while (true) {
  //  source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  let result = Math.floor(Math.random() * products.length);

    if (!previousThreeImgIdx.includes(result)) {
      return result;
    }
  }
}

//  HELPER FUNCTION selects three distinct images per view page or on next page of three
function getThreeUniqueImages() {
  let currentThree = [];

  for (let idx = 0; idx < 3; idx++){
    currentThree[idx] = getRandomImageIntegers();

    while (currentThree[0] === currentThree[1] || currentThree[0] === currentThree[2]) {
      currentThree[idx] = getRandomImageIntegers();
    }

    while (currentThree[1] === currentThree[2]) {
      currentThree[1] = getRandomImageIntegers();
    }
  }
  
  console.log(`previousThree: ${previousThreeImgIdx}`);
  previousThreeImgIdx = currentThree;
  return currentThree;
}

//  render images on the screen
function renderImages() {
  let currentThree = getThreeUniqueImages();
  
  //  set left image src and alt (name)
  leftImageEl.src = products[currentThree[0]].imgUrl;
  leftImageEl.alt = products[currentThree[0]].name;
  products[currentThree[0]].displayed++;

  //  set middle image src and alt (name)
  middleImageEl.src = products[currentThree[1]].imgUrl;
  middleImageEl.alt = products[currentThree[1]].name;
  products[currentThree[1]].displayed++;

  //  set right image src and alt (name)
  rightImageEl.src = products[currentThree[2]].imgUrl;
  rightImageEl.alt = products[currentThree[2]].name;
  products[currentThree[2]].displayed++;
}

/* #################### primary executable code #################### */
function main() {
  instantiateImages();
  renderImages();
}

main();

/* #################### event handling methods #################### */

/* event listener for user click on favorite image */
threeImagesEl.addEventListener('click', registerVote); //  anonyfunc to insert param into registerVote

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
    renderImages();
  } else {
    //  remove images event listener
    threeImagesEl.removeEventListener('click', registerVote);
    renderResultsChart();
  }

}

//  set up arrays for chart data
function renderResultsChart() {
  let namesArr = [];
  let viewsArr = [];
  let votesArr = [];
  
  for (let idx = 0; idx < products.length; idx++){
    namesArr.push(products[idx].name);
    viewsArr.push(products[idx].displayed);
    votesArr.push(products[idx].votes);
  }
  
  //  add an event listener to activate Show Results button
  // resultsButton.addEventListener('click', displayResults);
  //  call chartJS INSTEAD of adding an event listener to resultsButton
  //  source: charjs.org/docs/latest/getting-started/
  
  const data = {
    labels: namesArr,
    datasets: [{
      label: 'Views',
      backgroundColor: 'rgb(255, 125, 0)',
      borderColor: 'rgb(255,255,255)',
      borderRadius: 8,
      data: viewsArr,
    },
    {
      label: 'Votes',
      backgroundColor: 'rgb(0, 125, 255)',
      borderColor: 'rgb(255, 255,255)',
      borderRadius: 8,
      data: votesArr,
    }]
  };
  
  const config = {
    type: 'bar',
    data: data,
    options: { }
  };
  
  const testChart = new Chart(
    document.getElementById('resultChart'),
    config
  );

}