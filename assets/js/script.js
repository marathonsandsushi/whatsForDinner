
let foodCravingVal;
let allergies;
let cookingTime;
let drinkIngredient;

function loadPersistedData() {

  allergies = localStorage.getItem("allergy");
  if(allergies)
    document.getElementById("allergiesInput").setAttribute("value", allergies);
}

function getCravingInput() {
  foodCravingVal = document.getElementById("cravingInput").value;
  // console.log(`inside getCravingInput:  ${foodCravingVal}`);
}

function getAllergiesInput() {
  allergies = document.getElementById("allergiesInput").value;
  // console.log(`inside getAllergiesInput:  ${allergies}`);

  // allergy user story 1 - client side storage for 1 allergy
  localStorage.setItem('allergy', allergies);
}

function getTimeInput() {
  cookingTime = document.getElementById("timeInput").value;
  // console.log(`inside getTimeInput:  ${cookingTime}`);
}

function getRecipes() {

  clearFoodSection();
  getEdamamApi();

}


function getEdamamApi() {

  console.log("getEdamamApi()");

  let edamamApiKey = "049b103b5a5a7b73695ba6fb6ad10e2d";
  let edamamIdKey = "0cf3bef7";
  // let foodType='pizza';

  // https://developer.edamam.com/admin/applications -- open "get tailored recipes" for app_id & key
  // Edamam "Recipes" Swagger Page:  https://developer.edamam.com/edamam-docs-recipe-api#/
  // See also: https://codesandbox.io/s/chd5o?file=/src/index.js

  // construct the API call to Edamam
  let requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${foodCravingVal}&app_id=${edamamIdKey}&app_key=${edamamApiKey}`;
  if (allergies) {
    requestUrl += '&excluded=egg';
  }
  requestUrl += '&ingr=5-7&mealType=Breakfast&from=0&to=10';

  console.log(`requestUrl:  ${requestUrl}`);

  fetch(requestUrl).then((response) => {
    return response.json();
  }).then((json) => {
    const container = document.getElementById("food-container");
    json.hits.forEach((data) => {
      // console.log(`${data.recipe.label}:  ${data.recipe.url}`);
      container.innerHTML += `
        <div class="cell small-4 card my-menu-item">
          <p class="card-divider">${data.recipe.label}</p>
          <img src="${data.recipe.image}" />

          <p>${data.recipe.source}</p>
          <p>Cooking time: ${data.recipe.totalTime} minutes</p>
          <p><a href="${data.recipe.url}">Link to recipe</a></p>
        </div>`;
    });
  }).catch((error) => {
    console.error("Error: ", error);
  });

}

function clearFoodSection () {

  document.getElementById("food-container").innerHTML = "";

}

function getDrinks() {

  clearDrinkSection();

  const inputText = document.getElementById("drink-ingredient-input").value;

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;

  fetch(url).then((response) => {
    return response.json();
  }).then((json) => {

    console.log(json);

    const container = document.getElementById("drink-container");

    var drinks = [];

    for (var i in json)
      drinks.push(json[i]);

    drinks.forEach((data) => {

      console.log("Here are my drinks! " + JSON.stringify(data));

      data.forEach((drink) => {

        console.log(drink);

        // console.log(`${data.recipe.label}:  ${data.recipe.url}`);
        container.innerHTML += `
          <div class="cell small-4 card my-menu-item">
            <p>${drink.strDrink}</p>
            <img src="${drink.strDrinkThumb}" />
          </div>`;
      });
    });


  }).catch((error) => {
    console.error("Error: ", error);
  });
}

function clearDrinkSection () {

  document.getElementById("drink-container").innerHTML = "";
}

// Madison Kendall's code
