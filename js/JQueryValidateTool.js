/**
 * 校验输入框内容, 若有错误显示错误信息
 * @param {Jquery} $input - 需要校验的 Input输入框
 * @param {ValidateUnit} validateUnit - 校验单元validateUnit
 * @param {String} errorMsg - 需要显示的错误信息
 */
function validateInputAndShowErrMsg($input, validateUnit, errorMsg) {
    var val = $input.val()
    var flag = validateUnit.getResult(val)
    removeInputClass($input)
    if (!flag) {
        $input.addClass("input-error")
            .after("<span>" + errorMsg + "</span>")
    }
    return flag
}

function removeInputClass($input) {
    $input.removeClass("input-error").next("span").remove()
    return $input
}

function validatePassword($input) {
    var flag = validateInputAndShowErrMsg(
        $input,
        ValidateTool.validatePassword(),
        "密码为英文字母大小写和数字组成的4-10位字符"
    )
    return flag
}
function validateConfirmPassword($input, $passwordInput) {
    var flag = validatePassword($input)
    if (!flag) {
        return flag
    }
    flag = validateInputAndShowErrMsg(
        $input,
        ValidateTool.validateEqualTo($passwordInput.val()),
        "密码不相同"
    )
    return flag
}
function validateUsername($input){
    validateInputAndShowErrMsg(
        $input,
        ValidateTool.validateUsername(),
        "用户名为英文字母大小写和数字组成的3-16位字符"
      )
}