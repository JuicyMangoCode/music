# 🎵 Music Assets for GMod `sound.PlayURL`

This repository serves as a storage hub for **direct MP3 files** intended for use with [`sound.PlayURL`](https://wiki.facepunch.com/gmod/sound.PlayURL) in **Garry's Mod**. All uploaded files are optimized for fast and reliable streaming directly into clients via GitHub Pages.

---

## ⚙️ How It Works

This project uses a **custom Python script** to automate the following:

1. **Download** YouTube videos via `yt_dlp`
2. **Convert** the audio to `.mp3`
3. **Base64-encode** the filename to ensure uniqueness and URL safety
4. **Upload** the file to this repository under the `music_assets/` directory via the GitHub API

---

## 📁 File Structure
music/
├── music_assets/
│ ├── <base64_name>.mp3
├── index.html
├── README.md


---

## 🖥️ Frontend Interface

A styled HTML UI is included to:

- Search and browse all uploaded `.mp3` files
- **Open** the file directly in a new tab
- **Copy** a direct streaming link (e.g. for use in GMod Lua)

Live site: [https://juicymangocode.github.io/music/](https://juicymangocode.github.io/music/)

---

## 🎮 Using in Garry's Mod

You can stream any uploaded sound using Lua:

Example:
```lua
sound.PlayURL("https://juicymangocode.github.io/music/music_assets/<base64_name>.mp3", "", function(station)
    if IsValid(station) then
        station:Play()
    end
end)
```
