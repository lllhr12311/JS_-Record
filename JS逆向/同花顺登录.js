var dbits, canary = 244837814094590, j_lm = 15715070 == (canary & 16777215);
function BigInteger(b, a, c) {
    null != b && ("number" == typeof b ? this.fromNumber(b, a, c) : null == a && "string" != typeof b ? this.fromString(b, 256) : this.fromString(b, a))
}
function nbi() {
    return new BigInteger(null)
}
function am1(b, a, c, d, e, f) {
    for (; 0 <= --f; ) {
        var g = a * this[b++] + c[d] + e
          , e = Math.floor(g / 67108864);
        c[d++] = g & 67108863
    }
    return e
}
function am2(b, a, c, d, e, f) {
    for (var g = a & 32767, a = a >> 15; 0 <= --f; ) {
        var h = this[b] & 32767
          , i = this[b++] >> 15
          , k = a * h + i * g
          , h = g * h + ((k & 32767) << 15) + c[d] + (e & 1073741823)
          , e = (h >>> 30) + (k >>> 15) + a * i + (e >>> 30);
        c[d++] = h & 1073741823
    }
    return e
}
function am3(b, a, c, d, e, f) {
    for (var g = a & 16383, a = a >> 14; 0 <= --f; ) {
        var h = this[b] & 16383
          , i = this[b++] >> 14
          , k = a * h + i * g
          , h = g * h + ((k & 16383) << 14) + c[d] + e
          , e = (h >> 28) + (k >> 14) + a * i;
        c[d++] = h & 268435455
    }
    return e
}
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2,
dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1,
dbits = 26) : (BigInteger.prototype.am = am3,
dbits = 28);
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz", BI_RC = [], rr, vv;
rr = 48;
for (vv = 0; 9 >= vv; ++vv)
    BI_RC[rr++] = vv;
rr = 97;
for (vv = 10; 36 > vv; ++vv)
    BI_RC[rr++] = vv;
rr = 65;
for (vv = 10; 36 > vv; ++vv)
    BI_RC[rr++] = vv;
