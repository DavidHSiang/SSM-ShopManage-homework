        /**
         * 校验输入框内容, 若有错误显示错误信息
         * @param {Jquery} $input - 需要校验的 Input输入框
         * @param {ValidateUnit} validateUnit - 校验单元validateUnit
         * @param {String} errorMsg - 需要显示的错误信息
         */
        function validateInputAndShowErrMsg($input, validateUnit, errorMsg) {
            var val = $input.val()
            var flag = validateUnit.getResult(val)

            $input.next("span").remove()

            if (!flag) {
                $input.addClass("input-error")
                    .after("<span>" + errorMsg + "</span>")
            } else {
                $input.removeClass("input-error")
            }
            return flag
        }