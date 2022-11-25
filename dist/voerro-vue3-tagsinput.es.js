import { ref as f, onMounted as ie, reactive as ue, toRaw as H, computed as de, watch as F, nextTick as b, openBlock as r, createElementBlock as p, createElementVNode as w, normalizeClass as m, Fragment as B, renderList as I, renderSlot as oe, withDirectives as N, withModifiers as S, vShow as E, withKeys as k, unref as re, createCommentVNode as M, toDisplayString as Q } from "vue";
const pe = {
  class: "tags-input-root",
  style: { position: "relative" }
}, ce = ["innerHTML"], he = ["onClick"], fe = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], ye = {
  key: 0,
  style: { display: "none" }
}, ve = ["name", "value"], ge = ["textContent"], me = ["innerHTML", "onMouseover", "onMousedown"], Se = ["textContent"], Te = ["innerHTML", "onMouseover", "onMousedown"], Fe = {
  __name: "TagsInput",
  props: {
    elementId: String,
    inputId: String,
    existingTags: {
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
      default: () => []
    },
    initialValue: {
      type: Array,
      default: () => []
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
    "update:modelValue"
  ],
  setup(s, { emit: c }) {
    const e = s, i = f([]), d = f(""), O = f(""), W = f(""), u = f([]), o = f(0), x = f(!1), L = f(!1), y = f(), C = f(null);
    ie(() => {
      e.initialValue.length && setTimeout(() => {
        for (let t = 0; t < e.initialValue.length; t++)
          R(ue(e.initialValue[t]));
      }, 100), y.value = z(H(e.existingTags)), J(), e.typeaheadAlwaysShow && v(), c("initialized"), addEventListener("click", (t) => {
        t.target !== C.value && g();
      });
    });
    const q = de(() => e.hideInputOnLimit && e.limit > 0 && i.value.length >= e.limit || e.disabled);
    F(d, (t, a) => {
      v(), t.length && t != a && (t.substring(a.length, t.length), e.addTagsOnSpace && t.endsWith(" ") && (d.value = t.trim(), A(!0)), e.addTagsOnComma && (t = t.trim(), t.endsWith(",") && (d.value = t.substring(0, t.length - 1), A(!0))), c("change", t));
    }), F(e.existingTags, (t) => {
      y.value.splice(0), y.value = z(t), v();
    }), F(i.value, () => {
      W.value = JSON.stringify(H(i.value)), c("update:modelValue", H(i.value));
    }), F(e.modelValue, () => {
      J();
    }), F(e.typeaheadAlwaysShow, (t) => {
      t ? v() : g();
    });
    const T = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), A = (t = !1) => {
      if (!L.value)
        if (u.value.length && o.value >= 0 && !t)
          R(u.value[o.value]), d.value = "";
        else {
          let a = d.value.trim();
          if (!e.onlyExistingTags && a.length && e.validate(a)) {
            d.value = "";
            let l = {
              [e.idField]: "",
              [e.textField]: a
            };
            const n = T(
              e.caseSensitiveTags ? l[e.textField] : l[e.textField].toLowerCase()
            );
            for (let h of y.value) {
              const se = T(
                e.caseSensitiveTags ? h[e.textField] : h[e.textField].toLowerCase()
              );
              if (n === se) {
                l = Object.assign({}, h);
                break;
              }
            }
            $(l);
          }
        }
    }, K = (t) => {
      R(t), C.value.blur();
    }, R = (t) => {
      g(), $(t), b(() => {
        d.value = "", O.value = "";
      });
    }, $ = (t, a = !1) => {
      if (!(e.disabled && !a)) {
        if (!e.beforeAddingTag(t))
          return !1;
        if (e.limit > 0 && i.value.length >= e.limit)
          return c("limit-reached"), !1;
        j(t) || (i.value.push(t), b(() => {
          c("tag-added", t), c("tags-updated");
        }));
      }
    }, G = () => {
      !d.value.length && e.deleteOnBackspace && i.value.length && D(i.value.length - 1);
    }, D = (t) => {
      if (e.disabled)
        return;
      let a = i.value[t];
      if (!e.beforeRemovingTag(a))
        return !1;
      i.value.splice(t, 1), b(() => {
        c("tag-removed", a), c("tags-updated"), e.typeaheadAlwaysShow && v();
      });
    }, v = () => {
      if (e.typeahead !== !0)
        return !1;
      if (O.value != d.value || !u.value.length && e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow || e.typeaheadShowOnFocus) {
        !e.typeaheadUrl.length && !e.typeaheadCallback && (u.value = []), o.value = 0;
        let t = d.value.trim();
        if (t.length && t.length >= e.typeaheadActivationThreshold || e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow) {
          const a = T(
            e.caseSensitiveTags ? t : t.toLowerCase()
          );
          if (e.typeaheadCallback)
            e.typeaheadCallback(a).then((l) => {
              y.value = l;
            });
          else if (e.typeaheadUrl.length > 0) {
            y.value.splice(0);
            const l = new XMLHttpRequest();
            l.onreadystatechange = function() {
              this.readyState == 4 && this.status == 200 && (y.value = JSON.parse(l.responseText), U(a));
            };
            const n = e.typeaheadUrl.replace(":search", a);
            l.open("GET", n, !0), l.send();
          } else
            U(a);
        }
        O.value = d.value;
      }
    }, U = (t) => {
      u.value = [];
      for (let a of y.value) {
        const l = e.caseSensitiveTags ? a[e.textField] : a[e.textField].toLowerCase(), n = u.value.map((h) => h[e.idField]);
        l.search(t) > -1 && !j(a) && !n.includes(a[e.idField]) && u.value.push(a);
      }
      e.sortSearchResults && u.value.sort((a, l) => a[e.textField] < l[e.textField] ? -1 : a[e.textField] > l[e.textField] ? 1 : 0), e.typeaheadMaxResults > 0 && (u.value = u.value.slice(
        0,
        e.typeaheadMaxResults
      ));
    }, X = () => {
      d.value.length || b(() => {
        g();
      });
    }, P = () => {
      o.value + 1 <= u.value.length - 1 && o.value++;
    }, Y = () => {
      o.value > 0 && o.value--;
    }, g = (t = !1) => {
      u.value = [], o.value = 0, e.typeaheadAlwaysShow && b(() => {
        v();
      }), t && C.value.focus();
    }, V = () => {
      i.value.splice(0, i.value.length);
    }, J = () => {
      if (e.modelValue && e.modelValue.length) {
        if (!Array.isArray(e.modelValue)) {
          console.error("Tags Input: the v-model value must be an array!");
          return;
        }
        let t = e.modelValue;
        if (t.value == t)
          return;
        V();
        for (let a of t)
          $(a, !0);
      } else {
        if (i.value.length == 0)
          return;
        V();
      }
    }, j = (t) => {
      if (e.allowDuplicates || !t)
        return !1;
      const a = T(
        e.caseSensitiveTags ? t[e.textField] : t[e.textField].toLowerCase()
      );
      for (let l of i.value) {
        const n = e.caseSensitiveTags ? l[e.textField] : l[e.textField].toLowerCase();
        if (l[e.idField] === t[e.idField] && T(n).length == a.length && n.search(a) > -1)
          return !0;
      }
      return !1;
    }, Z = (t) => {
      c("keyup", t);
    }, _ = (t) => {
      c("keydown", t);
    }, ee = (t) => {
      c("focus", t), x.value = !0;
    }, te = (t) => {
      c("click", t), x.value = !0, v();
    }, ae = (t) => {
      c("blur", t), e.addTagsOnBlur && A(!0), e.typeaheadAlwaysShow ? v() : X(), x.value = !1;
    }, le = (t) => {
      if (!e.valueFields)
        return JSON.stringify(t);
      const a = e.valueFields.replace(/\s/, "").split(",");
      return a.length === 1 ? t[a[0]] : JSON.stringify(
        Object.assign(
          {},
          ...a.map((l) => ({ [l]: t[l] }))
        )
      );
    }, ne = (t) => e.displayField !== void 0 && e.displayField !== null && t[e.displayField] !== void 0 && t[e.displayField] !== null && t[e.displayField] !== "" ? t[e.displayField] : t[e.textField], z = (t) => t.map((a) => Object.assign({}, a));
    return (t, a) => (r(), p("div", pe, [
      w("div", {
        class: m({ [s.wrapperClass + " tags-input"]: !0, active: x.value, disabled: s.disabled })
      }, [
        (r(!0), p(B, null, I(i.value, (l, n) => (r(), p("span", {
          key: n,
          class: m(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
        }, [
          oe(t.$slots, "selected-tag", {
            tag: l,
            index: n,
            removeTag: D
          }, () => [
            w("span", {
              innerHTML: l[s.textField]
            }, null, 8, ce),
            N(w("a", {
              href: "#",
              class: "tags-input-remove",
              onClick: S((h) => D(n), ["prevent"])
            }, null, 8, he), [
              [E, !s.disabled]
            ])
          ])
        ], 2))), 128)),
        N(w("input", {
          type: "text",
          ref_key: "tagInputRef",
          ref: C,
          id: s.inputId,
          name: s.inputId,
          placeholder: s.placeholder,
          value: d.value,
          onInput: a[0] || (a[0] = (l) => d.value = l.target.value),
          onCompositionstart: a[1] || (a[1] = (l) => L.value = !1),
          onCompositionend: a[2] || (a[2] = (l) => L.value = !1),
          onKeydown: [
            a[3] || (a[3] = k(S((l) => A(!1), ["prevent"]), ["enter"])),
            k(G, ["delete"]),
            k(P, ["down"]),
            k(Y, ["up"]),
            _
          ],
          onKeyup: [
            Z,
            k(g, ["esc"])
          ],
          onFocus: ee,
          onClick: te,
          onBlur: ae,
          onValue: a[4] || (a[4] = (...l) => i.value && i.value(...l))
        }, null, 40, fe), [
          [E, !re(q)]
        ]),
        s.elementId ? (r(), p("div", ye, [
          (r(!0), p(B, null, I(i.value, (l, n) => (r(), p("input", {
            key: n,
            type: "hidden",
            name: `${s.elementId}[]`,
            value: le(l)
          }, null, 8, ve))), 128))
        ])) : M("", !0)
      ], 2),
      N(w("div", null, [
        s.typeaheadStyle === "badges" ? (r(), p("p", {
          key: 0,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? M("", !0) : (r(), p("span", {
            key: 0,
            class: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",
            onClick: a[5] || (a[5] = S((l) => g(!0), ["prevent"])),
            textContent: Q(s.discardSearchText)
          }, null, 8, ge)),
          (r(!0), p(B, null, I(u.value, (l, n) => (r(), p("span", {
            key: n,
            innerHTML: l[s.textField],
            onMouseover: (h) => o.value = n,
            onMousedown: S((h) => K(l), ["prevent"]),
            class: m(["tags-input-badge", {
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            }])
          }, null, 42, me))), 128))
        ], 2)) : s.typeaheadStyle === "dropdown" ? (r(), p("ul", {
          key: 1,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? M("", !0) : (r(), p("li", {
            key: 0,
            class: "tags-input-typeahead-item-default typeahead-hide-btn",
            onClick: a[6] || (a[6] = S((l) => g(!0), ["prevent"])),
            textContent: Q(s.discardSearchText)
          }, null, 8, Se)),
          (r(!0), p(B, null, I(u.value, (l, n) => (r(), p("li", {
            key: n,
            innerHTML: ne(l),
            onMouseover: (h) => o.value = n,
            onMousedown: S((h) => K(l), ["prevent"]),
            class: m({
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            })
          }, null, 42, Te))), 128))
        ], 2)) : M("", !0)
      ], 512), [
        [E, u.value.length]
      ])
    ]));
  }
}, we = {
  install: (s) => {
    s.component("TagsInput", Fe);
  }
};
export {
  Fe as TagsInput,
  we as default
};
