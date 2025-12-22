# Gemini API

Base path: `/api/v1/gemini`

Router source: [src/routes/gemini.ts](../src/routes/gemini.ts)

## Purpose

A thin proxy around Google’s Gemini generateContent endpoint.

## Endpoints

### POST `/generate`

Request body:

- `{ prompt: string }`

Responses:

- `200` `{ success: true, response: string }`
- `400` `{ error: string, details: string }` when prompt is missing
- Non-2xx from Google: `{ error: "Gemini API error", details: string }` with upstream status
- `500` request failure

## Required bindings

- `GEMINI_API` (Google API key)
