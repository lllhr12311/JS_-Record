var aaa;
(function(e) {
    var r = {};
    function i(t) {
        if (r[t])
            return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, i),
        n.l = !0,
        n.exports
    }
    ;aaa = i;

}
)({
    9816: function(t, e, r) {
        "use strict";
        var n = "0123456789abcdefghijklmnopqrstuvwxyz";
        function i(t) {
            return n.charAt(t)
        }
        function a(t, e) {
            return t & e
        }
        function o(t, e) {
            return t | e
        }
        function f(t, e) {
            return t ^ e
        }
        function c(t, e) {
            return t & ~e
        }
        function s(t) {
            if (0 == t)
                return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16,
            e += 16),
            0 == (255 & t) && (t >>= 8,
            e += 8),
            0 == (15 & t) && (t >>= 4,
            e += 4),
            0 == (3 & t) && (t >>= 2,
            e += 2),
            0 == (1 & t) && ++e,
            e
        }
        function u(t) {
            var e = 0;
            while (0 != t)
                t &= t - 1,
                ++e;
            return e
        }
        var d, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", l = "=";
        function b(t) {
            var e, r, n = "";
            for (e = 0; e + 3 <= t.length; e += 3)
                r = parseInt(t.substring(e, e + 3), 16),
                n += h.charAt(r >> 6) + h.charAt(63 & r);
            e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16),
            n += h.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16),
            n += h.charAt(r >> 2) + h.charAt((3 & r) << 4));
            while ((3 & n.length) > 0)
                n += l;
            return n
        }
        function p(t) {
            var e, r = "", n = 0, a = 0;
            for (e = 0; e < t.length; ++e) {
                if (t.charAt(e) == l)
                    break;
                var o = h.indexOf(t.charAt(e));
                o < 0 || (0 == n ? (r += i(o >> 2),
                a = 3 & o,
                n = 1) : 1 == n ? (r += i(a << 2 | o >> 4),
                a = 15 & o,
                n = 2) : 2 == n ? (r += i(a),
                r += i(o >> 2),
                a = 3 & o,
                n = 3) : (r += i(a << 2 | o >> 4),
                r += i(15 & o),
                n = 0))
            }
            return 1 == n && (r += i(a << 2)),
            r
        }
        var v, g = {
            decode: function(t) {
                var e;
                if (void 0 === d) {
                    var r = "0123456789ABCDEF"
                      , n = " \f\n\r\t \u2028\u2029";
                    for (d = {},
                    e = 0; e < 16; ++e)
                        d[r.charAt(e)] = e;
                    for (r = r.toLowerCase(),
                    e = 10; e < 16; ++e)
                        d[r.charAt(e)] = e;
                    for (e = 0; e < n.length; ++e)
                        d[n.charAt(e)] = -1
                }
                var i = []
                  , a = 0
                  , o = 0;
                for (e = 0; e < t.length; ++e) {
                    var f = t.charAt(e);
                    if ("=" == f)
                        break;
                    if (f = d[f],
                    -1 != f) {
                        if (void 0 === f)
                            throw new Error("Illegal character at offset " + e);
                        a |= f,
                        ++o >= 2 ? (i[i.length] = a,
                        a = 0,
                        o = 0) : a <<= 4
                    }
                }
                if (o)
                    throw new Error("Hex encoding incomplete: 4 bits missing");
                return i
            }
        }, y = {
            decode: function(t) {
                var e;
                if (void 0 === v) {
                    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
                      , n = "= \f\n\r\t \u2028\u2029";
                    for (v = Object.create(null),
                    e = 0; e < 64; ++e)
                        v[r.charAt(e)] = e;
                    for (v["-"] = 62,
                    v["_"] = 63,
                    e = 0; e < n.length; ++e)
                        v[n.charAt(e)] = -1
                }
                var i = []
                  , a = 0
                  , o = 0;
                for (e = 0; e < t.length; ++e) {
                    var f = t.charAt(e);
                    if ("=" == f)
                        break;
                    if (f = v[f],
                    -1 != f) {
                        if (void 0 === f)
                            throw new Error("Illegal character at offset " + e);
                        a |= f,
                        ++o >= 4 ? (i[i.length] = a >> 16,
                        i[i.length] = a >> 8 & 255,
                        i[i.length] = 255 & a,
                        a = 0,
                        o = 0) : a <<= 6
                    }
                }
                switch (o) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    i[i.length] = a >> 10;
                    break;
                case 3:
                    i[i.length] = a >> 16,
                    i[i.length] = a >> 8 & 255;
                    break
                }
                return i
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function(t) {
                var e = y.re.exec(t);
                if (e)
                    if (e[1])
                        t = e[1];
                    else {
                        if (!e[2])
                            throw new Error("RegExp out of sync");
                        t = e[2]
                    }
                return y.decode(t)
            }
        }, m = 1e13, w = function() {
            function t(t) {
                this.buf = [+t || 0]
            }
            return t.prototype.mulAdd = function(t, e) {
                var r, n, i = this.buf, a = i.length;
                for (r = 0; r < a; ++r)
                    n = i[r] * t + e,
                    n < m ? e = 0 : (e = 0 | n / m,
                    n -= e * m),
                    i[r] = n;
                e > 0 && (i[r] = e)
            }
            ,
            t.prototype.sub = function(t) {
                var e, r, n = this.buf, i = n.length;
                for (e = 0; e < i; ++e)
                    r = n[e] - t,
                    r < 0 ? (r += m,
                    t = 1) : t = 0,
                    n[e] = r;
                while (0 === n[n.length - 1])
                    n.pop()
            }
            ,
            t.prototype.toString = function(t) {
                if (10 != (t || 10))
                    throw new Error("only base 10 is supported");
                for (var e = this.buf, r = e[e.length - 1].toString(), n = e.length - 2; n >= 0; --n)
                    r += (m + e[n]).toString().substring(1);
                return r
            }
            ,
            t.prototype.valueOf = function() {
                for (var t = this.buf, e = 0, r = t.length - 1; r >= 0; --r)
                    e = e * m + t[r];
                return e
            }
            ,
            t.prototype.simplify = function() {
                var t = this.buf;
                return 1 == t.length ? t[0] : this
            }
            ,
            t
        }(), _ = "…", S = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, O = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        function x(t, e) {
            return t.length > e && (t = t.substring(0, e) + _),
            t
        }
        var A, E = function() {
            function t(e, r) {
                this.hexDigits = "0123456789ABCDEF",
                e instanceof t ? (this.enc = e.enc,
                this.pos = e.pos) : (this.enc = e,
                this.pos = r)
            }
            return t.prototype.get = function(t) {
                if (void 0 === t && (t = this.pos++),
                t >= this.enc.length)
                    throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                return "string" === typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }
            ,
            t.prototype.hexByte = function(t) {
                return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
            }
            ,
            t.prototype.hexDump = function(t, e, r) {
                for (var n = "", i = t; i < e; ++i)
                    if (n += this.hexByte(this.get(i)),
                    !0 !== r)
                        switch (15 & i) {
                        case 7:
                            n += "  ";
                            break;
                        case 15:
                            n += "\n";
                            break;
                        default:
                            n += " "
                        }
                return n
            }
            ,
            t.prototype.isASCII = function(t, e) {
                for (var r = t; r < e; ++r) {
                    var n = this.get(r);
                    if (n < 32 || n > 176)
                        return !1
                }
                return !0
            }
            ,
            t.prototype.parseStringISO = function(t, e) {
                for (var r = "", n = t; n < e; ++n)
                    r += String.fromCharCode(this.get(n));
                return r
            }
            ,
            t.prototype.parseStringUTF = function(t, e) {
                for (var r = "", n = t; n < e; ) {
                    var i = this.get(n++);
                    r += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(n++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(n++)) << 6 | 63 & this.get(n++))
                }
                return r
            }
            ,
            t.prototype.parseStringBMP = function(t, e) {
                for (var r, n, i = "", a = t; a < e; )
                    r = this.get(a++),
                    n = this.get(a++),
                    i += String.fromCharCode(r << 8 | n);
                return i
            }
            ,
            t.prototype.parseTime = function(t, e, r) {
                var n = this.parseStringISO(t, e)
                  , i = (r ? S : O).exec(n);
                return i ? (r && (i[1] = +i[1],
                i[1] += +i[1] < 70 ? 2e3 : 1900),
                n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
                i[5] && (n += ":" + i[5],
                i[6] && (n += ":" + i[6],
                i[7] && (n += "." + i[7]))),
                i[8] && (n += " UTC",
                "Z" != i[8] && (n += i[8],
                i[9] && (n += ":" + i[9]))),
                n) : "Unrecognized time: " + n
            }
            ,
            t.prototype.parseInteger = function(t, e) {
                var r, n = this.get(t), i = n > 127, a = i ? 255 : 0, o = "";
                while (n == a && ++t < e)
                    n = this.get(t);
                if (r = e - t,
                0 === r)
                    return i ? -1 : 0;
                if (r > 4) {
                    o = n,
                    r <<= 3;
                    while (0 == (128 & (+o ^ a)))
                        o = +o << 1,
                        --r;
                    o = "(" + r + " bit)\n"
                }
                i && (n -= 256);
                for (var f = new w(n), c = t + 1; c < e; ++c)
                    f.mulAdd(256, this.get(c));
                return o + f.toString()
            }
            ,
            t.prototype.parseBitString = function(t, e, r) {
                for (var n = this.get(t), i = (e - t - 1 << 3) - n, a = "(" + i + " bit)\n", o = "", f = t + 1; f < e; ++f) {
                    for (var c = this.get(f), s = f == e - 1 ? n : 0, u = 7; u >= s; --u)
                        o += c >> u & 1 ? "1" : "0";
                    if (o.length > r)
                        return a + x(o, r)
                }
                return a + o
            }
            ,
            t.prototype.parseOctetString = function(t, e, r) {
                if (this.isASCII(t, e))
                    return x(this.parseStringISO(t, e), r);
                var n = e - t
                  , i = "(" + n + " byte)\n";
                r /= 2,
                n > r && (e = t + r);
                for (var a = t; a < e; ++a)
                    i += this.hexByte(this.get(a));
                return n > r && (i += _),
                i
            }
            ,
            t.prototype.parseOID = function(t, e, r) {
                for (var n = "", i = new w, a = 0, o = t; o < e; ++o) {
                    var f = this.get(o);
                    if (i.mulAdd(128, 127 & f),
                    a += 7,
                    !(128 & f)) {
                        if ("" === n)
                            if (i = i.simplify(),
                            i instanceof w)
                                i.sub(80),
                                n = "2." + i.toString();
                            else {
                                var c = i < 80 ? i < 40 ? 0 : 1 : 2;
                                n = c + "." + (i - 40 * c)
                            }
                        else
                            n += "." + i.toString();
                        if (n.length > r)
                            return x(n, r);
                        i = new w,
                        a = 0
                    }
                }
                return a > 0 && (n += ".incomplete"),
                n
            }
            ,
            t
        }(), j = function() {
            function t(t, e, r, n, i) {
                if (!(n instanceof R))
                    throw new Error("Invalid tag value.");
                this.stream = t,
                this.header = e,
                this.length = r,
                this.tag = n,
                this.sub = i
            }
            return t.prototype.typeName = function() {
                switch (this.tag.tagClass) {
                case 0:
                    switch (this.tag.tagNumber) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString"
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]";
                case 3:
                    return "Private_" + this.tag.tagNumber.toString()
                }
            }
            ,
            t.prototype.content = function(t) {
                if (void 0 === this.tag)
                    return null;
                void 0 === t && (t = 1 / 0);
                var e = this.posContent()
                  , r = Math.abs(this.length);
                if (!this.tag.isUniversal())
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                switch (this.tag.tagNumber) {
                case 1:
                    return 0 === this.stream.get(e) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(e, e + r);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + r, t);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                case 6:
                    return this.stream.parseOID(e, e + r, t);
                case 16:
                case 17:
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                case 12:
                    return x(this.stream.parseStringUTF(e, e + r), t);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return x(this.stream.parseStringISO(e, e + r), t);
                case 30:
                    return x(this.stream.parseStringBMP(e, e + r), t);
                case 23:
                case 24:
                    return this.stream.parseTime(e, e + r, 23 == this.tag.tagNumber)
                }
                return null
            }
            ,
            t.prototype.toString = function() {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            t.prototype.toPrettyString = function(t) {
                void 0 === t && (t = "");
                var e = t + this.typeName() + " @" + this.stream.pos;
                if (this.length >= 0 && (e += "+"),
                e += this.length,
                this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                e += "\n",
                null !== this.sub) {
                    t += "  ";
                    for (var r = 0, n = this.sub.length; r < n; ++r)
                        e += this.sub[r].toPrettyString(t)
                }
                return e
            }
            ,
            t.prototype.posStart = function() {
                return this.stream.pos
            }
            ,
            t.prototype.posContent = function() {
                return this.stream.pos + this.header
            }
            ,
            t.prototype.posEnd = function() {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            t.prototype.toHexString = function() {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            t.decodeLength = function(t) {
                var e = t.get()
                  , r = 127 & e;
                if (r == e)
                    return r;
                if (r > 6)
                    throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                if (0 === r)
                    return null;
                e = 0;
                for (var n = 0; n < r; ++n)
                    e = 256 * e + t.get();
                return e
            }
            ,
            t.prototype.getHexStringValue = function() {
                var t = this.toHexString()
                  , e = 2 * this.header
                  , r = 2 * this.length;
                return t.substr(e, r)
            }
            ,
            t.decode = function(e) {
                var r;
                r = e instanceof E ? e : new E(e,0);
                var n = new E(r)
                  , i = new R(r)
                  , a = t.decodeLength(r)
                  , o = r.pos
                  , f = o - n.pos
                  , c = null
                  , s = function() {
                    var e = [];
                    if (null !== a) {
                        var n = o + a;
                        while (r.pos < n)
                            e[e.length] = t.decode(r);
                        if (r.pos != n)
                            throw new Error("Content size is not correct for container starting at offset " + o)
                    } else
                        try {
                            for (; ; ) {
                                var i = t.decode(r);
                                if (i.tag.isEOC())
                                    break;
                                e[e.length] = i
                            }
                            a = o - r.pos
                        } catch (f) {
                            throw new Error("Exception while decoding undefined length content: " + f)
                        }
                    return e
                };
                if (i.tagConstructed)
                    c = s();
                else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                    try {
                        if (3 == i.tagNumber && 0 != r.get())
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        c = s();
                        for (var u = 0; u < c.length; ++u)
                            if (c[u].tag.isEOC())
                                throw new Error("EOC is not supposed to be actual content.")
                    } catch (d) {
                        c = null
                    }
                if (null === c) {
                    if (null === a)
                        throw new Error("We can't skip over an invalid tag with undefined length at offset " + o);
                    r.pos = o + Math.abs(a)
                }
                return new t(n,f,a,i,c)
            }
            ,
            t
        }(), R = function() {
            function t(t) {
                var e = t.get();
                if (this.tagClass = e >> 6,
                this.tagConstructed = 0 !== (32 & e),
                this.tagNumber = 31 & e,
                31 == this.tagNumber) {
                    var r = new w;
                    do {
                        e = t.get(),
                        r.mulAdd(128, 127 & e)
                    } while (128 & e);
                    this.tagNumber = r.simplify()
                }
            }
            return t.prototype.isUniversal = function() {
                return 0 === this.tagClass
            }
            ,
            t.prototype.isEOC = function() {
                return 0 === this.tagClass && 0 === this.tagNumber
            }
            ,
            t
        }(), T = 0xdeadbeefcafe, M = 15715070 == (16777215 & T), I = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], D = (1 << 26) / I[I.length - 1], P = function() {
            function t(t, e, r) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }
            return t.prototype.toString = function(t) {
                if (this.s < 0)
                    return "-" + this.negate().toString(t);
                var e;
                if (16 == t)
                    e = 4;
                else if (8 == t)
                    e = 3;
                else if (2 == t)
                    e = 1;
                else if (32 == t)
                    e = 5;
                else {
                    if (4 != t)
                        return this.toRadix(t);
                    e = 2
                }
                var r, n = (1 << e) - 1, a = !1, o = "", f = this.t, c = this.DB - f * this.DB % e;
                if (f-- > 0) {
                    c < this.DB && (r = this[f] >> c) > 0 && (a = !0,
                    o = i(r));
                    while (f >= 0)
                        c < e ? (r = (this[f] & (1 << c) - 1) << e - c,
                        r |= this[--f] >> (c += this.DB - e)) : (r = this[f] >> (c -= e) & n,
                        c <= 0 && (c += this.DB,
                        --f)),
                        r > 0 && (a = !0),
                        a && (o += i(r))
                }
                return a ? o : "0"
            }
            ,
            t.prototype.negate = function() {
                var e = L();
                return t.ZERO.subTo(this, e),
                e
            }
            ,
            t.prototype.abs = function() {
                return this.s < 0 ? this.negate() : this
            }
            ,
            t.prototype.compareTo = function(t) {
                var e = this.s - t.s;
                if (0 != e)
                    return e;
                var r = this.t;
                if (e = r - t.t,
                0 != e)
                    return this.s < 0 ? -e : e;
                while (--r >= 0)
                    if (0 != (e = this[r] - t[r]))
                        return e;
                return 0
            }
            ,
            t.prototype.bitLength = function() {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + K(this[this.t - 1] ^ this.s & this.DM)
            }
            ,
            t.prototype.mod = function(e) {
                var r = L();
                return this.abs().divRemTo(e, null, r),
                this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r),
                r
            }
            ,
            t.prototype.modPowInt = function(t, e) {
                var r;
                return r = t < 256 || e.isEven() ? new B(e) : new N(e),
                this.exp(t, r)
            }
            ,
            t.prototype.clone = function() {
                var t = L();
                return this.copyTo(t),
                t
            }
            ,
            t.prototype.intValue = function() {
                if (this.s < 0) {
                    if (1 == this.t)
                        return this[0] - this.DV;
                    if (0 == this.t)
                        return -1
                } else {
                    if (1 == this.t)
                        return this[0];
                    if (0 == this.t)
                        return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }
            ,
            t.prototype.byteValue = function() {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }
            ,
            t.prototype.shortValue = function() {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }
            ,
            t.prototype.signum = function() {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }
            ,
            t.prototype.toByteArray = function() {
                var t = this.t
                  , e = [];
                e[0] = this.s;
                var r, n = this.DB - t * this.DB % 8, i = 0;
                if (t-- > 0) {
                    n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[i++] = r | this.s << this.DB - n);
                    while (t >= 0)
                        n < 8 ? (r = (this[t] & (1 << n) - 1) << 8 - n,
                        r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255,
                        n <= 0 && (n += this.DB,
                        --t)),
                        0 != (128 & r) && (r |= -256),
                        0 == i && (128 & this.s) != (128 & r) && ++i,
                        (i > 0 || r != this.s) && (e[i++] = r)
                }
                return e
            }
            ,
            t.prototype.equals = function(t) {
                return 0 == this.compareTo(t)
            }
            ,
            t.prototype.min = function(t) {
                return this.compareTo(t) < 0 ? this : t
            }
            ,
            t.prototype.max = function(t) {
                return this.compareTo(t) > 0 ? this : t
            }
            ,
            t.prototype.and = function(t) {
                var e = L();
                return this.bitwiseTo(t, a, e),
                e
            }
            ,
            t.prototype.or = function(t) {
                var e = L();
                return this.bitwiseTo(t, o, e),
                e
            }
            ,
            t.prototype.xor = function(t) {
                var e = L();
                return this.bitwiseTo(t, f, e),
                e
            }
            ,
            t.prototype.andNot = function(t) {
                var e = L();
                return this.bitwiseTo(t, c, e),
                e
            }
            ,
            t.prototype.not = function() {
                for (var t = L(), e = 0; e < this.t; ++e)
                    t[e] = this.DM & ~this[e];
                return t.t = this.t,
                t.s = ~this.s,
                t
            }
            ,
            t.prototype.shiftLeft = function(t) {
                var e = L();
                return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                e
            }
            ,
            t.prototype.shiftRight = function(t) {
                var e = L();
                return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                e
            }
            ,
            t.prototype.getLowestSetBit = function() {
                for (var t = 0; t < this.t; ++t)
                    if (0 != this[t])
                        return t * this.DB + s(this[t]);
                return this.s < 0 ? this.t * this.DB : -1
            }
            ,
            t.prototype.bitCount = function() {
                for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
                    t += u(this[r] ^ e);
                return t
            }
            ,
            t.prototype.testBit = function(t) {
                var e = Math.floor(t / this.DB);
                return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }
            ,
            t.prototype.setBit = function(t) {
                return this.changeBit(t, o)
            }
            ,
            t.prototype.clearBit = function(t) {
                return this.changeBit(t, c)
            }
            ,
            t.prototype.flipBit = function(t) {
                return this.changeBit(t, f)
            }
            ,
            t.prototype.add = function(t) {
                var e = L();
                return this.addTo(t, e),
                e
            }
            ,
            t.prototype.subtract = function(t) {
                var e = L();
                return this.subTo(t, e),
                e
            }
            ,
            t.prototype.multiply = function(t) {
                var e = L();
                return this.multiplyTo(t, e),
                e
            }
            ,
            t.prototype.divide = function(t) {
                var e = L();
                return this.divRemTo(t, e, null),
                e
            }
            ,
            t.prototype.remainder = function(t) {
                var e = L();
                return this.divRemTo(t, null, e),
                e
            }
            ,
            t.prototype.divideAndRemainder = function(t) {
                var e = L()
                  , r = L();
                return this.divRemTo(t, e, r),
                [e, r]
            }
            ,
            t.prototype.modPow = function(t, e) {
                var r, n, i = t.bitLength(), a = Y(1);
                if (i <= 0)
                    return a;
                r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                n = i < 8 ? new B(e) : e.isEven() ? new C(e) : new N(e);
                var o = []
                  , f = 3
                  , c = r - 1
                  , s = (1 << r) - 1;
                if (o[1] = n.convert(this),
                r > 1) {
                    var u = L();
                    n.sqrTo(o[1], u);
                    while (f <= s)
                        o[f] = L(),
                        n.mulTo(u, o[f - 2], o[f]),
                        f += 2
                }
                var d, h, l = t.t - 1, b = !0, p = L();
                i = K(t[l]) - 1;
                while (l >= 0) {
                    i >= c ? d = t[l] >> i - c & s : (d = (t[l] & (1 << i + 1) - 1) << c - i,
                    l > 0 && (d |= t[l - 1] >> this.DB + i - c)),
                    f = r;
                    while (0 == (1 & d))
                        d >>= 1,
                        --f;
                    if ((i -= f) < 0 && (i += this.DB,
                    --l),
                    b)
                        o[d].copyTo(a),
                        b = !1;
                    else {
                        while (f > 1)
                            n.sqrTo(a, p),
                            n.sqrTo(p, a),
                            f -= 2;
                        f > 0 ? n.sqrTo(a, p) : (h = a,
                        a = p,
                        p = h),
                        n.mulTo(p, o[d], a)
                    }
                    while (l >= 0 && 0 == (t[l] & 1 << i))
                        n.sqrTo(a, p),
                        h = a,
                        a = p,
                        p = h,
                        --i < 0 && (i = this.DB - 1,
                        --l)
                }
                return n.revert(a)
            }
            ,
            t.prototype.modInverse = function(e) {
                var r = e.isEven();
                if (this.isEven() && r || 0 == e.signum())
                    return t.ZERO;
                var n = e.clone()
                  , i = this.clone()
                  , a = Y(1)
                  , o = Y(0)
                  , f = Y(0)
                  , c = Y(1);
                while (0 != n.signum()) {
                    while (n.isEven())
                        n.rShiftTo(1, n),
                        r ? (a.isEven() && o.isEven() || (a.addTo(this, a),
                        o.subTo(e, o)),
                        a.rShiftTo(1, a)) : o.isEven() || o.subTo(e, o),
                        o.rShiftTo(1, o);
                    while (i.isEven())
                        i.rShiftTo(1, i),
                        r ? (f.isEven() && c.isEven() || (f.addTo(this, f),
                        c.subTo(e, c)),
                        f.rShiftTo(1, f)) : c.isEven() || c.subTo(e, c),
                        c.rShiftTo(1, c);
                    n.compareTo(i) >= 0 ? (n.subTo(i, n),
                    r && a.subTo(f, a),
                    o.subTo(c, o)) : (i.subTo(n, i),
                    r && f.subTo(a, f),
                    c.subTo(o, c))
                }
                return 0 != i.compareTo(t.ONE) ? t.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c),
                c.signum() < 0 ? c.add(e) : c) : c
            }
            ,
            t.prototype.pow = function(t) {
                return this.exp(t, new k)
            }
            ,
            t.prototype.gcd = function(t) {
                var e = this.s < 0 ? this.negate() : this.clone()
                  , r = t.s < 0 ? t.negate() : t.clone();
                if (e.compareTo(r) < 0) {
                    var n = e;
                    e = r,
                    r = n
                }
                var i = e.getLowestSetBit()
                  , a = r.getLowestSetBit();
                if (a < 0)
                    return e;
                i < a && (a = i),
                a > 0 && (e.rShiftTo(a, e),
                r.rShiftTo(a, r));
                while (e.signum() > 0)
                    (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                    (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                    e.compareTo(r) >= 0 ? (e.subTo(r, e),
                    e.rShiftTo(1, e)) : (r.subTo(e, r),
                    r.rShiftTo(1, r));
                return a > 0 && r.lShiftTo(a, r),
                r
            }
            ,
            t.prototype.isProbablePrime = function(t) {
                var e, r = this.abs();
                if (1 == r.t && r[0] <= I[I.length - 1]) {
                    for (e = 0; e < I.length; ++e)
                        if (r[0] == I[e])
                            return !0;
                    return !1
                }
                if (r.isEven())
                    return !1;
                e = 1;
                while (e < I.length) {
                    var n = I[e]
                      , i = e + 1;
                    while (i < I.length && n < D)
                        n *= I[i++];
                    n = r.modInt(n);
                    while (e < i)
                        if (n % I[e++] == 0)
                            return !1
                }
                return r.millerRabin(t)
            }
            ,
            t.prototype.copyTo = function(t) {
                for (var e = this.t - 1; e >= 0; --e)
                    t[e] = this[e];
                t.t = this.t,
                t.s = this.s
            }
            ,
            t.prototype.fromInt = function(t) {
                this.t = 1,
                this.s = t < 0 ? -1 : 0,
                t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
            }
            ,
            t.prototype.fromString = function(e, r) {
                var n;
                if (16 == r)
                    n = 4;
                else if (8 == r)
                    n = 3;
                else if (256 == r)
                    n = 8;
                else if (2 == r)
                    n = 1;
                else if (32 == r)
                    n = 5;
                else {
                    if (4 != r)
                        return void this.fromRadix(e, r);
                    n = 2
                }
                this.t = 0,
                this.s = 0;
                var i = e.length
                  , a = !1
                  , o = 0;
                while (--i >= 0) {
                    var f = 8 == n ? 255 & +e[i] : W(e, i);
                    f < 0 ? "-" == e.charAt(i) && (a = !0) : (a = !1,
                    0 == o ? this[this.t++] = f : o + n > this.DB ? (this[this.t - 1] |= (f & (1 << this.DB - o) - 1) << o,
                    this[this.t++] = f >> this.DB - o) : this[this.t - 1] |= f << o,
                    o += n,
                    o >= this.DB && (o -= this.DB))
                }
                8 == n && 0 != (128 & +e[0]) && (this.s = -1,
                o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)),
                this.clamp(),
                a && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.clamp = function() {
                var t = this.s & this.DM;
                while (this.t > 0 && this[this.t - 1] == t)
                    --this.t
            }
            ,
            t.prototype.dlShiftTo = function(t, e) {
                var r;
                for (r = this.t - 1; r >= 0; --r)
                    e[r + t] = this[r];
                for (r = t - 1; r >= 0; --r)
                    e[r] = 0;
                e.t = this.t + t,
                e.s = this.s
            }
            ,
            t.prototype.drShiftTo = function(t, e) {
                for (var r = t; r < this.t; ++r)
                    e[r - t] = this[r];
                e.t = Math.max(this.t - t, 0),
                e.s = this.s
            }
            ,
            t.prototype.lShiftTo = function(t, e) {
                for (var r = t % this.DB, n = this.DB - r, i = (1 << n) - 1, a = Math.floor(t / this.DB), o = this.s << r & this.DM, f = this.t - 1; f >= 0; --f)
                    e[f + a + 1] = this[f] >> n | o,
                    o = (this[f] & i) << r;
                for (f = a - 1; f >= 0; --f)
                    e[f] = 0;
                e[a] = o,
                e.t = this.t + a + 1,
                e.s = this.s,
                e.clamp()
            }
            ,
            t.prototype.rShiftTo = function(t, e) {
                e.s = this.s;
                var r = Math.floor(t / this.DB);
                if (r >= this.t)
                    e.t = 0;
                else {
                    var n = t % this.DB
                      , i = this.DB - n
                      , a = (1 << n) - 1;
                    e[0] = this[r] >> n;
                    for (var o = r + 1; o < this.t; ++o)
                        e[o - r - 1] |= (this[o] & a) << i,
                        e[o - r] = this[o] >> n;
                    n > 0 && (e[this.t - r - 1] |= (this.s & a) << i),
                    e.t = this.t - r,
                    e.clamp()
                }
            }
            ,
            t.prototype.subTo = function(t, e) {
                var r = 0
                  , n = 0
                  , i = Math.min(t.t, this.t);
                while (r < i)
                    n += this[r] - t[r],
                    e[r++] = n & this.DM,
                    n >>= this.DB;
                if (t.t < this.t) {
                    n -= t.s;
                    while (r < this.t)
                        n += this[r],
                        e[r++] = n & this.DM,
                        n >>= this.DB;
                    n += this.s
                } else {
                    n += this.s;
                    while (r < t.t)
                        n -= t[r],
                        e[r++] = n & this.DM,
                        n >>= this.DB;
                    n -= t.s
                }
                e.s = n < 0 ? -1 : 0,
                n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n),
                e.t = r,
                e.clamp()
            }
            ,
            t.prototype.multiplyTo = function(e, r) {
                var n = this.abs()
                  , i = e.abs()
                  , a = n.t;
                r.t = a + i.t;
                while (--a >= 0)
                    r[a] = 0;
                for (a = 0; a < i.t; ++a)
                    r[a + n.t] = n.am(0, i[a], r, a, 0, n.t);
                r.s = 0,
                r.clamp(),
                this.s != e.s && t.ZERO.subTo(r, r)
            }
            ,
            t.prototype.squareTo = function(t) {
                var e = this.abs()
                  , r = t.t = 2 * e.t;
                while (--r >= 0)
                    t[r] = 0;
                for (r = 0; r < e.t - 1; ++r) {
                    var n = e.am(r, e[r], t, 2 * r, 0, 1);
                    (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV,
                    t[r + e.t + 1] = 1)
                }
                t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)),
                t.s = 0,
                t.clamp()
            }
            ,
            t.prototype.divRemTo = function(e, r, n) {
                var i = e.abs();
                if (!(i.t <= 0)) {
                    var a = this.abs();
                    if (a.t < i.t)
                        return null != r && r.fromInt(0),
                        void (null != n && this.copyTo(n));
                    null == n && (n = L());
                    var o = L()
                      , f = this.s
                      , c = e.s
                      , s = this.DB - K(i[i.t - 1]);
                    s > 0 ? (i.lShiftTo(s, o),
                    a.lShiftTo(s, n)) : (i.copyTo(o),
                    a.copyTo(n));
                    var u = o.t
                      , d = o[u - 1];
                    if (0 != d) {
                        var h = d * (1 << this.F1) + (u > 1 ? o[u - 2] >> this.F2 : 0)
                          , l = this.FV / h
                          , b = (1 << this.F1) / h
                          , p = 1 << this.F2
                          , v = n.t
                          , g = v - u
                          , y = null == r ? L() : r;
                        o.dlShiftTo(g, y),
                        n.compareTo(y) >= 0 && (n[n.t++] = 1,
                        n.subTo(y, n)),
                        t.ONE.dlShiftTo(u, y),
                        y.subTo(o, o);
                        while (o.t < u)
                            o[o.t++] = 0;
                        while (--g >= 0) {
                            var m = n[--v] == d ? this.DM : Math.floor(n[v] * l + (n[v - 1] + p) * b);
                            if ((n[v] += o.am(0, m, n, g, 0, u)) < m) {
                                o.dlShiftTo(g, y),
                                n.subTo(y, n);
                                while (n[v] < --m)
                                    n.subTo(y, n)
                            }
                        }
                        null != r && (n.drShiftTo(u, r),
                        f != c && t.ZERO.subTo(r, r)),
                        n.t = u,
                        n.clamp(),
                        s > 0 && n.rShiftTo(s, n),
                        f < 0 && t.ZERO.subTo(n, n)
                    }
                }
            }
            ,
            t.prototype.invDigit = function() {
                if (this.t < 1)
                    return 0;
                var t = this[0];
                if (0 == (1 & t))
                    return 0;
                var e = 3 & t;
                return e = e * (2 - (15 & t) * e) & 15,
                e = e * (2 - (255 & t) * e) & 255,
                e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
                e = e * (2 - t * e % this.DV) % this.DV,
                e > 0 ? this.DV - e : -e
            }
            ,
            t.prototype.isEven = function() {
                return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }
            ,
            t.prototype.exp = function(e, r) {
                if (e > 4294967295 || e < 1)
                    return t.ONE;
                var n = L()
                  , i = L()
                  , a = r.convert(this)
                  , o = K(e) - 1;
                a.copyTo(n);
                while (--o >= 0)
                    if (r.sqrTo(n, i),
                    (e & 1 << o) > 0)
                        r.mulTo(i, a, n);
                    else {
                        var f = n;
                        n = i,
                        i = f
                    }
                return r.revert(n)
            }
            ,
            t.prototype.chunkSize = function(t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
            ,
            t.prototype.toRadix = function(t) {
                if (null == t && (t = 10),
                0 == this.signum() || t < 2 || t > 36)
                    return "0";
                var e = this.chunkSize(t)
                  , r = Math.pow(t, e)
                  , n = Y(r)
                  , i = L()
                  , a = L()
                  , o = "";
                this.divRemTo(n, i, a);
                while (i.signum() > 0)
                    o = (r + a.intValue()).toString(t).substr(1) + o,
                    i.divRemTo(n, i, a);
                return a.intValue().toString(t) + o
            }
            ,
            t.prototype.fromRadix = function(e, r) {
                this.fromInt(0),
                null == r && (r = 10);
                for (var n = this.chunkSize(r), i = Math.pow(r, n), a = !1, o = 0, f = 0, c = 0; c < e.length; ++c) {
                    var s = W(e, c);
                    s < 0 ? "-" == e.charAt(c) && 0 == this.signum() && (a = !0) : (f = r * f + s,
                    ++o >= n && (this.dMultiply(i),
                    this.dAddOffset(f, 0),
                    o = 0,
                    f = 0))
                }
                o > 0 && (this.dMultiply(Math.pow(r, o)),
                this.dAddOffset(f, 0)),
                a && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.fromNumber = function(e, r, n) {
                if ("number" == typeof r)
                    if (e < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(e, n),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), o, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        while (!this.isProbablePrime(r))
                            this.dAddOffset(2, 0),
                            this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this)
                    }
                else {
                    var i = []
                      , a = 7 & e;
                    i.length = 1 + (e >> 3),
                    r.nextBytes(i),
                    a > 0 ? i[0] &= (1 << a) - 1 : i[0] = 0,
                    this.fromString(i, 256)
                }
            }
            ,
            t.prototype.bitwiseTo = function(t, e, r) {
                var n, i, a = Math.min(t.t, this.t);
                for (n = 0; n < a; ++n)
                    r[n] = e(this[n], t[n]);
                if (t.t < this.t) {
                    for (i = t.s & this.DM,
                    n = a; n < this.t; ++n)
                        r[n] = e(this[n], i);
                    r.t = this.t
                } else {
                    for (i = this.s & this.DM,
                    n = a; n < t.t; ++n)
                        r[n] = e(i, t[n]);
                    r.t = t.t
                }
                r.s = e(this.s, t.s),
                r.clamp()
            }
            ,
            t.prototype.changeBit = function(e, r) {
                var n = t.ONE.shiftLeft(e);
                return this.bitwiseTo(n, r, n),
                n
            }
            ,
            t.prototype.addTo = function(t, e) {
                var r = 0
                  , n = 0
                  , i = Math.min(t.t, this.t);
                while (r < i)
                    n += this[r] + t[r],
                    e[r++] = n & this.DM,
                    n >>= this.DB;
                if (t.t < this.t) {
                    n += t.s;
                    while (r < this.t)
                        n += this[r],
                        e[r++] = n & this.DM,
                        n >>= this.DB;
                    n += this.s
                } else {
                    n += this.s;
                    while (r < t.t)
                        n += t[r],
                        e[r++] = n & this.DM,
                        n >>= this.DB;
                    n += t.s
                }
                e.s = n < 0 ? -1 : 0,
                n > 0 ? e[r++] = n : n < -1 && (e[r++] = this.DV + n),
                e.t = r,
                e.clamp()
            }
            ,
            t.prototype.dMultiply = function(t) {
                this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                ++this.t,
                this.clamp()
            }
            ,
            t.prototype.dAddOffset = function(t, e) {
                if (0 != t) {
                    while (this.t <= e)
                        this[this.t++] = 0;
                    this[e] += t;
                    while (this[e] >= this.DV)
                        this[e] -= this.DV,
                        ++e >= this.t && (this[this.t++] = 0),
                        ++this[e]
                }
            }
            ,
            t.prototype.multiplyLowerTo = function(t, e, r) {
                var n = Math.min(this.t + t.t, e);
                r.s = 0,
                r.t = n;
                while (n > 0)
                    r[--n] = 0;
                for (var i = r.t - this.t; n < i; ++n)
                    r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
                for (i = Math.min(t.t, e); n < i; ++n)
                    this.am(0, t[n], r, n, 0, e - n);
                r.clamp()
            }
            ,
            t.prototype.multiplyUpperTo = function(t, e, r) {
                --e;
                var n = r.t = this.t + t.t - e;
                r.s = 0;
                while (--n >= 0)
                    r[n] = 0;
                for (n = Math.max(e - this.t, 0); n < t.t; ++n)
                    r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
                r.clamp(),
                r.drShiftTo(1, r)
            }
            ,
            t.prototype.modInt = function(t) {
                if (t <= 0)
                    return 0;
                var e = this.DV % t
                  , r = this.s < 0 ? t - 1 : 0;
                if (this.t > 0)
                    if (0 == e)
                        r = this[0] % t;
                    else
                        for (var n = this.t - 1; n >= 0; --n)
                            r = (e * r + this[n]) % t;
                return r
            }
            ,
            t.prototype.millerRabin = function(e) {
                var r = this.subtract(t.ONE)
                  , n = r.getLowestSetBit();
                if (n <= 0)
                    return !1;
                var i = r.shiftRight(n);
                e = e + 1 >> 1,
                e > I.length && (e = I.length);
                for (var a = L(), o = 0; o < e; ++o) {
                    a.fromInt(I[Math.floor(Math.random() * I.length)]);
                    var f = a.modPow(i, this);
                    if (0 != f.compareTo(t.ONE) && 0 != f.compareTo(r)) {
                        var c = 1;
                        while (c++ < n && 0 != f.compareTo(r))
                            if (f = f.modPowInt(2, this),
                            0 == f.compareTo(t.ONE))
                                return !1;
                        if (0 != f.compareTo(r))
                            return !1
                    }
                }
                return !0
            }
            ,
            t.prototype.square = function() {
                var t = L();
                return this.squareTo(t),
                t
            }
            ,
            t.prototype.gcda = function(t, e) {
                var r = this.s < 0 ? this.negate() : this.clone()
                  , n = t.s < 0 ? t.negate() : t.clone();
                if (r.compareTo(n) < 0) {
                    var i = r;
                    r = n,
                    n = i
                }
                var a = r.getLowestSetBit()
                  , o = n.getLowestSetBit();
                if (o < 0)
                    e(r);
                else {
                    a < o && (o = a),
                    o > 0 && (r.rShiftTo(o, r),
                    n.rShiftTo(o, n));
                    var f = function() {
                        (a = r.getLowestSetBit()) > 0 && r.rShiftTo(a, r),
                        (a = n.getLowestSetBit()) > 0 && n.rShiftTo(a, n),
                        r.compareTo(n) >= 0 ? (r.subTo(n, r),
                        r.rShiftTo(1, r)) : (n.subTo(r, n),
                        n.rShiftTo(1, n)),
                        r.signum() > 0 ? setTimeout(f, 0) : (o > 0 && n.lShiftTo(o, n),
                        setTimeout((function() {
                            e(n)
                        }
                        ), 0))
                    };
                    setTimeout(f, 10)
                }
            }
            ,
            t.prototype.fromNumberAsync = function(e, r, n, i) {
                if ("number" == typeof r)
                    if (e < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(e, n),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), o, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        var a = this
                          , f = function() {
                            a.dAddOffset(2, 0),
                            a.bitLength() > e && a.subTo(t.ONE.shiftLeft(e - 1), a),
                            a.isProbablePrime(r) ? setTimeout((function() {
                                i()
                            }
                            ), 0) : setTimeout(f, 0)
                        };
                        setTimeout(f, 0)
                    }
                else {
                    var c = []
                      , s = 7 & e;
                    c.length = 1 + (e >> 3),
                    r.nextBytes(c),
                    s > 0 ? c[0] &= (1 << s) - 1 : c[0] = 0,
                    this.fromString(c, 256)
                }
            }
            ,
            t
        }(), k = function() {
            function t() {}
            return t.prototype.convert = function(t) {
                return t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e)
            }
            ,
            t
        }(), B = function() {
            function t(t) {
                this.m = t
            }
            return t.prototype.convert = function(t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                t.divRemTo(this.m, null, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), N = function() {
            function t(t) {
                this.m = t,
                this.mp = t.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << t.DB - 15) - 1,
                this.mt2 = 2 * t.t
            }
            return t.prototype.convert = function(t) {
                var e = L();
                return t.abs().dlShiftTo(this.m.t, e),
                e.divRemTo(this.m, null, e),
                t.s < 0 && e.compareTo(P.ZERO) > 0 && this.m.subTo(e, e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                var e = L();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.reduce = function(t) {
                while (t.t <= this.mt2)
                    t[t.t++] = 0;
                for (var e = 0; e < this.m.t; ++e) {
                    var r = 32767 & t[e]
                      , n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                    r = e + this.m.t,
                    t[r] += this.m.am(0, n, t, e, 0, this.m.t);
                    while (t[r] >= t.DV)
                        t[r] -= t.DV,
                        t[++r]++
                }
                t.clamp(),
                t.drShiftTo(this.m.t, t),
                t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), C = function() {
            function t(t) {
                this.m = t,
                this.r2 = L(),
                this.q3 = L(),
                P.ONE.dlShiftTo(2 * t.t, this.r2),
                this.mu = this.r2.divide(t)
            }
            return t.prototype.convert = function(t) {
                if (t.s < 0 || t.t > 2 * this.m.t)
                    return t.mod(this.m);
                if (t.compareTo(this.m) < 0)
                    return t;
                var e = L();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                t.drShiftTo(this.m.t - 1, this.r2),
                t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                t.clamp()),
                this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
                while (t.compareTo(this.r2) < 0)
                    t.dAddOffset(1, this.m.t + 1);
                t.subTo(this.r2, t);
                while (t.compareTo(this.m) >= 0)
                    t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }();
        function L() {
            return new P(null)
        }
        function F(t, e) {
            return new P(t,e)
        }
        var H = "undefined" !== typeof navigator;
        H && M && "Microsoft Internet Explorer" == navigator.appName ? (P.prototype.am = function(t, e, r, n, i, a) {
            var o = 32767 & e
              , f = e >> 15;
            while (--a >= 0) {
                var c = 32767 & this[t]
                  , s = this[t++] >> 15
                  , u = f * c + s * o;
                c = o * c + ((32767 & u) << 15) + r[n] + (1073741823 & i),
                i = (c >>> 30) + (u >>> 15) + f * s + (i >>> 30),
                r[n++] = 1073741823 & c
            }
            return i
        }
        ,
        A = 30) : H && M && "Netscape" != navigator.appName ? (P.prototype.am = function(t, e, r, n, i, a) {
            while (--a >= 0) {
                var o = e * this[t++] + r[n] + i;
                i = Math.floor(o / 67108864),
                r[n++] = 67108863 & o
            }
            return i
        }
        ,
        A = 26) : (P.prototype.am = function(t, e, r, n, i, a) {
            var o = 16383 & e
              , f = e >> 14;
            while (--a >= 0) {
                var c = 16383 & this[t]
                  , s = this[t++] >> 14
                  , u = f * c + s * o;
                c = o * c + ((16383 & u) << 14) + r[n] + i,
                i = (c >> 28) + (u >> 14) + f * s,
                r[n++] = 268435455 & c
            }
            return i
        }
        ,
        A = 28),
        P.prototype.DB = A,
        P.prototype.DM = (1 << A) - 1,
        P.prototype.DV = 1 << A;
        var z = 52;
        P.prototype.FV = Math.pow(2, z),
        P.prototype.F1 = z - A,
        P.prototype.F2 = 2 * A - z;
        var q, U, V = [];
        for (q = "0".charCodeAt(0),
        U = 0; U <= 9; ++U)
            V[q++] = U;
        for (q = "a".charCodeAt(0),
        U = 10; U < 36; ++U)
            V[q++] = U;
        for (q = "A".charCodeAt(0),
        U = 10; U < 36; ++U)
            V[q++] = U;
        function W(t, e) {
            var r = V[t.charCodeAt(e)];
            return null == r ? -1 : r
        }
        function Y(t) {
            var e = L();
            return e.fromInt(t),
            e
        }
        function K(t) {
            var e, r = 1;
            return 0 != (e = t >>> 16) && (t = e,
            r += 16),
            0 != (e = t >> 8) && (t = e,
            r += 8),
            0 != (e = t >> 4) && (t = e,
            r += 4),
            0 != (e = t >> 2) && (t = e,
            r += 2),
            0 != (e = t >> 1) && (t = e,
            r += 1),
            r
        }
        P.ZERO = Y(0),
        P.ONE = Y(1);
        var G = function() {
            function t() {
                this.i = 0,
                this.j = 0,
                this.S = []
            }
            return t.prototype.init = function(t) {
                var e, r, n;
                for (e = 0; e < 256; ++e)
                    this.S[e] = e;
                for (r = 0,
                e = 0; e < 256; ++e)
                    r = r + this.S[e] + t[e % t.length] & 255,
                    n = this.S[e],
                    this.S[e] = this.S[r],
                    this.S[r] = n;
                this.i = 0,
                this.j = 0
            }
            ,
            t.prototype.next = function() {
                var t;
                return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                t = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = t,
                this.S[t + this.S[this.i] & 255]
            }
            ,
            t
        }();
        function X() {
            return new G
        }
        var $, J, Z = 256, Q = null;
        if (null == Q) {
            Q = [],
            J = 0;
            var tt = void 0;
            if (window.crypto && window.crypto.getRandomValues) {
                var et = new Uint32Array(256);
                for (window.crypto.getRandomValues(et),
                tt = 0; tt < et.length; ++tt)
                    Q[J++] = 255 & et[tt]
            }
            var rt = 0
              , nt = function(t) {
                if (rt = rt || 0,
                rt >= 256 || J >= Z)
                    window.removeEventListener ? window.removeEventListener("mousemove", nt, !1) : window.detachEvent && window.detachEvent("onmousemove", nt);
                else
                    try {
                        var e = t.x + t.y;
                        Q[J++] = 255 & e,
                        rt += 1
                    } catch (r) {}
            };
            window.addEventListener ? window.addEventListener("mousemove", nt, !1) : window.attachEvent && window.attachEvent("onmousemove", nt)
        }
        function it() {
            if (null == $) {
                $ = X();
                while (J < Z) {
                    var t = Math.floor(65536 * Math.random());
                    Q[J++] = 255 & t
                }
                for ($.init(Q),
                J = 0; J < Q.length; ++J)
                    Q[J] = 0;
                J = 0
            }
            return $.next()
        }
        var at = function() {
            function t() {}
            return t.prototype.nextBytes = function(t) {
                for (var e = 0; e < t.length; ++e)
                    t[e] = it()
            }
            ,
            t
        }();
        function ot(t, e) {
            if (e < t.length + 22)
                return console.error("Message too long for RSA"),
                null;
            for (var r = e - t.length - 6, n = "", i = 0; i < r; i += 2)
                n += "ff";
            var a = "0001" + n + "00" + t;
            return F(a, 16)
        }
        function ft(t, e) {
            if (e < t.length + 11)
                return console.error("Message too long for RSA"),
                null;
            var r = []
              , n = t.length - 1;
            while (n >= 0 && e > 0) {
                var i = t.charCodeAt(n--);
                i < 128 ? r[--e] = i : i > 127 && i < 2048 ? (r[--e] = 63 & i | 128,
                r[--e] = i >> 6 | 192) : (r[--e] = 63 & i | 128,
                r[--e] = i >> 6 & 63 | 128,
                r[--e] = i >> 12 | 224)
            }
            r[--e] = 0;
            var a = new at
              , o = [];
            while (e > 2) {
                o[0] = 0;
                while (0 == o[0])
                    a.nextBytes(o);
                r[--e] = o[0]
            }
            return r[--e] = 2,
            r[--e] = 0,
            new P(r)
        }
        var ct = function() {
            function t() {
                this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
            }
            return t.prototype.doPublic = function(t) {
                return t.modPowInt(this.e, this.n)
            }
            ,
            t.prototype.doPrivate = function(t) {
                if (null == this.p || null == this.q)
                    return t.modPow(this.d, this.n);
                var e = t.mod(this.p).modPow(this.dmp1, this.p)
                  , r = t.mod(this.q).modPow(this.dmq1, this.q);
                while (e.compareTo(r) < 0)
                    e = e.add(this.p);
                return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
            }
            ,
            t.prototype.setPublic = function(t, e) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = F(t, 16),
                this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
            }
            ,
            t.prototype.encrypt = function(t) {
                var e = this.n.bitLength() + 7 >> 3
                  , r = ft(t, e);
                if (null == r)
                    return null;
                var n = this.doPublic(r);
                if (null == n)
                    return null;
                for (var i = n.toString(16), a = i.length, o = 0; o < 2 * e - a; o++)
                    i = "0" + i;
                return i
            }
            ,
            t.prototype.setPrivate = function(t, e, r) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = F(t, 16),
                this.e = parseInt(e, 16),
                this.d = F(r, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.setPrivateEx = function(t, e, r, n, i, a, o, f) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = F(t, 16),
                this.e = parseInt(e, 16),
                this.d = F(r, 16),
                this.p = F(n, 16),
                this.q = F(i, 16),
                this.dmp1 = F(a, 16),
                this.dmq1 = F(o, 16),
                this.coeff = F(f, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.generate = function(t, e) {
                var r = new at
                  , n = t >> 1;
                this.e = parseInt(e, 16);
                for (var i = new P(e,16); ; ) {
                    for (; ; )
                        if (this.p = new P(t - n,1,r),
                        0 == this.p.subtract(P.ONE).gcd(i).compareTo(P.ONE) && this.p.isProbablePrime(10))
                            break;
                    for (; ; )
                        if (this.q = new P(n,1,r),
                        0 == this.q.subtract(P.ONE).gcd(i).compareTo(P.ONE) && this.q.isProbablePrime(10))
                            break;
                    if (this.p.compareTo(this.q) <= 0) {
                        var a = this.p;
                        this.p = this.q,
                        this.q = a
                    }
                    var o = this.p.subtract(P.ONE)
                      , f = this.q.subtract(P.ONE)
                      , c = o.multiply(f);
                    if (0 == c.gcd(i).compareTo(P.ONE)) {
                        this.n = this.p.multiply(this.q),
                        this.d = i.modInverse(c),
                        this.dmp1 = this.d.mod(o),
                        this.dmq1 = this.d.mod(f),
                        this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            t.prototype.decrypt = function(t) {
                var e = F(t, 16)
                  , r = this.doPrivate(e);
                return null == r ? null : st(r, this.n.bitLength() + 7 >> 3)
            }
            ,
            t.prototype.generateAsync = function(t, e, r) {
                var n = new at
                  , i = t >> 1;
                this.e = parseInt(e, 16);
                var a = new P(e,16)
                  , o = this
                  , f = function() {
                    var e = function() {
                        if (o.p.compareTo(o.q) <= 0) {
                            var t = o.p;
                            o.p = o.q,
                            o.q = t
                        }
                        var e = o.p.subtract(P.ONE)
                          , n = o.q.subtract(P.ONE)
                          , i = e.multiply(n);
                        0 == i.gcd(a).compareTo(P.ONE) ? (o.n = o.p.multiply(o.q),
                        o.d = a.modInverse(i),
                        o.dmp1 = o.d.mod(e),
                        o.dmq1 = o.d.mod(n),
                        o.coeff = o.q.modInverse(o.p),
                        setTimeout((function() {
                            r()
                        }
                        ), 0)) : setTimeout(f, 0)
                    }
                      , c = function() {
                        o.q = L(),
                        o.q.fromNumberAsync(i, 1, n, (function() {
                            o.q.subtract(P.ONE).gcda(a, (function(t) {
                                0 == t.compareTo(P.ONE) && o.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(c, 0)
                            }
                            ))
                        }
                        ))
                    }
                      , s = function() {
                        o.p = L(),
                        o.p.fromNumberAsync(t - i, 1, n, (function() {
                            o.p.subtract(P.ONE).gcda(a, (function(t) {
                                0 == t.compareTo(P.ONE) && o.p.isProbablePrime(10) ? setTimeout(c, 0) : setTimeout(s, 0)
                            }
                            ))
                        }
                        ))
                    };
                    setTimeout(s, 0)
                };
                setTimeout(f, 0)
            }
            ,
            t.prototype.sign = function(t, e, r) {
                var n = dt(r)
                  , i = n + e(t).toString()
                  , a = ot(i, this.n.bitLength() / 4);
                if (null == a)
                    return null;
                var o = this.doPrivate(a);
                if (null == o)
                    return null;
                var f = o.toString(16);
                return 0 == (1 & f.length) ? f : "0" + f
            }
            ,
            t.prototype.verify = function(t, e, r) {
                var n = F(e, 16)
                  , i = this.doPublic(n);
                if (null == i)
                    return null;
                var a = i.toString(16).replace(/^1f+00/, "")
                  , o = ht(a);
                return o == r(t).toString()
            }
            ,
            t
        }();
        function st(t, e) {
            var r = t.toByteArray()
              , n = 0;
            while (n < r.length && 0 == r[n])
                ++n;
            if (r.length - n != e - 1 || 2 != r[n])
                return null;
            ++n;
            while (0 != r[n])
                if (++n >= r.length)
                    return null;
            var i = "";
            while (++n < r.length) {
                var a = 255 & r[n];
                a < 128 ? i += String.fromCharCode(a) : a > 191 && a < 224 ? (i += String.fromCharCode((31 & a) << 6 | 63 & r[n + 1]),
                ++n) : (i += String.fromCharCode((15 & a) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2]),
                n += 2)
            }
            return i
        }
        var ut = {
            md2: "3020300c06082a864886f70d020205000410",
            md5: "3020300c06082a864886f70d020505000410",
            sha1: "3021300906052b0e03021a05000414",
            sha224: "302d300d06096086480165030402040500041c",
            sha256: "3031300d060960864801650304020105000420",
            sha384: "3041300d060960864801650304020205000430",
            sha512: "3051300d060960864801650304020305000440",
            ripemd160: "3021300906052b2403020105000414"
        };
        function dt(t) {
            return ut[t] || ""
        }
        function ht(t) {
            for (var e in ut)
                if (ut.hasOwnProperty(e)) {
                    var r = ut[e]
                      , n = r.length;
                    if (t.substr(0, n) == r)
                        return t.substr(n)
                }
            return t
        }
        var lt = {};
        lt.lang = {
            extend: function(t, e, r) {
                if (!e || !t)
                    throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                var n = function() {};
                if (n.prototype = e.prototype,
                t.prototype = new n,
                t.prototype.constructor = t,
                t.superclass = e.prototype,
                e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                r) {
                    var i;
                    for (i in r)
                        t.prototype[i] = r[i];
                    var a = function() {}
                      , o = ["toString", "valueOf"];
                    try {
                        /MSIE/.test(navigator.userAgent) && (a = function(t, e) {
                            for (i = 0; i < o.length; i += 1) {
                                var r = o[i]
                                  , n = e[r];
                                "function" === typeof n && n != Object.prototype[r] && (t[r] = n)
                            }
                        }
                        )
                    } catch (f) {}
                    a(t.prototype, r)
                }
            }
        };
        var bt = {};
        "undefined" != typeof bt.asn1 && bt.asn1 || (bt.asn1 = {}),
        bt.asn1.ASN1Util = new function() {
            this.integerToByteHex = function(t) {
                var e = t.toString(16);
                return e.length % 2 == 1 && (e = "0" + e),
                e
            }
            ,
            this.bigIntToMinTwosComplementsHex = function(t) {
                var e = t.toString(16);
                if ("-" != e.substr(0, 1))
                    e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                    var r = e.substr(1)
                      , n = r.length;
                    n % 2 == 1 ? n += 1 : e.match(/^[0-7]/) || (n += 2);
                    for (var i = "", a = 0; a < n; a++)
                        i += "f";
                    var o = new P(i,16)
                      , f = o.xor(t).add(P.ONE);
                    e = f.toString(16).replace(/^-/, "")
                }
                return e
            }
            ,
            this.getPEMStringFromHex = function(t, e) {
                return hextopem(t, e)
            }
            ,
            this.newObject = function(t) {
                var e = bt
                  , r = e.asn1
                  , n = r.DERBoolean
                  , i = r.DERInteger
                  , a = r.DERBitString
                  , o = r.DEROctetString
                  , f = r.DERNull
                  , c = r.DERObjectIdentifier
                  , s = r.DEREnumerated
                  , u = r.DERUTF8String
                  , d = r.DERNumericString
                  , h = r.DERPrintableString
                  , l = r.DERTeletexString
                  , b = r.DERIA5String
                  , p = r.DERUTCTime
                  , v = r.DERGeneralizedTime
                  , g = r.DERSequence
                  , y = r.DERSet
                  , m = r.DERTaggedObject
                  , w = r.ASN1Util.newObject
                  , _ = Object.keys(t);
                if (1 != _.length)
                    throw "key of param shall be only one.";
                var S = _[0];
                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + S + ":"))
                    throw "undefined key: " + S;
                if ("bool" == S)
                    return new n(t[S]);
                if ("int" == S)
                    return new i(t[S]);
                if ("bitstr" == S)
                    return new a(t[S]);
                if ("octstr" == S)
                    return new o(t[S]);
                if ("null" == S)
                    return new f(t[S]);
                if ("oid" == S)
                    return new c(t[S]);
                if ("enum" == S)
                    return new s(t[S]);
                if ("utf8str" == S)
                    return new u(t[S]);
                if ("numstr" == S)
                    return new d(t[S]);
                if ("prnstr" == S)
                    return new h(t[S]);
                if ("telstr" == S)
                    return new l(t[S]);
                if ("ia5str" == S)
                    return new b(t[S]);
                if ("utctime" == S)
                    return new p(t[S]);
                if ("gentime" == S)
                    return new v(t[S]);
                if ("seq" == S) {
                    for (var O = t[S], x = [], A = 0; A < O.length; A++) {
                        var E = w(O[A]);
                        x.push(E)
                    }
                    return new g({
                        array: x
                    })
                }
                if ("set" == S) {
                    for (O = t[S],
                    x = [],
                    A = 0; A < O.length; A++) {
                        E = w(O[A]);
                        x.push(E)
                    }
                    return new y({
                        array: x
                    })
                }
                if ("tag" == S) {
                    var j = t[S];
                    if ("[object Array]" === Object.prototype.toString.call(j) && 3 == j.length) {
                        var R = w(j[2]);
                        return new m({
                            tag: j[0],
                            explicit: j[1],
                            obj: R
                        })
                    }
                    var T = {};
                    if (void 0 !== j.explicit && (T.explicit = j.explicit),
                    void 0 !== j.tag && (T.tag = j.tag),
                    void 0 === j.obj)
                        throw "obj shall be specified for 'tag'.";
                    return T.obj = w(j.obj),
                    new m(T)
                }
            }
            ,
            this.jsonToASN1HEX = function(t) {
                var e = this.newObject(t);
                return e.getEncodedHex()
            }
        }
        ,
        bt.asn1.ASN1Util.oidHexToInt = function(t) {
            for (var e = "", r = parseInt(t.substr(0, 2), 16), n = Math.floor(r / 40), i = r % 40, a = (e = n + "." + i,
            ""), o = 2; o < t.length; o += 2) {
                var f = parseInt(t.substr(o, 2), 16)
                  , c = ("00000000" + f.toString(2)).slice(-8);
                if (a += c.substr(1, 7),
                "0" == c.substr(0, 1)) {
                    var s = new P(a,2);
                    e = e + "." + s.toString(10),
                    a = ""
                }
            }
            return e
        }
        ,
        bt.asn1.ASN1Util.oidIntToHex = function(t) {
            var e = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            }
              , r = function(t) {
                var r = ""
                  , n = new P(t,10)
                  , i = n.toString(2)
                  , a = 7 - i.length % 7;
                7 == a && (a = 0);
                for (var o = "", f = 0; f < a; f++)
                    o += "0";
                i = o + i;
                for (f = 0; f < i.length - 1; f += 7) {
                    var c = i.substr(f, 7);
                    f != i.length - 7 && (c = "1" + c),
                    r += e(parseInt(c, 2))
                }
                return r
            };
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var n = ""
              , i = t.split(".")
              , a = 40 * parseInt(i[0]) + parseInt(i[1]);
            n += e(a),
            i.splice(0, 2);
            for (var o = 0; o < i.length; o++)
                n += r(i[o]);
            return n
        }
        ,
        bt.asn1.ASN1Object = function() {
            var t = "";
            this.getLengthHexFromValue = function() {
                if ("undefined" == typeof this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + t.length + ",v=" + this.hV;
                var e = this.hV.length / 2
                  , r = e.toString(16);
                if (r.length % 2 == 1 && (r = "0" + r),
                e < 128)
                    return r;
                var n = r.length / 2;
                if (n > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
                var i = 128 + n;
                return i.toString(16) + r
            }
            ,
            this.getEncodedHex = function() {
                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                this.hL = this.getLengthHexFromValue(),
                this.hTLV = this.hT + this.hL + this.hV,
                this.isModified = !1),
                this.hTLV
            }
            ,
            this.getValueHex = function() {
                return this.getEncodedHex(),
                this.hV
            }
            ,
            this.getFreshValueHex = function() {
                return ""
            }
        }
        ,
        bt.asn1.DERAbstractString = function(t) {
            bt.asn1.DERAbstractString.superclass.constructor.call(this);
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(this.s)
            }
            ,
            this.setStringHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof t && ("string" == typeof t ? this.setString(t) : "undefined" != typeof t["str"] ? this.setString(t["str"]) : "undefined" != typeof t["hex"] && this.setStringHex(t["hex"]))
        }
        ,
        lt.lang.extend(bt.asn1.DERAbstractString, bt.asn1.ASN1Object),
        bt.asn1.DERAbstractTime = function(t) {
            bt.asn1.DERAbstractTime.superclass.constructor.call(this);
            this.localDateToUTC = function(t) {
                utc = t.getTime() + 6e4 * t.getTimezoneOffset();
                var e = new Date(utc);
                return e
            }
            ,
            this.formatDate = function(t, e, r) {
                var n = this.zeroPadding
                  , i = this.localDateToUTC(t)
                  , a = String(i.getFullYear());
                "utc" == e && (a = a.substr(2, 2));
                var o = n(String(i.getMonth() + 1), 2)
                  , f = n(String(i.getDate()), 2)
                  , c = n(String(i.getHours()), 2)
                  , s = n(String(i.getMinutes()), 2)
                  , u = n(String(i.getSeconds()), 2)
                  , d = a + o + f + c + s + u;
                if (!0 === r) {
                    var h = i.getMilliseconds();
                    if (0 != h) {
                        var l = n(String(h), 3);
                        l = l.replace(/[0]+$/, ""),
                        d = d + "." + l
                    }
                }
                return d + "Z"
            }
            ,
            this.zeroPadding = function(t, e) {
                return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
            }
            ,
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(t)
            }
            ,
            this.setByDateValue = function(t, e, r, n, i, a) {
                var o = new Date(Date.UTC(t, e - 1, r, n, i, a, 0));
                this.setByDate(o)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
        }
        ,
        lt.lang.extend(bt.asn1.DERAbstractTime, bt.asn1.ASN1Object),
        bt.asn1.DERAbstractStructured = function(t) {
            bt.asn1.DERAbstractString.superclass.constructor.call(this);
            this.setByASN1ObjectArray = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array = t
            }
            ,
            this.appendASN1Object = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array.push(t)
            }
            ,
            this.asn1Array = new Array,
            "undefined" != typeof t && "undefined" != typeof t["array"] && (this.asn1Array = t["array"])
        }
        ,
        lt.lang.extend(bt.asn1.DERAbstractStructured, bt.asn1.ASN1Object),
        bt.asn1.DERBoolean = function() {
            bt.asn1.DERBoolean.superclass.constructor.call(this),
            this.hT = "01",
            this.hTLV = "0101ff"
        }
        ,
        lt.lang.extend(bt.asn1.DERBoolean, bt.asn1.ASN1Object),
        bt.asn1.DERInteger = function(t) {
            bt.asn1.DERInteger.superclass.constructor.call(this),
            this.hT = "02",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = bt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new P(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof t && ("undefined" != typeof t["bigint"] ? this.setByBigInteger(t["bigint"]) : "undefined" != typeof t["int"] ? this.setByInteger(t["int"]) : "number" == typeof t ? this.setByInteger(t) : "undefined" != typeof t["hex"] && this.setValueHex(t["hex"]))
        }
        ,
        lt.lang.extend(bt.asn1.DERInteger, bt.asn1.ASN1Object),
        bt.asn1.DERBitString = function(t) {
            if (void 0 !== t && "undefined" !== typeof t.obj) {
                var e = bt.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            bt.asn1.DERBitString.superclass.constructor.call(this),
            this.hT = "03",
            this.setHexValueIncludingUnusedBits = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = t
            }
            ,
            this.setUnusedBitsAndHexValue = function(t, e) {
                if (t < 0 || 7 < t)
                    throw "unused bits shall be from 0 to 7: u = " + t;
                var r = "0" + t;
                this.hTLV = null,
                this.isModified = !0,
                this.hV = r + e
            }
            ,
            this.setByBinaryString = function(t) {
                t = t.replace(/0+$/, "");
                var e = 8 - t.length % 8;
                8 == e && (e = 0);
                for (var r = 0; r <= e; r++)
                    t += "0";
                var n = "";
                for (r = 0; r < t.length - 1; r += 8) {
                    var i = t.substr(r, 8)
                      , a = parseInt(i, 2).toString(16);
                    1 == a.length && (a = "0" + a),
                    n += a
                }
                this.hTLV = null,
                this.isModified = !0,
                this.hV = "0" + e + n
            }
            ,
            this.setByBooleanArray = function(t) {
                for (var e = "", r = 0; r < t.length; r++)
                    1 == t[r] ? e += "1" : e += "0";
                this.setByBinaryString(e)
            }
            ,
            this.newFalseArray = function(t) {
                for (var e = new Array(t), r = 0; r < t; r++)
                    e[r] = !1;
                return e
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : "undefined" != typeof t["hex"] ? this.setHexValueIncludingUnusedBits(t["hex"]) : "undefined" != typeof t["bin"] ? this.setByBinaryString(t["bin"]) : "undefined" != typeof t["array"] && this.setByBooleanArray(t["array"]))
        }
        ,
        lt.lang.extend(bt.asn1.DERBitString, bt.asn1.ASN1Object),
        bt.asn1.DEROctetString = function(t) {
            if (void 0 !== t && "undefined" !== typeof t.obj) {
                var e = bt.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            bt.asn1.DEROctetString.superclass.constructor.call(this, t),
            this.hT = "04"
        }
        ,
        lt.lang.extend(bt.asn1.DEROctetString, bt.asn1.DERAbstractString),
        bt.asn1.DERNull = function() {
            bt.asn1.DERNull.superclass.constructor.call(this),
            this.hT = "05",
            this.hTLV = "0500"
        }
        ,
        lt.lang.extend(bt.asn1.DERNull, bt.asn1.ASN1Object),
        bt.asn1.DERObjectIdentifier = function(t) {
            var e = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            }
              , r = function(t) {
                var r = ""
                  , n = new P(t,10)
                  , i = n.toString(2)
                  , a = 7 - i.length % 7;
                7 == a && (a = 0);
                for (var o = "", f = 0; f < a; f++)
                    o += "0";
                i = o + i;
                for (f = 0; f < i.length - 1; f += 7) {
                    var c = i.substr(f, 7);
                    f != i.length - 7 && (c = "1" + c),
                    r += e(parseInt(c, 2))
                }
                return r
            };
            bt.asn1.DERObjectIdentifier.superclass.constructor.call(this),
            this.hT = "06",
            this.setValueHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.setValueOidString = function(t) {
                if (!t.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + t;
                var n = ""
                  , i = t.split(".")
                  , a = 40 * parseInt(i[0]) + parseInt(i[1]);
                n += e(a),
                i.splice(0, 2);
                for (var o = 0; o < i.length; o++)
                    n += r(i[o]);
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = n
            }
            ,
            this.setValueName = function(t) {
                var e = bt.asn1.x509.OID.name2oid(t);
                if ("" === e)
                    throw "DERObjectIdentifier oidName undefined: " + t;
                this.setValueOidString(e)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" === typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }
        ,
        lt.lang.extend(bt.asn1.DERObjectIdentifier, bt.asn1.ASN1Object),
        bt.asn1.DEREnumerated = function(t) {
            bt.asn1.DEREnumerated.superclass.constructor.call(this),
            this.hT = "0a",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = bt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new P(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof t && ("undefined" != typeof t["int"] ? this.setByInteger(t["int"]) : "number" == typeof t ? this.setByInteger(t) : "undefined" != typeof t["hex"] && this.setValueHex(t["hex"]))
        }
        ,
        lt.lang.extend(bt.asn1.DEREnumerated, bt.asn1.ASN1Object),
        bt.asn1.DERUTF8String = function(t) {
            bt.asn1.DERUTF8String.superclass.constructor.call(this, t),
            this.hT = "0c"
        }
        ,
        lt.lang.extend(bt.asn1.DERUTF8String, bt.asn1.DERAbstractString),
        bt.asn1.DERNumericString = function(t) {
            bt.asn1.DERNumericString.superclass.constructor.call(this, t),
            this.hT = "12"
        }
        ,
        lt.lang.extend(bt.asn1.DERNumericString, bt.asn1.DERAbstractString),
        bt.asn1.DERPrintableString = function(t) {
            bt.asn1.DERPrintableString.superclass.constructor.call(this, t),
            this.hT = "13"
        }
        ,
        lt.lang.extend(bt.asn1.DERPrintableString, bt.asn1.DERAbstractString),
        bt.asn1.DERTeletexString = function(t) {
            bt.asn1.DERTeletexString.superclass.constructor.call(this, t),
            this.hT = "14"
        }
        ,
        lt.lang.extend(bt.asn1.DERTeletexString, bt.asn1.DERAbstractString),
        bt.asn1.DERIA5String = function(t) {
            bt.asn1.DERIA5String.superclass.constructor.call(this, t),
            this.hT = "16"
        }
        ,
        lt.lang.extend(bt.asn1.DERIA5String, bt.asn1.DERAbstractString),
        bt.asn1.DERUTCTime = function(t) {
            bt.asn1.DERUTCTime.superclass.constructor.call(this, t),
            this.hT = "17",
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return "undefined" == typeof this.date && "undefined" == typeof this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }
        ,
        lt.lang.extend(bt.asn1.DERUTCTime, bt.asn1.DERAbstractTime),
        bt.asn1.DERGeneralizedTime = function(t) {
            bt.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
            this.hT = "18",
            this.withMillis = !1,
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
            !0 === t.millis && (this.withMillis = !0))
        }
        ,
        lt.lang.extend(bt.asn1.DERGeneralizedTime, bt.asn1.DERAbstractTime),
        bt.asn1.DERSequence = function(t) {
            bt.asn1.DERSequence.superclass.constructor.call(this, t),
            this.hT = "30",
            this.getFreshValueHex = function() {
                for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                    var r = this.asn1Array[e];
                    t += r.getEncodedHex()
                }
                return this.hV = t,
                this.hV
            }
        }
        ,
        lt.lang.extend(bt.asn1.DERSequence, bt.asn1.DERAbstractStructured),
        bt.asn1.DERSet = function(t) {
            bt.asn1.DERSet.superclass.constructor.call(this, t),
            this.hT = "31",
            this.sortFlag = !0,
            this.getFreshValueHex = function() {
                for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                    var r = this.asn1Array[e];
                    t.push(r.getEncodedHex())
                }
                return 1 == this.sortFlag && t.sort(),
                this.hV = t.join(""),
                this.hV
            }
            ,
            "undefined" != typeof t && "undefined" != typeof t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }
        ,
        lt.lang.extend(bt.asn1.DERSet, bt.asn1.DERAbstractStructured),
        bt.asn1.DERTaggedObject = function(t) {
            bt.asn1.DERTaggedObject.superclass.constructor.call(this),
            this.hT = "a0",
            this.hV = "",
            this.isExplicit = !0,
            this.asn1Object = null,
            this.setASN1Object = function(t, e, r) {
                this.hT = e,
                this.isExplicit = t,
                this.asn1Object = r,
                this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                this.hTLV = null,
                this.isModified = !0) : (this.hV = null,
                this.hTLV = r.getEncodedHex(),
                this.hTLV = this.hTLV.replace(/^../, e),
                this.isModified = !1)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof t && ("undefined" != typeof t["tag"] && (this.hT = t["tag"]),
            "undefined" != typeof t["explicit"] && (this.isExplicit = t["explicit"]),
            "undefined" != typeof t["obj"] && (this.asn1Object = t["obj"],
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        lt.lang.extend(bt.asn1.DERTaggedObject, bt.asn1.ASN1Object);
        var pt = function() {
            var t = function(e, r) {
                return t = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
                }
                ,
                t(e, r)
            };
            return function(e, r) {
                if ("function" !== typeof r && null !== r)
                    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                t(e, r),
                e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype,
                new n)
            }
        }()
          , vt = function(t) {
            function e(r) {
                var n = t.call(this) || this;
                return r && ("string" === typeof r ? n.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)),
                n
            }
            return pt(e, t),
            e.prototype.parseKey = function(t) {
                try {
                    var e = 0
                      , r = 0
                      , n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
                      , i = n.test(t) ? g.decode(t) : y.unarmor(t)
                      , a = j.decode(i);
                    if (3 === a.sub.length && (a = a.sub[2].sub[0]),
                    9 === a.sub.length) {
                        e = a.sub[1].getHexStringValue(),
                        this.n = F(e, 16),
                        r = a.sub[2].getHexStringValue(),
                        this.e = parseInt(r, 16);
                        var o = a.sub[3].getHexStringValue();
                        this.d = F(o, 16);
                        var f = a.sub[4].getHexStringValue();
                        this.p = F(f, 16);
                        var c = a.sub[5].getHexStringValue();
                        this.q = F(c, 16);
                        var s = a.sub[6].getHexStringValue();
                        this.dmp1 = F(s, 16);
                        var u = a.sub[7].getHexStringValue();
                        this.dmq1 = F(u, 16);
                        var d = a.sub[8].getHexStringValue();
                        this.coeff = F(d, 16)
                    } else {
                        if (2 !== a.sub.length)
                            return !1;
                        var h = a.sub[1]
                          , l = h.sub[0];
                        e = l.sub[0].getHexStringValue(),
                        this.n = F(e, 16),
                        r = l.sub[1].getHexStringValue(),
                        this.e = parseInt(r, 16)
                    }
                    return !0
                } catch (b) {
                    return !1
                }
            }
            ,
            e.prototype.getPrivateBaseKey = function() {
                var t = {
                    array: [new bt.asn1.DERInteger({
                        int: 0
                    }), new bt.asn1.DERInteger({
                        bigint: this.n
                    }), new bt.asn1.DERInteger({
                        int: this.e
                    }), new bt.asn1.DERInteger({
                        bigint: this.d
                    }), new bt.asn1.DERInteger({
                        bigint: this.p
                    }), new bt.asn1.DERInteger({
                        bigint: this.q
                    }), new bt.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new bt.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new bt.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                }
                  , e = new bt.asn1.DERSequence(t);
                return e.getEncodedHex()
            }
            ,
            e.prototype.getPrivateBaseKeyB64 = function() {
                return b(this.getPrivateBaseKey())
            }
            ,
            e.prototype.getPublicBaseKey = function() {
                var t = new bt.asn1.DERSequence({
                    array: [new bt.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new bt.asn1.DERNull]
                })
                  , e = new bt.asn1.DERSequence({
                    array: [new bt.asn1.DERInteger({
                        bigint: this.n
                    }), new bt.asn1.DERInteger({
                        int: this.e
                    })]
                })
                  , r = new bt.asn1.DERBitString({
                    hex: "00" + e.getEncodedHex()
                })
                  , n = new bt.asn1.DERSequence({
                    array: [t, r]
                });
                return n.getEncodedHex()
            }
            ,
            e.prototype.getPublicBaseKeyB64 = function() {
                return b(this.getPublicBaseKey())
            }
            ,
            e.wordwrap = function(t, e) {
                if (e = e || 64,
                !t)
                    return t;
                var r = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(r, "g")).join("\n")
            }
            ,
            e.prototype.getPrivateKey = function() {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                t += "-----END RSA PRIVATE KEY-----",
                t
            }
            ,
            e.prototype.getPublicKey = function() {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                t += "-----END PUBLIC KEY-----",
                t
            }
            ,
            e.hasPublicKeyProperty = function(t) {
                return t = t || {},
                t.hasOwnProperty("n") && t.hasOwnProperty("e")
            }
            ,
            e.hasPrivateKeyProperty = function(t) {
                return t = t || {},
                t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }
            ,
            e.prototype.parsePropertiesFrom = function(t) {
                this.n = t.n,
                this.e = t.e,
                t.hasOwnProperty("d") && (this.d = t.d,
                this.p = t.p,
                this.q = t.q,
                this.dmp1 = t.dmp1,
                this.dmq1 = t.dmq1,
                this.coeff = t.coeff)
            }
            ,
            e
        }(ct)
          , gt = r("a524")
          , yt = function() {
            function t(t) {
                t = t || {},
                this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024,
                this.default_public_exponent = t.default_public_exponent || "010001",
                this.log = t.log || !1,
                this.key = null
            }
            return t.prototype.setKey = function(t) {
                this.log && this.key && console.warn("A key was already set, overriding existing."),
                this.key = new vt(t)
            }
            ,
            t.prototype.setPrivateKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.setPublicKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.decrypt = function(t) {
                try {
                    return this.getKey().decrypt(p(t))
                } catch (e) {
                    return !1
                }
            }
            ,
            t.prototype.encrypt = function(t) {
                try {
                    return b(this.getKey().encrypt(t))
                } catch (e) {
                    return !1
                }
            }
            ,
            t.prototype.sign = function(t, e, r) {
                try {
                    return b(this.getKey().sign(t, e, r))
                } catch (n) {
                    return !1
                }
            }
            ,
            t.prototype.verify = function(t, e, r) {
                try {
                    return this.getKey().verify(t, p(e), r)
                } catch (n) {
                    return !1
                }
            }
            ,
            t.prototype.getKey = function(t) {
                if (!this.key) {
                    if (this.key = new vt,
                    t && "[object Function]" === {}.toString.call(t))
                        return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }
            ,
            t.prototype.getPrivateKey = function() {
                return this.getKey().getPrivateKey()
            }
            ,
            t.prototype.getPrivateKeyB64 = function() {
                return this.getKey().getPrivateBaseKeyB64()
            }
            ,
            t.prototype.getPublicKey = function() {
                return this.getKey().getPublicKey()
            }
            ,
            t.prototype.getPublicKeyB64 = function() {
                return this.getKey().getPublicBaseKeyB64()
            }
            ,
            t.version = gt.version,
            t
        }();
        e["a"] = yt
    },
    "a524": function(t) {
        t.exports = JSON.parse('{"version":"3.1.0"}')
    },

})
//调用jiami()传入明文就行  
// https://www.69pian6zz.com:9080/mkt_casino02   登陆password加密
function jiami(password) {
    pubkey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSu2AZPdT2Fqpqxctx3EbnRuuYdBxFZDYG7MASIgw/DFl3P9FAp7S9WaQjdM1NmgBDgvfUWx1xj72LNz4EP4Euh9EESKceNCeoE4M8ZP4ENUQX0nDMbpmIG3/JCI8B5Iv2FKj2q0gGbE0WsLdrYDzFXTYbZKRJSbMMjHT3HtKD/wIDAQAB";
    u = aaa('9816')
    var t = new u["a"];
    t.setPublicKey(pubkey);
    return t.encrypt(password)
}
