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
    var apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
    var url = 'https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=' + age + '&height=' + height + '&weight=' + weight;
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'calorie-calculator.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

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
            'X-RapidAPI-Key': 'YOUR_API_KEY', // Replace 'YOUR_API_KEY' with your actual API key
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

