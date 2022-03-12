function getsign() {
    function e(e, t) {
        var a = e[0]
          , s = e[1]
          , c = e[2]
          , l = e[3];
        a = n(a, s, c, l, t[0], 7, -680876936),
        l = n(l, a, s, c, t[1], 12, -389564586),
        c = n(c, l, a, s, t[2], 17, 606105819),
        s = n(s, c, l, a, t[3], 22, -1044525330),
        a = n(a, s, c, l, t[4], 7, -176418897),
        l = n(l, a, s, c, t[5], 12, 1200080426),
        c = n(c, l, a, s, t[6], 17, -1473231341),
        s = n(s, c, l, a, t[7], 22, -45705983),
        a = n(a, s, c, l, t[8], 7, 1770035416),
        l = n(l, a, s, c, t[9], 12, -1958414417),
        c = n(c, l, a, s, t[10], 17, -42063),
        s = n(s, c, l, a, t[11], 22, -1990404162),
        a = n(a, s, c, l, t[12], 7, 1804603682),
        l = n(l, a, s, c, t[13], 12, -40341101),
        c = n(c, l, a, s, t[14], 17, -1502002290),
        a = r(a, s = n(s, c, l, a, t[15], 22, 1236535329), c, l, t[1], 5, -165796510),
        l = r(l, a, s, c, t[6], 9, -1069501632),
        c = r(c, l, a, s, t[11], 14, 643717713),
        s = r(s, c, l, a, t[0], 20, -373897302),
        a = r(a, s, c, l, t[5], 5, -701558691),
        l = r(l, a, s, c, t[10], 9, 38016083),
        c = r(c, l, a, s, t[15], 14, -660478335),
        s = r(s, c, l, a, t[4], 20, -405537848),
        a = r(a, s, c, l, t[9], 5, 568446438),
        l = r(l, a, s, c, t[14], 9, -1019803690),
        c = r(c, l, a, s, t[3], 14, -187363961),
        s = r(s, c, l, a, t[8], 20, 1163531501),
        a = r(a, s, c, l, t[13], 5, -1444681467),
        l = r(l, a, s, c, t[2], 9, -51403784),
        c = r(c, l, a, s, t[7], 14, 1735328473),
        a = i(a, s = r(s, c, l, a, t[12], 20, -1926607734), c, l, t[5], 4, -378558),
        l = i(l, a, s, c, t[8], 11, -2022574463),
        c = i(c, l, a, s, t[11], 16, 1839030562),
        s = i(s, c, l, a, t[14], 23, -35309556),
        a = i(a, s, c, l, t[1], 4, -1530992060),
        l = i(l, a, s, c, t[4], 11, 1272893353),
        c = i(c, l, a, s, t[7], 16, -155497632),
        s = i(s, c, l, a, t[10], 23, -1094730640),
        a = i(a, s, c, l, t[13], 4, 681279174),
        l = i(l, a, s, c, t[0], 11, -358537222),
        c = i(c, l, a, s, t[3], 16, -722521979),
        s = i(s, c, l, a, t[6], 23, 76029189),
        a = i(a, s, c, l, t[9], 4, -640364487),
        l = i(l, a, s, c, t[12], 11, -421815835),
        c = i(c, l, a, s, t[15], 16, 530742520),
        a = o(a, s = i(s, c, l, a, t[2], 23, -995338651), c, l, t[0], 6, -198630844),
        l = o(l, a, s, c, t[7], 10, 1126891415),
        c = o(c, l, a, s, t[14], 15, -1416354905),
        s = o(s, c, l, a, t[5], 21, -57434055),
        a = o(a, s, c, l, t[12], 6, 1700485571),
        l = o(l, a, s, c, t[3], 10, -1894986606),
        c = o(c, l, a, s, t[10], 15, -1051523),
        s = o(s, c, l, a, t[1], 21, -2054922799),
        a = o(a, s, c, l, t[8], 6, 1873313359),
        l = o(l, a, s, c, t[15], 10, -30611744),
        c = o(c, l, a, s, t[6], 15, -1560198380),
        s = o(s, c, l, a, t[13], 21, 1309151649),
        a = o(a, s, c, l, t[4], 6, -145523070),
        l = o(l, a, s, c, t[11], 10, -1120210379),
        c = o(c, l, a, s, t[2], 15, 718787259),
        s = o(s, c, l, a, t[9], 21, -343485551),
        e[0] = u(a, e[0]),
        e[1] = u(s, e[1]),
        e[2] = u(c, e[2]),
        e[3] = u(l, e[3])
    }
    function t(e, t, n, r, i, o) {
        return t = u(u(t, e), u(r, o)),
        u(t << i | t >>> 32 - i, n)
    }
    function n(e, n, r, i, o, a, s) {
        return t(n & r | ~n & i, e, n, o, a, s)
    }
    function r(e, n, r, i, o, a, s) {
        return t(n & i | r & ~i, e, n, o, a, s)
    }
    function i(e, n, r, i, o, a, s) {
        return t(n ^ r ^ i, e, n, o, a, s)
    }
    function o(e, n, r, i, o, a, s) {
        return t(r ^ (n | ~i), e, n, o, a, s)
    }
    function a(e) {
        var t, n = [];
        for (t = 0; t < 64; t += 4)
            n[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
        return n
    }
    var s = "0123456789abcdef".split("");
    function c(e) {
        for (var t = "", n = 0; n < 4; n++)
            t += s[e >> 8 * n + 4 & 15] + s[e >> 8 * n & 15];
        return t
    }
    function u(e, t) {
        return e + t & 4294967295
    }
    var fanhui = function(t) {
        return function(e) {
            for (var t = 0; t < e.length; t++)
                e[t] = c(e[t]);
            return e.join("")
        }(function(t) {
            /[\x80-\xFF]/.test(t) && (t = unescape(encodeURI(t))),
            txt = "";
            var n, r = t.length, i = [1732584193, -271733879, -1732584194, 271733878];
            for (n = 64; n <= t.length; n += 64)
                e(i, a(t.substring(n - 64, n)));
            t = t.substring(n - 64);
            var o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (n = 0; n < t.length; n++)
                o[n >> 2] |= t.charCodeAt(n) << (n % 4 << 3);
            if (o[n >> 2] |= 128 << (n % 4 << 3),
            n > 55)
                for (e(i, o),
                n = 0; n < 16; n++)
                    o[n] = 0;
            return o[14] = 8 * r,
            e(i, o),
            i
        }(t))
    }
    var time = (new Date).getTime()
      , x1 = ("".concat("100-DDwODVkv", "&").concat("6c4aa6af6560efff5df3c16c704b49f1", "&").concat(time));
    return {
        sign: fanhui(x1),
        time: time
    };
}
;var c = function(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }
    function n(e, t) {
        var n, r, i, o, a;
        return i = 2147483648 & e,
        o = 2147483648 & t,
        a = (1073741823 & e) + (1073741823 & t),
        (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ a ^ i ^ o : n | r ? 1073741824 & a ? 3221225472 ^ a ^ i ^ o : 1073741824 ^ a ^ i ^ o : a ^ i ^ o
    }
    function r(e, r, i, o, a, s, c) {
        return e = n(e, n(n(function(e, t, n) {
            return e & t | ~e & n
        }(r, i, o), a), c)),
        n(t(e, s), r)
    }
    function i(e, r, i, o, a, s, c) {
        return e = n(e, n(n(function(e, t, n) {
            return e & n | t & ~n
        }(r, i, o), a), c)),
        n(t(e, s), r)
    }
    function o(e, r, i, o, a, s, c) {
        return e = n(e, n(n(function(e, t, n) {
            return e ^ t ^ n
        }(r, i, o), a), c)),
        n(t(e, s), r)
    }
    function a(e, r, i, o, a, s, c) {
        return e = n(e, n(n(function(e, t, n) {
            return t ^ (e | ~n)
        }(r, i, o), a), c)),
        n(t(e, s), r)
    }
    function s(e) {
        var t, n = "", r = "";
        for (t = 0; 3 >= t; t++)
            n += (r = "0" + (e >>> 8 * t & 255).toString(16)).substr(r.length - 2, 2);
        return n
    }
    var c, u, l, f, d, p, h, m, v, y;
    for (y = function(e) {
        for (var t, n = e.length, r = n + 8, i = 16 * ((r - r % 64) / 64 + 1), o = new Array(i - 1), a = 0, s = 0; n > s; )
            a = s % 4 * 8,
            o[t = (s - s % 4) / 4] = o[t] | e.charCodeAt(s) << a,
            s++;
        return a = s % 4 * 8,
        o[t = (s - s % 4) / 4] = o[t] | 128 << a,
        o[i - 2] = n << 3,
        o[i - 1] = n >>> 29,
        o
    }(e = function(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(r >> 6 | 192),
            t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
            t += String.fromCharCode(r >> 6 & 63 | 128),
            t += String.fromCharCode(63 & r | 128))
        }
        return t
    }(e)),
    p = 1732584193,
    h = 4023233417,
    m = 2562383102,
    v = 271733878,
    c = 0; c < y.length; c += 16)
        u = p,
        l = h,
        f = m,
        d = v,
        p = r(p, h, m, v, y[c + 0], 7, 3614090360),
        v = r(v, p, h, m, y[c + 1], 12, 3905402710),
        m = r(m, v, p, h, y[c + 2], 17, 606105819),
        h = r(h, m, v, p, y[c + 3], 22, 3250441966),
        p = r(p, h, m, v, y[c + 4], 7, 4118548399),
        v = r(v, p, h, m, y[c + 5], 12, 1200080426),
        m = r(m, v, p, h, y[c + 6], 17, 2821735955),
        h = r(h, m, v, p, y[c + 7], 22, 4249261313),
        p = r(p, h, m, v, y[c + 8], 7, 1770035416),
        v = r(v, p, h, m, y[c + 9], 12, 2336552879),
        m = r(m, v, p, h, y[c + 10], 17, 4294925233),
        h = r(h, m, v, p, y[c + 11], 22, 2304563134),
        p = r(p, h, m, v, y[c + 12], 7, 1804603682),
        v = r(v, p, h, m, y[c + 13], 12, 4254626195),
        m = r(m, v, p, h, y[c + 14], 17, 2792965006),
        p = i(p, h = r(h, m, v, p, y[c + 15], 22, 1236535329), m, v, y[c + 1], 5, 4129170786),
        v = i(v, p, h, m, y[c + 6], 9, 3225465664),
        m = i(m, v, p, h, y[c + 11], 14, 643717713),
        h = i(h, m, v, p, y[c + 0], 20, 3921069994),
        p = i(p, h, m, v, y[c + 5], 5, 3593408605),
        v = i(v, p, h, m, y[c + 10], 9, 38016083),
        m = i(m, v, p, h, y[c + 15], 14, 3634488961),
        h = i(h, m, v, p, y[c + 4], 20, 3889429448),
        p = i(p, h, m, v, y[c + 9], 5, 568446438),
        v = i(v, p, h, m, y[c + 14], 9, 3275163606),
        m = i(m, v, p, h, y[c + 3], 14, 4107603335),
        h = i(h, m, v, p, y[c + 8], 20, 1163531501),
        p = i(p, h, m, v, y[c + 13], 5, 2850285829),
        v = i(v, p, h, m, y[c + 2], 9, 4243563512),
        m = i(m, v, p, h, y[c + 7], 14, 1735328473),
        p = o(p, h = i(h, m, v, p, y[c + 12], 20, 2368359562), m, v, y[c + 5], 4, 4294588738),
        v = o(v, p, h, m, y[c + 8], 11, 2272392833),
        m = o(m, v, p, h, y[c + 11], 16, 1839030562),
        h = o(h, m, v, p, y[c + 14], 23, 4259657740),
        p = o(p, h, m, v, y[c + 1], 4, 2763975236),
        v = o(v, p, h, m, y[c + 4], 11, 1272893353),
        m = o(m, v, p, h, y[c + 7], 16, 4139469664),
        h = o(h, m, v, p, y[c + 10], 23, 3200236656),
        p = o(p, h, m, v, y[c + 13], 4, 681279174),
        v = o(v, p, h, m, y[c + 0], 11, 3936430074),
        m = o(m, v, p, h, y[c + 3], 16, 3572445317),
        h = o(h, m, v, p, y[c + 6], 23, 76029189),
        p = o(p, h, m, v, y[c + 9], 4, 3654602809),
        v = o(v, p, h, m, y[c + 12], 11, 3873151461),
        m = o(m, v, p, h, y[c + 15], 16, 530742520),
        p = a(p, h = o(h, m, v, p, y[c + 2], 23, 3299628645), m, v, y[c + 0], 6, 4096336452),
        v = a(v, p, h, m, y[c + 7], 10, 1126891415),
        m = a(m, v, p, h, y[c + 14], 15, 2878612391),
        h = a(h, m, v, p, y[c + 5], 21, 4237533241),
        p = a(p, h, m, v, y[c + 12], 6, 1700485571),
        v = a(v, p, h, m, y[c + 3], 10, 2399980690),
        m = a(m, v, p, h, y[c + 10], 15, 4293915773),
        h = a(h, m, v, p, y[c + 1], 21, 2240044497),
        p = a(p, h, m, v, y[c + 8], 6, 1873313359),
        v = a(v, p, h, m, y[c + 15], 10, 4264355552),
        m = a(m, v, p, h, y[c + 6], 15, 2734768916),
        h = a(h, m, v, p, y[c + 13], 21, 1309151649),
        p = a(p, h, m, v, y[c + 4], 6, 4149444226),
        v = a(v, p, h, m, y[c + 11], 10, 3174756917),
        m = a(m, v, p, h, y[c + 2], 15, 718787259),
        h = a(h, m, v, p, y[c + 9], 21, 3951481745),
        p = n(p, u),
        h = n(h, l),
        m = n(m, f),
        v = n(v, d);
    return (s(p) + s(h) + s(m) + s(v)).toLowerCase()
}

function gets() {
    var a = getsign();
    var text = {
        "app": "100-DDwODVkv",
        "time": a.time,
        "objectCode": "XNTIwMzE3NDA0MA==",
        "objectType": 1,
        "dataSource": "ALL_COMMENT_DATASOURCE",
        "page": 4,
        "limit": 10,
        "lastId": 1000710062396,
        "sign": a.sign
    };
    var time = (new Date).getTime();
    var b = ('f036e5becf6f19a3858c235dc391b9bd' + "&" + time + "&" + '24679788' + "&" + JSON.stringify(text));
    var sign = c(b);
    return {
        data_sign: a.sign,
        sign: sign
    };
}
