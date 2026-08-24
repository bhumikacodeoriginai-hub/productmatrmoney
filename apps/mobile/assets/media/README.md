# Advaita mobile media assets

This folder is for small bundled presentation/demo assets for the Expo app.

The Expo dashboard product introduction reads the same Git-managed source through `apps/mobile/lib/media.ts`. The video starts muted for platform autoplay rules; users can tap the volume control to hear its AAC audio. For offline native bundling, place the MP4 and poster in this folder and switch those constants to static Expo asset sources.