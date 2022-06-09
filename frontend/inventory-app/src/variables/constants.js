// Constants.js
let prod = '';

let dev = 'http://localhost:5000';

export const serverUrl = process.env.REACT_APP_NODE_ENV === 'development' ? dev: prod;
