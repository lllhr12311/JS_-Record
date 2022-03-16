if (!(window.console && window.console.group)) {
    (function() {
        var b = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
        window.oldconsole = window.console || {};
        window.console = {};
        for (var a = 0; a < b.length; ++a) {
            window.console[b[a]] = window.oldconsole[b[a]] || function() {}
        }
    }
    )()
}
(function(f, I) {
    var G = "//passport.6.cn/";
    var B = G + (window.location.pathname == "/vlogin.php" ? "sso/vVLogin.php" : "sso/login.php");
    var v = G + "sso/prelogin.php";
    var C = G + "sso/register_test.php";
    var l = G + "sso/prelogin.php?act=1";
    var p = G + "sso/editProfile.php";
    var D = "//v.6.cn/coop/coopLogin.php";
    var h = "ssoiframe";
    var r = "ssoform";
    var y = 1;
    var d = 2;
    var q = ["parent.SSOController.feedBackUrlCallBack", "itcmhg1t", "itcmhqzu", "window.parent._reset_password_callback_", "iu7rny3u"];
    var s = function() {};
    var n = +new Date();
    var k = {
        appLoginURL: "",
        extraParameter: {},
        domain: window.location.host,
        appRegisterURL: "",
        appChangeURL: "",
        error: s,
        success: s,
        always: s,
        timeout: 8000
    };
    var i;
    var u = null;
    var A = (function() {
        var J = 3000;
        var K = function() {
            a.servertime += J / 1000;
            setTimeout(K, J)
        };
        return {
            start: function() {
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(K, J)
            }
        }
    }
    )();
    var x = function() {
        return (n++).toString(36)
    };
    var H = function(L) {
        var K = document.getElementsByTagName("head")[0];
        var J = document.createElement("script");
        J.charset = "uft-8";
        J.type = "text/javascript";
        J.src = w(L, {
            _: +new Date()
        });
        K.appendChild(J)
    };
    var w = function(J, K) {
        return J + z(J) + b(K)
    };
    var z = function(J) {
        return /\?/.test(J) ? "&" : "?"
    };
    var b = function(L) {
        var J = [];
        if (typeof L != "object") {
            return ""
        }
        for (var K in L) {
            if (typeof L[K] == "function") {
                continue
            }
            J.push(K + "=" + encodeURIComponent(L[K]))
        }
        return J.join("&")
    };
    var g = function(L, K) {
        for (var J in K) {
            L[J] = K[J]
        }
        return L
    };
    var e = function(J) {
        return I.getElementById(J)
    };
    var j = function(J, M) {
        var J = J || h;
        var M = M || "javascript:false;";
        var L = e(J);
        if (L) {
            L.parentNode.removeChild(L)
        }
        L = I.createElement("iframe");
        L.height = 0;
        L.width = 0;
        L.style.display = "none";
        L.name = J;
        L.id = J;
        L.src = M;
        I.getElementsByTagName("body")[0].appendChild(L);
        try {
            f.frames[J].name = J
        } catch (K) {}
        return L
    };
    var F = function(K) {
        var J = e(K);
        J && J.parentNode.removeChild(J)
    };
    var m = function(L, J, N, M) {
        L = L || "";
        J = J || r;
        N = N || "POST";
        M = M || h;
        var K = e(J);
        K && K.parentNode.removeChild(K);
        K = I.createElement("form");
        K.height = 0;
        K.width = 0;
        K.style.display = "none";
        K.action = L;
        K.name = J;
        K.id = J;
        K.method = N;
        K.target = M;
        I.getElementsByTagName("body")[0].appendChild(K);
        I.forms[J].name = J;
        return K
    };
    var o = function(L, M) {
        var O = "";
        var N;
        var P;
        var K;
        var J;
        for (N in M) {
            if (M.hasOwnProperty(N)) {
                O += '<input type="hidden" name="' + N + '" value="' + c(M[N]) + '" />';
                if ((J = L.getElementsByTagName("input")[name])) {
                    L.removeChild(J)
                }
            }
        }
        P = I.createElement("div");
        P.innerHTML = O;
        while ((K = P.getElementsByTagName("input")[0])) {
            L.appendChild(K)
        }
    };
    var c = function(J) {
        J = String(J);
        return J.replace(/&|"|'|<|>/g, function(K) {
            switch (K) {
            case "&":
                return "&amp;";
            case '"':
                return "&quot;";
            case "'":
                return "&#039";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;"
            }
        })
    };
    var E = function(M) {
        var J = "";
        for (var L = 0; L < M.length; L++) {
            var K = M.charAt(L);
            J += K.charCodeAt() <= 128 ? K.toLowerCase() : K
        }
        return J
    };
    var t = function(O, N) {
        var J = -1;
        for (var L = 0; L < N.length; L++) {
            if ((J = O.indexOf(N[L])) > -1) {
                break
            }
        }
        var K = J > -1 ? O.slice(0, J) : O;
        var M = J > -1 ? O.slice(J) : "";
        return [K, M]
    };
    var a = {
        login: function(J, Q, K) {
            var S = this;
            var K = K || 0;
            var L = k;
            var N = !!S.nonce;
            var R = !(u === null);
            var P = function() {
                var Z = t(J, u);
                var V = Z[1];
                var T = Z[0];
                var W = w(B, {
                    username: T,
                    domain: L.domain
                });
                var Y = {
                    partner: V,
                    password: S.encode("" + S.encode(S.encode(Q) + S.servertime) + S.nonce),
                    savestate: K,
                    servertime: S.servertime,
                    nonce: S.nonce,
                    prod: S.prod,
                    url: L.appLoginURL,
                    encoding: "utf-8",
                    domain: L.domain,
                    callback: q[0],
                    p1: L.p1 || 0,
                    p3: L.p3 || 0,
                    c: "0"
                };
                var U = m(W);
                j();
                Y = g(Y, L.extraParameter);
                o(U, Y);
                try {
                    U.submit()
                } catch (X) {
                    F(h);
                    throw new Error(X)
                }
                S.nonce = null;
                S.preloginUsername = null;
                i = setTimeout(function() {
                    S.feedBackUrlCallBack({
                        retcode: "-1"
                    });
                    F(h)
                }, L.timeout)
            };
            var M = function() {
                if (N && R) {
                    P()
                } else {
                    !R && S.fetchSuffix(O);
                    !N && S.getNonce(J, O)
                }
            };
            var O = function(T) {
                if (T && T.retcode && T.retcode < 0) {
                    return L.error(T)
                }
                if (u !== null && S.nonce) {
                    P()
                }
            };
            J = E(J);
            M()
        },
        feedBackUrlCallBack: function(K) {
            var J = k;
            i && f.clearTimeout(i);
            if (K.retcode == 0) {
                J.success(K)
            } else {
                J.error(K)
            }
            J.always(K)
        },
        encode: function(J) {
            return this.hex_sha1(J)
        },
        encodeBase64: function(J) {
            return this.base64.encode(J + "")
        },
        config: function(J) {
            g(k, J)
        },
        prelogin: function(P, O) {
            var J = this;
            var L = k;
            var N = 1;
            var M = q[N];
            var K = w(v, {
                username: P,
                domain: L.domain,
                c: N
            });
            window[M] = function(Q) {
                if (Q.retcode >= 0) {
                    J.servertime = Q.servertime;
                    J.nonce = Q.nonce;
                    J.prod = Q.prod;
                    A.start();
                    var R = (J.preloginUsername = J.preloginUsername || {});
                    R[Q.username] = {
                        status: Q.verifycode ? y : d,
                        data: Q
                    }
                }
                O && O(Q)
            }
            ;
            H(K)
        },
        getServerTime: function(K, J) {
            if (this.nonce) {
                J && J()
            } else {
                this.prelogin(K, J)
            }
        },
        getNonce: function(L, K) {
            var J = this;
            if (!J.servertime) {
                J.getServerTime(L, K)
            } else {
                J.nonce = J.createNonce(6);
                K && K()
            }
        },
        needVerify: function(N, M) {
            var K = this;
            var L = this.preloginUsername || {};
            var J;
            if ((J = L[N])) {
                M(J.status === y, J.data)
            } else {
                this.prelogin(N, function(O) {
                    M(O.retcode >= 0 && O.verifycode, O)
                })
            }
        },
        createNonce: function(K) {
            var J = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var M = "";
            for (var L = 0; L < K; L++) {
                M += J.charAt(Math.ceil(Math.random() * 1000000) % J.length)
            }
            return M
        },
        fetchSuffix: function(K) {
            if (u === null) {
                var J = "jjgl22ig";
                window[J] = function(L) {
                    u = L;
                    K && K(L);
                    window[J] = null
                }
                ;
                H(w(D, {
                    callback: J
                }))
            } else {
                if (K) {
                    K(u)
                }
            }
        },
        getErrorMsg: function(K, N) {
            var K = parseInt(K);
            var J = (K > -9999 ? K : Math.ceil(K / 10)) + "";
            var L = g({
                "-1": "登录超时，请重新登录",
                "-100": "重要参数错误",
                "-101": "授权数据错误",
                "-151": "手机号格式非法",
                "-152": "验证码格式非法",
                "-154": "安全验证失败，请刷新后重试",
                "-200": "您的注册/登录行为存在异常，暂时禁止此行为",
                "-201": "验证码错误",
                "-202": "用户名已被占用",
                "-203": "异地登录",
                "-205": "用户名或密码错误",
                "-206": "用户名或密码错误",
                "-208": "用户名长度错误",
                "-209": "密码长度需8到20位，且必须包含数字和字母",
                "-299": "密码长度需大于8位，且由数字、字母、大写字母、特殊字符组成",
                "-210": "两次密码输入不一致",
                "-211": "用户名包含非法字符",
                "-212": "用户名包含违规字符",
                "-213": "旧密码错误",
                "-214": "手机验证码错误",
                "-1009": "密码多次输入错误，请2分钟后重试",
                "-1010": "密码长度需8到20位，且必须包含数字和字母",
                "-1012": "系统维护中。",
                "-9101": "用户名或密码错误"
            }, N);
            var M;
            if ((M = L[J])) {
                return M
            }
            return "服务器错误(" + K + ")，请联系客服"
        },
        register: function(M, J) {
            J && this.config(J);
            var J = k;
            var L = w(C, {
                domain: J.domain
            });
            var K = m(L);
            j();
            g(M, {
                op: "reg",
                c: "0",
                url: J.appRegisterURL
            });
            o(K, M);
            try {
                K.submit()
            } catch (N) {
                F(h);
                throw new Error(N)
            }
        },
        checkUsername: function(N, M) {
            var L = 2;
            var K = q[L];
            var J = k;
            window[K] = function(P) {
                var O = P.retcode == -9101;
                M && M(O, P);
                window[K] = null
            }
            ;
            H(w(l, {
                username: N,
                domain: J.domain,
                c: L
            }))
        },
        change: function(O, L) {
            L && this.config(L);
            var K = k;
            var J = this;
            var N = w(p, {
                domain: K.domain,
                url: K.appChangeURL
            });
            var Q = g(O, {
                c: 0
            });
            var M = m(N);
            j();
            o(M, Q);
            try {
                M.submit()
            } catch (P) {
                F(h);
                throw new Error(P)
            }
        },
        createIFrame: j,
        deleteIFrame: F,
        createForm: m,
        addInput: o,
        guid: x,
        executeScript: H,
        addInput: o
    };
    f.SSOController = a;
    (function() {
        var J = 0;
        var L = 8;
        var Q = function(Y, S) {
            Y[S >> 5] |= 128 << (24 - (S % 32));
            Y[(((S + 64) >> 9) << 4) + 15] = S;
            var W = Array(80);
            var ad = 1732584193;
            var ae = -271733879;
            var af = -1732584194;
            var ag = 271733878;
            var ah = -1009589776;
            for (var X = 0; X < Y.length; X += 16) {
                var U = ad;
                var V = ae;
                var Z = af;
                var aa = ag;
                var ac = ah;
                for (var ab = 0; ab < 80; ab++) {
                    if (ab < 16) {
                        W[ab] = Y[X + ab]
                    } else {
                        W[ab] = O(W[ab - 3] ^ W[ab - 8] ^ W[ab - 14] ^ W[ab - 16], 1)
                    }
                    var T = N(N(O(ad, 5), R(ab, ae, af, ag)), N(N(ah, W[ab]), P(ab)));
                    ah = ag;
                    ag = af;
                    af = O(ae, 30);
                    ae = ad;
                    ad = T
                }
                ad = N(ad, U);
                ae = N(ae, V);
                af = N(af, Z);
                ag = N(ag, aa);
                ah = N(ah, ac)
            }
            return Array(ad, ae, af, ag, ah)
        };
        var R = function(U, V, S, T) {
            if (U < 20) {
                return (V & S) | (~V & T)
            }
            if (U < 40) {
                return V ^ S ^ T
            }
            if (U < 60) {
                return (V & S) | (V & T) | (S & T)
            }
            return V ^ S ^ T
        };
        var P = function(S) {
            return S < 20 ? 1518500249 : S < 40 ? 1859775393 : S < 60 ? -1894007588 : -899497514
        };
        var N = function(V, S) {
            var T = (V & 65535) + (S & 65535);
            var U = (V >> 16) + (S >> 16) + (T >> 16);
            return (U << 16) | (T & 65535)
        };
        var O = function(T, S) {
            return (T << S) | (T >>> (32 - S))
        };
        var M = function(S) {
            var T = Array();
            var V = (1 << L) - 1;
            for (var U = 0; U < S.length * L; U += L) {
                T[U >> 5] |= (S.charCodeAt(U / L) & V) << (24 - (U % 32))
            }
            return T
        };
        var K = function(T) {
            var U = J ? "0123456789ABCDEF" : "0123456789abcdef";
            var S = "";
            for (var V = 0; V < T.length * 4; V++) {
                S += U.charAt((T[V >> 2] >> ((3 - (V % 4)) * 8 + 4)) & 15) + U.charAt((T[V >> 2] >> ((3 - (V % 4)) * 8)) & 15)
            }
            return S
        };
        this.hex_sha1 = function(S) {
            return K(Q(M(S), S.length * L))
        }
    }
    .call(a));
    a.base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(L) {
            var J = "";
            var S, Q, O, R, P, N, M;
            var K = 0;
            L = Base64._utf8_encode(L);
            while (K < L.length) {
                S = L.charCodeAt(K++);
                Q = L.charCodeAt(K++);
                O = L.charCodeAt(K++);
                R = S >> 2;
                P = ((S & 3) << 4) | (Q >> 4);
                N = ((Q & 15) << 2) | (O >> 6);
                M = O & 63;
                if (isNaN(Q)) {
                    N = M = 64
                } else {
                    if (isNaN(O)) {
                        M = 64
                    }
                }
                J = J + this._keyStr.charAt(R) + this._keyStr.charAt(P) + this._keyStr.charAt(N) + this._keyStr.charAt(M)
            }
            return J
        },
        decode: function(L) {
            var J = "";
            var S, Q, O;
            var R, P, N, M;
            var K = 0;
            L = L.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (K < L.length) {
                R = this._keyStr.indexOf(L.charAt(K++));
                P = this._keyStr.indexOf(L.charAt(K++));
                N = this._keyStr.indexOf(L.charAt(K++));
                M = this._keyStr.indexOf(L.charAt(K++));
                S = (R << 2) | (P >> 4);
                Q = ((P & 15) << 4) | (N >> 2);
                O = ((N & 3) << 6) | M;
                J = J + String.fromCharCode(S);
                if (N != 64) {
                    J = J + String.fromCharCode(Q)
                }
                if (M != 64) {
                    J = J + String.fromCharCode(O)
                }
            }
            J = Base64._utf8_decode(J);
            return J
        },
        _utf8_encode: function(K) {
            K = K.replace(/\r\n/g, "\n");
            var J = "";
            for (var M = 0; M < K.length; M++) {
                var L = K.charCodeAt(M);
                if (L < 128) {
                    J += String.fromCharCode(L)
                } else {
                    if (L > 127 && L < 2048) {
                        J += String.fromCharCode((L >> 6) | 192);
                        J += String.fromCharCode((L & 63) | 128)
                    } else {
                        J += String.fromCharCode((L >> 12) | 224);
                        J += String.fromCharCode(((L >> 6) & 63) | 128);
                        J += String.fromCharCode((L & 63) | 128)
                    }
                }
            }
            return J
        },
        _utf8_decode: function(J) {
            var K = "";
            var L = 0;
            var M = (c1 = c2 = 0);
            while (L < J.length) {
                M = J.charCodeAt(L);
                if (M < 128) {
                    K += String.fromCharCode(M);
                    L++
                } else {
                    if (M > 191 && M < 224) {
                        c2 = J.charCodeAt(L + 1);
                        K += String.fromCharCode(((M & 31) << 6) | (c2 & 63));
                        L += 2
                    } else {
                        c2 = J.charCodeAt(L + 1);
                        c3 = J.charCodeAt(L + 2);
                        K += String.fromCharCode(((M & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        L += 3
                    }
                }
            }
            return K
        }
    }
}
)(window, document);


var  S = window.SSOController;


function jiami(){
    var Q='123456',servertime=1647390462,nonce="DqzICK6o";
    return S.encode("" + S.encode(S.encode(Q) + servertime) + nonce)
}