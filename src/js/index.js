import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements , renderLoader, clearLoader} from './views/base';
import Likes from './models/Likes';
import * as likesView from './views/likesView';

/**global State of the app 
 * -Search object
 * -current recipe object
 * -Favorite recipe objects
*/
const state = {};

const controlsearch = async () => {
    //1) Get query from view
    const query = searchView.getInput();

    if(query) {
        //2) Now search object and add to state
        state.search = new Search(query);
        renderLoader(elements.searchResContainer);

        //3) Prepare UI for Results
        searchView.clearInput();
        searchView.clearResults();

        try {

            //4) Search for Recipes
            await state.search.getResults();
            clearLoader();

            //5) Render results on UI
            searchView.renderResults(state.search.recipes);
        } catch (err) {
            alert('Something went wrong with the Search')
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlsearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);    
    }
})

//Recipe controller

const controlRecipe = async () => {
    //get Id from url
    const id = window.location.hash.replace('#', '');

    if(id) {
        //Prepeare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected Search item
        if (state.search) searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {
            //Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe ,
                state.likes.isLiked(id)
            );
        } catch (err) {
            alert('Something went wrong :( here');
        }
    }
};

//window.addEventListener('hashchange',controlRecipe)
//window.addEventListener('load', controlRecipe);
//the above two has been consolidated into a single line

['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe));

const controlList = () => {
    // Create a new List if there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);

        //Delete from UI
        listView.deleteItem(id);

    // Handle count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/**
 * LIKE CONTROLLER
 */

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    // User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle the  like button
        likesView.toggleLikeBtn(true);
        // Add like to UI list
        likesView.renderLike(newLike);
    // User has liked current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeBtn(false);
        //  Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

window.addEventListener('load' , () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});
// Handling recipe + , - , <3 button clicks

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        //Decrese button is clicked
        if (state.recipe.servings > 1)
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //Increse button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // Add ingredients to shopping List
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //Like controller
        controlLike();
    }
});
