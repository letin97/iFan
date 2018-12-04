const getUserShow = (token) => (
    fetch(`http://192.168.1.4/ifan/user_show.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.text())
);

export default getUserShow;
