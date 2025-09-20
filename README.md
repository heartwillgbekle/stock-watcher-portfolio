# 📈 Stock Watcher

A full-stack web application for real-time stock price tracking.

**Live Demo**: **[https://stock-watcher-portfolio.vercel.app](https://www.google.com/search?q=)**

 ---

## Overview

Stock Watcher is a portfolio-ready web application designed to demonstrate a comprehensive understanding of modern full-stack development. It allows users to create an account, build a personalized watchlist of stock symbols, and monitor their prices with data fetched live from the Finnhub financial API.

This project was built from the ground up, starting with a robust Django REST backend and a dynamic React frontend, all connected to a PostgreSQL database. It showcases best practices such as secure token-based authentication, environment variable management, and a clean, component-based frontend architecture.

-----

## Features

  * **Secure User Authentication**:

      * Users can register for a new account and log in securely.
      * The backend uses JSON Web Tokens (JWT) for session management, ensuring that user data is protected.

  * **Personalized Stock Dashboard**:

      * Once logged in, users are presented with a personal dashboard.
      * Users can perform full **CRUD** (Create, Read, Update, Delete) operations on their watchlist.
      * The interface is designed to be intuitive and responsive.

  * **Real-Time Price Data**:

      * Leverages the **Finnhub API** to fetch live market data for all stocks in a user's watchlist.
      * Prices are displayed alongside the stock symbols for easy viewing.

  * **Automatic 1-Minute Refresh**:

      * The dashboard automatically polls for new price data every 60 seconds, ensuring users always have up-to-date information without needing to refresh the page.

-----

## Technologies Used

| Category      | Technology                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| **Backend** | Python, Django, Django REST Framework, Simple JWT                                                           |
| **Frontend** | JavaScript, React, React Router, Axios                                                                      |
| **Database** | PostgreSQL                                                                                                  |
| **API** | [Finnhub API](https://finnhub.io/) for real-time financial data                                             |
| **Deployment**| **Vercel** (Frontend) and **Render** (Backend & Database)                                                       |

-----

## Local Setup

To clone and run this project locally, follow these steps:

### Prerequisites

  * Python 3.x
  * Node.js and npm
  * PostgreSQL
  * Git

### 1\. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd stock-watcher
```

### 2\. Backend Configuration

```bash
# 1. Create and activate a virtual environment
python3 -m venv backend/venv
source backend/venv/bin/activate

# 2. Install all backend dependencies from the requirements file
pip install -r requirements.txt

# 3. Set up the database
#    - Create a new PostgreSQL database named 'stock_watcher_db'.
#    - Ensure the DATABASES setting in core/settings.py points to it.

# 4. Create a .env file in the root directory for your API key
echo "FINNHUB_API_KEY=YOUR_FINNHUB_API_KEY" > .env

# 5. Run database migrations to create the tables
python3 manage.py migrate
```

### 3\. Frontend Configuration

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Create a .env file for local development
echo "REACT_APP_API_URL=http://127.0.0.1:8000" > .env

# 3. Install all frontend dependencies
npm install
```

### 4\. Running the Application

You will need two separate terminals to run both servers simultaneously.

  * **Terminal 1 (Backend):**

    ```bash
    # (Activate venv if not already active)
    # source backend/venv/bin/activate
    python3 manage.py runserver
    ```

    *The backend will be running at [http://127.0.0.1:8000](https://www.google.com/url?sa=E&source=gmail&q=http://127.0.0.1:8000)*

  * **Terminal 2 (Frontend):**

    ```bash
    cd frontend
    npm start
    ```

    *The frontend will open and run at http://localhost:3000*
