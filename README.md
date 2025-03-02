# 📌 Task Manager Application

A powerful **Task Manager Application** built with **React** (frontend) and **Laravel** (backend), featuring **subtasks, Pro plan features, task tracking (progress percentage), and calendar view**.

## 🚀 Features

### Core Features
1. **Task Management**:
   - Create, Read, Update, and Delete (CRUD) tasks.
   - Each task can have **subtasks** (nested tasks).
   - Task status tracking: `todo`, `inprogress`, `complete`.
   - Progress percentage for each task (based on task completion).

2. **User Authentication**:
   - Secure user registration, login, and logout.
   - Role-based access control (Free vs. Pro users).

3. **Pro Plan Features**:
   - **Free Plan**: Basic task management.
   - **Pro Plan**: Unlocks advanced features:
     - Unlimited tasks.
     - Subtask functionality.
     - Recive Emails.

4. **Task Tracking**:
   - Percentage of completion displayed for each status of tasks.

5. **Calendar View**:
   - Monthly calendar to view tasks and due dates.

6. **Payment Integration**:
   - Simulated payment gateway to upgrade to the Pro plan.
   - Uses a payment system (no real money involved).

7. **Responsive Design**:
   - Mobile-friendly and responsive UI built with **Bootstrap CSS**.

## 🛠️ Technologies Used

- **Backend**: Laravel, PHP, MySQL, Laravel Sanctum, Laravel Queues.
- **Frontend**: React, React Query, Bootstrap CSS, Axios, React Router,React Icons, React calendar (for calendar view).
- **Payment Integration**:  payment gateway (simulated).

- **Tools**: GitHub Actions (CI/CD), Postman (API Testing).


## 🚀 Getting Started



### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/kaaado/Task-Manager
   cd Task-Manager
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Configure `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=task_manager
   DB_USERNAME=root
   DB_PASSWORD=
   
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```
4. Run migrations:
   ```bash
   php artisan migrate
   ```
5. Start the server:
   ```bash
   php artisan serve
   ```

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/kaaado/Task-Manager
   cd Task-Manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```


## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


