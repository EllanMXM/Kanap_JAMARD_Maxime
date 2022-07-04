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
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

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
  })
  .catch(error => {

  }) 
 
  
}


