const getSchedule = () => (
    fetch(`http://ifanapp.000webhostapp.com/ifan/schedule.php?`) //eslint-disable-line
    .then(res => res.json())
);

export default getSchedule;
