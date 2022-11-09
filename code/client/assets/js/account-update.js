/**
 * Shows the "#completed-view" div after a customer updates their card.
 * TODO: finish this to display the customers card information showing within the
 * #account-information div.
 */
function showCustomerExistsError() {
  var errorMsgDiv = document.querySelector("#customer-exists-error");
  errorMsgDiv.removeAttribute("hidden");
  changeLoadingState(false);
  // TODO: Integrate Stripe
}

const updateComplete = function() {
  // TODO: Integrate Stripe
  document.querySelector(".sr-payment-form").classList.add("hidden");
  document.querySelector(".completed-view").classList.remove("hidden");
  setTimeout(function() {
      document.querySelector(".completed-view").classList.add("expand");
    }, 200);
  changeLoadingState(false);
  document.querySelector("#submit").classList.add("hidden");
}

// TODO: Integrate Stripe
