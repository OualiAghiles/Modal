function myModal(nscModal, options) {
  var defaultOptions = {
    background: {
      visible: true,
      color: 'rgba(0,0,0,0.3)'
    },
    fullSize: false
  }
  function parseOptions(options, modal) {
    if (options.hasOwnProperty('background') && options.background.hasOwnProperty('visible')) {
      if (!options.background.visible) {
        modal.style.background = 'none'
      }
      if (options.background.visible && options.background.color) {
        modal.style.background = options.background.color
      }
    }
    if (options.hasOwnProperty('fullSize') && options.fullSize) {
      var modalcontent = modal.querySelector('.modal-container')
      modalcontent.classList.add('full-size')
    }
  }
  function close(modal) {
    var closeBtn = modal.querySelector('.close')
    closeBtn.addEventListener('click', function(e) {
      modal.classList.remove('is-visible')
    })
  }
  function merge(target, source) {
    /* Merges two (or more) objects,
       giving the last one precedence */
    if (typeof target !== 'object') {
      target = {}
    }
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        var sourceProperty = source[property];
        if (typeof sourceProperty === 'object') {
          target[property] = merge(target[property], sourceProperty);
          continue;
        }
        target[property] = sourceProperty;
      }
    }
    for (var a = 2, l = arguments.length; a < l; a++) {
      merge(target, arguments[a]);
    }
    return target;
  }
  var applyedOptions = merge(defaultOptions, options)
  console.log(applyedOptions);
  // btn Modal
  var modalBtn = document.querySelectorAll('.link')
  for (var i = 0; i < modalBtn.length; i++) {
    modalBtn[i].addEventListener('click', function(e) {
      e.preventDefault()
      var target = this.getAttribute('data-target')
      var modal = document.querySelector(nscModal + '[data-title=' + target + ']')
      if (modal) {
        modal.classList.add('is-visible')
        parseOptions(applyedOptions, modal)
        modal.addEventListener('click', function(event) {
          var modalBody = modal.querySelector('.modal-body')
          if (event.target === modalBody) {
            event.target.parentNode.classList.remove('is-visible')
          }
        }, false)
        close(modal)
      }
    })
  }
  document.addEventListener('keypress', function(e) {
    if (e.keyCode === 27) {
      var modal = document.querySelector(nscModal + '.is-visible')
      modal.classList.remove('is-visible')
    }
  })
}
myModal('#modal', {
  background: {
    visible: false
  },
    fullSize: true
})
myModal('#modal1', {
  background: {
    color: "rgba(0,0,0,0.8)",
  }
})
