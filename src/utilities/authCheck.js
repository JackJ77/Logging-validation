import data from './../data.json';

export default function authCheck (email, password) {
  return (data.email === email) && (data.password === password) ? true : false;
}
