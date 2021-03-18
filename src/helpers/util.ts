export function friendlyDate(dateStr: Date) {
  const dateObj = typeof (dateStr) === 'object' ? dateStr : new Date(dateStr);
  const time = dateObj.getTime();
  const now = new Date().getTime();
  const duration = now - time;
  let notice = '';

  switch (true) {
    case duration < 1000 * 60:
      notice = '刚刚';
      break;
    case duration < 1000 * 60 * 60:
      notice = Math.floor(duration / (1000 * 60)) + '分钟前';
      break;
    case duration < 1000 * 60 * 60 * 24:
      notice = Math.floor(duration / (1000 * 60 * 60)) + '小时前';
      break;
    default:
      notice = Math.floor(duration / (1000 * 60 * 60 * 24)) + '天前';
  }
  return notice;
}