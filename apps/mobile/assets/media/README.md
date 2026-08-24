# Advaita mobile media assets

This folder is for small bundled presentation/demo assets for the Expo app.

For the current dashboard/discovery media, add the matching files under:

`profiles/ananya/advaithamatrimony.mp4`

Optional:

- `profiles/ananya/ananya-intro-poster.webp`
- `profiles/ananya/ananya-01.webp`
- `profiles/ananya/ananya-02.webp`
- `profiles/ananya/ananya-03.webp`

Keep web and mobile demo filenames identical so the frontend media mapping stays easy to maintain. Real member media must use private S3/CDN storage and signed access URLs; do not commit private production media to Git.


The current Expo preview reads this Git-managed web asset through `apps/mobile/lib/media.ts`, which keeps the web and mobile experiences in sync without duplicating a 2.5 MB file. For offline native bundling, place the same file in this folder and switch that constant to a static Expo asset source.