// Constants.js
let prod = '';

let dev = 'http://localhost:5000';

const serverUrl = process.env.NODE_ENV === 'development' ? dev: prod;


export default serverUrl;