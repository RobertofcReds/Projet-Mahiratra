document.getElementById('toggle').addEventListener('click', function () {
  document.querySelector('.navbar').classList.toggle('active');
});



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


// SLIDER AUTOMMATIQUE
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let slideWidth = slides[0].clientWidth; // Largeur d'une diapositive
let currentIndex = 1; // Commencer à la deuxième image (car la première est une duplication)
let autoSlideInterval;

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

// Réinitialiser pour un effet infini
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

// Arrêter le défilement automatique
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

// Réinitialiser la position après chaque transition
slider.addEventListener('transitionend', resetSlider);

// Gérer la visibilité de l'onglet pour arrêter/reprendre l'animation
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoSlide();
  } else {
    startAutoSlide();
  }
});

// Gérer le redimensionnement de l'écran
window.addEventListener('resize', () => {
  // Recalculer la largeur des slides
  slideWidth = slides[0].clientWidth;

  // Réaligner le slider à la position correcte
  updateSliderPosition();
});

// Initialisation
startAutoSlide();

