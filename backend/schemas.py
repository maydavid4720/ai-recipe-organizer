from pydantic import BaseModel
from typing import Optional, List


class RecipeCreateRequest(BaseModel):
    user_input: str


class RecipeResponse(BaseModel):
    id: int
    title: str
    category: Optional[str]
    prep_time: Optional[str]
    ingredients: List[str]
    steps: List[str]
    tags: List[str]
    source_url: Optional[str]

    class Config:
        from_attributes = True