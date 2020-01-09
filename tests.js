// Import testing tools
const chai = require("chai");
const expect = chai.expect;

// Import object with luhn functions
const luhn = require("./index");

// Destructure functions from import object for easy access
const { luhnSum, addCheckDigit, luhnValid } = luhn;

// Valid CC's
// 4916 6673 4130 3387
// 4024 0071 1656 2348

// Invalid CC's
// 4432 2334 5562 9932
// 8209 9302 2232 1114

// Tests for luhnSum
describe("Summing non check digits", () => {
  it("handles first valid credit card correctly", () => {
    expect(luhnSum("4916-6673-4130-3387")).to.equal(80);
  });
  it("handles second valid credit card correctly", () => {
    expect(luhnSum(4024007116562348)).to.equal(60);
  });
  it("handles first invalid credit card correctly", () => {
    expect(luhnSum("4916 6673 4130 3384")).to.equal(77);
  });
});

// Tests for addCheckDigit
describe("Adding check digit", () => {
  it("handles first incomplete credit card correctly", () => {
    expect(addCheckDigit("4916-6673-4130-338")).to.equal("4916-6673-4130-3387");
  });
  it("handles second incomplete credit card correctly", () => {
    expect(addCheckDigit(402400711656234)).to.equal("4024007116562348");
  });
});

// Tests for luhnValid
describe("Validity", () => {
  it("handles first valid credit card correctly", () => {
    expect(luhnValid("4916-6673-4130-3387")).to.equal(true);
  });
  it("handles second valid credit card correctly", () => {
    expect(luhnValid(4024007116562348)).to.equal(true);
  });
  it("handles first valid credit card without check digit correctly", () => {
    expect(luhnValid("4916-6673-4130-3387")).to.equal(true);
  });
  it("handles first invalid credit card correctly", () => {
    expect(luhnValid("4432 2334 5562 9932")).to.equal(false);
  });
  it("handles second invalid credit card without check digit correctly", () => {
    expect(luhnValid("8209 9302 2232 1115")).to.equal(false);
  });
});
