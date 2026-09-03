# LITTLE NO

**v1.0.1** — [Play Store pack](play-store/README.md) · [1.0.1 notes](play-store/RELEASE_NOTES_1.0.1.md)

A dumpling walks forward forever. You never steer it. Look at the room. Change one thing.

LITTLE NO is a one-thumb puzzle: a squishmallow dumpling with a pink bow and a lollipop walks on its own. Tap fans, boards, lids, magnets, and belts so it reaches **OUT**. One hundred rooms across kitchen, winter, jungle, and summer.

## Play

```
npm install
npm run dev
```

Open the local URL, tap **Play**. Progress is saved in the browser.

## Current store build

| | |
|---|---|
| Version | **1.0.1** (versionCode 2) |
| Application ID | `game.littleno.app` |
| Category | Game → Puzzle |
| Price | Free. No ads. No IAP. |

1.0.0 was a blank cream screen on phones (WebView blocked the game script). 1.0.1 inlines the game so it actually runs. Upload a **new** internal test release — do not reuse 1.0.0.

Store listing copy lives in [`play-store/`](play-store/). Privacy policy: [`legal/PRIVACY_POLICY.html`](legal/PRIVACY_POLICY.html).

The signed `.aab` and **upload keystore** stay out of this public repo.

## Controls

Tap what you want to change. Never tap the dumpling.
