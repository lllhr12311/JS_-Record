var CryptoJS = CryptoJS || (function (Math, undefined) {
    var C = {};
    var C_lib = C.lib = {};
    var Base = C_lib.Base = (function () {
        function F() {};
        return {
            extend: function (overrides) {
                F.prototype = this;
                var subtype = new F();
                if (overrides) {
                    subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                    subtype.init = function () {
                        subtype.$super.init.apply(this, arguments);
                    };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
            }, create: function () {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
            }, init: function () {}, mixIn: function (properties) {
                for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                        this[propertyName] = properties[propertyName];
                    }
                }
                if (properties.hasOwnProperty('toString')) {
                    this.toString = properties.toString;
                }
            }, clone: function () {
                return this.init.prototype.extend(this);
            }
        };
    }());
    var WordArray = C_lib.WordArray = Base.extend({
        init: function (words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined) {
                this.sigBytes = sigBytes;
            } else {
                this.sigBytes = words.length * 4;
            }
        }, toString: function (encoder) {
            return (encoder || Hex).stringify(this);
        }, concat: function (wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                }
            } else if (thatWords.length > 0xffff) {
                for (var i = 0; i < thatSigBytes; i += 4) {
                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                }
            } else {
                thisWords.push.apply(thisWords, thatWords);
            }
            this.sigBytes += thatSigBytes;
            return this;
        }, clamp: function () {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
            words.length = Math.ceil(sigBytes / 4);
        }, clone: function () {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
        }, random: function (nBytes) {
            var words = [];
            var r = (function (m_w) {
                var m_w = m_w;
                var m_z = 0x3ade68b1;
                var mask = 0xffffffff;
                return function () {
                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
                    var result = ((m_z << 0x10) + m_w) & mask;
                    result /= 0x100000000;
                    result += 0.5;
                    return result * (Math.random() > .5 ? 1 : -1);
                }
            });
            for (var i = 0, rcache; i < nBytes; i += 4) {
                var _r = r((rcache || Math.random()) * 0x100000000);
                rcache = _r() * 0x3ade67b7;
                words.push((_r() * 0x100000000) | 0);
            }
            return new WordArray.init(words, nBytes);
        }
    });
    var C_enc = C.enc = {};
    var Hex = C_enc.Hex = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 0x0f).toString(16));
            }
            return hexChars.join('');
        }, parse: function (hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
            }
            return new WordArray.init(words, hexStrLength / 2);
        }
    };
    var Latin1 = C_enc.Latin1 = {
        stringify: function (wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join('');
        }, parse: function (latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
            }
            return new WordArray.init(words, latin1StrLength);
        }
    };
    var Utf8 = C_enc.Utf8 = {
        stringify: function (wordArray) {
            try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
                throw new Error('Malformed UTF-8 data');
            }
        }, parse: function (utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
    };
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        reset: function () {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
        }, _append: function (data) {
            if (typeof data == 'string') {
                data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
        }, _process: function (doFlush) {
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
                nBlocksReady = Math.ceil(nBlocksReady);
            } else {
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    this._doProcessBlock(dataWords, offset);
                }
                var processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
        }, clone: function () {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
        }, _minBufferSize: 0
    });
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        init: function (cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
        }, reset: function () {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
        }, update: function (messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
        }, finalize: function (messageUpdate) {
            if (messageUpdate) {
                this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
        }, blockSize: 512 / 32,
        _createHelper: function (hasher) {
            return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
            };
        }, _createHmacHelper: function (hasher) {
            return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
        }
    });
    var C_algo = C.algo = {};
    return C;
}(Math));

