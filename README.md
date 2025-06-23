# ✈️ Aircrew School Management System

A full-featured and modernized management system designed for **aviation training institutes**: flight attendants (hostesses/stewards), airline pilots (ATPL), and aircraft maintenance technicians.

---

## 🎯 Purpose

- Modernize a legacy VB6 / SQL Server 2000 application
- Digitize and automate student, academic, and financial management
- Provide a seamless experience for administrators and students alike

---

## 🧩 Architecture Overview

### 1. **Secure RESTful API**
- Built with **Node.js**, **Express.js**, and **Sequelize**
- Connected to a **MySQL** database
- Implements **JWT authentication** and role-based access

### 2. **Admin Web Backend** *(in progress)*
- Built using **Vue.js** or **React.js** *(to be finalized)*
- Features:
  - Student registration & batch management
  - Grades & evaluations
  - Timetables & instructor assignments
  - Tuition payments & receipts
- Communicates with the API via HTTP requests

### 3. **Mobile App for Students**
- Built with **Jetpack Compose** (Android)
- Authenticates using JWT
- Features:
  - Student profile & personal info
  - Grades, attendance, timetable
  - Notifications from administration

---

## 🧠 Key Features

- 🔐 Multi-role authentication: admin, teacher, student
- 📚 Program management: Flight Attendant, Steward, ATPL, Aircraft Maintenance
- 📝 Attendance & grade tracking, academic reporting
- 💸 Tuition management with digital receipt generation
- 📅 Scheduling for courses and classrooms
- 📲 Connected mobile app for students

---

## 🔧 Tech Stack

| Component        | Technology                      |
|------------------|----------------------------------|
| API              | Node.js + Express + Sequelize   |
| Database         | MySQL                            |
| Admin Frontend   | Vue.js or React.js (TBD)         |
| Mobile App       | Jetpack Compose (Android)        |
| Authentication   | JWT + bcrypt                     |
| Deployment (test)| Replit / Render                  |

---

## 🚀 Roadmap

- ✅ API development with authentication
- ✅ Android app prototype (login, dashboard)
- 🔜 Deploy to cloud (Render or VPS)
- 🔜 Export to PDF: report cards & receipts
- 🔜 Internal messaging module
- 🔜 Upgrade to full e-learning support

---

## 📦 Repository Structure (planned)

