Backend quickstart

1. Create a MongoDB Atlas cluster and a database user.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your Atlas connection string and set `JWT_SECRET`.
3. Install dependencies and start server:

```bash
cd backend
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
npm run start
```

The server will listen on the `PORT` you set (default 5000). Endpoints:
- POST `/api/auth/signup`  { name, email, password }
- POST `/api/auth/login`   { email, password }

Responses are JSON. The signup route returns `{ message, user, token }` on success.
