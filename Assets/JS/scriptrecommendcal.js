$(document).ready(function () {
  $("#search-button").on("click", function () {
    var height = $("#height").val();
    var weight = $("#weight").val();

    if (height && weight) {
      recommendBMI(weight, height); // Pass weight first, then height
    } else {
      alert("Please fill in both height and weight fields.");
    }
  });
});

async function recommendBMI(weight, height) {
  // Change the order of parameters
  var apiKey = "760816e53fmsh77a4795b4cad944p131f2djsn992310e8cb24";
  var url =
    "https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=" +
    weight +
    "&height=" +
    height; // Change the order of parameters
  var options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "body-mass-index-bmi-calculator.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Display the fetched data
    displayBMIRecommendation(data);
  } catch (error) {
    console.error("Error during fetch operation:", error);
  }
}

function displayBMIRecommendation(data) {
  // Get the result section element
  const resultSection = document.getElementById("result-output");

  // Clear any previous content
  resultSection.innerHTML = "";

  // Create elements to display the BMI recommendation data
  const bmiTitle = document.createElement("h2");
  bmiTitle.textContent = "BMI Recommendation:";

  const bmiValue = document.createElement("p");
  bmiValue.textContent = "BMI: " + data.bmi.toFixed(1); // Round to 1 decimal point

  const heightValue = document.createElement("p");
  heightValue.textContent = "Height: " + data.height + " cm";

  const weightValue = document.createElement("p");
  weightValue.textContent = "Weight: " + data.weight + " kg";

  const weightCategory = document.createElement("p");
  weightCategory.textContent =
    "Weight Category: " + determineWeightCategory(data.bmi);

  // Append the elements to the result section
  resultSection.appendChild(bmiTitle);
  resultSection.appendChild(bmiValue);
  resultSection.appendChild(heightValue);
  resultSection.appendChild(weightValue);
  resultSection.appendChild(weightCategory);
}

function determineWeightCategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}
