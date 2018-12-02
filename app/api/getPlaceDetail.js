const getPlaceDetail = (id) => (
    fetch(`http://192.168.1.4/ifan/place_detail.php?id=${id}`) //eslint-disable-line
    .then(res => res.json())
);

export default getPlaceDetail;
