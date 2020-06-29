var ValidateUnit = (function() {

    var privateData = new WeakMap();

    function ValidateUnit(validateString, validate, min = "0", max = "") {
        privateData.set(this, {
            validateString: validateString,
            validate: validate,
            min: min,
            max: max,
            bracketsForValidateString: true
        })
    }

    function getValidateString(_this) {
        return privateData.get(_this).validateString
    }

    function getValidate(_this) {
        return privateData.get(_this).validate
    }

    function isBracketsForValidateString(_this) {
        return privateData.get(_this).bracketsForValidateString
    }

    function setBracketsForValidateString(_this, flag) {
        if (typeof(flag) != "boolean") {
            return
        }
        var thisData = privateData.get(_this)
        thisData.bracketsForValidateString = flag
        privateData.set(_this, thisData)
    }

    function getMinLength(_this) {
        return privateData.get(_this).min
    }

    function getMaxLength(_this) {
        return privateData.get(_this).max
    }

    function andValidateString(_this, val) {
        var thisData = privateData.get(_this)
        if (thisData.validateString.indexOf(val) == -1) {
            thisData.validateString += val
            privateData.set(_this, thisData)
        }
    }

    ValidateUnit.prototype.andUpperCase = function() {
        andValidateString(this, "A-Z")
        return this
    }

    ValidateUnit.prototype.andLowerCase = function() {
        andValidateString(this, "a-z")
        return this
    }

    ValidateUnit.prototype.andNumber = function() {
        andValidateString(this, "0-9")
        return this
    }

    ValidateUnit.prototype.andChinese = function() {
        andValidateString(this, "\u2E80-\u9FFF")
        return this
    }

    function removeValidate(_this, val) {
        var thisData = privateData.get(_this)
        if (thisData.validateString.indexOf(val) != -1) {
            thisData.validateString = thisData.validateString.replace(val, "")
            privateData.set(_this, thisData)
        }
    }

    ValidateUnit.prototype.removeUpperCase = function() {
        removeValidate(this, "A-Z")
        return this
    }

    ValidateUnit.prototype.removeLowerCase = function() {
        removeValidate(this, "a-z")
        return this
    }

    ValidateUnit.prototype.removeNumber = function() {
        removeValidate(this, "0-9")
        return this
    }

    ValidateUnit.prototype.removeChinese = function() {
        removeValidate(this, "\u2E80-\u9FFF")
        return this
    }

    function validateLengthInput(min, max) {
        if (isNaN(min) || isNaN(max)) {
            return false
        }
        if (Number(min) < 0 || Number(max) < 0) {
            return false
        }
        if (min == "") {
            return false
        }
        return true
    }

    ValidateUnit.prototype.setLength = function(min, max) {
        if (!validateLengthInput(min, max)) {
            return
        }
        if (Number(min) > Number(max) && max != "") {
            min = min ^ max;
            max = min ^ max;
            min = min ^ max;
        }
        var thisData = privateData.get(this)
        thisData.min = min
        thisData.max = max
        privateData.set(this, thisData)
        return this
    }

    ValidateUnit.prototype.setMinLength = function(min) {
        if (!validateLengthInput(min, 0)) {
            return
        }
        var thisData = privateData.get(this)

        max = thisData.max
        if (min > max) {
            thisData.max = ""
        }

        thisData.min = min
        privateData.set(this, thisData)
        return this
    }

    ValidateUnit.prototype.setMaxLength = function(max) {
        if (!validateLengthInput(0, max)) {
            return
        }

        var thisData = privateData.get(this)

        min = thisData.min
        if (min > max) {
            thisData.min = "0"
        }

        thisData.max = max
        privateData.set(this, thisData)
        return this
    }

    ValidateUnit.prototype.toString = function(min, max) {
        var validateString = getValidateString(this)
        var min = getMinLength(this)
        var max = getMaxLength(this)
        if (isBracketsForValidateString(this)) {
            return "[" + validateString + "]" + "{" + min + "," + max + "}"
        }
        return validateString
    }

    ValidateUnit.prototype.appendValidateLowerCase = function() {
        var validateUnit = getValidate(this).createValidateUnit("a-z")
        return validateUnit
    }

    ValidateUnit.prototype.appendValidateUpperCase = function() {
        var validateUnit = getValidate(this).createValidateUnit("A-Z")
        return validateUnit
    }

    ValidateUnit.prototype.appendValidateNumber = function() {
        var validateUnit = getValidate(this).createValidateUnit("0-9")
        return validateUnit
    }

    ValidateUnit.prototype.appendValidateChinese = function() {
        var validateUnit = getValidate(this).createValidateUnit("\u2E80-\u9FFF")
        return validateUnit
    }

    //-----------------------------------------------------------------------------------------------------------------------------------
    //todo prependValidate

    ValidateUnit.prototype.prependValidateLowerCase = function(min = "0", max = "") {
        var validateUnit = getValidate(this).prependValidateUnit("a-z", min, max)
        return validateUnit
    }

    ValidateUnit.prototype.prependValidateUpperCase = function(min = "0", max = "") {
        var validateUnit = getValidate(this).prependValidateUnit("A-Z", min, max)
        return validateUnit
    }

    ValidateUnit.prototype.prependValidateNumber = function(min = "0", max = "") {
        var validateUnit = getValidate(this).prependValidateUnit("0-9", min, max)
        return validateUnit
    }

    ValidateUnit.prototype.prependValidateChinese = function(min = "0", max = "") {
        var validateUnit = getValidate(this).prependValidateUnit("\u2E80-\u9FFF", min, max)
        return validateUnit
    }

    ValidateUnit.prototype.prependValidateEnglish = function(min = "0", max = "") {
        return this.prependValidateUpperCase(min, max).andLowerCase()
    }

    //-----------------------------------------------------------------------------------------------------------------------------------


    ValidateUnit.prototype.getResult = function(val) {
        var result = getValidate(this).getResult(val)
        return result
    }

    ValidateUnit.prototype.withOutBracketsForValidateString = function() {
        //bracketsForValidateString设置为false
        setBracketsForValidateString(this, false)
        return this
    }

    ValidateUnit.prototype.useBracketsForValidateString = function() {
        //bracketsForValidateString设置为true
        setBracketsForValidateString(this, true)
        return this
    }

    return ValidateUnit;
}());

