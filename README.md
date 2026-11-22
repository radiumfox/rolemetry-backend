# Rolemetry

> ⚠️ Development stage — not ready for production use.

AI-powered ATS (Applicant Tracking System) score calculator. Upload a CV in `.pdf`, `.docx`, or `.txt` and get an ATS compatibility score calculated against a job description.

Built with Express 5, TypeScript, Pg-Promise, and PostgreSQL.

## Setup from a fresh checkout

```bash
pnpm install
docker compose up -d
pnpm migrate up
pnpm dev
```

Requires a `.env` file with `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rolemetry` for local development.

## Database

Start the PostgreSQL database with Docker Compose:

```bash
docker compose up -d
```

This creates a `rolemetry` database with user `postgres` / password `postgres`, exposed on port `5432`.

To stop it:

```bash
docker compose down
```

To stop and remove the container **and** its data volume:

```bash
docker compose down -v
```

## Production with Supabase

`docker-compose.yml` is for local development only. In production, provide configuration through deployment environment variables and keep production credentials out of the repository.

For this low-traffic app, use one Supabase direct connection for both the app and migrations:

```text
DATABASE_URL="postgresql://postgres:<url-encoded-password>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require"
```

- URL-encode the database password inside `DATABASE_URL`; for example, `@` becomes `%40`.
- Set `NODE_ENV=production`. SSL is controlled by `sslmode` in `DATABASE_URL`; use `verify-full` for certificate verification, or `uselibpqcompat=true&sslmode=require` for libpq-style `require`.
- Run `pnpm migrate up` once before starting the new app version; do not run migrations from every app instance.