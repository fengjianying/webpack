jQuery.extend({

    /*********************type类型判断************************/
    /**
     * 判断是否为有效变量
     *
     * @param variable
     */
    isValidVariable: function (variable) {
        if (variable !== undefined && variable != null && variable != 'null') {
            if (this.type(variable) === 'string') {
                if (this.trim(variable) != '') {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    },

    /**
     * 判断是否是有效对象和数组（用于ajax回调验证数据是否有值）
     */
    isValidObject: function (data) {
        if (data && ($.trim(data) != "") && (typeof data == "object")) {
            for (var i in data) {
                if (i) {
                    return true;
                }
            }
        }
        return false;
    },
    /**
     * 是否字符串
     */
    isString: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'String'
    },
    /**
     * 是否数字
     * @param o
     * @returns {boolean}
     */
    isNumber: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
    },
    /**
     * 是否对象
     * @param o
     * @returns {boolean}
     */
    isObj: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
    },
    /**
     * 是否数组
     * @param o
     * @returns {boolean}
     */
    isArray: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
    },
    /**
     * 是否时间
     * @param o
     * @returns {boolean}
     */
    isDate: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
    },
    /**
     * 是否boolean
     * @param o
     * @returns {boolean}
     */
    isBoolean: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
    },
    /**
     * 是否函数
     * @param o
     * @returns {boolean}
     */
    isFunction: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
    },
    /**
     * 是否为null
     * @param o
     * @returns {boolean}
     */
    isNull: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
    },
    /**
     * 是否undefined
     * @param o
     * @returns {boolean}
     */
    isUndefined: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
    },
    /**
     * 是否为false
     * @param o
     * @returns {boolean}
     */
    isFalse: function (o) {
        if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
        return false
    },
    /**
     * 是否为true
     * @param o
     * @returns {boolean}
     */
    isTrue: function (o) {
        return !this.isFalse(o)
    },
    /**
     * 是否为ios
     * @returns {boolean}
     */
    isIos: function () {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
            // return "Android";
            return false
        } else if (u.indexOf('iPhone') > -1) { //苹果手机
            // return "iPhone";
            return true
        } else if (u.indexOf('iPad') > -1) { //iPad
            // return "iPad";
            return false
        } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
            // return "Windows Phone";
            return false
        } else {
            return false
        }
    },
    /**
     * 是否为PC
     * @returns {boolean}
     */
    isPC: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    /**
     * 浏览器类型
     * @returns {*}
     */
    browserType: function () {
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) return "IE7"
            else if (fIEVersion == 8) return "IE8";
            else if (fIEVersion == 9) return "IE9";
            else if (fIEVersion == 10) return "IE10";
            else if (fIEVersion == 11) return "IE11";
            else return "IE7以下" //IE版本过低
        }

        if (isFF) return "FF";
        if (isOpera) return "Opera";
        if (isEdge) return "Edge";
        if (isSafari) return "Safari";
        if (isChrome) return "Chrome";
    },
    /**
     * 判断字符串类型
     * @param str
     * @param type
     * @returns {boolean}
     */
    checkStr: function (str, type) {
        switch (type) {
            case 'phone': //手机号码
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel': //座机
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'card': //身份证
                return /^\d{15}|\d{18}$/.test(str);
            case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                return /^[a-zA-Z]\w{5,17}$/.test(str)
            case 'postal': //邮政编码
                return /[1-9]\d{5}(?!\d)/.test(str);
            case 'QQ': //QQ号
                return /^[1-9][0-9]{4,9}$/.test(str);
            case 'email': //邮箱
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'money': //金额(小数点2位)
                return /^\d*(?:\.\d{0,2})?$/.test(str);
            case 'URL': //网址
                return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
            case 'IP': //IP
                return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
            case 'date': //日期时间
                return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            case 'number': //数字
                return /^[0-9]$/.test(str);
            case 'english': //英文
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese': //中文
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower': //小写
                return /^[a-z]+$/.test(str);
            case 'upper': //大写
                return /^[A-Z]+$/.test(str);
            case 'HTML': //HTML标记
                return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
            default:
                return true;
        }
    },
    /**
     * 判断两个对象是否内容相同
     *
     * @param o1
     * @param o2
     */
    isEquals: function (o1, o2) {

        if (this.type(o1) != this.type(o2)) {
            return false;
        }

        if (o1 == null || o2 == null) {
            return o1 == o2;
        }

        if (this.type(o1) == 'object' || this.type(o1) == 'array') {
            if (this.getObjectLength(o1) != this.getObjectLength(o2)) {
                return false;
            }
            for (var key in o1) {
                if (typeof o2[key] == 'undefined') {
                    return false;
                }
                if (!this.isEquals(o1[key], o2[key])) {
                    return false;
                }
            }
            return true;
        } else {
            return o1.toString() == o2.toString();
        }

    },
    /**
     * 获取对象属性长度
     *
     * @param o
     * @returns
     */
    getObjectLength: function (o) {
        var length = 0;
        if (!$.type(o) == 'object') {
            return undefined;
        } else {
            for (var key in o) {
                o[key];
                length++;
            }
        }
        return length;
    },
    /**
     * 时间加减
     *
     * @param time
     *            yyyyMMddHHmm
     * @param addMillis
     * @returns {String}
     */
    addStringTime: function (time, addMillis) {
        var date = this.parseFullTime(time);
        var newDate = this.addDateTime(date, addMillis);
        var newStringTime = this.getFullTime(newDate);
        return newStringTime;
    },

    /**
     * 时间加减
     *
     * @param date
     *            yyyyMMddHHmm
     * @param addMillis
     * @returns {Date}
     */
    addDateTime: function (date, addMillis) {
        var newDateMillis = date.getTime() + addMillis;
        var newDate = new Date();
        newDate.setTime(newDateMillis);
        return newDate;
    },

    /***************************数组判断**********************/
    /**遍历数组
     * @param  {arr} 数组
     * @param  {fn} 回调函数
     * @return {undefined}
     */
    each: function (arr, fn) {
        fn = fn || Function;
        var a = [];
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < arr.length; i++) {
            var res = fn.apply(arr, [arr[i], i].concat(args));
            if (res != null) a.push(res);
        }
    },

    /**遍历数组
     * @param  {arr} 数组
     * @param  {fn} 回调函数
     * @param  {thisObj} this指向
     * @return {Array}
     */
    map: function (arr, fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for (var i = 0, j = arr.length; i < j; ++i) {
            var res = fn.call(scope, arr[i], i, this);
            if (res != null) a.push(res);
        }
        return a;
    },

    /**
     * 去重
     * @param arr
     * @returns {*}
     */
    unique: function (arr) {
        if (Array.hasOwnProperty('from')) {
            return Array.from(new Set(arr));
        } else {
            var n = {},
                r = [];
            for (var i = 0; i < arr.length; i++) {
                if (!n[arr[i]]) {
                    n[arr[i]] = true;
                    r.push(arr[i]);
                }
            }
            return r;
        }
    },
    /**
     * 求两个集合的并集
     * @param a
     * @param b
     * @returns {*}
     */
    union: function (a, b) {
        var newArr = a.concat(b);
        return this.unique(newArr);
    },
    /**
     * 求两个集合的交集
     * @param a
     * @param b
     * @returns {*|Array}
     */
    intersect: function (a, b) {
        var _this = this;
        a = this.unique(a);
        return this.map(a, function (o) {
            return _this.contains(b, o) ? o : null;
        });
    },
    /**
     * 删除其中一个元素
     * @param arr
     * @param ele
     * @returns {*}
     */
    remove: function (arr, ele) {
        var index = arr.indexOf(ele);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },
    /**
     * 将类数组转换为数组的方法
     * @param ary
     * @returns {Array}
     */
    formArray: function (ary) {
        var arr = [];
        if (Array.isArray(ary)) {
            arr = ary;
        } else {
            arr = Array.prototype.slice.call(ary);
        };
        return arr;
    },
    /**
     * 最大值
     * @param arr
     * @returns {number}
     */
    max: function (arr) {
        return Math.max.apply(null, arr);
    },
    /**
     * 最小值
     * @param arr
     * @returns {number}
     */
    min: function (arr) {
        return Math.min.apply(null, arr);
    },
    /**\
     * 平均值
     * @param arr
     * @returns {number}
     */
    average: function (arr) {
        return this.sum(arr) / arr.length
    },
    /********************字符串操作*******************************************/
    /**
     * 去除空格
     * @param  {str}
     * @param  {type}  1-所有空格  2-前后空格  3-前空格 4-后空格
     * @return {String}
     */

    stringTrim: function (str, type) {
        type = type || 1
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },

    /**大写转换
     * @param  {str}
     * @param  {type}1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
     * @return {String}
     */

    changeCase: function (str, type) {

        type = type || 4

        switch (type) {

            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                });

            case 2:
                return str.replace(/\b\w+\b/g, function (word) {

                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });

            case 3:
                return str.split('').map(function (word) {

                    if (/[a-z]/.test(word)) {

                        return word.toUpperCase();

                    } else {

                        return word.toLowerCase()

                    }

                }).join('')

            case 4:

                return str.toUpperCase();

            case 5:
                return str.toLowerCase();

            default:
                return str;

        }
    }
})
