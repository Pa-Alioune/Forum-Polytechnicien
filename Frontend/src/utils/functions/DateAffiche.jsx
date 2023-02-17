export default function DateAffiche(convert) {
  let laDate = new Date(convert);
  let duration = new Date(new Date(Date.now()) - laDate);
  if (duration.getDay() < 1) {
    if (duration.getHours() < 0) {
      return (
        "Il y'a " +
        (duration.getMinutes() > 0
          ? `${duration.getMinutes()} min `
          : `${duration.getSeconds()}`)
      );
    } else {
      return `Il y'a  + ${duration.gethours()} h  ${duration.getMinutes()} min `;
    }
  } else {
    return `Le ${laDate.toDateString()} `;
  }
}
