# eggplant-method

A pure fulfillment engine for the "Viral Method" course, built as an "Inner Sanctum" fortress within the Three Fortresses model.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to create a `.env.local` file and add the following environment variables. These must also be configured in the Vercel project settings for deployment.

- `EGGPLANT_METHOD_INTERNAL_SECRET_KEY`: The shared secret for authenticating requests from the `service-connector`.
- `EGGPLANT_METHOD_RESEND_API_KEY`: The API key for the Resend email service.
- `KV_URL`: Vercel KV connection URL.
- `KV_REST_API_URL`: Vercel KV REST API URL.
- `KV_REST_API_TOKEN`: Vercel KV write/read token.
- `KV_REST_API_READ_ONLY_TOKEN`: Vercel KV read-only token.

## API Endpoints

This project contains two primary API endpoints:

-   `/api/internal/fulfillment-trigger`: A private endpoint that receives fulfillment requests from the `service-connector`, generates an access token, and sends the access email. Requires a `Bearer` token for authentication.
-   `/api/verify-code`: A public endpoint that verifies a user's access token and `courseId` before granting access to the course content.
