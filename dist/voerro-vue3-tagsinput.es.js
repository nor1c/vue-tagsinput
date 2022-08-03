import { ref as h, onMounted as se, computed as ue, watch as T, nextTick as b, openBlock as r, createElementBlock as p, createElementVNode as x, normalizeClass as m, Fragment as C, renderList as I, renderSlot as ie, withDirectives as $, withModifiers as S, vShow as D, withKeys as w, unref as de, createTextVNode as oe, toDisplayString as H, createCommentVNode as A } from "vue";
const re = {
  class: "tags-input-root",
  style: { position: "relative" }
}, pe = ["innerHTML"], ce = ["onClick"], he = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], ye = {
  key: 0,
  style: { display: "none" }
}, fe = ["name", "value"], ve = ["textContent"], ge = ["innerHTML", "onMouseover", "onMousedown"], me = ["textContent"], Se = ["innerHTML", "onMouseover", "onMousedown"], Fe = {
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
    const u = h([]), i = h(""), B = h(""), z = h(""), d = h([]), o = h(0);
    h(1);
    const k = h(!1), M = h(!1), f = h(), O = h(null);
    se(() => {
      f.value = j(e.existingTags), V(), e.typeaheadAlwaysShow && v(), c("initialized"), addEventListener("click", (t) => {
        t.target !== O.value && g();
      });
    });
    const Q = ue(() => e.hideInputOnLimit && e.limit > 0 && u.value.length >= e.limit || e.disabled);
    T(i, (t, a) => {
      console.log([t, a]), v(), t.length && t != a && (t.substring(a.length, t.length), e.addTagsOnSpace && t.endsWith(" ") && (i.value = t.trim(), e.tagFromInput(!0)), e.addTagsOnComma && (t = t.trim(), t.endsWith(",") && (i.value = t.substring(0, t.length - 1), e.tagFromInput(!0))), c("change", t));
    }), T(e.existingTags, (t) => {
      f.value.splice(0), f.value = j(t), v();
    }), T(u, () => {
      z.value = JSON.stringify(u.value), c("update:modelValue", u.value);
    }), T(e.modelValue, () => {
      V();
    }), T(e.typeaheadAlwaysShow, (t) => {
      t ? v() : g();
    });
    const F = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), W = (t = !1) => {
      if (!M.value)
        if (d.value.length && o.value >= 0 && !t)
          E(d.value[o.value]), i.value = "";
        else {
          let a = i.value.trim();
          if (!e.onlyExistingTags && a.length && e.validate(a)) {
            i.value = "";
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
    }, N = (t) => {
      E(t), O.value.blur();
    }, E = (t) => {
      g(), L(t), b(() => {
        i.value = "", B.value = "";
      });
    }, L = (t, a = !1) => {
      if (!(e.disabled && !a)) {
        if (!e.beforeAddingTag(t))
          return !1;
        if (e.limit > 0 && u.value.length >= e.limit)
          return c("limit-reached"), !1;
        J(t) || (u.value.push(t), b(() => {
          c("tag-added", t), c("tags-updated");
        }));
      }
    }, q = () => {
      !i.value.length && e.deleteOnBackspace && u.value.length && R(u.value.length - 1);
    }, R = (t) => {
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
      if (console.log(i.value), B.value != i.value || !d.value.length && e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow || e.typeaheadShowOnFocus) {
        !e.typeaheadUrl.length && !e.typeaheadCallback && (d.value = []), o.value = 0;
        let t = i.value.trim();
        if (t.length && t.length >= e.typeaheadActivationThreshold || e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow) {
          const a = F(
            e.caseSensitiveTags ? t : t.toLowerCase()
          );
          if (e.typeaheadCallback)
            e.typeaheadCallback(a).then((l) => {
              f.value = l;
            });
          else if (e.typeaheadUrl.length > 0) {
            console.log("searching tags from API.."), f.value.splice(0);
            const l = new XMLHttpRequest();
            l.onreadystatechange = function() {
              this.readyState == 4 && this.status == 200 && (console.log("typeaheadURL result:", l.responseText), f.value = JSON.parse(l.responseText), K(a));
            };
            const n = e.typeaheadUrl.replace(":search", a);
            l.open("GET", n, !0), l.send();
          } else
            K(a);
        }
        B.value = i.value;
      }
    }, K = (t) => {
      d.value = [];
      for (let a of f.value) {
        const l = e.caseSensitiveTags ? a[e.textField] : a[e.textField].toLowerCase(), n = d.value.map((y) => y[e.idField]);
        l.search(t) > -1 && !J(a) && !n.includes(a[e.idField]) && d.value.push(a);
      }
      e.sortSearchResults && d.value.sort((a, l) => a[e.textField] < l[e.textField] ? -1 : a[e.textField] > l[e.textField] ? 1 : 0), e.typeaheadMaxResults > 0 && (d.value = d.value.slice(
        0,
        e.typeaheadMaxResults
      ));
    }, G = () => {
      i.value.length || b(() => {
        g();
      });
    }, P = () => {
      o.value + 1 <= d.value.length - 1 && o.value++;
    }, X = () => {
      o.value > 0 && o.value--;
    }, g = (t = !1) => {
      d.value = [], o.value = 0, e.typeaheadAlwaysShow && b(() => {
        v();
      }), t && O.value.focus();
    }, U = () => {
      u.value.splice(0, u.value.length);
    }, V = () => {
      if (e.modelValue && e.modelValue.length) {
        if (!Array.isArray(e.modelValue)) {
          console.error("Voerro Tags Input: the v-model value must be an array!");
          return;
        }
        let t = e.modelValue;
        if (t.value == t)
          return;
        U();
        for (let a of t)
          L(a, !0);
      } else {
        if (u.value.length == 0)
          return;
        U();
      }
    }, J = (t) => {
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
      c("focus", t), k.value = !0;
    }, ee = (t) => {
      c("click", t), k.value = !0, v();
    }, te = (t) => {
      c("blur", t), e.addTagsOnBlur && e.tagFromInput(!0), e.typeaheadAlwaysShow ? v() : G(), k.value = !1;
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
    }, le = (t) => e.displayField !== void 0 && e.displayField !== null && t[e.displayField] !== void 0 && t[e.displayField] !== null && t[e.displayField] !== "" ? t[e.displayField] : t[e.textField], j = (t) => t.map((a) => Object.assign({}, a));
    return (t, a) => (r(), p("div", re, [
      x("div", {
        class: m({ [s.wrapperClass + " tags-input"]: !0, active: k.value, disabled: s.disabled })
      }, [
        (r(!0), p(C, null, I(u.value, (l, n) => (r(), p("span", {
          key: n,
          class: m(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
        }, [
          ie(t.$slots, "selected-tag", {
            tag: l,
            index: n,
            removeTag: R
          }, () => [
            x("span", {
              innerHTML: l[s.textField]
            }, null, 8, pe),
            $(x("a", {
              href: "#",
              class: "tags-input-remove",
              onClick: S((y) => R(n), ["prevent"])
            }, null, 8, ce), [
              [D, !s.disabled]
            ])
          ])
        ], 2))), 128)),
        $(x("input", {
          type: "text",
          ref: "taginput",
          id: s.inputId,
          name: s.inputId,
          placeholder: s.placeholder,
          value: i.value,
          onInput: a[0] || (a[0] = (l) => i.value = l.target.value),
          onCompositionstart: a[1] || (a[1] = (l) => M.value = !0),
          onCompositionend: a[2] || (a[2] = (l) => M.value = !1),
          onKeydown: [
            a[3] || (a[3] = w(S((l) => W(!1), ["prevent"]), ["enter"])),
            w(q, ["8"]),
            w(P, ["down"]),
            w(X, ["up"]),
            Z
          ],
          onKeyup: [
            Y,
            w(g, ["esc"])
          ],
          onFocus: _,
          onClick: ee,
          onBlur: te,
          onValue: a[4] || (a[4] = (...l) => u.value && u.value(...l))
        }, null, 40, he), [
          [D, !de(Q)]
        ]),
        oe(" " + H(i.value) + " ", 1),
        s.elementId ? (r(), p("div", ye, [
          (r(!0), p(C, null, I(u.value, (l, n) => (r(), p("input", {
            key: n,
            type: "hidden",
            name: `${s.elementId}[]`,
            value: ae(l)
          }, null, 8, fe))), 128))
        ])) : A("", !0)
      ], 2),
      $(x("div", null, [
        s.typeaheadStyle === "badges" ? (r(), p("p", {
          key: 0,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? A("", !0) : (r(), p("span", {
            key: 0,
            class: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",
            onClick: a[5] || (a[5] = S((l) => g(!0), ["prevent"])),
            textContent: H(s.discardSearchText)
          }, null, 8, ve)),
          (r(!0), p(C, null, I(d.value, (l, n) => (r(), p("span", {
            key: n,
            innerHTML: l[s.textField],
            onMouseover: (y) => o.value = n,
            onMousedown: S((y) => N(l), ["prevent"]),
            class: m(["tags-input-badge", {
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            }])
          }, null, 42, ge))), 128))
        ], 2)) : s.typeaheadStyle === "dropdown" ? (r(), p("ul", {
          key: 1,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? A("", !0) : (r(), p("li", {
            key: 0,
            class: "tags-input-typeahead-item-default typeahead-hide-btn",
            onClick: a[6] || (a[6] = S((l) => g(!0), ["prevent"])),
            textContent: H(s.discardSearchText)
          }, null, 8, me)),
          (r(!0), p(C, null, I(d.value, (l, n) => (r(), p("li", {
            key: n,
            innerHTML: le(l),
            onMouseover: (y) => o.value = n,
            onMousedown: S((y) => N(l), ["prevent"]),
            class: m({
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            })
          }, null, 42, Se))), 128))
        ], 2)) : A("", !0)
      ], 512), [
        [D, d.value.length]
      ])
    ]));
  }
}, be = {
  install: (s) => {
    s.component("TagsInput", Fe);
  }
};
export {
  Fe as TagsInput,
  be as default
};
