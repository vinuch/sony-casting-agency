// import auth0 from 'auth0-js'
// import EventEmitter from 'eventemitter3'
// import router from './../router'

// export default class AuthService {
//   authenticated = this.isAuthenticated()
//   authNotifier = new EventEmitter()

//   constructor () {
//     this.login = this.login.bind(this)
//     this.setSession = this.setSession.bind(this)
//     this.logout = this.logout.bind(this)
//     this.isAuthenticated = this.isAuthenticated.bind(this)
//     this.handleAuthentication = this.handleAuthentication.bind(this)
//   }

//   // create an instance of auth0.WebAuth with your
//   // API and Client credentials
//   auth0 = new auth0.WebAuth({
//     domain: 'dev-vince.us.auth0.com',
//     clientID: 'ZjMwTsC1ReuY5060zbDOSfmBgaCC6okg',
//     redirectUri: 'http://localhost:8080/',
//     audience: 'casting_agency',
//     responseType: 'token id_token',
//     scope: 'openid profile'
//   })

//   // this method calls the authorize() method
//   // which triggers the Auth0 login page
//   login () {
//     this.auth0.authorize()
//   }

//   // this method calls the parseHash() method of Auth0
//   // to get authentication information from the callback URL
//   handleAuthentication () {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult)
//       } else if (err) {
//         console.log(err)
//         alert(`Error: ${err.error}. Check the console for further details.`)
//       }
//       router.replace('/')
//     })
//   }

//   // stores the user's access_token, id_token, and a time at
//   // which the access_token will expire in the local storage
//   setSession (authResult) {
//     this.accessToken = authResult.accessToken
//     this.idToken = authResult.idToken
//     this.profile = authResult.idTokenPayload
//     this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
//     this.authNotifier.emit('authChange', {authenticated: true})
//   }

//   // remove the access and ID tokens from the
//   // local storage and emits the authChange event
//   logout () {
//     delete this.accessToken
//     delete this.idToken
//     delete this.expiresAt
//     this.authNotifier.emit('authChange', false)
//     // navigate to the home route
//     router.replace('/')
//   }

//   // checks if the user is authenticated
//   isAuthenticated () {
//     // Check whether the current time is past the
//     // access token's expiry time
//     return new Date().getTime() < this.expiresAt
//   }

//   // a static method to get the access token
//   getAuthToken () {
//     return this.accessToken
//   }

//   // a method to get the User profile
//   getUserProfile () {
//     return this.profile
//   }
// }

var jwtDecode = require('jwt-decode');

export default class AuthService {
  url = 'dev-vince.us'
  audience = 'casting_agency'
  clientId = 'ZjMwTsC1ReuY5060zbDOSfmBgaCC6okg'
  callbackURL = 'http://localhost:8080'

  token=''
  payload

  constructor() { }
  // https://dev-vince.us.auth0.com/authorize?audience=casting_agency&response_type=token&client_id=ZjMwTsC1ReuY5060zbDOSfmBgaCC6okg&redirect_uri=http://localhost:8080
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
