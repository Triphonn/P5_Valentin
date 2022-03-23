const orderId = window.location.search.split('?orderid=').join('');

let linkToOrderId = document.querySelector('#orderId');

linkToOrderId.insertAdjacentHTML('afterbegin', `${orderId}`);
