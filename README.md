# AI Recipe Organizer

AI Recipe Organizer is a full-stack web application that uses Generative AI to extract structured recipes from recipe URLs or free-text input and organize them into a searchable personal recipe library.

People often save recipes from websites, blogs, social media posts, and personal notes, but each source presents information in a different format. This makes recipes difficult to organize, search, and reuse.

This project uses Generative AI to automatically extract structured recipe information from recipe URLs or free-text recipes and store it in a consistent format. Users can browse recipes by category, manage their recipe collection, and generate weekly dinner suggestions based on saved recipes.

---

## Features

- Add recipes by pasting recipe text or a recipe URL
- AI-powered recipe extraction using Google Gemini 2.5 Flash
- Automatic extraction of:
  - Title
  - Category
  - Preparation time
  - Ingredients
  - Preparation steps
  - Tags
- Recipe validation before saving
- Recipe library with category filtering
- Interactive ingredient checklist
- RTL/LTR support for Hebrew and English recipes
- Delete recipes
- Store original recipe source URL (when available)
- Weekly dinner suggestions endpoint for automation workflows

---

## Architecture

The project follows a simple client-server architecture.

### Frontend:
- React
- Vite
- Fetch API

### Backend:
- FastAPI
- SQLAlchemy
- SQLite

### AI:
- Google Gemini 2.5 Flash

The frontend communicates with the FastAPI backend, which handles recipe extraction, AI processing, validation, and data persistence.
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
## AI Processing Pipeline

The following pipeline summarizes the end-to-end recipe processing flow:

```text
User Input
      │
      ▼
Validate input
      │
      ▼
Extract webpage content (if URL)
      │
      ▼
Generate structured prompt
      │
      ▼
Google Gemini
      │
      ▼
Validate AI response
      │
      ▼
Save recipe to database
      │
      ▼
Display in UI
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
## Error Handling

The backend gracefully handles:

- Empty input
- Invalid recipe content
- AI service failures
- Empty AI responses
- Invalid JSON responses from the AI model
- Request validation errors

The frontend displays user-friendly error messages for each scenario.
---
## Weekly Dinner Suggestions

The following pipeline summarizes the end-to-end recipe processing flow:

The endpoint returns up to 3 recently added recipes from the Dinner category.

It can be integrated with automation tools such as n8n to generate weekly emails containing recipe suggestions and ingredient lists.

The current implementation provides backend support only and does not yet include a dedicated frontend interface.

---

## Security

* API keys are stored in environment variables
* `.env` files are excluded from version control
* Local database files are excluded from Git
* Dependencies are installed from requirements and package files rather than committed to the repository

---

## Future Improvements

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

This project is currently a functional MVP demonstrating:

- Full-stack application development
- REST API design
- Generative AI integration
- Structured data extraction
- Database persistence
- Frontend–backend communication
- Robust error handling