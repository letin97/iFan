const getShowDetail = (id) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/show_detail.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getShowDetail;
