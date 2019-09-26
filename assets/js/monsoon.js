; (function () {
  var options = {
    selector: '#TableOfContents',
    activeTocLink: 'side-bar-active',
    sideBarToggle: '.sidebar-toggle',
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

  function updateToc(e) {
    var element = "a[href='" + e.currentTarget.location.hash + "']"

    // Remove the active class from the other tocLinks.
    var tocLinks = document.querySelector(options.selector).querySelectorAll('.side-bar-active')
    tocLinks.forEach(function (tocLink) {
      tocLink.className = " "
    })

    // Add the active class to the active tocLink.
    var activeTocLink = document.querySelector(options.selector).querySelector(element)
    if (activeTocLink.className.indexOf(options.activeTocLink) === -1) {
      activeTocLink.className += " " + options.activeTocLink
    }
  }

  function updateSideBar() {
    if (dom.hasClass('side-bar', 'side-bar-open')) {
      document.querySelector(options.sideBarToggle).setAttribute("style", "left: 10px;")
      document.body.setAttribute("style", "padding-left: 0;");
    } else {
      document.querySelector(options.sideBarToggle).setAttribute("style", "left: 310px;")
      document.body.setAttribute("style", "padding-left: 300px;");
    }
    dom.toggleClass("side-bar", "side-bar-open");
  }

  function listenScroll() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var element = document.getElementsByClassName("gotop")[0]
    scrollTop > 100 ? dom.addClass("gotop", "fadeIn") : dom.removeClass("gotop", "fadeIn")

    element.onclick = function () {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  }

  document.querySelector(options.sideBarToggle).addEventListener('click', updateSideBar)
  window.addEventListener('scroll', listenScroll)
  window.addEventListener('hashchange', updateToc)


  InstantClick.on('change', function () {
    loadScript(options.url, function () {
      document.querySelectorAll('pre code').forEach(function (block) {
        hljs.initHighlighting(block);
      })
    })
  })
})();