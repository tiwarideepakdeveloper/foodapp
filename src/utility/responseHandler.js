export class ResponseHandler {
    static success(res, message, data = {}) {
        res.status(200).json({
            success: true,
            message,
            data
        });
    }

    static created(res, message, data = {}) {
        res.status(201).json({
            success: true,
            message,
            data
        });
    }

    static badRequest(res, message, errors = {}) {
        res.status(400).json({
            success: false,
            message,
            errors
        });
    }

    static unauthorized(res, message) {
        res.status(401).json({
            success: false,
            message
        });
    }

    static accessDenied(res, message) {
        res.status(403).json({
            success: false,
            message
        });
    }

    static serverError(res, message, error = {}) {
        res.status(500).json({
            success: false,
            message,
            error
        });
    }
}