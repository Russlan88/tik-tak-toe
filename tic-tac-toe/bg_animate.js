/*! Anime */
var $jscomp$this = this;
!(function (t, n) {
  'function' == typeof define && define.amd
    ? define([], n)
    : 'object' == typeof module && module.exports
    ? (module.exports = n())
    : (t.anime = n());
})(this, function () {
  function t(t) {
    if (!j.col(t))
      try {
        return document.querySelectorAll(t);
      } catch (t) {}
  }
  function n(t) {
    return t.reduce(function (t, e) {
      return t.concat(j.arr(e) ? n(e) : e);
    }, []);
  }
  function e(n) {
    return j.arr(n)
      ? n
      : (j.str(n) && (n = t(n) || n),
        n instanceof NodeList || n instanceof HTMLCollection
          ? [].slice.call(n)
          : [n]);
  }
  function r(t, n) {
    return t.some(function (t) {
      return t === n;
    });
  }
  function a(t) {
    var n,
      e = {};
    for (n in t) e[n] = t[n];
    return e;
  }
  function i(t, n) {
    var e,
      r = a(t);
    for (e in t) r[e] = n.hasOwnProperty(e) ? n[e] : t[e];
    return r;
  }
  function u(t, n) {
    var e,
      r = a(t);
    for (e in n) r[e] = j.und(t[e]) ? n[e] : t[e];
    return r;
  }
  function o(t) {
    if (
      (t =
        /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(
          t
        ))
    )
      return t[2];
  }
  function s(t, n) {
    return j.fnc(t) ? t(n.target, n.id, n.total) : t;
  }
  function c(t, n) {
    if (n in t.style)
      return (
        getComputedStyle(t).getPropertyValue(
          n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        ) || '0'
      );
  }
  function f(t, n) {
    return j.dom(t) && r(A, n)
      ? 'transform'
      : j.dom(t) && (t.getAttribute(n) || (j.svg(t) && t[n]))
      ? 'attribute'
      : j.dom(t) && 'transform' !== n && c(t, n)
      ? 'css'
      : null != t[n]
      ? 'object'
      : void 0;
  }
  function l(t, n) {
    switch (f(t, n)) {
      case 'transform':
        return (function (t, n) {
          var e,
            r =
              -1 < (e = n).indexOf('translate')
                ? 'px'
                : -1 < e.indexOf('rotate') || -1 < e.indexOf('skew')
                ? 'deg'
                : void 0;
          if (
            ((r = -1 < n.indexOf('scale') ? 1 : 0 + r),
            !(t = t.style.transform))
          )
            return r;
          for (
            var a = [], i = [], u = [], o = /(\w+)\((.+?)\)/g;
            (a = o.exec(t));

          )
            i.push(a[1]), u.push(a[2]);
          return (t = u.filter(function (t, e) {
            return i[e] === n;
          })).length
            ? t[0]
            : r;
        })(t, n);
      case 'css':
        return c(t, n);
      case 'attribute':
        return t.getAttribute(n);
    }
    return t[n] || 0;
  }
  function d(t, n) {
    var e = /^(\*=|\+=|-=)/.exec(t);
    if (!e) return t;
    switch (
      ((n = parseFloat(n)), (t = parseFloat(t.replace(e[0], ''))), e[0][0])
    ) {
      case '+':
        return n + t;
      case '-':
        return n - t;
      case '*':
        return n * t;
    }
  }
  function p(t) {
    return j.obj(t) && t.hasOwnProperty('totalLength');
  }
  function m(t, n) {
    function e(e) {
      return (
        (e = void 0 === e ? 0 : e),
        t.el.getPointAtLength(1 <= n + e ? n + e : 0)
      );
    }
    var r = e(),
      a = e(-1),
      i = e(1);
    switch (t.property) {
      case 'x':
        return r.x;
      case 'y':
        return r.y;
      case 'angle':
        return (180 * Math.atan2(i.y - a.y, i.x - a.x)) / Math.PI;
    }
  }
  function h(t, n) {
    var e = /-?\d*\.?\d+/g;
    if (((t = p(t) ? t.totalLength : t), j.col(t)))
      n = j.rgb(t)
        ? t
        : j.hex(t)
        ? (function (t) {
            t = t.replace(
              /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              function (t, n, e, r) {
                return n + n + e + e + r + r;
              }
            );
            var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return (
              'rgb(' +
              (t = parseInt(n[1], 16)) +
              ',' +
              parseInt(n[2], 16) +
              ',' +
              (n = parseInt(n[3], 16)) +
              ')'
            );
          })(t)
        : j.hsl(t)
        ? (function (t) {
            function n(t, n, e) {
              return (
                0 > e && (e += 1),
                1 < e && --e,
                e < 1 / 6
                  ? t + 6 * (n - t) * e
                  : 0.5 > e
                  ? n
                  : e < 2 / 3
                  ? t + (n - t) * (2 / 3 - e) * 6
                  : t
              );
            }
            var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t);
            t = parseInt(e[1]) / 360;
            var r = parseInt(e[2]) / 100;
            if (((e = parseInt(e[3]) / 100), 0 == r)) r = e = t = e;
            else {
              var a = 0.5 > e ? e * (1 + r) : e + r - e * r,
                i = 2 * e - a;
              (r = n(i, a, t + 1 / 3)),
                (e = n(i, a, t)),
                (t = n(i, a, t - 1 / 3));
            }
            return 'rgb(' + 255 * r + ',' + 255 * e + ',' + 255 * t + ')';
          })(t)
        : void 0;
    else {
      var r = o(t);
      (t = r ? t.substr(0, t.length - r.length) : t), (n = n ? t + n : t);
    }
    return {
      original: (n += ''),
      numbers: n.match(e) ? n.match(e).map(Number) : [0],
      strings: n.split(e),
    };
  }
  function g(t, n) {
    return n.reduce(function (n, e, r) {
      return n + t[r - 1] + e;
    });
  }
  function v(t) {
    return (t ? n(j.arr(t) ? t.map(e) : e(t)) : []).filter(function (t, n, e) {
      return e.indexOf(t) === n;
    });
  }
  function y(t, n) {
    var r = a(n);
    if (j.arr(t)) {
      var i = t.length;
      2 !== i || j.obj(t[0])
        ? j.fnc(n.duration) || (r.duration = n.duration / i)
        : (t = { value: t });
    }
    return e(t)
      .map(function (t, e) {
        return (
          (e = e ? 0 : n.delay),
          (t = j.obj(t) && !p(t) ? t : { value: t }),
          j.und(t.delay) && (t.delay = e),
          t
        );
      })
      .map(function (t) {
        return u(t, r);
      });
  }
  function b(t, n) {
    var e;
    return t.tweens.map(function (r) {
      var a = (r = (function (t, n) {
          var e,
            r = {};
          for (e in t) {
            var a = s(t[e], n);
            j.arr(a) &&
              1 ===
                (a = a.map(function (t) {
                  return s(t, n);
                })).length &&
              (a = a[0]),
              (r[e] = a);
          }
          return (
            (r.duration = parseFloat(r.duration)),
            (r.delay = parseFloat(r.delay)),
            r
          );
        })(r, n)).value,
        i = l(n.target, t.name),
        u = e ? e.to.original : i,
        c = ((u = j.arr(a) ? a[0] : u), d(j.arr(a) ? a[1] : a, u));
      i = o(c) || o(u) || o(i);
      return (
        (r.isPath = p(a)),
        (r.from = h(u, i)),
        (r.to = h(c, i)),
        (r.start = e ? e.end : t.offset),
        (r.end = r.start + r.delay + r.duration),
        (r.easing = (function (t) {
          return j.arr(t) ? I.apply(this, t) : k[t];
        })(r.easing)),
        (r.elasticity = (1e3 - Math.min(Math.max(r.elasticity, 1), 999)) / 1e3),
        j.col(r.from.original) && (r.round = 1),
        (e = r)
      );
    });
  }
  function w(t, n, e) {
    var r = 'delay' === t ? Math.min : Math.max;
    return n.length
      ? r.apply(
          Math,
          n.map(function (n) {
            return n[t];
          })
        )
      : e[t];
  }
  function x(t) {
    var e,
      r,
      a,
      o,
      s = i(O, t),
      c = i($, t),
      l =
        ((r = t.targets),
        (a = v(r)).map(function (t, n) {
          return { target: t, id: n, total: a.length };
        })),
      d = [],
      p = u(s, c);
    for (e in t)
      p.hasOwnProperty(e) ||
        'targets' === e ||
        d.push({ name: e, offset: p.offset, tweens: y(t[e], c) });
    return (
      (o = d),
      u(s, {
        animatables: l,
        animations: (t = n(
          l.map(function (t) {
            return o.map(function (n) {
              var e = f(t.target, n.name);
              if (e) {
                var r = b(n, t);
                n = {
                  type: e,
                  property: n.name,
                  animatable: t,
                  tweens: r,
                  duration: r[r.length - 1].end,
                  delay: r[0].delay,
                };
              } else n = void 0;
              return n;
            });
          })
        ).filter(function (t) {
          return !j.und(t);
        })),
        duration: w('duration', t, c),
        delay: w('delay', t, c),
      })
    );
  }
  function M(t) {
    function n() {
      return (
        window.Promise &&
        new Promise(function (t) {
          return (l = t);
        })
      );
    }
    function e(t) {
      return p.reversed ? p.duration - t : t;
    }
    function r(t) {
      for (var n = 0, e = {}, r = p.animations, a = {}; n < r.length; ) {
        var i = r[n],
          u = i.animatable,
          o = i.tweens;
        (a.tween =
          o.filter(function (n) {
            return t < n.end;
          })[0] || o[o.length - 1]),
          (a.isPath$0 = a.tween.isPath),
          (a.round = a.tween.round),
          (a.eased = a.tween.easing(
            Math.min(
              Math.max(t - a.tween.start - a.tween.delay, 0),
              a.tween.duration
            ) / a.tween.duration,
            a.tween.elasticity
          )),
          (o = g(
            a.tween.to.numbers.map(
              (function (t) {
                return function (n, e) {
                  return (
                    (n =
                      (e = t.isPath$0 ? 0 : t.tween.from.numbers[e]) +
                      t.eased * (n - e)),
                    t.isPath$0 && (n = m(t.tween.value, n)),
                    t.round && (n = Math.round(n * t.round) / t.round),
                    n
                  );
                };
              })(a)
            ),
            a.tween.to.strings
          )),
          F[i.type](u.target, i.property, o, e, u.id),
          (i.currentValue = o),
          n++,
          (a = {
            isPath$0: a.isPath$0,
            tween: a.tween,
            eased: a.eased,
            round: a.round,
          });
      }
      if (e)
        for (var s in e)
          P ||
            (P = c(document.body, 'transform')
              ? 'transform'
              : '-webkit-transform'),
            (p.animatables[s].target.style[P] = e[s].join(' '));
      (p.currentTime = t), (p.progress = (t / p.duration) * 100);
    }
    function a(t) {
      p[t] && p[t](p);
    }
    function i() {
      p.remaining && !0 !== p.remaining && p.remaining--;
    }
    function u(t) {
      var u = p.duration,
        c = p.offset,
        m = p.delay,
        h = p.currentTime,
        g = p.reversed,
        v = e(t);
      if (
        ((v = Math.min(Math.max(v, 0), u)) > c && v < u
          ? (r(v), !p.began && v >= m && ((p.began = !0), a('begin')), a('run'))
          : (v <= c && 0 !== h && (r(0), g && i()),
            v >= u && h !== u && (r(u), g || i())),
        t >= u &&
          (p.remaining
            ? ((s = o),
              'alternate' === p.direction && (p.reversed = !p.reversed))
            : (p.pause(),
              l(),
              (d = n()),
              p.completed || ((p.completed = !0), a('complete'))),
          (f = 0)),
        p.children)
      )
        for (t = p.children, u = 0; u < t.length; u++) t[u].seek(v);
      a('update');
    }
    t = void 0 === t ? {} : t;
    var o,
      s,
      f = 0,
      l = null,
      d = n(),
      p = x(t);
    return (
      (p.reset = function () {
        var t = p.direction,
          n = p.loop;
        (p.currentTime = 0),
          (p.progress = 0),
          (p.paused = !0),
          (p.began = !1),
          (p.completed = !1),
          (p.reversed = 'reverse' === t),
          (p.remaining = 'alternate' === t && 1 === n ? 2 : n);
      }),
      (p.tick = function (t) {
        (o = t), s || (s = o), u((f + o - s) * M.speed);
      }),
      (p.seek = function (t) {
        u(e(t));
      }),
      (p.pause = function () {
        var t = L.indexOf(p);
        -1 < t && L.splice(t, 1), (p.paused = !0);
      }),
      (p.play = function () {
        p.paused &&
          ((p.paused = !1),
          (s = 0),
          (f = p.completed ? 0 : e(p.currentTime)),
          L.push(p),
          T || E());
      }),
      (p.reverse = function () {
        (p.reversed = !p.reversed), (s = 0), (f = e(p.currentTime));
      }),
      (p.restart = function () {
        p.pause(), p.reset(), p.play();
      }),
      (p.finished = d),
      p.reset(),
      p.autoplay && p.play(),
      p
    );
  }
  var P,
    O = {
      update: void 0,
      begin: void 0,
      run: void 0,
      complete: void 0,
      loop: 1,
      direction: 'normal',
      autoplay: !0,
      offset: 0,
    },
    $ = {
      duration: 1e3,
      delay: 0,
      easing: 'easeOutElastic',
      elasticity: 500,
      round: 0,
    },
    A =
      'translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY'.split(
        ' '
      ),
    j = {
      arr: function (t) {
        return Array.isArray(t);
      },
      obj: function (t) {
        return -1 < Object.prototype.toString.call(t).indexOf('Object');
      },
      svg: function (t) {
        return t instanceof SVGElement;
      },
      dom: function (t) {
        return t.nodeType || j.svg(t);
      },
      str: function (t) {
        return 'string' == typeof t;
      },
      fnc: function (t) {
        return 'function' == typeof t;
      },
      und: function (t) {
        return void 0 === t;
      },
      hex: function (t) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
      },
      rgb: function (t) {
        return /^rgb/.test(t);
      },
      hsl: function (t) {
        return /^hsl/.test(t);
      },
      col: function (t) {
        return j.hex(t) || j.rgb(t) || j.hsl(t);
      },
    },
    I = (function () {
      function t(t, n, e) {
        return (((1 - 3 * e + 3 * n) * t + (3 * e - 6 * n)) * t + 3 * n) * t;
      }
      return function (n, e, r, a) {
        if (0 <= n && 1 >= n && 0 <= r && 1 >= r) {
          var i = new Float32Array(11);
          if (n !== e || r !== a)
            for (var u = 0; 11 > u; ++u) i[u] = t(0.1 * u, n, r);
          return function (u) {
            if (n === e && r === a) return u;
            if (0 === u) return 0;
            if (1 === u) return 1;
            for (var o = 0, s = 1; 10 !== s && i[s] <= u; ++s) o += 0.1;
            s = o + ((u - i[--s]) / (i[s + 1] - i[s])) * 0.1;
            var c =
              3 * (1 - 3 * r + 3 * n) * s * s + 2 * (3 * r - 6 * n) * s + 3 * n;
            if (0.001 <= c) {
              for (
                o = 0;
                4 > o &&
                0 !==
                  (c =
                    3 * (1 - 3 * r + 3 * n) * s * s +
                    2 * (3 * r - 6 * n) * s +
                    3 * n);
                ++o
              ) {
                var f = t(s, n, r) - u;
                s = s - f / c;
              }
              u = s;
            } else if (0 === c) u = s;
            else {
              (s = o), (o = o + 0.1);
              var l = 0;
              do {
                (f = s + (o - s) / 2),
                  (c = t(f, n, r) - u),
                  0 < c ? (o = f) : (s = f);
              } while (1e-7 < Math.abs(c) && 10 > ++l);
              u = f;
            }
            return t(u, e, a);
          };
        }
      };
    })(),
    k = (function () {
      function t(t, n) {
        return 0 === t || 1 === t
          ? t
          : -Math.pow(2, 10 * (t - 1)) *
              Math.sin(
                (2 * (t - 1 - (n / (2 * Math.PI)) * Math.asin(1)) * Math.PI) / n
              );
      }
      var n,
        e = 'Quad Cubic Quart Quint Sine Expo Circ Back Elastic'.split(' '),
        r = {
          In: [
            [0.55, 0.085, 0.68, 0.53],
            [0.55, 0.055, 0.675, 0.19],
            [0.895, 0.03, 0.685, 0.22],
            [0.755, 0.05, 0.855, 0.06],
            [0.47, 0, 0.745, 0.715],
            [0.95, 0.05, 0.795, 0.035],
            [0.6, 0.04, 0.98, 0.335],
            [0.6, -0.28, 0.735, 0.045],
            t,
          ],
          Out: [
            [0.25, 0.46, 0.45, 0.94],
            [0.215, 0.61, 0.355, 1],
            [0.165, 0.84, 0.44, 1],
            [0.23, 1, 0.32, 1],
            [0.39, 0.575, 0.565, 1],
            [0.19, 1, 0.22, 1],
            [0.075, 0.82, 0.165, 1],
            [0.175, 0.885, 0.32, 1.275],
            function (n, e) {
              return 1 - t(1 - n, e);
            },
          ],
          InOut: [
            [0.455, 0.03, 0.515, 0.955],
            [0.645, 0.045, 0.355, 1],
            [0.77, 0, 0.175, 1],
            [0.86, 0, 0.07, 1],
            [0.445, 0.05, 0.55, 0.95],
            [1, 0, 0, 1],
            [0.785, 0.135, 0.15, 0.86],
            [0.68, -0.55, 0.265, 1.55],
            function (n, e) {
              return 0.5 > n ? t(2 * n, e) / 2 : 1 - t(-2 * n + 2, e) / 2;
            },
          ],
        },
        a = { linear: I(0.25, 0.25, 0.75, 0.75) },
        i = {};
      for (n in r)
        (i.type = n),
          r[i.type].forEach(
            (function (t) {
              return function (n, r) {
                a['ease' + t.type + e[r]] = j.fnc(n)
                  ? n
                  : I.apply($jscomp$this, n);
              };
            })(i)
          ),
          (i = { type: i.type });
      return a;
    })(),
    F = {
      css: function (t, n, e) {
        return (t.style[n] = e);
      },
      attribute: function (t, n, e) {
        return t.setAttribute(n, e);
      },
      object: function (t, n, e) {
        return (t[n] = e);
      },
      transform: function (t, n, e, r, a) {
        r[a] || (r[a] = []), r[a].push(n + '(' + e + ')');
      },
    },
    L = [],
    T = 0,
    E = (function () {
      function t() {
        T = requestAnimationFrame(n);
      }
      function n(n) {
        var e = L.length;
        if (e) {
          for (var r = 0; r < e; ) L[r] && L[r].tick(n), r++;
          t();
        } else cancelAnimationFrame(T), (T = 0);
      }
      return t;
    })();
  return (
    (M.version = '2.0.1'),
    (M.speed = 1),
    (M.running = L),
    (M.remove = function (t) {
      t = v(t);
      for (var n = L.length - 1; 0 <= n; n--)
        for (var e = L[n], a = e.animations, i = a.length - 1; 0 <= i; i--)
          r(t, a[i].animatable.target) &&
            (a.splice(i, 1), a.length || e.pause());
    }),
    (M.getValue = l),
    (M.path = function (n, e) {
      var r = j.str(n) ? t(n)[0] : n,
        a = e || 100;
      return function (t) {
        return {
          el: r,
          property: t,
          totalLength: r.getTotalLength() * (a / 100),
        };
      };
    }),
    (M.setDashoffset = function (t) {
      var n = t.getTotalLength();
      return t.setAttribute('stroke-dasharray', n), n;
    }),
    (M.bezier = I),
    (M.easings = k),
    (M.timeline = function (t) {
      var n = M(t);
      return (
        (n.duration = 0),
        (n.children = []),
        (n.add = function (t) {
          return (
            e(t).forEach(function (t) {
              var e = t.offset,
                r = n.duration;
              (t.autoplay = !1),
                (t.offset = j.und(e) ? r : d(e, r)),
                (t = M(t)).duration > r && (n.duration = t.duration),
                n.children.push(t);
            }),
            n
          );
        }),
        n
      );
    }),
    (M.random = function (t, n) {
      return Math.floor(Math.random() * (n - t + 1)) + t;
    }),
    M
  );
});

