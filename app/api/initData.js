const initData = () => (
    fetch(`http://192.168.1.4/ifan/`) // eslint-disable-line
        .then(respon => respon.json())
);

export default initData;
