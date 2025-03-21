# **JWT Authentication System (MERN Stack)**

## **📌 Overview**
This is a **secure authentication system** built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It implements **JWT-based authentication** with access and refresh tokens, allowing users to securely log in, register, and persist sessions.

## **🚀 Features**
✅ **User Authentication** (Login, Register, Logout)
✅ **JWT-based Authentication** (Access & Refresh Tokens)
✅ **Secure Token Storage** (Access Token in LocalStorage, Refresh Token in HTTP-Only Cookies)
✅ **Auto Token Refresh** (Handles token expiration automatically)
✅ **Protected Routes** (Restricts access to authenticated users)
✅ **Fully Responsive UI** (React Frontend)

---

## **📁 Project Structure**
```
Authentication/
│── client/        # React Frontend (Vite/CRA)
│── server/        # Node.js/Express Backend
│── .env           # Environment Variables (Ignored by Git)
│── .gitignore     # Prevents sensitive files from being pushed

```

## **🛠 Tech Stack**
- **Frontend:** React, Redux Toolkit, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt.js
- **Database:** MongoDB (Atlas or Local)
- **State Management:** Redux Toolkit
- **Security:** HTTP-Only Cookies, bcrypt password hashing, JWT authentication

---

## **🔧 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Githubsuer1/Authentication
cd authentication
```

### **2️⃣ Install Dependencies**
#### **Backend**
```sh
cd server
npm install
```
#### **Frontend**
```sh
cd ../client
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file inside the `server/` directory and add:
```sh
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
MONGO_URI=your_mongo_database_uri
PORT=5000
```

### **4️⃣ Run the Development Server**
#### **Start Backend**
```sh
cd server
npm start  # Runs on PORT 5000
```
#### **Start Frontend**
```sh
cd ../client
npm run dev  # Runs on PORT 5173
```

### **5️⃣ Open in Browser**
```
http://localhost:5173
```

---

## **🔑 Authentication Flow**
1️⃣ **User Logs In** → Access & Refresh Tokens are generated.
2️⃣ **Access Token is Stored** in LocalStorage → Used for API requests.
3️⃣ **Refresh Token is Stored** in HTTP-Only Cookies → Used to get a new Access Token.
4️⃣ **When Access Token Expires** → Refresh Token fetches a new one automatically.
5️⃣ **When Refresh Token Expires** → User is logged out.

---

## **🔐 API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/v1/auth/register` | Register a new user |
| **POST** | `/api/v1/auth/login` | Login and receive JWT tokens |
| **GET** | `/api/v1/auth/getuser` | Get logged-in user details |
| **GET** | `/api/v1/auth/refreshtoken` | Get a new Access Token using Refresh Token |
| **GET** | `/api/v1/auth/logout` | Logout and clear tokens |

---

## **📢 Deployment**
### **🚀 Backend (Render, Railway, Heroku, etc.)**
- Set up a **MongoDB Atlas** database.
- Deploy the **server** on Render/Heroku.
- Add `.env` variables to the hosting platform.

### **🚀 Frontend (Vercel, Netlify, etc.)**
- Run `npm run build` inside `client/`.
- Deploy on **Vercel or Netlify**.
- Set up the **backend API URL** in the frontend environment variables.

---

## **📜 License**
This project is open-source and available under the **MIT License**.

---

## **📩 Contact**
📧 Email: mishrasiddhant560@gmail.com

🔗 GitHub: https://github.com/Githubsuer1

🌐 Portfolio: https://portfolio-siddhant-mishra.vercel.app/

🔗 LinkedIn: https://www.linkedin.com/in/siddhant-mishra-developer/

