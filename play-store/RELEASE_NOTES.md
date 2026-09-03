# LITTLE NO v1.0.0

**It said no.** First Play Store release.

A dumpling walks forward forever. You rewrite the candy room.

## Ship identity

| Field | Value |
|---|---|
| App name | LITTLE NO |
| Version | 1.0.0 (versionCode 1) |
| Application ID | `game.littleno.app` |
| Category | Game → Puzzle |
| Price | Free. No ads. No IAP. |
| Target API | 36 (Android 16) |
| Min API | 24 |
| Orientation | Portrait |

## What's in this release

- 100 unique rooms (Kitchen, Winter Lodge, Jungle Lodge, Summer Lodge)
- Squishmallow dumpling with a pink bow and swirl lollipop
- Candy-gloss art: cookie boards, peppermint fans, macaron lids
- Undo, restart, stars, local save
- Offline Android App Bundle
- One-thumb portrait play

## Play Console files in this repo

| Need | Path |
|---|---|
| Upload guide | [play-store/UPLOAD_TO_PLAY.md](../play-store/UPLOAD_TO_PLAY.md) |
| Listing copy | [play-store/PLAY_STORE_LISTING.txt](PLAY_STORE_LISTING.txt) |
| Data safety | [play-store/DATA_SAFETY.txt](DATA_SAFETY.txt) |
| Content rating | [play-store/IARC_CONTENT_RATING.txt](IARC_CONTENT_RATING.txt) |
| Store settings | [play-store/STORE_SETTINGS.txt](STORE_SETTINGS.txt) |
| Privacy policy | [legal/PRIVACY_POLICY.html](../legal/PRIVACY_POLICY.html) |
| Marketing kit | [play-store/MARKETING_KIT.md](MARKETING_KIT.md) |
| Android wrapper | [android/](../android/) |

Graphics, the signed `.aab`, and the upload keystore are **not** committed (the repo is public; a signing key on GitHub is how apps get stolen). Keep the keystore from the local Play Store zip offline.

## First-release checklist

- [ ] Play developer account paid and verified
- [ ] Create app: LITTLE NO, Game, Puzzle, free
- [ ] Upload icon + feature graphic + 4+ phone screenshots
- [ ] Paste listing copy
- [ ] Host privacy policy on HTTPS and paste the URL
- [ ] Data safety: collects nothing
- [ ] Content rating: Everyone
- [ ] Ads: no. IAP: none. App access: no login
- [ ] Upload the `.aab` to internal testing
- [ ] Enroll in Play App Signing
- [ ] Keystore backed up offline
