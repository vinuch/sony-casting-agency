import environment from './environment'

build_login_link(callbackPath = '') {
  let link = 'https://';
  link += this.url + '.auth0.com';
  link += '/authorize?';
  link += 'audience=' + this.audience + '&';
  link += 'response_type=token&';
  link += 'client_id=' + this.clientId + '&';
  link += 'redirect_uri=' + this.callbackURL + callbackPath;
  return link;
}