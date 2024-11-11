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
  