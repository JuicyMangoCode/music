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
    card.tabIndex = 0; // accessibility

    const name = document.createElement('div');
    name.className = 'file-name';
    name.title = file.name;

    const meta = shortenedLinks[file.name];
    name.textContent = meta?.title || file.name;

    const actions = document.createElement('div');
    actions.className = 'file-actions';

    const fullURL = `https://juicymangocode.github.io/music/music_assets/${file.name}`;
    const shortURL = meta?.short_url;

    const openLink = document.createElement('a');
    openLink.className = 'file-link';
    openLink.href = shortURL || fullURL;
    openLink.target = '_blank';
    openLink.rel = 'noopener noreferrer';
    openLink.textContent = shortURL ? 'Open Shortened' : 'Open';

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
