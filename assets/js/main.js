const user = 'JuicyMangoCode';
const repo = 'music';
const branch = 'main';
const baseURL = `https://${user}.github.io/${repo}/music_assets/`;
const directoriesJsonUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/directories.json`;

let allFiles = [];
let shortenedLinks = {};

fetch(directoriesJsonUrl)
  .then((res) => res.json())
  .then((data) => {
    shortenedLinks = data;

    // Convert directories.json into an array of file-like objects
    allFiles = Object.entries(data).map(([filename, meta]) => ({
      name: filename,
      title: meta.title || filename,
      short_url: meta.short_url || null,
    }));

    displayFiles(allFiles);
  })
  .catch((err) => {
    console.error('Failed to load directories.json:', err);
    document.getElementById('music-list').textContent = 'Failed to load file list.';
  });

function displayFiles(files) {
  const container = document.getElementById('music-list');
  container.innerHTML = '';

  if (files.length === 0) {
    container.innerHTML = '<p class="no-results">No matching audio files found.</p>';
    return;
  }

  files.forEach((file) => {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.tabIndex = 0;

    const name = document.createElement('div');
    name.className = 'file-name';
    name.title = file.name;
    name.textContent = file.title;

    const actions = document.createElement('div');
    actions.className = 'file-actions';

    const fullURL = baseURL + file.name;
    const shortURL = file.short_url;

    const openLink = document.createElement('a');
    openLink.className = 'file-link';
    openLink.href = shortURL || fullURL;
    openLink.target = '_blank';
    openLink.rel = 'noopener noreferrer';
    openLink.textContent = 'Open';

    const copyLink = document.createElement('a');
    copyLink.className = 'file-link';
    copyLink.href = '#';
    copyLink.textContent = 'Copy';
    copyLink.onclick = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(fullURL).then(() => {
        copyLink.textContent = 'Copied!';
        setTimeout(() => (copyLink.textContent = 'Copy'), 2000);
      }).catch(() => {
        copyLink.textContent = 'Failed!';
      });
    };

    const copyShortLink = document.createElement('a');
    copyShortLink.className = 'file-link';
    copyShortLink.href = '#';
    copyShortLink.textContent = 'Copy Shortened';
    copyShortLink.onclick = (e) => {
      e.preventDefault();
      if (shortURL) {
        navigator.clipboard.writeText(shortURL).then(() => {
          copyShortLink.textContent = 'Shortened Copied!';
          setTimeout(() => (copyShortLink.textContent = 'Copy Shortened'), 2000);
        }).catch(() => {
          copyShortLink.textContent = 'Failed!';
        });
      } else {
        copyShortLink.textContent = 'Not Found!';
        setTimeout(() => (copyShortLink.textContent = 'Copy Shortened'), 2000);
      }
    };

    actions.appendChild(openLink);
    actions.appendChild(copyLink);
    actions.appendChild(copyShortLink);

    card.appendChild(name);
    card.appendChild(actions);
    container.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = allFiles.filter((file) =>
    file.name.toLowerCase().includes(query) || (file.title && file.title.toLowerCase().includes(query))
  );
  displayFiles(filtered);
});
