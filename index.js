// Returns checksum of purported card number
const luhnSum = (card, hasCheckDigit = true) => {
  // Turn card into an string without dashes or spaces
  card = card
    .toString()
    .split("")
    .filter(x => x !== "-" && x !== " ")
    .join("");

  let len = card.length;
  let sum = 0;

  // (Parity is the quality of being even)
  let parity = len % 2 === 0;

  // If doesn't have check digit, flip parity
  // so that the correct digits are doubled
  // and decrement len so the first digit
  // isn't skipped
  if (!hasCheckDigit) {
    parity = !parity;
  }

  // loop over card digits from left to right
  for (let i = len - 1; i >= 0; i--) {
    // select current digit
    let d = parseInt(card[i]);
    // select every other digit starting with the one just left of the check digit
    if (i % 2 != parity) {
      d *= 2;
    }

    // if d becomes a double digit number, subtract nine
    // same result as add two digits together
    // (16 => 1 + 6 => 7 === 16 - 9)
    if (d > 9) {
      d -= 9;
    }

    // increment sum by resultant digit
    sum += d;
  }

  return sum;
};

// Calculates check digit of an incomplete card, returns complete card
function addCheckDigit(partialCard) {
  // Get sum from luhnSum, pass in false for hasCheckDigit
  const sum = luhnSum(partialCard, false);

  // Multiply sum by nine, convert to string
  const tempSum = (sum * 9).toString();

  // checkDigit is the last digit of the multiplied sum
  const checkDigit = tempSum[tempSum.length - 1];

  // Return complete card as a string
  return partialCard + checkDigit;
}

// Returns true if valid card
function luhnValid(card) {
  // Returns true if the check sum mod 10 is 0
  return luhnSum(card) % 10 === 0;
}

// Example
// Valid card, missing check digit
const testCard1 = "4916-6673-4130-338";
// Get complete card, with added check digit
console.log(`Complete card 1 is: ${addCheckDigit(testCard1)}`);
// Get sum
console.log(`Card 1 checksum is ${luhnSum(addCheckDigit(testCard1))}`);
// Check if valid
console.log(`Is card 1 valid: ${luhnValid(addCheckDigit(testCard1))}`);

// Invalid card, with check digit
const testCard2 = "8209 9302 2232 1114";
// Get checksum
console.log(`Card 2 checksum is ${luhnSum(testCard2)}`);
// Check if valid
console.log(`Is card 2 valid: ${luhnValid(testCard2)}`);

module.exports = {
  luhnSum,
  addCheckDigit,
  luhnValid
};
