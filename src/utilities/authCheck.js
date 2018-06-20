import data from './../data.json';

export default function authCheck (email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    ((email === data.email) && (data.password === password)) ? resolve('success') : reject('fail');
    }, 1000);
  });
}
