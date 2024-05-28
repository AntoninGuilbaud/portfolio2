document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    var nom = getElementVal('name');
    var mail = getElementVal('email');
    var message = getElementVal('message');

    // Validation des champs
    if (!nom || !mail || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    saveMessage(nom, mail, message);
}

const saveMessage = (nom, mail, message) => {
    fetch('https://us-central1-portfolio-antonin-guilbaud.cloudfunctions.net/sendEmailNotification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, mail, message }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Une erreur est survenue lors de l\'envoi du formulaire.');
        }
        return response.json();
    })
    .then(() => {
        document.getElementById("contactForm").reset();
        const checkElement = document.querySelector('.check');
        checkElement.style.display = 'flex';

        setTimeout(() => {
            checkElement.style.display = 'none';
        }, 3000);
        console.log('Email envoyé avec succès !');
    })
    .catch((error) => {
        console.error('Erreur:', error.message);
        alert('Une erreur est survenue, veuillez réessayer plus tard.');
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
