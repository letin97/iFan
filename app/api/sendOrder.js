const sendOrder = (token, arrayDetail) => (
    fetch(`http://192.168.1.4/api/cart.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, arrayDetail })
    })
    .then(res => res.text())
);

export default sendOrder;
