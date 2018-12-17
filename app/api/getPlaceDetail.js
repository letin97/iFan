const getPlaceDetail = (id) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/place_detail.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getPlaceDetail;
