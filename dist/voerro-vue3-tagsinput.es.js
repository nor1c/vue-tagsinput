import { ref as y, onMounted as se, computed as ue, watch as T, nextTick as b, openBlock as o, createElementBlock as r, createElementVNode as w, normalizeClass as m, Fragment as C, renderList as A, renderSlot as ie, withDirectives as R, withModifiers as S, vShow as D, withKeys as k, unref as de, createCommentVNode as B, toDisplayString as J } from "vue";
const oe = {
  class: "tags-input-root",
  style: { position: "relative" }
}, re = ["innerHTML"], pe = ["onClick"], ce = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], he = {
  key: 0,
  style: { display: "none" }
}, ye = ["name", "value"], ve = ["textContent"], fe = ["innerHTML", "onMouseover", "onMousedown"], ge = ["textContent"], me = ["innerHTML", "onMouseover", "onMousedown"], Se = {
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
    const t = s;
    y(0);
    const u = y([]), c = y(""), I = y(""), j = y(""), i = y([]), d = y(0);
    y(1);
    const x = y(!1), M = y(!1), f = y(), O = y(null);
    se(() => {
      f.value = V(t.existingTags), K(), t.typeaheadAlwaysShow && v(), p("initialized"), addEventListener("click", (e) => {
        e.target !== O.value && g();
      });
    });
    const z = ue(() => t.hideInputOnLimit && t.limit > 0 && u.value.length >= t.limit || t.disabled);
    T(c.value, (e, a) => {
      v(), e.length && e != a && (e.substring(a.length, e.length), t.addTagsOnSpace && e.endsWith(" ") && (c.value = e.trim(), t.tagFromInput(!0)), t.addTagsOnComma && (e = e.trim(), e.endsWith(",") && (c.value = e.substring(0, e.length - 1), t.tagFromInput(!0))), p("change", e));
    }), T(t.existingTags, (e) => {
      f.value.splice(0), f.value = V(e), v();
    }), T(u.value, () => {
      j.value = JSON.stringify(u.value), p("update:modelValue", u.value);
    }), T(t.modelValue, () => {
      K();
    }), T(t.typeaheadAlwaysShow, (e) => {
      e ? v() : g();
    });
    const F = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Q = (e = !1) => {
      if (!M.value)
        if (i.value.length && d.value >= 0 && !e)
          N(i.value[d.value]), c.value = "";
        else {
          let a = c.value.trim();
          if (!t.onlyExistingTags && a.length && t.validate(a)) {
            c.value = "";
            let l = {
              [t.idField]: "",
              [t.textField]: a
            };
            const n = F(
              t.caseSensitiveTags ? l[t.textField] : l[t.textField].toLowerCase()
            );
            for (let h of f.value) {
              const ne = F(
                t.caseSensitiveTags ? h[t.textField] : h[t.textField].toLowerCase()
              );
              if (n === ne) {
                l = Object.assign({}, h);
                break;
              }
            }
            L(l);
          }
        }
    }, H = (e) => {
      N(e), O.value.blur();
    }, N = (e) => {
      g(), L(e), b(() => {
        c.value = "", I.value = "";
      });
    }, L = (e, a = !1) => {
      if (!(t.disabled && !a)) {
        if (!t.beforeAddingTag(e))
          return !1;
        if (t.limit > 0 && u.value.length >= t.limit)
          return p("limit-reached"), !1;
        U(e) || (u.value.push(e), b(() => {
          p("tag-added", e), p("tags-updated");
        }));
      }
    }, W = () => {
      !c.value.length && this.deleteOnBackspace && u.value.length && $(u.value.length - 1);
    }, $ = (e) => {
      if (t.disabled)
        return;
      let a = u.value[e];
      if (!beforeRemovingTag(a))
        return !1;
      u.value.splice(e, 1), b(() => {
        p("tag-removed", a), p("tags-updated"), t.typeaheadAlwaysShow && v();
      });
    }, v = () => {
      if (t.typeahead !== !0)
        return !1;
      if (I.value != c.value || !i.value.length && t.typeaheadActivationThreshold == 0 || t.typeaheadAlwaysShow || this.typeaheadShowOnFocus) {
        !typeaheadUrl.value.length && !t.typeaheadCallback && (i.value = []), d.value = 0;
        let e = e.value.trim();
        if (e.length && e.length >= t.typeaheadActivationThreshold || t.typeaheadActivationThreshold == 0 || t.typeaheadAlwaysShow) {
          const a = F(
            t.caseSensitiveTags ? e : e.toLowerCase()
          );
          if (t.typeaheadCallback)
            t.typeaheadCallback(a).then((l) => {
              f.value = l;
            });
          else if (typeaheadUrl.value.length > 0) {
            f.value.splice(0);
            const l = new XMLHttpRequest(), n = this;
            l.onreadystatechange = function() {
              console.log([readyState, status]), this.readyState == 4 && this.status == 200 && (n.typeaheadTags = JSON.parse(l.responseText), n.doSearch(a));
            };
            const h = typeaheadUrl.value.replace(":search", a);
            l.open("GET", h, !0), l.send();
          } else
            q(a);
        }
        I.value = e.value;
      }
    }, q = (e) => {
      i.value = [];
      for (let a of f.value) {
        const l = t.caseSensitiveTags ? a[t.textField] : a[t.textField].toLowerCase(), n = i.value.map((h) => h[t.idField]);
        l.search(e) > -1 && !U(a) && !n.includes(a[t.idField]) && i.value.push(a);
      }
      t.sortSearchResults && i.value.sort((a, l) => a[t.textField] < l[t.textField] ? -1 : a[t.textField] > l[t.textField] ? 1 : 0), t.typeaheadMaxResults > 0 && (i.value = i.value.slice(
        0,
        t.typeaheadMaxResults
      ));
    }, G = () => {
      c.value.length || b(() => {
        g();
      });
    }, X = () => {
      d.value + 1 <= i.value.length - 1 && d.value++;
    }, P = () => {
      d.value > 0 && d.value--;
    }, g = (e = !1) => {
      i.value = [], d.value = 0, t.typeaheadAlwaysShow && b(() => {
        v();
      }), e && O.value.focus();
    }, E = () => {
      u.value.splice(0, u.value.length);
    }, K = () => {
      if (t.modelValue && t.modelValue.length) {
        if (!Array.isArray(t.modelValue)) {
          console.error("Voerro Tags Input: the v-model value must be an array!");
          return;
        }
        let e = t.modelValue;
        if (e.value == e)
          return;
        E();
        for (let a of e)
          L(a, !0);
      } else {
        if (u.value.length == 0)
          return;
        E();
      }
    }, U = (e) => {
      if (t.allowDuplicates || !e)
        return !1;
      const a = F(
        t.caseSensitiveTags ? e[t.textField] : e[t.textField].toLowerCase()
      );
      for (let l of u.value) {
        const n = t.caseSensitiveTags ? l[t.textField] : l[t.textField].toLowerCase();
        if (l[t.idField] === e[t.idField] && F(n).length == a.length && n.search(a) > -1)
          return !0;
      }
      return !1;
    }, Y = (e) => {
      p("keyup", e);
    }, Z = (e) => {
      p("keydown", e);
    }, _ = (e) => {
      p("focus", e), x.value = !0;
    }, ee = (e) => {
      p("click", e), x.value = !0, v();
    }, te = (e) => {
      p("blur", e), t.addTagsOnBlur && t.tagFromInput(!0), t.typeaheadAlwaysShow ? v() : G(), x.value = !1;
    }, ae = (e) => {
      if (!t.modelValueFields)
        return JSON.stringify(e);
      const a = t.modelValueFields.replace(/\s/, "").split(",");
      return a.length === 1 ? e[a[0]] : JSON.stringify(
        Object.assign(
          {},
          ...a.map((l) => ({ [l]: e[l] }))
        )
      );
    }, le = (e) => t.displayField !== void 0 && t.displayField !== null && e[t.displayField] !== void 0 && e[t.displayField] !== null && e[t.displayField] !== "" ? e[t.displayField] : e[t.textField], V = (e) => e.map((a) => Object.assign({}, a));
    return (e, a) => (o(), r("div", oe, [
      w("div", {
        class: m({ [s.wrapperClass + " tags-input"]: !0, active: x.value, disabled: s.disabled })
      }, [
        (o(!0), r(C, null, A(u.value, (l, n) => (o(), r("span", {
          key: n,
          class: m(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
        }, [
          ie(e.$slots, "selected-tag", {
            tag: l,
            index: n,
            removeTag: $
          }, () => [
            w("span", {
              innerHTML: l[s.textField]
            }, null, 8, re),
            R(w("a", {
              href: "#",
              class: "tags-input-remove",
              onClick: S((h) => $(n), ["prevent"])
            }, null, 8, pe), [
              [D, !s.disabled]
            ])
          ])
        ], 2))), 128)),
        R(w("input", {
          type: "text",
          ref: "taginput",
          id: s.inputId,
          name: s.inputId,
          placeholder: s.placeholder,
          value: c.value,
          onInput: a[0] || (a[0] = (l) => c.value = l.target.value),
          onCompositionstart: a[1] || (a[1] = (l) => M.value = !0),
          onCompositionend: a[2] || (a[2] = (l) => M.value = !1),
          onKeydown: [
            a[3] || (a[3] = k(S((l) => Q(!1), ["prevent"]), ["enter"])),
            k(W, ["8"]),
            k(X, ["down"]),
            k(P, ["up"]),
            Z
          ],
          onKeyup: [
            Y,
            k(g, ["esc"])
          ],
          onFocus: _,
          onClick: ee,
          onBlur: te,
          onValue: a[4] || (a[4] = (...l) => u.value && u.value(...l))
        }, null, 40, ce), [
          [D, !de(z)]
        ]),
        s.elementId ? (o(), r("div", he, [
          (o(!0), r(C, null, A(u.value, (l, n) => (o(), r("input", {
            key: n,
            type: "hidden",
            name: `${s.elementId}[]`,
            value: ae(l)
          }, null, 8, ye))), 128))
        ])) : B("", !0)
      ], 2),
      R(w("div", null, [
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
            onMouseover: (h) => d.value = n,
            onMousedown: S((h) => H(l), ["prevent"]),
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
            onMouseover: (h) => d.value = n,
            onMousedown: S((h) => H(l), ["prevent"]),
            class: m({
              "tags-input-typeahead-item-default": n != d.value,
              "tags-input-typeahead-item-highlighted-default": n == d.value
            })
          }, null, 42, me))), 128))
        ], 2)) : B("", !0)
      ], 512), [
        [D, i.value.length]
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
