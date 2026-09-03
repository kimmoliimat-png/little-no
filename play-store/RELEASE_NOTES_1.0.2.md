# LITTLE NO v1.0.2

1.0.1 was still blank. The game script ran in `<head>` before `#root` existed, so it threw `missing #root`.

1.0.2 moves the script to the end of `<body>` and loads `file:///android_asset/www/index.html` (versionCode 3).
