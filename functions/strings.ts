export function generateRandomString (length: number) {
  const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  for (let i = 0; i <= length; i++) {
    str += abc[Math.floor(Math.random() * abc.length)];
  }
  return str;
};