# Changelog

## 1.0.2 — 2026-09-03

Fix: 1.0.1 was still a blank screen.
The game script ran in `<head>` before `#root` existed (`missing #root`).
Script now runs at the end of `<body>`. Loads `file:///android_asset/www/index.html`.
versionCode 3.

## 1.0.1 — 2026-09-03

Fix: Play Store install was a blank cream screen.
Android WebView would not run Vite `type="module"` from `file://`.
The game is now one inlined HTML file (versionCode 2).

## 1.0.0 — 2026-09-03

First Play Store release.

- 100 unique rooms with distinct puzzle logic
- Kitchen, Winter Lodge, Jungle Lodge, Summer Lodge
- Squishmallow dumpling with a pink bow and lollipop
- Candy-gloss art pass
- Top HUD so buttons do not cover the room
- Undo, stars, local save
