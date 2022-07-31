import { ref as v, onMounted as se, computed as ue, watch as b, nextTick as w, openBlock as r, createElementBlock as p, Fragment as x, createElementVNode as m, normalizeClass as S, renderList as B, renderSlot as ie, withDirectives as R, withModifiers as F, vShow as D, withKeys as k, unref as de, createCommentVNode as A, toDisplayString as j, createTextVNode as oe } from "vue";
const re = /* @__PURE__ */ oe(" tags input "), pe = {
  class: "tags-input-root",
  style: { position: "relative" }
}, ce = ["innerHTML"], he = ["onClick"], ve = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], ye = {
  key: 0,
  style: { display: "none" }
}, fe = ["name", "value"], ge = ["textContent"], me = ["innerHTML", "onMouseover", "onMousedown"], Se = ["textContent"], Fe = ["innerHTML", "onMouseover", "onMousedown"], Te = {
  __name: "TagsInput",
  props: {
    elementId: String,
    inputId: String,
    existingTags: {
      type: Array,
      default: () => []
    },
    value: {
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
    "blur"
  ],
  setup(s, { emit: d }) {
    const t = s;
    v(0);
    const u = v([]), c = v(""), I = v(""), z = v(""), i = v([]), o = v(0);
    v(1);
    const C = v(!1), M = v(!1), f = v(), O = v(null);
    se(() => {
      f.value = J(t.existingTags), K(), t.typeaheadAlwaysShow && y(), d("initialized"), addEventListener("click", (e) => {
        e.target !== O.value && g();
      });
    });
    const Q = ue(() => t.hideInputOnLimit && t.limit > 0 && u.value.length >= t.limit || t.disabled);
    b(c.value, (e, a) => {
      y(), e.length && e != a && (e.substring(a.length, e.length), t.addTagsOnSpace && e.endsWith(" ") && (c.value = e.trim(), t.tagFromInput(!0)), t.addTagsOnComma && (e = e.trim(), e.endsWith(",") && (c.value = e.substring(0, e.length - 1), t.tagFromInput(!0))), d("change", e));
    }), b(t.existingTags, (e) => {
      f.value.splice(0), f.value = J(e), y();
    }), b(u.value, () => {
      z.value = JSON.stringify(u.value), d("update:modelValue", u.value);
    }), b(t.value, () => {
      K();
    }), b(t.typeaheadAlwaysShow, (e) => {
      e ? y() : g();
    });
    const T = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), W = (e = !1) => {
      if (!M.value)
        if (i.value.length && o.value >= 0 && !e)
          N(i.value[o.value]), c.value = "";
        else {
          let a = c.value.trim();
          if (!t.onlyExistingTags && a.length && t.validate(a)) {
            c.value = "";
            let l = {
              [t.idField]: "",
              [t.textField]: a
            };
            const n = T(
              t.caseSensitiveTags ? l[t.textField] : l[t.textField].toLowerCase()
            );
            for (let h of f.value) {
              const ne = T(
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
      g(), L(e), w(() => {
        c.value = "", I.value = "";
      });
    }, L = (e, a = !1) => {
      if (!(t.disabled && !a)) {
        if (!t.beforeAddingTag(e))
          return !1;
        if (t.limit > 0 && u.value.length >= t.limit)
          return d("limit-reached"), !1;
        U(e) || (u.value.push(e), w(() => {
          d("tag-added", e), d("tags-updated");
        }));
      }
    }, q = () => {
      !c.value.length && this.deleteOnBackspace && u.value.length && $(u.value.length - 1);
    }, $ = (e) => {
      if (t.disabled)
        return;
      let a = u.value[e];
      if (!beforeRemovingTag(a))
        return !1;
      u.value.splice(e, 1), w(() => {
        d("tag-removed", a), d("tags-updated"), t.typeaheadAlwaysShow && y();
      });
    }, y = () => {
      if (t.typeahead !== !0)
        return !1;
      if (I.value != c.value || !i.value.length && t.typeaheadActivationThreshold == 0 || t.typeaheadAlwaysShow || this.typeaheadShowOnFocus) {
        !typeaheadUrl.value.length && !t.typeaheadCallback && (i.value = []), o.value = 0;
        let e = e.value.trim();
        if (e.length && e.length >= t.typeaheadActivationThreshold || t.typeaheadActivationThreshold == 0 || t.typeaheadAlwaysShow) {
          const a = T(
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
            G(a);
        }
        I.value = e.value;
      }
    }, G = (e) => {
      i.value = [];
      for (let a of f.value) {
        const l = t.caseSensitiveTags ? a[t.textField] : a[t.textField].toLowerCase(), n = i.value.map((h) => h[t.idField]);
        l.search(e) > -1 && !U(a) && !n.includes(a[t.idField]) && i.value.push(a);
      }
      t.sortSearchResults && i.value.sort((a, l) => a[t.textField] < l[t.textField] ? -1 : a[t.textField] > l[t.textField] ? 1 : 0), t.typeaheadMaxResults > 0 && (i.value = i.value.slice(
        0,
        t.typeaheadMaxResults
      ));
    }, X = () => {
      c.value.length || w(() => {
        g();
      });
    }, P = () => {
      o.value + 1 <= i.value.length - 1 && o.value++;
    }, Y = () => {
      o.value > 0 && o.value--;
    }, g = (e = !1) => {
      i.value = [], o.value = 0, t.typeaheadAlwaysShow && w(() => {
        y();
      }), e && O.value.focus();
    }, E = () => {
      u.value.splice(0, u.value.length);
    }, K = () => {
      if (t.value && t.value.length) {
        if (!Array.isArray(t.value)) {
          console.error("Voerro Tags Input: the v-model value must be an array!");
          return;
        }
        let e = t.value;
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
      const a = T(
        t.caseSensitiveTags ? e[t.textField] : e[t.textField].toLowerCase()
      );
      for (let l of u.value) {
        const n = t.caseSensitiveTags ? l[t.textField] : l[t.textField].toLowerCase();
        if (l[t.idField] === e[t.idField] && T(n).length == a.length && n.search(a) > -1)
          return !0;
      }
      return !1;
    }, Z = (e) => {
      d("keyup", e);
    }, V = (e) => {
      d("keydown", e);
    }, _ = (e) => {
      d("focus", e), C.value = !0;
    }, ee = (e) => {
      d("click", e), C.value = !0, y();
    }, te = (e) => {
      d("blur", e), t.addTagsOnBlur && t.tagFromInput(!0), t.typeaheadAlwaysShow ? y() : X(), C.value = !1;
    }, ae = (e) => {
      if (!t.valueFields)
        return JSON.stringify(e);
      const a = t.valueFields.replace(/\s/, "").split(",");
      return a.length === 1 ? e[a[0]] : JSON.stringify(
        Object.assign(
          {},
          ...a.map((l) => ({ [l]: e[l] }))
        )
      );
    }, le = (e) => t.displayField !== void 0 && t.displayField !== null && e[t.displayField] !== void 0 && e[t.displayField] !== null && e[t.displayField] !== "" ? e[t.displayField] : e[t.textField], J = (e) => e.map((a) => Object.assign({}, a));
    return (e, a) => (r(), p(x, null, [
      re,
      m("div", pe, [
        m("div", {
          class: S({ [s.wrapperClass + " tags-input"]: !0, active: C.value, disabled: s.disabled })
        }, [
          (r(!0), p(x, null, B(u.value, (l, n) => (r(), p("span", {
            key: n,
            class: S(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
          }, [
            ie(e.$slots, "selected-tag", {
              tag: l,
              index: n,
              removeTag: $
            }, () => [
              m("span", {
                innerHTML: l[s.textField]
              }, null, 8, ce),
              R(m("a", {
                href: "#",
                class: "tags-input-remove",
                onClick: F((h) => $(n), ["prevent"])
              }, null, 8, he), [
                [D, !s.disabled]
              ])
            ])
          ], 2))), 128)),
          R(m("input", {
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
              a[3] || (a[3] = k(F((l) => W(!1), ["prevent"]), ["enter"])),
              k(q, ["8"]),
              k(P, ["down"]),
              k(Y, ["up"]),
              V
            ],
            onKeyup: [
              Z,
              k(g, ["esc"])
            ],
            onFocus: _,
            onClick: ee,
            onBlur: te,
            onValue: a[4] || (a[4] = (...l) => u.value && u.value(...l))
          }, null, 40, ve), [
            [D, !de(Q)]
          ]),
          s.elementId ? (r(), p("div", ye, [
            (r(!0), p(x, null, B(u.value, (l, n) => (r(), p("input", {
              key: n,
              type: "hidden",
              name: `${s.elementId}[]`,
              value: ae(l)
            }, null, 8, fe))), 128))
          ])) : A("", !0)
        ], 2),
        R(m("div", null, [
          s.typeaheadStyle === "badges" ? (r(), p("p", {
            key: 0,
            class: S(`typeahead-${s.typeaheadStyle}`)
          }, [
            s.typeaheadHideDiscard ? A("", !0) : (r(), p("span", {
              key: 0,
              class: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",
              onClick: a[5] || (a[5] = F((l) => g(!0), ["prevent"])),
              textContent: j(s.discardSearchText)
            }, null, 8, ge)),
            (r(!0), p(x, null, B(i.value, (l, n) => (r(), p("span", {
              key: n,
              innerHTML: l[s.textField],
              onMouseover: (h) => o.value = n,
              onMousedown: F((h) => H(l), ["prevent"]),
              class: S(["tags-input-badge", {
                "tags-input-typeahead-item-default": n != o.value,
                "tags-input-typeahead-item-highlighted-default": n == o.value
              }])
            }, null, 42, me))), 128))
          ], 2)) : s.typeaheadStyle === "dropdown" ? (r(), p("ul", {
            key: 1,
            class: S(`typeahead-${s.typeaheadStyle}`)
          }, [
            s.typeaheadHideDiscard ? A("", !0) : (r(), p("li", {
              key: 0,
              class: "tags-input-typeahead-item-default typeahead-hide-btn",
              onClick: a[6] || (a[6] = F((l) => g(!0), ["prevent"])),
              textContent: j(s.discardSearchText)
            }, null, 8, Se)),
            (r(!0), p(x, null, B(i.value, (l, n) => (r(), p("li", {
              key: n,
              innerHTML: le(l),
              onMouseover: (h) => o.value = n,
              onMousedown: F((h) => H(l), ["prevent"]),
              class: S({
                "tags-input-typeahead-item-default": n != o.value,
                "tags-input-typeahead-item-highlighted-default": n == o.value
              })
            }, null, 42, Fe))), 128))
          ], 2)) : A("", !0)
        ], 512), [
          [D, i.value.length]
        ])
      ])
    ], 64));
  }
}, we = {
  install: (s, d) => {
    s.component("TagsInput", Te);
  }
};
export {
  we as default
};
