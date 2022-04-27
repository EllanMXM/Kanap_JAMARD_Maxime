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

    let title = document.getElementById("title");
    title.textContent = data.name;

    let price = document.getElementById("price");
    price.textContent = data.price;

    let description = document.getElementById("description");
    description.textContent = data.description;

    let option = document.createElement("option");
    option.value = data.colors;
    option.textContent = data.colors;
    colors.appendChild(option);

    console.log(data);
  })
);
