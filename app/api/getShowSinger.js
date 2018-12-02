const getShowSinger = (id) => (
    fetch(`http://192.168.1.4/ifan/show_singer.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getShowSinger;
