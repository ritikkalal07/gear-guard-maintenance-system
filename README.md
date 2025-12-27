# 🛠️ GearGuard – Maintenance Management System

**GearGuard** is a full-stack MERN-based maintenance management system designed to help organizations efficiently track equipment, manage maintenance teams, and handle repair requests through a smart, visual, and automated workflow.

---

## 📌 Project Objective

The main goal of GearGuard is to **digitize and simplify maintenance operations** by connecting:

* 🧰 **Equipment** (what needs maintenance)
* 👨‍🔧 **Teams & Technicians** (who performs maintenance)
* 📋 **Requests** (what work needs to be done)

This system helps reduce downtime, improve accountability, and ensure preventive maintenance is never missed.

---

## 🎯 Motivation (Why This Project?)

In many companies, maintenance is handled using:

* Registers
* Excel sheets
* WhatsApp messages

These methods cause:

* Missed maintenance schedules
* No tracking of repair history
* Poor accountability

**GearGuard solves this problem** by providing a centralized, role-based, and automated maintenance system similar to professional ERP tools (like Odoo), but simplified for learning and real-world use.

---

## ⚙️ Key Features

### 🧰 Equipment Management

* Central database of all assets (machines, laptops, vehicles, etc.)
* Track equipment by:

  * Department
  * Assigned employee
* Store details:

  * Serial number
  * Purchase date
  * Warranty
  * Physical location
* Each equipment is linked to a **maintenance team**

---

### 👨‍🔧 Maintenance Teams

* Create multiple specialized teams:

  * Mechanics
  * Electricians
  * IT Support
* Assign technicians to teams
* Only relevant team members can handle assigned requests

---

### 📋 Maintenance Requests

Two types of maintenance:

* **Corrective** – sudden breakdowns
* **Preventive** – scheduled routine maintenance

Request details include:

* Problem description
* Equipment selection (auto-fills team)
* Scheduled date
* Repair duration
* Technician assignment
* Status tracking

---

## 🔄 Functional Workflow

### 🔴 Breakdown Flow

1. User creates a maintenance request
2. Selecting equipment auto-assigns team
3. Request status starts as **New**
4. Technician picks the task
5. Status moves to **In Progress**
6. After repair, duration is logged
7. Status becomes **Repaired**

---

### 🟢 Preventive Maintenance Flow

1. Manager creates a preventive request
2. Sets a future scheduled date
3. Request appears in **Calendar View**
4. Technician completes task on scheduled date

---

## 🖥️ User Interface & Views

### 📌 Kanban Board

* Visual board with stages:

  * New | In Progress | Repaired | Scrap
* Drag & drop request cards
* Shows:

  * Assigned technician avatar
  * Overdue indicators

---

### 📅 Calendar View

* Displays preventive maintenance schedules
* Click on a date to add a new request

---

### 📊 Reports (Optional)

* Maintenance requests per team
* Requests per equipment category

---

## 🤖 Smart Automation

* **Smart Button on Equipment**

  * Shows number of related maintenance requests
* **Scrap Logic**

  * If request is marked Scrap, equipment is flagged unusable
* **Auto-Fill Logic**

  * Selecting equipment auto-assigns team and category

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* HTML5, CSS3 (Global CSS)
* JavaScript
* Responsive UI

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Tools

* GitHub (Version Control)
* Vercel (Deployment)
* Replit (Development)

---

## 📁 Project Structure

```
gearguard-mern/
├── client/   (Vite + React)
├── server/   (Node.js + Express)
└── README.md
```

---

## 👥 Team Members

| Name            | GitHub      |
| --------------- | ----------- |
| Harsh Mandaliya | Contributor |
| dhruv18457      | Contributor |
| MrA18Makes      | Contributor |

---

## 🎓 Mentor

* **GitHub:** maad-odoo
* **Role:** Project Guidance, Code Review, Architecture Suggestions

---

## 🤝 Collaboration Method

* GitHub repository collaboration
* Team members with **Write access**
* Mentor added as **Maintainer**
* Version control using Git & GitHub

---

## 🚀 Deployment

* Hosted on **Vercel**
* Continuous deployment via GitHub

---

## 📌 Future Enhancements

* Authentication & role-based access
* Notifications & alerts
* Mobile-friendly PWA
* Advanced analytics dashboard

---

## 📜 Conclusion

GearGuard is a practical, real-world inspired project that demonstrates:

* Full-stack development skills
* Business workflow understanding
* Team collaboration
* Scalable system design

This project bridges the gap between **academic learning** and **industry-level applications**.

---
