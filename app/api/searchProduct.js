const searchProduct = (key) => (
    fetch(`http://192.168.1.4/api/search.php?key=${key}`) //eslint-disable-line
    .then(res => res.json())
);

export default searchProduct;
