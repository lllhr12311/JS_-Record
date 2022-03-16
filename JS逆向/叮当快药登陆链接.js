var MD5 = function(r) {
    function n(r, n) {
        return r << n | r >>> 32 - n
    }
    function t(r, n) {
        var t, o, e, u, f;
        return e = 2147483648 & r,
        u = 2147483648 & n,
        t = 1073741824 & r,
        o = 1073741824 & n,
        f = (1073741823 & r) + (1073741823 & n),
        t & o ? 2147483648 ^ f ^ e ^ u : t | o ? 1073741824 & f ? 3221225472 ^ f ^ e ^ u : 1073741824 ^ f ^ e ^ u : f ^ e ^ u
    }
    function o(r, n, t) {
        return r & n | ~r & t
    }
    function e(r, n, t) {
        return r & t | n & ~t
    }
    function u(r, n, t) {
        return r ^ n ^ t
    }
    function f(r, n, t) {
        return n ^ (r | ~t)
    }
    function i(r, e, u, f, i, a, c) {
        return r = t(r, t(t(o(e, u, f), i), c)),
        t(n(r, a), e)
    }
    function a(r, o, u, f, i, a, c) {
        return r = t(r, t(t(e(o, u, f), i), c)),
        t(n(r, a), o)
    }
    function c(r, o, e, f, i, a, c) {
        return r = t(r, t(t(u(o, e, f), i), c)),
        t(n(r, a), o)
    }
    function C(r, o, e, u, i, a, c) {
        return r = t(r, t(t(f(o, e, u), i), c)),
        t(n(r, a), o)
    }
    function g(r) {
        var n, t, o = "", e = "";
        for (t = 0; t <= 3; t++)
            n = r >>> 8 * t & 255,
            e = "0" + n.toString(16),
            o += e.substr(e.length - 2, 2);
        return o
    }
    var h, d, v, S, m, l, A, p, s, y = Array();
    for (r = function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var n = "", t = 0; t < r.length; t++) {
            var o = r.charCodeAt(t);
            o < 128 ? n += String.fromCharCode(o) : o > 127 && o < 2048 ? (n += String.fromCharCode(o >> 6 | 192),
            n += String.fromCharCode(63 & o | 128)) : (n += String.fromCharCode(o >> 12 | 224),
            n += String.fromCharCode(o >> 6 & 63 | 128),
            n += String.fromCharCode(63 & o | 128))
        }
        return n
    }(r),
    y = function(r) {
        for (var n, t = r.length, o = t + 8, e = (o - o % 64) / 64, u = 16 * (e + 1), f = Array(u - 1), i = 0, a = 0; a < t; )
            n = (a - a % 4) / 4,
            i = a % 4 * 8,
            f[n] = f[n] | r.charCodeAt(a) << i,
            a++;
        return n = (a - a % 4) / 4,
        i = a % 4 * 8,
        f[n] = f[n] | 128 << i,
        f[u - 2] = t << 3,
        f[u - 1] = t >>> 29,
        f
    }(r),
    l = 1732584193,
    A = 4023233417,
    p = 2562383102,
    s = 271733878,
    h = 0; h < y.length; h += 16)
        d = l,
        v = A,
        S = p,
        m = s,
        l = i(l, A, p, s, y[h + 0], 7, 3614090360),
        s = i(s, l, A, p, y[h + 1], 12, 3905402710),
        p = i(p, s, l, A, y[h + 2], 17, 606105819),
        A = i(A, p, s, l, y[h + 3], 22, 3250441966),
        l = i(l, A, p, s, y[h + 4], 7, 4118548399),
        s = i(s, l, A, p, y[h + 5], 12, 1200080426),
        p = i(p, s, l, A, y[h + 6], 17, 2821735955),
        A = i(A, p, s, l, y[h + 7], 22, 4249261313),
        l = i(l, A, p, s, y[h + 8], 7, 1770035416),
        s = i(s, l, A, p, y[h + 9], 12, 2336552879),
        p = i(p, s, l, A, y[h + 10], 17, 4294925233),
        A = i(A, p, s, l, y[h + 11], 22, 2304563134),
        l = i(l, A, p, s, y[h + 12], 7, 1804603682),
        s = i(s, l, A, p, y[h + 13], 12, 4254626195),
        p = i(p, s, l, A, y[h + 14], 17, 2792965006),
        A = i(A, p, s, l, y[h + 15], 22, 1236535329),
        l = a(l, A, p, s, y[h + 1], 5, 4129170786),
        s = a(s, l, A, p, y[h + 6], 9, 3225465664),
        p = a(p, s, l, A, y[h + 11], 14, 643717713),
        A = a(A, p, s, l, y[h + 0], 20, 3921069994),
        l = a(l, A, p, s, y[h + 5], 5, 3593408605),
        s = a(s, l, A, p, y[h + 10], 9, 38016083),
        p = a(p, s, l, A, y[h + 15], 14, 3634488961),
        A = a(A, p, s, l, y[h + 4], 20, 3889429448),
        l = a(l, A, p, s, y[h + 9], 5, 568446438),
        s = a(s, l, A, p, y[h + 14], 9, 3275163606),
        p = a(p, s, l, A, y[h + 3], 14, 4107603335),
        A = a(A, p, s, l, y[h + 8], 20, 1163531501),
        l = a(l, A, p, s, y[h + 13], 5, 2850285829),
        s = a(s, l, A, p, y[h + 2], 9, 4243563512),
        p = a(p, s, l, A, y[h + 7], 14, 1735328473),
        A = a(A, p, s, l, y[h + 12], 20, 2368359562),
        l = c(l, A, p, s, y[h + 5], 4, 4294588738),
        s = c(s, l, A, p, y[h + 8], 11, 2272392833),
        p = c(p, s, l, A, y[h + 11], 16, 1839030562),
        A = c(A, p, s, l, y[h + 14], 23, 4259657740),
        l = c(l, A, p, s, y[h + 1], 4, 2763975236),
        s = c(s, l, A, p, y[h + 4], 11, 1272893353),
        p = c(p, s, l, A, y[h + 7], 16, 4139469664),
        A = c(A, p, s, l, y[h + 10], 23, 3200236656),
        l = c(l, A, p, s, y[h + 13], 4, 681279174),
        s = c(s, l, A, p, y[h + 0], 11, 3936430074),
        p = c(p, s, l, A, y[h + 3], 16, 3572445317),
        A = c(A, p, s, l, y[h + 6], 23, 76029189),
        l = c(l, A, p, s, y[h + 9], 4, 3654602809),
        s = c(s, l, A, p, y[h + 12], 11, 3873151461),
        p = c(p, s, l, A, y[h + 15], 16, 530742520),
        A = c(A, p, s, l, y[h + 2], 23, 3299628645),
        l = C(l, A, p, s, y[h + 0], 6, 4096336452),
        s = C(s, l, A, p, y[h + 7], 10, 1126891415),
        p = C(p, s, l, A, y[h + 14], 15, 2878612391),
        A = C(A, p, s, l, y[h + 5], 21, 4237533241),
        l = C(l, A, p, s, y[h + 12], 6, 1700485571),
        s = C(s, l, A, p, y[h + 3], 10, 2399980690),
        p = C(p, s, l, A, y[h + 10], 15, 4293915773),
        A = C(A, p, s, l, y[h + 1], 21, 2240044497),
        l = C(l, A, p, s, y[h + 8], 6, 1873313359),
        s = C(s, l, A, p, y[h + 15], 10, 4264355552),
        p = C(p, s, l, A, y[h + 6], 15, 2734768916),
        A = C(A, p, s, l, y[h + 13], 21, 1309151649),
        l = C(l, A, p, s, y[h + 4], 6, 4149444226),
        s = C(s, l, A, p, y[h + 11], 10, 3174756917),
        p = C(p, s, l, A, y[h + 2], 15, 718787259),
        A = C(A, p, s, l, y[h + 9], 21, 3951481745),
        l = t(l, d),
        A = t(A, v),
        p = t(p, S),
        s = t(s, m);
    return (g(l) + g(A) + g(p) + g(s)).toUpperCase()
};

