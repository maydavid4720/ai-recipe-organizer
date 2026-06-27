from pydantic import BaseModel, Field
from typing import Optional, List

class RecipeCreateRequest(BaseModel):
    user_input: str = Field(..., min_length=10, max_length=10000)


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
