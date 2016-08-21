import sha1 from 'sha1'
import fetchJsonp from 'fetch-jsonp'

const Util = {
  url: 'http://cs.nankebuluo.com/',
  cdnUrl: 'http://cdn.nankebuluo.com',
  imageUrl: 'http://cdn.nankebuluo.com/static/image',
  mediaUrl: 'http://cdn.nankebuluo.com/static/media',
  makeSignature(timestamp, nonce) {
    const token = 'swan'

    let arr = [token, timestamp, nonce].sort((a, b) => (a + '') > (b + '') ? 1 : -1)
    //alert(arr)
    return sha1(arr.join(''))
  },

  fetchJsonp(url, data, options){
    const timestamp = (+new Date() + '').slice(0, 10)
    const nonce = parseInt(Math.random()*100) + ''
    const signature = this.makeSignature(timestamp, nonce)

    const _data = {...data, timestamp, nonce, signature}

    let _url = url
    let tem = []
    for (let x in _data) {
      tem.push(x + '=' + _data[x])
    }
    _url += '?' + tem.join('&')

    return fetchJsonp(_url, options)
  }
}

export default Util
