
import json
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, SessionLocal
from models import Recipe
from schemas import RecipeCreateRequest
from utils import extract_url_and_text
from ai_service import extract_recipe_with_ai
from url_service import fetch_url_text

DEFAULT_RECIPE_ERROR = (
    "I couldn't extract a valid recipe. Please paste recipe text or use a recipe URL "
    "that contains ingredients and preparation steps."
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Recipe Organizer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def friendly_error(ai_error: str | None) -> str:
    if not ai_error:
        return DEFAULT_RECIPE_ERROR

    error = ai_error.lower()

    if "block" in error or "blocked" in error:
        return "I couldn't read recipe content from this website. Please try another recipe URL or paste the recipe text manually."

    if "unrelated" in error or "not related" in error:
        return "This input does not look like a recipe. Please paste recipe content with ingredients and preparation steps."

    if "not enough" in error or "enough recipe" in error:
        return "The input does not contain enough recipe details. Please include a dish name, ingredients, and preparation steps."

    if "ingredients" in error or "steps" in error:
        return "The recipe seems incomplete. Please include both ingredients and preparation steps."

    return DEFAULT_RECIPE_ERROR

def format_recipe(recipe: Recipe) -> dict:
    return {
        "id": recipe.id,
        "title": recipe.title,
        "category": recipe.category,
        "prep_time": recipe.prep_time,
        "ingredients": json.loads(recipe.ingredients),
        "steps": json.loads(recipe.steps),
        "tags": json.loads(recipe.tags),
        "source_url": recipe.source_url
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/recipes")
def create_recipe(request: RecipeCreateRequest, db: Session = Depends(get_db)):
    source_url, recipe_text = extract_url_and_text(request.user_input)

    final_text_for_ai = recipe_text

    if source_url:
        try:
            webpage_text = fetch_url_text(source_url)
            final_text_for_ai = webpage_text
        except Exception:
            if not recipe_text:
                raise HTTPException(
                    status_code=400,
                    detail="I couldn't read recipe content from this URL. Please try another recipe link or paste the recipe text manually."                )

    if not final_text_for_ai:
        raise HTTPException(
            status_code=400,
            detail="Please paste recipe text or provide a recipe URL that contains readable recipe content."
        )

    ai_result = extract_recipe_with_ai(final_text_for_ai)

    if not ai_result.get("is_recipe"):
        raise HTTPException(
            status_code=400,
            detail=friendly_error(ai_result.get("error_message"))
        )

    recipe = Recipe(
        title=ai_result["title"],
        category=ai_result["category"],
        prep_time=ai_result["prep_time"],
        ingredients=json.dumps(ai_result["ingredients"], ensure_ascii=False),
        steps=json.dumps(ai_result["steps"], ensure_ascii=False),
        tags=json.dumps(ai_result["tags"], ensure_ascii=False),
        source_url=source_url
    )

    db.add(recipe)
    db.commit()
    db.refresh(recipe)

    return format_recipe(recipe)

@app.get("/recipes")
def get_recipes(db: Session = Depends(get_db)):
    recipes = db.query(Recipe).order_by(Recipe.created_at.desc()).all()

    return [format_recipe(recipe) for recipe in recipes]

@app.delete("/recipes/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found"
        )

    db.delete(recipe)
    db.commit()

    return {
        "message": "Recipe deleted successfully",
        "deleted_recipe_id": recipe_id
    }

@app.get("/recipes/category/{category}")
def get_recipes_by_category(category: str, db: Session = Depends(get_db)):
    recipes = (
        db.query(Recipe)
        .filter(Recipe.category.ilike(category))
        .order_by(Recipe.created_at.desc())
        .all()
    )

    return [format_recipe(recipe) for recipe in recipes]

@app.get("/recipes/weekly-dinner")
def get_weekly_dinner_recipes(db: Session = Depends(get_db)):
    recipes = (
        db.query(Recipe)
        .filter(Recipe.category.ilike("Dinner"))
        .order_by(Recipe.created_at.desc())
        .limit(3)
        .all()
    )

    return [format_recipe(recipe) for recipe in recipes]