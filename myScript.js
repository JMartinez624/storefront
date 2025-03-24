var cart = [];
function addToCart(product, price) {
    var value = document.getElementById('total').innerText;
    value++;
    document.getElementById('total').innerText = value;
    cart.push(product);

    document.getElementById('cart-items').innerHTML += `
    <h3 class="txt">
    ${product} @ $${price}
    </h3>
    `;
}