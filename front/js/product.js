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
      return;
    } else if (choixQuantite <= 0 || choixQuantite >= 100) {
      alert("Nombre d'articles incorrect.");
      return;
    } 
    else {
      let addedArticle = {
        id: idProduct,
        color: selectColors.value,
        quantity: selectQuantity.value,
      };

      let cart = getCart();
      const productKey = idProduct + selectColors.value;
     
 /*
      let exampleArray = ['poijfzepoiefzj', 'pojfepoezfj,', 45];console.log(exampleArray[2]);
      let exampleObject = {
        name:'nom',
        quantity: 4
      }; 
      let targetKey = 'name';
      exampleObject.name == exampleObject['name'] == exampleObject[targetKey]
      {
        'idproduit plus sa couleur' : {
          id: 'azdjhdamzdojhia',
          quantity: 30,
          color: 'Red'
        }
      }
      exampleObject['name'] = 'toto';
*/
      if (cart.hasOwnProperty(productKey)) { // Ici la clé existe, donc on modifie la quantité
        // cart[productKey].quantity = nouvelleQuantité (addition de la quantité enregistrée avec la nouvelle quantité saisie)
        // Attention, la quantité totale ne doit pas dépasser 100
 
        let newQuantity = parseInt(addedArticle.quantity) + parseInt(cart[productKey].quantity);

        //if (newQuantity > 0 || newQuantity <= 100)
        if (newQuantity > 0 && newQuantity <= 100) {
          cart[productKey].quantity = newQuantity;
          
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          alert("Nombre maximum d'article dépassé")
          //gérer message d'erreur, nombre maximum dépassé
        }
      } else { // la clé n'existe pas donc on ajoute le produit au panier
          //La quantité est validée plus haut, pas besoin de faire un nouveau test dans le cas d'un nouveau produit
          cart[productKey] = addedArticle;
          localStorage.setItem('cart', JSON.stringify(cart));
      }
  }})
})

.catch(error => {
  // traiter l'erreur
  console.log(error);
});

