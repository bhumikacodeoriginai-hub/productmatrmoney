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


## Media-first experience update

The presentation layer now includes a consent-led media model for profile photos and short introductions. On the web, the landing page and member discovery surfaces include draggable Framer Motion cards, autoplay-muted video previews with pause controls, media galleries, privacy labels, daily recommendation prompts, and local preview of image/video uploads during onboarding. On native, the Expo app includes native `expo-video` previews, safe-area-aware animated discovery cards, press/swipe actions, dynamic profile detail media, and an intentional daily discovery loop.

This is still mock data. Replace the sample remote portrait/video URLs with owned, consented, compressed assets delivered through the future private media pipeline described in the proposal. Production must enforce the same visibility states server-side; UI labels alone are not access control.

The retention direction intentionally avoids manipulative streaks or noisy infinite feeds. It uses a small daily set of profiles, prompt-led conversation starts, privacy check-ins, profile-strength progress, and clear next actions. These are good candidates for real event instrumentation later: media_played, media_paused, interest_sent, shortlist_added, profile_prompt_answered, privacy_reviewed, and conversation_started.


## Performance and Bootstrap update

The web layer now uses Bootstrap 5.3.8 utilities/grid classes alongside the Advaita design tokens and custom brand components. This is not a legacy Bootstrap template: Bootstrap is used as a responsive foundation while the visual identity, dashboard cards, motion, media states and accessibility remain custom. The official Bootstrap guidance recommends the 5.3 line and selective optimization where possible.

Loading is improved by removing the render-blocking remote font import, showing the branded intro only once per browser session and shortening it, adding a lightweight Next loading skeleton, lazy-loading profile images, using `preload="none"` for non-feature videos, and limiting autoplay to the intentional dashboard spotlight/active discovery card. The dashboard now has a video introduction spotlight, animated card/media states, a media count badge and Bootstrap responsive spacing/grid utilities.
