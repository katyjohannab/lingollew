function loadFlashcards() {
    const type = document.querySelector('input[name="flashcardType"]:checked').value;
    const selectedUnits = Array.from(document.querySelectorAll('#unit-options input:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('#category-options input:checked')).map(cb => cb.value);

    fetch('../data/flashcardsData.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('flashcards-container');
            container.innerHTML = '';

            let cards = [];
            if (type === 'mutations') {
                cards = data.mutations;
            } else {
                selectedUnits.forEach(unit => {
                    selectedCategories.forEach(category => {
                        cards = cards.concat(data[`${unit}_${category}`]);
                    });
                });
            }

            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('flashcard');
                cardElement.innerHTML = `
                    <div class="flashcard-content">
                        <p>${card.welsh}</p>
                        <button onclick="playAudio('${card.welsh}')">Hear</button>
                        ${card.explanation ? `<button onclick="explain('${card.explanation}')">Explain</button>` : ''}
                    </div>
                    <div class="flashcard-content">
                        <p>${card.english}</p>
                    </div>
                `;
                container.appendChild(cardElement);
            });
        });
}

function shuffleFlashcards() {
    const container = document.getElementById('flashcards-container');
    for (let i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}

function restartFlashcards() {
    document.querySelector('input[name="flashcardType"][value="units"]').checked = true;
    document.querySelectorAll('#unit-options input, #category-options input').forEach(cb => cb.checked = false);
    document.getElementById('flashcards-container').innerHTML = '';
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
