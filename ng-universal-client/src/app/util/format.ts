// eslint-disable-next-line
export function padTime(s: string | number) {
  if ((String(s)).length < 2) return `0${s}`;
  return s;
}
