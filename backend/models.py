from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=True)
    prep_time = Column(String, nullable=True)
    ingredients = Column(Text, nullable=True)
    steps = Column(Text, nullable=True)
    tags = Column(Text, nullable=True)
    source_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)