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

    // Affiche le bloc contact
    showContactBtn.addEventListener("click", (event) => {
        event.preventDefault();
        contactBlock.classList.add("show");
        console.log("clicked");
    });

    // Cache le bloc contact
    closeContactBtn.addEventListener("click", () => {
        contactBlock.classList.remove("show");
        console.log("clicked");
    });
});
// Sélectionne les éléments

// pour la partie barre de recherche

document.addEventListener("DOMContentLoaded", function () {
    console.log("here");


    const showSearchBtn = document.getElementById("showSearch");
    const closeSearchBtn = document.getElementById("closeSearchBtn");
    const searchBlock = document.getElementById("searchBlock");
    // affiche la barre de recherche
    showSearchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        searchBlock.classList.add("show");
        console.log("clicked");
    });
    // cache la barre de recherche
    closeSearchBtn.addEventListener("click", () => {
        searchBlock.classList.remove("show");
        console.log("clicked");
    });
});

const form = document.getElementById('contact-form');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const closeNotification = document.getElementById('close-notification');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère les données du formulaire
    const formData = new FormData(form);
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
            notificationMessage.textContent = 'Message envoyé avec succès !';
            notification.classList.remove('hidden');
            notification.style.display = 'block';
        } else {
            // Affiche un message d'erreur
            notificationMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            notification.classList.remove('hidden');
            notification.style.display = 'block';
        }
    } catch (error) {
        // Affiche un message d'erreur si le serveur n'est pas accessible
        notificationMessage.textContent = 'Erreur réseau. Veuillez vérifier votre connexion.';
        notification.classList.remove('hidden');
        notification.style.display = 'block';
    }
});

// Ferme la notification lorsqu'on clique sur "OK"
closeNotification.addEventListener('click', () => {
    notification.style.display = 'none';
});