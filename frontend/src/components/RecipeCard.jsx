function RecipeCard({ recipe, onDelete }) {
  return (
    <article className="recipe-card">
      <div className="recipe-card-header">
        <div>
          <p className="recipe-category">{recipe.category}</p>
          <h3>{recipe.title}</h3>
        </div>

        <span className="prep-time">{recipe.prep_time}</span>
      </div>

      <div className="recipe-tags">
        {recipe.tags.map((tag, index) => (
          <span className="tag-pill" key={index}>
            {tag}
          </span>
        ))}
      </div>

      <div className="recipe-section">
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h4>Preparation</h4>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="recipe-actions">
        {recipe.source_url && (
          <a href={recipe.source_url} target="_blank" rel="noreferrer">
            Open source
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