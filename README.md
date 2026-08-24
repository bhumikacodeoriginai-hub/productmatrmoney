# Advaita Matrimony

Frontend-only client presentation prototype for Advaita Matrimony. The workspace contains a Next.js App Router web experience, an Expo Router React Native mobile experience, and shared TypeScript domain types/mock contracts.

## Apps

- `apps/web` — public marketing pages, auth/OTP mock, progressive onboarding, customer dashboard, discovery/profile/interests/shortlist/viewed/messages/settings/notifications, and the separate admin dashboard at `/admin`.
- `apps/mobile` — Expo Router scaffold with a native splash, safe-area handling, bottom tabs, native home/discover/matches/messages/profile screens, and a profile detail route.
- `packages/shared` — shared brand constants and domain types for future API integration.

## Run the web preview

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Useful demo routes include `/`, `/login`, `/onboarding`, `/app`, `/app/discover`, `/app/messages`, `/app/profile/rhea`, and `/admin`.

## Run the mobile preview

```bash
npm install
npm run start --workspace @advaita/mobile
```

Use Expo Go or an Android/iOS simulator. The mobile UI is intentionally native rather than a responsive copy of the website.

## Scope notes

All data, authentication, OTP, interests, messages, membership buttons, support submission and admin actions are frontend mocks. No production database, API, file storage, OTP provider, payment provider, moderation service or cloud deployment is included in this milestone. Remote Unsplash images are presentation placeholders and should be replaced with approved optimized assets before release.

## QA checklist

The primary manual review path is: landing intro → navigation → login/OTP mock → onboarding step progression → dashboard → discover search/filter → profile actions → interests → messaging → notifications/settings → admin member approval. Review widths from 320px through desktop widths, keyboard focus, visible labels, reduced-motion mode, and native safe-area layouts before client approval.
