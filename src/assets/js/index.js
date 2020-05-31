export function getTime(time, isWhole= false) {
  function toTwo(d) {
    return d < 10 ? "0" + d : d;
  }
  let t = new Date(time)
  let YYYY = t.getFullYear();
  let MM = toTwo(t.getMonth() + 1);
  let DD = toTwo(t.getDate());
  let HH = toTwo(t.getHours());
  let mm = toTwo(t.getMinutes());
  let ss = toTwo(t.getSeconds());

  return isWhole ? (YYYY + '-' +  MM + '-' +  DD + '-' + HH  + ':' + mm  + ':' + ss) : YYYY + '-' +  MM + '-' +  DD;
}