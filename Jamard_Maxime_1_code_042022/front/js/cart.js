// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE
let productLocalStorage = getCart();
let totalPrice = 0;
let totalQuantity = 0;

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
      //AFFICHAGE PRIX TOTAL
      let totalQuantityElement = document.getElementById("totalQuantity");
      let totalPriceElement = document.getElementById("totalPrice");

      totalPrice += product.quantity * data.price;
      totalQuantity += parseInt(product.quantity, 10);

      totalPriceElement.textContent = totalPrice;
      totalQuantityElement.textContent = totalQuantity;

      //INSERER L'ELEMENT 'ARTICLE'
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.dataset.id = data._id;
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
         
          let quantityDiff = productQuantity.value - productQuantity.defaultValue;
          totalQuantityElement.textContent = parseInt(totalQuantityElement.textContent, 10) + quantityDiff;

          totalPriceElement.textContent = parseInt(totalPriceElement.textContent, 10) + quantityDiff * data.price;
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
      
        totalPriceElement.textContent = totalPriceElement.textContent - productQuantity.value * data.price;
        
        totalQuantityElement.textContent = totalQuantityElement.textContent - productQuantity.value;
        
        delete productLocalStorage[productKey];
        localStorage.setItem("cart", JSON.stringify(productLocalStorage));
        
        productArticle.parentNode.removeChild(productArticle);
      });

    })

  .catch(error => {
    alert("Erreur lors de l'appel du serveur ");
  })    
}

//FORMULAIRE

const isInputValid = (inputElement, regExp, errorMessage) => {
  if (regExp.test(inputElement.value)) {
    inputElement.nextSibling.textContent = "";

    return true;
  } else {
    inputElement.nextSibling.textContent = errorMessage;

    return false;
  }
};

// BUTTON

let buttonOrder = document.querySelector('#order')
document.querySelector('#order').addEventListener('click', (event) => {
  event.preventDefault();
  
  if (Object.keys(productLocalStorage).length === 0) {
    alert('Veuillez ajouter un produit au panier avant de continuer')
    return;
  }

  let isFormValid = isInputValid(document.getElementById('firstName'),
  /^[a-zA-Zàâäëéèêïîôöùûç -]{3,}$/, 
  "Veuillez entrer un prénom valide");
  
  isFormValid = isInputValid(document.getElementById('lastName'),
   /^[a-zA-Zàâäëéèêïîôöùûç -]+$/,
   "Veuillez entrer un nom valide"
  ) && isFormValid;

  isFormValid = isInputValid(document.getElementById('address'),
    /^[a-zA-Z0-9àâäëéèêïîôöùûç, -]+$/,
    "Veuillez entrer une adresse valide",
  ) && isFormValid

  isFormValid = isInputValid(document.getElementById('city'),
    /^[a-zA-Zàâäëéèêïîôöùûç -]+$/,
    "Veuillez entrer un nom de ville valide",
  ) && isFormValid


  isFormValid = isInputValid(
    document.getElementById('email'), 
    /^[a-zA-Z0-9.-_]+\@[a-zA-Z0-9.-_]+\.[a-z]{2,10}$/, 
    "Veuillez entrer un email valide"
  ) && isFormValid;
    
  

  if (isFormValid) {

    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    }
    

    let products = [];

    for (const productKey in productLocalStorage) {
      products.push(productLocalStorage[productKey].id)
    }
   
      // On consomme l'API pour créer la commande
    fetch('http://localhost:3000/api/products/order',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify ({contact, products})
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
    
      throw new Error('Réponse inattendue du serveur');
    })
    .then((data) => {
      document.location.href = "./confirmation.html?id=" + data.orderId;
      localStorage.clear();
    })
    .catch(error => {
      alert("une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer");
    })  
  }
});

