# inputCheck
js实现类H5的required提示

可在check.json.js文件中扩展 【校验单项】；

在input元素中添加checkClass属性自由添加存在的校验单项， 【空格分隔】同class属性；

校验函数中需要用到变量，在params数组中声明，可配置默认值，且可在元素中单独配置；元素中的配置优先级最高；两者至少存在一个，否则校验可能出错；

commonFunc.js
  主要包含check.json.js文件中校验单项所配置的"func"函数，key["func"]的值对应commonFunc中的函数名；
  
函数命名不太统一，可自行修改；
