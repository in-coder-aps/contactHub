# 📇 ContactHub
A backend-focused application for managing personal contacts, featuring a secure API for user authentication and data management, complemented by a responsive frontend.

## 🚀 Features
### Backend
✅ User registration with unique email and secure password hashing  
✅ JWT-based login and authentication  
✅ Refresh DB connection configuration with timeout & logs  
✅ CRUD operations for contacts, scoped per authenticated user  
✅ Ownership checks: users can only access/update/delete their own contacts  
✅ Centralized error handling middleware  
✅ Validation middleware for secure route protection  
✅ Organized project structure and RESTful routes  

### Frontend
✅ User authentication (Register/Login) with persistent login across refreshes  
✅ Dynamic display of user-specific content after login  
✅ Form for adding new contacts  
✅ List of all contacts with inline edit and delete functionality  
✅ Responsive UI for a better user experience  
✅ Basic error message display for API failures  
✅ Local storage for JWT token persistence (improving user experience across sessions)  

## 🧰 Tech Stack
### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React.js (Functional Components with Hooks)
- CSS Modules for scoped styling
- Fetch API for all backend communication

## 📂 Project Structure

```
.
├── config/
│   └── dbConnection.js
├── controllers/
│   ├── contactController.js
│   └── userController.js
├── frontend/                     # NEW: React Frontend Directory
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── api.js
│       ├── App.js
│       ├── App.module.css
│       ├── components/
│       │   ├── AuthForms.js
│       │   ├── AuthForms.module.css
│       │   ├── ContactForm.js
│       │   ├── ContactForm.module.css
│       │   ├── ContactList.js
│       │   ├── ContactList.module.css
│       │   ├── UserDetails.js
│       │   └── UserDetails.module.css
│       ├── index.js
│       └── index.css
│   └── package.json
├── middleware/
│   ├── errorHandler.js
│   └── validateTokenHandler.js
├── models/
│   ├── contactModel.js
│   └── userModel.js
├── routes/
│   ├── contactRoutes.js
│   └── userRoutes.js
├── server.js
├── constants.js
└── .env

```

## 🔗 API Endpoints
### 👤 Users
| Method | Endpoint              | Description             | Access  |
| ------ | --------------------- | ----------------------- | ------- |
| POST   | `/api/users/register` | Register new user       | Public  |
| POST   | `/api/users/login`    | Login and get JWT token | Public  |
| GET    | `/api/users/current`  | Get current user info   | Private |


### 📇 Contacts

| Method | Endpoint            | Description               | Access  |
| ------ | ------------------- | ------------------------- | ------- |
| GET    | `/api/contacts`     | Get all user contacts     | Private |
| POST   | `/api/contacts`     | Create a new contact      | Private |
| GET    | `/api/contacts/:id` | Get a specific contact    | Private |
| PUT    | `/api/contacts/:id` | Update a specific contact | Private |
| DELETE | `/api/contacts/:id` | Delete a specific contact | Private |

## ⚙️ Getting Started
**Prerequisites**
- Node.js >= 14
- MongoDB (local or Atlas)

**Setup**
1. Clone the repository:

```
git clone <repo-url>
cd contacthub
```

2. Install Backend Dependencies:

```
npm install
```

3. Install Frontend Dependencies:
```
cd frontend
npm install
cd .. # Go back to the root directory
```

**Environment Variables**  
- Create a .env file in the root folder and add:

```
PORT=5000  
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=your_jwt_secret
```

## Run the Application

**1. Start the Backend Server:**  
Open your first terminal in the root contacthub/ directory and run:

```
npm start
```
Server runs on: `http://localhost:5000`

**2. Start the Frontend Development Server:**  
Open a second terminal, navigate into the frontend/ directory:

```
cd frontend
npm start
```
Frontend runs on: `http://localhost:3000` (or another available port)

## Important Integration Notes:  

- CORS: Ensure your backend has CORS enabled to allow requests from the frontend (e.g., `http://localhost:3000`). This is already configured in `server.js` (`app.use(cors());`).

- API Base URL: The frontend's `src/api.js` is configured to connect to `http://localhost:5000/api`. Make sure your backend is running on this port.
## 🛡️ Security Features
- Passwords hashed with bcrypt
- JWT tokens with expiry and signature secret
- Route-level authorization with ownership checks
- Centralized error handling with meaningful messages
- Database connection timeout and proper error logging

---

### 💡 Future Enhancements

We're always looking to improve ContactHub. Stay tuned for more features!

<p align="center">Made with ❤️ by Aditya.</p>