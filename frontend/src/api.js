const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
export async function getRecipes() {
  const response = await fetch(`${API_BASE_URL}/recipes`);

  if (!response.ok) {
    throw new Error('Failed to load recipes');
  }

  return response.json();
}

export async function getRecipesByCategory(category) {
  const response = await fetch(`${API_BASE_URL}/recipes/category/${category}`);

  if (!response.ok) {
    throw new Error('Failed to load recipes by category');
  }

  return response.json();
}

export async function createRecipe(userInput) {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_input: userInput
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to create recipe');
  }

  return data;
}

export async function deleteRecipe(recipeId) {
  const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete recipe');
  }

  return response.json();
}