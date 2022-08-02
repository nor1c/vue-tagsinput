(function(h,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(h=typeof globalThis<"u"?globalThis:h||self,e(h.TagsInput={},h.Vue))})(this,function(h,e){"use strict";const A={class:"tags-input-root",style:{position:"relative"}},L=["innerHTML"],O=["onClick"],N=["id","name","placeholder","value","onKeydown","onKeyup"],$={key:0,style:{display:"none"}},D=["name","value"],R=["textContent"],V=["innerHTML","onMouseover","onMousedown"],K=["textContent"],H=["innerHTML","onMouseover","onMousedown"],B={__name:"TagsInput",props:{elementId:String,inputId:String,existingTags:{type:Array,default:()=>[]},modelValue:{type:Array,default:()=>[]},idField:{type:String,default:"key"},textField:{type:String,default:"value"},displayField:{type:String,default:null},valueFields:{type:String,default:null},disabled:{type:Boolean,default:!1},typeahead:{type:Boolean,default:!1},typeaheadStyle:{type:String,default:"badges"},typeaheadActivationThreshold:{type:Number,default:1},typeaheadMaxResults:{type:Number,default:0},typeaheadAlwaysShow:{type:Boolean,default:!1},typeaheadShowOnFocus:{type:Boolean,default:!0},typeaheadHideDiscard:{type:Boolean,default:!1},typeaheadUrl:{type:String,default:""},typeaheadCallback:{type:Function,default:null},placeholder:{type:String,default:"Add a tag"},discardSearchText:{type:String,default:"Discard Search Results"},limit:{type:Number,default:0},hideInputOnLimit:{type:Boolean,default:!1},onlyExistingTags:{type:Boolean,default:!1},deleteOnBackspace:{type:Boolean,default:!0},allowDuplicates:{type:Boolean,default:!1},validate:{type:Function,default:()=>!0},addTagsOnComma:{type:Boolean,default:!1},addTagsOnSpace:{type:Boolean,default:!1},addTagsOnBlur:{type:Boolean,default:!1},wrapperClass:{type:String,default:"tags-input-wrapper-default"},sortSearchResults:{type:Boolean,default:!0},caseSensitiveTags:{type:Boolean,default:!1},beforeAddingTag:{type:Function,default:()=>!0},beforeRemovingTag:{type:Function,default:()=>!0},modelValue:{type:Array,default:[]}},emits:["initialized","change","input","limit-reached","tag-added","tags-updated","tag-removed","tags-updated","keyup","keydown","focus","click","blur","update:modelValue","onUpdate:modelValue"],setup(i,{emit:u}){const a=i;e.ref(0);const o=e.ref([]),c=e.ref(""),S=e.ref(""),U=e.ref(""),d=e.ref([]),r=e.ref(0);e.ref(1);const k=e.ref(!1),T=e.ref(!1),y=e.ref(),v=e.ref(null);e.onMounted(()=>{y.value=I(a.existingTags),M(),a.typeaheadAlwaysShow&&f(),u("initialized"),addEventListener("click",t=>{t.target!==v.value&&g()})});const j=e.computed(()=>a.hideInputOnLimit&&a.limit>0&&o.value.length>=a.limit||a.disabled);e.watch(c.value,(t,l)=>{f(),t.length&&t!=l&&(t.substring(l.length,t.length),a.addTagsOnSpace&&t.endsWith(" ")&&(c.value=t.trim(),a.tagFromInput(!0)),a.addTagsOnComma&&(t=t.trim(),t.endsWith(",")&&(c.value=t.substring(0,t.length-1),a.tagFromInput(!0))),u("change",t))}),e.watch(a.existingTags,t=>{y.value.splice(0),y.value=I(t),f()}),e.watch(o.value,()=>{U.value=JSON.stringify(o.value),u("update:modelValue",o.value)}),e.watch(a.modelValue,()=>{M()}),e.watch(a.typeaheadAlwaysShow,t=>{t?f():g()});const m=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),J=(t=!1)=>{if(!T.value)if(d.value.length&&r.value>=0&&!t)x(d.value[r.value]),c.value="";else{let l=c.value.trim();if(!a.onlyExistingTags&&l.length&&a.validate(l)){c.value="";let n={[a.idField]:"",[a.textField]:l};const s=m(a.caseSensitiveTags?n[a.textField]:n[a.textField].toLowerCase());for(let p of y.value){const le=m(a.caseSensitiveTags?p[a.textField]:p[a.textField].toLowerCase());if(s===le){n=Object.assign({},p);break}}F(n)}}},b=t=>{x(t),v.value.blur()},x=t=>{g(),F(t),e.nextTick(()=>{c.value="",S.value=""})},F=(t,l=!1)=>{if(!(a.disabled&&!l)){if(!a.beforeAddingTag(t))return!1;if(a.limit>0&&o.value.length>=a.limit)return u("limit-reached"),!1;E(t)||(o.value.push(t),e.nextTick(()=>{u("tag-added",t),u("tags-updated")}))}},Q=()=>{!c.value.length&&this.deleteOnBackspace&&o.value.length&&w(o.value.length-1)},w=t=>{if(a.disabled)return;let l=o.value[t];if(!beforeRemovingTag(l))return!1;o.value.splice(t,1),e.nextTick(()=>{u("tag-removed",l),u("tags-updated"),a.typeaheadAlwaysShow&&f()})},f=()=>{if(a.typeahead!==!0)return!1;if(S.value!=c.value||!d.value.length&&a.typeaheadActivationThreshold==0||a.typeaheadAlwaysShow||this.typeaheadShowOnFocus){!typeaheadUrl.value.length&&!a.typeaheadCallback&&(d.value=[]),r.value=0;let t=t.value.trim();if(t.length&&t.length>=a.typeaheadActivationThreshold||a.typeaheadActivationThreshold==0||a.typeaheadAlwaysShow){const l=m(a.caseSensitiveTags?t:t.toLowerCase());if(a.typeaheadCallback)a.typeaheadCallback(l).then(n=>{y.value=n});else if(typeaheadUrl.value.length>0){y.value.splice(0);const n=new XMLHttpRequest,s=this;n.onreadystatechange=function(){console.log([readyState,status]),this.readyState==4&&this.status==200&&(s.typeaheadTags=JSON.parse(n.responseText),s.doSearch(l))};const p=typeaheadUrl.value.replace(":search",l);n.open("GET",p,!0),n.send()}else q(l)}S.value=t.value}},q=t=>{d.value=[];for(let l of y.value){const n=a.caseSensitiveTags?l[a.textField]:l[a.textField].toLowerCase(),s=d.value.map(p=>p[a.idField]);n.search(t)>-1&&!E(l)&&!s.includes(l[a.idField])&&d.value.push(l)}a.sortSearchResults&&d.value.sort((l,n)=>l[a.textField]<n[a.textField]?-1:l[a.textField]>n[a.textField]?1:0),a.typeaheadMaxResults>0&&(d.value=d.value.slice(0,a.typeaheadMaxResults))},W=()=>{c.value.length||e.nextTick(()=>{g()})},G=()=>{r.value+1<=d.value.length-1&&r.value++},P=()=>{r.value>0&&r.value--},g=(t=!1)=>{d.value=[],r.value=0,a.typeaheadAlwaysShow&&e.nextTick(()=>{f()}),t&&v.value.focus()},C=()=>{o.value.splice(0,o.value.length)},M=()=>{if(a.modelValue&&a.modelValue.length){if(!Array.isArray(a.modelValue)){console.error("Voerro Tags Input: the v-model value must be an array!");return}let t=a.modelValue;if(t.value==t)return;C();for(let l of t)F(l,!0)}else{if(o.value.length==0)return;C()}},E=t=>{if(a.allowDuplicates||!t)return!1;const l=m(a.caseSensitiveTags?t[a.textField]:t[a.textField].toLowerCase());for(let n of o.value){const s=a.caseSensitiveTags?n[a.textField]:n[a.textField].toLowerCase();if(n[a.idField]===t[a.idField]&&m(s).length==l.length&&s.search(l)>-1)return!0}return!1},X=t=>{u("keyup",t)},Y=t=>{u("keydown",t)},Z=t=>{u("focus",t),k.value=!0},_=t=>{u("click",t),k.value=!0,f()},ee=t=>{u("blur",t),a.addTagsOnBlur&&a.tagFromInput(!0),a.typeaheadAlwaysShow?f():W(),k.value=!1},te=t=>{if(!a.modelValueFields)return JSON.stringify(t);const l=a.modelValueFields.replace(/\s/,"").split(",");return l.length===1?t[l[0]]:JSON.stringify(Object.assign({},...l.map(n=>({[n]:t[n]}))))},ae=t=>a.displayField!==void 0&&a.displayField!==null&&t[a.displayField]!==void 0&&t[a.displayField]!==null&&t[a.displayField]!==""?t[a.displayField]:t[a.textField],I=t=>t.map(l=>Object.assign({},l));return(t,l)=>(e.openBlock(),e.createElementBlock("div",A,[e.createElementVNode("div",{class:e.normalizeClass({[i.wrapperClass+" tags-input"]:!0,active:k.value,disabled:i.disabled})},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.value,(n,s)=>(e.openBlock(),e.createElementBlock("span",{key:s,class:e.normalizeClass(["tags-input-badge tags-input-badge-pill tags-input-badge-selected-default",{disabled:i.disabled}])},[e.renderSlot(t.$slots,"selected-tag",{tag:n,index:s,removeTag:w},()=>[e.createElementVNode("span",{innerHTML:n[i.textField]},null,8,L),e.withDirectives(e.createElementVNode("a",{href:"#",class:"tags-input-remove",onClick:e.withModifiers(p=>w(s),["prevent"])},null,8,O),[[e.vShow,!i.disabled]])])],2))),128)),e.withDirectives(e.createElementVNode("input",{type:"text",ref:"taginput",id:i.inputId,name:i.inputId,placeholder:i.placeholder,value:c.value,onInput:l[0]||(l[0]=n=>c.value=n.target.value),onCompositionstart:l[1]||(l[1]=n=>T.value=!0),onCompositionend:l[2]||(l[2]=n=>T.value=!1),onKeydown:[l[3]||(l[3]=e.withKeys(e.withModifiers(n=>J(!1),["prevent"]),["enter"])),e.withKeys(Q,["8"]),e.withKeys(G,["down"]),e.withKeys(P,["up"]),Y],onKeyup:[X,e.withKeys(g,["esc"])],onFocus:Z,onClick:_,onBlur:ee,onValue:l[4]||(l[4]=(...n)=>o.value&&o.value(...n))},null,40,N),[[e.vShow,!e.unref(j)]]),i.elementId?(e.openBlock(),e.createElementBlock("div",$,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.value,(n,s)=>(e.openBlock(),e.createElementBlock("input",{key:s,type:"hidden",name:`${i.elementId}[]`,value:te(n)},null,8,D))),128))])):e.createCommentVNode("",!0)],2),e.withDirectives(e.createElementVNode("div",null,[i.typeaheadStyle==="badges"?(e.openBlock(),e.createElementBlock("p",{key:0,class:e.normalizeClass(`typeahead-${i.typeaheadStyle}`)},[i.typeaheadHideDiscard?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("span",{key:0,class:"tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default",onClick:l[5]||(l[5]=e.withModifiers(n=>g(!0),["prevent"])),textContent:e.toDisplayString(i.discardSearchText)},null,8,R)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(n,s)=>(e.openBlock(),e.createElementBlock("span",{key:s,innerHTML:n[i.textField],onMouseover:p=>r.value=s,onMousedown:e.withModifiers(p=>b(n),["prevent"]),class:e.normalizeClass(["tags-input-badge",{"tags-input-typeahead-item-default":s!=r.value,"tags-input-typeahead-item-highlighted-default":s==r.value}])},null,42,V))),128))],2)):i.typeaheadStyle==="dropdown"?(e.openBlock(),e.createElementBlock("ul",{key:1,class:e.normalizeClass(`typeahead-${i.typeaheadStyle}`)},[i.typeaheadHideDiscard?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("li",{key:0,class:"tags-input-typeahead-item-default typeahead-hide-btn",onClick:l[6]||(l[6]=e.withModifiers(n=>g(!0),["prevent"])),textContent:e.toDisplayString(i.discardSearchText)},null,8,K)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d.value,(n,s)=>(e.openBlock(),e.createElementBlock("li",{key:s,innerHTML:ae(n),onMouseover:p=>r.value=s,onMousedown:e.withModifiers(p=>b(n),["prevent"]),class:e.normalizeClass({"tags-input-typeahead-item-default":s!=r.value,"tags-input-typeahead-item-highlighted-default":s==r.value})},null,42,H))),128))],2)):e.createCommentVNode("",!0)],512),[[e.vShow,d.value.length]])]))}},z={install:i=>{i.component("TagsInput",B)}};h.TagsInput=B,h.default=z,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
