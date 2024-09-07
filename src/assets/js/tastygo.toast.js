class TastyGoToast {
    constructor() {

    }

    static success = function (msg) {
        $.toast({
            text: msg,
            showHideTransition: 'slide',
            bgColor: '#198754',
            textColor: '#ffff',
            allowToastClose: true,
            hideAfter: 3000,
            stack: 1,
            textAlign: 'left',
            position: 'top-right'
        })
    }

    static danger = function (msg) {
        $.toast({
            text: msg,
            showHideTransition: 'slide',
            bgColor: '#dc3545',
            textColor: '#ffff',
            allowToastClose: true,
            hideAfter: 3000,
            stack: 1,
            textAlign: 'left',
            position: 'top-right'
        })
    }

    static process = function (msg) {
        $.toast({
            text: msg,
            showHideTransition: 'slide',
            bgColor: 'black',
            textColor: '#ffff',
            allowToastClose: false,
            stack: 1,
            hideAfter: false,
            textAlign: 'left',
            position: 'top-right'
        })
    }

    static resetToast = function () {
        $.toast().reset('all');
    }
}
