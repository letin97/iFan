const sendSinger = (token, singer, interested) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/send_singer.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, singer, interested })
    })
    .then(res => res.text())
);

export default sendSinger;
