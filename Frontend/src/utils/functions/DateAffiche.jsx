export default function DateAffiche(convert) {
  let laDate = new Date(convert);
  let duration = new Date(new Date(Date.now()) - laDate);
  if (duration.getTime() < 86400000) {
    if (duration.getHours() < 0) {
      return (
        "Il y'a " +
        (duration.getMinutes() > 0
          ? `${duration.getMinutes()} min `
          : `${duration.getSeconds()}`)
      );
    } else {
      return `${laDate.toDateString()} `;
    }
  }
}
