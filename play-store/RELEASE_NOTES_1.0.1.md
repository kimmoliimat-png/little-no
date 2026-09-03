# LITTLE NO v1.0.1

Patch for the Play Store internal-test build.

## What broke

1.0.0 opened as a blank cream screen on phones. The signed bundle loaded, then Android WebView refused to run Vite's `type="module"` script from `file://`.

## What 1.0.1 does

- Inlines the game into a single HTML file (classic `<script>`, not ES modules)
- Loads it with `loadDataWithBaseURL` so WebView actually executes it
- versionCode **2** / versionName **1.0.1**

## Play Console

Create a **new** internal test release. Upload the 1.0.1 `.aab`. Do not reuse 1.0.0.

Release notes to paste:

```
<en-US>
Fix: the game was a blank screen on phones. Playable now.
</en-US>
```
