//Récupération de l'id via les paramètres de l'url
//const idProduct = new URL(window.location.href).searchParams.get("id");

//fetch("http://localhost:3000/api/products" + idProduct)
// .then((response) => response.json())
// .then((response) => {});

//allez chercher les paramètre dans l'url
let urlparam = new URLSearchParams(window.location.search);
let idProduct = urlparam.get("id");

//APPEL API POUR UN SEUL PRODUIT (idProduct)
fetch("http://localhost:3000/api/products/" + idProduct).then((response) =>
  response.json().then((data) => {
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

      if (
        selectQuantity.value >= 1 &&
        selectQuantity.value <= 100 &&
        selectColors != ""
      ) {
        let choiceColors = selectColors.value;
        let choiceQuantity = selectQuantity.value;

        const addArticle = {
          id: idProduct,
          image: data.imageUrl,
          alt: data.imageAlt,
          name: title.textContent,
          price: price.textContent,
          color: selectColors.value,
          quantity: selectQuantity.value,
        };

        // RECUPERER UN TABLEAU DU LOCALSTORAGE
        let productLocalStorage = JSON.parse(localStorage.getItem("product"));

        // j'ajoute les produits sélectionnés dans le localStorage
        const addProductLocalStorage = () => {
          productLocalStorage.push(addArticle);

          // je stocke les données récupérées dans le localStorage :
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
        };

        let addConfirm = () => {
          alert("Le produit a bien été ajouté au panier");
        };

        let update = false;

        // s'il y a des produits enregistrés dans le localStorage
        if (productLocalStorage) {
          // verifier que le produit ne soit pas deja dans le localstorage/panier
          // avec la couleur
          productLocalStorage.forEach(function (productCheck, key) {
            if (
              productCheck.id == idProduct &&
              productCheck.color == selectColors.value
            ) {
              productLocalStorage[key].quantity =
                parseInt(productCheck.quantity) +
                parseInt(selectQuantity.value);
              localStorage.setItem(
                "product",
                JSON.stringify(productLocalStorage)
              );
              update = true;
              addConfirm();
            }
          });

          if (!update) {
            addProductLocalStorage();
            addConfirm();
          }
        }

        // s'il n'y a aucun produit enregistré dans le localStorage
        else {
          // je crée alors un tableau avec les éléments choisi par l'utilisateur
          productLocalStorage = [];
          addProductLocalStorage();
          addConfirm();
        }
      } else {
        alert("Veuillez selectionner une couleur et une quantité");
      }
    });
  })
);

//ici on code l'action au moment de l'évènement
//récupérer la quantité
//recuperer la couleur

/*
      controller les erreurs
        - Verifier qu'une quantité est saisie
        - Verifier qu'une couleur est sélectionnée
      */
/*
      Si pas d'erreur
        ajouter au panier
      */
/*
      Si erreur 
      Afficher message d'erreur (couleur ou quantité ou les deux)
      */
