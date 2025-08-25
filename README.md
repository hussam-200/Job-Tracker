# Job Tracker App

## 📱 App Overview

The **Job Tracker App** is a simple job management system built with **React**, **Redux**, **Redux Persist**, and **Firebase**. It allows two types of users — **regular users** and **admins** — to interact with the job application data in different ways.

---

## ✨ Features

### 👤 User Features
- Register and log in
- Add a job (company, position, and status)
- View personal profile information
- Automatically stay logged in with Redux Persist

### 🔐 Admin Features
- View all jobs submitted by all users
- Filter jobs by status (applied, interview, rejected, hired)
- View job details including username
- Access profile page
- Admin accounts are added manually via Firebase

---

## 🛠️ How It Works

- The app uses **Firebase Authentication** for user login/registration.
- Jobs are stored in **Firebase Firestore**.
- State is managed using **Redux**, with **Redux Persist** to save login state.
- Users can:
  - Add jobs to the database.
  - View and manage only their own jobs.
- Admins can:
  - View all jobs submitted by all users.
  - Filter jobs by status.
- Role-based access:
  - When a user clicks "Dashboard", the app redirects based on their role (admin/user).
  - Admins are identified by the `role` field in their user object.

---

## ⏱️ Time Spent

This lab took me around **2 full days** to complete.

---

## 🚧 Challenges Faced

- The most challenging part was setting up **role-based access control** between users and admins.
- Managing **Firebase Firestore** structure for job data and linking it to authenticated users.
- Ensuring Redux state (with user roles) persisted properly with **Redux Persist**.

---

## 🧪 Technologies Used

- React
- Redux
- Redux Persist
- Firebase Authentication
- Firebase Firestore
- React Router DOM

---

## ✅ Setup

1. Clone the repo
2. Run `npm install`
3. Set up Firebase project and add config to your `firebase.js`
4. Run `npm start` to launch the app

---

## 👨‍💻 Author

Made with ❤️ by Hussam – 2025
