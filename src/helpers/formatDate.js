
// export function formatTime(seconds) {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     return `${h > 0 ? `${h}h ` : ''}${m > 0 ? `${m}m ` : ''}${s}s`;
// }
export function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const now = new Date();
    const difference = now - dateTime;
  
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return "à l'instant";
    } else if (minutes < 60) {
      return `il y a ${minutes}m`;
    } else if (hours < 24) {
      return `il y a ${hours}h`;
    } else if (days === 1) {
      return "hier";
    } else {
      const weekdays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
      const weekday = weekdays[dateTime.getDay() - 1];
      const day = dateTime.getDate();
      const month = dateTime.getMonth() + 1;
      const year = dateTime.getFullYear();
      return `${weekday} ${day}/${month}/${year}`;
    }
  }
  
  