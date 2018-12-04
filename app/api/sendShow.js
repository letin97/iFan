const sendShow = (token, show) => (
    fetch(`http://192.168.1.4/ifan/interested.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, show })
    })
    .then(res => res.text())
);

export default sendShow;
