document.getElementById('toggle-lang').addEventListener('click', function() {
    let currentLang = this.innerText;
    if (currentLang === 'Cymraeg') {
        this.innerText = 'English';
        document.querySelector('h1').innerText = 'Croeso i Ap Dysgu Cymraeg';
    } else {
        this.innerText = 'Cymraeg';
        document.querySelector('h1').innerText = 'Welcome to the Welsh Language Learning App';
    }
});


