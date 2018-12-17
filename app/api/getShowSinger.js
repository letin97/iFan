const getShowSinger = (id) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/show_singer.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getShowSinger;
