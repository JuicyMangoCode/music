[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/JuicyMangoCode/music?color=blue)](https://github.com/JuicyMangoCode/music/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/JuicyMangoCode/music?color=orange)](https://github.com/JuicyMangoCode/music)
[![Issues](https://img.shields.io/github/issues/JuicyMangoCode/music?color=purple)](https://github.com/JuicyMangoCode/music/issues)

# 🎵 JuicyMango GMod Music Assets

A modern and automated repository for hosting `.ogg` music files used with [`sound.PlayURL`](https://wiki.facepunch.com/gmod/sound.PlayURL) in **Garry's Mod**. All files are streamed directly from **GitHub Pages**, ensuring fast, reliable playback in-game.

> Powered by a dynamic FastAPI backend and streamlined developer tools.

---

## 🌐 Live Demo

**Website:**  
🔗 [https://juicymangocode.github.io/music/](https://juicymangocode.github.io/music/)

**Backend Upload Server:**  
🔗 https://mango-music-service.willard.network/

---

## ⚙️ How It Works

The full pipeline is powered by a custom **Python FastAPI** backend with Docker containerization:

1. 🎥 **Download Audio** from YouTube using `yt-dlp`
2. 🔄 **Convert** to `.ogg` using `ffmpeg` 
3. 🧠 **Intelligently Rename** with sanitized and conflict-free filenames
4. 📉 **Compress if Necessary** to meet streaming size requirements (24.5MB limit)
5. 🚀 **Upload to GitHub** via the GitHub API (`music_assets/` folder)
6. 🔗 **Shorten URLs** using the TinyURL API
7. 📁 **Track Metadata** in `directories.json` for easy retrieval

All uploads are managed through asynchronous background tasks with proper authentication and error handling.

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

## 🔧 API Features

The FastAPI backend provides comprehensive endpoints for:

- 📤 **Bulk Upload** from YouTube URLs with optional custom naming
- 🗑️ **Delete** songs from the repository
- 🔄 **Replace** existing songs with new versions
- ✏️ **Rename** songs in the metadata
- 🎫 **Token Management** for authentication
- 📊 **Task Status** monitoring for long-running operations

All operations are authenticated using Bearer tokens and run as background tasks for optimal performance.

---

## 🐳 Docker Deployment

The service runs in a containerized environment with:

- **Python 3.11+** runtime
- **FastAPI** web framework
- **FFmpeg** for audio processing
- **yt-dlp** for YouTube downloads
- Environment-based configuration

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

## ❤️ Special Thanks

To the open-source community, contributors, and the GMod development scene for keeping Lua weird and wonderful.
