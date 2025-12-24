# E-Commerce Backend API

This project is a backend REST API for an e-commerce platform.
It handles authentication, product management, orders, payments, and email notifications.

---

## 🚀 Features
- RESTful API built with **Express**
- User authentication with **JWT**
- Password hashing using **bcrypt**
- Product & order management
- Image upload using **Cloudinary** and **Multer**
- Payment integration with **Paymob**
- Email notifications using **SendGrid** and **Nodemailer**
- Input validation with **Express Validator**
- Security best practices with **Helmet**
- MongoDB database using **Mongoose**

---

## 🛠 Tech Stack
- **Node.js**
- **Express**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Cloudinary**
- **Paymob**
- **SendGrid**
- **Nodemailer**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
Install dependencies:

bash
npm install
Run the development server:

bash
npm run dev
The server will run on the specified PORT.

🔑 Environment Variables
Create a .env file in the root directory and add:

env
نسخ الكود
PORT=
DATABASE_URL=
JWT_SECRET_KEY=

PAYMOB_API_KEY=
INTEGRATION_ID=
IFRAME_ID=

SENDGRID_API_KEY=
FROM_EMAIL=

CLOUD_NAME=
CLOUD_KEY=
CLOUD_SECRET=
Make sure all environment variables are configured correctly before running the server.

📁 Scripts
npm run dev – Start server with Nodemon

📌 Notes
This backend is designed to work with multiple frontend clients (React / Next.js).

Payment processing is handled via Paymob.

Email services are used for notifications and confirmations.

Suitable for real-world e-commerce applications.

👨‍💻 Author
Mohammad Saber

markdown
نسخ الكود
