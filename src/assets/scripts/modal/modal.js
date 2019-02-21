var UIMoodalCotroller = (function() {
    	
}());
var ModalOptions = (function () {


    
    return {
        parseOptions: function (options, modal) {
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
        },
        merge: function (target, source) {
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
    }
}());
var ModalController = (function() {
    var defaultOptions = {
        background: {
            visible: true,
            color: 'rgba(0,0,0,0.3)'
        },
        fullSize: false
    };
        
    var setupEvents = function (btn, nscModal, options) {
        var modalBtn = document.querySelectorAll(btn)
        for (var i = 0; i < modalBtn.length; i++) {
            modalBtn[i].addEventListener('click', function (e) {
                e.preventDefault()
                var target = this.getAttribute('data-target')
                var modal = document.querySelector(nscModal + '[data-title=' + target + ']')
                if (modal) {
                    modal.classList.add('is-visible')
                    var parse = ModalOptions.merge(defaultOptions, options)
                    console.log(parse);
                    
                    ModalOptions.parseOptions(parse, modal)
                    modal.addEventListener('click', function (event) {
                        var modalBody = modal.querySelector('.modal-body')
                        if (event.target === modalBody) {
                            event.target.parentNode.classList.remove('is-visible')
                        }
                    }, false)
                    ModalController.close(modal)

                }
            })

        };
        document.addEventListener('keyup', function (e) {
            if (e.keyCode === 27) {
                var modals = [].slice.call(document.querySelectorAll('.modal.is-visible'))
                if (modals.length > 0) {

                    modals[modals.length - 1].classList.remove('is-visible')
                    e.cancelBubble = true
                    e.preventDefault()
                }
            }
        })
    }
    return {
        close : function (modal) {
            console.log(modal);
            var closeBtn = modal.querySelector('.close')
            closeBtn.addEventListener('click', function (e) {
                console.log('clicked');
                modal.classList.remove('is-visible')
            })
        },
        init: function (btn,nscModal,options) {
            //options = ModalOptions.applyedOptions(defaultOptions)
            setupEvents(btn, nscModal, options)
        }
    }
}());

ModalController.init('.link', '#modal')
ModalController.init('.link', '#modal1')