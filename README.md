# Vertexa

Vertexa is a React/Vite client and an Express API. Deploy them as two separate
Vercel projects from this repository:

| Project | Vercel Root Directory | Build/output |
| --- | --- | --- |
| Client | `client` | `npm run build` / `dist` |
| API | `server` | Configured by `server/vercel.json` |

## Required services

- Clerk for sign-in and the `premium` plan.
- Neon Postgres (or another provider compatible with the Neon serverless driver).
- Google Gemini, Clipdrop, and Cloudinary for the corresponding AI tools.

Run [`server/schema.sql`](./server/schema.sql) against the production database
before using the API.

## Vercel environment variables

Set these in the **API** Vercel project (Production and any environments you
intend to use):

- `CLIENT_URL`: the exact client origin, without a trailing slash. Multiple
  origins can be comma-separated.
- `CLERK_SECRET_KEY`
- `DATABASE_URL`
- `GEMINI_API_KEY`
- `CLIPDROP_API_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Set these in the **Client** project:

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_BASE_URL`: the API origin, without a path or trailing slash.

`VITE_` variables are embedded in the public client bundle; never put secrets
in them. Add the client domain to Clerk's allowed origins and configure the
Clerk `premium` plan used by the app. Vercel supplies `VERCEL` and `PORT`.

If the API deployment returns a Vercel 500, confirm the API project's root
directory is `server`, set the API environment variables above for the
deployment environment, and redeploy. Open the API project's root URL to check
that the function responds; browser requests from the client also require a
correct `CLIENT_URL`.

For local development, copy `client/.env.example` to `client/.env` and
`server/.env.example` to `server/.env`, then replace the placeholder values.
Start the API with `npm run server` from `server`, and the client with
`npm run dev` from `client`.
