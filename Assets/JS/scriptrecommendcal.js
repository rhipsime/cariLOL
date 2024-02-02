$(document).ready(function() { //Placeholder code for the recommend app. 

    $('#search-button').on('click', function() {

        var foodItem = $('#search-input').val().trim();


        if (foodItem) {

            recommendCal(age, height, weight, gender);
        } else {

            alert('Please enter your data!');
        }
    });
});

function recommendCal(age, height, weight, gender) {
    //var queryURL = "https://calorie-calculator.p.rapidapi.com/caloriecalculator.php/apiKey=" + apiKey

    var queryURL = "https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=18&height=177&weight=112&gender=male&apiKey=" + apiKey;

    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(queryURL);
            console.log(data);

        })
}