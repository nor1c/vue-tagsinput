import { ref as f, onMounted as ue, toRaw as D, computed as ie, watch as T, nextTick as b, openBlock as r, createElementBlock as p, createElementVNode as w, normalizeClass as m, Fragment as A, renderList as I, renderSlot as de, withDirectives as H, withModifiers as S, vShow as N, withKeys as k, unref as oe, createCommentVNode as M, toDisplayString as V } from "vue";
const re = {
  class: "tags-input-root",
  style: { position: "relative" }
}, pe = ["innerHTML"], ce = ["onClick"], he = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], fe = {
  key: 0,
  style: { display: "none" }
}, ve = ["name", "value"], ye = ["textContent"], ge = ["innerHTML", "onMouseover", "onMousedown"], me = ["textContent"], Se = ["innerHTML", "onMouseover", "onMousedown"], Fe = {
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
    const e = s, u = f([]), d = f(""), O = f(""), W = f(""), i = f([]), o = f(0), x = f(!1), L = f(!1), v = f(), C = f(null);
    ue(() => {
      v.value = Q(D(e.existingTags)), j(), e.typeaheadAlwaysShow && y(), c("initialized"), addEventListener("click", (t) => {
        t.target !== C.value && g();
      });
    });
    const q = ie(() => e.hideInputOnLimit && e.limit > 0 && u.value.length >= e.limit || e.disabled);
    T(d, (t, a) => {
      y(), t.length && t != a && (t.substring(a.length, t.length), e.addTagsOnSpace && t.endsWith(" ") && (d.value = t.trim(), B(!0)), e.addTagsOnComma && (t = t.trim(), t.endsWith(",") && (d.value = t.substring(0, t.length - 1), B(!0))), c("change", t));
    }), T(e.existingTags, (t) => {
      v.value.splice(0), v.value = Q(t), y();
    }), T(u.value, () => {
      W.value = JSON.stringify(D(u.value)), c("update:modelValue", D(u.value));
    }), T(e.modelValue, () => {
      j();
    }), T(e.typeaheadAlwaysShow, (t) => {
      t ? y() : g();
    });
    const F = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), B = (t = !1) => {
      if (!L.value)
        if (i.value.length && o.value >= 0 && !t)
          K(i.value[o.value]), d.value = "";
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
            for (let h of v.value) {
              const se = F(
                e.caseSensitiveTags ? h[e.textField] : h[e.textField].toLowerCase()
              );
              if (n === se) {
                l = Object.assign({}, h);
                break;
              }
            }
            R(l);
          }
        }
    }, E = (t) => {
      K(t), C.value.blur();
    }, K = (t) => {
      g(), R(t), b(() => {
        d.value = "", O.value = "";
      });
    }, R = (t, a = !1) => {
      if (!(e.disabled && !a)) {
        if (!e.beforeAddingTag(t))
          return !1;
        if (e.limit > 0 && u.value.length >= e.limit)
          return c("limit-reached"), !1;
        z(t) || (u.value.push(t), b(() => {
          c("tag-added", t), c("tags-updated");
        }));
      }
    }, G = () => {
      !d.value.length && e.deleteOnBackspace && u.value.length && $(u.value.length - 1);
    }, $ = (t) => {
      if (e.disabled)
        return;
      let a = u.value[t];
      if (!e.beforeRemovingTag(a))
        return !1;
      u.value.splice(t, 1), b(() => {
        c("tag-removed", a), c("tags-updated"), e.typeaheadAlwaysShow && y();
      });
    }, y = () => {
      if (e.typeahead !== !0)
        return !1;
      if (O.value != d.value || !i.value.length && e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow || e.typeaheadShowOnFocus) {
        !e.typeaheadUrl.length && !e.typeaheadCallback && (i.value = []), o.value = 0;
        let t = d.value.trim();
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
            const l = new XMLHttpRequest();
            l.onreadystatechange = function() {
              this.readyState == 4 && this.status == 200 && (v.value = JSON.parse(l.responseText), U(a));
            };
            const n = e.typeaheadUrl.replace(":search", a);
            l.open("GET", n, !0), l.send();
          } else
            U(a);
        }
        O.value = d.value;
      }
    }, U = (t) => {
      i.value = [];
      for (let a of v.value) {
        const l = e.caseSensitiveTags ? a[e.textField] : a[e.textField].toLowerCase(), n = i.value.map((h) => h[e.idField]);
        l.search(t) > -1 && !z(a) && !n.includes(a[e.idField]) && i.value.push(a);
      }
      e.sortSearchResults && i.value.sort((a, l) => a[e.textField] < l[e.textField] ? -1 : a[e.textField] > l[e.textField] ? 1 : 0), e.typeaheadMaxResults > 0 && (i.value = i.value.slice(
        0,
        e.typeaheadMaxResults
      ));
    }, X = () => {
      d.value.length || b(() => {
        g();
      });
    }, P = () => {
      o.value + 1 <= i.value.length - 1 && o.value++;
    }, Y = () => {
      o.value > 0 && o.value--;
    }, g = (t = !1) => {
      i.value = [], o.value = 0, e.typeaheadAlwaysShow && b(() => {
        y();
      }), t && C.value.focus();
    }, J = () => {
      u.value.splice(0, u.value.length);
    }, j = () => {
      if (e.modelValue && e.modelValue.length) {
        if (!Array.isArray(e.modelValue)) {
          console.error("Voerro Tags Input: the v-model value must be an array!");
          return;
        }
        let t = e.modelValue;
        if (t.value == t)
          return;
        J();
        for (let a of t)
          R(a, !0);
      } else {
        if (u.value.length == 0)
          return;
        J();
      }
    }, z = (t) => {
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
    }, Z = (t) => {
      c("keyup", t);
    }, _ = (t) => {
      c("keydown", t);
    }, ee = (t) => {
      c("focus", t), x.value = !0;
    }, te = (t) => {
      c("click", t), x.value = !0, y();
    }, ae = (t) => {
      c("blur", t), e.addTagsOnBlur && B(!0), e.typeaheadAlwaysShow ? y() : X(), x.value = !1;
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
    }, ne = (t) => e.displayField !== void 0 && e.displayField !== null && t[e.displayField] !== void 0 && t[e.displayField] !== null && t[e.displayField] !== "" ? t[e.displayField] : t[e.textField], Q = (t) => t.map((a) => Object.assign({}, a));
    return (t, a) => (r(), p("div", re, [
      w("div", {
        class: m({ [s.wrapperClass + " tags-input"]: !0, active: x.value, disabled: s.disabled })
      }, [
        (r(!0), p(A, null, I(u.value, (l, n) => (r(), p("span", {
          key: n,
          class: m(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
        }, [
          de(t.$slots, "selected-tag", {
            tag: l,
            index: n,
            removeTag: $
          }, () => [
            w("span", {
              innerHTML: l[s.textField]
            }, null, 8, pe),
            H(w("a", {
              href: "#",
              class: "tags-input-remove",
              onClick: S((h) => $(n), ["prevent"])
            }, null, 8, ce), [
              [N, !s.disabled]
            ])
          ])
        ], 2))), 128)),
        H(w("input", {
          type: "text",
          ref_key: "tagInputRef",
          ref: C,
          id: s.inputId,
          name: s.inputId,
          placeholder: s.placeholder,
          value: d.value,
          onInput: a[0] || (a[0] = (l) => d.value = l.target.value),
          onCompositionstart: a[1] || (a[1] = (l) => L.value = !0),
          onCompositionend: a[2] || (a[2] = (l) => L.value = !1),
          onKeydown: [
            a[3] || (a[3] = k(S((l) => B(!1), ["prevent"]), ["enter"])),
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
          onValue: a[4] || (a[4] = (...l) => u.value && u.value(...l))
        }, null, 40, he), [
          [N, !oe(q)]
        ]),
        s.elementId ? (r(), p("div", fe, [
          (r(!0), p(A, null, I(u.value, (l, n) => (r(), p("input", {
            key: n,
            type: "hidden",
            name: `${s.elementId}[]`,
            value: le(l)
          }, null, 8, ve))), 128))
        ])) : M("", !0)
      ], 2),
      H(w("div", null, [
        s.typeaheadStyle === "badges" ? (r(), p("p", {
          key: 0,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? M("", !0) : (r(), p("span", {
            key: 0,
            class: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",
            onClick: a[5] || (a[5] = S((l) => g(!0), ["prevent"])),
            textContent: V(s.discardSearchText)
          }, null, 8, ye)),
          (r(!0), p(A, null, I(i.value, (l, n) => (r(), p("span", {
            key: n,
            innerHTML: l[s.textField],
            onMouseover: (h) => o.value = n,
            onMousedown: S((h) => E(l), ["prevent"]),
            class: m(["tags-input-badge", {
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            }])
          }, null, 42, ge))), 128))
        ], 2)) : s.typeaheadStyle === "dropdown" ? (r(), p("ul", {
          key: 1,
          class: m(`typeahead-${s.typeaheadStyle}`)
        }, [
          s.typeaheadHideDiscard ? M("", !0) : (r(), p("li", {
            key: 0,
            class: "tags-input-typeahead-item-default typeahead-hide-btn",
            onClick: a[6] || (a[6] = S((l) => g(!0), ["prevent"])),
            textContent: V(s.discardSearchText)
          }, null, 8, me)),
          (r(!0), p(A, null, I(i.value, (l, n) => (r(), p("li", {
            key: n,
            innerHTML: ne(l),
            onMouseover: (h) => o.value = n,
            onMousedown: S((h) => E(l), ["prevent"]),
            class: m({
              "tags-input-typeahead-item-default": n != o.value,
              "tags-input-typeahead-item-highlighted-default": n == o.value
            })
          }, null, 42, Se))), 128))
        ], 2)) : M("", !0)
      ], 512), [
        [N, i.value.length]
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
