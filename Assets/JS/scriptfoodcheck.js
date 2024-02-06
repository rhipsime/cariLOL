$(document).ready(function() {

    $("#search-section").on("submit", function(event) {
        event.preventDefault();

        var foodItem = $("#search-input-food").val().trim();

        var amount = $("#search-input-amount").val().trim();

        var unitWeight = $("#search-input-units").val().trim();

        if (foodItem) {

            fetchCalorieData(foodItem, amount, unitWeight);

        } else {

            showModal("Please enter a food item. If no weight is provided, it will give the result per 100 grams!");
        }
    });
});

function showModal(message) {
    $("#infoModal .modal-body").text(message);
    $("#infoModal").modal("show");
}

function fetchCalorieData(foodItem, amount, unitWeight) {

    var queryURL1 = "https://api.edamam.com/api/nutrition-data?app_id=adbad49e&app_key=%" + apiKey1 + "&nutrition-type=cooking&ingr=" + amount + "%20" + unitWeight + "%20" + foodItem;

    var queryURL2 = "https://api.edamam.com/api/nutrition-data?app_id=adbad49e&app_key=%" + apiKey1 + "&nutrition-type=cooking&ingr=100%20g%20" + foodItem;

    if (foodItem && amount && unitWeight) {

        fetch(queryURL1)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(queryURL1);
                console.log(data);

                nutritionalInfo(data);

            })

    } else {

        fetch(queryURL2)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(queryURL2);
                console.log(data);

                nutritionalInfo(data);

            })
    }

    function nutritionalInfo(data) {

        var results = $("<div>").addClass("row align-items-center d-flex justify-content-center");

        var nutritionSection = $("#nutritional-value").addClass("card col-md-2 bg-info p-1 border").empty();

        var units = unitWeight || "g";

        var title = $("<h2>").addClass("card-title text-black").text("Nutritional data for " + data.totalWeight + units + " of " + foodItem);

        var calories = $("<p>").addClass("card-body text-white").text("Calories: " + data.calories + " kcal");

        var protein = $("<p>").addClass("card-body text-white").text("Protein: " + data.totalNutrients.PROCNT.quantity + " g");

        var fat = $("<p>").addClass("card-body text-white").text("Fat: " + data.totalNutrients.FAT.quantity + " g");

        var carbs = $("<p>").addClass("card-body text-white").text("Carbohydreates : " + data.totalNutrients.CHOCDF.quantity + " g");

        nutritionSection.append(title.append(calories, protein, fat, carbs));



        results.appendChild(nutritionSection);

    }

}