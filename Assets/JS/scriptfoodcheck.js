$(document).ready(function () {
  $("#search-section").on("submit", function (event) {
    event.preventDefault();

    var foodItem = $("#search-input-food").val().trim();

    var amount = $("#search-input-amount").val().trim();

    var unitWeight = $("#search-input-units").val().trim();

    if (foodItem) {
      fetchCalorieData(foodItem, amount, unitWeight);
    } else {
      showModal(
        "Please enter at least one food item. If no weight is provided, it will give the result per 100 grams!"
      );
    }
  });
});

function showModal(message) {
  $("#infoModal .modal-body").text(message);
  $("#infoModal").modal("show");
}

function fetchCalorieData(foodItem, amount, unitWeight) {
  var queryURL1 =
    "https://api.edamam.com/api/nutrition-data?app_id=adbad49e&app_key=%" +
    apiKeyNutri +
    "&nutrition-type=cooking&ingr=" +
    amount +
    "%20" +
    unitWeight +
    "%20" +
    foodItem;

  var queryURL2 =
    "https://api.edamam.com/api/nutrition-data?app_id=adbad49e&app_key=%" +
    apiKeyNutri +
    "&nutrition-type=cooking&ingr=100%20g%20" +
    foodItem;

  var queryURL3 =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    foodItem +
    "&app_id=f783db65&app_key=" +
    apiKeyRecipe +
    "&random=true";

  if (foodItem && amount && unitWeight) {
    fetch(queryURL1)
      .then(function (response) {
        return response.json();
      })
      .then(function (dataNutri) {
        console.log(queryURL1);
        console.log(dataNutri);

        nutritionalInfo(dataNutri);
      });
  } else {
    fetch(queryURL2)
      .then(function (response) {
        return response.json();
      })
      .then(function (dataNutri) {
        console.log(queryURL2);
        console.log(dataNutri);

        nutritionalInfo(dataNutri);
      });
  }

  fetch(queryURL3)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataRecipe) {
      console.log(queryURL3);
      console.log(dataRecipe);

      console.log(dataRecipe.hits[1].recipe.label);

      recipe(dataRecipe);
    });

  var results = $("#results-section").addClass(
    "d-block row align-items-center"
  );

  function nutritionalInfo(dataNutri) {
    results.empty();

    var nutritionSection = $("<div>")
      .addClass(
        "d-block align-items-center justify-content-center container-fluid nutrition-div"
      )
      .empty();

    var units = unitWeight || "g";

    var titleNutri = $("<h2>")
      .addClass("card-title nutri text-black")
      .text(
        "Nutritional data for " +
          dataNutri.totalWeight +
          units +
          " of " +
          foodItem
      );

    var calories = $("<p>")
      .addClass("card-body nutriDes text-black")
      .text("Calories: " + dataNutri.calories + " kcal");

    var protein = $("<p>")
      .addClass("card-body nutriDes text-black")
      .text("Protein: " + dataNutri.totalNutrients.FAT.quantity + " g");

    var fat = $("<p>")
      .addClass("card-body nutriDes text-black")
      .text("Fat: " + dataNutri.totalNutrients.FAT.quantity + " g");

    var carbs = $("<p>")
      .addClass("card-body nutriDes text-black")
      .text(
        "Carbohydrates : " + dataNutri.totalNutrients.CHOCDF.quantity + " g"
      );

    nutritionSection.append(titleNutri.append(calories, protein, fat, carbs));

    results.append(nutritionSection);
  }

  function recipe(dataRecipe) {
    var recipeSection = $("<div>")
      .addClass(
        "card col-md-9 d-flex flex-row align-items-center justify-content-center container-fluid recContainer"
      )
      .empty();

    recipeSection.css("height", "auto");

    var recipe1 = $("<div>")
      .addClass("col-md-4 bg-info p-1 recipe-div")
      .css(
        "background-image",
        "url('" + dataRecipe.hits[0].recipe.image + "')"
      );

    var titleRecipe1 = $("<a>", {
      href: dataRecipe.hits[0].recipe.url,
      target: "_blank",
      html:
        "<h4 class='card-title linkRes btn'>" +
        dataRecipe.hits[0].recipe.label +
        "</h4>",
    });

    var recipe2 = $("<div>")
      .addClass("col-md-4 bg-info p-1 recipe-div")
      .css(
        "background-image",
        "url('" + dataRecipe.hits[10].recipe.image + "')"
      );

    var titleRecipe2 = $("<a>", {
      href: dataRecipe.hits[10].recipe.url,
      target: "_blank",
      html:
        "<h4 class='card-title linkRes btn'>" +
        dataRecipe.hits[10].recipe.label +
        "</h4>",
    });

    var recipe3 = $("<div>")
      .addClass("col-md-4 bg-info p-1 recipe-div")
      .css(
        "background-image",
        "url('" + dataRecipe.hits[19].recipe.image + "')"
      );

    var titleRecipe3 = $("<a>", {
      href: dataRecipe.hits[19].recipe.url,
      target: "_blank",
      html:
        "<h4 class='card-title linkRes btn'>" +
        dataRecipe.hits[19].recipe.label +
        "</h4>",
    });

    recipeSection.append(
      recipe1.append(titleRecipe1),
      recipe2.append(titleRecipe2),
      recipe3.append(titleRecipe3)
    );

    results.append(recipeSection);
  }
}