[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/JuicyMangoCode/music)](https://github.com/JuicyMangoCode/music/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/JuicyMangoCode/music)](https://github.com/JuicyMangoCode/music)
[![GitHub issues](https://img.shields.io/github/issues/JuicyMangoCode/music)](https://github.com/JuicyMangoCode/music/issues)

# 🎵 Music Assets for GMod `sound.PlayURL`

This repository serves as a dedicated **MP3 hosting hub** for use with [`sound.PlayURL`](https://wiki.facepunch.com/gmod/sound.PlayURL) in **Garry's Mod**. All files are hosted via **GitHub Pages** for fast, direct, and reliable client-side streaming.

---

## ⚙️ How It Works

A custom Python automation pipeline handles:

1. **Downloading** audio from YouTube via `yt_dlp`
2. **Converting** to `.mp3`
3. **Base64-encoding** filenames to ensure uniqueness and URL safety
4. **Uploading** to this GitHub repository under `music_assets/` via the GitHub API
5. **Generating shortened URLs** via TinyURL and saving them in `directories.json`

---

## 📁 File Structure
<pre>music/
├── music_assets/ # MP3 files with base64-encoded names
│   └── <base64_encoded_name>.mp3
├── index.html
├── directories.json # Maps filenames to TinyURLs
├── README.md</pre>


---

## 🖥️ Web Interface

A responsive and styled HTML frontend is included, allowing users to:

- 🔎 **Search** all uploaded `.mp3` files
- 🔗 **Open** audio files in a new tab
- 📋 **Copy** either the full direct URL or a **shortened TinyURL** for easy sharing or usage
- ✅ View-friendly on desktop and mobile

**Live site:**  
👉 [https://juicymangocode.github.io/music/](https://juicymangocode.github.io/music/)

---

## 🎮 Usage in Garry's Mod

To stream audio in GMod using Lua, use the `sound.PlayURL` function:

### Full URL Example:
```lua
sound.PlayURL("https://tinyurl.com/example123", "", function(station)
    if (IsValid(station)) then
        station:Play()
    end
end)
```
⚠️ Use shortened URLs only if they resolve to direct MP3 files. GMod requires the URL to point directly to a playable audio resource.

