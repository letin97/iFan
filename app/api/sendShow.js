const sendShow = (token, show, interested) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/send_show.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, show, interested })
    })
    .then(res => res.text())
);

export default sendShow;
