# Blog App

Blog App is a full-stack blogging platform where anyone can read public blogs, but only authenticated users can create and manage their own personal blogs. Built with TypeScript and Python, this project demonstrates JWT authentication and user-specific content visibility.

## Features

- **Public Blog Reading** — Browse and read blogs from all users without authentication
- **User Authentication** — Sign up and log in with JWT token-based authentication
- **Create Personal Blogs** — Write and publish blogs (only visible to authenticated users)
- **Private Blog Visibility** — Your blogs are only visible to you when logged in
- **User-Specific Content** — Blogs disappear from view when you log out
- **Simple & Clean UI** — Intuitive interface for blogging
- **Practice Project** — Great for learning full-stack development

## How It Works

1. **Unauthenticated Users** — Can view and read all publicly available blogs
2. **Authenticated Users** — Can read blogs AND create new personal blogs
3. **Blog Privacy** — Each user's created blogs are only visible when they're logged in
4. **Logout** — When you logout, your created blogs are no longer visible to you (they're protected)

## Technologies Used

- **TypeScript** — Type-safe frontend application
- **React** — Interactive user interface
- **Python** — Backend API development
- **JWT (JSON Web Tokens)** — Secure authentication and authorization
- **Modern web standards** — Responsive design

## Getting Started

1. Clone the repository.
2. Install frontend dependencies: `npm install` (in the frontend directory)
3. Install backend dependencies: `pip install -r requirements.txt` (in the backend directory)
4. Configure environment variables and JWT secret
5. Start the Python backend server
6. Start the React frontend development server
7. Open your browser and start blogging!

## Usage

**For All Users:**
- Browse the home page to read public blogs
- View blog details and author information

**For Authenticated Users:**
- Sign up or log in with your credentials
- Create new blog posts from the dashboard
- Your blogs will only be visible while you're logged in
- Log out to return to public blog view

## Installation & Setup

```bash
# Frontend Setup
cd frontend
npm install
npm run dev

# Backend Setup
cd backend
pip install -r requirements.txt
python manage.py runserver
```

## License

This project is open-source and available under the MIT License.
