function myModal(nscModal) {
  // btn Modal
  var modalBtn = document.querySelectorAll('.link')
  for (var i = 0; i < modalBtn.length; i++) {
    modalBtn[i].addEventListener('click', function (e) {
      e.preventDefault()
      var target = this.getAttribute('data-target')
      var modal = document.querySelector(nscModal + '[data-title=' + target + ']')
      modal.classList.add('is-visible')
      console.log('modal', modal)
      modal.addEventListener('click', function (event) {
        console.log('modal', modal);
        var modalBody =  document.querySelector('.modal-body')
        if (event.target === modalBody) {
          event.target.parentNode.classList.remove('is-visible')
        }
        event.stopPropagation()
        event.preventDefault()
      }, false)
      close()
    })
  }
  function close() {
    var closeBtn = document.querySelector(nscModal + ' ' + '.close')
    closeBtn.addEventListener('click', function () {
      var modal = document.querySelector(nscModal + '.is-visible')
      modal.classList.remove('is-visible')
    })
  }
  document.addEventListener('keypress', function (e) {
    if (e.keyCode === 27) {
      var modal = document.querySelector(nscModal + '.is-visible')
      modal.classList.remove('is-visible')
    }
  })
}
myModal('.mod')
myModal('.modals')
