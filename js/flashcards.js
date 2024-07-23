function loadFlashcards(type) {
    const file = type === 'units' ? '../data/flashcardsData.json' : '../data/mutations.json';
    fetch(file)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('flashcards-container');
            container.innerHTML = '';
            const cards = type === 'units' ? data.unit1_vocab : data.mutations;
            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('flashcard');
                cardElement.innerHTML = `
                    <div class="flashcard-content">
                        <p>${card.welsh}</p>
                        <button onclick="playAudio('${card.welsh}')">Hear</button>
                    </div>
                    <div class="flashcard-content">
                        <p>${card.english}</p>
                        ${type === 'mutations' ? `<button onclick="explain('${card.explanation}')">Explain</button>` : ''}
                    </div>
                `;
                container.appendChild(cardElement);
            });
        });
}

function playAudio(text) {
    AWS.config.region = 'eu-west-2';
    AWS.config.credentials = new AWS.Credentials('AKIAVRUVVGBB7E2WU6EL', 'HSCO8NnICJaU03F3ztyFiQhBPz8lDxkTMGx++a2N');
    var polly = new AWS.Polly();
    var params = {
        OutputFormat: 'mp3',
        Text: text,
        VoiceId: 'Gwyneth',
        TextType: 'text'
    };
    polly.synthesizeSpeech(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
            var audio = new Audio(URL.createObjectURL(new Blob([data.AudioStream], { type: 'audio/mp3' })));
            audio.play();
        }
    });
}

function explain(explanation) {
    alert(explanation);
}
