const dom = {
  addClass: (el, className) => {
    if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
    el.classList.add(className)
  },
  removeClass: (el, className) => {
    if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
    el.classList.remove(className)
  },
  hasClass: (el, className) => {
    if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
    if (el.classList) {
      return el.classList.contains(className);
    }
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },
  toggleClass: (el, className) => {
    if (typeof el === 'string') el = document.getElementsByClassName(el)[0]
    el.classList.toggle(className);
  }
}

InstantClick.on('change', () => {
  loadscript("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.10/build/highlight.min.js", () => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.initHighlighting(block);
    })
  })
});

window.onscroll = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  let element = document.getElementsByClassName("gotop")[0]
  scrollTop > 100 ? dom.addClass("gotop", "fadeIn") : dom.removeClass("gotop", "fadeIn")

  element.onclick = () => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
}

loadscript = (url, callback) => {
  let script = document.createElement("script")
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