var Validate = (function() {
    var privateData = new WeakMap();

    function Validate() {
        privateData.set(this, {
            validateUnit: []
        })
    }

    Validate.prototype.append = function(validateUnit) {
        privateData.get(this).validateUnit.push(validateUnit)
    }

    Validate.prototype.prepend = function(validateUnit) {
        privateData.get(this).validateUnit.unshift(validateUnit)
    }

    Validate.prototype.appendValidateUnit = function(validateString, min = "0", max = "") {
        var validateUnit = new ValidateUnit(validateString, this, min, max)
        this.append(validateUnit)
        return validateUnit
    }

    Validate.prototype.prependValidateUnit = function(validateString, min = "0", max = "") {
        var validateUnit = new ValidateUnit(validateString, this, min, max)
        this.prepend(validateUnit)
        return validateUnit
    }

    Validate.prototype.getResult = function(val) {
        var regStr = eval(" /(^" + privateData.get(this).validateUnit.join("") + "$)/")
        return regStr.test(val)
    }

    return Validate;
}());

var ValidateTool = (function() {

    function ValidateTool() {}

    ValidateTool.validateLowerCase = function(min = "0", max = "") {
        var validate = new Validate()
        var validateUnit = validate.appendValidateUnit("a-z", min, max)
        return validateUnit
    }

    ValidateTool.validateUpperCase = function(min = "0", max = "") {
        var validate = new Validate()
        var validateUnit = validate.appendValidateUnit("A-Z", min, max)
        return validateUnit
    }

    ValidateTool.validateEnglish = function(min = "0", max = "") {
        return ValidateTool.validateUpperCase(min, max).andLowerCase()
    }

    ValidateTool.validateEnglishAndNumber = function(min = "0", max = "") {
        return ValidateTool.validateEnglish(min, max).andNumber()
    }

    ValidateTool.validateChinese = function(min = "0", max = "") {
        var validate = new Validate()
        var validateUnit = validate.appendValidateUnit("\u2E80-\u9FFF", min, max);
        return validateUnit
    }

    ValidateTool.validateNumber = function(min = "0", max = "") {
        var validate = new Validate()
        var validateUnit = validate.appendValidateUnit("0-9", min, max);
        return validateUnit
    }

    //用户名校验
    ValidateTool.validateUsername = function(min = 3, max = 16) {

        //默认用户名由英文字母大小写和数字组成的3-16位字符
        return ValidateTool.validateEnglishAndNumber(min, max)
    }

    //密码校验
    ValidateTool.validatePassword = function(min = 4, max = 10) {

        //默认密码由英文字母大小写和数字组成的4-10位字符
        return ValidateTool.validateEnglishAndNumber(min, max)
    }

    //todo 邮箱校验
    ValidateTool.validateEmail = function() {
        //  正则 : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ 
    }

    //todo 固定电话校验
    ValidateTool.validateTelephone = function() {
        //  正则 : /^0\d{2,3}-?\d{7,8}$/
    }

    //todo 固定电话校验
    ValidateTool.validateMobile = function() {
        // 正则 :  /^1[3578]\d{9}$/
    }

    //邮政编码校验
    ValidateTool.validateZipcode = function() {
        // 正则 : /^[0-9]{6}$/
        // 六位阿拉伯数字
        return ValidateTool.validateNumber(6, 6)
    }

    //校验是否相等
    ValidateTool.validateEqualTo = function(val) {
        var validate = new Validate()
        var validateUnit = validate.appendValidateUnit(val).withOutBracketsForValidateString()
        return validateUnit
    }

    return ValidateTool;
}());

/**
 * 校验传入的参数是否都为 true
 * @returns 若传入参数都为 true , 返回 true , 否则返回 false
 */
function isValidateSuccess() {
    var length = arguments.length;
    var flag = true
    for (var i = 0; i < length; i++) {
        flag = flag && arguments[i]
    }
    return flag
}