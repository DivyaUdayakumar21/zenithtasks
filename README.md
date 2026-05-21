Here is the raw Markdown text. You can copy and paste this entire block directly into your `README.md` file:

```markdown
# ZenithTasks: Production-Grade Full-Stack Task Manager

ZenithTasks is a secure, full-stack Task Management application built using **React.js** on the frontend and **Django REST Framework (DRF)** on the backend. The application features robust security implementations, role-based access controls, and handles data layers natively through a serverless cloud **Neon PostgreSQL** database.

---

##System Architecture & Workflow

The platform coordinates authentication and data access using industry-standard protocols to shield endpoints and isolate user scopes.


```

[ Frontend: React UI ] --( Bearer JWT Token )--> [ API Version Panel: /api/v1/ ]
|
+------------------------------------------------------+
|
v
[ Custom RBAC Middleware ] ---> Is Admin?  ---> YES ---> View All Global Records
|                             |
|                             +---------> NO ----> View Only Owned Records
v
[ Cloud Infrastructure ] --------> [ Serverless PostgreSQL DB (Neon) ]

```

---

##Features Checklist

- [x] **Secure Authentication APIs:** Robust user registration and login endpoints with automated back-end password hashing.
- [x] **JWT Token Management:** Short-lived access tokens (15 mins) paired with secure refresh token rotation workflows.
- [x] **Role-Based Access Control (RBAC):** Sandbox data isolation for standard users; global data management dashboards for staff/admin roles.
- [x] **Secondary Entity CRUD Operations:** Complete interactive task tracking engine (Create, Read, Update, Delete) with state tracking.
- [x] **API Versioning & Validation:** Namespace separation via `/api/v1/` routes with clean JSON parameter format validation checks.
- [x] **Auto-Generated API Docs:** Interactive **Swagger UI** platform auto-scans and lists active endpoints dynamically.
- [x] **Cloud Data Infrastructure:** Swapped local SQLite tables for production-grade serverless cloud PostgreSQL hosting via Neon.
- [x] **Input Sanitization:** Deep-scrub processing via server-side libraries to eliminate XSS/HTML injection attempts.
- [x] **Container Ready:** Fully modular structures backed up by production environment `Dockerfile` layouts.

---

##Tech Stack

- **Frontend:** React.js, Axios, JavaScript (ES6+), CSS3
- **Backend:** Python, Django REST Framework, Simple JWT, DRF-Spectacular
- **Database:** Cloud Serverless PostgreSQL (Neon.tech)
- **Containerization:** Docker

---

##Local Installation & Setup

Follow these steps to spin up the local development environment on your machine.

### Prerequisites
- Python 3.10+
- Node.js (v18+)
- A Neon.tech account and database connection string

---

### 1. Backend Engine Setup (`core/`)

1. Open your terminal and navigate to the backend subdirectory:
   ```bash
   cd core

```

2. Create a virtual environment and activate it:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

```


3. Install the required backend dependencies:
```bash
pip install -r requirements.txt

```


4. Apply database schema migrations directly to your Neon Cloud database:
```bash
python manage.py migrate

```


5. Create an administrative superuser to test the Admin RBAC features:
```bash
python manage.py createsuperuser

```


6. Fire up the Django server:
```bash
python manage.py runserver

```


The backend engine will spin up live at `http://127.0.0.1:8000/`.

---

### 2. Frontend Setup (`frontend/`)

1. Open a new terminal window and navigate to your frontend folder:
```bash
cd frontend

```


2. Install the frontend dependencies:
```bash
npm install

```


3. Start the Vite local development server:
```bash
npm run dev

```


Open the rendered terminal URL link (usually `http://localhost:5173`) in your web browser to play with the application!

---

## Live Interactive Documentation

Once the backend server is running locally, you can visually explore, interact with, and execute commands against the endpoint routing structure directly using the Swagger UI panel:

* **Swagger Panel Address:** `http://127.0.0.1:8000/api/docs/`
* **Schema Blueprint:** `http://127.0.0.1:8000/api/schema/`

```

```
