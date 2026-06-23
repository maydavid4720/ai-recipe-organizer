# AI Recipe Organizer

AI Recipe Organizer is a full-stack web application that helps users organize recipes from different sources into a structured and searchable recipe library.

People often save recipes from websites, blogs, social media posts, and personal notes, but each source presents information in a different format. This makes recipes difficult to organize, search, and reuse.

This project uses Generative AI to automatically extract structured recipe information from recipe URLs or free-text recipes and store it in a consistent format. Users can browse recipes by category, manage their recipe collection, and generate weekly dinner suggestions based on saved recipes.

---

## Features

* Add recipes from recipe URLs
* Add recipes from free-text content
* Extract structured recipe information using Google Gemini
* Automatically identify:

  * Recipe title
  * Ingredients
  * Preparation steps
  * Category
  * Preparation time
  * Tags
* Store recipes in a local SQLite database
* Browse all saved recipes
* Filter recipes by category
* Delete recipes
* Weekly dinner suggestion endpoint based on saved Dinner recipes
* Single-user MVP without authentication

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* Google Gemini API
* Requests
* BeautifulSoup4
* Python Dotenv

---

## Project Structure

```text
ai-recipe-organizer/
│
├── backend/
│   ├── ai_service.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── url_service.py
│   ├── utils.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-recipe-organizer
```

---

### 2. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file based on `.env.example`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

Open a second terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Optional frontend environment variable:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

---

## API Endpoints

| Method | Endpoint                       | Description                      |
| ------ | ------------------------------ | -------------------------------- |
| GET    | `/health`                      | Health check                     |
| GET    | `/recipes`                     | Get all recipes                  |
| POST   | `/recipes`                     | Create a recipe from URL or text |
| DELETE | `/recipes/{recipe_id}`         | Delete a recipe                  |
| GET    | `/recipes/category/{category}` | Get recipes by category          |
| GET    | `/recipes/weekly-dinner`       | Get weekly dinner suggestions    |

---

## Weekly Dinner Suggestions

The application includes a meal-planning endpoint that returns the latest recipes stored under the Dinner category.

This endpoint can be integrated with automation tools such as n8n to generate weekly shopping-oriented emails containing recipe ingredients and meal ideas.

The current implementation is designed for local use while the backend server is running.

---

## Security

* API keys are stored in environment variables
* `.env` files are excluded from version control
* Local database files are excluded from Git
* Dependencies are installed from requirements and package files rather than committed to the repository

---

## Future Improvements

* Improved UI/UX design
* Responsive mobile support
* User authentication and personal accounts
* Recipe editing functionality
* Advanced meal-planning features
* Shopping list generation
* Cloud deployment
* PostgreSQL support for production environments
* Automated scheduled email delivery

---

## Status

Current version is a functional MVP built to demonstrate:

* Full-stack development
* REST API design
* AI integration
* Data extraction and processing
* Database management
* Frontend-backend communication
* Environment variable management