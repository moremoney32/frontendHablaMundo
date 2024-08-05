export function getTimeNow(createdAt) {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const elapsedTimeInSeconds = Math.floor((currentTime - createdTime) / 1000);
  return elapsedTimeInSeconds;
  }
  