var jwtDecode = require('jwt-decode');

export default class AuthService {
  url = 'dev-vince.us'
  audience = 'casting_agency'
  clientId = 'ZjMwTsC1ReuY5060zbDOSfmBgaCC6okg'
  callbackURL = location.origin
  token=''
  payload

  constructor() { }
  build_login_link() {
    let link = 'https://';
    link += this.url + '.auth0.com';
    link += '/authorize?';
    link += 'audience=' + this.audience + '&';
    link += 'response_type=token&';
    link += 'client_id=' + this.clientId + '&';
    link += 'redirect_uri=' + this.callbackURL ;
    return link;
  }

  build_logout_link() {
    let link = 'https://';
    link += this.url + '.auth0.com';
    link += '/v2/logout?';
    link += 'client_id=' + this.clientId + '&';
    link += 'returnTo=' + this.callbackURL ;
    return link;
  }
  // invoked in app.component on load
  check_token_fragment() {
    // parse the fragment
    const fragment = window.location.hash.substr(1).split('&')[0].split('=');
    // check if the fragment includes the access token
    if ( fragment[0] === 'access_token' ) {
      // add the access token to the jwt
      this.token = fragment[1];
      // console.log(fragment[1]);
      // save jwts to localstore
      this.set_jwt();
    }
  }

  set_jwt() {
    localStorage.setItem('JWTS_LOCAL_KEY', this.token);
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  load_jwts() {
    this.token = localStorage.getItem('JWTS_LOCAL_KEY') || null;
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  activeJWT() {
    return this.token;
  }

  decodeJWT(token) {
    this.payload = jwtDecode(token);
    // console.log(this.payload)
    return this.payload;
  }

  logout() {
    this.token = '';
    this.payload = null;
    this.set_jwt();
  }

  can(permission) {
    return this.payload && this.payload.permissions && this.payload.permissions.length && this.payload.permissions.indexOf(permission) >= 0;
  }
}
