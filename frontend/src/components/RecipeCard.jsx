function RecipeCard({ recipe, onDelete }) {
  const isHebrew = (text = "") => /[\u0590-\u05FF]/.test(text);

  const recipeText = [
    recipe.title,
    ...(recipe.ingredients || []),
    ...(recipe.steps || []),
  ].join(" ");

  const direction = isHebrew(recipeText) ? "rtl" : "ltr";
  const prepTime =
    recipe.prep_time && recipe.prep_time !== "Not specified"
      ? recipe.prep_time
      : null;

  return (
    <article className={`recipe-card category-${recipe.category?.toLowerCase()}`} dir={direction}>
      <div className="recipe-card-top">
        <span className="recipe-category">{recipe.category}</span>
        {prepTime && <span className="prep-time">⏱ {prepTime}</span>}
      </div>

      <h3>{recipe.title}</h3>

      <div className="recipe-tags">
        {recipe.tags.map((tag, index) => (
          <span className="tag-pill" key={index}>
            {tag}
          </span>
        ))}
      </div>

      <section className="recipe-section">
        <h4>Ingredients</h4>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              <label className="ingredient-item">
                <input type="checkbox" />
                <span>{ingredient}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="recipe-section">
        <h4>Preparation</h4>
        <ol className="steps-list">
          {recipe.steps.map((step, index) => (
            <li key={index}>
              <span className="step-number">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="recipe-actions">
        {recipe.source_url && (
          <a href={recipe.source_url} target="_blank" rel="noreferrer">
            ↗ Original recipe
          </a>
        )}

        <button className="delete-button" onClick={() => onDelete(recipe.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;