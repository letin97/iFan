const initData = () => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/`) // eslint-disable-line
        .then(respon => respon.json())
);

export default initData;
