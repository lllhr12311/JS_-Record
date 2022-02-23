function Sha1() {}
;Sha1.hash = function(n, t) {
    var w = Object.assign({
        msgFormat: "string",
        outFormat: "hex"
    }, t), b, i, f, u, e, r, p, k, h, d;
    switch (w.msgFormat) {
    default:
    case "string":
        n = Sha1.utf8Encode(n);
        break;
    case "hex-bytes":
        n = Sha1.hexBytesToString(n)
    }
    b = [1518500249, 1859775393, 2400959708, 3395469782];
    i = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    n += String.fromCharCode(128);
    var g = n.length / 4 + 2
      , o = Math.ceil(g / 16)
      , s = new Array(o);
    for (u = 0; u < o; u++)
        for (s[u] = new Array(16),
        f = 0; f < 16; f++)
            s[u][f] = n.charCodeAt(u * 64 + f * 4) << 24 | n.charCodeAt(u * 64 + f * 4 + 1) << 16 | n.charCodeAt(u * 64 + f * 4 + 2) << 8 | n.charCodeAt(u * 64 + f * 4 + 3);
    for (s[o - 1][14] = (n.length - 1) * 8 / Math.pow(2, 32),
    s[o - 1][14] = Math.floor(s[o - 1][14]),
    s[o - 1][15] = (n.length - 1) * 8 & 4294967295,
    u = 0; u < o; u++) {
        for (e = new Array(80),
        r = 0; r < 16; r++)
            e[r] = s[u][r];
        for (r = 16; r < 80; r++)
            e[r] = Sha1.ROTL(e[r - 3] ^ e[r - 8] ^ e[r - 14] ^ e[r - 16], 1);
        var c = i[0]
          , l = i[1]
          , a = i[2]
          , v = i[3]
          , y = i[4];
        for (r = 0; r < 80; r++)
            p = Math.floor(r / 20),
            k = Sha1.ROTL(c, 5) + Sha1.f(p, l, a, v) + y + b[p] + e[r] >>> 0,
            y = v,
            v = a,
            a = Sha1.ROTL(l, 30) >>> 0,
            l = c,
            c = k;
        i[0] = i[0] + c >>> 0;
        i[1] = i[1] + l >>> 0;
        i[2] = i[2] + a >>> 0;
        i[3] = i[3] + v >>> 0;
        i[4] = i[4] + y >>> 0
    }
    for (h = 0; h < i.length; h++)
        i[h] = ("00000000" + i[h].toString(16)).slice(-8);
    return d = w.outFormat == "hex-w" ? " " : "",
    i.join(d)
}
;
Sha1.f = function(n, t, i, r) {
    switch (n) {
    case 0:
        return t & i ^ ~t & r;
    case 1:
        return t ^ i ^ r;
    case 2:
        return t & i ^ t & r ^ i & r;
    case 3:
        return t ^ i ^ r
    }
}
;
Sha1.ROTL = function(n, t) {
    return n << t | n >>> 32 - t
}
;
Sha1.utf8Encode = function(n) {
    return unescape(encodeURIComponent(n))
}
;
Sha1.hexBytesToString = function(n) {
    var i, t;
    for (n = n.replace(" ", ""),
    i = "",
    t = 0; t < n.length; t += 2)
        i += String.fromCharCode(parseInt(n.slice(t, t + 2), 16));
    return i
}
;

function jiami() {
    var e = "/WebApi/Users/Register?DUE$DEHFYE(YRUEHD*&";
    var t = undefined;
    var n = (new Date).getTime() + 2592e6 + (t || 3e4)
      , r = (e || "") + "&t=" + n;
    var s = Sha1.hash(r)
      , t = n;
    return {
        s,
        t
    };
}
;
//    https://aerfaying.com/  登录参数
// 直接定义一个变量然后调用加密方法即可
// var aaa=jiami();
// console.log(aaa);