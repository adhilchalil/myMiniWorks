export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search_field'),
    searchResList: document.querySelector('.results_list'),
    searchRecipe: document.querySelector('.results__link'),
    searchResPages: document.querySelector('.results_pages'),
    searchResContainer: document.querySelector('.submain_left'),
    recipe: document.querySelector('.submain_mid'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader= `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);}
};