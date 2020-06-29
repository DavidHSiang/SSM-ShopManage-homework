//URL
let BASE_URL = "http://localhost:8080/"
let HOME_URL = "home.html"

//API
let LOGIN_VALIDATE_API = "login/"
let REGISTER_API = "register/"

//Request
let REQUEST_STATUS = "status"
let REQUEST_MSG = "msg"
let RESPONSECODE = {
    SUCCESS: {
        CODE: 0,
        DESC: "SUCCESS"
    },
    ERROR: {
        CODE: 1,
        DESC: "ERROR"
    },
    NEED_LOGIN: {
        CODE: 10,
        DESC: "NEED_LOGIN"
    },
    ILLEGAL_ARGUMENT: {
        CODE: 2,
        DESC: "ILLEGAL_ARGUMENT"
    }
}