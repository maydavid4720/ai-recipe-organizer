import requests
from bs4 import BeautifulSoup


def fetch_url_text(url: str) -> str:
    """
    Fetches a webpage URL and returns clean readable text.
    """

    response = requests.get(url, timeout=10)

    if response.status_code != 200:
        raise ValueError(f"Could not fetch URL. Status code: {response.status_code}")

    soup = BeautifulSoup(response.text, "html.parser")

    for tag in soup(["script", "style", "nav", "footer", "header"]):
        tag.decompose()

    text = soup.get_text(separator="\n")

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    clean_text = "\n".join(lines)

    if len(clean_text) < 100:
        raise ValueError("The webpage does not contain enough readable text.")

    return clean_text[:8000]