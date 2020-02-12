import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${key}`);
            this.title = res.data.title;
            this.author = res.data.creditsText;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
            this.timeTaken = res.data.cookingMinutes;
            this.servings = res.data.servings;
            this.instructions = res.data.instructions;
        } catch (error) {
            alert('something went wrong :(');
        }
    }

    parseIngredients() {
    
        const newIngredients = this.ingredients.map(el =>{
            //1) parse ingredients into count , unit and ingredient
            let objIng={
                count : `${el.amount? el.amount : 1}`,
                unit : el.unit,
                ingredient : el.name
            };
            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings (type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}