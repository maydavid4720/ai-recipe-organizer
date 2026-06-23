function RecipeForm({ userInput, setUserInput, loading, onAddRecipe }) {
  return (
    <section className="recipe-form-panel">
      <div className="form-copy">
        <p className="section-label">Add a recipe</p>
        <h2>Paste a recipe link or text</h2>
        <p>
          The AI will extract the title, ingredients, steps, category and tags.
        </p>
      </div>

      <div className="form-controls">
        <textarea
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          placeholder="Paste a recipe URL or recipe text here..."
          rows="5"
        />

        <button className="primary-button" onClick={onAddRecipe} disabled={loading}>
          {loading ? 'Analyzing with AI...' : 'Add Recipe'}
        </button>
      </div>
    </section>
  );
}

export default RecipeForm;