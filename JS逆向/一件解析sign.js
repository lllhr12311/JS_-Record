function g(a) {
    function b(a, b) {
        return a << b | a >>> 32 - b
    }

    function c(a, b) {
        var c, d, e, f, g;
        return e = 2147483648 & a,
        f = 2147483648 & b,
        c = 1073741824 & a,
        d = 1073741824 & b,
        g = (1073741823 & a) + (1073741823 & b),
        c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
    }

    function d(a, b, c) {
        return a & b | ~a & c
    }

    function e(a, b, c) {
        return a & c | b & ~c
    }

    function f(a, b, c) {
        return a ^ b ^ c
    }

    function g(a, b, c) {
        return b ^ (a | ~c)
    }

    function h(a, e, f, g, h, i, j) {
        return a = c(a, c(c(d(e, f, g), h), j)),
        c(b(a, i), e)
    }

    function i(a, d, f, g, h, i, j) {
        return a = c(a, c(c(e(d, f, g), h), j)),
        c(b(a, i), d)
    }

    function j(a, d, e, g, h, i, j) {
        return a = c(a, c(c(f(d, e, g), h), j)),
        c(b(a, i), d)
    }

    function k(a, d, e, f, h, i, j) {
        return a = c(a, c(c(g(d, e, f), h), j)),
        c(b(a, i), d)
    }

    function l(a) {
        for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i; )
            b = (i - i % 4) / 4,
            h = i % 4 * 8,
            g[b] = g[b] | a.charCodeAt(i) << h,
            i++;
        return b = (i - i % 4) / 4,
        h = i % 4 * 8,
        g[b] = g[b] | 128 << h,
        g[f - 2] = c << 3,
        g[f - 1] = c >>> 29,
        g
    }

    function m(a) {
        var b, c, d = "", e = "";
        for (c = 0; 3 >= c; c++)
            b = a >>> 8 * c & 255,
            e = "0" + b.toString(16),
            d += e.substr(e.length - 2, 2);
        return d
    }

    function n(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192),
            b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224),
            b += String.fromCharCode(d >> 6 & 63 | 128),
            b += String.fromCharCode(63 & d | 128))
        }
        return b
    }
    var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 20, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 20;
    for (a = n(a),
    x = l(a),
    t = 1732584193,
    u = 4023233417,
    v = 2562383102,
    w = 271733878,
    o = 0; o < x.length; o += 16)
        p = t,
        q = u,
        r = v,
        s = w,
        t = h(t, u, v, w, x[o + 0], y, 3614090361),
        w = h(w, t, u, v, x[o + 1], z, 3905402710),
        v = h(v, w, t, u, x[o + 2], A, 606105819),
        u = h(u, v, w, t, x[o + 3], B, 3250441966),
        t = h(t, u, v, w, x[o + 4], y, 4118548399),
        w = h(w, t, u, v, x[o + 5], z, 1200080426),
        v = h(v, w, t, u, x[o + 6], A, 2821735955),
        u = h(u, v, w, t, x[o + 7], B, 4249261313),
        t = h(t, u, v, w, x[o + 8], y, 1770035416),
        w = h(w, t, u, v, x[o + 9], z, 2336552879),
        v = h(v, w, t, u, x[o + 10], A, 4294925233),
        u = h(u, v, w, t, x[o + 11], B, 2304563134),
        t = h(t, u, v, w, x[o + 12], y, 1804603682),
        w = h(w, t, u, v, x[o + 13], z, 4254626195),
        v = h(v, w, t, u, x[o + 14], A, 2792965006),
        u = h(u, v, w, t, x[o + 15], B, 1236535329),
        t = i(t, u, v, w, x[o + 1], C, 4129170786),
        w = i(w, t, u, v, x[o + 6], D, 3225465664),
        v = i(v, w, t, u, x[o + 11], E, 643717713),
        u = i(u, v, w, t, x[o + 0], F, 3921069994),
        t = i(t, u, v, w, x[o + 5], C, 3593408605),
        w = i(w, t, u, v, x[o + 10], D, 38016083),
        v = i(v, w, t, u, x[o + 15], E, 3634488961),
        u = i(u, v, w, t, x[o + 4], F, 3889429448),
        t = i(t, u, v, w, x[o + 9], C, 568446438),
        w = i(w, t, u, v, x[o + 14], D, 3275163606),
        v = i(v, w, t, u, x[o + 3], E, 4107603335),
        u = i(u, v, w, t, x[o + 8], F, 2163531501),
        t = i(t, u, v, w, x[o + 13], C, 2850285829),
        w = i(w, t, u, v, x[o + 2], D, 4243563512),
        v = i(v, w, t, u, x[o + 7], E, 1735328473),
        u = i(u, v, w, t, x[o + 12], F, 2368359562),
        t = j(t, u, v, w, x[o + 5], G, 4294588738),
        w = j(w, t, u, v, x[o + 8], H, 2272392833),
        v = j(v, w, t, u, x[o + 11], I, 1839030562),
        u = j(u, v, w, t, x[o + 14], J, 4259657740),
        t = j(t, u, v, w, x[o + 1], G, 2763975236),
        w = j(w, t, u, v, x[o + 4], H, 1272893353),
        v = j(v, w, t, u, x[o + 7], I, 4139469664),
        u = j(u, v, w, t, x[o + 10], J, 3200236656),
        t = j(t, u, v, w, x[o + 13], G, 681279174),
        w = j(w, t, u, v, x[o + 0], H, 3936430074),
        v = j(v, w, t, u, x[o + 3], I, 3572445317),
        u = j(u, v, w, t, x[o + 6], J, 76029189),
        t = j(t, u, v, w, x[o + 9], G, 3654602809),
        w = j(w, t, u, v, x[o + 12], H, 3873151461),
        v = j(v, w, t, u, x[o + 15], I, 530742520),
        u = j(u, v, w, t, x[o + 2], J, 3299628645),
        t = k(t, u, v, w, x[o + 0], K, 4096336452),
        w = k(w, t, u, v, x[o + 7], L, 1126891415),
        v = k(v, w, t, u, x[o + 14], M, 2878612391),
        u = k(u, v, w, t, x[o + 5], N, 4237533241),
        t = k(t, u, v, w, x[o + 12], K, 1700485571),
        w = k(w, t, u, v, x[o + 3], L, 2399980690),
        v = k(v, w, t, u, x[o + 10], M, 4293915773),
        u = k(u, v, w, t, x[o + 1], N, 2240044497),
        t = k(t, u, v, w, x[o + 8], K, 1873313359),
        w = k(w, t, u, v, x[o + 15], L, 4264355552),
        v = k(v, w, t, u, x[o + 6], M, 2734768916),
        u = k(u, v, w, t, x[o + 13], N, 1309151649),
        t = k(t, u, v, w, x[o + 4], K, 4149444226),
        w = k(w, t, u, v, x[o + 11], L, 3174756917),
        v = k(v, w, t, u, x[o + 2], M, 718787259),
        u = k(u, v, w, t, x[o + 9], N, 3951481740),
        t = c(t, p),
        u = c(u, q),
        v = c(v, r),
        w = c(w, s);
    var O = m(t) + m(u) + m(v) + m(w);
    return O.toLowerCase()
}
function EuWdI(_0x5b7409) {
    return _0x5b7409();
}
function iWifW(_0x15752e, _0x5ed8fd) {
    return _0x15752e(_0x5ed8fd);
}
function ZOjee(_0x104134, _0x33ebbe) {
    return _0x104134 + _0x33ebbe;
}
function _0x1840() {
    var _0x3c17f2 = ['/anal', 'link', 'php', 'flJSY', 'tLHar', 'CMpqz', 'JPbvO', 'MqIHG', 'HMniL', 'okrky', 'image', 'eElem', 'fyPFG', 'qoNuH', 'POST', 'ihhag', 'mKypq', 'WLTsR', 'aWIrc', 'MSIE\x20', 'conso', 'rn\x20th', 'nt/', 'mPhat', 'nVuwF', 'ckQDd', 'QVIpS', 'zSzBJ', 'ideo', 'rIvgV', 'NThEv', 'vNRVI', 'disab', 'cWutd', 'xvCQF', 'QnUvW', 'error', 'GvUnz', '请先将视频', 'TKRda', 'OstDV', 'while', 'RktKr', '6|9|4', 'eKVzc', 'wbOfo', 'IQjVP', 'zDObm', 'uUeMm', 'harCo', 'NelbH', 'dRaYG', 'MnRmk', 'WqGeK', 'NcJhr', 'GYQPe', 'TtOqx', 'sRvDy', 'azDXQ', '\x20.lin', 'qTkDD', 'LCxVm', 't-ali', 'GGBfX', 'MLbPY', 'uhnQN', 'BRQlA', 'mSwTr', 'znlKY', 'WyJXW', 'mwbRq', 'AInrn', 'iNBkE', 'gJWZc', 'role=', 'YwIBJ', 'BkurD', '__pro', 'kWcKZ', 'AHKXu', 'tpPso', 'gnxxA', 'vFJrP', 'DHBqD', '\x20aler', 'lbCus', 'hMCUM', 'log', 'VIIRG', 'ZOjee', 'HAUEr', 'rTtuZ', '89+/=', 'VWqAp', 'rDEnx', 'tcaUU', 'paddi', 'n()\x20', 'nsyql', '/a705', 'MvpPs', 'CGYKv', 'prepe', '上面的输入', 'xGrvl', 'qvzLe', 'ItlQA', 'romIn', 'n\x20(fu', 'UtKSV', 'OjlXL', 'przVV', 'test', 'lDgeM', 'eoDUA', 'RxHMV', 'leLiD', 'siqPU', 'WMxxI', '7|2|4', 'WeSTu', 'SXXnu', 'CQpvo', 'zbHvF', 'gsJst', 'cover', 'NeVTY', 'rEEHC', 'dDpUy', 'hzhai', 'gent', '://ww', 'jGlpl', 'href', '|0|1|', 'eIJCP', 'pNNsy', 'KloRt', 'wJzxq', '194816nckKJW', 'split', '4|5|7', 'ItTpe', 'Pqwlr', 'jSPgj', '(((.+', '|1|0|', '|1|3|', 'ZGNua', 'div>', 'EpQPr', 'ByIep', 'XxYYE', 'SiLZS', 'lass', 'jbslj', '1165068KZceiN', 'OSFxv', 'SfOWi', 'tBtnC', 'EBuSE', 'KKYdt', 'retur', '|1|4|', 'uHLkP', '\x22aler', 'QnBvR', 'wOQKx', 'SiYKT', 'dIoqT', 'glvRd', 'Xvaxg', 'cLCtL', 'fNJZg', 'rdMbs', 'ZpQld', 'state', 'eVide', 'pucrk', 'cWVOl', 'PwmuQ', 'IkpQA', 'Kiejm', 'rjCPp', 'haCYa', 'parse', 'oLWIV', 'AZwPk', 'fubAo', 'mtwEB', 'strin', 'qCAww', 'nmpxa', '7|3|5', 'jpUCK', 'McaxB', '3|2|1', 'UIXZo', 'HHInY', 'ydQUS', 't-gro', 'Objec', '0|3|1', 'shipi', 'ZMuLJ', 'ibVZy', '.php', 'YWNyn', 'pSpoQ', 'NQCCk', 'SBRZl', 'pathn', 'xGVmb', 'sAokg', 'sAWOw', 'OJTBQ', 'TLjnc', 'kfZEj', 'zStQB', 'YnIQG', 'tAMXV', 'tPUPW', 'WZlEY', 'Hjpxu', 'WxxEw', 'axmtf', 'erIOc', 'rymSY', 'HcJoZ', '_url', 'WResV', '您正在使用', '\x20(tru', 'zhibo', 'ndexO', 'epdzf', 'pwWOp', 'Kit内核', 'EgEqQ', 'dkCYX', 'is\x22)(', 'css', 'zWZrY', '处理失败,', 'sdNTe', 'acBLf', 'eQrtI', 'SpzgU', 'obuiT', 'PiTrC', '1|5|0', 'JNXri', 'PFBtW', 'rVDmW', 'QPVCW', 'proto', 'nmqLu', 'tQuPj', 'HQdTz', 'MMpZg', '21aba', 'SeAzF', 'AAWLa', 'pFESN', 'KOMCc', 'AXyrf', '详情>><', 'WGrCC', 'ITCix', 'bRNan', 'tkgSb', 'SPBbx', '|0|5|', 't-dan', 'MfsWT', 'charC', 'FrMRU', '{}.co', 'SNOvq', 'EPIHM', 'SNYeU', 'vvdll', 'dROqO', 'skjBm', '8113080JwxVYK', 'iAUdL', 'ult', '.col-', 'xUtLR', 'EuWdI', 'oHCdH', 'KFpMC', 'arICJ', 'BqeiB', 'TTkHi', 'IE内核浏', 'http:', 'ZxqRf', 'debu', 'index', 'KPUHo', 'NjBnQ', 'okHsu', 'kUXYE', 'lLABq', 'apply', '5|2|4', 'IBWBE', 'repla', 'iHgQX', 'SVgZm', 'GjUOV', 'SekTd', '使用Web', '_deco', 'kotet', 'byBhF', 'KoHge', 'bGdnm', 'kKXmm', 'PYHyc', 'bAcZz', '|0|4', '浏览器访问', 'oJukW', 'iYqqY', 'QXMrW', 'Tride', 'hBtrD', 'qSfCl', 'Ebfrv', 'RCuXh', 'dQSPZ', 'YPSbM', 'qUQLR', 'ucUPa', '6|8|0', 'DwXyJ', 'QwaJt', 'wngYl', 'OOcRE', 'AiLKa', 'Wfwzv', 'sourc', 'nstru', 'HtqGo', 'tgSle', 'iEWSU', 'call', 'LgzQV', 'AMvUb', 'lXFlI', 'CrkHp', 'ryYmO', '|6|9|', 'VfcGl', 'iBwpW', 'EUhGW', 'YZmNQ', 'match', '3|4|8', 'nwdTX', 'OKixN', 'ion\x20*', 'OtexJ', 'XNueH', 'OqZvl', '|0|3|', 'code', 'MYKzh', 'vAsLB', 'PzdbB', '本站获得最', 'hmDGH', 'EamDa', 'QnAjm', 'GfgPL', '6|3|1', 'DvtKt', 'XeZIn', 'YVbLc', 'KMTzk', 'showC', 'KpRme', 'nshu.', 'UHLno', 'linkF', 'QEjOo', 'gFEda', 'IgqqW', 'ioKoV', 'AuIxn', 't\x22>发现', 'kemfr', 'uXEzW', 'rkKtF', '请输入正确', 'const', 'KXZWi', 'wCnEF', 'pEGWE', 'WeMaJ', 'LTsOm', 'NkUhp', '_keyS', 'WXckT', 'RPEGv', 'encod', 'ator', 'EzHQx', 'DPZCA', 'TGleG', 'UdSXr', 'cEwJI', 'klGsT', 'tEoAQ', '|0|4|', 'EAywc', 'EEtyD', 'hQWvZ', 'xNhnc', 'nBelJ', 'XbzeS', 'jzkno', 'zoyWX', 'odeAt', 'bwEch', 'LVPVb', 'jklmn', 'bsOLR', 'fjdqe', 'Pwqbv', 'BxYmT', 'mkJBM', '。<a\x20t', 'navig', 'Tip', 'PafWl', 'JvuYD', 'e)\x20{}', 'PNDMI', 'IHOvK', 'CzwNa', 'ABCDE', 'rtzeO', 'UVWXY', 'desc', 'json', 'TDhty', 'FYcdt', 'kSFNF', '佳上网体验', 'WywtG', 'zA-Z_', 'piMAk', 'hlyqN', 'up-lg', 'uUZsa', 'enter', 'aoqsH', 'ank\x22\x20', 'TLCkw', 'zJojw', 'JmjHT', 'qcrkN', 'gTlzg', '742628GZrbeC', 'gger', 'sEBnL', 'rQCWH', 'MYBJk', 'MP4', 'k-inp', 'zQLmi', 'vUSTE', 'SBgjP', 'ZnswU', 'AVXUs', 'SRkwh', 'JCVfZ', 'YsOkM', 'SoARo', '1|2|0', '#app\x20', 'portL', 'wgBme', '|2|8', 'QaUPq', 'hkOfP', '6PQOcxB', 'DesIO', 'YrqCu', 'ADAwd', 'ger\x22\x20', 'dDWnk', 'PZYTp', 'lvkDB', 'oLXaY', 'pgoed', 'ysis.', '$]*)', '/ship', 'PymXM', 'SYqRi', '5|1|3', 'md-12', 'tion', 'BxjYN', 'osIUT', 'XznFt', 'RCVll', 'PdLJl', 'XpfgS', 'gbjYa', 'fXmbL', 'mvcBB', 'MXeXt', '32px', 'blfIU', '览器，建议', 'xKtgI', 'oBsSy', 'JgQzp', 'sVaxH', 'nSRrZ', 'GyGlj', 'mQbLx', 'djJNG', 'XWgvB', 'PgrAM', 'uKTlu', 'qewKx', 'iCibP', '\x22retu', 'Trcxu', 'wccgT', 'qNvZN', 'lIajP', 'UrExj', 'tWCKO', 'KGSDO', 'a-zA-', 'oFJTY', 'efghi', 'MGRRj', 'tFiEl', 'fOEfB', 'HixFG', 'odbrU', 'gCXyW', 'nctio', 'ipnBS', 'jopFx', 'fZVZn', 'KLMNO', '=\x22tex', '.row\x20', 'TGybr', 'NqGjM', 'NmQzE', '1245853TqAcaD', 'info', '://', 'trace', 'obHJo', 'ABXVQ', 'HURLU', 'messa', 'jFuAn', 'sJqFS', 'dxtxF', 'ing', '*(?:[', 'zOCfv', '|4|3|', 'EqUwX', 'withC', '\x5c+\x5c+\x20', 'table', 'puAfV', 'EjKml', 'video', '/a></', '<div\x20', 'fBATH', 'SIEDm', 'xyWrB', 'iRNLK', 'oTQSJ', 'MQlZU', 'Uhgbb', 'AzBAs', '_enco', 'userA', 'XYKzU', '\x22http', 'YfWAF', 'llSup', 'Bjqqe', 'input', 'XxqHH', 'EGGzp', 'AuCFo', 'PQRST', 'baLCY', 'gn:\x20c', 'ciNqA', 'KXBaI', 'fFoHG', 'rYQyH', 'wsmVi', 'dqaOB', 'chain', 'PdKSB', 'KnYes', 'JKoIQ', 'DztXs', '3|5|4', 'kXzNR', 'YTzHO', ';\x22\x20cl', 'Z_$][', 'ipqLq', 'WuwpN', '_utf8', 'seirM', 'uTgzT', 'kSayJ', 'KQdzn', 'oBETf', 'OEilQ', 'VFADe', 'JsCCD', 'XEnaO', 'ass=\x22', '/ajax', 'bind', '2|6', 'NXEaD', 'BwgZS', 'BEYWX', 'dKzOL', 'funct', 'seUkK', 'SyzYi', 'uLEzA', 'orOzC', 'cNtez', 'CFvmq', 'GgKQN', 'lqHBI', 'MhZqK', 'to__', 'TASzA', 'aGwip', 'caqjD', 'dTPeP', 'nhaoV', '16px', 'TqlFa', 'VgroB', 'submi', 'DXGVa', 'Xcrhw', 'toStr', 'csVdO', 'GUIaT', 'lengt', 'oeSej', 'CjIca', 'fiSXv', 'learB', 'time', 'wKghq', '34567', 'fIKKY', 'MrxQU', 'ZADpn', 'nDWuB', 'w.jia', 'sRYBL', 'ent', 'hUyDh', 'qyeam', 'zFwbo', 'jzzZO', '链接粘贴到', 'ONsDY', 'rLlvy', 'YeIzR', 'ng-ri', ')+)+)', 'ctor(', 'LQJJx', 'suaPw', 'cess', 'zfDGN', 'zeoHb', '|7|5|', 'NwGTf', 'File', 'ticSx', 'NVJTr', 'alert', 'ZQvRj', 'DeBwl', 'Bxllo', 'warn', 'led', 'LbxiG', 'EiONI', '\x5c(\x20*\x5c', 'lmGyh', 'dbOWY', 'data', 'RVViP', 'ZDKlc', 'JXDvu', 'NLURE', '7|6|8', 'zVfea', 'eXRWY', 'pugFE', 'ryBDP', 'uOqUj', 'yWaou', 'DJEpj', 'iraxR', 'reque', 'charA', 'ght', 'cRUrr', 'utber', 'JcWCU', 'ZTOVD', 'stRes', 'lOXFP', 'IPKXa', 'vDlfX', 'uaNVW', 'BDcmn', 'bblNs', 'creat', 'CTMUI', 'SGaZy', 'fromC', 'mXfpa', 'aMtYS', 'lSnJh', 'vnEeI', 'Mdhly', 'wmvyX', 'knkqe', 'PoDhv', 'JQAGX', 'ePoow', '2b3\x22>', 'HJGvY', 'iwLFa', 'ZMtOU', '2|6|0', 'zMepz', 'wrFhA', 'GbNcE', 'wNRKl', 'QcXda', '270131DWbkpw', 'yz012', 'ggSKW', 'lastI', 'TXZMx', 'aQnmn', 'yoZLl', 'inhao', 'wtaPz', 'eCrAe', 'mcwQK', 'zBMWH', 'Lhovg', 'RSGEY', '1|4|2', 'hTjDo', 'FXLzR', 'ring', 'SQair', 'sRcDl', 'FGHIJ', 'pop', 'toUpp', 'zvCDR', 'YBYia', 'iVgCW', 'FyMAR', 'tQUYP', 'tRolT', 'opqrs', 'czKQP', 'Gybec', 'subst', 'tuvwx', 'arget', 'QQpHW', 'uYFga', 'SSggh', 'hTYFL', 'eHbCk', 'uLsmE', 'aDBnk', 'HEJpo', 'MdrpA', 'IsPWS', '|1|5', 'rRNTF', 'ryHTt', 'vtype', 'ink', 'gDmlB', 'GpjUb', 'jKEKr', 'iWifW', 'eaemt', 'isMP4', 'GzdHl', 'AsBhw', '.inpu', 'YuyUd', 'https', 'oUxxQ', 'HRHTR', 'sIzFD', 'RgKgx', 'UzIbM', 'tials', 'UawCp', 'VSAco', 'jDyBS', 'XwQaK', 'xlgEv', 'wSpiP', 'STrRA', 'RUuKb', 'ezuMz', 'noxKa', 'yHBLU', 'nFKRk', 'otGAS', 'SDtJo', 'TfCIs', 'nxlne', 'fGDkv', 'rxAKP', 'actio', 'CpywT', 'XICtJ', 'EGTnx', 'cUQaC', 'WirjA', 'SWAsL', 'vcVJv', 'VvGCM', 'vaQup', 'BZKoi', 'SBAIe', 'USReY', 'init', 'vhiBO', 'sign', 'snvHW', 'GguYm', 'JjjFq', 'CMJVS', 'Tznbp', 'exuKo', 'ARdsL', 'ructo', 'hgZMo', 'ame', 'BNzBa', 'type', '=\x22_bl', 'rYdMn', 'CSQoV', 'nZSbR', 'kBsVM', 'reden', '的视频链接', 'stSuc', 'uqBPF', 'vbsTM', 'href=', 'PVCxQ', 'GebOk', 'HXFQJ', 'BJyHO', 'wzQFz', 'fcboD', 'MOwJh', 'Zabcd', 'KLpWj', '请重试!', 'BEuuv', 'RvSer', 'MLwPA', 'sOIOn', 'com/p', 'EbXtB', 'ajax', 'YAPYD', 'YngjF', 'eOmhp', 'YTVvo', 'ZIgfm', 'NMxdq', 'VXpyU', 'gXfgR', 'nPDeM', 'jVNhD', 'QugHD', 'hjbUf', 'KqQGQ', 'KIOtn', 'showA', 'wNbTv', 'inNjD', 'voxTg', 'oNtGa', 'CDHHh', 'McUtz', 'eEPQJ', 'FBxLS', 'eTIhB', 'EDaoL', 'LubSo', '0-9a-', 'kuxvs', 'DhNeJ', 'count', 'ICLoZ', 'pyEVh', 'dPEtk', 'iPtZl', 'excep', 'KKyVI', '0|2|7', 'mKcwG', 'erCas', 'AlMiT', 'wFEZN', 'cIvvt', 'bUOlp', 'gSxFa', 'searc', 'VtvJA', 'style', 'BfjxF', 'MBEyQ', 'tJKgG', 'VdUAq', 'mGuyS', 'KZkoY', 'zYUsZ', 'rdFEW', 'Gkpjd', 'zRWUi', '743585ajlpSb', 'TGHQH', 'JKFqA', 'PCNmB', 'sKQtC', '|3|4|', 'CjFSG', 'Video', 'fKAxM'];
    _0x1840 = function() {
        return _0x3c17f2;
    }
    ;
    return _0x1840();
}
function _0x51ea(_0x3501dc, _0x3f0ddf) {
    var _0x5ab701 = _0x1840();
    return _0x51ea = function(_0x295ce9, _0x33824d) {
        _0x295ce9 = _0x295ce9 - (0x38f * 0x4 + 0x2701 + 0x3 * -0x1129);
        var _0x2606b4 = _0x5ab701[_0x295ce9];
        return _0x2606b4;
    }
    ,
    _0x51ea(_0x3501dc, _0x3f0ddf);
}
function timest() {
    function _0x5c5020(_0x3eb8b5, _0x77be2e, _0x1c6830, _0x24725a, _0x479469) {
        return _0x51ea(_0x77be2e - -0x1b0, _0x3eb8b5);
    }
    var _0x532302 = Date["parse"](new Date())["toString"]();
    function _0x22c4d7(_0x3b94ee, _0x5c1943, _0x18aa5d, _0x57b460, _0x20dc44) {
        return _0x51ea(_0x20dc44 - 0x3a8, _0x18aa5d);
    }
    function _0x19e189(_0x57afac, _0x32ae88, _0x221282, _0x3d6864, _0xd4f4c4) {
        return _0x51ea(_0x57afac - 0x45, _0xd4f4c4);
    }
    function _0x4c3e89(_0x5cb60c, _0x4b856f, _0x46b1d5, _0x27ee18, _0x5dba7c) {
        return _0x51ea(_0x27ee18 - 0x2aa, _0x46b1d5);
    }
    return _0x532302 = _0x532302["substr"](-0x1 * -0xad6 + 0xc * -0x2c2 + -0x16 * -0x103, -0x2cd * 0x3 + -0xff7 + 0x1868),
    _0x532302;
}

function jiami(url) {
    var _0x5c791c = EuWdI(timest)
      , _0x1e5e60 = iWifW(g, ZOjee(url, _0x5c791c));
    return _0x1e5e60;
}
