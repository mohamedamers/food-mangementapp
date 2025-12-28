export const baseURL ="https://upskilling-egypt.com:3006/api/v1";
export const imagesURL ="https://upskilling-egypt.com:3006";

//  USERS URLs

export const USERS_URLS ={
    LOGIN : `/Users/Login`,
    REGISTER : `/Users/Register`,
    RESET_REQUEST : `/Users/Reset/Request`,
    RESET : `/Users/Reset`,
    CHANGE_PASSWORD : `/Users/ChangePassword`,
    GET_CURRENT_USER : `/Users/GetCurrentUser`,
}

//  CATEGORY

export const CATEGORY_URLS ={
    GET_CATEGORIES : `/Categories`,
    DELETE_CATEGORY : (id) =>`/Categories/${id}`,
    UPDATE_CATEGORY : (id) =>`/Categories/${id}`,

    POST_CATEGORY : `/Category/`,
}

// TAGS 

export const TAGS_URLS ={
    GET_TAGS : `/tag/`,
};


// RECIPES

export const RECIPE_URLS ={
    GET_RECIPES :`/Recipe/`,
    GET_RECIPE : (recipeId)=> `/Recipe/${recipeId}`,
    CREATE_RECIPE : `/Recipe/`,
    UPDATE_RECIPE : (recipeId) => `/Recipe/${recipeId}`,
    DELETE_RECIPE : (id) => `/Recipe/${id}`,
}

// USER RECIPES

export const USER_RECIPE_URLS ={
    GET_FAVS :`/userRecipe/`,
    DELETE_FAV : (id)=> `/userRecipe/${id}`,
    CREATE_FAV : `/userRecipe/`,
}
