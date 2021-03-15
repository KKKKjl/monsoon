; (function () {
  var options = {
    url: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.10/build/highlight.min.js'
  }

  var dom = {
    addClass: function (el, className) {
      if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
      el.classList.add(className)
    },
    removeClass: function (el, className) {
      if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
      el.classList.remove(className)
    },
    hasClass: function (el, className) {
      if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
      if (el.classList) {
        return el.classList.contains(className);
      }
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    },
    toggleClass: function (el, className) {
      if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
      el.classList.toggle(className);
    }
  }

  function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function listenScroll() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var element = document.getElementsByClassName("gotop")[0]
    scrollTop > 100 ? dom.addClass("gotop", "fadeIn") : dom.removeClass("gotop", "fadeIn")

    element.onclick = function () {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  }

  window.addEventListener('scroll', listenScroll)


  InstantClick.on('change', function () {
    loadScript(options.url, function () {
      document.querySelectorAll('pre code').forEach(function (block) {
        hljs.initHighlighting(block);
      })
    })
  })
})();