function int2char(b) {
    return BI_RM.charAt(b)
}
function intAt(b, a) {
    var c = BI_RC[b.charCodeAt(a)];
    return null == c ? -1 : c
}
function bnpCopyTo(b) {
    for (var a = this.t - 1; 0 <= a; --a)
        b[a] = this[a];
    b.t = this.t;
    b.s = this.s
}
function bnpFromInt(b) {
    this.t = 1;
    this.s = 0 > b ? -1 : 0;
    0 < b ? this[0] = b : -1 > b ? this[0] = b + this.DV : this.t = 0
}
function nbv(b) {
    var a = nbi();
    a.fromInt(b);
    return a
}
function bnpFromString(b, a) {
    var c;
    if (16 == a)
        c = 4;
    else if (8 == a)
        c = 3;
    else if (256 == a)
        c = 8;
    else if (2 == a)
        c = 1;
    else if (32 == a)
        c = 5;
    else if (4 == a)
        c = 2;
    else {
        this.fromRadix(b, a);
        return
    }
    this.s = this.t = 0;
    for (var d = b.length, e = !1, f = 0; 0 <= --d; ) {
        var g = 8 == c ? b[d] & 255 : intAt(b, d);
        0 > g ? "-" == b.charAt(d) && (e = !0) : (e = !1,
        0 == f ? this[this.t++] = g : f + c > this.DB ? (this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f,
        this[this.t++] = g >> this.DB - f) : this[this.t - 1] |= g << f,
        f += c,
        f >= this.DB && (f -= this.DB))
    }
    if (8 == c && 0 != (b[0] & 128))
        this.s = -1,
        0 < f && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f);
    this.clamp();
    e && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    for (var b = this.s & this.DM; 0 < this.t && this[this.t - 1] == b; )
        --this.t
}
function bnToString(b) {
    if (0 > this.s)
        return "-" + this.negate().toString(b);
    if (16 == b)
        b = 4;
    else if (8 == b)
        b = 3;
    else if (2 == b)
        b = 1;
    else if (32 == b)
        b = 5;
    else if (4 == b)
        b = 2;
    else
        return this.toRadix(b);
    var a = (1 << b) - 1, c, d = !1, e = "", f = this.t, g = this.DB - f * this.DB % b;
    if (0 < f--) {
        if (g < this.DB && 0 < (c = this[f] >> g))
            d = !0,
            e = int2char(c);
        for (; 0 <= f; )
            g < b ? (c = (this[f] & (1 << g) - 1) << b - g,
            c |= this[--f] >> (g += this.DB - b)) : (c = this[f] >> (g -= b) & a,
            0 >= g && (g += this.DB,
            --f)),
            0 < c && (d = !0),
            d && (e += int2char(c))
    }
    return d ? e : "0"
}
function bnNegate() {
    var b = nbi();
    BigInteger.ZERO.subTo(this, b);
    return b
}
function bnAbs() {
    return 0 > this.s ? this.negate() : this
}
function bnCompareTo(b) {
    var a = this.s - b.s;
    if (0 != a)
        return a;
    var c = this.t
      , a = c - b.t;
    if (0 != a)
        return 0 > this.s ? -a : a;
    for (; 0 <= --c; )
        if (0 != (a = this[c] - b[c]))
            return a;
    return 0
}
function nbits(b) {
    var a = 1, c;
    if (0 != (c = b >>> 16))
        b = c,
        a += 16;
    if (0 != (c = b >> 8))
        b = c,
        a += 8;
    if (0 != (c = b >> 4))
        b = c,
        a += 4;
    if (0 != (c = b >> 2))
        b = c,
        a += 2;
    0 != b >> 1 && (a += 1);
    return a
}
function bnBitLength() {
    return 0 >= this.t ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(b, a) {
    var c;
    for (c = this.t - 1; 0 <= c; --c)
        a[c + b] = this[c];
    for (c = b - 1; 0 <= c; --c)
        a[c] = 0;
    a.t = this.t + b;
    a.s = this.s
}
function bnpDRShiftTo(b, a) {
    for (var c = b; c < this.t; ++c)
        a[c - b] = this[c];
    a.t = Math.max(this.t - b, 0);
    a.s = this.s
}
function bnpLShiftTo(b, a) {
    var c = b % this.DB, d = this.DB - c, e = (1 << d) - 1, f = Math.floor(b / this.DB), g = this.s << c & this.DM, h;
    for (h = this.t - 1; 0 <= h; --h)
        a[h + f + 1] = this[h] >> d | g,
        g = (this[h] & e) << c;
    for (h = f - 1; 0 <= h; --h)
        a[h] = 0;
    a[f] = g;
    a.t = this.t + f + 1;
    a.s = this.s;
    a.clamp()
}
function bnpRShiftTo(b, a) {
    a.s = this.s;
    var c = Math.floor(b / this.DB);
    if (c >= this.t)
        a.t = 0;
    else {
        var d = b % this.DB
          , e = this.DB - d
          , f = (1 << d) - 1;
        a[0] = this[c] >> d;
        for (var g = c + 1; g < this.t; ++g)
            a[g - c - 1] |= (this[g] & f) << e,
            a[g - c] = this[g] >> d;
        0 < d && (a[this.t - c - 1] |= (this.s & f) << e);
        a.t = this.t - c;
        a.clamp()
    }
}
function bnpSubTo(b, a) {
    for (var c = 0, d = 0, e = Math.min(b.t, this.t); c < e; )
        d += this[c] - b[c],
        a[c++] = d & this.DM,
        d >>= this.DB;
    if (b.t < this.t) {
        for (d -= b.s; c < this.t; )
            d += this[c],
            a[c++] = d & this.DM,
            d >>= this.DB;
        d += this.s
    } else {
        for (d += this.s; c < b.t; )
            d -= b[c],
            a[c++] = d & this.DM,
            d >>= this.DB;
        d -= b.s
    }
    a.s = 0 > d ? -1 : 0;
    -1 > d ? a[c++] = this.DV + d : 0 < d && (a[c++] = d);
    a.t = c;
    a.clamp()
}
function bnpMultiplyTo(b, a) {
    var c = this.abs()
      , d = b.abs()
      , e = c.t;
    for (a.t = e + d.t; 0 <= --e; )
        a[e] = 0;
    for (e = 0; e < d.t; ++e)
        a[e + c.t] = c.am(0, d[e], a, e, 0, c.t);
    a.s = 0;
    a.clamp();
    this.s != b.s && BigInteger.ZERO.subTo(a, a)
}
function bnpSquareTo(b) {
    for (var a = this.abs(), c = b.t = 2 * a.t; 0 <= --c; )
        b[c] = 0;
    for (c = 0; c < a.t - 1; ++c) {
        var d = a.am(c, a[c], b, 2 * c, 0, 1);
        if ((b[c + a.t] += a.am(c + 1, 2 * a[c], b, 2 * c + 1, d, a.t - c - 1)) >= a.DV)
            b[c + a.t] -= a.DV,
            b[c + a.t + 1] = 1
    }
    0 < b.t && (b[b.t - 1] += a.am(c, a[c], b, 2 * c, 0, 1));
    b.s = 0;
    b.clamp()
}
function bnpDivRemTo(b, a, c) {
    var d = b.abs();
    if (!(0 >= d.t)) {
        var e = this.abs();
        if (e.t < d.t)
            null != a && a.fromInt(0),
            null != c && this.copyTo(c);
        else {
            null == c && (c = nbi());
            var f = nbi()
              , g = this.s
              , b = b.s
              , h = this.DB - nbits(d[d.t - 1]);
            0 < h ? (d.lShiftTo(h, f),
            e.lShiftTo(h, c)) : (d.copyTo(f),
            e.copyTo(c));
            d = f.t;
            e = f[d - 1];
            if (0 != e) {
                var i = e * (1 << this.F1) + (1 < d ? f[d - 2] >> this.F2 : 0)
                  , k = this.FV / i
                  , i = (1 << this.F1) / i
                  , o = 1 << this.F2
                  , l = c.t
                  , m = l - d
                  , j = null == a ? nbi() : a;
                f.dlShiftTo(m, j);
                0 <= c.compareTo(j) && (c[c.t++] = 1,
                c.subTo(j, c));
                BigInteger.ONE.dlShiftTo(d, j);
                for (j.subTo(f, f); f.t < d; )
                    f[f.t++] = 0;
                for (; 0 <= --m; ) {
                    var n = c[--l] == e ? this.DM : Math.floor(c[l] * k + (c[l - 1] + o) * i);
                    if ((c[l] += f.am(0, n, c, m, 0, d)) < n) {
                        f.dlShiftTo(m, j);
                        for (c.subTo(j, c); c[l] < --n; )
                            c.subTo(j, c)
                    }
                }
                null != a && (c.drShiftTo(d, a),
                g != b && BigInteger.ZERO.subTo(a, a));
                c.t = d;
                c.clamp();
                0 < h && c.rShiftTo(h, c);
                0 > g && BigInteger.ZERO.subTo(c, c)
            }
        }
    }
}
function bnMod(b) {
    var a = nbi();
    this.abs().divRemTo(b, null, a);
    0 > this.s && 0 < a.compareTo(BigInteger.ZERO) && b.subTo(a, a);
    return a
}
function Classic(b) {
    this.m = b
}
function cConvert(b) {
    return 0 > b.s || 0 <= b.compareTo(this.m) ? b.mod(this.m) : b
}
function cRevert(b) {
    return b
}
function cReduce(b) {
    b.divRemTo(this.m, null, b)
}
function cMulTo(b, a, c) {
    b.multiplyTo(a, c);
    this.reduce(c)
}
function cSqrTo(b, a) {
    b.squareTo(a);
    this.reduce(a)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
    if (1 > this.t)
        return 0;
    var b = this[0];
    if (0 == (b & 1))
        return 0;
    var a = b & 3
      , a = a * (2 - (b & 15) * a) & 15
      , a = a * (2 - (b & 255) * a) & 255
      , a = a * (2 - ((b & 65535) * a & 65535)) & 65535
      , a = a * (2 - b * a % this.DV) % this.DV;
    return 0 < a ? this.DV - a : -a
}
function Montgomery(b) {
    this.m = b;
    this.mp = b.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << b.DB - 15) - 1;
    this.mt2 = 2 * b.t
}
function montConvert(b) {
    var a = nbi();
    b.abs().dlShiftTo(this.m.t, a);
    a.divRemTo(this.m, null, a);
    0 > b.s && 0 < a.compareTo(BigInteger.ZERO) && this.m.subTo(a, a);
    return a
}
function montRevert(b) {
    var a = nbi();
    b.copyTo(a);
    this.reduce(a);
    return a
}
function montReduce(b) {
    for (; b.t <= this.mt2; )
        b[b.t++] = 0;
    for (var a = 0; a < this.m.t; ++a) {
        var c = b[a] & 32767
          , d = c * this.mpl + ((c * this.mph + (b[a] >> 15) * this.mpl & this.um) << 15) & b.DM
          , c = a + this.m.t;
        for (b[c] += this.m.am(0, d, b, a, 0, this.m.t); b[c] >= b.DV; )
            b[c] -= b.DV,
            b[++c]++
    }
    b.clamp();
    b.drShiftTo(this.m.t, b);
    0 <= b.compareTo(this.m) && b.subTo(this.m, b)
}
function montSqrTo(b, a) {
    b.squareTo(a);
    this.reduce(a)
}
function montMulTo(b, a, c) {
    b.multiplyTo(a, c);
    this.reduce(c)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
    return 0 == (0 < this.t ? this[0] & 1 : this.s)
}
function bnpExp(b, a) {
    if (4294967295 < b || 1 > b)
        return BigInteger.ONE;
    var c = nbi()
      , d = nbi()
      , e = a.convert(this)
      , f = nbits(b) - 1;
    for (e.copyTo(c); 0 <= --f; )
        if (a.sqrTo(c, d),
        0 < (b & 1 << f))
            a.mulTo(d, e, c);
        else
            var g = c
              , c = d
              , d = g;
    return a.revert(c)
}
function bnModPowInt(b, a) {
    var c;
    c = 256 > b || a.isEven() ? new Classic(a) : new Montgomery(a);
    return this.exp(b, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
function Arcfour() {
    this.j = this.i = 0;
    this.S = []
}
function ARC4init(b) {
    var a, c, d;
    for (a = 0; 256 > a; ++a)
        this.S[a] = a;
    for (a = c = 0; 256 > a; ++a)
        c = c + this.S[a] + b[a % b.length] & 255,
        d = this.S[a],
        this.S[a] = this.S[c],
        this.S[c] = d;
    this.j = this.i = 0
}
function ARC4next() {
    var b;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    b = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = b;
    return this.S[b + this.S[this.i] & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
    return new Arcfour
}
var rng_psize = 256, rng_state, rng_pool, rng_pptr;
function rng_seed_int(b) {
    rng_pool[rng_pptr++] ^= b & 255;
    rng_pool[rng_pptr++] ^= b >> 8 & 255;
    rng_pool[rng_pptr++] ^= b >> 16 & 255;
    rng_pool[rng_pptr++] ^= b >> 24 & 255;
    rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}
function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}
if (null == rng_pool) {
    rng_pool = [];
    rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        window.crypto.getRandomValues(ua);
        for (t = 0; 32 > t; ++t)
            rng_pool[rng_pptr++] = ua[t]
    }
    if ("Netscape" == navigator.appName && "5" > navigator.appVersion && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
    }
    for (; rng_pptr < rng_psize; )
        t = Math.floor(65536 * Math.random()),
        rng_pool[rng_pptr++] = t >>> 8,
        rng_pool[rng_pptr++] = t & 255;
    rng_pptr = 0;
    rng_seed_time()
}
function rng_get_byte() {
    if (null == rng_state) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(b) {
    var a;
    for (a = 0; a < b.length; ++a)
        b[a] = rng_get_byte()
}
function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
function parseBigInt(b, a) {
    return new BigInteger(b,a)
}
function linebrk(b, a) {
    for (var c = "", d = 0; d + a < b.length; )
        c += b.substring(d, d + a) + "\n",
        d += a;
    return c + b.substring(d, b.length)
}
function byte2Hex(b) {
    return 16 > b ? "0" + b.toString(16) : b.toString(16)
}
function pkcs1pad2(b, a) {
    if (a < b.length + 11)
        return alert("Message too long for RSA"),
        null;
    for (var c = [], d = b.length - 1; 0 <= d && 0 < a; ) {
        var e = b.charCodeAt(d--);
        128 > e ? c[--a] = e : 127 < e && 2048 > e ? (c[--a] = e & 63 | 128,
        c[--a] = e >> 6 | 192) : (c[--a] = e & 63 | 128,
        c[--a] = e >> 6 & 63 | 128,
        c[--a] = e >> 12 | 224)
    }
    c[--a] = 0;
    d = new SecureRandom;
    for (e = []; 2 < a; ) {
        for (e[0] = 0; 0 == e[0]; )
            d.nextBytes(e);
        c[--a] = e[0]
    }
    c[--a] = 2;
    c[--a] = 0;
    return new BigInteger(c)
}
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null
}
function RSASetPublic(b, a) {
    null != b && null != a && 0 < b.length && 0 < a.length ? (this.n = parseBigInt(b, 16),
    this.e = parseInt(a, 16)) : alert("Invalid RSA public key")
}
function RSADoPublic(b) {
    return b.modPowInt(this.e, this.n)
}
function RSAEncrypt(b) {
    b = pkcs1pad2(b, this.n.bitLength() + 7 >> 3);
    if (null == b)
        return null;
    b = this.doPublic(b);
    if (null == b)
        return null;
    b = b.toString(16);
    return 0 == (b.length & 1) ? b : "0" + b
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  , b64padchar = "=";
function hex2b64(b) {
    var a, c, d = "";
    for (a = 0; a + 3 <= b.length; a += 3)
        c = parseInt(b.substring(a, a + 3), 16),
        d += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    a + 1 == b.length ? (c = parseInt(b.substring(a, a + 1), 16),
    d += b64map.charAt(c << 2)) : a + 2 == b.length && (c = parseInt(b.substring(a, a + 2), 16),
    d += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4));
    for (; 0 < (d.length & 3); )
        d += b64padchar;
    return d
}
function b64tohex(b) {
    var a = "", c, d = 0, e;
    for (c = 0; c < b.length && !(b.charAt(c) == b64padchar); ++c) {
        v = b64map.indexOf(b.charAt(c));
        0 > v || (0 == d ? (a += int2char(v >> 2),
        e = v & 3,
        d = 1) : 1 == d ? (a += int2char(e << 2 | v >> 4),
        e = v & 15,
        d = 2) : 2 == d ? (a += int2char(e),
        a += int2char(v >> 2),
        e = v & 3,
        d = 3) : (a += int2char(e << 2 | v >> 4),
        a += int2char(v & 15),
        d = 0))
    }
    1 == d && (a += int2char(e << 2));
    return a
}
function b64toBA(b) {
    var b = b64tohex(b), a, c = [];
    for (a = 0; 2 * a < b.length; ++a)
        c[a] = parseInt(b.substring(2 * a, 2 * a + 2), 16);
    return c
}
var hexcase = 0
  , b64pad = ""
  , chrsz = 8;
function hex_md5(c) {
    return binl2hex(core_md5(str2binl(c), c.length * chrsz))
}
function b64_md5(c) {
    return binl2b64(core_md5(str2binl(c), c.length * chrsz))
}
function str_md5(c) {
    return binl2str(core_md5(str2binl(c), c.length * chrsz))
}
function hex_hmac_md5(c, g) {
    return binl2hex(core_hmac_md5(c, g))
}
function b64_hmac_md5(c, g) {
    return binl2b64(core_hmac_md5(c, g))
}
function str_hmac_md5(c, g) {
    return binl2str(core_hmac_md5(c, g))
}
function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}
function core_md5(c, g) {
    c[g >> 5] |= 128 << g % 32;
    c[(g + 64 >>> 9 << 4) + 14] = g;
    for (var a = 1732584193, b = -271733879, d = -1732584194, e = 271733878, f = 0; f < c.length; f += 16)
        var h = a
          , i = b
          , j = d
          , k = e
          , a = md5_ff(a, b, d, e, c[f + 0], 7, -680876936)
          , e = md5_ff(e, a, b, d, c[f + 1], 12, -389564586)
          , d = md5_ff(d, e, a, b, c[f + 2], 17, 606105819)
          , b = md5_ff(b, d, e, a, c[f + 3], 22, -1044525330)
          , a = md5_ff(a, b, d, e, c[f + 4], 7, -176418897)
          , e = md5_ff(e, a, b, d, c[f + 5], 12, 1200080426)
          , d = md5_ff(d, e, a, b, c[f + 6], 17, -1473231341)
          , b = md5_ff(b, d, e, a, c[f + 7], 22, -45705983)
          , a = md5_ff(a, b, d, e, c[f + 8], 7, 1770035416)
          , e = md5_ff(e, a, b, d, c[f + 9], 12, -1958414417)
          , d = md5_ff(d, e, a, b, c[f + 10], 17, -42063)
          , b = md5_ff(b, d, e, a, c[f + 11], 22, -1990404162)
          , a = md5_ff(a, b, d, e, c[f + 12], 7, 1804603682)
          , e = md5_ff(e, a, b, d, c[f + 13], 12, -40341101)
          , d = md5_ff(d, e, a, b, c[f + 14], 17, -1502002290)
          , b = md5_ff(b, d, e, a, c[f + 15], 22, 1236535329)
          , a = md5_gg(a, b, d, e, c[f + 1], 5, -165796510)
          , e = md5_gg(e, a, b, d, c[f + 6], 9, -1069501632)
          , d = md5_gg(d, e, a, b, c[f + 11], 14, 643717713)
          , b = md5_gg(b, d, e, a, c[f + 0], 20, -373897302)
          , a = md5_gg(a, b, d, e, c[f + 5], 5, -701558691)
          , e = md5_gg(e, a, b, d, c[f + 10], 9, 38016083)
          , d = md5_gg(d, e, a, b, c[f + 15], 14, -660478335)
          , b = md5_gg(b, d, e, a, c[f + 4], 20, -405537848)
          , a = md5_gg(a, b, d, e, c[f + 9], 5, 568446438)
          , e = md5_gg(e, a, b, d, c[f + 14], 9, -1019803690)
          , d = md5_gg(d, e, a, b, c[f + 3], 14, -187363961)
          , b = md5_gg(b, d, e, a, c[f + 8], 20, 1163531501)
          , a = md5_gg(a, b, d, e, c[f + 13], 5, -1444681467)
          , e = md5_gg(e, a, b, d, c[f + 2], 9, -51403784)
          , d = md5_gg(d, e, a, b, c[f + 7], 14, 1735328473)
          , b = md5_gg(b, d, e, a, c[f + 12], 20, -1926607734)
          , a = md5_hh(a, b, d, e, c[f + 5], 4, -378558)
          , e = md5_hh(e, a, b, d, c[f + 8], 11, -2022574463)
          , d = md5_hh(d, e, a, b, c[f + 11], 16, 1839030562)
          , b = md5_hh(b, d, e, a, c[f + 14], 23, -35309556)
          , a = md5_hh(a, b, d, e, c[f + 1], 4, -1530992060)
          , e = md5_hh(e, a, b, d, c[f + 4], 11, 1272893353)
          , d = md5_hh(d, e, a, b, c[f + 7], 16, -155497632)
          , b = md5_hh(b, d, e, a, c[f + 10], 23, -1094730640)
          , a = md5_hh(a, b, d, e, c[f + 13], 4, 681279174)
          , e = md5_hh(e, a, b, d, c[f + 0], 11, -358537222)
          , d = md5_hh(d, e, a, b, c[f + 3], 16, -722521979)
          , b = md5_hh(b, d, e, a, c[f + 6], 23, 76029189)
          , a = md5_hh(a, b, d, e, c[f + 9], 4, -640364487)
          , e = md5_hh(e, a, b, d, c[f + 12], 11, -421815835)
          , d = md5_hh(d, e, a, b, c[f + 15], 16, 530742520)
          , b = md5_hh(b, d, e, a, c[f + 2], 23, -995338651)
          , a = md5_ii(a, b, d, e, c[f + 0], 6, -198630844)
          , e = md5_ii(e, a, b, d, c[f + 7], 10, 1126891415)
          , d = md5_ii(d, e, a, b, c[f + 14], 15, -1416354905)
          , b = md5_ii(b, d, e, a, c[f + 5], 21, -57434055)
          , a = md5_ii(a, b, d, e, c[f + 12], 6, 1700485571)
          , e = md5_ii(e, a, b, d, c[f + 3], 10, -1894986606)
          , d = md5_ii(d, e, a, b, c[f + 10], 15, -1051523)
          , b = md5_ii(b, d, e, a, c[f + 1], 21, -2054922799)
          , a = md5_ii(a, b, d, e, c[f + 8], 6, 1873313359)
          , e = md5_ii(e, a, b, d, c[f + 15], 10, -30611744)
          , d = md5_ii(d, e, a, b, c[f + 6], 15, -1560198380)
          , b = md5_ii(b, d, e, a, c[f + 13], 21, 1309151649)
          , a = md5_ii(a, b, d, e, c[f + 4], 6, -145523070)
          , e = md5_ii(e, a, b, d, c[f + 11], 10, -1120210379)
          , d = md5_ii(d, e, a, b, c[f + 2], 15, 718787259)
          , b = md5_ii(b, d, e, a, c[f + 9], 21, -343485551)
          , a = safe_add(a, h)
          , b = safe_add(b, i)
          , d = safe_add(d, j)
          , e = safe_add(e, k);
    return [a, b, d, e]
}
function md5_cmn(c, g, a, b, d, e) {
    return safe_add(bit_rol(safe_add(safe_add(g, c), safe_add(b, e)), d), a)
}
function md5_ff(c, g, a, b, d, e, f) {
    return md5_cmn(g & a | ~g & b, c, g, d, e, f)
}
function md5_gg(c, g, a, b, d, e, f) {
    return md5_cmn(g & b | a & ~b, c, g, d, e, f)
}
function md5_hh(c, g, a, b, d, e, f) {
    return md5_cmn(g ^ a ^ b, c, g, d, e, f)
}
function md5_ii(c, g, a, b, d, e, f) {
    return md5_cmn(a ^ (g | ~b), c, g, d, e, f)
}
function core_hmac_md5(c, g) {
    var a = str2binl(c);
    16 < a.length && (a = core_md5(a, c.length * chrsz));
    for (var b = Array(16), d = Array(16), e = 0; 16 > e; e++)
        b[e] = a[e] ^ 909522486,
        d[e] = a[e] ^ 1549556828;
    a = core_md5(b.concat(str2binl(g)), 512 + g.length * chrsz);
    return core_md5(d.concat(a), 640)
}
function safe_add(c, g) {
    var a = (c & 65535) + (g & 65535);
    return (c >> 16) + (g >> 16) + (a >> 16) << 16 | a & 65535
}
function bit_rol(c, g) {
    return c << g | c >>> 32 - g
}
function str2binl(c) {
    for (var g = [], a = (1 << chrsz) - 1, b = 0; b < c.length * chrsz; b += chrsz)
        g[b >> 5] |= (c.charCodeAt(b / chrsz) & a) << b % 32;
    return g
}
function binl2str(c) {
    for (var g = "", a = (1 << chrsz) - 1, b = 0; b < 32 * c.length; b += chrsz)
        g += String.fromCharCode(c[b >> 5] >>> b % 32 & a);
    return g
}
function binl2hex(c) {
    for (var g = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", a = "", b = 0; b < 4 * c.length; b++)
        a += g.charAt(c[b >> 2] >> 8 * (b % 4) + 4 & 15) + g.charAt(c[b >> 2] >> 8 * (b % 4) & 15);
    return a
}
function binl2b64(c) {
    for (var g = "", a = 0; a < 4 * c.length; a += 3)
        for (var b = (c[a >> 2] >> 8 * (a % 4) & 255) << 16 | (c[a + 1 >> 2] >> 8 * ((a + 1) % 4) & 255) << 8 | c[a + 2 >> 2] >> 8 * ((a + 2) % 4) & 255, d = 0; 4 > d; d++)
            g = 8 * a + 6 * d > 32 * c.length ? g + b64pad : g + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b >> 6 * (3 - d) & 63);
    return g
}
;
function encrypt(b) {
    var c = "10001"
      , a = "CB99A3A4891FFECEDD94F455C5C486B936D0A37247D750D299D66A711F5F7C1EF8C17EAFD2E1552081DFFD1F78966593D81A499B802B18B0D76EF1D74F217E3FD98E8E05A906245BEDD810557DFB8F653118E59293A08C1E51DDCFA2CC13251A5BE301B080A0C93A587CB71BAED18AEF9F1E27DA6877AFED6BC5649DB12DD021";
    var d;
    d = new RSAKey;
    d.setPublic(a, c);
    b = d.encrypt(b);
    return hex2b64(b)
}

function jiami(uname, pwd) {
    let aaa = {
        username: encrypt(uname),
        password: encrypt(hex_md5(pwd))
    };
    return aaa;
}
