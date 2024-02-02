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

async function recommendCal(age, height, weight, gender) {
    // Use working API key
    var apiKey = '922f974a17mshf6800fada2de78ap1ead14jsn3d1a5fbddb77';
    var queryURL = "https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=" + age + "&height=" + height + "&weight=" + weight + "&gender=" + gender + "&apiKey=" + apiKey;

    try {
        const response = await fetch(queryURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(queryURL);
        console.log(data);
        // Process the API response data here
    } catch (error) {
        console.error('Error during fetch operation:', error);
    }
}

// Wrap the separate API request in an async function
async function performSeparateRequest() {
    const url = 'https://calories-daily-calculator.p.rapidapi.com/calories/?age=30&weight=80&height=182';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '922f974a17mshf6800fada2de78ap1ead14jsn3d1a5fbddb77',
            'X-RapidAPI-Host': 'calories-daily-calculator.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Call the separate async function
performSeparateRequest();
