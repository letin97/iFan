import saveToken from '../api/saveToken';
import getToken from '../api/getToken';

const getNewToken = (token) => (
    fetch(`http://ifanapp.000webhostapp.com/api/refresh_token.php`, //eslint-disable-line
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


const refreshToken = async () => {
    try {
        const token = await getToken();
        if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
            console.log('CHUA CO TOKEN');
        }
        const newToken = await getNewToken(token);
        await saveToken(newToken);
        console.log('TOKEN MOI', newToken);
    } catch (err) {
        console.log(err);
    }
};

export default refreshToken;
