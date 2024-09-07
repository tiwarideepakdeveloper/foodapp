class AjaxHandler {
    constructor() {

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

    put(url, data, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            success: function (response) {
                successCallback(response);
            },
            error: function (err) {
                errorCallback(err);
            }
        });
    }

    delete(url, data, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'DELETE',
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
}