/*! Background shape svg */
{
  setTimeout(() => document.body.classList.add('render'), 10);
  const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
  const total = navdemos.length;
  const current = navdemos.findIndex(el =>
    el.classList.contains('demo--current')
  );
  const navigate = linkEl => {
    document.body.classList.remove('render');
    document.body.addEventListener(
      'transitionend',
      () => (window.location = linkEl.href)
    );
  };
  navdemos.forEach(link =>
    link.addEventListener('click', ev => {
      ev.preventDefault();
      navigate(ev.target);
    })
  );
  document.addEventListener('keydown', ev => {
    const keyCode = ev.keyCode || ev.which;
    let linkEl;
    if (keyCode === 37) {
      linkEl = current > 0 ? navdemos[current - 1] : navdemos[total - 1];
    } else if (keyCode === 39) {
      linkEl = current < total - 1 ? navdemos[current + 1] : navdemos[0];
    } else {
      return false;
    }
    navigate(linkEl);
  });
}
{
  class MorphingBG {
    constructor(el) {
      this.DOM = {};
      this.DOM.el = el;
      this.DOM.paths = Array.from(this.DOM.el.querySelectorAll('path'));
      this.animate();
    }
    animate() {
      this.DOM.paths.forEach(path => {
        setTimeout(() => {
          anime({
            targets: path,
            duration: anime.random(1000, 2000),
            easing: [0.5, 0, 0.5, 1],
            d: path.getAttribute('class'),
            loop: !0,
            direction: 'alternate',
          });
        }, anime.random(0, 1000));
      });
    }
  }
  new MorphingBG(document.querySelector('svg.scene'));
}
