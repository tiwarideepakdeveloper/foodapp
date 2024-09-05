class AjaxHandler {
    constructor() {
        // You can initialize default headers or options if needed
    }

    post(url, data, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function (response) {
                successCallback(response);
            },
            error: function (err) {
                errorCallback(err);
            }
        });
    }

    get(url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (response) {
                successCallback(response);
            },
            error: function (err) {
                errorCallback(err);
            }
        });
    }

    alertUser() {
        console.log("fff");

    }
}
