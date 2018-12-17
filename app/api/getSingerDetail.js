const getSingerDetail = (id) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/singer_detail.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getSingerDetail;
