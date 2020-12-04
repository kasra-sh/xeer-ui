!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={};function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(){return void 0!==t.window&&void 0!==t.document&&void 0!==t.navigator}r()||(t.HTMLElement=t.HTMLElement?t.HTMLElement:function(){},t.Element=t.Element?t.Element:function(){},t.Node=t.Node?t.Node:function(){},t.HTMLCollection=t.HTMLCollection?t.HTMLCollection:function(){},t.NodeList=t.NodeList?t.NodeList:function(){}),e={setGlobal:function(e){for(let n of Object.keys(e))t[n]=e[n]},Extension:class{constructor(t){n(this,"types",[]),n(this,"pcode","\n"),this.types=t}define(t){if(!t.name){let e=`Function must have a name [Extension.define(f)]\n<<${t}>>`;return console.error(e),`\n/**\n *${e}\n */`}let e="\n";for(let n of this.types)void 0!==n&&(e+=`${n.name||n}.prototype.${t.name} = `);return e+=t.toString()+";\n",this.pcode+=e,e}polyfill(t){if(!t.name){let e=`Extension function must have a name:\n<<${t}>>`;return console.error(e),`\n/**\n *${e}\n */`}let e="\n";for(let n of this.types)e+=`if (${n.name||n}.prototype.${t.name} === undefined) ${n.name||n}.prototype.${t.name} = ${t.toString()};\n`;this.pcode+=e}},isBrowser:r};var s,i={},o={},a={};function l(t){return null!==t&&void 0===t}function u(t){return null===t}function c(t){return!l(t)&&!u(t)}function f(t){return"function"==typeof t}function h(t){return null!==t&&"object"==typeof t}function d(t,e,n){return!!c(t)&&(f(n)?n(t[e]):t.hasOwnProperty(e))}a={typeName:function(t){return t.hasOwnProperty("constructor")?t.constructor.name:typeof t},isUnd:l,isNull:u,isVal:c,isNum:function(t){return"number"==typeof t},isStr:function(t){return"string"==typeof t||t instanceof String},isFun:f,isObj:h,isArr:function(t){return t instanceof Array},isPrim:function(t){return c(t)&&!h(t)&&!f(t)},isList:function(t){return c(t.length)&&f(t.item)},isMutableList:function(t){return c(t.length)&&f(t.item)&&f(t.add)},isSet:function(t){return t instanceof Set},isMap:function(t){return t instanceof Map},isError:function(t){return t instanceof Error},isEl:function(t){return t instanceof Element||t instanceof HTMLElement||t instanceof Node},isEls:function(t){return t instanceof HTMLCollection||t instanceof NodeList},hasField:d,isEmpty:function(t){return d(t,"length")?t.length<=0:!f(t)&&(!h(t)||Object.keys(t).length<=0)},Enum:function(t){let e=0,n={};for(let r of Object.keys(t))n[n[e]=r]=e++;return n},dict:function(...t){let e={};for(let n=0;n<t.length;n++)n%2==0&&(e[t[n]]=t[n+1]);return e}},t._X_LOOP_BREAK_||(t._X_LOOP_BREAK_=Symbol("BREAK_LOOP"),t._X_ANY_=Symbol("ANY"),t._X_ALL_=Symbol("ALL"));const p=t._X_LOOP_BREAK_,m=t._X_ANY_,g=t._X_ALL_,_=["__proto__","constructor","__defineGetter__","__defineSetter__","prototype"];function y(t,e){if(a.isVal(t))return a.isObj(t)||a.isStr(t)||a.isArr(t)?t[e]:t.item(e)}function b(t,e,n){return!!a.isVal(t)&&(!a.isArr(t)&&a.isObj(t)?t[n]===e:t.indexOf(e)>=0)}function E(t,...e){a.isArr(t)?A(e,(e=>t.push(e))):a.isMutableList(t)&&t.add(e)}function $(t,...e){e=I(e);let n=!1;return A(e,(e=>{let r=t.indexOf(e);r>=0&&(n=!0,t.splice(r,1))})),n}function v(t,e){let n=Object.keys(e);for(let r of n){if(e[r]===m&&t.hasOwnProperty(r))return!0;if(e[r]===t[r])return!0}return!1}function w(t,e){let n=Object.keys(e);for(let r of n)if(e[r]!==m&&e[r]!==t[r])return!1;return!0}function T(t,e=(()=>!0),n=!0){return a.isUnd(t)?e:a.isFun(t)?t:t instanceof RegExp?(e,n,r,s)=>!a.isObj(e)&&t.test(e.toString()):a.isObj(t)?0===Object.keys(t).length?e:n?(e,n,r,s)=>v(e,t):(e,n,r,s)=>w(e,t):(e,n,r,s)=>e===t}function O(t){if(a.isUnd(t))return t=>t;if(a.isFun(t))return t;if(a.isStr(t)){const e=t;t=t=>t[e]}throw Error(`Predicate ${t} cannot be of type ${typeof t}`)}function C(t,e={}){return a.isStr(t)?"":a.isList(t)?[]:a.isObj(t)?a.isEl(t)?3===t.nodeType||8===t.nodeType?document.createTextNode(t.textContent):document.createElement(t.tagName):t.__proto__?Object.create(t.__proto__):{}:e}function x(t,e,n=!1){if(a.isStr(t))return t.concat(e);if(a.isArr(t))return t.concat(e);for(let r of Object.keys(e))t[r]&&!n||(t[r]=e[r]);return t}function A(t,e){if(!a.isVal(t))return-1;if(!a.isArr(t)||!a.isStr(t)||!a.isList(t)){let n=0,r=Object.keys(t);const s=r.length;for(;n<s;n++){const s=r[n];if(e(t[s],s,n,t)===p)return n}return n}const n=t.length;if(a.isArr(t))for(let r=0;r<n;r++){if(e(y(t,r),r,r,t)===p)return r}else for(let r=0;r<n;r++){if(e(t[r],r,r,t)===p)return r}return t.length}function S(t,e,n=[]){if(!a.isArr(t)||!a.isStr(t)){let r=0,s=Object.keys(t);for(let r=s.length-1;r>=0;r--){if(r<n[1])continue;if(r>=n[0])return r;if(e(t[s[r]],s[r],r,t)===p)return r}return r}for(let n=t.length-1;n>=0;n--){if(e(y(t,n),n,n,t)===p)return n}return t.length}function k(t,e){e=T(e,(()=>!0));let n=-1;return A(t,(function(r,s,i){if(n=e(r,s,i,t),!0===n)return n=i,p})),n}function j(t,e){return y(t,k(t,e))}function P(t,e){e=T(e,(()=>!0));let n=-1;return S(t,(function(t,r,s){if(n=e(t,r,s),!0===n)return n=s,p})),n}function N(t,e){return t[P(t,e)]}function L(t,e){let n=T(e),r=!1;return A(t,(function(t,e,s,i){if(r=n(t,e,s,i),!0===r)return p})),r}function q(t,e){e=T(e,(()=>!0));let n=!0;return A(t,(function(t,r,s,i){if(n=e(t,r,s,i),!1===n)return p})),n}function R(t,e,n=!1,r=!1){e=T(e,(()=>!0));let s="";return(n?S:A)(t,(function(n,i,o){e&&e(n,i,o,t)!==r||(s+=n)})),s}function F(t,e,n=!1,r=!1){if(a.isArr(e)){let t=Object.assign({},e);e=r?(e,n)=>!L(t,n):(e,n)=>L(t,n)}else e=T(e,(()=>!0));let s={};const i=Object.keys(t),o=i.length;if(n)for(let n=o-1;n>=0;n--){const o=i[n],a=t[o];e(a,o,n,t)!==r&&(s[o]=a)}else for(let n=0;n<o;n++){const o=i[n],a=t[o];e(a,o,n,t)!==r&&(s[o]=a)}return s}function V(t,e,n=!1,r=!1){if(a.isArr(e)){let t=Object.assign([],e);e=r?(e,n,r)=>!L(t,r):(e,n,r)=>L(t,r)}else e=T(e,(()=>!0));let s=[];const i=t.length;if(n)for(let n=i-1;n>=0;n--){const i=t[n];!e(i,n,n,t)!==r&&s.push(i)}else for(let n=0;n<i;n++){const i=t[n];e(i,n,n,t)!==r&&s.push(i)}return s}function M(t,e,n=!1){return a.isStr(t)?R(t,e,n):a.isArr(t)||a.isList(t)?V(t,e,n):F(t,e,n)}function D(t,e){let n;e=O(e);let r=-1;return A(t,(function(t,s){let i=e(t,s);n?i>=n&&(n=i,r=s):(n=i,r=s)})),r}function U(t,e){let n;e=O(e);let r=-1;return A(t,(function(t,s){let i=e(t,s);n?i<=n&&(n=i,r=s):(n=i,r=s)})),r}function H(t,e,n=!1){return e=T(e,(t=>t)),a.isArr(t)?function(t,e,n=!1){let r=[];const s=t.length;if(n)for(let n=s;n>=0;n--){let s=e(t[n],n,t);if(s===p)break;a.isUnd(s)||r.push(s)}else for(let n=0;n<s;n++){let s=e(t[n],n,t);if(s===p)break;a.isUnd(s)||r.push(s)}return r}(t,e,n):a.isObj(t)?function(t,e,n=!1){let r={};const s=Object.keys(t),i=t.length;if(n)for(let n=i;n>=0;n--){const i=s[n];let o=e(t[i],i,n,t);if(o===p)break;a.isUnd(o)||(r[i]=o)}else for(let n=0;n<i;n++){const i=s[n];let o=e(t[i],i,n,t);if(o===p)break;a.isUnd(o)||(r[i]=o)}return r}(t,e,n):void 0}function I(t,e){let n;return n=a.isStr(t)?"":a.isArr(t)?[]:{},A(t,(function(r,s){let i;e?i=e(r,s,t):!a.isArr(n)&&a.isObj(n)?(i={},i[s]=r):i=r,n=x(n,i)})),n}function W(t,e,n=t){return a.isUnd(e)&&(e=(t,e)=>t+e),A(t,((t,r,s)=>{n=e(n,t,r,s)})),n}function X(t,e,{excludeKeys:n=[],maxDepth:r=999,allowUnsafeProps:s=!1}={excludeKeys:[],maxDepth:999,allowUnsafeProps:!1},i=0){return i>=r||A(e,((o,l)=>{n&&b(n,l)||s&&b(_,l)||(a.isObj(e[l])?t[l]=X(C(e[l]),e[l],{excludeKeys:n,maxDepth:r,depth:i+1}):t[l]=o)})),t}function B(t,e){let n=t;if(a.isStr(t))n=e=>e[t];else if(a.isArr(t))n=e=>W(e,((e,n,r)=>{if(b(t,r))return e+n}),"");else if(!a.isFun(t))throw Error(e+" key only accepts: String, [String,...], Function");return n}o={ANY:m,ALL:g,BREAK:p,item:y,contains:b,add:E,remove:$,toggle:function(t,...e){if(0===e.length)return;e=I(e);let n=void 0;if(1===e.length)$(t,e)||E(t,e[0]);else{e.push(e[0]);let r=!1;A(t,((s,i)=>{n=e.indexOf(s),n>=0&&e.length>n+1&&(r=!0,t[i]=e[n+1])})),r||t.push(e[0])}},concat:x,emptyOf:C,objMatchOne:v,objMatchAll:w,deepMerge:X,deepClone:function(t,{excludeKeys:e=[],maxDepth:n=999,allowUnsafeProps:r=!1}={excludeKeys:[],maxDepth:999,allowUnsafeProps:!1}){return X(C(t),t,{excludeKeys:e,maxDepth:n,allowUnsafeProps:r})},forN:function(t,e=0,n=0,r=(e<n?1:-1)){if(r>0)for(;e<=n;e+=r)t(e);for(;e>=n;e+=r)t(e)},forEachRange:function(t,e,n=0,r){if(!a.isArr(t)||!a.isStr(t)){let s=Object.keys(t);r=r||s.length-1;for(let i=n;i<=r;i++){if(e(t[s[i]],s[i],i,t)===p)return i}return r}r=r||t.length;for(let s=n;s<r;s++){if(e(y(t,s),s,s,t)===p)return s}return r},forEach:A,forEachRight:S,firstIndex:k,first:j,startsWith:function(t,e){return a.isStr(t)&&a.isStr(e)?0===t.indexOf(e):(e=T(e,(()=>!0)))(j(t))},lastIndex:P,last:N,endsWith:function(t,e){return a.isStr(t)&&a.isStr(e)?t.indexOf(e)===t.length-e.length:(e=T(e,(()=>!0)))(N(t))},reverse:function(t){if(a.isArr(t))return t.reverse();let e="";return S(t,(function(t){e+=t})),e},any:L,all:q,filter:M,filterRight:function(t,e){return M(t,e,!0)},reduce:W,reduceRight:function(t,e,n=t){S(t,((t,r,s)=>{n=e(n,t,r,s)}))},map:H,flatMap:I,keyValuePairs:function(t){let e=[];return A(t,((t,n)=>{e.push(a.dict(n,t))})),e},entries:function(t){let e=[];return A(t,((t,n)=>{e.push([n,t])})),e},maxIndex:D,max:function(t,e){return t[D(t,e)]},minIndex:U,min:function(t,e){return t[U(t,e)]},translateObject:function(t,e){a.isArr(e)&&M(t,e);const n=Object.keys(e);let r=M(t,n);for(let t of n)r[e[t]]=r[t],delete r[t];return r},omit:function(t,e,n=!1){return a.isStr(t)?R(t,e,n,!0):a.isArr(t)||a.isList(t)?V(t,e,n,!0):F(t,e,n,!0)},join:function(t,...e){if(0===e.length)return[];if(!q(e,a.isArr))throw Error("Join only accepts arrays of data!");let n=B(t,"Join");const r={};return A(e,(t=>{A(t,(t=>{const e=n(t),s=r[e];r[e]=s?x(s,t):t}))})),r},groupBy:function(t,...e){if(0===e.length)return{};if(!q(e,a.isArr))throw Error("GroupBy only accepts arrays of data!");let n=B(t,"GroupBy");const r={};return A(e,(t=>{A(t,(t=>{const e=n(t),s=r[e];r[e]=s?x(s,t):[t]}))})),r},objectValues:function(t){return Object.values?Object.values(t):H(t,(t=>t))}};var G={};function K(t){return`[${t}] [${function(){let t=new Date;return`${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}:${t.getMilliseconds()}`}()}]`}function z(t,e){t.reverse(),t.push("display: inline-block; font-weight: bold; color: black","%c"+e),t.reverse()}const J={TRACE:0,INFO:1,WARN:2,ERROR:3,SILENT:-1},Q={LogLevel:J.TRACE};function Y(t){return Q.LogLevel!==J.SILENT&&Q.LogLevel<=t}G={Config:Q,LogLevels:J,showTrace:function(){Q.LogLevel=J.TRACE},showInfo:function(){Q.LogLevel=J.INFO},showWarn:function(){Q.LogLevel=J.WARN},showError:function(){Q.LogLevel=J.ERROR},silent:function(){Q.LogLevel=J.SILENT},trace:function(...t){Y(J.TRACE)&&(t.reverse(),t.push(K("🔍 TRACE")),t.reverse(),console.trace.apply(this,t))},info:function(...t){Y(J.INFO)&&(z(t,K("🔵 INFO")),console.log.apply(this,t))},warn:function(...t){Y(J.WARN)&&(z(t,K("🚨 WARN")),console.warn.apply(this,t))},error:function(...t){Y(J.ERROR)&&(z(t,K("💥 ERROR")),console.error.apply(this,t))}};var Z;Z={kebab:function(t){let e="",n=!1;for(let r=0;r<t.length;r++){let s=t.charAt(r);"_"!==s?(s>="A"&&s<="Z"&&r>0&&!n&&(e+="-"),e+=s.toLowerCase(),n=!1):(e+="-",n=!0)}return e},camel:function(t){let e="",n=!1;for(let r=0;r<t.length;r++){let s=t.charAt(r);"-"===s||"_"===s?n=!0:!0===n?(e+=s.toUpperCase(),n=!1):e+=0===r?s.toLowerCase():s}return e},pascal:function(t){let e="",n=!1;for(let r=0;r<t.length;r++){let s=t.charAt(r);"-"===s||"_"===s?n=!0:!0===n?(e+=s.toUpperCase(),n=!1):e+=0===r?s.toUpperCase():s}return e},snake:function(t){let e="",n=!1;for(let r=0;r<t.length;r++){let s=t.charAt(r);"-"!==s?(s>="A"&&s<="Z"&&r>0&&!n&&(e+="_"),e+=s.toLowerCase(),n=!1):(e+="_",n=!0)}return e}};var tt;const et=/^[-+]?\d*(\.\d+|\d*)(e[-+]?\d+)?$/,nt=/^[-+]?[a-f0-9]+$/,rt=/^[-+]?[0][0-7]+$/,st=/^[-+]?[01]+$/,it=/^[a-z0-9]([a-z0-9._%-+][a-z0-9]|[a-z0-9])*@[a-z0-9]([a-z0-9.-][a-z0-9]|[a-z0-9])*\.[a-z]{2,6}$/i;tt={isDecimal:function(t){return et.test(t)},isHex:function(t){return nt.test(t)},isOctal:function(t){return rt.test(t)},isBinary:function(t){return st.test(t)},isEmail:function(t){return it.test(t)},startsWith:function(t,e){return 0===t.indexOf(e)},endsWith:function(t,e){return t.indexOf(e)===e.length-1},contains:function(t,e){return t.indexOf(e)>=0}};var ot;function at(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}class lt{constructor(){at(this,"__src__",void 0),at(this,"keys",void 0)}get count(){return this.keys.length}static of(t){let e=new lt;return e.__src__=t,e.keys=Object.keys(t),e.len=e.keys.length,e}slice(t=0,e=this.count-1){this.keys=this.keys.slice(t,e)}key(t=0){return this.keys[t]}value(t=0){return this.__src__[this.key(t)]}loop(t,e=!1){if(e)for(let e=this.count-1;e>=0&&null!==t(this.value(e),this.key(e),e);e--);else for(let e=0;e<this.count&&null!==t(this.value(e),this.key(e),e);e++);return this}values(t=!1){let e=[];return this.loop((function(t,n,r){e.push(t)}),t),e}item(t){if(void 0===t)return;if(a.isArr(this.__src__))return this.value(t);let e={};return e[this.key(t)]=this.value(t),e}asObject(){let t={};return this.loop((function(e,n,r){t[n]=e})),t}asArray(t=!1){return this.values(t)}filter(t,e=!1){let n=[];return this.loop((function(e,r,s){let i=t(e,r,s);if(!0===i)n.push(r);else if(null===i)return null}),e),this.keys=n,this}map(t,e=!1){let n=[];return this.loop((function(e,r,s){n.push(t(e,r,s))}),e),n}any(t){let e=!1;return this.loop((function(n,r,s){if(e=t(n,r,s),!0===e)return null})),e}all(t){let e=!0;return this.loop((function(n,r,s){if(e=t(n,r,s),!1===e)return null})),e}first(t){if(!t)return this.item(0);let e;return this.loop((function(n,r,s){if(!0===t(n,r,s))return e=s,null})),this.item(e)}last(t){if(!t)return this.item(this.count-1);let e;return this.loop((function(n,r,s){if(!0===t(n,r,s))return e=s,null}),!0),this.item(e)}}ot={Queryable:lt};var ut={};function ct(t){return t.toString().match(/{[\w\W]*}/)[0]}ut={funcBodyEquals:function(t,e){return ct(t)===ct(e)},throttle:function(t,e){var n=(new Date).getTime();return function(r){(new Date).getTime()-n>=e&&(n=(new Date).getTime(),t.call(this,r))}},debounce:function(t,e){var n=null;function r(...r){clearTimeout(n),n=setTimeout((function(e){return t.apply(e,r)}),e,this)}return r.flush=function(...e){return clearTimeout(n),t.apply(this,e)},r},bindArgs:function(t,e){return function(){return t.apply(this,e)}},once:function(t){var e=!1;return function(){if(!e)return e=!0,t.apply(this,arguments)}}},i={...o,...G,...a,...Z,...tt,...ot,...ut};var ft,ht;const{isEl:dt,isEls:pt,isStr:mt,isVal:gt}=a;var _t;const{toggle:yt,any:bt,all:Et,contains:$t,filter:vt,flatMap:wt,forEach:Tt}=o;class Ot{static split(t){return t.trim().replace(/\s+/," ").split(" ")}constructor(t){this.element=t,Object.defineProperty(this,"items",{get(){return this.classes},set(t){let e=!1;this.classes&&(e=!0),!a.isVal(t)||a.isEmpty(t)?this.classes=[]:a.isArr(t)?this.classes=t:a.isStr(t)?this.classes=Ot.split(t):t instanceof DOMTokenList&&(this.classes=Array.from(t)),e&&this.__update__()}}),this.items=t.getAttribute("class")}static of(t){return new Ot(t)}__update__(){this.element.setAttribute("class",this.classes.join(" "))}contains(...t){return t=wt(t),Et(t,(t=>$t(this.classes,t)))}add(...t){t=wt(t),Tt(t,(t=>{this.contains(t)||this.classes.push(t.toString())})),this.__update__()}remove(...t){t=wt(t);let e=this.classes.length;return this.classes=vt(this.classes,(e=>!bt(t,(t=>t.endsWith("*")?e.startsWith(t.replace("*","")):e===t)))),this.__update__(),e!==this.classes.length}toggle(...t){yt(this.classes,t),this.__update__()}}Object.seal(Ot),_t={Classes:Ot,cls:function(t){return Ot.of(t)},addClass:function(t,...e){Ot.of(t).add(e)},hasClass:function(t,...e){Ot.of(t).contains(e)},removeClass:function(t,...e){Ot.of(t).remove(e)},toggleClass:function(t,...e){Ot.of(t).toggle(e)}};const{cls:Ct}=_t;function xt(t,e=document){return dt(t)?Array.of(t):pt(t)?Array.from(t):mt(t)?dt(e)?Array.from(e.querySelectorAll(t)):(G.error(`Query root is not a node!\t[X.$(${t}, ${e})]`),null):(G.error(`Query is not string nor element X.$(${t})`),null)}ht={$:xt,$$:function(t,e=document){return dt(t)?Array.of(t):mt(t)?dt(e)?Array.of(e.querySelector(t)):(G.error(`Query root is not a node!\t[X.$(${t}, ${e})]`),null):(G.error(`Query is not string nor element X.$$(${t})`),null)},queryOf:function t(e,n,r){if(!gt(e)||!dt(e))return G.error(`\nQuery generator's first parameter must be Element/Node! CAUSE: X.queryOf(${e}, ${n})`),null;n=n||document.body;let s=e.tagName;if(r=r||"",e.id)return s+=e.id?"#"+e.id:"",s+(""!==r?" "+r:"");if(Ct(e).items.forEach((function(t){s+=""!==t?"."+t:""})),s){if(xt(s,e.parentElement).length>1){let t=Array.from(e.parentElement.children).findIndex((function(t){return e===t}));t>0&&(s=s+":nth-child("+(t+1)+")")}}return e.parentElement&&e.parentElement!==n&&e.parentElement!==document?t(e.parentElement,n)+" > "+s+(""!==r?" "+r:""):s+(""!==r?" "+r:"")}};var At={};const{isArr:St,hasField:kt,isEmpty:jt}=a,{contains:Pt,forEach:Nt,filter:Lt}=o,{error:qt}=G,{funcBodyEquals:Rt}=ut;At={setEvent:function(t,n,r,s){e.isBrowser()?(St(n)||(n=Pt(n," ")?n.split(" ").Map((t=>t.trim())):[n]),t.__EVENTS__=t.__EVENTS__||{},Nt(n,(e=>{t.__EVENTS__[e]=t.__EVENTS__[e]||[];let n=function(e){r(e,t)};kt(s,"duplicates",(t=>t))||(t.__EVENTS__[e]=Lt(t.__EVENTS__[e],(n=>{if(Rt(n.l,r))return t.removeEventListener(e,n.f,n.o),!1;console.log("notEqual",n.l.toString(),r.toString())}))),t.__EVENTS__[e].push({f:n,l:r,o:s}),t.addEventListener(e,n,s)}))):qt("Events are browser only!")},clearEvent:function(t,n){e.isBrowser()?(St(n)||(n=Pt(n," ")?n.split(" ").Map((t=>t.trim())):[n]),t.__EVENTS__=t.__EVENTS__||{},jt(t.__EVENTS__)||Nt(n,(function(e){t.__EVENTS__[e]=t.__EVENTS__[e]||[],jt(t.__EVENTS__[e])||(Nt(t.__EVENTS__[e],(n=>(t.removeEventListener(e,n.f,n.o),!1))),t.__EVENTS__[e]=[])}))):qt("Events are browser only!")},hasEvent:function(t,e){return t.__EVENTS__&&t.__EVENTS__[e]&&!jt(t.__EVENTS__[e])}};var Ft;function Vt(t){let e={};return o.forEach(t.getAttributeNames(),(n=>e[n]=t.getAttribute(n))),e}function Mt(t,e,n){return!!t.hasAttribute(e)&&(!n||t.getAttribute(e)===n)}function Dt(t,e){return t.getAttribute(e)}function Ut(t,e,n){a.isArr(e)?o.forEach(e,(t=>this.set(t,n))):a.isObj(e)?o.forEach(e,((t,e)=>this.set(e,t))):t.setAttribute(e,n)}class Ht{constructor(t){this.element=t}keys(){return this.element.getAttributeNames()}all(){return Vt(this.element)}set(t,e){return Ut(this.element,t,e),this}get(t){return Dt(this.element,t)}has(t,e){return Mt(this.element,t,e)}remove(t){this.set(t,void 0)}}Ft={getAttributes:Vt,Attributes:Ht,getAttr:Dt,hasAttr:Mt,setAttr:Ut,attrs:function(t){return new Ht(t)}};var It;function Wt(t){return t.offsetLeft}function Xt(t){return t.clientLeft}function Bt(t){return t.offsetWidth}function Gt(t){return t.clientWidth}It={left:Wt,leftWin:Xt,right:function(t){return Wt(t)+Bt(t)},rightWin:function(t){return Xt(t)+Gt(t)},width:Bt,widthWin:Gt};var Kt;Kt={append:function(t,...e){window.dispatchEvent(new CustomEvent("x.dom.append",{detail:{parent:t,elements:e}})),t.append(...e)}};var zt;const{error:Jt}=G,{forEach:Qt}=o,{isVal:Yt,isArr:Zt,isObj:te,isEl:ee,hasField:ne}=a,{setAttr:re}=Ft,{setEvent:se}=At,ie="atr",oe="evt";zt={patch:function(t,e){if(Yt(t))if(ee(t)){if(ne(e,ie)&&te(e.atr)&&Qt(e.atr,((e,n)=>{re(t,n,e)})),ne(e,"cls")){const n=e.cls;Zt(n)?t.className=n.join(" "):t.className=n}ne(e,oe)&&te(e.evt)&&Qt(e.evt,((e,n)=>{se(t,n,e)}))}else Jt(`"${t}" is not Element or Node`);else Jt("Node is "+t)}};var ae;const{isUnd:le,isStr:ue}=a,{filter:ce,contains:fe}=o,he=["","initial","unset",void 0,null];function de(t,e,n){if(le(e)){let e=getComputedStyle(t);return e=ce(e,((t,e)=>ue(e)&&!fe(he,t))),e}if(le(n))return t.style[e]||getComputedStyle(t)[e];t.style[e]=n}ae={style:de,hasStyle:function(t,e){let n=de(t,e);return!fe(he,n)}},ft={...ht,...At,..._t,...Ft,...It,...Kt,...zt,...ae};var pe,me;const{$:ge,$$:_e}=ht;class ye{constructor(t,e){this.type=t,this.data=e}}me={HttpContent:ye,HttpRq:class{setMethod(t){this.method=t.toUpperCase()}setUrl(t){this.url=encodeURI(t)}setArg(t,e){this.args[t]=e}buildUrlEncoded(t){let e="";t=t||this.args;let n=Object.keys(t);if(n.length>0)for(let r=0;r<n.length;r++)e+=encodeURIComponent(n[r])+"="+encodeURIComponent(t[n[r]]),r<n.length-1&&(e+="&");return e}setHeader(t,e){this.headers[t]=e.toString()}getHeader(t){return this.headers[t]}setContent(t,e){this.content.type=t.toLowerCase(),this.content.data=e}jsonContent(t){let e="";e="string"==typeof t?t:JSON.stringify(t),this.setContent("json",e),this.setHeader("Content-Type","application/json")}xmlContent(t){a.isStr(t)?this.setContent("xml",t):this.setContent("xml",t.outerHTML),this.setHeader("Content-Type","application/xml")}formContent(t){let e=_e(t)[0],n=new FormData(e);this.formMultiPartContent(n)}formMultiPartContent(t){this.setContent("form_multipart",t)}formUrlEncodedContent(t){this.setContent("form_urlencoded",this.buildUrlEncoded(t)),this.setHeader("Content-Type","application/x-www-form-urlencoded")}constructor(t="GET",e,n,r,s){this.args=n||{},this.headers=r||{},this.content=s||new ye("#urlencoded",{}),this.setMethod(t),this.setUrl(e)}}};var be;function Ee(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}be={HttpRs:class{constructor(t){Ee(this,"json",void 0),Ee(this,"xml",void 0),this.xhr=t,this.status={code:t.status,text:t.statusText},this.headers=t.getAllResponseHeaders(),this.contentLength=t.response.length||0,this.data=t.response,"text"!==t.responseType&&""!==t.responseType||(this.text=t.responseText),Object.defineProperty(this,"json",{get(){try{t.responseJSON||(t.responseJSON=JSON.parse(this.xhr.responseText))}catch(t){console.log(t)}return t.responseJSON}}),Object.defineProperty(this,"xml",{get(){try{if(!t.responseXML&&!t.responseXml){let e=new DOMParser;t.responseXml=e.parseFromString(self.text,"text/xml")}}catch(t){console.log(t)}return t.responseXml}})}}};var $e;const{HttpRq:ve,HttpContent:we}=me,{HttpRs:Te}=be,{forEach:Oe}=o;$e={Ajax:class{constructor(t,e,n={},r={},s=new we){this.rq={},this.rs={},this.rq=t instanceof ve?t:new ve(t,e,n,r,s),this.rs={readyState:0},this.xhr=new XMLHttpRequest,this.preparedCallback=function(t){},this.progressCallback=function(t,e){},this.uploadProgressCallback=function(t){},this.successCallback=function(t,e){},this.uploadFinishCallback=function(t){},this.failCallback=function(t,e){},Object.defineProperty(this,"xhr",{enumerable:!1})}header(t,e){return this.rq.setHeader(t,e),this}headers(t={}){return Oe(t,((t,e)=>{this.rq.setHeader(e,t)})),this}onSuccess(t){return this.successCallback=t,this}onUploadSuccess(t){return this.uploadFinishCallback=t,this}onFail(t){return this.failCallback=t,this}onProgress(t){return this.progressCallback=t,this}onUploadProgress(t){return this.uploadProgressCallback=t,this}withContent(t={}){switch(t.type){case"json":this.rq.jsonContent(t.data);break;case"xml":this.rq.xmlContent(t.data);break;case"form":this.rq.formContent(t.data);break;case"form_multipart":this.rq.formMultiPartContent(t.data);break;case"form_urlencoded":this.rq.formUrlEncodedContent(t.data);break;default:this.rq.setContent(t.type,t.data)}return this}xmlData(t){return this.rq.xmlContent(t),this}formData(t){return this.rq.formContent(t),this}jsonData(t){return this.rq.jsonContent(t),this}urlEncodedData(t){return this.rq.formUrlEncodedContent(t),this}_prepare(t){if(this.isPrepared&&!t)return this;let e=this.rq.url;this.rq.args&&!a.isEmpty(this.rq.args)&&(e.indexOf("?")>=0||(e+="?"),e+=this.rq.buildUrlEncoded()),t&&(this.xhr=new XMLHttpRequest),this.xhr.open(this.rq.method,e);for(let t in this.rq.headers)this.rq.headers.hasOwnProperty(t)&&this.xhr.setRequestHeader(t,this.rq.headers[t]);return this.isPrepared=!0,this.preparedCallback&&this.preparedCallback(this.rq),this}send(t){this._prepare();let e=this,n=this.xhr;this.xhr.onreadystatechange=function(r){if(4===n.readyState){let r;r=n.status>=200&&n.status<=399?e.successCallback:e.failCallback,e.rs=new Te(n),t&&t(e.rq,e.rs,e.xhr),r&&r(e.rq,e.rs,e.xhr)}},this.xhr.onprogress=function(t){e.progressCallback&&e.progressCallback(t,e)},this.xhr.upload.onprogress=function(t){e.uploadProgressCallback&&e.uploadProgressCallback(t,e)},this.xhr.upload.onloadend=function(t){e.uploadFinishCallback&&e.uploadFinishCallback(t,e)};try{this.xhr.send(this.rq.content.data)}catch(t){this.onFail(t)}return e}async sendAsync(){const t=this,e=new Promise(((e,n)=>{t.onSuccess((()=>e(t))),t.onFail((()=>n(t)))}));return t.send(),e}}};var Ce={};const{Ajax:xe}=$e,{HttpContent:Ae}=me;function Se(t,e,n,r,s,i){let o=new xe(t.toUpperCase(),e,n,r);return s&&s.type&&("json"===s.type.toLowerCase()?o.jsonData(s.data):"urlencoded"===s.type.toLowerCase()?o.urlEncodedData(s.data):"form"===s.type.toLowerCase()?o.formData(s.data):o.Rq.setContent(s.type,s.data)),i.success&&o.onSuccess(i.success),i.fail&&o.onFail(i.fail),i.progress&&o.onProgress(i.progress),i.prepare&&(o.preparedCallback=i.prepare),i.uploadProgress&&(o.uploadProgressCallback=i.uploadProgress),i.uploadFinish&&(o.uploadFinishCallback=i.uploadFinish),o}function ke(t){return Se(t.method||"OPTIONS",t.url,t.params,t.headers,new Ae(t.type,t.data),{success:t.success,fail:t.fail,progress:t.progress,prepare:t.prepare,uploadProgress:t.uploadProgress,uploadFinish:t.uploadFinish})}function je(t,e=null,n=null){return new Promise(((r,s)=>{t.onSuccess((()=>{if(e)try{e(n)}catch(t){}return r(t)})),t.onFail((()=>s(t)))}))}async function Pe(t){let e=ke(t);return e.send(t.finish),await je(e)}Ce={makeHttpRequest:Se,makeRequest:ke,makePromise:je,sendRequest:Pe,Get:function(t,e){return new xe("GET",t,e)},Post:function(t,e){return new xe("POST",t,e)},Delete:function(t,e){return new xe("DELETE",t,e)},Put:function(t,e){return new xe("PUT",t,e)},Patch:function(t,e){return new xe("PATCH",t,e)},sendGet:function(t){return t.method="GET",t.type=void 0,t.data=void 0,Pe(t)},sendDelete:function(t){return t.method="DELETE",Pe(t)},sendPost:function(t){return t.method="POST",Pe(t)},sendPut:function(t){return t.method="PUT",Pe(t)},sendPatch:function(t){return t.method="PATCH",Pe(t)}};var Ne;const{startsWith:Le,endsWith:qe,filter:Re,forEach:Fe}=o;class Ve{constructor(){var t,e,n;n=[],(e="all")in(t=this)?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}use(t){this.all.push(t)}}Ne={XHttpClient:class{constructor(t="",{ratePerMinute:e=300}={}){qe(t,"/")&&(t=t.split("").splice(t.length-1).join()),this.interceptors={request:new Ve,response:new Ve},this.host=t,this.__queue=[],this.__sending=[],this.__interval=void 0,this.__ratePerMinute=e,this.__timeBetween=6e4/e,this.__lastRequestTime=(new Date).getTime()-this.__timeBetween}_intervalSend(t){if(0===t.__queue.length)return clearInterval(t.__interval),void(t.__interval=void 0);let e=(new Date).getTime();if(e-t.__lastRequestTime>t.__timeBetween){let n=t.__queue.pop().send();t.__sending.push(n),t.__lastRequestTime=e}}_addRequest(t,{responseType:e,cancelToken:n}){return this.__queue.push(t),this.__interval||(this.__interval=setInterval(this._intervalSend,1,this)),t.cancelToken=n,e&&(t.xhr.responseType=e),Ce.makePromise(t,(({client:t,request:e})=>{let n=t.__sending.indexOf(e);n>=0&&t.__sending.splice(n)}),{client:this,request:t})}send(t){this._addRequest(t)}_contentRequest(t,e,{params:n,headers:r,content:s,responseType:i,cancelToken:o}){return!Le(e,"/")&&e.length>1&&(e="/"+e),this._addRequest(t(this.host+e,n||{}).headers(r||{}).withContent(s||{type:"",data:""}),{responseType:i,cancelToken:o})}get(t,{params:e,headers:n,responseType:r,cancelToken:s}={}){return!Le(t,"/")&&t.length>1&&(t="/"+t),this._addRequest(Ce.Get(this.host+t,e).headers(n),{responseType:r,cancelToken:s})}post(t,{params:e,headers:n,content:r,responseType:s,cancelToken:i}={}){return this._contentRequest(Ce.Post,t,{params:e,headers:n,content:r,responseType:s,cancelToken:i})}put(t,{params:e,headers:n,content:r,responseType:s,cancelToken:i}={}){return this._contentRequest(Ce.Put,t,{params:e,headers:n,content:r,responseType:s,cancelToken:i})}patch(t,{params:e,headers:n,content:r,responseType:s,cancelToken:i}={}){return this._contentRequest(Ce.Patch,t,{params:e,headers:n,content:r,responseType:s,cancelToken:i})}delete(t,{params:e,headers:n,content:r,responseType:s,cancelToken:i}={}){return this._contentRequest(Ce.Delete,t,{params:e,headers:n,content:r,responseType:s,cancelToken:i})}cancel(t){this.__queue=Re(this.__queue,(e=>e.cancelToken!==t));let e=Re(this.__sending,(e=>e.cancelToken===t));Fe(e,(t=>{try{t.xhr.abort()}catch(t){console.log(t)}})),this.__sending=Re(this.__sending,(e=>e.cancelToken!==t))}}},pe={...me,...be,...$e,...Ce,...Ne};var Me,De={};Me=De,Object.defineProperty(Me,"__esModule",{value:!0});const{kebab:Ue}=Z,{forEach:He}=o;function Ie(t){let e=[];return He(t,((t,n)=>{e.push(`${Ue(n)}: ${t};`)})),e}function We(){return Date.now().toString(24).slice(2)+Math.random().toString(24).slice(6)}function Xe(t){return a.isFun(t.render)}function Be(t){return/on[A-Z]+/.test(t)}function Ge(t){return t.slice(2).toLowerCase()}var Ke=function(t){return t&&t.__esModule?t.default:t}({generateStyles:Ie,generateCss:function(t,e="\n"){return Ie(t).sort(((t,e)=>t[0].localeCompare(e[0]))).join(e)}});function ze(t,e){return a.isVal(t)?a.isStr(t)?t:a.isArr(t)?t.join(e):Ke.generateCss(t,e):""}function Je(t,e,n){const r=[],s=t.length;for(let n=0;n<s;n++){let s=t[n];if("FRAGMENT"===s.$tag&&(s=s.nodes),"Array"===s.constructor.name){const t=s.length;for(let n=0;n<t;n++){let t=s[n];(a.isStr(t)||a.isNum(t))&&(t=hn.createText(t.toString())),e&&(t=e(t)),r.push(t)}}else(a.isStr(s)||a.isNum(s))&&(s=hn.createText(s.toString())),e&&(s=e(s)),r.push(s)}return r}function Qe(t={},e={}){const n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(let r of n)if(e[r]!==t[r])return!1;return!0}var Ye={randomId:We,compileProps:function(t){const e={events:{},attrs:{}};return o.forEach(t,((t,n)=>{Be(n)?e.events[Ge(n)]=t:e.attrs[n]=t})),e},compileStyles:ze,isComponent:Xe,isStatic:function t(e){return!Xe(e)&&o.all(e.nodes,(e=>t(e)))},isEventPropKey:Be,normalizeEventName:Ge,sameClass:function(t,e){let n=t.constructor.name,r=e.name;return a.hasField(t,"prototype")&&(n=t.prototype.constructor.name),a.hasField(e,"prototype")&&(r=e.prototype.constructor.name),console.log(n,r),n===r},isChildOf:function(t,e){const n=(e.prototype||Object.getPrototypeOf(e)).constructor.name;let r=t.prototype||Object.getPrototypeOf(t);for(;r;){if(r.name===n||r.constructor.name===n)return!0;r=Object.getPrototypeOf(r)}return!1},instanceOf:function(t,e){const n=Object.getPrototypeOf(t),r=e.prototype;return n.constructor.name===r.constructor.name},renameFunc:function(t,e){return new Function("fn",`return function ${e}() {return fn.apply(this, arguments)}`)(t)},copyPrototype:function(t){let e=Object.getOwnPropertyDescriptors(t),n=Object.create({});return Object.defineProperties(n,e),console.log(n),n},prepareChildren:Je,swapChildNodes:function(t,e,n,r){t.insertBefore(e[n],e[r])},substituteTextNodes:function(t){return t.map((t=>a.isStr(t)||a.isNum(t)?hn.createText(t.toString()):t))},sameProps:Qe},Ze=0,tn=1,en=2;function nn(t,e){return t.$isView&&!e&&(e=void 0),i.isStr(t)?t=hn.createText(t):t.$isView?rn(t,e):t instanceof Function?nn(t(),e):(t.nodes&&(t.nodes=t.nodes.map((e=>nn(e,t)))),t)}function rn(t,e){try{let n=t.render.call(t,t.props);return t.$node=n,t.onCreate&&t.onCreate.call(t),n.$isView?rn(n,e):(n.$isFrag&&(t.$isFrag=!0),n.nodes&&(n.nodes=Je(n.nodes,nn)),t)}catch(e){console.log(t,e)}}function sn(t,e,n){let r=!1;if(t.$isView&&(r=!0,t.$node||(t=nn(t,n)),t=(n=t).$node),t.$isFrag){if(e||(console.trace("fragment has no parent Element"),e=document.createElement("div")),t.target=e,e.__node__=n,t.nodes)for(const r of t.nodes)r.$isFrag?sn(r,e,t):e.append(sn(r,void 0,n));return r&&n.onMount&&(n.onMount.call(n),n.target=e),e}if(t.isText)return e=document.createTextNode(t.text),t.target=e,e;if(e||(e=document.createElement(t.$tag)),t.target=e,e.__node__=r?n:t,t.$isFrag?console.error("render-dom: something broke!",t):function(t,e,n){e.attrs&&o.forEach(e.attrs,((e,n)=>{"style"===n&&(e=ze(e," ")),t.setAttribute(n,e)})),e.events&&o.forEach(e.events,((e,r)=>{n&&(e=e.bind(n)),At.setEvent(t,r,e)}))}(e,t,n),t.nodes)for(const r of t.nodes)r.$isFrag?sn(r,e,n):e.append(sn(r,void 0,n));return n&&(n.target=e,n.$isDirty=!1),e}function on(t,e){return!t.$isView||t.shouldUpdate&&t.shouldUpdate(e)}function an(t,e){e.target=t.target,function(t,e,n){const r=Object.keys(t),s=Object.keys(e),i=Object.keys(t);for(let r of i){const i=t[r];if(s.indexOf(r)<0)n.setAttribute(r,i);else if("style"===r){const t=ze(i," ");t!==ze(i," ")&&n.setAttribute("style",t)}else i!==e[r]&&n.setAttribute(r,i)}for(let t of s)r.indexOf(t)<0&&n.removeAttribute(t)}(e.attrs,t.attrs,t.target)}function ln(t,e=!0){if(t.isText)return t.target;if(!t.$isFrag)return t.$isView?t.$node.target:t.target;let n=t.$isView?t.$node.nodes[0]:t.nodes[0];for(;!n.target;)n=n.$isView?n.$node.nodes:n.nodes[0];let r=n.target;return e&&(n.target=void 0),r}function un(t,e,n,r){const s=e.length,i=t.length,o=i<s;let a=[],l=0;for(;l<s&&(!o||l!==i);l++){const s=e[l],i=t[l],o=i.$isFrag,a=s.$isFrag;if(s.$isView)if(i.$isView)if(s.$name===i.$name){if(!on(i,s.props)){e[l]=i;continue}cn(i,s.props),e[l]=i}else sn(nn(s)),i.target.replaceWith(s.target),i.target=void 0,i.$remove();else{let t=o?ln(i):i.target;if(a){let e=sn(nn(s),o?document.createElement("div"):t);t.replaceWith(e)}else{let e=nn(s,n.rootView);t.replaceWith(sn(e.$node,void 0,e))}i.$remove()}else if(s.$isNode)if(i.$isNode)if(i.$tag===s.$tag){o||a||an(i,s);try{un(i.nodes,s.nodes,n,r)}catch(t){console.log(t)}}else{let t=sn(s);i.target.replaceWith(t)}else{let t=ln(i);try{if(a){let e=sn(nn(s),document.createElement("div"));t.replaceWith(e)}else t.replaceWith(sn(nn(s)));i.$remove()}catch(t){console.error(t)}}else if(s.text!==i.text)if(i.isText)s.target=i.target,i.target.textContent=s.text;else{let t=ln(i);e[l]=nn(s,void 0),t.replaceWith(sn(e[l]))}else s.target=i.target}if(o){let t=e[l-1].$lastElement(),r=document.createElement("div");r.style.display="none",t.nextSibling?t.parentElement.insertBefore(r,t.nextSibling):t.parentElement.append(r);for(let t=l;t<s;t++){let r=sn(e[t],void 0,n);a.push(r),e[t].target=r}r.replaceWith(...a)}else if(s<i)for(let e=s;e<i;e++)t[e].$remove()}function cn(t,e){if(!on(t,e))return t;e&&i.concat(t.props,e,!0);let n=t.render.call(t,t.props),r=n.$isFrag?n.nodes:[n];t.$isFrag=n.$isFrag;let s=t.$isFrag?t.$node.nodes:[t.$node];return n.$isView&&cn(n),un(s,r,t),t.$node=n,t.$isDirty=!1,t.onUpdate&&t.onUpdate.call(t),t}class fn{constructor(t={},e=t){var n,r,s;s=(t={})=>this.$isDirty||!Qe(this.props,t),(r="shouldUpdate")in(n=this)?Object.defineProperty(n,r,{value:s,enumerable:!0,configurable:!0,writable:!0}):n[r]=s,this.$type=en,this.$name=this.constructor.name,this.$isView=!0,this.$node=void 0,this.$isDirty=!0,this.$constructor=e;let i=Object.getOwnPropertyNames(this.$constructor);for(let t=0;t<i.length;t++){const e=i[t];this.$constructor[e]instanceof Function?this[e]=this.$constructor[e]:this[e]=o.deepClone(this.$constructor[e])}Object.defineProperty(this,"$update",{value:ut.debounce((()=>{this.$isDirty=!0,window.requestAnimationFrame?requestAnimationFrame((()=>{cn(this)})):window.webkitRequestAnimationFrame?webkitRequestAnimationFrame((()=>{cn(this)})):cn(this)}),20),enumerable:!1,configurable:!1,writable:!1})}render(){return""}static create(t,e){let n=new fn(e);return e.render||console.warn("render method is not defined"),n.$name=t,n}createInstance(t,e){const n=this.$constructor,r=this.$name;let s=new fn(n,n);return s.$name=r,s.$instanceId=We(),s.$isDirty=!0,s.updateInstance(t,e)}updateInstance(t,e){return this.props||(this.props={}),t&&o.concat(this.props,t,!0),e&&(e=Je(e)),this.$children=e,this.$instanceId=We(),this.$isDirty=!0,this}setState(t){let e=t.call(this,this.state);a.isObj(e)&&(this.state=e),this.$update()}$remove(){this.onDestroy&&this.onDestroy(),this.$isFrag||this.$node.target.remove();for(const t of this.$node.nodes)t.$remove()}$firstElement(){if(this.$node)return this.$node.$firstElement()}$lastElement(){if(this.$node)return this.$node.$lastElement()}}class hn{constructor(t,e,...n){if(this.$tag=t,"#text"===t)return this.$type=Ze,this.text=e,void(this.isText=!0);this.$isNode=!0,this.$type=tn,"FRAGMENT"===t&&(this.$isFrag=!0),e&&o.concat(this,Ye.compileProps(e)),n&&(n=Ye.prepareChildren(n),this.nodes=n)}static create(t,e={},...n){null===e&&(e={});const r=[],s=n.length;for(let t=0;t<s;t++){let e=n[t];if("FRAGMENT"===e.$tag&&(e=e.nodes),e instanceof Array){const t=e.length;for(let n=0;n<t;n++){let t=e[n];(i.isStr(t)||i.isNum(t))&&(t=new hn("#text",t.toString())),r.push(t)}}else(i.isStr(e)||i.isNum(e))&&(e=new hn("#text",e.toString())),r.push(e)}return n=r,t.$isView?t.createInstance(e,n):t.$type===en?(new t).updateInstance(e,n):new hn(t,e,...n)}static createText(t){return new hn("#text",t)}static createTag(t,e={},...n){return new hn(t,e,...n)}$remove(){if(!this.$isFrag&&this.target&&this.target.remove(),this.nodes)for(let t of this.nodes)t.$remove()}$firstElement(){return this.$isFrag?this.nodes?this.nodes[0].$firstElement():void 0:this.target}$lastElement(){return this.$isFrag?this.nodes?this.nodes[this.nodes.length-1].$firstElement():void 0:this.target}}const dn={View:fn,createView:fn.create,createElement:hn.create,render:nn,renderDom:sn,mount:function(t,e){sn(nn(t),e)}};De.Exir=dn;const pn=hn.create;De.jsx=pn;var mn={Exir:dn,jsx:pn};De.default=mn,s={Core:i,Dom:ft,Http:pe,VM:De},e.setGlobal({X:{...s.Core,...s.Dom,...s.Http},...s.VM})}();
//# sourceMappingURL=exir-bundle.js.map
