/// Récupération de l'API et affichage des produits

fetch('http://localhost:3000/api/products')
    .then((result) => result.json())
    .then((data) => {
        data.forEach((products) => {
            items.insertAdjacentHTML(
                'afterbegin',
                `<a href="./product.html?id=${products._id}" id="linkToClickURL">
                    <article>
                        <img src="${products.imageUrl}" alt="${products.altTxt}">
                        <h3 class="productName">${products.name}</h3>
                        <p class="productDescription">${products.description}</p>
                    </article>
                </a>`
            );
        });
    })
    /// If API's not working
    .catch((error) => {
        console.error(error);
        items.setAttribute('style', 'color:red');
        items.insertAdjacentHTML(
            'afterbegin',
            `<h3 class='productName'>Une erreur est survenue, veuillez réessayer plus tard !</h3>`
        );
    });
