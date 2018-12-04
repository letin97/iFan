const getSchedule = () => (
    fetch(`http://192.168.1.4/ifan/schedule.php?`) //eslint-disable-line
    .then(res => res.json())
);

export default getSchedule;
