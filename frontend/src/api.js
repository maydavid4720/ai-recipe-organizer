const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
export async function getRecipes() {
  const response = await fetch(`${API_BASE_URL}/recipes`);

  if (!response.ok) {
    throw new Error("Failed to load recipes");
  }

  return response.json();
}

export async function getRecipesByCategory(category) {
  const response = await fetch(`${API_BASE_URL}/recipes/category/${category}`);

  if (!response.ok) {
    throw new Error("Failed to load recipes by category");
  }

  return response.json();
}

function getErrorMessage(data) {
  const detail = data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)  && detail.length > 0) {
    const { type, msg } = detail[0];

    switch (type) {
      case "string_too_short":
        return "Please enter at least 10 characters.";

      default:
        return msg || "Failed to create recipe";
    }
  }

  return "Something went wrong while creating the recipe. Please try again.";
}

export async function createRecipe(userInput) {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_input: userInput,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

export async function deleteRecipe(recipeId) {
  const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }

  return response.json();
}
