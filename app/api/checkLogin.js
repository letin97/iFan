const checkLogin = (token) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/check_login.php`, //eslint-disable-line
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

export default checkLogin;
