const getSingerShow = (id) => (
    fetch(`http://192.168.1.4/ifan/singer_show.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getSingerShow;
