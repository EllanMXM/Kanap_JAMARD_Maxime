// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE
let productLocalStorage = getCart();
//let productLocalStorage = JSON.parse(localStorage.getItem("product"));
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
     console.log(data);

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
          // +2 => 2
          // -5
          // -5 + 10 = 5
          // 10 + -5 = 5
          // quantityDiff =  newArtcileQuantity - oldArticleQuantity
          // totalQuantity = totalQuantity + quantityDiff
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
        //Supprimer le produit de l'affichage
        //Il faut aussi supprimer la référence du produit dans l'objet panier stocké dans le localStorage
        //let itemIdToDelete = productArticle.dataset.id;
        //let itemColorToDelete = productArticle.dataset.color;

        //const productKey = itemIdToDelete + itemColorToDelete;
        
        // prix total post suppression = prix total - quantité produit * prix unitaire produit
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
/*
const inputElement = document.querySelector('input');

//First Name

  let inputFirstName = document.getElementById('firstName');

  let checkFirstName = () => {
      let firstName = document.getElementById('firstName').value
      let firstNameRegExp = /^[a-zA-Zàâäëéèêïîôöùûç -]+$/;
      let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg')
      if (firstNameRegExp.test(firstName)) {
          firstNameErrorMsg.textContent = ""
          return true
      } else {
         firstNameErrorMsg.textContent = "Veuillez entrer un prénom valide"
          return false
      }
  }
  


  // Last Name

  let inputLastName = document.getElementById('lastName');

    let checkLastName = () => {
    let lastName = document.getElementById('lastName').value
    let lastNameRegExp = /^[a-zA-Zàâäëéèêïîôöùûç -]+$/;
    let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
    if (lastNameRegExp.test(lastName)) {
      lastNameErrorMsg.textContent = ""
        return true
    } else {
      lastNameErrorMsg.textContent = "Veuillez entrer un nom valide"
        return false
    }
}


    
  // Adress

  let inputAddress = document.getElementById('address');

  let checkAddress = () => {
    let address = document.getElementById('address').value
    let addressRegExp = /^[a-zA-Z0-9àâäëéèêïîôöùûç, -]+$/;
    let addressErrorMsg = document.querySelector('#addressErrorMsg')
    if (addressRegExp.test(address)) {
      addressErrorMsg.textContent = ""
        return true
    } else {
      addressErrorMsg.textContent = "Veuillez entrer une adresse valide"
        return false
    }
  }



 // City 

 let inputCity = document.getElementById('city');

let checkCity = () => {
    let city = document.getElementById('city').value
    let cityRegExp = /^[a-zA-Zàâäëéèêïîôöùûç -]+$/
    let cityErrorMsg = document.querySelector('#cityErrorMsg')
    if (cityRegExp.test(city)) {
      cityErrorMsg.textContent = ""
        return true
    } else {
      cityErrorMsg.textContent = "Veuillez entrer un nom de ville valide"
        return false
    }
};


// Email

let inputEmail = document.getElementById('email');

let checkEmail = () => {
    let email = inputEmail.value
    let emailRegExp = /^[a-zA-Z0-9.-_]+\@[a-zA-Z0-9.-_]+\.[a-z]{2,10}$/
    let emailErrorMsg = document.querySelector('#emailErrorMsg')
    if (emailRegExp.test(email)) {
      emailErrorMsg.textContent = ""
        return true
    } else {
      emailErrorMsg.textContent = "Veuillez entrer un email valide"
        return false
    }
}

let checkForm = () => {
if ((firstName.value) && (lastName.value) && (address.value) && (city.value) && (email.value)) {
  return true;
} else {
   alert("Veuillez remplir le formulaire")
   return false;
}};*/
/*
const isInputValid = function (inputElement, regExp, errorMessage) {

}
function isInputValid(inputElement, regExp, errorMessage) {

}
*/
const isInputValid = (inputElement, regExp, errorMessage) => {
  if (regExp.test(inputElement.value)) {
    inputElement.nextSibling.textContent = "";

    return true;
  } else {
    inputElement.nextSibling.textContent = errorMessage;

    return false;
  }
};


// Button 
  
let buttonOrder = document.querySelector('#order')
document.querySelector('#order').addEventListener('click', (even) => {
  even.preventDefault();
  
  let isFormValid = isInputValid(document.getElementById('firstName'),
  /^[a-zA-Zàâäëéèêïîôöùûç -]+$/, 
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
/*
  Si le formulaire est valide alors
    on envoie la commande

  * Un formulaire est valide si tous ses input sont valides
  *//*
  let isFormValid = checkFirstName();
  isFormValid = checkLastName() && isFormValid;
  isFormValid = checkAddress() && isFormValid;
  isFormValid = checkCity() && isFormValid;
  isFormValid = checkEmail() && isFormValid;*/
/*
  let isFormValid = isInputValid(elementPRenom, regexpPrenom, 'message derreur du prenom');
  isFormValid = isInputValid(elementNom, regexpNom, 'Message derreur du nom') && isFormValid;
  isFormValid = isInputValid() && isFormValid;
  isFormValid = isInputValid() && isFormValid;
  isFormValid = isInputValid() && isFormValid;
*/
  //if (checkFirstName() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
  if (isFormValid) { 
    // On consomme l'API pour créer la commande
  }

});
