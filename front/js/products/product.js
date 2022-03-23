/// Récupération de l'id dans l'URL

const produit = window.location.search.split('?id=').join('');

const dataApi = fetch(`http://localhost:3000/api/products/${produit}`);

dataApi
    .then(async (responseData) => {
        const response = await responseData.json();

        try {
            // Import Image page product
            const imageUrl = response.imageUrl;
            const altTxt = response.altTxt;

            const show_imageUrl = document.querySelector('.item__img');

            const image_canape = `<img src="${imageUrl}" alt="${altTxt}">`;

            show_imageUrl.insertAdjacentHTML('afterbegin', image_canape);

            // Import Price/Name/Description page product

            const name = response.name;
            const price = response.price;
            const description = response.description;

            const show_name = document.querySelector('#title');
            const show_price = document.querySelector('#price');
            const show_description = document.querySelector('#description');

            const name_canape = `${name}`;
            const price_canape = `${price}`;
            const description_canape = `${description}`;

            show_name.insertAdjacentHTML('afterbegin', name_canape);
            show_price.insertAdjacentHTML('afterbegin', price_canape);
            show_description.insertAdjacentHTML(
                'afterbegin',
                description_canape
            );

            // Import Color page product

            let colors = response.colors;

            let colorsData = colors.slice();

            const show_color = document.querySelector('#colors');

            for (let i = 0; i < colorsData.length; i++) {
                show_color.insertAdjacentHTML(
                    'beforeend',
                    `<option value="${colorsData[i]}">${colorsData[i]}</option>`
                );
            }

            // Save les données pour ajouter dans le panier

            const addToCart = document.querySelector('#addToCart');

            function saveData(product) {
                localStorage.setItem('product', JSON.stringify(product));
            }

            function getProduct() {
                let product = localStorage.getItem('product');
                if (product == null) {
                    return [];
                } else {
                    return JSON.parse(product);
                }
            }

            function addDataToCart(canape) {
                let product = getProduct();
                let foundProduct = product.find(
                    (p) =>
                        p.id_product == canape.id_product &&
                        p.color_product == canape.color_product
                );
                if (foundProduct) {
                    foundProduct.quantity_product =
                        +foundProduct.quantity_product +
                        parseInt(document.getElementById('quantity').value);
                } else {
                    product.push(canape);
                }
                saveData(product);
                location.assign(`./cart.html`);
            }

            /// Ajout produit panier au click sur le bouton

            const colorChosen = document.getElementById('colors');
            const quantityProduct = document.getElementById('quantity');

            addToCart.addEventListener('click', (event) => {
                event.preventDefault();

                if (
                    colorChosen.value === '' ||
                    quantityProduct.value <= 0 ||
                    quantityProduct.value > 100
                ) {
                    alert('Veuillez renseigner une couleur/quantité valide.');
                } else {
                    const colorSelector =
                        document.getElementById('colors').value;

                    const quantitySelector = parseInt(
                        document.getElementById('quantity').value
                    );

                    let productData = {
                        id_product: produit,
                        quantity_product: quantitySelector,
                        color_product: colorSelector,
                    };

                    addDataToCart(productData);
                }
            });
        } catch (err) {
            console.log(err);
        }
    })

    /// If API's not working

    .catch((error) => {
        console.error(error);
        item__img.setAttribute('style', 'color:red');
        item__img.insertAdjacentHTML(
            'afterbegin',
            `<h3 class='productName'>Une erreur est survenue, veuillez réessayer plus tard !</h3>`
        );
    });
