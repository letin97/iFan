const gettOrderHistory = (token) => (
    fetch(`http://192.168.1.4/api/order_history.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
);

export default gettOrderHistory;
