# `eggplant-method` Architecture

## High-Level Overview

This project, codenamed `eggplant-method`, is an **"Inner Sanctum"** fortress. Its sole purpose is to act as a pure fulfillment engine for the "Viral 2 Step Method" course. It is architecturally identical to the `RevengeMoney` fortress, but has been evolved with a durable, 365-day token access model.

It does **not** handle payments directly. It receives fulfillment commands exclusively from the `service-connector` fortress after a successful purchase via Polar.sh.

## Internal Systems

The fortress is comprised of three primary systems:

1.  **The Public-Facing Facade:** The user interface, built with Next.js and Tailwind CSS. It consists of the landing page (`/`), a proof gallery (`/proof`), and the secure course access page (`/my-course/[courseId]`).

2.  **The Scriptorium (Fulfillment Engine):** A private API endpoint at `/api/internal/fulfillment-trigger`. This endpoint is secured by a shared secret. When it receives a valid request from `service-connector`, it generates a unique access token, stores it in Vercel KV with a 365-day expiration, and sends a branded access email via Resend.

3.  **The Gatehouse (Verification Engine):** A public API endpoint at `/api/verify-code`. This endpoint checks if a provided token is valid and corresponds to the correct `courseId`. It enforces a durable key model; tokens are valid for 365 days and are not destroyed on use.

## Data Flow

The operational flow follows the "Three Fortresses" model:

```mermaid
graph TD
    A[User Clicks "Get Video Now"] --> B{VendettaMachine Polar.sh Checkout};
    B --> C(Polar Webhook);
    C --> D[service-connector];
    D -- Translates & Forwards --> E[eggplant-method API];
    E -- 1. Stores Token --> F[(Vercel KV)];
    E -- 2. Dispatches Email --> G((Resend));
    G --> H[Customer Email];
    H -- Clicks Access Link --> I[Course Access Page];
    I -- Verifies Token --> E;
    E -- Confirms with --> F;
    I -- Displays Link --> J[(Google Drive)];
```
