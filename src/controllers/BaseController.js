
export default class BaseController {
    // Respond success
    success(res, message = "Success", data = null, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    // Respond error
    error(res, message = "Something went wrong", statusCode = 500, error = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            error
        });
    }
}
