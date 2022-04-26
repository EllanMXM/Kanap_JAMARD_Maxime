/*fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  //traitement de la réponse
  //verifier que la requête renvoi le resultat attendu
  //créer une erreur dans le cas contraire

  .then(
    (responseData) => console.log(response2)
    //traiter les données de la réponse
  )

  .catch((error) => {
    //gestion des erreurs
  });*/
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) =>
    data
      .forEach((product) => {
        //let data = document.createElement;
        const productsContainer = document.getElementById("items");
        const productlink = document.createElement("a");
        const articleTag = document.createElement("article");
        const imageTag = document.createElement("img");
        const titleTag = document.createElement("h3");
        const productDescription = document.createElement("p");

        imageTag.src = product.imageUrl;
        titleTag.classList.add("productName");
        titleTag.textContent = product.name;
        productDescription.textContent = product.description;

        productlink.append(articleTag);
        articleTag.append(imageTag);
        articleTag.append(titleTag);
        articleTag.append(productDescription);
        productsContainer.append(productlink);

        //Création d'une balise img
        //Création d'une balise H3
        //Creation d'une balise p
        //Chaque balise créée doit contenir les informations de l'objet product
        /*
      Créer les différents élément HTML permettant l'affichage d'un canapé
      Se référer au template index.html 
      */
        productlink.href = "./product.html?id=" + product["_id"];

        console.log(product);
      })
      .catch((error) => {
        console.log(error);
        //gestion de l'erreur
      })
  );
