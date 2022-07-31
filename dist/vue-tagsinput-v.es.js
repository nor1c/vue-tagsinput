import { ref as h, onMounted as ue, computed as ie, watch as w, nextTick as x, openBlock as o, createElementBlock as r, Fragment as T, createElementVNode as m, normalizeClass as S, renderList as A, renderSlot as de, withDirectives as R, withModifiers as F, vShow as D, withKeys as k, unref as oe, createCommentVNode as B, toDisplayString as j, createTextVNode as z, createVNode as re, createApp as pe } from "vue";
const ce = /* @__PURE__ */ z(" tags input "), he = {
  class: "tags-input-root",
  style: { position: "relative" }
}, ve = ["innerHTML"], ye = ["onClick"], fe = ["id", "name", "placeholder", "value", "onKeydown", "onKeyup"], ge = {
  key: 0,
  style: { display: "none" }
}, me = ["name", "value"], Se = ["textContent"], Fe = ["innerHTML", "onMouseover", "onMousedown"], Te = ["textContent"], be = ["innerHTML", "onMouseover", "onMousedown"], we = {
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
  setup(s, { emit: i }) {
    const e = s;
    h(0);
    const u = h([]), p = h(""), I = h(""), Q = h(""), d = h([]), c = h(0);
    h(1);
    const C = h(!1), M = h(!1), f = h(), O = h(null);
    ue(() => {
      f.value = J(e.existingTags), K(), e.typeaheadAlwaysShow && y(), i("initialized"), addEventListener("click", (t) => {
        t.target !== O.value && g();
      });
    });
    const W = ie(() => e.hideInputOnLimit && e.limit > 0 && u.value.length >= e.limit || e.disabled);
    w(p.value, (t, a) => {
      y(), t.length && t != a && (t.substring(a.length, t.length), e.addTagsOnSpace && t.endsWith(" ") && (p.value = t.trim(), e.tagFromInput(!0)), e.addTagsOnComma && (t = t.trim(), t.endsWith(",") && (p.value = t.substring(0, t.length - 1), e.tagFromInput(!0))), i("change", t));
    }), w(e.existingTags, (t) => {
      f.value.splice(0), f.value = J(t), y();
    }), w(u.value, () => {
      Q.value = JSON.stringify(u.value), i("update:modelValue", u.value);
    }), w(e.value, () => {
      K();
    }), w(e.typeaheadAlwaysShow, (t) => {
      t ? y() : g();
    });
    const b = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), q = (t = !1) => {
      if (!M.value)
        if (d.value.length && c.value >= 0 && !t)
          H(d.value[c.value]), p.value = "";
        else {
          let a = p.value.trim();
          if (!e.onlyExistingTags && a.length && e.validate(a)) {
            p.value = "";
            let l = {
              [e.idField]: "",
              [e.textField]: a
            };
            const n = b(
              e.caseSensitiveTags ? l[e.textField] : l[e.textField].toLowerCase()
            );
            for (let v of f.value) {
              const se = b(
                e.caseSensitiveTags ? v[e.textField] : v[e.textField].toLowerCase()
              );
              if (n === se) {
                l = Object.assign({}, v);
                break;
              }
            }
            L(l);
          }
        }
    }, N = (t) => {
      H(t), O.value.blur();
    }, H = (t) => {
      g(), L(t), x(() => {
        p.value = "", I.value = "";
      });
    }, L = (t, a = !1) => {
      if (!(e.disabled && !a)) {
        if (!e.beforeAddingTag(t))
          return !1;
        if (e.limit > 0 && u.value.length >= e.limit)
          return i("limit-reached"), !1;
        U(t) || (u.value.push(t), x(() => {
          i("tag-added", t), i("tags-updated");
        }));
      }
    }, G = () => {
      !p.value.length && this.deleteOnBackspace && u.value.length && $(u.value.length - 1);
    }, $ = (t) => {
      if (e.disabled)
        return;
      let a = u.value[t];
      if (!beforeRemovingTag(a))
        return !1;
      u.value.splice(t, 1), x(() => {
        i("tag-removed", a), i("tags-updated"), e.typeaheadAlwaysShow && y();
      });
    }, y = () => {
      if (e.typeahead !== !0)
        return !1;
      if (I.value != p.value || !d.value.length && e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow || this.typeaheadShowOnFocus) {
        !typeaheadUrl.value.length && !e.typeaheadCallback && (d.value = []), c.value = 0;
        let t = t.value.trim();
        if (t.length && t.length >= e.typeaheadActivationThreshold || e.typeaheadActivationThreshold == 0 || e.typeaheadAlwaysShow) {
          const a = b(
            e.caseSensitiveTags ? t : t.toLowerCase()
          );
          if (e.typeaheadCallback)
            e.typeaheadCallback(a).then((l) => {
              f.value = l;
            });
          else if (typeaheadUrl.value.length > 0) {
            f.value.splice(0);
            const l = new XMLHttpRequest(), n = this;
            l.onreadystatechange = function() {
              console.log([readyState, status]), this.readyState == 4 && this.status == 200 && (n.typeaheadTags = JSON.parse(l.responseText), n.doSearch(a));
            };
            const v = typeaheadUrl.value.replace(":search", a);
            l.open("GET", v, !0), l.send();
          } else
            X(a);
        }
        I.value = t.value;
      }
    }, X = (t) => {
      d.value = [];
      for (let a of f.value) {
        const l = e.caseSensitiveTags ? a[e.textField] : a[e.textField].toLowerCase(), n = d.value.map((v) => v[e.idField]);
        l.search(t) > -1 && !U(a) && !n.includes(a[e.idField]) && d.value.push(a);
      }
      e.sortSearchResults && d.value.sort((a, l) => a[e.textField] < l[e.textField] ? -1 : a[e.textField] > l[e.textField] ? 1 : 0), e.typeaheadMaxResults > 0 && (d.value = d.value.slice(
        0,
        e.typeaheadMaxResults
      ));
    }, P = () => {
      p.value.length || x(() => {
        g();
      });
    }, V = () => {
      c.value + 1 <= d.value.length - 1 && c.value++;
    }, Y = () => {
      c.value > 0 && c.value--;
    }, g = (t = !1) => {
      d.value = [], c.value = 0, e.typeaheadAlwaysShow && x(() => {
        y();
      }), t && O.value.focus();
    }, E = () => {
      u.value.splice(0, u.value.length);
    }, K = () => {
      if (e.value && e.value.length) {
        if (!Array.isArray(e.value)) {
          console.error("Voerro Tags Input: the v-model value must be an array!");
          return;
        }
        let t = e.value;
        if (t.value == t)
          return;
        E();
        for (let a of t)
          L(a, !0);
      } else {
        if (u.value.length == 0)
          return;
        E();
      }
    }, U = (t) => {
      if (e.allowDuplicates || !t)
        return !1;
      const a = b(
        e.caseSensitiveTags ? t[e.textField] : t[e.textField].toLowerCase()
      );
      for (let l of u.value) {
        const n = e.caseSensitiveTags ? l[e.textField] : l[e.textField].toLowerCase();
        if (l[e.idField] === t[e.idField] && b(n).length == a.length && n.search(a) > -1)
          return !0;
      }
      return !1;
    }, Z = (t) => {
      i("keyup", t);
    }, _ = (t) => {
      i("keydown", t);
    }, ee = (t) => {
      i("focus", t), C.value = !0;
    }, te = (t) => {
      i("click", t), C.value = !0, y();
    }, ae = (t) => {
      i("blur", t), e.addTagsOnBlur && e.tagFromInput(!0), e.typeaheadAlwaysShow ? y() : P(), C.value = !1;
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
    }, ne = (t) => e.displayField !== void 0 && e.displayField !== null && t[e.displayField] !== void 0 && t[e.displayField] !== null && t[e.displayField] !== "" ? t[e.displayField] : t[e.textField], J = (t) => t.map((a) => Object.assign({}, a));
    return (t, a) => (o(), r(T, null, [
      ce,
      m("div", he, [
        m("div", {
          class: S({ [s.wrapperClass + " tags-input"]: !0, active: C.value, disabled: s.disabled })
        }, [
          (o(!0), r(T, null, A(u.value, (l, n) => (o(), r("span", {
            key: n,
            class: S(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default", { disabled: s.disabled }])
          }, [
            de(t.$slots, "selected-tag", {
              tag: l,
              index: n,
              removeTag: $
            }, () => [
              m("span", {
                innerHTML: l[s.textField]
              }, null, 8, ve),
              R(m("a", {
                href: "#",
                class: "tags-input-remove",
                onClick: F((v) => $(n), ["prevent"])
              }, null, 8, ye), [
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
            value: p.value,
            onInput: a[0] || (a[0] = (l) => p.value = l.target.value),
            onCompositionstart: a[1] || (a[1] = (l) => M.value = !0),
            onCompositionend: a[2] || (a[2] = (l) => M.value = !1),
            onKeydown: [
              a[3] || (a[3] = k(F((l) => q(!1), ["prevent"]), ["enter"])),
              k(G, ["8"]),
              k(V, ["down"]),
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
          }, null, 40, fe), [
            [D, !oe(W)]
          ]),
          s.elementId ? (o(), r("div", ge, [
            (o(!0), r(T, null, A(u.value, (l, n) => (o(), r("input", {
              key: n,
              type: "hidden",
              name: `${s.elementId}[]`,
              value: le(l)
            }, null, 8, me))), 128))
          ])) : B("", !0)
        ], 2),
        R(m("div", null, [
          s.typeaheadStyle === "badges" ? (o(), r("p", {
            key: 0,
            class: S(`typeahead-${s.typeaheadStyle}`)
          }, [
            s.typeaheadHideDiscard ? B("", !0) : (o(), r("span", {
              key: 0,
              class: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",
              onClick: a[5] || (a[5] = F((l) => g(!0), ["prevent"])),
              textContent: j(s.discardSearchText)
            }, null, 8, Se)),
            (o(!0), r(T, null, A(d.value, (l, n) => (o(), r("span", {
              key: n,
              innerHTML: l[s.textField],
              onMouseover: (v) => c.value = n,
              onMousedown: F((v) => N(l), ["prevent"]),
              class: S(["tags-input-badge", {
                "tags-input-typeahead-item-default": n != c.value,
                "tags-input-typeahead-item-highlighted-default": n == c.value
              }])
            }, null, 42, Fe))), 128))
          ], 2)) : s.typeaheadStyle === "dropdown" ? (o(), r("ul", {
            key: 1,
            class: S(`typeahead-${s.typeaheadStyle}`)
          }, [
            s.typeaheadHideDiscard ? B("", !0) : (o(), r("li", {
              key: 0,
              class: "tags-input-typeahead-item-default typeahead-hide-btn",
              onClick: a[6] || (a[6] = F((l) => g(!0), ["prevent"])),
              textContent: j(s.discardSearchText)
            }, null, 8, Te)),
            (o(!0), r(T, null, A(d.value, (l, n) => (o(), r("li", {
              key: n,
              innerHTML: ne(l),
              onMouseover: (v) => c.value = n,
              onMousedown: F((v) => N(l), ["prevent"]),
              class: S({
                "tags-input-typeahead-item-default": n != c.value,
                "tags-input-typeahead-item-highlighted-default": n == c.value
              })
            }, null, 42, be))), 128))
          ], 2)) : B("", !0)
        ], 512), [
          [D, d.value.length]
        ])
      ])
    ], 64));
  }
}, xe = /* @__PURE__ */ z(" tags input here: "), ke = {
  __name: "App",
  setup(s) {
    const i = h([]);
    return (e, u) => (o(), r(T, null, [
      xe,
      re(we, {
        modelValue: i.value,
        "onUpdate:modelValue": u[0] || (u[0] = (p) => i.value = p),
        placeholder: "Type a tag"
      }, null, 8, ["modelValue"])
    ], 64));
  }
};
pe(ke).mount("#app");
