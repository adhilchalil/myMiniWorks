
import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/search?query=${this.query}&apiKey=${key}&number=30`);
            this.recipes = res.data.results;
            //console.log(this.recipes);
        }
        catch (error){
            alert(error);
        }
    }
}



//spoonacular key: ce462fabdbe540cb9c9804359dc73918