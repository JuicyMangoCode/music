const user = 'JuicyMangoCode';
const repo = 'music';
const branch = 'main';

const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/music_assets?ref=${branch}`;
const directoriesJsonUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/directories.json`;

let allFiles = [];
let shortenedLinks = {};

fetch(directoriesJsonUrl)
	.then((res) => res.json())
	.then((data) => {
		shortenedLinks = data;
	})
	.catch((err) => {
		console.error('Failed to load directories.json:', err);
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

		const name = document.createElement('div');
		name.className = 'file-name';
		name.textContent = file.name;

		const actions = document.createElement('div');
		actions.style.display = 'flex';
		actions.style.gap = '0.75rem';

		const fullURL = `https://juicymangocode.github.io/music/music_assets/${file.name}`;

		const openLink = document.createElement('a');
		openLink.className = 'file-link';
		openLink.href = fullURL;
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
			const shortURLObj = shortenedLinks[file.name];
			if (shortURLObj && shortURLObj.short_url) {
				navigator.clipboard.writeText(shortURLObj.short_url).then(() => {
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

// Load file list
fetch(apiUrl)
	.then((res) => res.json())
	.then((data) => {
		allFiles = data.filter((f) => {
			const name = f.name.toLowerCase();
			return name.endsWith('.mp3') || name.endsWith('.ogg');
		});
		displayFiles(allFiles);
	})
	.catch((err) => {
		console.error(err);
		document.getElementById('music-list').textContent = 'Failed to load file list.';
	});

// Search logic
document.getElementById('search').addEventListener('input', function () {
	const query = this.value.toLowerCase();
	const filtered = allFiles.filter((file) =>
		file.name.toLowerCase().includes(query)
	);
	displayFiles(filtered);
});
