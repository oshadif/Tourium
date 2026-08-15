<div align="center">

# 🌍 Tourium

### Full-Stack Tour & Travel Booking Platform

A portfolio-grade travel booking system for discovering tours, managing reservations, selecting hotel and vehicle options, applying promotions, generating invoices, collecting reviews, and operating administrative workflows.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)

</div>

---

## ✨ Overview

**Tourium** is a full-stack tour and travel management platform built as a realistic portfolio system. It supports customer-facing booking flows and administrative operations in one containerized application.

The project demonstrates practical full-stack engineering across responsive UI development, REST APIs, authentication and authorization, relational database design, booking workflows, PDF generation, email integration, media uploads and Docker-based local deployment.

## 🚀 Core Features

### Customer Experience

- Browse and search available tours
- View detailed tour information
- Explore day-by-day itineraries
- Select hotel and vehicle options
- Register and authenticate securely
- Validate promotional codes
- Create and manage bookings
- Complete a safe mock payment flow
- View personal booking history
- Download PDF invoices
- Submit tour ratings and reviews

### Administration

- View dashboard statistics
- Create, edit and deactivate tours
- Manage itinerary days
- Manage hotel and vehicle options
- Review all customer bookings
- Confirm or cancel bookings
- Create and manage promotional codes
- Moderate customer reviews
- Upload tour images

## 🧱 Architecture

```text
┌──────────────────────┐
│   React + Vite UI    │
│    localhost:5173    │
└──────────┬───────────┘
           │ REST / JSON
           ▼
┌──────────────────────┐
│ Node.js + Express API│
│    localhost:5000    │
├──────────────────────┤
│ JWT Auth             │
│ PDFKit Invoices      │
│ Nodemailer           │
│ Multer Uploads       │
└──────────┬───────────┘
           │ SQL
           ▼
┌──────────────────────┐
│    PostgreSQL 16     │
│ users · tours        │
│ bookings · payments  │
│ reviews · promos     │
└──────────────────────┘
```

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, React Router, Vite |
| Backend | Node.js, Express.js |
| Database | PostgreSQL 16, `pg` |
| Authentication | JWT, bcryptjs |
| Documents | PDFKit |
| Email | Nodemailer |
| Uploads | Multer |
| Deployment | Docker, Docker Compose |

## 🗄️ Data Model

The PostgreSQL schema includes the following major entities:

- `users`
- `tours`
- `itineraries`
- `hotel_options`
- `vehicle_options`
- `promo_codes`
- `bookings`
- `payments`
- `reviews`

## 📁 Project Structure

```text
Tourium/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── database/
│   └── init.sql
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## ⚡ Quick Start with Docker

### Prerequisites

- Docker Desktop or Docker Engine
- Docker Compose

### Run

```bash
git clone https://github.com/oshadif/Tourium.git
cd Tourium
docker compose up --build
```

Then open:

- **Frontend:** `http://localhost:5173`
- **API health:** `http://localhost:5000/api/health`

Stop the stack with:

```bash
docker compose down
```

To remove the local database volume as well:

```bash
docker compose down -v
```

## 🔐 Demo Credentials

### Admin

```text
Email: admin@demo.com
Password: admin123
```

### Customer

```text
Email: customer@demo.com
Password: customer123
```

> These credentials are intended only for local/demo use. Do not reuse demo passwords in a production environment.

## ⚙️ Environment Configuration

Backend example:

```env
PORT=5000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/tour_booking
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
APP_URL=http://localhost:5173
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=bookings@example.com
```

Frontend example:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📧 Email Integration

SMTP configuration is optional. If SMTP credentials are not configured, confirmation messages fall back to backend console logging for development/demo purposes.

## 💳 Payment Safety

The included payment workflow is a **mock portfolio demonstration**. The application does **not** collect or store real card details.

Before production use, integrate an approved payment provider such as PayHere, Stripe or another licensed gateway and follow the provider's security requirements.

## 🚢 Production Checklist

For a real deployment:

- Replace all demo credentials
- Generate a strong `JWT_SECRET`
- Use a managed or securely administered PostgreSQL service
- Configure HTTPS and a reverse proxy
- Restrict CORS to approved origins
- Configure production SMTP
- Replace mock payments with an approved payment gateway
- Move uploaded media to object storage such as S3-compatible storage
- Add database backups and restore testing
- Add rate limiting, structured logging and monitoring
- Add automated unit/integration/end-to-end tests

## 🗺️ Roadmap

- [ ] Live cloud deployment
- [ ] Production payment-gateway integration
- [ ] Automated test suite
- [ ] CI/CD workflow
- [ ] Object-storage integration
- [ ] Booking availability calendar
- [ ] Advanced analytics dashboard
- [ ] Accessibility audit
- [ ] Mobile-first UX refinements

## 👩‍💻 Author

**Oshadi Vidumini Fernando**  
Software Engineer · Full-Stack & Mobile Developer  
GitHub: [@oshadif](https://github.com/oshadif)

---

<div align="center">

**Tourium — discover, book and manage travel experiences.**

⭐ If this project is useful, consider starring the repository.

</div>
