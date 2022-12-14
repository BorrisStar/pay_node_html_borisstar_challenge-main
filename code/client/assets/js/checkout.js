// The max and min number of photos a customer can purchase
let MIN_TIXX = 1;
let MAX_TIXX = 10;
let basicPhotoButton = document.getElementById("basic-photo-button");


/* Fetches information from the server to set up the page */
fetch("/setup-concert-page")
  .then(function(result) {
    return result.json();
  })
  .then(function(json) {
    window.config = json;
    updateQuantity();
  });




/** sets up the display of the image and buy button */

document
  .getElementById("quantity-input")
  .addEventListener("change", function(evt) {
    // Ensure customers only buy between 1 and 10 photos
    if (evt.target.value < MIN_TIXX) {
      evt.target.value = MIN_TIXX;
    }
    if (evt.target.value > MAX_TIXX) {
      evt.target.value = MAX_TIXX;
    }
  });

/* Method for changing the product quantity when a customer clicks the increment / decrement buttons */
var updateQuantity = function(evt) {
  if (evt && evt.type === "keypress" && evt.keyCode !== 13) {
    return;
  }

  var isAdding = evt && evt.target.id === "add";
  var inputEl = document.getElementById("quantity-input");
  var currentQuantity = parseInt(inputEl.value);

  document.getElementById("add").disabled = false;
  document.getElementById("subtract").disabled = false;

  // Calculate new quantity
  var quantity = evt
    ? isAdding
      ? currentQuantity + 1
      : currentQuantity - 1
    : currentQuantity;
  // Update number input with new value.
  inputEl.value = quantity;
  // Caluclate the total amount and format it with currency symbol. NOTE: i18 swap on button?
  var amount = config.basePrice;
  var numberFormat = new Intl.NumberFormat(i18next.language, {
    style: "currency",
    currency: config.currency,
    currencyDisplay: "symbol"
  });
  var parts = numberFormat.formatToParts(amount);
  var zeroDecimalCurrency = true;
  for (var part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  let total = (quantity * amount).toFixed(2);
  let formattedTotal = numberFormat.format(total);

  document
    .getElementById("submit")
    .setAttribute("i18n-options", `{ "total": "${formattedTotal}" }`);
  updateContent("button.submit");

  // Disable the button if the customers hits the max or min
  if (quantity === MIN_TIXX) {
    document.getElementById("subtract").disabled = true;
  }
  if (quantity === MAX_TIXX) {
    document.getElementById("add").disabled = true;
  }
};

/* Attach method */
Array.from(document.getElementsByClassName("increment-btn")).forEach(
  element => {
    element.addEventListener("click", updateQuantity);
  }
);

/* Handle any errors  */
var handleResult = function(result) {
  if (result.error) {
    var displayError = document.getElementById("error-message");
    displayError.textContent = result.error.message;
  }
};