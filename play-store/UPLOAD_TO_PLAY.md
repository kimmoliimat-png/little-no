# Upload LITTLE NO v1.0.0 to Google Play

Google Play does **not** accept a website. You upload an Android App Bundle (`.aab`).

## 1. Developer account

1. Pay the Play developer fee if you have not.
2. Verify your identity if Play asks.
3. Create app: **LITTLE NO**, type **Game**, category **Puzzle**, free.

## 2. Graphics → Play Console

Use the files from the Play Store zip (graphics are not in this public repo):

| Play Console field | File | Size |
|---|---|---|
| App icon | `graphics/icon-512.png` | 512×512 PNG, 32-bit |
| Feature graphic | `graphics/feature-graphic-1024x500.png` | 1024×500, no alpha |
| Phone screenshots | `graphics/screenshots/phone/` | 1080×1920, 8 shots |
| Phone landscape | `graphics/screenshots/phone-landscape/` | 1920×1080 |
| 7-inch tablet | `graphics/screenshots/7inch/` | 1200×1920 |
| 10-inch tablet | `graphics/screenshots/10inch/` | 1600×2560 |
| Promo video | `graphics/promo-video.mp4` | YouTube URL |

## 3. Text → Play Console

Paste from this folder:

1. App name: **LITTLE NO**
2. Short + full description + promo + what’s new → `PLAY_STORE_LISTING.txt`
3. Category: Game → Puzzle
4. Data safety → `DATA_SAFETY.txt`
5. Content ratings → `IARC_CONTENT_RATING.txt`
6. Other settings → `STORE_SETTINGS.txt`
7. Privacy policy URL: host [`legal/PRIVACY_POLICY.html`](../legal/PRIVACY_POLICY.html) on HTTPS

GitHub Pages: Settings → Pages → Deploy from branch `main`, then
`https://kimmoliimat-png.github.io/little-no/legal/PRIVACY_POLICY.html`

## 4. Binary

Play Console → Testing → Internal testing → upload the signed `.aab`.

- Application ID: `game.littleno.app`
- Version name: `1.0.0` / versionCode `1`
- Target SDK 36, min SDK 24, portrait

Enroll in **Play App Signing**. Do not commit the upload keystore.

## Reviewer notes

Single-player candy physics puzzle. Offline. No account, no ads, no IAP. The word “No” is the dumpling’s only line.
