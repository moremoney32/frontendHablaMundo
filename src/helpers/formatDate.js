
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
      // Format des dates
      const day = String(dateTime.getDate()).padStart(2, '0');
      const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
      const year = dateTime.getFullYear();
      const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
      const weekday = weekdays[dateTime.getDay() - 1];
          return `${weekday} ${day}/${month}/${year}`;
  }
}

  