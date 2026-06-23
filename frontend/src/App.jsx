import { useEffect, useState } from 'react';
import './App.css';
import { getRecipes, getRecipesByCategory, createRecipe, deleteRecipe } from './api';
import RecipeForm from './components/RecipeForm';
import CategoryFilter from './components/CategoryFilter';
import RecipeCard from './components/RecipeCard';

const CATEGORIES = ['All', 'Dinner', 'Breakfast', 'Dessert', 'Snack'];

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadRecipes(category = selectedCategory) {
    try {
      setError('');

      const data =
        category === 'All'
          ? await getRecipes()
          : await getRecipesByCategory(category);

      setRecipes(data);
      setSelectedCategory(category);
    } catch (err) {
      setError(err.message);
    }
  }
  
  async function handleAddRecipe() {
    if (!userInput.trim()) {
      setError('Please paste a recipe link or recipe text.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const newRecipe = await createRecipe(userInput);

      setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
      setUserInput('');
      setSelectedCategory('All');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  }

  async function handleDeleteRecipe(recipeId) {
    try {
      setError('');

      await deleteRecipe(recipeId);

      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadRecipes('All');
  }, []);

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">AI Recipe Archive</p>
        <h1>Organize every recipe you save.</h1>
        <p className="hero-subtitle">
          Paste a recipe link or text and let AI turn it into a clean, searchable recipe card.
        </p>
      </header>
      <RecipeForm
        userInput={userInput}
        setUserInput={setUserInput}
        loading={loading}
        onAddRecipe={handleAddRecipe}
      />
      
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={loadRecipes}
      />

      {error && <p className="error-message">{error}</p>}

      {loading && (
        <div className="loading-message">
          <span className="loader-dot"></span>
          Analyzing recipe with AI...
        </div>
      )}

      <section className="recipes-section">
        <div className="section-heading">
          <p className="section-label">Your library</p>
          <h2>Saved Recipes</h2>
        </div>

        {recipes.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">✦</p>
            <h3>No recipes found</h3>
            <p>
              Add a recipe link or text above and let AI organize it into a clean recipe card.
            </p>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
export default App;