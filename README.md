# 🐛 Bug/Task Tracker App

A role-based task and bug tracking web application built with **React**, **Tailwind CSS**, and **Redux Toolkit**. Developed as part of the FealtyX Frontend Assignment to demonstrate practical frontend architecture, state management, and clean responsive design.

---

## 🚀 Features

- 🔐 **Role-based Authentication**
  - Login system with mock credentials
  - Separate dashboards for **Developers** and **Managers**

- 🖥️ **Dashboards**
  - **Developer** can create, edit, delete, and request bug closures
  - **Manager** can view all bugs, approve/reopen tasks, and see trends

- 🐞 **Task/Bug Management**
  - Fields: Title, Description, Priority, Status, Assignee, Dates
  - Filter and sort tasks by Status, Priority, and Assignee
  - Approve or Reopen tasks with status management

- ⏱️ **Time Tracker**
  - Log time spent per task
  - Manager sees total time spent by all developers

- 📊 **Trend Chart**
  - Task trend over days using Recharts

- 🌈 **Responsive UI**
  - Built with Tailwind CSS for modern and mobile-friendly design

- 🧠 **State Management**
  - Redux Toolkit used to manage global state
  - Tasks are stored in `localStorage` for persistence

---

## 🔧 Tech Stack

| Technology      | Purpose                     |
|-----------------|-----------------------------|
| React JS        | Frontend framework          |
| Tailwind CSS    | Styling and layout          |
| Redux Toolkit   | State management            |
| React Router    | Routing & role-based access |
| Recharts        | Task trend line             |
| LocalStorage    | Persisting task state only  |

---

## 🔐 Mock Login Credentials

| Role      | Username  | Password |
|-----------|-----------|----------|
| Developer | `dev1`    | `1234`   |
| Manager   | `manager1`| `admin`  |

> No backend. Auth is mock-based using hardcoded data.

---

## 📁 Folder Structure

