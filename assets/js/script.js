let foodCravingVal;
let allergies;


function getCravingInput(){
  foodCravingVal = document.getElementById("cravingInput").value;
  // console.log(`inside getCravingInput:  ${foodCravingVal}`);
}

function getAllergiesInput(){
  allergies = document.getElementById("allergiesInput").value;
  // console.log(`inside getAllergiesInput:  ${allergies}`);
}


function getEdamamApi (){

  let edamamApiKey = "049b103b5a5a7b73695ba6fb6ad10e2d";
  let edamamIdKey = "0cf3bef7";
  // let foodType='pizza';

  // https://developer.edamam.com/admin/applications -- open "get tailored recipes" for app_id & key
  // Edamam "Recipes" Swagger Page:  https://developer.edamam.com/edamam-docs-recipe-api#/
  // See also: https://codesandbox.io/s/chd5o?file=/src/index.js

    const requestUrl= `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${foodCravingVal}&app_id=${edamamIdKey}&app_key=${edamamApiKey}&ingr=5-7&mealType=Breakfast&from=0&to=10`;
    console.log(`requestUrl:  ${requestUrl}`);

    fetch(requestUrl ).then((response) => {
      return response.json();
    }).then((json) => {
      const container = document.getElementById("container");
      json.hits.forEach((data) => {
        // console.log(`${data.recipe.label}:  ${data.recipe.url}`);
        container.innerHTML += `
          <p>${data.recipe.label}</p>
          <p>${data.recipe.source}</p>
          <p><a href="${data.recipe.url}">Link to recipe</a></p>
          <img src="${data.recipe.image}" />
          <p>Cooking time: ${data.recipe.totalTime} minutes</p>`;
      });
    }).catch((error) => {
      console.error("Error: ", error);
    });

  }



getEdamamApi();
