// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

for (let product of productLocalStorage) {
  //INSERER L'ELEMENT 'ARTICLE'
  let productArticle = document.createElement("article");
  document.querySelector(".cart__items").appendChild(productArticle);
  productArticle.className = "cart__item";

  //INSERER L'ELEMENT 'DIV'
  let productDivImg = document.createElement("div");
  productArticle.appendChild(productDivImg);
  productDivImg.className = "cart__item__img";

  //INSERER L'IMAGE
  let productImg = document.createElement("img");
  productDivImg.appendChild(productImg);
  productImg.src = productLocalStorage.imageUrl;
  productImg.alt = productLocalStorage.altTxt;

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
  productTitle.textContent = productLocalStorage.name;

  //INSERER LA COULEUR
  let productColor = document.createElement("p");
  productItemContentDescription.appendChild(productColor);
  productColor.textContent = productLocalStorage.colors;

  //INSERER LE PRIX
  let productPrice = document.createElement("p");
  productItemContentDescription.appendChild(productPrice);
  productPrice.textContent = productLocalStorage.price + "€";

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
}
