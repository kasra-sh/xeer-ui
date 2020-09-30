const T = require("./types");

if (!global._X_LOOP_BREAK_) {
    global._X_LOOP_BREAK_ = Symbol("BREAK_LOOP");
    global._X_ANY_ = Symbol("ANY");
    global._X_ALL_ = Symbol("ALL");
}

const BREAK = global._X_LOOP_BREAK_;
const ANY = global._X_ANY_;
const ALL = global._X_ALL_;
const UNSAFE_PROPS = ['__proto__', 'constructor', '__defineGetter__', '__defineSetter__', 'prototype'];

function item(s, i) {
    if (!T.isVal(s)) return undefined;
    if (T.isObj(s)) return s[i]
    if (T.isStr(s)) return s[i]
    if (T.isArr(s)) return s[i]
    else return s.item(i)
}

function contains(s, v, k) {
    if (!T.isVal(s)) return false;
    if (!T.isArr(s) && T.isObj(s)) return s[k] === v;
    return s.indexOf(v) >= 0;
}

function add(src, ...v) {
    if (T.isArr(src)) {
        forEach(v, (vi) => src.push(vi))
        // src.push(v);
    } else if (T.isMutableList(src)) {
        src.add(v);
    }
}

function remove(src, ...it) {
    it = flatMap(it);
    let any = false;
    forEach(it, (item) => {
        let idx = src.indexOf(item);
        if (idx >= 0) {
            any = true
            src.splice(idx, 1);
        }
    });

    return any;
}

function toggle(src, ...c) {
    if (c.length === 0) return;
    c = flatMap(c);
    let idx = undefined;
    if (c.length === 1) {
        if (!remove(src, c)) {
            add(src, c[0])
        }
    } else {
        c.push(c[0]);
        let any = false;
        forEach(src, (cl, i) => {
            idx = c.indexOf(cl);
            if (idx >= 0 && c.length > (idx + 1)) {
                any = true;
                src[i] = c[idx + 1]
            }
        });
        if (!any) {
            src.push(c[0])
        }
    }
}

function objMatchOne(o, match) {
    let m = Object.keys(match);
    for (let k of m) {
        // if (!T.isObj(o[k])) continue;
        if (match[k] === ANY && o.hasOwnProperty(k)) return true;
        if (match[k] === o[k]) return true;
    }
    return false
}

function objMatchAll(o, match) {
    let m = Object.keys(match);
    for (let k of m) {
        // if (!T.isObj(o[k])) return false;
        if (match[k] === ANY) continue;
        if (match[k] !== o[k]) return false
    }
    return true
}

function predicate(f, def = () => true, inc = true) {
    if (T.isUnd(f)) return def;
    if (T.isFun(f)) return f;
    else if (f instanceof RegExp) return (v) => !T.isObj(v) ? f.test(v.toString()) : false;
    else if (T.isObj(f)) {
        if (Object.keys(f).length === 0) return def;
        return inc ? (v) => objMatchOne(v, f) : (v) => objMatchAll(v, f);
    } else return (v) => v === f;
}

function funOrKey(f) {
    if (T.isUnd(f)) return (v) => v;
    if (T.isFun(f)) return f;
    if (T.isStr(f)) {
        const key = f;
        f = (v) => v[key];
    }
    throw Error(`Predicate ${f} cannot be of type ${typeof f}`)
}

function emptyOf(src, def = {}) {
    if (T.isStr(src)) return "";
    if (T.isList(src)) return [];
    if (T.isObj(src)) {
        if (T.isEl(src)) {
            if (src.nodeType === 3 || src.nodeType === 8) {
                return document.createTextNode(src.textContent);
            } else {
                return document.createElement(src.tagName);
            }
        }
        if (src.__proto__)
            return Object.create(src.__proto__);
        return {};
    }
    return def
}

function concat(target, source) {
    if (T.isStr(target)) {
        return target.concat(source);
    }
    if (T.isArr(target)) {
        return target.concat(source);
    }
    let d = target;
    for (let k of Object.keys(source)) {
        if (T.isArr(source[k])) {
            // if (!T.isVal(target[k])) target[k] = [];
            // concat(target[k], source[k]);

        } else if (T.isObj(source[k])) {
            // if (!T.isVal(target[k])) target[k] = {};
            // concat(target[k], source[k])
        } else
            d[k] = source[k];
    }
    return d
}

