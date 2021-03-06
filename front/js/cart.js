// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE
let productLocalStorage = getCart();
//let productLocalStorage = JSON.parse(localStorage.getItem("product"));

for (let productKey in productLocalStorage) {
  const product = productLocalStorage[productKey];

  fetch('http://localhost:3000/api/products/' + product.id)
  .then(response => {
    if (response.ok){
      return response.json();
    }

    throw new Error('Réponse inattendue du serveur');
  
  })
  .then(data => {
    //INSERER L'ELEMENT 'ARTICLE'
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.dataset.id = data.id;
    productArticle.dataset.color = product.color;

    //INSERER L'ELEMENT 'DIV'
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    //INSERER L'IMAGE
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = data.imageUrl;
    productImg.alt = data.altTxt;

    //INSERER L'ELEMENT 'DIV'
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    //INSERER L'ELEMENT 'DIV'
    let productItemContentDescription = document.createElement("div");
    productItemContent.appendChild(productItemContentDescription);
    productItemContentDescription.className = "cart__item__content__description";

    //INSERER L'ELEMENT TITRE H2
    let productTitle = document.createElement("h2");
    productItemContentDescription.appendChild(productTitle);
    productTitle.textContent = data.name;

    //INSERER LA COULEUR
    let productColor = document.createElement("p");
    productItemContentDescription.appendChild(productColor);
    productColor.textContent = product.color;

    //INSERER LE PRIX
    let productPrice = document.createElement("p");
    productItemContentDescription.appendChild(productPrice);
    productPrice.textContent = data.price + "€";

    //INSERER L'ELEMENT 'DIV'
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    //INSERER L'ELEMENT 'DIV'
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    //INSERER L'ELEMENT  'P'
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.textContent = ' Qté :';

    //INSERER LA QUANTITÉ
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.className = "itemQuantity";
    productQuantity.value = product.quantity;
    productQuantity.defaultValue = product.quantity;
    productQuantity.type = "number";
    productQuantity.min = 1;
    productQuantity.max = 100;
    productQuantity.name = "itemQuantity";

    //INSERER L'ELEMENT 'DIV'
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    //INSERER L'ELEMENT  'P' SUPPRIMER
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.textContent = "Supprimer";

    let addedArticle = {
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price
    }

    //MODIFIER QUANTITÉ
    productQuantity.addEventListener("change", (event) => {

      if (productQuantity.value > 0 && productQuantity.value <= 100) {
        productLocalStorage[productKey].quantity = productQuantity.value;
        //METTRE A JOUR LA VALEUR PAR DEFAUT DE L'INPUT 
        productQuantity.defaultValue = productQuantity.value;

        localStorage.setItem("cart", JSON.stringify(productLocalStorage));
      } else {
        // REINITIALISER LA QUANTITE A LA VALEUR PAR DEFAUT

        alert("Nombre d'articles incorrect")
        productQuantity.value = productQuantity.defaultValue;
      }
    }); 

    //SUPPRIMER UN OBJET
    productSupprimer.addEventListener('click', (event) => {
      //Supprimer le produit de l'affichage
      //Il faut aussi supprimer la référence du produit dans l'objet panier stocké dans le localStorage
    });

  })
  .catch(error => {
    alert("Erreur lors de l'appel du serveur ");
  })    
}


 //affichage du prix total

  //let totalPrice = document.querySelector("#totalPrice")
  //let total = item.price * item.quantity;
     





