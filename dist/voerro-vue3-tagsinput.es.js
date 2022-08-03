import { ref as y, onMounted as se, computed as ue, watch as x, nextTick as T, openBlock as o, createElementBlock as r, createElementVNode as w, normalizeClass as m, Fragment as C, renderList as A, renderSlot as ie, withDirectives as $, withModifiers as S, vShow as R, withKeys as b, unref as de, createCommentVNode as B, toDisplayString as J } from "vue";
const oe = {
  class: "tags-input-root",
  style: { position: "relative" }
}, re = ["innerHTML"], pe = ["onClick"], ce = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], ye = {
  key: 0,
  style: { display: "none" }
}, he = ["name", "value"], ve = ["textContent"], fe = ["innerHTML", "onMouseover", "onMousedown"], ge = ["textContent"], me = ["innerHTML", "onMouseover", "onMousedown"], Se = {
  __name: "TagsInput",
  props: {
    elementId: String,
    inputId: String,
    existingTags: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    idField: {
      type: String,
      default: "key"
    },
    textField: {
      type: String,
      default: "value"
    },
    displayField: {
      type: String,
      default: null
    },
    valueFields: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    typeahead: {
      type: Boolean,
      default: !1
    },
    typeaheadStyle: {
      type: String,
      default: "badges"
    },
    typeaheadActivationThreshold: {
      type: Number,
      default: 1
    },
    typeaheadMaxResults: {
      type: Number,
      default: 0
    },
    typeaheadAlwaysShow: {
      type: Boolean,
      default: !1
    },
    typeaheadShowOnFocus: {
      type: Boolean,
      default: !0
    },
    typeaheadHideDiscard: {
      type: Boolean,
      default: !1
    },
    typeaheadUrl: {
      type: String,
      default: ""
    },
    typeaheadCallback: {
      type: Function,
      default: null
    },
    placeholder: {
      type: String,
      default: "Add a tag"
    },
    discardSearchText: {
      type: String,
      default: "Discard Search Results"
    },
    limit: {
      type: Number,
      default: 0
    },
    hideInputOnLimit: {
      type: Boolean,
      default: !1
    },
    onlyExistingTags: {
      type: Boolean,
      default: !1
    },
    deleteOnBackspace: {
      type: Boolean,
      default: !0
    },
    allowDuplicates: {
      type: Boolean,
      default: !1
    },
    validate: {
      type: Function,
      default: () => !0
    },
    addTagsOnComma: {
      type: Boolean,
      default: !1
    },
    addTagsOnSpace: {
      type: Boolean,
      default: !1
    },
    addTagsOnBlur: {
      type: Boolean,
      default: !1
    },
    wrapperClass: {
      type: String,
      default: "tags-input-wrapper-default"
    },
    sortSearchResults: {
      type: Boolean,
      default: !0
    },
    caseSensitiveTags: {
      type: Boolean,
      default: !1
    },
    beforeAddingTag: {
      type: Function,
      default: () => !0
    },
    beforeRemovingTag: {
      type: Function,
      default: () => !0
    },
    modelValue: {
      type: Array,
      default: []
    }
  },
  emits: [
    "initialized",
    "change",
    "input",
    "limit-reached",
    "tag-added",
    "tags-updated",
    "tag-removed",
    "tags-updated",
    "keyup",
    "keydown",
    "focus",
    "click",
    "blur",
    "update:modelValue",
    "onUpdate:modelValue"
  ],
  setup(s, { emit: p }) {
    const e = s;
    y(0);
    const u = y([]), h = y(""), I = y(""), j = y(""), i = y([]), d = y(0);
    y(1);
    const k = y(!1), M = y(!1), v = y(), L = y(null);
    se(() => {
      v.value = U(e.existingTags), E(), e.typeaheadAlwaysShow && f(), p("initialized"), addEventListener("click", (t) => {
        t.target !== L.value && g();
      });
    });
    const z = ue(() => e.hideInputOnLimit && e.limit > 0 && u.value.length >= e.limit || e.disabled);
    x(e.existingTags, (t) => {
      v.value.splice(0), v.value = U(t), f();
    }), x(u.value, () => {
      j.value = JSON.stringify(u.value), p("update:modelValue", u.value);
    }), x(e.modelValue, () => {
      E();
    }), x(e.typeaheadAlwaysShow, (t) => {
      t ? f() : g();
    });
    const F = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Q = (t = !1) => {
      if (!M.value)
        if (i.value.length && d.value >= 0 && !t)
          H(i.value[d.value]), h.value = "";
        else {
          let a = h.value.trim();
          if (!e.onlyExistingTags && a.length && e.validate(a)) {
            h.value = "";
            let l = {
              [e.idField]: "",
              [e.textField]: a
            };
            const n = F(
              e.caseSensitiveTags ? l[e.textField] : l[e.textField].toLowerCase()
            );
            for (let c of v.value) {
              const ne = F(
                e.caseSensitiveTags ? c[e.textField] : c[e.textField].toLowerCase()
              );
              if (n === ne) {
                l = Object.assign({}, c);
                break;
              }
            }
            O(l);
          }
        }
    }, D = (t) => {
      H(t), L.value.blur();
    }, H = (t) => {
      g(), O(t), T(() => {
        h.value = "", I.value = "";
      });
    }, O = (t, a = !1) => {
      if (!(e.disabled && !a)) {
        if (!e.beforeAddingTag(t))
          return !1;
        if (e.limit > 0 && u.value.length >= e.limit)
          return p("limit-reached"), !1;
        K(t) || (u.value.push(t), T(() => {
          p("tag-added", t), p("tags-updated");
        }));
      }
    }, q = () => {
      !h.value.length && this.deleteOnBackspace && u.value.length && V(u.value.length - 1);
    }, V = (t) => {
      if (e.disabled)
        return;
      let a = u.value[t];
      if (!beforeRemovingTag(a))
        return !1;
      u.value.splice(t, 1), T(() => {
        p("tag-removed", a), p("tags-updated"), e.typeaheadAlwaysShow && f();
      });
    }, f = () => {
      if (e.typeahead !== !0)
        return !1;
      if (I.value != h.value || !i.value.length && e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow || e.typeaheadShowOnFocus) {
        !e.typeaheadUrl.length && !e.typeaheadCallback && (i.value = []), d.value = 0;
        let t = h.value.trim();
        if (t.length && t.length >= e.typeaheadActivationThreshold || e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow) {
          const a = F(
            e.caseSensitiveTags ? t : t.toLowerCase()
          );
          if (e.typeaheadCallback)
            e.typeaheadCallback(a).then((l) => {
              v.value = l;
            });
          else if (e.typeaheadUrl.length > 0) {
            v.value.splice(0);
            const l = new XMLHttpRequest(), n = this;
            l.onreadystatechange = function() {
              console.log([readyState, status]), this.readyState == 4 && this.status == 200 && (n.typeaheadTags = JSON.parse(l.responseText), n.doSearch(a));
            };
            const c = e.typeaheadUrl.replace(":search", a);
            l.open("GET", c, !0), l.send();
          } else
            G(a);
        }
        I.value = h.value;
      }
    }, G = (t) => {
      i.value = [];
      for (let a of v.value) {
        const l = e.caseSensitiveTags ? a[e.textField] : a[e.textField].toLowerCase(), n = i.value.map((c) => c[e.idField]);
        l.search(t) > -1 && !K(a) && !n.includes(a[e.idField]) && i.value.push(a);
      }
      e.sortSearchResults && i.value.sort((a, l) => a[e.textField] < l[e.textField] ? -1 : a[e.textField] > l[e.textField] ? 1 : 0), e.typeaheadMaxResults > 0 && (i.value = i.value.slice(
        0,
        e.typeaheadMaxResults
      ));
    }, X = () => {
      h.value.length || T(() => {
        g();
      });
    }, P = () => {
      d.value + 1 <= i.value.length - 1 && d.value++;
    }, W = () => {
      d.value > 0 && d.value--;
    }, g = (t = !1) => {
      i.value = [], d.value = 0, e.typeaheadAlwaysShow && T(() => {
        f();
      }), t && L.value.focus();
    }, N = () => {
      u.value.splice(0, u.value.length);
    }, E = () => {
      if (e.modelValue && e.modelValue.length) {
        if (!Array.isArray(e.modelValue)) {
          console.error("Voerro Tags Input: the v-model value must be an array!");
          return;
        }
        let t = e.modelValue;
        if (t.value == t)
          return;
        N();
        for (let a of t)
          O(a, !0);
      } else {
        if (u.value.length == 0)
          return;
        N();
      }
    }, K = (t) => {
      if (e.allowDuplicates || !t)
        return !1;
      const a = F(
        e.caseSensitiveTags ? t[e.textField] : t[e.textField].toLowerCase()
      );
      for (let l of u.value) {
        const n = e.caseSensitiveTags ? l[e.textField] : l[e.textField].toLowerCase();
        if (l[e.idField] === t[e.idField] && F(n).length == a.length && n.search(a) > -1)
          return !0;
      }
      return !1;
    }, Y = (t) => {
      p("keyup", t);
    }, Z = (t) => {
      p("keydown", t);
    }, _ = (t) => {
      p("focus", t), k.value = !0;
    }, ee = (t) => {
      p("click", t), k.value = !0, f();
    }, te = (t) => {
      p("blur", t), e.addTagsOnBlur && e.tagFromInput(!0), e.typeaheadAlwaysShow ? f() : X(), k.value = !1;
    }, ae = (t) => {
      if (!e.modelValueFields)
        return JSON.stringify(t);
      const a = e.modelValueFields.replace(/\s/, "").split(",");
      return a.length === 1 ? t[a[0]] : JSON.stringify(
        Object.assign(
          {},
          ...a.map((l) => ({ [l]: t[l] }))
        )
      );
    }, le = (t) => e.displayField !== void 0 && e.displayField !== null && t[e.displayField] !== void 0 && t[e.displayField] !== null && t[e.displayField] !== "" ? t[e.displayField] : t[e.textField], U = (t) => t.map((a) => Object.assign({}, a));
    return (t, a) => (o(), r("div", oe, [
      w("div", {
        class: m({ [s.wrapperClass + " tags-input"]: !0, active: k.value, disabled: s.disabled })
      }, [
        (o(!0), r(C, null, A(u.value, (l, n) => (o(), r("span", {
          key: n,
          class: m(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
        }, [
          ie(t.$slots, "selected-tag", {
            tag: l,
            index: n,
            removeTag: V
          }, () => [
            w("span", {
              innerHTML: l[s.textField]
            }, null, 8, re),
            $(w("a", {
              href: "#",
              class: "tags-input-remove",
              onClick: S((c) => V(n), ["prevent"])
            }, null, 8, pe), [
              [R, !s.disabled]
            ])
          ])
        ], 2))), 128)),
        $(w("input", {
          type: "text",
          ref: "taginput",
          id: s.inputId,
          name: s.inputId,
          placeholder: s.placeholder,
          value: h.value,
          onInput: a[0] || (a[0] = (l) => h.value = l.target.value),
          onCompositionstart: a[1] || (a[1] = (l) => M.value = !0),
          onCompositionend: a[2] || (a[2] = (l) => M.value = !1),
          onKeydown: [
            a[3] || (a[3] = b(S((l) => Q(!1), ["prevent"]), ["enter"])),
            b(q, ["8"]),
            b(P, ["down"]),
            b(W, ["up"]),
            Z
          ],
          onKeyup: [
            Y,
            b(g, ["esc"])
          ],
          onFocus: _,
          onClick: ee,
          onBlur: te,
          onValue: a[4] || (a[4] = (...l) => u.value && u.value(...l))
        }, null, 40, ce), [
          [R, !de(z)]
        ]),
        s.elementId ? (o(), r("div", ye, [
          (o(!0), r(C, null, A(u.value, (l, n) => (o(), r("input", {
            key: n,
            type: "hidden",
            name: `${s.elementId}[]`,
            value: ae(l)
          }, null, 8, he))), 128))
        ])) : B("", !0)
      ], 2),
      $(w("div", null, [
        s.typeaheadStyle === "badges" ? (o(), r("p", {
          key: 0,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? B("", !0) : (o(), r("span", {
            key: 0,
            class: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",
            onClick: a[5] || (a[5] = S((l) => g(!0), ["prevent"])),
            textContent: J(s.discardSearchText)
          }, null, 8, ve)),
          (o(!0), r(C, null, A(i.value, (l, n) => (o(), r("span", {
            key: n,
            innerHTML: l[s.textField],
            onMouseover: (c) => d.value = n,
            onMousedown: S((c) => D(l), ["prevent"]),
            class: m(["tags-input-badge", {
              "tags-input-typeahead-item-default": n != d.value,
              "tags-input-typeahead-item-highlighted-default": n == d.value
            }])
          }, null, 42, fe))), 128))
        ], 2)) : s.typeaheadStyle === "dropdown" ? (o(), r("ul", {
          key: 1,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? B("", !0) : (o(), r("li", {
            key: 0,
            class: "tags-input-typeahead-item-default typeahead-hide-btn",
            onClick: a[6] || (a[6] = S((l) => g(!0), ["prevent"])),
            textContent: J(s.discardSearchText)
          }, null, 8, ge)),
          (o(!0), r(C, null, A(i.value, (l, n) => (o(), r("li", {
            key: n,
            innerHTML: le(l),
            onMouseover: (c) => d.value = n,
            onMousedown: S((c) => D(l), ["prevent"]),
            class: m({
              "tags-input-typeahead-item-default": n != d.value,
              "tags-input-typeahead-item-highlighted-default": n == d.value
            })
          }, null, 42, me))), 128))
        ], 2)) : B("", !0)
      ], 512), [
        [R, i.value.length]
      ])
    ]));
  }
}, Te = {
  install: (s) => {
    s.component("TagsInput", Se);
  }
};
export {
  Se as TagsInput,
  Te as default
};
