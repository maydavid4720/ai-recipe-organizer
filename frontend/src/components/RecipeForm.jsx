function RecipeForm({ userInput, setUserInput, loading, onAddRecipe }) {
  return (
    <section className="recipe-form-panel">
      <textarea
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        placeholder="Paste a recipe URL or recipe text here..."
        rows="4"
      />

      <button className="primary-button" onClick={onAddRecipe} disabled={loading}>
        {loading ? "Analyzing..." : "Add Recipe"}
      </button>
    </section>
  );
}

export default RecipeForm;