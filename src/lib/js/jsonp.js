// 获取uid函数
const getUid = (() => {
  let uid = 0;
  return () => ++uid;
})();

// 获取?或者&号
function getSymbol(url) {
  return url.indexOf('?') < 0 ? '?' : '&';
}

// 判断是否为function函数
function isFunction(fn) {
  return typeof fn === 'function';
}

// 加载js函数
const getScript = (() => {
  const headEl = document.head;
  const jsReg = /(\.js)$/;

  return (url, fn) => {
    const isJs = jsReg.test(url);
    const scriptEl = document.createElement('script');

    // type
    scriptEl.type = 'text/javascript';

    // onload
    scriptEl.onload = () => {
      isFunction(fn) && fn();
      isJs || headEl.removeChild(scriptEl);
    };

    // onerror
    scriptEl.onerror = (err) => {
      isFunction(fn) && fn(err);
    };

    // 请求
    scriptEl.src = url;
    headEl.appendChild(scriptEl);
  };
})();

// get数据函数
function get(opts) {
  // 配置项
  opts = Object.assign({}, get.defaults, opts);
  let { url, data } = opts;
  // callback可用于统计
  const { success, error, callback } = opts;

  // url判断
  if (!url) {
    return console.error('请求的url不能为空');
  }

  // 回调函数名
  const cbName = `jsonpcb${getUid()}`;

  // 将回调函数添加到全局变量
  window[cbName] = (rs) => {
    // 回调
    isFunction(success) && success(rs);
    isFunction(callback) && callback(opts, rs);
    // 释放回调函数
    window[cbName] = null;
  };

  // url中添加callback
  Object.assign(data || (data = {}), {
    callback: cbName
  });

  // 拼接data
  if (data) {
    url += getSymbol(url) + Object.keys(data).map((item) => `${item}=${encodeURIComponent(data[item])}`).join('&');
  }

  // 发起请求
  getScript(url, (err) => {
    // js加载出错
    if (err) {
      // 回调
      isFunction(error) && error(err);
      isFunction(callback) && callback(opts);
      // 释放回调函数
      window[cbName] = null;
    }
  });
}
// get数据默认配置项
get.defaults = {};


// post数据函数
const post = (() => {
  // 回调函数对象
  const msgcb = {};
  const bodyEl = document.body;
  // 临时元素
  const tmpEl = document.createElement('div');

  // 绑定消息事件
  window.addEventListener('message', (evt) => {
    let { data } = evt;

    // data转对象
    typeof data === 'object' || (data = JSON.parse(data || null) || {});

    // 回调函数
    const callback = msgcb[data.id];
    isFunction(callback) && callback(data.rs);
  });

  return (opts) => {
    // 配置项
    opts = Object.assign({}, post.defaults, opts);
    const { success, error, callback, formSelector, url, method, data, enctype } = opts;

    // iframe元素
    const ifrId = `postifr${getUid()}`;
    tmpEl.innerHTML = `<iframe name="${ifrId}" style="display: none;"></iframe>`;
    const ifrEl = tmpEl.childNodes[0];
    bodyEl.appendChild(ifrEl);

    // form元素
    let formEl;
    // 页面中已存在的form提交
    if (formSelector) {
      formEl = document.querySelector(formSelector);
      // 请求url中添加callback信息
      const { action } = formEl;
      formEl.action = `${action + getSymbol(action)}msgcb=${ifrId}`;
    }
    // 动态生成的form提交
    else {
      // 请求url
      const action = `${url + getSymbol(url)}msgcb=${ifrId}`;
      // 数据添加到form的input
      const inputHtml = data && Object.keys(data).map((key) => `<input type="hidden" name="${key}" value="${data[key]}"/>`).join('');
      tmpEl.innerHTML = `<form style="display: none;" method="${method}" action="${action}">${inputHtml}</form>`;
      formEl = tmpEl.childNodes[0];
    }
    // target
    formEl.target = ifrId;
    // enctype
    enctype && (formEl.enctype = enctype);

    // message事件响应函数
    msgcb[ifrId] = (rs) => {
      // 回调
      isFunction(success) && success(rs);
      isFunction(callback) && callback(opts, rs);
      // 释放回调函数
      msgcb[ifrId] = null;

      // 删除节点
      bodyEl.removeChild(ifrEl);
      formSelector || bodyEl.removeChild(formEl);
    };

    // iframe onload事件,主要处理请求失败
    ifrEl.onload = () => {
      // 延迟运行
      setTimeout(() => {
        // 如果回调还在,说明没有成功回调,即发生错误
        if (msgcb[ifrId]) {
          // 回调
          isFunction(error) && error();
          isFunction(callback) && callback(opts);
          // 释放回调函数
          msgcb[ifrId] = null;

          // 删除节点
          bodyEl.removeChild(ifrEl);
          formSelector || bodyEl.removeChild(formEl);
        }
      }, 100);
    };

    // 提交
    formSelector || bodyEl.appendChild(formEl);
    formEl.submit();
  };
})();
// post数据默认配置项
post.defaults = {
  method: 'POST'
};


export default {
  // 加载js函数
  getScript,
  // get数据函数
  get,
  // post数据函数
  post
};
