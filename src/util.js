import sha1 from 'sha1'
import fetchJsonp from 'fetch-jsonp'

const Util = {
  url: 'http://cs.nankebuluo.com/',
  //url: 'http://agent.nankebuluo.com/',
  cdnUrl: 'http://cdn.nankebuluo.com',
  imageUrl: 'http://cdn.nankebuluo.com/static/image',
  mediaUrl: 'http://cdn.nankebuluo.com/static/media',
  appid: 'wx8eec0e3d43f5362b',
  makeSignature(timestamp, nonce) {
    const token = 'swan'

    let arr = [token, timestamp, nonce].sort((a, b) => (a + '') > (b + '') ? 1 : -1)
    //alert(arr)
    return sha1(arr.join(''))
  },

  getParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },

  fetchJsonp(url, data, options){
    const timestamp = (+new Date() + '').slice(0, 10)
    const nonce = parseInt(Math.random() * 100) + ''
    const signature = this.makeSignature(timestamp, nonce)

    const _data = {...data, timestamp, nonce, signature}

    let _url = url
    let tem = []
    for (let x in _data) {
      tem.push(x + '=' + _data[x])
    }
    _url += '?' + tem.join('&')

    return fetchJsonp(_url, options)
  },

  login(func){
    const redirectUri = this.url + 'htdocs/index.html'
    const code = this.getParam('code')
    if (code) {
      const data = {
        code
      }
      fun.getJSON(this.url + 'Login.php?callback=?', data, json => {
        func(json);
        if (json.ret == 0) {
        } else {
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=snsapi_userinfo&state=STAT'
        }
      })
    } else {
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=snsapi_base&state=STAT'
    }
  }
}

export default Util
