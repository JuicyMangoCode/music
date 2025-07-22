[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/JuicyMangoCode/music?color=blue)](https://github.com/JuicyMangoCode/music/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/JuicyMangoCode/music?color=orange)](https://github.com/JuicyMangoCode/music)
[![Issues](https://img.shields.io/github/issues/JuicyMangoCode/music?color=purple)](https://github.com/JuicyMangoCode/music/issues)

# 🎵 JuicyMango GMod Music Assets

A modern and automated repository for hosting `.ogg` music files used with [`sound.PlayURL`](https://wiki.facepunch.com/gmod/sound.PlayURL) in **Garry's Mod**. All files are streamed directly from **GitHub Pages**, ensuring fast, reliable playback in-game.

> Powered by a dynamic backend and streamlined developer tools.

---

## 🌐 Live Demo

**Website:**  
🔗 [https://juicymangocode.github.io/music/](https://juicymangocode.github.io/music/)

**Backend Upload Server:**  
🔗 [`https://90fa39d8-...replit.dev/`](https://90fa39d8-1c84-4210-a37d-b8ac10d057eb-00-1r97ja0zizqg4.pike.replit.dev/)

---

## ⚙️ How It Works

The full pipeline is powered by a custom Node.js + Express backend:

1. 🎥 **Download Audio** from YouTube using `yt-dlp`
2. 🔄 **Convert** to `.ogg` using `ffmpeg`
3. 🧠 **Intelligently Rename** with sanitized and conflict-free filenames
4. 📉 **Compress if Necessary** to meet streaming size requirements
5. 🚀 **Upload to GitHub** via the GitHub API (`music_assets/` folder)
6. 🔗 **Shorten URLs** using the TinyURL API
7. 📁 **Track Metadata** in `directories.json` for easy retrieval

All uploads are dynamically managed, with built-in locking to prevent API spam or concurrent conflicts.

---

## 🖥️ Web Interface Features

The frontend provides a clean, responsive UI:

- 🔍 **Searchable Audio List**
- 🎧 **Preview** any track directly in-browser
- 🔗 **Copy Full or Shortened URL**
- 📱 **Mobile-Friendly Design**
- 🧠 **Backed by `directories.json` metadata index**

> The site is automatically updated when new tracks are uploaded.

---

## 🎮 Using Audio in GMod

### Basic Lua Example
```lua
sound.PlayURL("https://tinyurl.com/example123", "", function(station)
    if (IsValid(station)) then
        station:Play()
    end
end)
```
---

🔐 Secure & Smart Uploads
🧩 Uploads are blocked while one is in progress
✅ Filename deduplication and TinyURL reuse for existing files
🔐 .env-based secret management for API tokens
🚫 Automatically rejects malformed YouTube links

❤️ Special Thanks
To the open-source community, contributors, and the GMod development scene for keeping Lua weird and wonderful.
