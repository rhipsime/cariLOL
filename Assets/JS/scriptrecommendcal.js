$(document).ready(function() {
    $('#search-button').on('click', function() {
        var age = $('#age').val();
        var height = $('#height').val();
        var weight = $('#weight').val();
        var gender = $('#gender').val();
        
        var foodItem = $('#search-input').val().trim();

        if (age && height && weight && gender && foodItem) {
            recommendCal(age, height, weight, gender);
        } else {
            alert('Please fill in all the fields!');
        }
    });
});

function recommendCal(age, height, weight, gender) {
    // Use woking API key
    var apiKey = '922f974a17mshf6800fada2de78ap1ead14jsn3d1a5fbddb77';
    var queryURL = "https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=" + age + "&height=" + height + "&weight=" + weight + "&gender=" + gender + "&apiKey=" + apiKey;

    fetch(queryURL)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            console.log(queryURL);
            console.log(data);
            // Process the API response data here
        })
        .catch(function(error) {
            console.error('Error during fetch operation:', error);
        });
}
