function modal(nscModal) {
  // btn Modal
  var modalBtn = document.querySelectorAll('.link')
  modalBtn.addEventListener('click', function (e) {
    e.preventDefault()
    var target = this.getAttribute('data-target')
    var modal = document.querySelector(nscModal + '[data-title=' + target + ']')
    console.log(modal);
    modal.classList.add('is-visible')
    modal.addEventListener('click', function (event) {
      var modalBody =  document.querySelector('.modal-body')
      if (event.target === modalBody) {
        modal.classList.remove('is-visible')
      }
      event.stopPropagation()
      event.preventDefault()
    }, false)
    close()
  })
  function close() {
    var closeBtn = document.querySelector(nscModal + ' ' + '.close')
    closeBtn.addEventListener('click', function () {
      this.parentNode.parentNode.parentNode.classList.remove('is-visible')
    })
  }
  document.addEventListener('keypress', function (e) {
    if (e.keyCode === 27) {
      var modal = document.querySelector(nscModal + '.is-visible')
      modal.classList.remove('is-visible')
    }
  })
}
modal('.mod1')
modal('.mod')
