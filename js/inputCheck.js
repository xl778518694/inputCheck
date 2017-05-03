/**
 * 根据classname获取dom节点，ie8不支持默认的函数
 * @param searchClass
 * @param node
 * @param tag
 * @returns {Array}
 */
var obj_getElesByClass = function (searchClass, node, tag) {
    node = node || document;
    tag = tag || "*";
    var result = [];
    if (document.getElementsByClassName) {
        var nodes = node.getElementsByClassName(searchClass);
        if (tag !== "*") {
            for (var i = 0; node = nodes[i++];) {
                if (node.tagName === tag.toUpperCase()) {
                    result.push(node);
                }
            }
        } else {
            result = nodes;
        }
    } else {
        var classes = searchClass.split(" "),
            elements = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag),
            patterns = [],
            current,
            match;
        var i = classes.length;
        while (--i >= 0) {
            patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
        }
        var j = elements.length;
        while (--j >= 0) {
            current = elements[j];
            match = false;
            for (var k = 0, kl = patterns.length; k < kl; k++) {
                match = patterns[k].test(current.className);
                if (!match)  break;
            }
            if (match)  result.push(current);
        }
    }
    return result;
}

/**
 * 根据classname移除元素节点
 *
 * @param className
 */
var obj_removeEleByClass = function (className, node, tag) {
    var dom = obj_getElesByClass(className, node, tag);
    while (dom.length > 0) {
        dom[0].parentNode.removeChild(dom[0]);
        //兼容ie8，防止死循环
        dom = obj_getElesByClass(className, node, tag);
    }
}

/**
 * input 元素通过对象模式校验
 * @param inputID 待检查的元素ID
 * @param acType 以acType事件的方式来检测元素；1：focus；2：keyup；4：blur；8：submit;
 */
function input_check(target, acType) {

    var checkClass = target.getAttribute('checkClass');

    // 校验是否存在需要检验的方法，不存在则返回校验成功
    if (undefined == checkClass || '' == checkClass) {
        return true;
    }

    // checkClass中需要校验的方法以" " 分隔，同class
    checkClass = checkClass.split(' ');

    var len = checkClass.length;
    for (var i = 0; i < len; i++) {
        var temp = initialConfig["checkClass"][checkClass[i]];

        //处理默认的funcType
        if (undefined == checkClass || '' == checkClass) {
            temp['funcType'] = 15;
        } else if (isNaN(Number(temp['funcType']))) {
            return object_set_status(target, 0,
                'check.json.js文件中的initialConfig["checkClass"]["' + [checkClass[i]] + '"]["funcType"]不是数字，请更正');
        }

        if ((Number(acType) & Number(temp['funcType'])) == Number(acType)) {

            // 判断参数变量的值是否采用默认值
            var params = temp['params'];
            if (undefined != params && '' != params) {
                for (var j = 0; j < params.length; j++) {
                    var p = temp['params'][j];
                    var param = target.getAttribute(params[j]);
                    if (undefined !== param && null != param) {
                        temp[p] = param;
                    }
                }
            }

            temp['value'] = target.value;
            var result = eval(temp['func'] + "(temp)");
            if (false == result) {
                var reg = /%p(\d+)/g;
                temp['error'] = temp['error'].replace(reg, function (a) {
                    return temp[params[a.substr(2)]];
                });
                return object_set_status(target, 0, temp['error']);
            }
        }
    }
    return object_set_status(target, 1, 0);

}

//状态设置
function object_set_status(target, status, errID) {
    var text = '其他错误';
    if (undefined != errID && '' != errID) {
        text = errID;
    }
    //定义校验结果显示DIV
    if (status == 0) {//状态0：不符合规范

        var nP = target.parentNode,
            errorShow;
        var dom = obj_getElesByClass('checkResult', nP);
        if (dom.length > 0) {
            errorShow = dom[0];
        } else {
            //设置当前错误提示区域宽度；根据字符数设置；
            errorShow = document.createElement('div');
            errorShow.className = 'checkResult';
            nP.appendChild(errorShow);
        }

        errorShow.innerText = text;
        errorShow.style.left = Number(target.offsetLeft) + "px";
        errorShow.style.top = (Number(target.offsetTop) + Number(target.offsetHeight)) + "px";

        //变更输入框状态
        target.className = target.className.replace(/(input-error)|(input-correct)/gi, '') + " input-error";

        return false;
    } else {//数据合法状态设置


        var nP = target.parentNode;

        //变更输入框状态
        target.className = target.className.replace(/(input-error)|(input-correct)/gi, '') + " input-correct";

        //置空错误提示区域提示内容
        obj_removeEleByClass('checkResult', nP);
        return true;
    }
}

/**
 * 添加事件监听兼容性处理
 *
 * @param tag 监听对象
 * @param event 监听事件
 * @param func 事件处理函数
 */
var obj_addEvent = function (tag, event, func) {
    if (undefined != tag.addEventListener) {
        tag.addEventListener(event, func, false);
    } else if (undefined != tag.attachEvent) {
        tag.attachEvent('on' + event, func);
    } else {
        tag['on' + event] = func;
    }
}

/**
 * 表单提交校验
 * 可自性扩展,实现，例如隐藏时，不校验等；
     function checkForm(){
         遍历全部需要校验的元素
         表单提交类校验： input_check(target, 8);
    }
 */

// 页面加载完毕后，追加监听事件
window.onload = function () {
    /**
     * 监听时间空间的点击事件
     */
    var node = obj_getElesByClass('objectCheckInput', '', '');
    var len = node.length;
    for (var i = 0; i < len; i++) {
        obj_addEvent(node[i], 'focus', function (event) {
            event = event || window.event;
            var obj = event.srcElement || event.target;
            //校验当前input元素
            input_check(obj, 1);
        });
        obj_addEvent(node[i], 'keyup', function (event) {
            event = event || window.event;
            var obj = event.srcElement || event.target;
            //校验当前input元素
            input_check(obj, 2);
        });
        obj_addEvent(node[i], 'blur', function (event) {
            event = event || window.event;
            var obj = event.srcElement || event.target;
            //校验当前input元素
            input_check(obj, 4);
        });
    }
}
