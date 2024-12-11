// Bouton menu navigation
const menubtn = document.querySelector('#toggle');
const navbar = document.querySelector('.header .navbar');

menubtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menubtn.classList.toggle('fa-times');
})




document.addEventListener("DOMContentLoaded", function () {
  // Notre code JavaScript ici

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
  const showSearchBtn = document.getElementById("showSearch");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const searchBlock = document.getElementById("searchBlock");
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("icon-search");
  const notificatioResults = document.getElementById("notificatioResults");
  const notificatioMessage = document.getElementById("notificatioMessage");
  const prevResultBtn = document.getElementById("prevResult");
  const nextResultBtn = document.getElementById("nextResult");

  const searchableElements = document.querySelectorAll("h1, h2, h3, a");

  let results = [];
  let currentIndex = 0;

  // Fonction pour afficher la notificatio des résultats
  function showResultsNotificatio(message, resultsCount) {
    notificatioMessage.textContent = message;
    notificatioResults.classList.add("show");

    // Affiche ou masque les boutons de navigation en fonction des résultats
    if (resultsCount === 0) {
      prevResultBtn.style.display = "none";
      nextResultBtn.style.display = "none";
      notificatioResults.style.backgroundColor = "#f44336"; // Mettre en rouge
      // Disparaît automatiquement après 3 secondes
      setTimeout(() => {
        notificatioResults.classList.remove("show");
      }, 3000);
    } else {
      prevResultBtn.style.display = "inline-block";
      nextResultBtn.style.display = "inline-block";
      notificatioResults.style.backgroundColor = ""; // Restaure la couleur par défaut
      notificatioMessage.textContent = `${message} (${currentIndex + 1}/${resultsCount})`;
    }
  }

  // Fonction pour naviguer vers un résultat donné
  function navigateToResult(index) {
    if (index < 0 || index >= results.length) return;
    currentIndex = index;

    // Scroll vers le résultat sélectionné
    results[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });

    // Mis à jour la notificatio
    showResultsNotificatio("Résultats trouvés", results.length);
  }

  // Recherche principale
  function searchContent() {
    const query = searchInput.value.toLowerCase();
    searchInput.value = ""; // Vider la barre après recherche
    searchableElements.forEach((el) => el.classList.remove("highlight"));

    if (query.trim() === "") return;

    results = [];
    currentIndex = 0;

    // Cherche tous les éléments correspondants
    for (let el of searchableElements) {
      if (el.textContent.toLowerCase().includes(query)) {
        el.classList.add("highlight");
        results.push(el);
      }
    }

    if (results.length === 0) {
      // Notificatio pour aucun résultat trouvé
      showResultsNotificatio("Aucun résultat trouvé !", 0);

    } else {
      // Navigue vers le premier résultat
      navigateToResult(0);
    }
  }

  // Bouton suivant
  nextResultBtn.addEventListener("click", () => {
    navigateToResult(currentIndex + 1);
  });

  // Bouton précédent
  prevResultBtn.addEventListener("click", () => {
    navigateToResult(currentIndex - 1);
  });

  // Recherche au clic sur l'icône
  searchIcon.addEventListener("click", searchContent);

  // Recherche sur appui de "Entrée"
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchContent();
    }
  });

  // Supprime le surlignage au clic n'importe où
  document.addEventListener("click", (event) => {
    if (!searchBlock.contains(event.target) && !notificatioResults.contains(event.target)) {
      searchableElements.forEach((el) => el.classList.remove("highlight"));
      notificatioResults.classList.remove("show");
    }
  });

  // Affiche ou masque la barre de recherche
  showSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    searchBlock.classList.add("show");
  });

  closeSearchBtn.addEventListener("click", () => {
    searchBlock.classList.remove("show");
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
