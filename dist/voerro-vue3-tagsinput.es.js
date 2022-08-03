import { ref as h, onMounted as se, computed as ue, watch as T, nextTick as b, openBlock as r, createElementBlock as p, createElementVNode as w, normalizeClass as m, Fragment as C, renderList as I, renderSlot as ie, withDirectives as R, withModifiers as S, vShow as D, withKeys as k, unref as de, createCommentVNode as A, toDisplayString as j } from "vue";
const oe = {
  class: "tags-input-root",
  style: { position: "relative" }
}, re = ["innerHTML"], pe = ["onClick"], ce = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], he = {
  key: 0,
  style: { display: "none" }
}, ye = ["name", "value"], fe = ["textContent"], ve = ["innerHTML", "onMouseover", "onMousedown"], ge = ["textContent"], me = ["innerHTML", "onMouseover", "onMousedown"], Se = {
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
  setup(s, { emit: c }) {
    const e = s;
    h(0);
    const u = h([]), d = h(""), B = h(""), z = h(""), i = h([]), o = h(0);
    h(1);
    const x = h(!1), M = h(!1), f = h(), O = h(null);
    se(() => {
      f.value = J(e.existingTags), U(), e.typeaheadAlwaysShow && v(), c("initialized"), addEventListener("click", (t) => {
        t.target !== O.value && g();
      });
    });
    const Q = ue(() => e.hideInputOnLimit && e.limit > 0 && u.value.length >= e.limit || e.disabled);
    T(d, (t, a) => {
      v(), t.length && t != a && (t.substring(a.length, t.length), e.addTagsOnSpace && t.endsWith(" ") && (d.value = t.trim(), e.tagFromInput(!0)), e.addTagsOnComma && (t = t.trim(), t.endsWith(",") && (d.value = t.substring(0, t.length - 1), e.tagFromInput(!0))), c("change", t));
    }), T(e.existingTags, (t) => {
      f.value.splice(0), f.value = J(t), v();
    }), T(u, () => {
      z.value = JSON.stringify(u.value), c("update:modelValue", u.value);
    }), T(e.modelValue, () => {
      U();
    }), T(e.typeaheadAlwaysShow, (t) => {
      t ? v() : g();
    });
    const F = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), W = (t = !1) => {
      if (!M.value)
        if (i.value.length && o.value >= 0 && !t)
          N(i.value[o.value]), d.value = "";
        else {
          let a = d.value.trim();
          if (!e.onlyExistingTags && a.length && e.validate(a)) {
            d.value = "";
            let l = {
              [e.idField]: "",
              [e.textField]: a
            };
            const n = F(
              e.caseSensitiveTags ? l[e.textField] : l[e.textField].toLowerCase()
            );
            for (let y of f.value) {
              const ne = F(
                e.caseSensitiveTags ? y[e.textField] : y[e.textField].toLowerCase()
              );
              if (n === ne) {
                l = Object.assign({}, y);
                break;
              }
            }
            L(l);
          }
        }
    }, H = (t) => {
      N(t), O.value.blur();
    }, N = (t) => {
      g(), L(t), b(() => {
        d.value = "", B.value = "";
      });
    }, L = (t, a = !1) => {
      if (!(e.disabled && !a)) {
        if (!e.beforeAddingTag(t))
          return !1;
        if (e.limit > 0 && u.value.length >= e.limit)
          return c("limit-reached"), !1;
        V(t) || (u.value.push(t), b(() => {
          c("tag-added", t), c("tags-updated");
        }));
      }
    }, q = () => {
      !d.value.length && e.deleteOnBackspace && u.value.length && $(u.value.length - 1);
    }, $ = (t) => {
      if (e.disabled)
        return;
      let a = u.value[t];
      if (!beforeRemovingTag(a))
        return !1;
      u.value.splice(t, 1), b(() => {
        c("tag-removed", a), c("tags-updated"), e.typeaheadAlwaysShow && v();
      });
    }, v = () => {
      if (e.typeahead !== !0)
        return !1;
      if (B.value != d.value || !i.value.length && e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow || e.typeaheadShowOnFocus) {
        !e.typeaheadUrl.length && !e.typeaheadCallback && (i.value = []), o.value = 0;
        let t = d.value.trim();
        if (t.length && t.length >= e.typeaheadActivationThreshold || e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow) {
          const a = F(
            e.caseSensitiveTags ? t : t.toLowerCase()
          );
          if (e.typeaheadCallback)
            e.typeaheadCallback(a).then((l) => {
              f.value = l;
            });
          else if (e.typeaheadUrl.length > 0) {
            f.value.splice(0);
            const l = new XMLHttpRequest();
            l.onreadystatechange = function() {
              this.readyState == 4 && this.status == 200 && (f.value = JSON.parse(l.responseText), E(a));
            };
            const n = e.typeaheadUrl.replace(":search", a);
            l.open("GET", n, !0), l.send();
          } else
            E(a);
        }
        B.value = d.value;
      }
    }, E = (t) => {
      i.value = [];
      for (let a of f.value) {
        const l = e.caseSensitiveTags ? a[e.textField] : a[e.textField].toLowerCase(), n = i.value.map((y) => y[e.idField]);
        l.search(t) > -1 && !V(a) && !n.includes(a[e.idField]) && i.value.push(a);
      }
      e.sortSearchResults && i.value.sort((a, l) => a[e.textField] < l[e.textField] ? -1 : a[e.textField] > l[e.textField] ? 1 : 0), e.typeaheadMaxResults > 0 && (i.value = i.value.slice(
        0,
        e.typeaheadMaxResults
      ));
    }, G = () => {
      d.value.length || b(() => {
        g();
      });
    }, X = () => {
      o.value + 1 <= i.value.length - 1 && o.value++;
    }, P = () => {
      o.value > 0 && o.value--;
    }, g = (t = !1) => {
      i.value = [], o.value = 0, e.typeaheadAlwaysShow && b(() => {
        v();
      }), t && O.value.focus();
    }, K = () => {
      u.value.splice(0, u.value.length);
    }, U = () => {
      if (e.modelValue && e.modelValue.length) {
        if (!Array.isArray(e.modelValue)) {
          console.error("Voerro Tags Input: the v-model value must be an array!");
          return;
        }
        let t = e.modelValue;
        if (t.value == t)
          return;
        K();
        for (let a of t)
          L(a, !0);
      } else {
        if (u.value.length == 0)
          return;
        K();
      }
    }, V = (t) => {
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
      c("keyup", t);
    }, Z = (t) => {
      c("keydown", t);
    }, _ = (t) => {
      c("focus", t), x.value = !0;
    }, ee = (t) => {
      c("click", t), x.value = !0, v();
    }, te = (t) => {
      c("blur", t), e.addTagsOnBlur && e.tagFromInput(!0), e.typeaheadAlwaysShow ? v() : G(), x.value = !1;
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
    }, le = (t) => e.displayField !== void 0 && e.displayField !== null && t[e.displayField] !== void 0 && t[e.displayField] !== null && t[e.displayField] !== "" ? t[e.displayField] : t[e.textField], J = (t) => t.map((a) => Object.assign({}, a));
    return (t, a) => (r(), p("div", oe, [
      w("div", {
        class: m({ [s.wrapperClass + " tags-input"]: !0, active: x.value, disabled: s.disabled })
      }, [
        (r(!0), p(C, null, I(u.value, (l, n) => (r(), p("span", {
          key: n,
          class: m(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
        }, [
          ie(t.$slots, "selected-tag", {
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
              onClick: S((y) => $(n), ["prevent"])
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
          value: d.value,
          onInput: a[0] || (a[0] = (l) => d.value = l.target.value),
          onCompositionstart: a[1] || (a[1] = (l) => M.value = !0),
          onCompositionend: a[2] || (a[2] = (l) => M.value = !1),
          onKeydown: [
            a[3] || (a[3] = k(S((l) => W(!1), ["prevent"]), ["enter"])),
            k(q, ["8"]),
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
          [D, !de(Q)]
        ]),
        s.elementId ? (r(), p("div", he, [
          (r(!0), p(C, null, I(u.value, (l, n) => (r(), p("input", {
            key: n,
            type: "hidden",
            name: `${s.elementId}[]`,
            value: ae(l)
          }, null, 8, ye))), 128))
        ])) : A("", !0)
      ], 2),
      R(w("div", null, [
        s.typeaheadStyle === "badges" ? (r(), p("p", {
          key: 0,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? A("", !0) : (r(), p("span", {
            key: 0,
            class: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",
            onClick: a[5] || (a[5] = S((l) => g(!0), ["prevent"])),
            textContent: j(s.discardSearchText)
          }, null, 8, fe)),
          (r(!0), p(C, null, I(i.value, (l, n) => (r(), p("span", {
            key: n,
            innerHTML: l[s.textField],
            onMouseover: (y) => o.value = n,
            onMousedown: S((y) => H(l), ["prevent"]),
            class: m(["tags-input-badge", {
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            }])
          }, null, 42, ve))), 128))
        ], 2)) : s.typeaheadStyle === "dropdown" ? (r(), p("ul", {
          key: 1,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? A("", !0) : (r(), p("li", {
            key: 0,
            class: "tags-input-typeahead-item-default typeahead-hide-btn",
            onClick: a[6] || (a[6] = S((l) => g(!0), ["prevent"])),
            textContent: j(s.discardSearchText)
          }, null, 8, ge)),
          (r(!0), p(C, null, I(i.value, (l, n) => (r(), p("li", {
            key: n,
            innerHTML: le(l),
            onMouseover: (y) => o.value = n,
            onMousedown: S((y) => H(l), ["prevent"]),
            class: m({
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            })
          }, null, 42, me))), 128))
        ], 2)) : A("", !0)
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
