const searchShow = (key) => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/search.php?key=${key}`) //eslint-disable-line
    .then(res => res.json())
);

export default searchShow;
