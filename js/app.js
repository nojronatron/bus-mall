'use strict';

/* global variables */
let products = [];
let maximumVotes = 5; //  remember to change this to 25 before submission

/* objects */
function MarketingImage(imgName, imgExtension = 'jpg') {
  this.name = imgName;
  this.imgUrl = 'img/${imgExtension}';
  this.clicks = 0;
  this.votes = 0;
  products.push(this);
}

/* instantiate all of the image objects */
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
new MarketingImage('sweep','png');
new MarketingImage('tauntaun');
new MarketingImage('unicorn');
new MarketingImage('water-can');
new MarketingImage('wine-glass');

