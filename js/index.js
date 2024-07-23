document.addEventListener('DOMContentLoaded', () => {
    // Toggle Navbar for mobile view
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('hidden');
    });

    // Language toggle functionality
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
        setLanguage(storedLang === 'cy');
    }

    document.getElementById('toggleLanguage').addEventListener('click', () => {
        const isCymraeg = document.getElementById('toggleLanguage').innerText === 'Cymraeg';
        setLanguage(isCymraeg);
        localStorage.setItem('language', isCymraeg ? 'cy' : 'en');
    });

    function setLanguage(isCymraeg) {
        const langElements = document.querySelectorAll('.lang');
        langElements.forEach(el => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.innerText = isCymraeg ? el.getAttribute('data-cy') : el.getAttribute('data-en');
                el.style.opacity = 1;
            }, 300);
        });
        document.getElementById('toggleLanguage').innerText = isCymraeg ? 'English' : 'Cymraeg';
    }

    // Amazon Polly Text-to-Speech Function
    function synthesizeSpeech(text, language = 'welsh') {
        AWS.config.region = 'eu-west-2';
        AWS.config.credentials = new AWS.Credentials('AKIAVRUVVGBB7E2WU6EL', 'HSCO8NnICJaU03F3ztyFiQhBPz8lDxkTMGx++a2N');
        var polly = new AWS.Polly();
        var params = {
            OutputFormat: 'mp3',
            Text: text,
            VoiceId: language === 'welsh' ? 'Gwyneth' : 'Geraint',
            TextType: 'text'
        };
        polly.synthesizeSpeech(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                var uInt8Array = new Uint8Array(data.AudioStream);
                var arrayBuffer = uInt8Array.buffer;
                var blob = new Blob([arrayBuffer]);
                var url = URL.createObjectURL(blob);
                var audio = new Audio(url);
                audio.play();
            }
        });
    }

    // Example of attaching TTS function to buttons
    document.querySelectorAll('.tts-button').forEach(button => {
        button.addEventListener('click', () => {
            const textElement = document.querySelector(button.getAttribute('data-target'));
            synthesizeSpeech(textElement ? textElement.innerText : '');
        });
    });
});

