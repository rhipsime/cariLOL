$(document).ready(function() {
    $('#search-button').on('click', function() {
        var age = $('#age').val();
        var height = $('#height').val();
        var weight = $('#weight').val();
        
        if (age && height && weight) {
            recommendCal(age, height, weight);
        } else {
            alert('Please fill in all the fields!');
        }
    });
});

async function recommendCal(age, height, weight) {
    var apiKey = '922f974a17mshf6800fada2de78ap1ead14jsn3d1a5fbddb77';
    var queryURL = "https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=" + age + "&height=" + height + "&weight=" + weight + "&apiKey=" + apiKey;

    try {
        const response = await fetch(queryURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(queryURL);
        console.log(data);

        // Display the fetched data in the result section
        displayData(data);
    } catch (error) {
        console.error('Error during fetch operation:', error);
    }

    // Perform the separate API request
    performSeparateRequest();
}

function displayData(data) {
    // Get the result section element
    const resultSection = document.getElementById('result-output');

    // Clear any previous content
    resultSection.innerHTML = '';

    // Create elements to display the data
    const resultTitle = document.createElement('h2');
    resultTitle.textContent = 'Recommended Calories:';

    const calorieValue = document.createElement('p');
    calorieValue.textContent = 'Calories: ' + data.calories;

    // Append the elements to the result section
    resultSection.appendChild(resultTitle);
    resultSection.appendChild(calorieValue);
}

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
