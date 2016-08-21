import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueTouch from 'vue-touch'

import 'whatwg-fetch'
//import 'babel-polyfill'

import Home from './views/Home'
import Tasks from './views/ChatRoom'
import List from './views/List'
import Chat from './views/Chat'
import Media from './views/Media'
import User from './views/User'
import MediaManger from './views/MediaManger'
// import AlertDoc from './views/AlertDoc'
import DraggableHeader from './components/DraggableHeader'
import Loading from './views/Loading'
// import Login from './views/Login'
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
VueTouch.config.swipe = {
  direction: 'horizontal'
};

Vue.use(Router)
Vue.use(VueTouch)

var router = new Router()
Vue.config.debug = true;

router.map({
	'/': {
		component: List
	},
	'/home': {
		component: Home
	},
	'/tasks': {
		component: Tasks
	},
	'/list': {
		component: List
	},
	'/chat/:openid/:nickname': {
		name: 'chat',
		component: Chat
	},
	'/mediamanger':{
		component: MediaManger
	},
	'/media/:mediaid/:mediatype': {
		name: 'media',
		component: Media
	},
	'/DraggableHeader' : {
		component: DraggableHeader
	},
	'/user' : {
		component: User
	}
	// },
	// '/login' : {
	// 	component: Login
	// }
})

router.beforeEach( ({to, from, next}) => {
	let toPath = to.path
	let fromPath = from.path
	console.log('to: ' + toPath + ' from: ' + fromPath);
	if (toPath.replace(/[^/]/g, '').length > 1 || toPath==='/mediamanger') {
    router.app.isIndex = false
  }
  else {
    let depath = toPath === '/'
    router.app.isIndex = depath ? 0 : 1
	}

	next()
})
router.afterEach(function ({to}) {
    console.log(`success to: ${to.path}`)
  })

router.start(App,'#app')
