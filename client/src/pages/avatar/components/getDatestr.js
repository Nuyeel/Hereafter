function getDatestr(str) {
    const date = str.split('T')[0];
    const year = Number(date.split('-')[0]);
    const month = Number(date.split('-')[1]);
    const day = Number(date.split('-')[2]);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekday = weekdays[new Date(year, month - 1, day).getDay()];
    const time = str.split('T')[1].split('.')[0];
    const hour = Number(time.split(':')[0]) + 8;
    const minute = time.split(':')[1];
    const second = time.split(':')[2];
    const dateStr = `${year}${month}${day}/${weekday}/${hour}:${minute}:${second}`;
    return dateStr;
}
export default getDatestr;
