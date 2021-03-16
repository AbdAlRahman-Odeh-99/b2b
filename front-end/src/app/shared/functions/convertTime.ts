export function convertFrom24To12Hour(fullDate: string, add2hour?: boolean) {
  let newTime = '';
  // tslint:disable-next-line: radix
  let hours: any = parseInt(fullDate.split(':')[0]);
  if (add2hour) {
    hours += 2;
  }
  if (hours >= 24) {
    hours -= 24;
  }
  if (hours === 0) {
    hours = 12;
    newTime = `${hours}:${fullDate.split(':')[1]} AM`;
  } else if (hours >= 13) {
    hours -= 12;
    newTime = `${hours}:${fullDate.split(':')[1]} PM`;
  } else {
    newTime = `${hours}:${fullDate.split(':')[1]} AM`;
  }
  return newTime;
}

export function convertFrom12To24Hour(fullDate: string) {
  if (fullDate.includes('AM') || fullDate.includes('PM')) {
    let hours: any = parseInt(fullDate.split(':')[0]);
    if (fullDate.includes('PM')) {
      hours += 12;
      if (hours === 24) {
        hours = '00';
      }
    }
    return `${hours}:${fullDate.split(':')[1].split(' ')[0]}`;
  }
  return fullDate.split('.')[0];
}
