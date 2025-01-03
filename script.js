// Extraction of elements
let dish = document.getElementById('dish')
let dishName = document.getElementById('dishname')
let ingredientList = document.getElementById('ingredients')
let instructions = document.getElementById('recipe')
let exploreButton = document.getElementById('explore')
let searchbar = document.getElementById('searchBox')
let searchButton = document.getElementById('searchIcon')
let gridPage = document.querySelector('.grid')
let noResult = document.querySelector(".error")
let box = document.querySelector('.white');
let showDetails = document.getElementById('details');
let pop = document.getElementById('modal');
let button = document.getElementById('recipe');
var home = document.getElementById("home");
var chefs = document.getElementById("chefs");
var Github = document.getElementById("githubLink");
var recipes = document.getElementById("recipes");


// onclick functions
home.addEventListener('click', function () {
    window.location.href = "./index.html"
})

chefs.addEventListener('click', function () {
    window.location.href = "https://trulyexperiences.com/blog/most-decorated-michelin-star-chefs/"
})

recipes.addEventListener('click',function(){
    window.location.href = "https://www.allrecipes.com/"
})

let turn = 0;

showDetails.onclick = () => {
    box.style.marginLeft = '10vw';
    if (turn === 0) {
        pop.style.display = 'flex';
        turn = 1;
    } else {
        pop.style.display = 'none';
        box.style.marginLeft = 'auto';
        turn = 0;
    }
}

Github.addEventListener('click', function () {
    window.location.href = "https://github.com/iisshh17"
})


// scroll function
function scrollByAmount(amount) {
    window.scrollBy(0, amount);
}


// To fetch API and get Random Dish

function randomDish() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            ingredientList.innerHTML = "<b>Ingredients</b>"
            instructions.innerHTML = "<b>Recipe</b> <br>"
            dish.setAttribute('src', data.meals[0]['strMealThumb'])
            document.querySelector('h2').innerHTML = "Today's Special"
            dishName.innerText = data.meals[0]['strMeal']

            for (let i = 1; i <= 20; i++) {
                if (data.meals[0][`strIngredient${i}`] == "" || data.meals[0][`strIngredient${i}`] == null) {
                    break;
                }
                else {
                    ingredientList.innerHTML += `
            <li>
            ${data.meals[0][`strIngredient${i}`]}
            </li>`
                }
            }

            instructions.innerHTML += data.meals[0]['strInstructions']
        })
}

randomDish()

exploreButton.onclick = () => {
    randomDish()
}



// To fetch API and get Grid as per user's searched dish

function search(searchterm) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchterm}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            gridPage.innerHTML = ""
            if (data.meals) {
                data.meals.forEach((dish) => {
                    gridPage.innerHTML +=
                        `
            <div class="menu" onclick=popid(${dish.idMeal})>
                <img src=${dish.strMealThumb} class="item">
                <p class="img-name">${dish.strMeal}</p>
            </div>
            `
                })
                gridPage.style.display = 'grid'
            }
            else {
                noResult.style.display = "block";
                // console.log("error");
                noResult.innerHTML = 'No Result Found!!!';

            }
        })
}


// Fetch API to show ingredients and recipes as per user's searched dish

function popid(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            dish.setAttribute('src', data.meals[0]['strMealThumb'])
            dishName.innerText = data.meals[0]['strMeal']
            window.location.href = `#dish`
            instructions.innerHTML = "Recipe"
            document.querySelector('h2').innerHTML = "Your Desired Dish"
            ingredientList.innerHTML = "Ingredients"
            for (let i = 1; i <= 20; i++) {
                if (data.meals[0][`strIngredient${i}`] == "" || data.meals[0][`strIngredient${i}`] == null) {
                    break;
                }
                else {
                    ingredientList.innerHTML += `
            <li>
            ${data.meals[0][`strIngredient${i}`]}
            </li>`
                }
            }

            instructions.innerHTML = data.meals[0]['strInstructions']
            scrollByAmount(-200)
        })
}


searchButton.onclick = () => {
    let searchterm = searchbar.value
    // console.log(searchterm)
    search(searchterm)

}
