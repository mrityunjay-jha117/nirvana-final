# Image API

Base path: `/api/v1/image`

Router source: [src/routes/image.ts](../src/routes/image.ts)

## Purpose

Uploads an image to Cloudinary and returns the hosted URL.

## Endpoints

### POST `/upload`

Consumes `multipart/form-data`.

Form fields:

- `file`: the file to upload (must be a file field)

Behavior:

- Reads file bytes
- Base64 encodes
- Creates a signed Cloudinary upload request
- Applies transformation `q_auto,f_auto,w_1000`
- Uploads into folder `my_uploads`

Responses:

- `200` `{ url: string }`
- `400` `{ error: string }` when file is missing/invalid
- `500` `{ error: string, details: any }` on Cloudinary or request failure

## Required bindings

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
