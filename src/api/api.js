let url = {
  hotLists: '/index/hotLists'
}

let host = 'https://www.easy-mock.com/mock/5c9c3045d172204b3a07ecb0/youzan'

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