function objectValues(obj) {
    if (Object.values) {
        return Object.values(obj);
    } else {
        return map(obj, (v)=>v)
    }
}

function forRange(src, func, start = 0, end) {
    if (!T.isArr(src) || !T.isStr(src)) {
        let keys = Object.keys(src);
        end = end || keys.length - 1
        for (let i = start; i <= end; i++) {
            let r = func(src[keys[i]], keys[i], i, src);
            if (r === BREAK) return i;
        }
        return end;
    }
    end = end || src.length;
    for (let i = start; i < end; i++) {
        let r = func(item(src, i), i, i, src);
        if (r === BREAK) return i;
    }
    return end
}

function forEach(src, func) {
    if (!T.isVal(src)) return -1;
    if (!T.isArr(src) || !T.isStr(src) || !T.isList(src)) {
        let i = 0;
        let keys = Object.keys(src);
        const len = keys.length;
        for (; i < len; i++) {
            // let r = ;
            const k = keys[i], v = src[k];
            if (func(v, k, i, src) === BREAK) return i;
        }
        return i;
    }
    const len = src.length;
    if (!T.isArr(src)) {
        for (let i = 0; i < len; i++) {
            const v = src[i];
            let r = func(v, i, i, src);
            if (r === BREAK) return i;
        }
    } else {
        for (let i = 0; i < len; i++) {
            const v = item(src, i);
            let r = func(v, i, i, src);
            if (r === BREAK) return i;
        }
    }
    return src.length
}

function forEachRight(src, func, range = []) {
    if (!T.isArr(src) || !T.isStr(src)) {
        let i = 0;
        let keys = Object.keys(src);
        for (let i = keys.length - 1; i >= 0; i--) {
            if (i < range[1]) continue;
            if (i >= range[0]) return i;
            let r = func(src[keys[i]], keys[i], i, src);
            if (r === BREAK) return i;
        }
        return i;
    }
    for (let i = src.length - 1; i >= 0; i--) {
        let r = func(item(src, i), i, i, src);
        if (r === BREAK) return i;
    }
    return src.length
}

function firstIndex(src, pred) {
    pred = predicate(pred, () => true);
    let r = -1;
    forEach(src, function (v, k, i) {
        r = pred(v, k, i);
        if (r === true) {
            r = i;
            return BREAK;
        }
    })
    return r;
}

function first(src, pred) {
    return src[firstIndex(src, pred)]
}

function startsWith(src, pred) {
    if (T.isStr(src) && T.isStr(pred)) {
        return src.indexOf(pred) === 0
    }
    pred = predicate(pred, () => true);
    return pred(first(src))
}

function lastIndex(src, pred) {
    pred = predicate(pred, () => true);
    let r = -1;
    forEachRight(src, function (v, k, i) {
        r = pred(v, k, i);
        if (r === true) {
            r = i;
            return BREAK;
        }
    })
    return r;
}

function last(src, pred) {
    return src[lastIndex(src, pred)]
}

function endsWith(src, pred) {
    if (T.isStr(src) && T.isStr(pred)) {
        return src.indexOf(pred) === src.length - pred.length
    }
    pred = predicate(pred, () => true);
    return pred(last(src))
}

function reverse(src) {
    if (T.isArr(src)) return src.reverse();
    let rev = "";
    forEachRight(src, function (it) {
        rev += it;
    });
    return rev;
}

/**
 *
 * @param src
 * @param pred
 * @return {boolean}
 * @constructor
 */
function any(src, pred) {
    // if (!func){
    //     if (T.isArr(src) || T.isStr(src)) return src.length>0;
    //     return Object.keys(src).length>0;
    // }
    let fn = predicate(pred);
    let r = false;
    forEach(src, function (v, k, i, src) {
        r = fn(v, k, i, src);
        if (r === true) return BREAK;
    });
    return r;
}

function all(src, func) {
    func = predicate(func, () => true);
    let r = true;
    forEach(src, function (v, k, i, src) {
        r = func(v, k, i, src);
        if (r === false) return BREAK;
    })
    return r;
}

function filterStr(src, pred, right = false, omit = false) {
    pred = predicate(pred, () => true);
    let res = "";
    let loop = right ? forEachRight : forEach;
    loop(src, function (v, k, i) {
        if (!pred || pred(v, k, i, src) === omit) res += v;
    });
    return res;
}

