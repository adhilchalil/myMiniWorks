import {elements} from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value= '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    if(document.querySelector(`.results__link[href="#${id}"]`)) {
        document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
    }
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = 
        `<li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="https://spoonacular.com/recipeImages/${recipe.image}" alt="${recipe.title}" class="img_list">
                </figure>
                <div class="results__data">
                    <h4 class="results__name" float="right">${recipe.title}</h4>
                    <p class="ready_in">Ready in: ${recipe.readyInMinutes} Minutes</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);  
};

const createButton = (page, type) => `
    <button class="btn-inline results_btn--${type}" data-goto=${type === 'prev' ? page - 1 : page +1}>
        <span>${type === 'prev' ? '< Page ' + (page - 1) : 'Page ' + (page+1) +' >'}</span>
    </button>
    `;

const renderButtons = (page, numResults, resPerPage) => {
    const pages= Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if (page < pages){
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }else if (page === pages && pages > 1){
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('beforeend', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start=(page-1)*resPerPage;
    const end=page*resPerPage;
    if(recipes.length!==0) {
        recipes.slice(start,end).forEach(renderRecipe);
        renderButtons(page, recipes.length, resPerPage);
    } else {
        elements.searchResList.insertAdjacentHTML('afterbegin',"<li><h2>Couldn't Find any Results Matching Your Query</h2></li>");
    }
};