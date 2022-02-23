function createCommonjsModule(e, t) {
return t = {
    exports: {}
},
e(t, t.exports),
t.exports
};
var e = createCommonjsModule(function(e) { (function() {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    n = {
        rotl: function(e, t) {
            return e << t | e >>> 32 - t
        },
        rotr: function(e, t) {
            return e << 32 - t | e >>> t
        },
        endian: function(e) {
            if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
            for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
            return e
        },
        randomBytes: function(e) {
            for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
            return t
        },
        bytesToWords: function(e) {
            for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8) t[r >>> 5] |= e[n] << 24 - r % 32;
            return t
        },
        wordsToBytes: function(e) {
            for (var t = [], n = 0; n < 32 * e.length; n += 8) t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
            return t
        },
        bytesToHex: function(e) {
            for (var t = [], n = 0; n < e.length; n++) t.push((e[n] >>> 4).toString(16)),
            t.push((15 & e[n]).toString(16));
            return t.join("")
        },
        hexToBytes: function(e) {
            for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
            return t
        },
        bytesToBase64: function(e) {
            for (var n = [], r = 0; r < e.length; r += 3) for (var o = e[r] << 16 | e[r + 1] << 8 | e[r + 2], a = 0; a < 4; a++) 8 * r + 6 * a <= 8 * e.length ? n.push(t.charAt(o >>> 6 * (3 - a) & 63)) : n.push("=");
            return n.join("")
        },
        base64ToBytes: function(e) {
            e = e.replace(/[^A-Z0-9+\/]/gi, "");
            for (var n = [], r = 0, o = 0; r < e.length; o = ++r % 4) 0 != o && n.push((t.indexOf(e.charAt(r - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | t.indexOf(e.charAt(r)) >>> 6 - 2 * o);
            return n
        }
    };
    e.exports = n
})()
});
n = {
utf8: {
    stringToBytes: function(e) {
        return n.bin.stringToBytes(unescape(encodeURIComponent(e)))
    },
    bytesToString: function(e) {
        return decodeURIComponent(escape(n.bin.bytesToString(e)))
    }
},
bin: {
    stringToBytes: function(e) {
        for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
        return t
    },
    bytesToString: function(e) {
        for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
        return t.join("")
    }
}
},
r = n;
var o = e,
a = r.utf8,
i = r.bin,
l = function(e) {
e.constructor == String ? e = a.stringToBytes(e) : "undefined" !== typeof t && "function" == typeof t.isBuffer && t.isBuffer(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || (e = e.toString());
var n = o.bytesToWords(e),
r = 8 * e.length,
i = [],
l = 1732584193,
c = -271733879,
s = -1732584194,
u = 271733878,
f = -1009589776;
n[r >> 5] |= 128 << 24 - r % 32,
n[15 + (r + 64 >>> 9 << 4)] = r;
for (var d = 0; d < n.length; d += 16) {
    for (var p = l,
    h = c,
    y = s,
    b = u,
    m = f,
    v = 0; v < 80; v++) {
        if (v < 16) i[v] = n[d + v];
        else {
            var g = i[v - 3] ^ i[v - 8] ^ i[v - 14] ^ i[v - 16];
            i[v] = g << 1 | g >>> 31
        }
        var k = (l << 5 | l >>> 27) + f + (i[v] >>> 0) + (v < 20 ? 1518500249 + (c & s | ~c & u) : v < 40 ? 1859775393 + (c ^ s ^ u) : v < 60 ? (c & s | c & u | s & u) - 1894007588 : (c ^ s ^ u) - 899497514);
        f = u,
        u = s,
        s = c << 30 | c >>> 2,
        c = l,
        l = k
    }
    l += p,
    c += h,
    s += y,
    u += b,
    f += m
}
return [l, c, s, u, f]
}
function randomWords() {
for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "alphabet", n = "", r = {
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    number: "0123456789"
} [t], o = 0; o < e; o++) n += r.charAt(Math.floor(Math.random() * r.length));
return n
}
function getnon(){
	var word=randomWords(8, "number");
	console.log(word)
	return word ;
}
function jiami(e, t) {
var n = o.wordsToBytes(l(e));
return t && t.asBytes ? n: t && t.asString ? i.bytesToString(n) : o.bytesToHex(n)
}
function pinjie(){
	var aa='appSignKey=4bTogwpz7RzNO2VTFtW7zcfRkAE97ox6ZSgcQi7FgYdqrHqKB7aGqEZ4o7yssa2aEXoV3bQwh12FFgVNlpyYk2Yjm9d2EZGeGu3&noncestr=';
	var bb=getnon();
	var cc='&pageSize=20&refresh=false&serverTimestamp=1645250295413&timestamp=';
	var dd=new Date().getTime();
	console.log(dd)
	return aa+bb+cc+dd;	
}
function getsign(){
	var aa=pinjie();
	return jiami(aa);	
}