$(document).ready(function() {
  $('#search-button').on('click', function() {
      var height = $('#height').val();
      var weight = $('#weight').val();

      if (height && weight) {
          recommendBMI(weight, height);
      } else {
          alert('Please fill in both height and weight fields.');
      }
  });
});

async function recommendBMI(weight, height) {
  var apiKey = '760816e53fmsh77a4795b4cad944p131f2djsn992310e8cb24';
  var url = 'https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=' + weight + '&height=' + height;
  var options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Save the BMI data to local storage
      saveBMIDataToLocalStorage(data);

      // Display the fetched data
      displayBMIRecommendation(data);
  } catch (error) {
      console.error('Error during fetch operation:', error);
  }
}

// Function to save BMI data to localStorage
function saveBMIDataToLocalStorage(data) {
  if (typeof(Storage) !== 'undefined') {
      const jsonData = JSON.stringify(data);
      localStorage.setItem('bmiData', jsonData);
      console.log('BMI data saved to localStorage:', jsonData);
  } else {
      console.error('localStorage is not supported by the browser.');
  }
}

function displayBMIRecommendation(data) {
  const resultSection = document.getElementById('result-output');
  resultSection.innerHTML = '';

  const bmiTitle = document.createElement('h2');
  bmiTitle.textContent = 'BMI Recommendation:';

  const bmiValue = document.createElement('p');
  bmiValue.textContent = 'BMI: ' + data.bmi.toFixed(1);

  const heightValue = document.createElement('p');
  heightValue.textContent = 'Height: ' + data.height + ' m';

  const weightValue = document.createElement('p');
  weightValue.textContent = 'Weight: ' + data.weight + ' kg';

  const weightCategory = document.createElement('p');
  weightCategory.textContent = 'Weight Category: ' + determineWeightCategory(data.bmi);

  resultSection.appendChild(bmiTitle);
  resultSection.appendChild(bmiValue);
  resultSection.appendChild(heightValue);
  resultSection.appendChild(weightValue);
  resultSection.appendChild(weightCategory);
}

function determineWeightCategory(bmi) {
  if (bmi < 18.5) {
      return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
  } else {
      return 'Obese';
  }
}
