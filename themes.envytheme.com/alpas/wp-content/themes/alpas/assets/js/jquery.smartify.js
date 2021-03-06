! function(a, b, c) {
    var d = a(b),
        e = d,
        f = b.devicePixelRatio || 1,
        g = null,
        h = console && console.log ? function(a, b) {
            console.log(a, b || "")
        } : a.noop;
    a.fn.smartify = function(i) {
        var j = this,
            k = {
                threshold: 0,
                limit_retry: 0,
                event: "scroll",
                effect: "fadeIn",
                container: b,
                src_attr: "sm-src",
                skip_invisible: !0,
                placeholder: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwNTEuMzYyMikiIC8+PC9zdmc+",
                appear: a.noop,
                load: a.noop
            };
        a.extend(k, i || {}), f > 1 && (g = k.src_attr + "-" + (f > 2 ? "3x" : f > 1.5 ? "2x" : "1-5x")), null === g && (g = k.src_attr), e = k.container === c || k.container === b ? d : a(k.container);
        var l = function() {
                var b = 0;
                j.each(function() {
                    var c = a(this);
                    if (!k.skip_invisible || c.is(":visible"))
                        if (a.above_the_top(this, k.threshold) || a.left_of_begin(this, k.threshold));
                        else if (a.below_the_fold(this, k.threshold) || a.right_of_fold(this, k.threshold)) {
                        if (++b > k.limit_retry) return !1
                    } else c.trigger("appear"), b = 0
                })
            },
            m = function() {
                var b = a.grep(j, function(a) {
                    return !(a.loaded || a.no_src_attr)
                });
                j = a(b)
            },
            n = function(a) {
                var b = a.data("toggle-class"),
                    c = a.data("add-class"),
                    d = a.data("remove-class");
                b && a.toggleClass(b), d && a.toggleClass(d), c && a.toggleClass(c)
            },
            o = function(b, c, d) {
                var e = a(b),
                    f = a.trim(e.attr(c.src_attr));
                e.attr(g) && (f = a.trim(e.attr(g))), a("<img />").bind("load", function() {
                    e.hide(), e.attr("src", f), e[c.effect](c.effect_speed), b.loaded = !0, d(), c.load(b, j, c)
                }).attr("src", f)
            },
            p = function(b, c, d) {
                var e = a(b),
                    f = a.trim(e.attr(c.src_attr));
                e.attr(g) && (f = a.trim(e.attr(g))), e.on("load", function() {
                    e[c.effect](c.effect_speed), b.loaded = !0, d(), c.load(b, j, c)
                }).attr("src", f)
            },
            q = function(b, c, d) {
                var e = a(b),
                    f = e.attr("href"),
                    g = e.data("do"),
                    h = e.data("target");
                if ("callback()" === h) return n(e), b.loaded = !0, void d();
                if ("parent()" === h ? h = e.parent() : h && (h = a(h)), h.is("iframe")) h.attr(c.src_attr, f), p(h.get(0), c, d), n(h);
                else if (h.is("img")) h.attr(c.src_attr, f), o(h.get(0), c, d), n(h);
                else {
                    var i = {
                        method: "GET",
                        url: f,
                        data: {}
                    };
                    a.ajax(i).done(function(a) {
                        "append" === g ? h.appendChild(a) : h.html(a), h[c.effect](c.effect_speed), n(h), b.loaded = !0, d(), c.load_target_and_smartify && c.elements_selector && h.find(c.elements_selector).smartify(k), c.load(b, j, c, a)
                    }).fail(function(a, d) {
                        c.load(b, j, c, a, d)
                    })
                }
            };
        return 0 === k.event.indexOf("scroll") && e.bind(k.event, function() {
            return l()
        }), this.each(function() {
            var b = this,
                c = a(b),
                d = a.extend({}, k, c.data());
            d.threshold = parseInt(d.threshold), b.loaded = !1, b.no_src_attr = !1;
            var e = a.trim(c.attr("src")) || !1,
                f = a.trim(c.attr(d.src_attr)) || !1,
                g = c.is("a"),
                i = c.is("img"),
                l = c.is("iframe");
            if (c.data("toggle-class") || c.data("add-class") || c.data("remove-class")) {
                var r = d.load;
                d.load = function(a, b, d, e, f) {
                    r(a, b, d, e, f), n(c)
                }
            }
            return !i && !l || e || c.attr("src", d.placeholder), !i && !l || f ? (c.one("appear", function() {
                this.loaded || (d.appear && d.appear(b, j, d), i ? o(b, d, m) : g ? c.data("target") ? q(b, d, m) : h('%cAn Anchor Tag must have defined data-target="" attribute to load response content in!', "color: #ff9900;") : l ? p(b, d, m) : (m(), d.load(b, j, d)))
            }), void(d.event.indexOf("scroll") && c.bind(d.event, function() {
                b.loaded || c.trigger("appear")
            }))) : (h("%cElement has no " + d.src_attr + " defined to load", "color: #ff9900;"), b.no_src_attr = !0, void m())
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && d.bind("pageshow", function(b) {
            b.originalEvent && b.originalEvent.persisted && j.each(function() {
                a(this).trigger("appear")
            })
        }), d.bind("resize orientationchange", l), a(b.document).ready(l), this
    };
    var i = function() {
            return "function" == typeof e.scrollTop ? e.scrollTop() : e.offset().top
        },
        j = function() {
            return "function" == typeof e.scrollLeft ? e.scrollLeft() : e.offset().left
        };
    a.below_the_fold = function(b, c) {
        return e.height() + i() <= a(b).offset().top - c
    }, a.right_of_fold = function(b, c) {
        return e.width() + j() <= a(b).offset().left - c
    }, a.above_the_top = function(b, c) {
        return i() >= a(b).offset().top + c + a(b).height()
    }, a.left_of_begin = function(b, c) {
        return j() >= a(b).offset().left + c + a(b).width()
    }, a.visible_in_viewport = function(b, c) {
        return !(a.right_of_fold(b, c) && a.left_of_begin(b, c) && a.below_the_fold(b, c) && a.above_the_top(b, c))
    }, a.extend(a.expr[":"], {
        "visible-in-viewport": function(b) {
            return a.visible_in_viewport(b, 0)
        },
        "below-the-fold": function(b) {
            return a.below_the_fold(b, 0)
        },
        "above-the-top": function(b) {
            return !a.below_the_fold(b, 0)
        },
        "right-of-screen": function(b) {
            return a.right_of_fold(b, 0)
        },
        "left-of-screen": function(b) {
            return !a.right_of_fold(b, 0)
        }
    }), a.fn.smartify_section = function(b, c) {
        var e = {
            threshold: 0,
            on_trigger: "visible",
            persist_trigger: !1,
            skip_invisible: !0,
            children_selector: ".smartify-children"
        };
        a.extend(e, b || {}), this.each(function() {
            var b = a(this),
                f = a.extend({}, e, b.data()),
                g = b.attr("href");
            g || (g = f.target);
            var h;
            h = g ? a(g).find(f.children_selector) : a(f.children_selector);
            var i = function(a) {
                h.smartify(c), a.target && d.scrollTop(d.scrollTop() + 2)
            };
            "visible" === f.on_trigger ? b.smartify({
                threshold: f.threshold,
                appear: i
            }) : f.on_trigger && (f.persist_trigger ? b.on(f.on_trigger, i) : b.one(f.on_trigger, i))
        })
    }
}(jQuery, window);