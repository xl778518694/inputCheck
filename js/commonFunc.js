/**
 * Created by Administrator on 2017/5/3.
 */
// 校验邮件地址格式
function validateEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
        return true;
    } else {
        return false;
    }
}

function isInt(str) {
    var filter = /^\d+$/;
    if (filter.test(str)) {
        return true;
    } else {
        return false;
    }
}

function object_check_empty(arr) {
    if (arr['value'].length <= 0)
        return false;
    else
        return true;
}

//检验email是否合法
function object_check_email_format(arr){

    if(arr['value'].length <= 0){//为空时
        return true;
    }
    if(false == validateEmail(arr['value'])){//不符合email格式且不为空
        return false;
    }else{
        return true;
    }
}

//检验大小是否符合配置
function object_check_size(arr){

    if(arr['value'].length <= 0){//为空时
        return true;
    }
    if(isInt(arr['value']) && Number(arr['value']) >= Number(arr['minSize']) && Number(arr['value']) <= Number(arr['maxSize'])){//不符合email格式且不为空
        return true;
    }else{
        return false;
    }
}