function filterObj(src, pred, right = false, omit = false) {
    if (T.isArr(pred)) {
        let a = Object.assign({}, pred)
        if (omit) pred = (v, k) => !any(a, k);
        else pred = (v, k) => any(a, k);
    } else
        pred = predicate(pred, () => true);
    let res = {};
    // let loop = right ? ForEachRight : ForEach;
    const keys = Object.keys(src);
    const len = keys.length;

    if (!right) {
        for (let i = 0; i < len; i++) {
            const k = keys[i]
            const v = src[k]
            if (pred(v, k, i, src) !== omit) res[k] = v;
        }
    } else {
        for (let i = len-1; i >=0; i--) {
            const k = keys[i]
            const v = src[k]
            if (pred(v, k, i, src) !== omit) res[k] = v;
        }
    }

    // loop(src, function (v, k, i) {
    //     if (pred(v, k, i, src) !== omit) res[k] = v;
    // });
    return res;
}

function filterArr(src, pred, right = false, omit = false) {
    if (T.isArr(pred)) {
        let a = Object.assign([], pred)
        if (omit) pred = (v, k, i) => !any(a, i);
        else pred = (v, k, i) => any(a, i);
    } else
        pred = predicate(pred, () => true);
    let res = [];
    const len = src.length;
    if (!right) {
        for (let i = 0; i < len; i++) {
            const v = src[i]
            if (pred(v, i, i, src) !== omit) {
                res.push(v);
            }
        }
    } else {
        for (let i = len - 1; i >= 0; i--) {
            const v = src[i]
            if (!pred(v, i, i, src) !== omit) {
                res.push(v);
            }
        }
    }
    return res;
}

function filter(src, pred, right = false) {
    if (T.isStr(src)) return filterStr(src, pred, right);
    if (T.isArr(src) || T.isList(src)) return filterArr(src, pred, right);
    return filterObj(src, pred, right);
}

function omit(src, pred, right = false) {
    if (T.isStr(src)) return filterStr(src, pred, right, true);
    if (T.isArr(src) || T.isList(src)) return filterArr(src, pred, right, true);
    return filterObj(src, pred, right, true);
}

function filterRight(src, pred) {
    return filter(src, pred, true);
}

function maxIndex(list, pred) {
    pred = funOrKey(pred);
    let mx;
    let index = -1;
    forEach(list, function (i, ix) {
        let x = pred(i, ix);
        if (!mx) {
            mx = x;
            index = ix;
        } else if (x >= mx) {
            mx = x;
            index = ix;
        }
    });
    return index;
}

function max(list, pred) {
    return list[maxIndex(list, pred)];
}

function minIndex(list, pred) {
    pred = funOrKey(pred);
    let mn;
    let index = -1;
    forEach(list, function (i, ix) {
        let x = pred(i, ix);
        if (!mn) {
            mn = x;
            index = ix;
        } else if (x <= mn) {
            mn = x;
            index = ix;
        }
    });
    return index;
}

function min(list, pred) {
    return list[minIndex(list, pred)];
}

function mapArr(src, func, right = false) {
    let res = [];
    // let loop = right ? ForEachRight : ForEach;
    const len = src.length;
    if (!right) {
        for (let i=0; i<len; i++) {
            let r = func(src[i], i, src);
            if (r === BREAK) break;
            if (!T.isUnd(r))
                res.push(r);
        }
    } else {
        for (let i=len; i>=0; i--) {
            let r = func(src[i], i, src);
            if (r === BREAK) break;
            if (!T.isUnd(r))
                res.push(r);
        }
    }
    // loop(src, function (a, i) {
    //     let r = func(a, i, src);
    //     if (!T.isUnd(r))
    //         res.push(r);
    // });
    return res;
}

function mapObj(src, func, right = false) {
    let res = {};
    // let loop = right ? ForEachRight : ForEach;
    const keys = Object.keys(src);
    const len = src.length;
    if (!right) {
        for (let i=0; i<len; i++) {
            const k = keys[i];
            const v = src[k];
            let r = func(v, k, i, src);
            if (r === BREAK) break;
            if (!T.isUnd(r))
                res[k] = r
        }
    } else {
        for (let i=len; i>=0; i--) {

            const k = keys[i];
            const v = src[k];
            let r = func(v, k, i, src);
            if (r === BREAK) break;
            if (!T.isUnd(r))
                res[k] = r
        }
    }
    // loop(src, function (v, k, i) {
    //     let r = func(v, k, i, src);
    //     if (!T.isUnd(r))
    //         res[k] = r
    // });
    return res;
}

