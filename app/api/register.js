const register = (email, name, password) => (
    fetch(`http://192.168.1.4/ifan/register.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, name, password })
    })
    .then(res => res.text())
);

export default register;
