export function convertMinutesToHoursString(minutesAmount: number) {
  const hours = `${Math.floor(minutesAmount / 60)}:${minutesAmount % 60 === 0 ? '00' : minutesAmount % 60}`



  return hours;
}