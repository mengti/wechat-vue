/**
 * 微信登录模块
 */
import { is_weixin, getUrlKey } from '../util/public-fun'
import Vue from 'vue'

export default function(cb) {
  if (!is_weixin()) {
    cb && cb()
    return
  } else if (is_weixin() && sessionStorage.penId) {
    cb && cb()
    return
  }
  let code = getUrlKey('code')
  if (code) {
    wxToken(code)
    return
  } else {
    let redirect = encodeURIComponent(location.href)
    debugger
    let appId = 'wxcd53b4051875c402'
    let href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    location.href = href
  }

  function wxToken(code) {
    let httpData = {
      params: {
        code: code
      }
    }
    Vue.http.get('order/get_wx_open_id.do', httpData).then(res => {
      sessionStorage.penId = res.data.openId
      location.href =
        location.origin +
        location.pathname +
        '#/' +
        location.href.split('#/')[1]
    })
  }
}
