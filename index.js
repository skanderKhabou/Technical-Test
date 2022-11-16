// Problem
// Let's consider a second-price, sealed-bid auction:
// • An object is for sale with a reserve price.
// • We have several potential buyers, each one being able to place one or more bids.
// • The buyer winning the auction is the one with the highest bid above or equal to the
// reserve price.
// • There is always, as a maximum, one winning buyer, and only one.
// • The winning price is the highest bid price from a non-winning buyer above the reserve
// price (or the reserve price if none applies).
// Example
// Consider 5 potential buyers (A, B, C, D, E) who compete to acquire an object with a reserve price
// set at 100 euros, bidding as follows:
// A: 2 bids of 110 and 130 euros
// B: 0 bid
// C: 1 bid of 125 euros
// D: 3 bids of 105, 115 and 90 euros
// E: 3 bids of 132, 135 and 140 euros
// The buyer E wins the auction at the price of 130 euros.
// Goal
// The goal is to implement an algorithm for finding the winner AND the winning price. Please
// implement the solution in the language of your choice. Please send your code in .zip file to :

itemForSell = {
  reservePrice: 100,
  itemTitle: "medal from 1900",
};

buyers = [
  {
    id: "A",
    bids: [100, 130],
    maxBids: 0,
    nameOfBuyer: "Joe",
  },
  {
    id: "B",
    bids: [],
    maxBids: 0,
    nameOfBuyer: "Alexa",
  },
  {
    id: "C",
    bids: [125],
    maxBids: 0,
    nameOfBuyer: "Julia",
  },
  {
    id: "D",
    bids: [105, 115, 90],
    maxBids: 0,
    nameOfBuyer: "Max",
  },
  {
    id: "E",
    bids: [132, 135, 140],
    maxBids: 0,
    nameOfBuyer: "Max",
  },
];

// The idea here is i have to find distinct the buyers and keep the buyer with the maxBids , after i will compare his result with the reserve price if the condition is correct then he wins the price

//helper functions
// function to define and update the maxBids of a player
const findMax = () => {
  for (i = 0; i < buyers.length; i++) {
    if (buyers[i].bids.length === 0) {
      continue;
    }
    buyers[i].maxBids = Math.max(...buyers[i].bids);
  }
  return buyers;
};

// this function will return the potentialWinner of the group of buyers
// The idea is to identify the max bid of each buyer with the helper function findMax and after compare them to get the potential winner, here we can use different method we can filter the array and get the maxBid Value , but for less complexity
// i decided to sort the array so i can get the first and second buyer to identify the max bid and the winningPrice
const pontentialWinner = () => {
  findMax();
  buyers.sort(function (a, b) {
    return b.maxBids - a.maxBids;
  });
  return buyers;
};

const findWinningPrice = (maxBids) => {
  const { reservePrice } = itemForSell;
  let winningPrice = 0;
  maxBids > reservePrice
    ? (winningPrice = maxBids)
    : (winningPrice = reservePrice);
  return winningPrice;
};

const isWinner = () => {
  const finalBuyer = pontentialWinner()[0];
  const nonWinningBuyer = pontentialWinner()[1];
  // destructure of the non winning buyer to get the winning price
  const { maxBids } = nonWinningBuyer;
  const winningPrice = findWinningPrice(maxBids);

  if (finalBuyer.maxBids >= itemForSell.reservePrice) {
    console.log(
      `Buyer : ${finalBuyer.nameOfBuyer} with the id "${finalBuyer.id}" Wins the action at the winning price of ${winningPrice} the item : ${itemForSell.itemTitle} sold at ${finalBuyer.maxBids}`
    );
  } else {
    console.log(
      `you are at ${
        finalBuyer.maxBids - itemForSell.reservePrice
      } from the reserve price of ${itemForSell.itemTitle}`
    );
  }
};
