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


// SLIDER AUTOMMATIQUE
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let slideWidth = slides[0].clientWidth; // Largeur d'une diapositive
let currentIndex = 1; // Commencer à la deuxième image (car la première est une duplication)
let autoSlideInterval;

const btnBackToTop = document.querySelector('.back-to-top-box')

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Fonction pour positionner le slider sur la bonne image
function updateSliderPosition() {
  slider.style.transition = 'none'; // Désactiver la transition pour un alignement direct
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Initialisation de la position du slider
updateSliderPosition();

// Fonction pour déplacer le slider avec transition
function moveSlider(index) {
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
}

// Réinitialise pour un effet infini
function resetSlider() {
  if (currentIndex === 0) {
    slider.style.transition = 'none'; // Désactiver la transition
    currentIndex = slides.length - 2; // Aller à la dernière image réelle
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  if (currentIndex === slides.length - 1) {
    slider.style.transition = 'none'; // Désactiver la transition
    currentIndex = 1; // Aller à la première image réelle
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
}

// Fonction pour aller à la slide suivante
function nextSlide() {
  moveSlider(currentIndex + 1);
}

// Fonction pour aller à la slide précédente
function prevSlide() {
  moveSlider(currentIndex - 1);
}

// Défilement automatique
function startAutoSlide() {
  if (!autoSlideInterval) {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }
}

// Arrête le défilement automatique
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;
}

// Gestion des événements pour les boutons
nextButton.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevButton.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

// Réinitialise la position après chaque transition
slider.addEventListener('transitionend', resetSlider);

// Gére la visibilité de l'onglet pour arrêter/reprendre l'animation
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoSlide();
  } else {
    startAutoSlide();
  }
});

// Gére le redimensionnement de l'écran
window.addEventListener('resize', () => {
  // Recalcule la largeur des slides
  slideWidth = slides[0].clientWidth;

  // Réaligne le slider à la position correcte
  updateSliderPosition();
});

// Initialisation
startAutoSlide();

//back to top script

document.addEventListener('scroll', () => {

  if (window.scrollY > 500) {
    btnBackToTop.style.opacity = "1"
  } else {
    btnBackToTop.style.opacity = "0"
  }
})

//back to top script

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


//  gére l'ouverture et la fermeture du modal
document.addEventListener("DOMContentLoaded", () => {
  const callTrigger = document.getElementById("callTrigger");
  const appSelector = document.getElementById("appSelector");
  const closeSelector = document.getElementById("closeSelector");

  // Ouvre le modal au clic sur l'icône d'appel
  callTrigger.addEventListener("click", (event) => {
    event.preventDefault(); // Empêche le comportement par défaut
    appSelector.style.display = "flex";
  });

  // Ferme le modal au clic sur le bouton Annuler
  closeSelector.addEventListener("click", () => {
    appSelector.style.display = "none";
  });

  // Ferme le modal si on clique en dehors de son contenu
  window.addEventListener("click", (event) => {
    if (event.target === appSelector) {
      appSelector.style.display = "none";
    }
  });
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

      // Réinitialise le champ email après inscription
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
