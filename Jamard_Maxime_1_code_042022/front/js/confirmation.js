//RECUPERER l'ID DANS LE LIEN DE LA PAGE

const idUrl = new URLSearchParams(new URL(location.href).search).get("id");

//ON INJECTE L'ID DANS LE HTML POUR LE NUMERO DE COMMANDE

document.getElementById("orderId").textContent = idUrl;

