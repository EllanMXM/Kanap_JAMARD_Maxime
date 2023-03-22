//APPEL FETCH - REPONSE EN JSON 
fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  
    throw new Error('Réponse inattendue du serveur');
  })
  .then((data) =>
    //TRAITER LES DONNÉES DE LA REPONSE 
    data.forEach((product) => {
      //CREATION DES BALISES
      const productsContainer = document.getElementById("items");
      const productlink = document.createElement("a");
      const articleTag = document.createElement("article");
      const imageTag = document.createElement("img");
      const titleTag = document.createElement("h3");
      const productDescription = document.createElement("p");

      //INSERER LES ELEMENTS DES BALISES
      imageTag.src = product.imageUrl;
      imageTag.alt = product.altTxt;
      titleTag.classList.add("productName");
      titleTag.textContent = product.name;
      productDescription.textContent = product.description;
      productDescription.classList.add("productDescription");

      productlink.append(articleTag);
      articleTag.append(imageTag);
      articleTag.append(titleTag);
      articleTag.append(productDescription);
      productsContainer.append(productlink);

      productlink.href = "./product.html?id=" + product["_id"];

    })
  )
  //COMPORTEMENT EN CAS D'ÉCHEC DE LA REQUÊTE
  .catch(error => {
    alert("Erreur lors de l'appel du serveur ");
  });  
