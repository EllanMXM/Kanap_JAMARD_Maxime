//ALLER CHERCHER LES PARAMÈTRES DANS L'URL AVEC NEW URLSearchParams 
let urlparam = new URLSearchParams(window.location.search);
//RECUPERER L'ID DU PRODUIT AVEC URLPARAM.GET
let idProduct = urlparam.get("id");

//APPEL API POUR UN SEUL PRODUIT (idProduct)
fetch("http://localhost:3000/api/products/" + idProduct)
.then((response) => {
  if (response.ok) {
    return response.json();
  }

  if (response.status == 404) {
    throw new Error('Le produit n\'existe pas');
  }
  
  throw new Error('Réponse inattendue du serveur');
})
.then(data => {
  let img = document.createElement("img");
  document.querySelector(".item__img").appendChild(img);
  img.src = data.imageUrl;
  img.alt = data.altTxt;

  //AJOUT DES ELEMENTS DES PRODUITS
  let title = document.getElementById("title");
  title.textContent = data.name;

  let price = document.getElementById("price");
  price.textContent = data.price;

  let description = document.getElementById("description");
  description.textContent = data.description;

  //AJOUT DES COULEURS
  for (let color of data.colors) {
    let optionTag = document.createElement("option");
    document.getElementById("colors").appendChild(optionTag);
    optionTag.textContent = color;
    optionTag.value = color;
  }

  const addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", (event) => {
    const selectQuantity = document.getElementById("quantity");
    const selectColors = document.getElementById("colors");
    
    //Recupération du choix de la couleur
    let choixCouleur = selectColors.value;
              
    //Recupération du choix de la quantité
    let choixQuantite = selectQuantity.value;  

        
    if (choixCouleur == "") {
      alert("Veuillez sélectionner une couleur.");
    } else if (choixQuantite <= 0 || choixQuantite >= 100) {
      alert("Veuillez choisir une quantité entre 1 et 100.");
    } 
    else {
      let addedArticle = {
        id: idProduct,
        color: selectColors.value,
        quantity: selectQuantity.value,
      };

      let cart = getCart();
      const productKey = idProduct + selectColors.value;
 
      if (cart.hasOwnProperty(productKey)) { 
        // Ici la clé existe, donc on modifie la quantité
        // cart[productKey].quantity = nouvelleQuantité (addition de la quantité enregistrée avec la nouvelle quantité saisie)
        
        let newQuantity = parseInt(addedArticle.quantity) + parseInt(cart[productKey].quantity);

        if (newQuantity > 0 && newQuantity <= 100) {
          cart[productKey].quantity = newQuantity;
          
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          alert("Nombre maximum d'article dépassé");
          return;
        }
      } else { 
          //LA CLE N'EXISTE PAS DONC ON AJOUTE LE PRODUIT AU PANIER
          cart[productKey] = addedArticle;
          localStorage.setItem('cart', JSON.stringify(cart));
      }
      alert('Votre produit a bien été ajouté au panier !');
    }
  });
})

.catch(error => {
  alert(error.message);
});  

