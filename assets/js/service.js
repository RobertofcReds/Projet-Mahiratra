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
  