DMap = function() {
    this.data = {},
    this.len = 0,
    this.size = function() {
        return this.len
    }
    ,
    this.isEmpty = function() {
        return this.len < 1
    }
    ,
    this.clear = function() {
        this.data = {},
        this.len = 0
    }
    ,
    this.put = function(e, t) {
        this.data[e] = void 0 == t || "null" == t || "" == t ? "" : t,
        this.len++
    }
    ,
    this.remove = function(e) {
        return this.data[e] = null,
        this.len--,
        !0
    }
    ,
    this.get = function(e) {
        return this.data[e]
    }
    ,
    this.containsKey = function(e) {
        return !!this.data[e]
    }
    ,
    this.containsValue = function(e) {
        try {
            for (var t in this.data)
                if (this.data[t] == e)
                    return !0
        } catch (e) {
            return !1
        }
        return !1
    }
    ,
    this.values = function() {
        var e = new Array;
        for (var t in this.data)
            e.push(this.data[t]);
        return e
    }
    ,
    this.keys = function() {
        var e = new Array;
        for (var t in this.data)
            e.push(t);
        return e
    }
}

function getRequestURL(e, t, i) {
    if (i && 1 == i)
        var r = "V8E26BD7FN76D08C349A43D6D3M51A1B";
    else
        var r = "6C57AB91A1308E26B797F4CD382AC79D";
    _this = this;
    var s = new Date
      , n = s.getFullYear()
      , o = s.getMonth() + 1
      , a = s.getDate()
      , c = s.getHours()
      , h = s.getMinutes()
      , d = s.getSeconds()
      , u = n + "-" + o + "-" + a + " " + c + ":" + h + ":" + d;
    t.put("t", u),
    t.put("v", "1.0"),
    t.containsKey("versionName") || t.put("versionName", "4.6.0"),
    t.put("plat", "H5"),
    t.put("platform", "H5"),
    !t.containsKey("userId") || t.containsKey("loginToken") || t.containsKey("uDate") ? t.containsKey("userId") || "" && (t.put("loginToken", ""),
    t.put("uDate", ""),
    t.put("userId", "")) : (t.put("loginToken", ""),
    t.put("uDate", ""));
    var l = t.keys().sort()
      , p = ""
      , m = l.length;
    for (var g in l)
        if (g < m) {
            var f = l[g];
            p += f + t.get(f)
        }
    for (var y = t.get("method") + p + r, v = MD5(y), k = e + "?sign=" + v, w = 0; w < l.length; w++)
        (t.get(l[w]) + "").indexOf("+") >= 0 || -1 != (t.get(l[w]) + "").indexOf("&") ? k += "&" + l[w] + "=" + encodeURIComponent(t.get(l[w])) : "pageUrl" == l[w] ? k += "&" + l[w] + "=" + encodeURIComponent(t.get(l[w])) : k += "&" + l[w] + "=" + t.get(l[w]);
    return k
}

//     https://www.ddky.com/perCenter.html?ddkycache=848160b63dd2be367958780aec8a6b9c
//     在get里面修改手机号   密码   得到登录的链接
function get() {
    var e = '13727777777'
      , t = '123456'
      , url_user = "https://api.ddky.com/user/rest.htm";
    var s = new DMap;
    s.put("userName", e),
    s.put("password", MD5(t).toLowerCase()),
    s.put("method", "ddsy.user.reg.login");
    var a = getRequestURL(url_user, s);
	return a;
}
