const getCart = () => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart != null && Object.keys(cart).length) {
      return cart;
    }

    return {};
  } catch (error) {
    return {};
  }
}

//Récupération de l'id via les paramètres de l'url
//const idProduct = new URL(window.location.href).searchParams.get("id");

//fetch("http://localhost:3000/api/products" + idProduct)
// .then((response) => response.json())
// .then((response) => {});

//allez chercher les paramètre dans l'url
let urlparam = new URLSearchParams(window.location.search);
let idProduct = urlparam.get("id");

//APPEL API POUR UN SEUL PRODUIT (idProduct)
fetch("http://localhost:3000/api/products/" + idProduct)
.then((response) => {
  if (response.ok) {
    return response.json();
  }

  throw new Error('Réponse inattendue du serveur');
})
.then(data => {
  let img = document.createElement("img");
  document.querySelector(".item__img").appendChild(img);
  img.src = data.imageUrl;
  img.alt = data.altTxt;

  //Ajout des élements des produits
  let title = document.getElementById("title");
  title.textContent = data.name;

  let price = document.getElementById("price");
  price.textContent = data.price;

  let description = document.getElementById("description");
  description.textContent = data.description;

  //Ajout des couleurs

  for (let color of data.colors) {
    let optionTag = document.createElement("option");
    document.getElementById("colors").appendChild(optionTag);
    optionTag.textContent = color;
    optionTag.value = color;
  }
  console.log(data);

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
      alert("Nombre d'articles incorrect.");
    } 
    else {
      let addedArticle = {
        id: idProduct,
        color: selectColors.value,
        quantity: selectQuantity.value,
      };

      const cart = getCart();
      const productKey = idProduct + selectColors.value;

      if (cart.hasOwnProperty(productKey)) { // Ici la clé existe, donc on modifie la quantité
        // cart[productKey].quantity = nouvelleQuantité (addition de la quantité enregistrée avec la nouvelle quantité saisie)
        // Attention, la quantité totale ne doit pas dépasser 100

        
      } else { // la clé n'existe pas donc on ajoute le produit au panier
        cart[productKey] = addedArticle;
      }

      // enregistrer cart dans le localStorage
    }
  })
})
.catch(error => {
  // traiter l'erreur
});



// addArticle.image == addArticle['image']
/*
monPanier[idProduit + selectedColor] => cible un produit du panier (si il existe)

Si la clé existe :
modifier le quantité
Sinon: 
ajouter le produit

Pour tester si une clé existe :
key in monPanier
monPanier.hasOwnProperty(key)
*/ 
