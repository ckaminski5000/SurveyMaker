// Constants.js
let prod = '';

let dev = 'http://localhost:5000';

const serverUrl = process.env.REACT_APP_NODE_ENV === 'development' ? dev: prod;

let prodRedirectUri = "https://surveymaker.app/dashboard"

let devRedirectUri = "http://localhost:3000/dashboard"

const redirectUri = process.env.REACT_APP_NODE_ENV === 'development' ? devRedirectUri: prodRedirectUri;

export default {serverUrl, redirectUri};