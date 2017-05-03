/**
 * Created by Administrator on 2017/5/2.
 */
/**
 * 【func】  定义 元素需要执行的校验函数名
 *
 * 【funcType】 定义 校验函数的触发条件
 *  配置优先级： 配置 > 全局默认：15；未设置则默认全部校验类型均执行该校验函数；
 *     1类监听事件：focus: 1;
 *     2类监听事件：change|keyup|input|prototypechange: 2;
 *     3类监听事件：blur: 4;
 *     4类监听事件：submit: 8;
 *  函数默认拥有全部操作权限，即1+2+4+8=15；
 *
 * 【error】   校验失败时，要展示的错误信息；%p1代表params[0]对应的值，%p1代表params[1]对应的值...以此类推；
 *
 *  【params】 校验方法中需要用到的全部变量组成的数组；
 *
 * ================================================================
 * =    可以再元素中添加属性配置params中的元素,且该方法的【优先级最高】  =
 * ================================================================
 *
 * 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
 * 示例：
 *      <input checkClass="size" minSize="3"/>
 *  则：
 *      error为：3-99位
 *、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
 */
var initialConfig = {

    //默认配置列表
    "checkClass": {
        // 必填校验
        "require": {
            "func": "object_check_empty",
            "funcType": 15,
            "error": "不能为空"
        },

        // email校验
        "email": {
            "func": "object_check_email_format",
            "funcType": 15,
            "error": "邮箱格式错误"
        },

        // 数字大小校验
        "size": {
            "func": "object_check_size",
            "funcType": 15,
            "error": "%p0-%p1",
            "params": ["minSize", "maxSize"],
            // params列表的默认值
            "minSize": "1",
            "maxSize": "99"
        }

        //其他校验配置

    }

}