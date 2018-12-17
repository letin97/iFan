const signIn = (email, password) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/login.php`, //eslint-disable-line
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
