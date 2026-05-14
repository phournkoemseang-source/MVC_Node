export default class BaseController {
    success(res, message = "Success", data = null, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    error(res, message = "Something went wrong", statusCode = 500, details = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            error: details
        });
    }
}
