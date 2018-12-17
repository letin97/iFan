const getUserShow = (token) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/user_show.php`, //eslint-disable-line
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

export default getUserShow;
