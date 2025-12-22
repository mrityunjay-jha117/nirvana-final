# Configuration & Environment Variables

## Where configuration lives

- Worker config: [wrangler.jsonc](../wrangler.jsonc)
- Code bindings shape: [src/index.ts](../src/index.ts)

## Required bindings

### Database

- `DATABASE_URL`
  - PostgreSQL connection string used by Prisma.

### Auth

- `JWT_SECRET`
  - Secret used to sign and verify JWTs.

### Cloudinary

Used by [src/routes/image.ts](../src/routes/image.ts):

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Gemini

Used by [src/routes/gemini.ts](../src/routes/gemini.ts):

- `GEMINI_API`

## Updating values

In development, Wrangler uses values from your config and/or `wrangler dev` environment.

For deployment, set real values via Wrangler/Cloudflare dashboard. The repository config contains placeholders and should not be treated as production secrets.
