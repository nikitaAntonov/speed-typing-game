const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random',
	quoteDisplayElement = document.querySelector('#quoteDisplay'),
	quoteInputElement = document.querySelector('#quoteInput'),
	timer = document.querySelector('#timer');

quoteInputElement.addEventListener('input', () => {
	const arrQuote = quoteDisplayElement.querySelectorAll('span'),
		arrValue = quoteInputElement.value.split('');

	let correct = true;

	arrQuote.forEach((charSpan, index) => {
		const char = arrValue[index];

		if (char == null) {
			charSpan.classList.remove('correct');
			charSpan.classList.remove('incorrect');
			correct = false;
		} else if (char === charSpan.innerText) {
			charSpan.classList.add('correct');
			charSpan.classList.remove('incorrect');
		} else {
			charSpan.classList.remove('correct');
			charSpan.classList.add('incorrect');
			correct = false;
		}
	});

	if (correct) renderNextQuote();
});

let getRandomQuotes = function() {
	return fetch(RANDOM_QUOTE_API_URL).then((res) => res.json()).then((data) => data.content);
};

async function renderNextQuote() {
	const quote = await getRandomQuotes();
	quoteDisplayElement.innerHTML = '';

	quote.split('').forEach((char) => {
		const charSpan = document.createElement('span');
		charSpan.innerText = char;

		quoteDisplayElement.appendChild(charSpan);
	});

	quoteInputElement.value = null;
	startTimer();
}

let startTime;
function startTimer() {
	timer.innerText = 0;
	startTime = new Date();
	setInterval(() => {
		timer.innerText = getTimer();
	}, 1000);
}

function getTimer() {
	return Math.floor((new Date() - startTime) / 1000);
}

renderNextQuote();
