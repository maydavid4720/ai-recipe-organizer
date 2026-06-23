import os
import json
from dotenv import load_dotenv
from google import genai


load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are a strict recipe extraction assistant.

Your task is to extract structured recipe information ONLY from the provided text.

The provided text may come from:
- user-written recipe text
- webpage content extracted by the backend

Important rules:
- Do not invent recipes.
- Do not add ingredients that are not mentioned.
- Do not create cooking steps that are not mentioned.
- Do not infer missing instructions from ingredients alone.
- Do not claim to access URLs or external websites.
- If the provided text does not contain enough recipe information, return is_recipe=false.
- If the text contains only ingredients without preparation steps, return is_recipe=false.
- If the text contains only preparation steps without ingredients, return is_recipe=false.
- If the text is unrelated to cooking or recipes, return is_recipe=false.
- If multiple recipes appear, extract only the first clearly described recipe.
- Preserve the original language of the recipe content.
- Do not translate titles, ingredients, or preparation steps.
- Tags should preserve the original input language when possible.
A valid recipe must include:
1. A clear dish name or dish description.
2. At least two ingredients.
3. At least one clear preparation step.

You may classify category and tags based on the provided text, but do not invent missing recipe content.

Return ONLY valid JSON in this exact format:

{
  "is_recipe": true,
  "error_message": null,
  "title": "string",
  "category": "Breakfast | Lunch | Dinner | Dessert | Salad | Snack | Other",
  "prep_time": "string or Not specified",
  "ingredients": ["string"],
  "steps": ["string"],
  "tags": ["string"]
}

If the input is invalid, return:

{
  "is_recipe": false,
  "error_message": "short explanation",
  "title": null,
  "category": null,
  "prep_time": null,
  "ingredients": [],
  "steps": [],
  "tags": []
}
"""

def extract_recipe_with_ai(recipe_text: str) -> dict:
    """
    Sends recipe-related text to Gemini and returns structured recipe data.    
    """
    if not recipe_text or not recipe_text.strip():
        return {
            "is_recipe": False,
            "error_message": "No input text provided for extraction.",
            "title": None,
            "category": None,
            "prep_time": None,
            "ingredients": [],
            "steps": [],
            "tags": []
        }
    
    full_prompt = f"""
                    {SYSTEM_PROMPT}

                    Provided text:
                    \"\"\"
                    {recipe_text}
                    \"\"\"
                """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=full_prompt
    )

    content = response.text.strip()

    if content.startswith("```json"):
        content = content.replace("```json", "").replace("```", "").strip()

    elif content.startswith("```"):
        content = content.replace("```", "").strip()

    return json.loads(content)