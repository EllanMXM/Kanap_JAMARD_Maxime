//Récupération de l'id via les paramètres de l'url
//const idProduct = new URL(window.location.href).searchParams.get("id");

//fetch("http://localhost:3000/api/products" + idProduct)
// .then((response) => response.json())
// .then((response) => {});

//allez chercher les paramètre dans l'url
let urlparam = new URLSearchParams(window.location.search);
let idProduct = urlparam.get("id");

//appel API pour un seul produit (idProduct)
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
      let Option = document.createElement("option");
      document.getElementById("colors").appendChild(Option);
      Option.textContent = color;
    }
    console.log(data);
  })
);
