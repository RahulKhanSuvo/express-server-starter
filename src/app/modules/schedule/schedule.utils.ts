export const covertDataTime = async (date: Date) => {
  const offset = date.getTimezoneOffset() * 6000;
  return new Date(date.getTime() + offset);
};
