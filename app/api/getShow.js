const getShow = (id) => (
    fetch(`http://192.168.1.4/ifan/show_detail.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getShow;
