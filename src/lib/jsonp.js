const { document, JSON, encodeURIComponent, Object } = window;
const headEl = document.head;

// 获取uid函数
const getUid = (() => {
  let uid = 0;
  return () => ++uid;
})();

// 加载js函数
function getScript(url, fn) {
  const isJs = /(\.js)$/.test(url);
  const scriptEl = document.createElement('script');

  // type
  scriptEl.type = 'text/javascript';

  // onload
  scriptEl.onload = () => {
    typeof fn === 'function' && fn();
    !isJs && headEl.removeChild(scriptEl);
  };

  // 请求
  scriptEl.src = url;
  headEl.appendChild(scriptEl);
}

// 回调函数
function jsonpcb(rs, opts = {}) {
  // 配置项
  const { callback, success, error } = opts;
  // 回调函数
  typeof callback === 'function' && callback(rs);

  // 成功或失败回调函数
  rs.status === 200 ? typeof success === 'function' && success(rs) : typeof error === 'function' && error(rs);
}

// get数据函数
function get(opts) {
  // 配置项
  opts = Object.assign({}, get.defaults, opts);
  let { url, data } = opts;

  // 回调函数名
  const cbName = `jsonpcb${getUid()}`;

  // 将回调函数添加到全局变量
  window[cbName] = (rs) => {
    // 回调
    jsonpcb(rs, opts);

    // 释放回调函数
    window[cbName] = null;
  };

  // url中添加callback
  Object.assign(data || (data = {}), {
    callback: cbName
  });

  // 拼接data
  if (data) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + Object.keys(data).map((item) => `${item}=${encodeURIComponent(data[item])}`).join('&');
  }

  getScript(url);
}
// get数据默认配置项
get.defaults = {};


// post数据函数
var post = (function() {
  // 回调函数对象
  var msgcb = {};

  // 绑定消息事件
  window.addEventListener('message', function(evt) {
    var data = JSON.parse(evt.data);
    msgcb[data.id](data.rs);
  }, false);

  return function(opts) {
    opts = Object.assign({}, post.defaults, opts);

    // iframe元素
    var ifrId = 'jsonpifr' + getUid(), ifrEl,
      tmpEl = document.createElement('div');
    tmpEl.innerHTML = '<iframe id="' + ifrId + '" name="' + ifrId + '" style="display: none;"></iframe>';
    ifrEl = tmpEl.childNodes[0];
    bodyEl.appendChild(ifrEl);

    // 响应函数
    msgcb[ifrId] = function(rs) {
      // 回调
      callback(JSON.parse(rs), opts);

      // 释放回调函数
      msgcb[ifrId] = null;

      // 删除节点
      bodyEl.removeChild(ifrEl);
      !formId && bodyEl.removeChild(formEl);
    };

    // form元素
    var formId = opts.formId, formEl;
    // 带file的form提交
    if (formId) {
      formEl = document.getElementById(formId);
      formEl.enctype = 'multipart/form-data';
    }
    else {
      formEl = document.createElement('form');
      formEl.style.display = 'none';
    }

    // 请求的url
    var url = opts.url;
    formEl.action = url + (url.indexOf('?') !== -1 ? '&' : '?') + 'jsonp=' + ifrId;
    formEl.method = opts.method;
    formEl.target = ifrId;
    //遍历data,加到form
    var data = opts.data;
    for (var p in data) {
      var inputEl = document.createElement('input');

      inputEl.type = 'hidden';
      inputEl.name = p;
      inputEl.value = data[p];
      formEl.appendChild(inputEl);
    }

    // 提交
    !formId && bodyEl.appendChild(formEl);
    formEl.submit();
  };

})();
//post数据默认配置项
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
