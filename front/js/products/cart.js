/// import cart / show Products List (cart Items)
let productList = JSON.parse(localStorage.getItem('product'));

const dataApi = fetch(`http://localhost:3000/api/products`);

dataApi
    .then(async (responseData) => {
        /// If localstorage's not working
        if (!productList) {
            let totalPriceHTMLInsert = document.querySelector('#totalPrice');
            totalPriceHTMLInsert.insertAdjacentHTML('afterbegin', 0);
            let numberOfProductsHTMLInsert =
                document.querySelector('#totalQuantity');

            numberOfProductsHTMLInsert.insertAdjacentHTML('afterbegin', 0);
            return;
        }
        const response = await responseData.json();

        try {
            for (let i = 0; i < productList.length; i++) {
                let productFounder = response.find(
                    (element) => element._id === productList[i].id_product
                );

                cart__items.insertAdjacentHTML(
                    'afterbegin',
                    `<article class="cart__item" data-id="${productList[i].id_product}" data-color="${productList[i].color_product}" data-quantity= "${productList[i].quantity_product}">
                                <div class="cart__item__img">
                                <img src="${productFounder.imageUrl}" alt="${productFounder.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${productFounder.name}</h2>
                                    <p>${productList[i].color_product}</p>
                                    <p>${productFounder.price}€</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                    <p class="cart_quantity_change">Qté : ${productList[i].quantity_product}</p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productList[i].quantity_product}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                                </div>
                            </article>`
                );
            }

            /// Total price for list of products

            let totalPrice = [];

            for (let l = 0; l < productList.length; l++) {
                let productFounder = response.find(
                    (element) => element._id === productList[l].id_product
                );

                totalPrice.push(
                    productFounder.price * productList[l].quantity_product
                );
            }

            const reducer = (accumulator, currentValue) =>
                accumulator + currentValue;
            let prixTotal = totalPrice.reduce(reducer);

            document.querySelector('#totalPrice').textContent = prixTotal;

            /// Total list of products

            let numberOfProducts = productList.length;

            let numberOfProductsHTMLInsert =
                document.querySelector('#totalQuantity');

            numberOfProductsHTMLInsert.insertAdjacentHTML(
                'afterbegin',
                numberOfProducts
            );

            //// Deleting function for the cart

            let deleteArticle = document.querySelectorAll('.deleteItem');

            function saveData(product) {
                localStorage.setItem('product', JSON.stringify(product));
            }

            for (let k = 0; k < deleteArticle.length; k++) {
                deleteArticle[k].addEventListener('click', (event) => {
                    event.preventDefault();

                    let el = document.querySelectorAll('.cart__item');

                    productList = productList.filter(
                        (element) =>
                            element.id_product !== el[k].dataset.id ||
                            element.color_product !== el[k].dataset.color
                    );

                    saveData(productList);

                    alert('Votre article a bien été supprimé.');
                    if (productList == 0) {
                        localStorage.removeItem('product');
                    }
                    location.reload();
                });
            }
            /// Change quantity of products

            let modifyQuantity = document.querySelectorAll('.itemQuantity');

            for (let f = 0; f < modifyQuantity.length; f++) {
                modifyQuantity[f].addEventListener('change', (event) => {
                    event.preventDefault();

                    let qttModifValue = modifyQuantity[f].value;

                    let el = document.querySelectorAll('.cart__item');

                    let productFounder = productList.find(
                        (element) =>
                            element.id_product === el[f].dataset.id &&
                            element.color_product === el[f].dataset.color
                    );

                    productFounder.quantity_product = qttModifValue;

                    saveData(productList);
                    location.reload();
                });
            }
        } catch (err) {
            console.log(err);
        }
    })

    /// If API's not working

    .catch((error) => {
        console.error(error);
        let totalPriceHTMLInsert = document.querySelector('#totalPrice');
        totalPriceHTMLInsert.insertAdjacentHTML('afterbegin', 0);
        let numberOfProductsHTMLInsert =
            document.querySelector('#totalQuantity');

        numberOfProductsHTMLInsert.insertAdjacentHTML('afterbegin', 0);
    });

/// Ordering informations

function saveOrder(order) {
    localStorage.setItem('order', JSON.stringify(order));
}

function getOrder() {
    let order = localStorage.getItem('order');
    if (order == null) {
        return [];
    } else {
        return JSON.parse(order);
    }
}

function addOrderingData(orderdata) {
    let order = getOrder();
    order.push(orderdata);
    saveOrder(order);
}

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');

const order = document.querySelector('#order');

/// RegEx to valid contact values

function errorMessage() {
    alert('Veuillez renseigner des informations valides.');
}

const regExFirstName = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
};

const regExLastName = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
};

const regExAddress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
};

const regExCity = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
};

const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
};

/// functions to confirm values

function firstNameCheck() {
    if (regExFirstName(firstName.value)) {
        document.querySelector('#firstNameErrorMsg').textContent = '';
        return true;
    } else {
        document.querySelector('#firstNameErrorMsg').textContent =
            'Veuillez renseigner des informations valides.';
        return false;
    }
}

function lastNameCheck() {
    if (regExLastName(lastName.value)) {
        document.querySelector('#lastNameErrorMsg').textContent = '';
        return true;
    } else {
        document.querySelector('#lastNameErrorMsg').textContent =
            'Veuillez renseigner des informations valides.';
        return false;
    }
}

function addressCheck() {
    if (regExAddress(address.value)) {
        document.querySelector('#addressErrorMsg').textContent = '';
        return true;
    } else {
        document.querySelector('#addressErrorMsg').textContent =
            'Veuillez renseigner des informations valides.';
        return false;
    }
}

function cityCheck() {
    if (regExCity(city.value)) {
        document.querySelector('#cityErrorMsg').textContent = '';
        return true;
    } else {
        document.querySelector('#cityErrorMsg').textContent =
            'Veuillez renseigner des informations valides.';
        return false;
    }
}

function emailCheck() {
    if (regExEmail(email.value)) {
        document.querySelector('#emailErrorMsg').textContent = '';
        return true;
    } else {
        document.querySelector('#emailErrorMsg').textContent =
            'Veuillez renseigner des informations valides.';
        return false;
    }
}

function cartCheck() {
    if (!productList) {
        document.querySelector('#emailErrorMsg').textContent =
            'Votre panier est vide';
        return false;
    } else {
        document.querySelector('#emailErrorMsg').textContent = '';
        return true;
    }
}

/// EventListener adding contactData with POST Api request

order.addEventListener('click', async function (e) {
    e.preventDefault();

    if (
        firstNameCheck() &&
        lastNameCheck() &&
        addressCheck() &&
        cityCheck() &&
        emailCheck() &&
        cartCheck()
    ) {
        let cartArray = [];

        for (let product of productList) {
            cartArray.push(product.id_product);
        }

        let bodyJson = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: cartArray,
        };

        let options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyJson),
        };

        const result = await fetch(
            'http://localhost:3000/api/products/order',
            options
        )
            .then((res) => res.json())
            .then((data) => {
                const orderingData = JSON.stringify(data);
                location.assign(`./confirmation.html?orderid=${data.orderId}`);
            });
    }
});