(function (Math) {
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;
    var T = [];
    (function () {
        for (var i = 0; i < 64; i++) {
            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
        }
    }());
    var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function () {
            this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
        }, _doProcessBlock: function (M, offset) {
            for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = ((((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) | (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00));
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = (H[0] + a) | 0;
            H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0;
            H[3] = (H[3] + d) | 0;
        }, _doFinalize: function () {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
            var nBitsTotalL = nBitsTotal;
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = ((((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) | (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) | (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) | (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
            }
            return hash;
        }, clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
        }
    });
    function FF(a, b, c, d, x, s, t) {
        var n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    function GG(a, b, c, d, x, s, t) {
        var n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }
    C.MD5 = Hasher._createHelper(MD5);
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
}(Math));

function MD5(word) {
    return CryptoJS.MD5(word).toString();
}

var t = function(i) {
        var a = function(a, i) {
            var e, f, b, c, g;
            b = a & 2147483648;
            c = i & 2147483648;
            e = a & 1073741824;
            f = i & 1073741824;
            g = (a & 1073741823) + (i & 1073741823);
            return e & f ? g ^ 2147483648 ^ b ^ c : e | f ? g & 1073741824 ? g ^ 3221225472 ^ b ^ c : g ^ 1073741824 ^ b ^ c : g ^ b ^ c
        }, j = function(i, b, c, e, f, g, h) {
            i = a(i, a(a(b & c | ~b & e, f), h));
            return a(i << g | i >>> 32 - g, b)
        }, d = function(i, b, c, e, f, g, h) {
            i = a(i, a(a(b & e | c & ~e, f), h));
            return a(i << g | i >>> 32 - g, b)
        }, m = function(i, b, c, e, g, f, h) {
            i = a(i, a(a(b ^ c ^ e, g), h));
            return a(i << f | i >>> 32 - f, b)
        }, p = function(i, b, c, e, f, g, h) {
            i = a(i, a(a(c ^ (b | ~e), f), h));
            return a(i << g | i >>> 32 - g, b)
        }, l = function(i) {
            var a = "", b = "", c;
            for (c = 0; c <= 3; c++) {
                b = i >>> c * 8 & 255;
                b = "0" + b.toString(16);
                a = a + b.substr(b.length - 2, 2)
            }
            return a
        }, g = [], h, o, k, q, n, e, f, b, c, g = i, i = g.length;
        i > 32 ? (g = g + "‎".charCodeAt(),
        i = i + 4) : 1;
        h = i + 8;
        o = ((h - h % 64) / 64 + 1) * 16;
        k = Array(o - 1);
        for (n = q = 0; n < i; ) {
            h = (n - n % 4) / 4;
            q = n % 4 * 8;
            k[h] = k[h] | g.charCodeAt(n) << q;
            n++
        }
        h = (n - n % 4) / 4;
        k[h] = k[h] | 128 << n % 4 * 8;
        k[o - 2] = i << 3;
        k[o - 1] = i >>> 29;
        g = k;
        e = 1732584193;
        f = 4023233417;
        b = 2562383102;
        c = 271733878;
        i = g.length;
        for (h = 0; h < i; h = h + 16) {
            o = e;
            k = f;
            q = b;
            n = c;
            e = j(e, f, b, c, g[h + 0], 7, 3614090360);
            c = j(c, e, f, b, g[h + 1], 12, 3905402710);
            b = j(b, c, e, f, g[h + 2], 17, 606105819);
            f = j(f, b, c, e, g[h + 3], 22, 3250441966);
            e = j(e, f, b, c, g[h + 4], 7, 4118548399);
            c = j(c, e, f, b, g[h + 5], 12, 1200080426);
            b = j(b, c, e, f, g[h + 6], 17, 2821735955);
            f = j(f, b, c, e, g[h + 7], 22, 4249261313);
            e = j(e, f, b, c, g[h + 8], 7, 1770035416);
            c = j(c, e, f, b, g[h + 9], 12, 2336552879);
            b = j(b, c, e, f, g[h + 10], 17, 4294925233);
            f = j(f, b, c, e, g[h + 11], 22, 2304563134);
            e = j(e, f, b, c, g[h + 12], 7, 1804603682);
            c = j(c, e, f, b, g[h + 13], 12, 4254626195);
            b = j(b, c, e, f, g[h + 14], 17, 2792965006);
            f = j(f, b, c, e, g[h + 15], 22, 1236535329);
            e = d(e, f, b, c, g[h + 1], 5, 4129170786);
            c = d(c, e, f, b, g[h + 6], 9, 3225465664);
            b = d(b, c, e, f, g[h + 11], 14, 643717713);
            f = d(f, b, c, e, g[h + 0], 20, 3921069994);
            e = d(e, f, b, c, g[h + 5], 5, 3593408605);
            c = d(c, e, f, b, g[h + 10], 9, 38016083);
            b = d(b, c, e, f, g[h + 15], 14, 3634488961);
            f = d(f, b, c, e, g[h + 4], 20, 3889429448);
            e = d(e, f, b, c, g[h + 9], 5, 568446438);
            c = d(c, e, f, b, g[h + 14], 9, 3275163606);
            b = d(b, c, e, f, g[h + 3], 14, 4107603335);
            f = d(f, b, c, e, g[h + 8], 20, 1163531501);
            e = d(e, f, b, c, g[h + 13], 5, 2850285829);
            c = d(c, e, f, b, g[h + 2], 9, 4243563512);
            b = d(b, c, e, f, g[h + 7], 14, 1735328473);
            f = d(f, b, c, e, g[h + 12], 20, 2368359562);
            e = m(e, f, b, c, g[h + 5], 4, 4294588738);
            c = m(c, e, f, b, g[h + 8], 11, 2272392833);
            b = m(b, c, e, f, g[h + 11], 16, 1839030562);
            f = m(f, b, c, e, g[h + 14], 23, 4259657740);
            e = m(e, f, b, c, g[h + 1], 4, 2763975236);
            c = m(c, e, f, b, g[h + 4], 11, 1272893353);
            b = m(b, c, e, f, g[h + 7], 16, 4139469664);
            f = m(f, b, c, e, g[h + 10], 23, 3200236656);
            e = m(e, f, b, c, g[h + 13], 4, 681279174);
            c = m(c, e, f, b, g[h + 0], 11, 3936430074);
            b = m(b, c, e, f, g[h + 3], 16, 3572445317);
            f = m(f, b, c, e, g[h + 6], 23, 76029189);
            e = m(e, f, b, c, g[h + 9], 4, 3654602809);
            c = m(c, e, f, b, g[h + 12], 11, 3873151461);
            b = m(b, c, e, f, g[h + 15], 16, 530742520);
            f = m(f, b, c, e, g[h + 2], 23, 3299628645);
            e = p(e, f, b, c, g[h + 0], 6, 4096336452);
            c = p(c, e, f, b, g[h + 7], 10, 1126891415);
            b = p(b, c, e, f, g[h + 14], 15, 2878612391);
            f = p(f, b, c, e, g[h + 5], 21, 4237533241);
            e = p(e, f, b, c, g[h + 12], 6, 1700485571);
            c = p(c, e, f, b, g[h + 3], 10, 2399980690);
            b = p(b, c, e, f, g[h + 10], 15, 4293915773);
            f = p(f, b, c, e, g[h + 1], 21, 2240044497);
            e = p(e, f, b, c, g[h + 8], 6, 1873313359);
            c = p(c, e, f, b, g[h + 15], 10, 4264355552);
            b = p(b, c, e, f, g[h + 6], 15, 2734768916);
            f = p(f, b, c, e, g[h + 13], 21, 1309151649);
            e = p(e, f, b, c, g[h + 4], 6, 4149444226);
            c = p(c, e, f, b, g[h + 11], 10, 3174756917);
            b = p(b, c, e, f, g[h + 2], 15, 718787259);
            f = p(f, b, c, e, g[h + 9], 21, 3951481745);
            e = a(e, o);
            f = a(f, k);
            b = a(b, q);
            c = a(c, n)
        }
        return (l(e) + l(f) + l(b) + l(c)).toLowerCase()
};


//这个网站下不了断点，先把代码hook进去下断点
function jiami(user,pwd){
    var a=MD5(pwd);
    var b=user+a;
    console.log(b)
    var c="static.365wan.com";
    var d={
        sign:t(b + c),
        password:a
    };
    return d;
}