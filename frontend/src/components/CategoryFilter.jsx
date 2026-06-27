function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <section className="category-filter">
      <p className="section-label">Browse by category</p>

      <div className="filter-chips">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-chip ${selectedCategory === category ? "active-filter" : ""}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;
