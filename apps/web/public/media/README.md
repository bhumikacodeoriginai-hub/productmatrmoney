# Advaita web media assets

This folder is for small presentation/demo assets only.

For the current dashboard spotlight, add files under:

`profiles/ananya/advaithamatrimony.mp4`

Optional:

- `profiles/ananya/ananya-intro-poster.webp`
- `profiles/ananya/ananya-01.webp`
- `profiles/ananya/ananya-02.webp`
- `profiles/ananya/ananya-03.webp`

Use an optimized MP4/H.264 file for demos. Real member media must use private S3/CDN storage and signed access URLs; do not commit private production media to Git.


The dashboard, discovery deck and profile gallery use this exact path, so replacing the MP4 here updates the web experience without changing component code. The Expo preview uses the same public Git asset through `apps/mobile/lib/media.ts`.