# Advaita web media assets

This folder is for small presentation/demo assets only.

For the homepage product introduction, keep the source under:

`profiles/ananya/advaithamatrimony.mp4`

Use the branded poster beside it:

`product/advaithamatrimony-poster.svg`

Use an optimized MP4/H.264 file for demos. The homepage starts it muted for browser autoplay rules; visitors can use the sound control to hear the AAC audio. Real member media must use private S3/CDN storage and signed access URLs; do not commit private production media to Git.

The public homepage uses this product asset and branded poster through `apps/web/lib/media.ts`. Customer profiles intentionally do not reference this video.