import re
from typing import Tuple, Optional


def extract_url_and_text(user_input: str) -> Tuple[Optional[str], str]:
    """
    Extract URL from user input and return:
    1. source_url
    2. remaining recipe text
    """

    url_pattern = r"https?://\S+"
    match = re.search(url_pattern, user_input)

    if not match:
        return None, user_input.strip()

    source_url = match.group(0)
    recipe_text = user_input.replace(source_url, "").strip()

    return source_url, recipe_text