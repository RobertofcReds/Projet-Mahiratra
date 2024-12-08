// Bouton menu navigation
const menubtn = document.querySelector('#toggle');
const navbar = document.querySelector('.header .navbar');

menubtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menubtn.classList.toggle('fa-times');
})

document.addEventListener("DOMContentLoaded", function () {
    // Notre code JavaScript ici
    console.log("here");

    const showContactBtn = document.getElementById("showContact");
    const closeContactBtn = document.getElementById("closeContactBtn");
    const contactBlock = document.getElementById("contactBlock");

    // Afficher le bloc contact
    showContactBtn.addEventListener("click", (event) => {
        event.preventDefault();
        contactBlock.classList.add("show");
        console.log("clicked");
    });

    // Cacher le bloc contact
    closeContactBtn.addEventListener("click", () => {
        contactBlock.classList.remove("show");
        console.log("clicked");
    });
});
// Sélectionner les éléments

// pour la partie barre de recherche

document.addEventListener("DOMContentLoaded", function () {
    console.log("here");


    const showSearchBtn = document.getElementById("showSearch");
    const closeSearchBtn = document.getElementById("closeSearchBtn");
    const searchBlock = document.getElementById("searchBlock");
    // afficher la barre de recherche
    showSearchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        searchBlock.classList.add("show");
        console.log("clicked");
    });
    // cacher la barre de recherche
    closeSearchBtn.addEventListener("click", () => {
        searchBlock.classList.remove("show");
        console.log("clicked");
    });
});

const myForm = document.getElementById('contact-forme');
const overlaye = document.getElementById('notificatione-overlay');
const notificationeMessage = document.getElementById('notificatione-message');
const closeNotificatione = document.getElementById('close-notificatione');

myForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère les données du formulaire
    const formData = new FormData(myForm);
    const data = Object.fromEntries(formData.entries());

    try {
        // Envoie les données au serveur
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Affiche un message de succès
            notificationeMessage.textContent = 'Message envoyé avec succès !';
            overlaye.classList.remove('hidden');
            overlaye.style.display = 'flex';
        } else {
            // Affiche un message d'erreur
            notificationeMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            overlaye.classList.remove('hidden');
            overlaye.style.display = 'flex';
        }
    } catch (error) {
        // Affiche un message d'erreur si le serveur n'est pas accessible
        notificationeMessage.textContent = 'Erreur réseau. Veuillez vérifier votre connexion.';
        overlaye.classList.remove('hidden');
        overlaye.style.display = 'flex';
    }
    // Réinitialise les champs du formulaire
    myForm.reset(); // Cette méthode vide tous les champs du formulaire
});

// Fermer la notificatione lorsqu'on clique sur "OK"
closeNotificatione.addEventListener('click', () => {
    overlaye.style.display = 'none';
});


document.getElementById('subscribeForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('emaile').value;

    try {
        const response = await fetch('http://localhost:3000/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Inscription réussie !',
                text: result.message,
            });

            // Réinitialiser le champ email après inscription
            document.getElementById('emaile').value = '';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: result.message,
            });
        }
    } catch (error) {
        console.error('Erreur :', error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite, veuillez réessayer plus tard.',
        });
    }
});
