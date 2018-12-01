const getListProducts = (idType, page) => {
    let url;
    if (idType === 'COLLECTION') {
        url = `http://192.168.1.4/api/get_collection.php`;
    } else {
        url = `http://192.168.1.4/api/product_by_type.php?id_type=${idType}&page=${page}`;
    }
    return fetch(url) //eslint-disable-line
    .then(res => res.json());
};

export default getListProducts;