function map(src, func, right = false) {
    func = predicate(func, (v) => v);
    if (T.isArr(src)) return mapArr(src, func, right);
    else if (T.isObj(src)) return mapObj(src, func, right);
}

function flatMap(src, func) {
    let res;
    if (T.isStr(src)) res = ""
    else if (T.isArr(src)) res = []
    else res = {};
    forEach(src, function (a, i) {
        let f;
        if (!!func) {
            f = func(a, i, src);
        } else {
            if (!T.isArr(res) && T.isObj(res)) {
                f = {};
                f[i] = a;
            } else {
                f = a
            }
        }
        res = concat(res, f);
    });
    return res;
}

function reduce(src, func, res = src) {
    if (T.isUnd(func)) {
        func = (rs, v) => rs + v
    }
    forEach(src, (v, k, src) => {
        res = func(res, v, k, src);
    });
    return res
}

function reduceRight(src, func, res = src) {
    forEachRight(src, (v, k, src) => {
        res = func(res, v, k, src);
    });
}

function keyValuePairs(object) {
    let entries = [];
    forEach(object, (v, k) => {
        entries.push(T.dict(k, v));
    });
    return entries;
}

function entries(object) {
    let entries = [];
    forEach(object, (v, k) => {
        entries.push([k, v]);
    });
    return entries;
}

function translateObject(source, translations) {
    if (T.isArr(translations)) {
        filter(source, translations);
    }
    const keys = Object.keys(translations);
    let res = filter(source, keys);
    for (let key of keys) {
        res[translations[key]] = res[key];
        delete res[key];
    }
    return res;
}

function deepMerge(target,
                   source,
                   {
                       excludeKeys = [],
                       maxDepth = 999,
                       allowUnsafeProps = false
                   } = {excludeKeys: [], maxDepth: 999, allowUnsafeProps: false},
                   depth = 0) {
    if (depth >= maxDepth) return target;
    forEach(source, (v, k) => {
        if (excludeKeys && contains(excludeKeys, k)) return;
        if (allowUnsafeProps && contains(UNSAFE_PROPS, k)) return;
        if (T.isObj(source[k])) {
            target[k] = deepMerge(emptyOf(source[k]), source[k], {excludeKeys, maxDepth, depth: depth + 1});
        } else
            target[k] = v
    });
    return target;
}

function deepClone(source,
                   {
                       excludeKeys = [],
                       maxDepth = 999,
                       allowUnsafeProps = false
                   } = {excludeKeys: [], maxDepth: 999, allowUnsafeProps: false},) {
    return deepMerge(emptyOf(source), source, {excludeKeys, maxDepth, allowUnsafeProps})
}

function join(key, ...lists) {
    if (lists.length === 0) return [];
    if (!all(lists, T.isArr)) throw Error("Join only accepts arrays of data!");
    let keyGen;
    if (T.isStr(key)) {
        const k = key;
        keyGen = (item)=> item[k]
    } else if (T.isArr(key)) {
        keyGen = (item) => reduce(item, (res, v, k)=> {
            if (contains(key, k)) {
                return res + v;
            }
        }, "")
    } else if (!T.isFun(key)) {
        throw Error("Join key only accepts: String, [String,...], Function")
    }
    keyGen = key
    const joined = {};
    forEach(lists, (list)=>{
        forEach(list, (item) => {
            const joinKey = keyGen(item);
            const presentValue = joined[joinKey];
            if (!presentValue) {
                joined[joinKey] = item;
            } else {
                joined[joinKey] = Object.assign(presentValue, item)
            }
        });
    })

    // return Object.values(joined)
    return (joined)

}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    ANY, ALL, BREAK, item, contains, add, remove, toggle, objMatchOne, objMatchAll,
    deepMerge, deepClone, forRange, forEach, forEachRight, firstIndex, first,
    startsWith, lastIndex, last, endsWith, reverse, any, all, filter, filterRight, reduce, reduceRight,
    map, flatMap, keyValuePairs, entries, maxIndex, max, minIndex, min,
    translateObject, omit, join, objectValues
}