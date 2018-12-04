const signIn = (email, password) => (
    fetch(`http://192.168.1.4/ifan/login.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
);

export default signIn;
