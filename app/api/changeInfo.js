const changeInfo = (token, name, phone, address) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/change_info.php`, //eslint-disable-line
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, name, phone, address })
    })
    .then(res => res.text())
);

export default changeInfo;
