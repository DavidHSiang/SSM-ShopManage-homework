document.write("<script src='./js/Const.js'></script>");

function loginValidateTest() {
    alert("登录成功")
    window.location.href = HOME_URL
}

function loginValidate(requestData, requestType = "POST") {
    $.ajax({
        url: BASE_URL + LOGIN_VALIDATE_API,
        data: requestData,
        type: requestType,
        success: request => {
            if (isRequestSuccess(request)) {
                //成功
                alert("登录成功")
                window.location.href = HOME_URL
            } else {
                //失败
                alert(eval("request." + REQUEST_MSG))
            }
        }
    })
}


function registerTest(requestData, requestType = "POST") {
    alert("注册成功")
    window.location.href = LOGIN_URL
}

function register(requestData, requestType = "POST") {
    $.ajax({
        url: BASE_URL + REGISTER_API,
        data: requestData,
        type: requestType,
        success: request => {
            if (isRequestSuccess(request)) {
                //成功
                alert("注册成功")
                window.location.href = LOGIN_URL
            } else {
                //失败
                alert(eval("request." + REQUEST_MSG))
            }
        }
    })
}

function isRequestSuccess(request) {
    return eval("request." + REQUEST_STATUS) == RESPONSECODE.SUCCESS.CODE
}