require=function t(e,r,n){function o(c,s){if(!r[c]){if(!e[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=r[c]={exports:{}};e[c][0].call(f.exports,function(t){var r=e[c][1][t];return o(r||t)},f,f.exports,t,e,r,n)}return r[c].exports}for(var i="function"==typeof require&&require,c=0;c<n.length;c++)o(n[c]);return o}({1:[function(t,e,r){t("../../modules/es6.string.iterator"),t("../../modules/es6.array.from"),e.exports=t("../../modules/_core").Array.from},{"../../modules/_core":21,"../../modules/es6.array.from":80,"../../modules/es6.string.iterator":92}],2:[function(t,e,r){t("../modules/web.dom.iterable"),t("../modules/es6.string.iterator"),e.exports=t("../modules/core.get-iterator")},{"../modules/core.get-iterator":79,"../modules/es6.string.iterator":92,"../modules/web.dom.iterable":94}],3:[function(t,e,r){var n=t("../../modules/_core"),o=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(t){return o.stringify.apply(o,arguments)}},{"../../modules/_core":21}],4:[function(t,e,r){t("../../modules/es6.math.clz32"),e.exports=t("../../modules/_core").Math.clz32},{"../../modules/_core":21,"../../modules/es6.math.clz32":82}],5:[function(t,e,r){t("../../modules/es6.math.fround"),e.exports=t("../../modules/_core").Math.fround},{"../../modules/_core":21,"../../modules/es6.math.fround":83}],6:[function(t,e,r){t("../../modules/es6.math.imul"),e.exports=t("../../modules/_core").Math.imul},{"../../modules/_core":21,"../../modules/es6.math.imul":84}],7:[function(t,e,r){t("../../modules/es6.math.trunc"),e.exports=t("../../modules/_core").Math.trunc},{"../../modules/_core":21,"../../modules/es6.math.trunc":85}],8:[function(t,e,r){t("../../modules/es6.number.is-integer"),e.exports=t("../../modules/_core").Number.isInteger},{"../../modules/_core":21,"../../modules/es6.number.is-integer":86}],9:[function(t,e,r){t("../../modules/es6.number.max-safe-integer"),e.exports=9007199254740991},{"../../modules/es6.number.max-safe-integer":87}],10:[function(t,e,r){t("../../modules/es6.object.freeze"),e.exports=t("../../modules/_core").Object.freeze},{"../../modules/_core":21,"../../modules/es6.object.freeze":88}],11:[function(t,e,r){t("../../modules/es6.object.keys"),e.exports=t("../../modules/_core").Object.keys},{"../../modules/_core":21,"../../modules/es6.object.keys":89}],12:[function(t,e,r){t("../../modules/es7.object.values"),e.exports=t("../../modules/_core").Object.values},{"../../modules/_core":21,"../../modules/es7.object.values":93}],13:[function(t,e,r){t("../modules/es6.object.to-string"),t("../modules/es6.string.iterator"),t("../modules/web.dom.iterable"),t("../modules/es6.promise"),e.exports=t("../modules/_core").Promise},{"../modules/_core":21,"../modules/es6.object.to-string":90,"../modules/es6.promise":91,"../modules/es6.string.iterator":92,"../modules/web.dom.iterable":94}],14:[function(t,e,r){e.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},{}],15:[function(t,e,r){e.exports=function(){}},{}],16:[function(t,e,r){e.exports=function(t,e,r,n){if(!(t instanceof e)||void 0!==n&&n in t)throw TypeError(r+": incorrect invocation!");return t}},{}],17:[function(t,e,r){var n=t("./_is-object");e.exports=function(t){if(!n(t))throw TypeError(t+" is not an object!");return t}},{"./_is-object":40}],18:[function(t,e,r){var n=t("./_to-iobject"),o=t("./_to-length"),i=t("./_to-index");e.exports=function(t){return function(e,r,c){var s,a=n(e),u=o(a.length),f=i(c,u);if(t&&r!=r){for(;u>f;)if((s=a[f++])!=s)return!0}else for(;u>f;f++)if((t||f in a)&&a[f]===r)return t||f||0;return!t&&-1}}},{"./_to-index":70,"./_to-iobject":72,"./_to-length":73}],19:[function(t,e,r){var n=t("./_cof"),o=t("./_wks")("toStringTag"),i="Arguments"==n(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(t){}};e.exports=function(t){var e,r,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=c(e=Object(t),o))?r:i?n(e):"Object"==(s=n(e))&&"function"==typeof e.callee?"Arguments":s}},{"./_cof":20,"./_wks":77}],20:[function(t,e,r){var n={}.toString;e.exports=function(t){return n.call(t).slice(8,-1)}},{}],21:[function(t,e,r){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},{}],22:[function(t,e,r){"use strict";var n=t("./_object-dp"),o=t("./_property-desc");e.exports=function(t,e,r){e in t?n.f(t,e,o(0,r)):t[e]=r}},{"./_object-dp":52,"./_property-desc":60}],23:[function(t,e,r){var n=t("./_a-function");e.exports=function(t,e,r){if(n(t),void 0===e)return t;switch(r){case 1:return function(r){return t.call(e,r)};case 2:return function(r,n){return t.call(e,r,n)};case 3:return function(r,n,o){return t.call(e,r,n,o)}}return function(){return t.apply(e,arguments)}}},{"./_a-function":14}],24:[function(t,e,r){e.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},{}],25:[function(t,e,r){e.exports=!t("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":29}],26:[function(t,e,r){var n=t("./_is-object"),o=t("./_global").document,i=n(o)&&n(o.createElement);e.exports=function(t){return i?o.createElement(t):{}}},{"./_global":31,"./_is-object":40}],27:[function(t,e,r){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],28:[function(t,e,r){var n=t("./_global"),o=t("./_core"),i=t("./_ctx"),c=t("./_hide"),s=function(t,e,r){var a,u,f,l=t&s.F,_=t&s.G,p=t&s.S,d=t&s.P,h=t&s.B,m=t&s.W,v=_?o:o[e]||(o[e]={}),y=v.prototype,b=_?n:p?n[e]:(n[e]||{}).prototype;_&&(r=e);for(a in r)(u=!l&&b&&void 0!==b[a])&&a in v||(f=u?b[a]:r[a],v[a]=_&&"function"!=typeof b[a]?r[a]:h&&u?i(f,n):m&&b[a]==f?function(t){var e=function(e,r,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,r)}return new t(e,r,n)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):d&&"function"==typeof f?i(Function.call,f):f,d&&((v.virtual||(v.virtual={}))[a]=f,t&s.R&&y&&!y[a]&&c(y,a,f)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},{"./_core":21,"./_ctx":23,"./_global":31,"./_hide":33}],29:[function(t,e,r){e.exports=function(t){try{return!!t()}catch(t){return!0}}},{}],30:[function(t,e,r){var n=t("./_ctx"),o=t("./_iter-call"),i=t("./_is-array-iter"),c=t("./_an-object"),s=t("./_to-length"),a=t("./core.get-iterator-method"),u={},f={};(r=e.exports=function(t,e,r,l,_){var p,d,h,m,v=_?function(){return t}:a(t),y=n(r,l,e?2:1),b=0;if("function"!=typeof v)throw TypeError(t+" is not iterable!");if(i(v)){for(p=s(t.length);p>b;b++)if((m=e?y(c(d=t[b])[0],d[1]):y(t[b]))===u||m===f)return m}else for(h=v.call(t);!(d=h.next()).done;)if((m=o(h,y,d.value,e))===u||m===f)return m}).BREAK=u,r.RETURN=f},{"./_an-object":17,"./_ctx":23,"./_is-array-iter":38,"./_iter-call":41,"./_to-length":73,"./core.get-iterator-method":78}],31:[function(t,e,r){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},{}],32:[function(t,e,r){var n={}.hasOwnProperty;e.exports=function(t,e){return n.call(t,e)}},{}],33:[function(t,e,r){var n=t("./_object-dp"),o=t("./_property-desc");e.exports=t("./_descriptors")?function(t,e,r){return n.f(t,e,o(1,r))}:function(t,e,r){return t[e]=r,t}},{"./_descriptors":25,"./_object-dp":52,"./_property-desc":60}],34:[function(t,e,r){e.exports=t("./_global").document&&document.documentElement},{"./_global":31}],35:[function(t,e,r){e.exports=!t("./_descriptors")&&!t("./_fails")(function(){return 7!=Object.defineProperty(t("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":25,"./_dom-create":26,"./_fails":29}],36:[function(t,e,r){e.exports=function(t,e,r){var n=void 0===r;switch(e.length){case 0:return n?t():t.call(r);case 1:return n?t(e[0]):t.call(r,e[0]);case 2:return n?t(e[0],e[1]):t.call(r,e[0],e[1]);case 3:return n?t(e[0],e[1],e[2]):t.call(r,e[0],e[1],e[2]);case 4:return n?t(e[0],e[1],e[2],e[3]):t.call(r,e[0],e[1],e[2],e[3])}return t.apply(r,e)}},{}],37:[function(t,e,r){var n=t("./_cof");e.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==n(t)?t.split(""):Object(t)}},{"./_cof":20}],38:[function(t,e,r){var n=t("./_iterators"),o=t("./_wks")("iterator"),i=Array.prototype;e.exports=function(t){return void 0!==t&&(n.Array===t||i[o]===t)}},{"./_iterators":46,"./_wks":77}],39:[function(t,e,r){var n=t("./_is-object"),o=Math.floor;e.exports=function(t){return!n(t)&&isFinite(t)&&o(t)===t}},{"./_is-object":40}],40:[function(t,e,r){e.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},{}],41:[function(t,e,r){var n=t("./_an-object");e.exports=function(t,e,r,o){try{return o?e(n(r)[0],r[1]):e(r)}catch(e){var i=t.return;throw void 0!==i&&n(i.call(t)),e}}},{"./_an-object":17}],42:[function(t,e,r){"use strict";var n=t("./_object-create"),o=t("./_property-desc"),i=t("./_set-to-string-tag"),c={};t("./_hide")(c,t("./_wks")("iterator"),function(){return this}),e.exports=function(t,e,r){t.prototype=n(c,{next:o(1,r)}),i(t,e+" Iterator")}},{"./_hide":33,"./_object-create":51,"./_property-desc":60,"./_set-to-string-tag":64,"./_wks":77}],43:[function(t,e,r){"use strict";var n=t("./_library"),o=t("./_export"),i=t("./_redefine"),c=t("./_hide"),s=t("./_has"),a=t("./_iterators"),u=t("./_iter-create"),f=t("./_set-to-string-tag"),l=t("./_object-gpo"),_=t("./_wks")("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};e.exports=function(t,e,r,h,m,v,y){u(r,e,h);var b,g,j,x=function(t){if(!p&&t in E)return E[t];switch(t){case"keys":case"values":return function(){return new r(this,t)}}return function(){return new r(this,t)}},w=e+" Iterator",k="values"==m,O=!1,E=t.prototype,M=E[_]||E["@@iterator"]||m&&E[m],S=M||x(m),P=m?k?x("entries"):S:void 0,L="Array"==e?E.entries||M:M;if(L&&(j=l(L.call(new t)))!==Object.prototype&&(f(j,w,!0),n||s(j,_)||c(j,_,d)),k&&M&&"values"!==M.name&&(O=!0,S=function(){return M.call(this)}),n&&!y||!p&&!O&&E[_]||c(E,_,S),a[e]=S,a[w]=d,m)if(b={values:k?S:x("values"),keys:v?S:x("keys"),entries:P},y)for(g in b)g in E||i(E,g,b[g]);else o(o.P+o.F*(p||O),e,b);return b}},{"./_export":28,"./_has":32,"./_hide":33,"./_iter-create":42,"./_iterators":46,"./_library":47,"./_object-gpo":54,"./_redefine":62,"./_set-to-string-tag":64,"./_wks":77}],44:[function(t,e,r){var n=t("./_wks")("iterator"),o=!1;try{var i=[7][n]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}e.exports=function(t,e){if(!e&&!o)return!1;var r=!1;try{var i=[7],c=i[n]();c.next=function(){return{done:r=!0}},i[n]=function(){return c},t(i)}catch(t){}return r}},{"./_wks":77}],45:[function(t,e,r){e.exports=function(t,e){return{value:e,done:!!t}}},{}],46:[function(t,e,r){e.exports={}},{}],47:[function(t,e,r){e.exports=!0},{}],48:[function(t,e,r){e.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},{}],49:[function(t,e,r){var n=t("./_uid")("meta"),o=t("./_is-object"),i=t("./_has"),c=t("./_object-dp").f,s=0,a=Object.isExtensible||function(){return!0},u=!t("./_fails")(function(){return a(Object.preventExtensions({}))}),f=function(t){c(t,n,{value:{i:"O"+ ++s,w:{}}})},l=e.exports={KEY:n,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,n)){if(!a(t))return"F";if(!e)return"E";f(t)}return t[n].i},getWeak:function(t,e){if(!i(t,n)){if(!a(t))return!0;if(!e)return!1;f(t)}return t[n].w},onFreeze:function(t){return u&&l.NEED&&a(t)&&!i(t,n)&&f(t),t}}},{"./_fails":29,"./_has":32,"./_is-object":40,"./_object-dp":52,"./_uid":76}],50:[function(t,e,r){var n=t("./_global"),o=t("./_task").set,i=n.MutationObserver||n.WebKitMutationObserver,c=n.process,s=n.Promise,a="process"==t("./_cof")(c);e.exports=function(){var t,e,r,u=function(){var n,o;for(a&&(n=c.domain)&&n.exit();t;){o=t.fn,t=t.next;try{o()}catch(n){throw t?r():e=void 0,n}}e=void 0,n&&n.enter()};if(a)r=function(){c.nextTick(u)};else if(i){var f=!0,l=document.createTextNode("");new i(u).observe(l,{characterData:!0}),r=function(){l.data=f=!f}}else if(s&&s.resolve){var _=s.resolve();r=function(){_.then(u)}}else r=function(){o.call(n,u)};return function(n){var o={fn:n,next:void 0};e&&(e.next=o),t||(t=o,r()),e=o}}},{"./_cof":20,"./_global":31,"./_task":69}],51:[function(t,e,r){var n=t("./_an-object"),o=t("./_object-dps"),i=t("./_enum-bug-keys"),c=t("./_shared-key")("IE_PROTO"),s=function(){},a=function(){var e,r=t("./_dom-create")("iframe"),n=i.length;for(r.style.display="none",t("./_html").appendChild(r),r.src="javascript:",(e=r.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),a=e.F;n--;)delete a.prototype[i[n]];return a()};e.exports=Object.create||function(t,e){var r;return null!==t?(s.prototype=n(t),r=new s,s.prototype=null,r[c]=t):r=a(),void 0===e?r:o(r,e)}},{"./_an-object":17,"./_dom-create":26,"./_enum-bug-keys":27,"./_html":34,"./_object-dps":53,"./_shared-key":65}],52:[function(t,e,r){var n=t("./_an-object"),o=t("./_ie8-dom-define"),i=t("./_to-primitive"),c=Object.defineProperty;r.f=t("./_descriptors")?Object.defineProperty:function(t,e,r){if(n(t),e=i(e,!0),n(r),o)try{return c(t,e,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[e]=r.value),t}},{"./_an-object":17,"./_descriptors":25,"./_ie8-dom-define":35,"./_to-primitive":75}],53:[function(t,e,r){var n=t("./_object-dp"),o=t("./_an-object"),i=t("./_object-keys");e.exports=t("./_descriptors")?Object.defineProperties:function(t,e){o(t);for(var r,c=i(e),s=c.length,a=0;s>a;)n.f(t,r=c[a++],e[r]);return t}},{"./_an-object":17,"./_descriptors":25,"./_object-dp":52,"./_object-keys":56}],54:[function(t,e,r){var n=t("./_has"),o=t("./_to-object"),i=t("./_shared-key")("IE_PROTO"),c=Object.prototype;e.exports=Object.getPrototypeOf||function(t){return t=o(t),n(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},{"./_has":32,"./_shared-key":65,"./_to-object":74}],55:[function(t,e,r){var n=t("./_has"),o=t("./_to-iobject"),i=t("./_array-includes")(!1),c=t("./_shared-key")("IE_PROTO");e.exports=function(t,e){var r,s=o(t),a=0,u=[];for(r in s)r!=c&&n(s,r)&&u.push(r);for(;e.length>a;)n(s,r=e[a++])&&(~i(u,r)||u.push(r));return u}},{"./_array-includes":18,"./_has":32,"./_shared-key":65,"./_to-iobject":72}],56:[function(t,e,r){var n=t("./_object-keys-internal"),o=t("./_enum-bug-keys");e.exports=Object.keys||function(t){return n(t,o)}},{"./_enum-bug-keys":27,"./_object-keys-internal":55}],57:[function(t,e,r){r.f={}.propertyIsEnumerable},{}],58:[function(t,e,r){var n=t("./_export"),o=t("./_core"),i=t("./_fails");e.exports=function(t,e){var r=(o.Object||{})[t]||Object[t],c={};c[t]=e(r),n(n.S+n.F*i(function(){r(1)}),"Object",c)}},{"./_core":21,"./_export":28,"./_fails":29}],59:[function(t,e,r){var n=t("./_object-keys"),o=t("./_to-iobject"),i=t("./_object-pie").f;e.exports=function(t){return function(e){for(var r,c=o(e),s=n(c),a=s.length,u=0,f=[];a>u;)i.call(c,r=s[u++])&&f.push(t?[r,c[r]]:c[r]);return f}}},{"./_object-keys":56,"./_object-pie":57,"./_to-iobject":72}],60:[function(t,e,r){e.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},{}],61:[function(t,e,r){var n=t("./_hide");e.exports=function(t,e,r){for(var o in e)r&&t[o]?t[o]=e[o]:n(t,o,e[o]);return t}},{"./_hide":33}],62:[function(t,e,r){e.exports=t("./_hide")},{"./_hide":33}],63:[function(t,e,r){"use strict";var n=t("./_global"),o=t("./_core"),i=t("./_object-dp"),c=t("./_descriptors"),s=t("./_wks")("species");e.exports=function(t){var e="function"==typeof o[t]?o[t]:n[t];c&&e&&!e[s]&&i.f(e,s,{configurable:!0,get:function(){return this}})}},{"./_core":21,"./_descriptors":25,"./_global":31,"./_object-dp":52,"./_wks":77}],64:[function(t,e,r){var n=t("./_object-dp").f,o=t("./_has"),i=t("./_wks")("toStringTag");e.exports=function(t,e,r){t&&!o(t=r?t:t.prototype,i)&&n(t,i,{configurable:!0,value:e})}},{"./_has":32,"./_object-dp":52,"./_wks":77}],65:[function(t,e,r){var n=t("./_shared")("keys"),o=t("./_uid");e.exports=function(t){return n[t]||(n[t]=o(t))}},{"./_shared":66,"./_uid":76}],66:[function(t,e,r){var n=t("./_global"),o=n["__core-js_shared__"]||(n["__core-js_shared__"]={});e.exports=function(t){return o[t]||(o[t]={})}},{"./_global":31}],67:[function(t,e,r){var n=t("./_an-object"),o=t("./_a-function"),i=t("./_wks")("species");e.exports=function(t,e){var r,c=n(t).constructor;return void 0===c||void 0==(r=n(c)[i])?e:o(r)}},{"./_a-function":14,"./_an-object":17,"./_wks":77}],68:[function(t,e,r){var n=t("./_to-integer"),o=t("./_defined");e.exports=function(t){return function(e,r){var i,c,s=String(o(e)),a=n(r),u=s.length;return a<0||a>=u?t?"":void 0:(i=s.charCodeAt(a))<55296||i>56319||a+1===u||(c=s.charCodeAt(a+1))<56320||c>57343?t?s.charAt(a):i:t?s.slice(a,a+2):c-56320+(i-55296<<10)+65536}}},{"./_defined":24,"./_to-integer":71}],69:[function(t,e,r){var n,o,i,c=t("./_ctx"),s=t("./_invoke"),a=t("./_html"),u=t("./_dom-create"),f=t("./_global"),l=f.process,_=f.setImmediate,p=f.clearImmediate,d=f.MessageChannel,h=0,m={},v=function(){var t=+this;if(m.hasOwnProperty(t)){var e=m[t];delete m[t],e()}},y=function(t){v.call(t.data)};_&&p||(_=function(t){for(var e=[],r=1;arguments.length>r;)e.push(arguments[r++]);return m[++h]=function(){s("function"==typeof t?t:Function(t),e)},n(h),h},p=function(t){delete m[t]},"process"==t("./_cof")(l)?n=function(t){l.nextTick(c(v,t,1))}:d?(i=(o=new d).port2,o.port1.onmessage=y,n=c(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(n=function(t){f.postMessage(t+"","*")},f.addEventListener("message",y,!1)):n="onreadystatechange"in u("script")?function(t){a.appendChild(u("script")).onreadystatechange=function(){a.removeChild(this),v.call(t)}}:function(t){setTimeout(c(v,t,1),0)}),e.exports={set:_,clear:p}},{"./_cof":20,"./_ctx":23,"./_dom-create":26,"./_global":31,"./_html":34,"./_invoke":36}],70:[function(t,e,r){var n=t("./_to-integer"),o=Math.max,i=Math.min;e.exports=function(t,e){return(t=n(t))<0?o(t+e,0):i(t,e)}},{"./_to-integer":71}],71:[function(t,e,r){var n=Math.ceil,o=Math.floor;e.exports=function(t){return isNaN(t=+t)?0:(t>0?o:n)(t)}},{}],72:[function(t,e,r){var n=t("./_iobject"),o=t("./_defined");e.exports=function(t){return n(o(t))}},{"./_defined":24,"./_iobject":37}],73:[function(t,e,r){var n=t("./_to-integer"),o=Math.min;e.exports=function(t){return t>0?o(n(t),9007199254740991):0}},{"./_to-integer":71}],74:[function(t,e,r){var n=t("./_defined");e.exports=function(t){return Object(n(t))}},{"./_defined":24}],75:[function(t,e,r){var n=t("./_is-object");e.exports=function(t,e){if(!n(t))return t;var r,o;if(e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!n(o=r.call(t)))return o;if(!e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":40}],76:[function(t,e,r){var n=0,o=Math.random();e.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+o).toString(36))}},{}],77:[function(t,e,r){var n=t("./_shared")("wks"),o=t("./_uid"),i=t("./_global").Symbol,c="function"==typeof i;(e.exports=function(t){return n[t]||(n[t]=c&&i[t]||(c?i:o)("Symbol."+t))}).store=n},{"./_global":31,"./_shared":66,"./_uid":76}],78:[function(t,e,r){var n=t("./_classof"),o=t("./_wks")("iterator"),i=t("./_iterators");e.exports=t("./_core").getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[n(t)]}},{"./_classof":19,"./_core":21,"./_iterators":46,"./_wks":77}],79:[function(t,e,r){var n=t("./_an-object"),o=t("./core.get-iterator-method");e.exports=t("./_core").getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return n(e.call(t))}},{"./_an-object":17,"./_core":21,"./core.get-iterator-method":78}],80:[function(t,e,r){"use strict";var n=t("./_ctx"),o=t("./_export"),i=t("./_to-object"),c=t("./_iter-call"),s=t("./_is-array-iter"),a=t("./_to-length"),u=t("./_create-property"),f=t("./core.get-iterator-method");o(o.S+o.F*!t("./_iter-detect")(function(t){Array.from(t)}),"Array",{from:function(t){var e,r,o,l,_=i(t),p="function"==typeof this?this:Array,d=arguments.length,h=d>1?arguments[1]:void 0,m=void 0!==h,v=0,y=f(_);if(m&&(h=n(h,d>2?arguments[2]:void 0,2)),void 0==y||p==Array&&s(y))for(r=new p(e=a(_.length));e>v;v++)u(r,v,m?h(_[v],v):_[v]);else for(l=y.call(_),r=new p;!(o=l.next()).done;v++)u(r,v,m?c(l,h,[o.value,v],!0):o.value);return r.length=v,r}})},{"./_create-property":22,"./_ctx":23,"./_export":28,"./_is-array-iter":38,"./_iter-call":41,"./_iter-detect":44,"./_to-length":73,"./_to-object":74,"./core.get-iterator-method":78}],81:[function(t,e,r){"use strict";var n=t("./_add-to-unscopables"),o=t("./_iter-step"),i=t("./_iterators"),c=t("./_to-iobject");e.exports=t("./_iter-define")(Array,"Array",function(t,e){this._t=c(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,r):"values"==e?o(0,t[r]):o(0,[r,t[r]])},"values"),i.Arguments=i.Array,n("keys"),n("values"),n("entries")},{"./_add-to-unscopables":15,"./_iter-define":43,"./_iter-step":45,"./_iterators":46,"./_to-iobject":72}],82:[function(t,e,r){var n=t("./_export");n(n.S,"Math",{clz32:function(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},{"./_export":28}],83:[function(t,e,r){var n=t("./_export"),o=t("./_math-sign"),i=Math.pow,c=i(2,-52),s=i(2,-23),a=i(2,127)*(2-s),u=i(2,-126),f=function(t){return t+1/c-1/c};n(n.S,"Math",{fround:function(t){var e,r,n=Math.abs(t),i=o(t);return n<u?i*f(n/u/s)*u*s:(e=(1+s/c)*n,(r=e-(e-n))>a||r!=r?i*(1/0):i*r)}})},{"./_export":28,"./_math-sign":48}],84:[function(t,e,r){var n=t("./_export"),o=Math.imul;n(n.S+n.F*t("./_fails")(function(){return-5!=o(4294967295,5)||2!=o.length}),"Math",{imul:function(t,e){var r=+t,n=+e,o=65535&r,i=65535&n;return 0|o*i+((65535&r>>>16)*i+o*(65535&n>>>16)<<16>>>0)}})},{"./_export":28,"./_fails":29}],85:[function(t,e,r){var n=t("./_export");n(n.S,"Math",{trunc:function(t){return(t>0?Math.floor:Math.ceil)(t)}})},{"./_export":28}],86:[function(t,e,r){var n=t("./_export");n(n.S,"Number",{isInteger:t("./_is-integer")})},{"./_export":28,"./_is-integer":39}],87:[function(t,e,r){var n=t("./_export");n(n.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},{"./_export":28}],88:[function(t,e,r){var n=t("./_is-object"),o=t("./_meta").onFreeze;t("./_object-sap")("freeze",function(t){return function(e){return t&&n(e)?t(o(e)):e}})},{"./_is-object":40,"./_meta":49,"./_object-sap":58}],89:[function(t,e,r){var n=t("./_to-object"),o=t("./_object-keys");t("./_object-sap")("keys",function(){return function(t){return o(n(t))}})},{"./_object-keys":56,"./_object-sap":58,"./_to-object":74}],90:[function(t,e,r){},{}],91:[function(t,e,r){"use strict";var n,o,i,c=t("./_library"),s=t("./_global"),a=t("./_ctx"),u=t("./_classof"),f=t("./_export"),l=t("./_is-object"),_=t("./_a-function"),p=t("./_an-instance"),d=t("./_for-of"),h=t("./_species-constructor"),m=t("./_task").set,v=t("./_microtask")(),y=s.TypeError,b=s.process,g=s.Promise,j="process"==u(b=s.process),x=function(){},w=!!function(){try{var e=g.resolve(1),r=(e.constructor={})[t("./_wks")("species")]=function(t){t(x,x)};return(j||"function"==typeof PromiseRejectionEvent)&&e.then(x)instanceof r}catch(t){}}(),k=function(t,e){return t===e||t===g&&e===i},O=function(t){var e;return!(!l(t)||"function"!=typeof(e=t.then))&&e},E=function(t){return k(g,t)?new M(t):new o(t)},M=o=function(t){var e,r;this.promise=new t(function(t,n){if(void 0!==e||void 0!==r)throw y("Bad Promise constructor");e=t,r=n}),this.resolve=_(e),this.reject=_(r)},S=function(t){try{t()}catch(t){return{error:t}}},P=function(t,e){if(!t._n){t._n=!0;var r=t._c;v(function(){for(var n=t._v,o=1==t._s,i=0;r.length>i;)!function(e){var r,i,c=o?e.ok:e.fail,s=e.resolve,a=e.reject,u=e.domain;try{c?(o||(2==t._h&&F(t),t._h=1),!0===c?r=n:(u&&u.enter(),r=c(n),u&&u.exit()),r===e.promise?a(y("Promise-chain cycle")):(i=O(r))?i.call(r,s,a):s(r)):a(n)}catch(t){a(t)}}(r[i++]);t._c=[],t._n=!1,e&&!t._h&&L(t)})}},L=function(t){m.call(s,function(){var e,r,n,o=t._v;if(T(t)&&(e=S(function(){j?b.emit("unhandledRejection",o,t):(r=s.onunhandledrejection)?r({promise:t,reason:o}):(n=s.console)&&n.error&&n.error("Unhandled promise rejection",o)}),t._h=j||T(t)?2:1),t._a=void 0,e)throw e.error})},T=function(t){if(1==t._h)return!1;for(var e,r=t._a||t._c,n=0;r.length>n;)if((e=r[n++]).fail||!T(e.promise))return!1;return!0},F=function(t){m.call(s,function(){var e;j?b.emit("rejectionHandled",t):(e=s.onrejectionhandled)&&e({promise:t,reason:t._v})})},N=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),P(e,!0))},A=function(t){var e,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw y("Promise can't be resolved itself");(e=O(t))?v(function(){var n={_w:r,_d:!1};try{e.call(t,a(A,n,1),a(N,n,1))}catch(t){N.call(n,t)}}):(r._v=t,r._s=1,P(r,!1))}catch(t){N.call({_w:r,_d:!1},t)}}};w||(g=function(t){p(this,g,"Promise","_h"),_(t),n.call(this);try{t(a(A,this,1),a(N,this,1))}catch(t){N.call(this,t)}},(n=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=t("./_redefine-all")(g.prototype,{then:function(t,e){var r=E(h(this,g));return r.ok="function"!=typeof t||t,r.fail="function"==typeof e&&e,r.domain=j?b.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&P(this,!1),r.promise},catch:function(t){return this.then(void 0,t)}}),M=function(){var t=new n;this.promise=t,this.resolve=a(A,t,1),this.reject=a(N,t,1)}),f(f.G+f.W+f.F*!w,{Promise:g}),t("./_set-to-string-tag")(g,"Promise"),t("./_set-species")("Promise"),i=t("./_core").Promise,f(f.S+f.F*!w,"Promise",{reject:function(t){var e=E(this);return(0,e.reject)(t),e.promise}}),f(f.S+f.F*(c||!w),"Promise",{resolve:function(t){if(t instanceof g&&k(t.constructor,this))return t;var e=E(this);return(0,e.resolve)(t),e.promise}}),f(f.S+f.F*!(w&&t("./_iter-detect")(function(t){g.all(t).catch(x)})),"Promise",{all:function(t){var e=this,r=E(e),n=r.resolve,o=r.reject,i=S(function(){var r=[],i=0,c=1;d(t,!1,function(t){var s=i++,a=!1;r.push(void 0),c++,e.resolve(t).then(function(t){a||(a=!0,r[s]=t,--c||n(r))},o)}),--c||n(r)});return i&&o(i.error),r.promise},race:function(t){var e=this,r=E(e),n=r.reject,o=S(function(){d(t,!1,function(t){e.resolve(t).then(r.resolve,n)})});return o&&n(o.error),r.promise}})},{"./_a-function":14,"./_an-instance":16,"./_classof":19,"./_core":21,"./_ctx":23,"./_export":28,"./_for-of":30,"./_global":31,"./_is-object":40,"./_iter-detect":44,"./_library":47,"./_microtask":50,"./_redefine-all":61,"./_set-species":63,"./_set-to-string-tag":64,"./_species-constructor":67,"./_task":69,"./_wks":77}],92:[function(t,e,r){"use strict";var n=t("./_string-at")(!0);t("./_iter-define")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,r=this._i;return r>=e.length?{value:void 0,done:!0}:(t=n(e,r),this._i+=t.length,{value:t,done:!1})})},{"./_iter-define":43,"./_string-at":68}],93:[function(t,e,r){var n=t("./_export"),o=t("./_object-to-array")(!1);n(n.S,"Object",{values:function(t){return o(t)}})},{"./_export":28,"./_object-to-array":59}],94:[function(t,e,r){t("./es6.array.iterator");for(var n=t("./_global"),o=t("./_hide"),i=t("./_iterators"),c=t("./_wks")("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],a=0;a<5;a++){var u=s[a],f=n[u],l=f&&f.prototype;l&&!l[c]&&o(l,c,u),i[u]=i.Array}},{"./_global":31,"./_hide":33,"./_iterators":46,"./_wks":77,"./es6.array.iterator":81}],95:[function(t,e,r){(function(r){var n="object"==typeof r?r:"object"==typeof window?window:"object"==typeof self?self:this,o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=t("./runtime"),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./runtime":96}],96:[function(t,e,r){(function(t){!function(t){"use strict";function r(t,e,r,n){var i=e&&e.prototype instanceof o?e:o,c=Object.create(i.prototype),s=new p(n||[]);return c._invoke=u(t,r,s),c}function n(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function o(){}function i(){}function c(){}function s(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function a(e){function r(t,o,i,c){var s=n(e[t],e,o);if("throw"!==s.type){var a=s.arg,u=a.value;return u&&"object"==typeof u&&y.call(u,"__await")?Promise.resolve(u.__await).then(function(t){r("next",t,i,c)},function(t){r("throw",t,i,c)}):Promise.resolve(u).then(function(t){a.value=t,i(a)},c)}c(s.arg)}"object"==typeof t.process&&t.process.domain&&(r=t.process.domain.bind(r));var o;this._invoke=function(t,e){function n(){return new Promise(function(n,o){r(t,e,n,o)})}return o=o?o.then(n,n):n()}}function u(t,e,r){var o=O;return function(i,c){if(o===M)throw new Error("Generator is already running");if(o===S){if("throw"===i)throw c;return h()}for(r.method=i,r.arg=c;;){var s=r.delegate;if(s){var a=f(s,r);if(a){if(a===P)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===O)throw o=S,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=M;var u=n(t,e,r);if("normal"===u.type){if(o=r.done?S:E,u.arg===P)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(o=S,r.method="throw",r.arg=u.arg)}}}function f(t,e){var r=t.iterator[e.method];if(r===m){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=m,f(t,e),"throw"===e.method))return P;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return P}var o=n(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,P;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=m),e.delegate=null,P):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,P)}function l(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function p(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(l,this),this.reset(!0)}function d(t){if(t){var e=t[g];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(y.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=m,e.done=!0,e};return n.next=n}}return{next:h}}function h(){return{value:m,done:!0}}var m,v=Object.prototype,y=v.hasOwnProperty,b="function"==typeof Symbol?Symbol:{},g=b.iterator||"@@iterator",j=b.asyncIterator||"@@asyncIterator",x=b.toStringTag||"@@toStringTag",w="object"==typeof e,k=t.regeneratorRuntime;if(k)w&&(e.exports=k);else{(k=t.regeneratorRuntime=w?e.exports:{}).wrap=r;var O="suspendedStart",E="suspendedYield",M="executing",S="completed",P={},L={};L[g]=function(){return this};var T=Object.getPrototypeOf,F=T&&T(T(d([])));F&&F!==v&&y.call(F,g)&&(L=F);var N=c.prototype=o.prototype=Object.create(L);i.prototype=N.constructor=c,c.constructor=i,c[x]=i.displayName="GeneratorFunction",k.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===i||"GeneratorFunction"===(e.displayName||e.name))},k.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,c):(t.__proto__=c,x in t||(t[x]="GeneratorFunction")),t.prototype=Object.create(N),t},k.awrap=function(t){return{__await:t}},s(a.prototype),a.prototype[j]=function(){return this},k.AsyncIterator=a,k.async=function(t,e,n,o){var i=new a(r(t,e,n,o));return k.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},s(N),N[x]="Generator",N[g]=function(){return this},N.toString=function(){return"[object Generator]"},k.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},k.values=d,p.prototype={constructor:p,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=m,this.done=!1,this.delegate=null,this.method="next",this.arg=m,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&y.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=m)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){function e(e,n){return i.type="throw",i.arg=t,r.next=e,n&&(r.method="next",r.arg=m),!!n}if(this.done)throw t;for(var r=this,n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var c=y.call(o,"catchLoc"),s=y.call(o,"finallyLoc");if(c&&s){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&y.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,P):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),P},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),P}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:d(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=m),P}}}}("object"==typeof t?t:"object"==typeof window?window:"object"==typeof self?self:this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"babel-runtime/core-js/array/from":[function(t,e,r){e.exports={default:t("core-js/library/fn/array/from"),__esModule:!0}},{"core-js/library/fn/array/from":1}],"babel-runtime/core-js/get-iterator":[function(t,e,r){e.exports={default:t("core-js/library/fn/get-iterator"),__esModule:!0}},{"core-js/library/fn/get-iterator":2}],"babel-runtime/core-js/json/stringify":[function(t,e,r){e.exports={default:t("core-js/library/fn/json/stringify"),__esModule:!0}},{"core-js/library/fn/json/stringify":3}],"babel-runtime/core-js/math/clz32":[function(t,e,r){e.exports={default:t("core-js/library/fn/math/clz32"),__esModule:!0}},{"core-js/library/fn/math/clz32":4}],"babel-runtime/core-js/math/fround":[function(t,e,r){e.exports={default:t("core-js/library/fn/math/fround"),__esModule:!0}},{"core-js/library/fn/math/fround":5}],"babel-runtime/core-js/math/imul":[function(t,e,r){e.exports={default:t("core-js/library/fn/math/imul"),__esModule:!0}},{"core-js/library/fn/math/imul":6}],"babel-runtime/core-js/math/trunc":[function(t,e,r){e.exports={default:t("core-js/library/fn/math/trunc"),__esModule:!0}},{"core-js/library/fn/math/trunc":7}],"babel-runtime/core-js/number/is-integer":[function(t,e,r){e.exports={default:t("core-js/library/fn/number/is-integer"),__esModule:!0}},{"core-js/library/fn/number/is-integer":8}],"babel-runtime/core-js/number/max-safe-integer":[function(t,e,r){e.exports={default:t("core-js/library/fn/number/max-safe-integer"),__esModule:!0}},{"core-js/library/fn/number/max-safe-integer":9}],"babel-runtime/core-js/object/freeze":[function(t,e,r){e.exports={default:t("core-js/library/fn/object/freeze"),__esModule:!0}},{"core-js/library/fn/object/freeze":10}],"babel-runtime/core-js/object/keys":[function(t,e,r){e.exports={default:t("core-js/library/fn/object/keys"),__esModule:!0}},{"core-js/library/fn/object/keys":11}],"babel-runtime/core-js/object/values":[function(t,e,r){e.exports={default:t("core-js/library/fn/object/values"),__esModule:!0}},{"core-js/library/fn/object/values":12}],"babel-runtime/core-js/promise":[function(t,e,r){e.exports={default:t("core-js/library/fn/promise"),__esModule:!0}},{"core-js/library/fn/promise":13}],"babel-runtime/helpers/asyncToGenerator":[function(t,e,r){"use strict";r.__esModule=!0;var n=function(t){return t&&t.__esModule?t:{default:t}}(t("../core-js/promise"));r.default=function(t){return function(){var e=t.apply(this,arguments);return new n.default(function(t,r){function o(i,c){try{var s=e[i](c),a=s.value}catch(t){return void r(t)}if(!s.done)return n.default.resolve(a).then(function(t){o("next",t)},function(t){o("throw",t)});t(a)}return o("next")})}}},{"../core-js/promise":"babel-runtime/core-js/promise"}],"babel-runtime/regenerator":[function(t,e,r){e.exports=t("regenerator-runtime")},{"regenerator-runtime":95}]},{},[]);
'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof JDB === 'undefined') {
    var JDB = typeof window !== 'undefined' ? window : {};
}
var Proxy; // ensure Proxy exists
(function (exports) {
    exports = typeof exports !== 'undefined' ? exports : {};

    class Class {
        static register(cls) {
            if (typeof exports !== 'undefined') exports[cls.name] = cls;
        }
    }
    Class.register(Class);

    class IDBTools {
        /**
         * Converts our KeyRange objects into IDBKeyRange objects.
         * @param {KeyRange} keyRange A KeyRange object.
         * @returns {IDBKeyRange} The corresponding IDBKeyRange.
         */
        static convertKeyRange(keyRange) {
            if (!(keyRange instanceof KeyRange)) return keyRange;
            if (keyRange.exactMatch) {
                return IDBKeyRange.only(keyRange.lower);
            }
            if (keyRange.lower !== undefined && keyRange.upper === undefined) {
                return IDBKeyRange.lowerBound(keyRange.lower, keyRange.lowerOpen);
            }
            if (keyRange.upper !== undefined && keyRange.lower === undefined) {
                return IDBKeyRange.upperBound(keyRange.upper, keyRange.upperOpen);
            }
            return IDBKeyRange.bound(keyRange.lower, keyRange.upper, keyRange.lowerOpen, keyRange.upperOpen);
        }
    }
    Class.register(IDBTools);

    /**
     * This class is a wrapper around the IndexedDB.
     * It manages the access to a single table/object store.
     * @implements {IObjectStore}
     */
    class IDBBackend {
        /**
         * Creates a wrapper given a JungleDB object and table name.
         * @param {JungleDB} db The JungleDB object managing the connection.
         * @param {string} tableName THe table name this object store represents.
         * @param {function(obj:*):*} [decoder] Optional decoder function for the object store (null is the identity decoder).
         */
        constructor(db, tableName, decoder = null) {
            this._db = db;
            this._tableName = tableName;
            /** @type {Map.<string,IIndex>} */
            this._indices = new _map2.default();
            this._indicesToDelete = [];
            this._decoder = decoder;
        }

        /**
         * A map of index names to indices.
         * The index names can be used to access an index.
         * @type {Map.<string,IIndex>}
         */
        get indices() {
            return this._indices;
        }

        /**
         * Internal method called by the JungleDB to create the necessary indices during a version upgrade.
         * @param {IDBObjectStore} objectStore The IDBObjectStore object obtained during a version upgrade.
         * @protected
         */
        init(objectStore) {
            // Delete indices.
            for (const indexName of this._indicesToDelete) {
                objectStore.deleteIndex(indexName);
            }
            delete this._indicesToDelete;

            // Create indices.
            for (const [indexName, index] of this._indices) {
                objectStore.createIndex(indexName, index.keyPath, { unique: false, multiEntry: index.multiEntry });
            }
        }

        /**
         * Internal method called to decode a single value.
         * @param {*} value Value to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
         */
        decode(value, decoder = undefined) {
            if (value === undefined) {
                return undefined;
            }
            if (decoder !== undefined) {
                if (decoder === null) {
                    return value;
                }
                return decoder(value);
            }
            if (this._decoder !== null && this._decoder !== undefined) {
                return this._decoder(value);
            }
            return value;
        }

        /**
         * Internal method called to decode multiple values.
         * @param {Array.<*>} values Values to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
         */
        decodeArray(values, decoder = undefined) {
            if (!Array.isArray(values)) {
                return this.decode(values, decoder);
            }
            if (decoder !== undefined) {
                if (decoder === null) {
                    return values;
                }
                return values.map(decoder);
            }
            if (this._decoder !== null && this._decoder !== undefined) {
                return values.map(this._decoder);
            }
            return values;
        }

        /**
         * Returns a promise of the object stored under the given primary key.
         * Resolves to undefined if the key is not present in the object store.
         * @param {string} key The primary key to look for.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
         */
        get(key, decoder = undefined) {
            var _this = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const db = yield _this._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const getTx = db.transaction([_this._tableName]).objectStore(_this._tableName).get(key);
                    getTx.onsuccess = function (event) {
                        return resolve(_this.decode(event.target.result, decoder));
                    };
                    getTx.onerror = reject;
                });
            })();
        }

        /**
         * Inserts or replaces a key-value pair.
         * @param {string} key The primary key to associate the value with.
         * @param {*} value The value to write.
         * @returns {Promise} The promise resolves after writing to the current object store finished.
         */
        put(key, value) {
            var _this2 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const db = yield _this2._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const putTx = db.transaction([_this2._tableName], 'readwrite').objectStore(_this2._tableName).put(value, key);
                    putTx.onsuccess = function (event) {
                        return resolve(event.target.result);
                    };
                    putTx.onerror = reject;
                });
            })();
        }

        /**
         * Removes the key-value pair of the given key from the object store.
         * @param {string} key The primary key to delete along with the associated object.
         * @returns {Promise} The promise resolves after writing to the current object store finished.
         */
        remove(key) {
            var _this3 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const db = yield _this3._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const deleteTx = db.transaction([_this3._tableName], 'readwrite').objectStore(_this3._tableName).delete(key);
                    deleteTx.onsuccess = function (event) {
                        return resolve(event.target.result);
                    };
                    deleteTx.onerror = reject;
                });
            })();
        }

        /**
         * Returns a promise of an array of objects whose primary keys fulfill the given query.
         * If the optional query is not given, it returns all objects in the object store.
         * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
         * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
         */
        values(query = null, decoder = undefined) {
            var _this4 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (query !== null && query instanceof Query) {
                    return query.values(_this4);
                }
                query = IDBTools.convertKeyRange(query);
                const db = yield _this4._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const getRequest = db.transaction([_this4._tableName], 'readonly').objectStore(_this4._tableName).getAll(query);
                    getRequest.onsuccess = function () {
                        return resolve(_this4.decodeArray(getRequest.result, decoder));
                    };
                    getRequest.onerror = function () {
                        return reject(getRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of a set of keys fulfilling the given query.
         * If the optional query is not given, it returns all keys in the object store.
         * If the query is of type KeyRange, it returns all keys of the object store being within this range.
         * If the query is of type Query, it returns all keys fulfilling the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
         */
        keys(query = null) {
            var _this5 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (query !== null && query instanceof Query) {
                    return query.keys(_this5);
                }
                query = IDBTools.convertKeyRange(query);
                const db = yield _this5._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const getRequest = db.transaction([_this5._tableName], 'readonly').objectStore(_this5._tableName).getAllKeys(query);
                    getRequest.onsuccess = function () {
                        return resolve(_set2.default.from(getRequest.result));
                    };
                    getRequest.onerror = function () {
                        return reject(getRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of the object whose primary key is maximal for the given range.
         * If the optional query is not given, it returns the object whose key is maximal.
         * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        maxValue(query = null, decoder = undefined) {
            var _this6 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this6._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const openCursorRequest = db.transaction([_this6._tableName], 'readonly').objectStore(_this6._tableName).openCursor(query, 'prev');
                    openCursorRequest.onsuccess = function () {
                        return resolve(_this6.decode(openCursorRequest.result.value, decoder));
                    };
                    openCursorRequest.onerror = function () {
                        return reject(openCursorRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of the key being maximal for the given range.
         * If the optional query is not given, it returns the maximal key.
         * If the query is of type KeyRange, it returns the key being maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        maxKey(query = null) {
            var _this7 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this7._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const openCursorRequest = db.transaction([_this7._tableName], 'readonly').objectStore(_this7._tableName).openKeyCursor(query, 'prev');
                    openCursorRequest.onsuccess = function () {
                        return resolve(openCursorRequest.result.primaryKey);
                    };
                    openCursorRequest.onerror = function () {
                        return reject(openCursorRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of the object whose primary key is minimal for the given range.
         * If the optional query is not given, it returns the object whose key is minimal.
         * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        minValue(query = null, decoder = undefined) {
            var _this8 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this8._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const openCursorRequest = db.transaction([_this8._tableName], 'readonly').objectStore(_this8._tableName).openCursor(query, 'next');
                    openCursorRequest.onsuccess = function () {
                        return resolve(_this8.decode(openCursorRequest.result.value, decoder));
                    };
                    openCursorRequest.onerror = function () {
                        return reject(openCursorRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of the key being minimal for the given range.
         * If the optional query is not given, it returns the minimal key.
         * If the query is of type KeyRange, it returns the key being minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        minKey(query = null) {
            var _this9 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this9._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const openCursorRequest = db.transaction([_this9._tableName], 'readonly').objectStore(_this9._tableName).openKeyCursor(query, 'next');
                    openCursorRequest.onsuccess = function () {
                        return resolve(openCursorRequest.result.primaryKey);
                    };
                    openCursorRequest.onerror = function () {
                        return reject(openCursorRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns the count of entries in the given range.
         * If the optional query is not given, it returns the count of entries in the object store.
         * If the query is of type KeyRange, it returns the count of entries within the given range.
         * @param {KeyRange} [query]
         * @returns {Promise.<number>}
         */
        count(query = null) {
            var _this10 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this10._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const getRequest = db.transaction([_this10._tableName], 'readonly').objectStore(_this10._tableName).count(query);
                    getRequest.onsuccess = function () {
                        return resolve(getRequest.result);
                    };
                    getRequest.onerror = function () {
                        return reject(getRequest.error);
                    };
                });
            })();
        }

        /**
         * The wrapper object stores do not support this functionality
         * as it is managed by the ObjectStore.
         * @param {Transaction} [tx]
         * @returns {Promise.<boolean>}
         */
        commit(tx) {
            return (0, _asyncToGenerator3.default)(function* () {
                throw 'Unsupported operation';
            })();
        }

        /**
         * The wrapper object stores do not support this functionality
         * as it is managed by the ObjectStore.
         * @param {Transaction} [tx]
         */
        abort(tx) {
            return (0, _asyncToGenerator3.default)(function* () {
                throw 'Unsupported operation';
            })();
        }

        /**
         * Returns the index of the given name.
         * If the index does not exist, it returns undefined.
         * @param {string} indexName The name of the requested index.
         * @returns {IIndex} The index associated with the given name.
         */
        index(indexName) {
            return this._indices.get(indexName);
        }

        /** @type {Promise.<IDBDatabase>} The underlying IDBDatabase. */
        get backend() {
            return this._db.backend;
        }

        /** @type {string} The own table name. */
        get tableName() {
            return this._tableName;
        }

        /**
         * Internally applies a transaction to the store's state.
         * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
         * or no changes are applied.
         * @param {Transaction} tx The transaction to apply.
         * @returns {Promise} The promise resolves after applying the transaction.
         * @protected
         */
        _apply(tx) {
            var _this11 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const db = yield _this11._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const idbTx = db.transaction([_this11._tableName], 'readwrite');
                    const objSt = idbTx.objectStore(_this11._tableName);

                    if (tx._truncated) {
                        objSt.clear();
                    }
                    for (const key of tx._removed) {
                        objSt.delete(key);
                    }
                    for (const [key, value] of tx._modified) {
                        objSt.put(value, key);
                    }

                    idbTx.oncomplete = function () {
                        return resolve(true);
                    };
                    idbTx.onerror = reject;
                });
            })();
        }

        /**
         * Empties the object store.
         * @returns {Promise} The promise resolves after emptying the object store.
         */
        truncate() {
            var _this12 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const db = yield _this12._db.backend;
                return new _promise2.default(function (resolve, reject) {
                    const getRequest = db.transaction([_this12._tableName], 'readonly').objectStore(_this12._tableName).clear();
                    getRequest.onsuccess = resolve;
                    getRequest.onerror = function () {
                        return reject(getRequest.error);
                    };
                });
            })();
        }

        /**
         * Creates a new secondary index on the object store.
         * Currently, all secondary indices are non-unique.
         * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
         * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
         * { 'a': { 'b': 'key' } }
         * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
         * be used to find this entry.
         * If a new object does not possess the key path associated with that index, it is simply ignored.
         *
         * This function may only be called before the database is connected.
         * Moreover, it is only executed on database version updates or on first creation.
         * @param {string} indexName The name of the index.
         * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
         * @param {boolean} [multiEntry]
         */
        createIndex(indexName, keyPath, multiEntry = false) {
            var _this13 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (_this13._db.connected) throw 'Cannot create index while connected';
                keyPath = keyPath || indexName;
                const index = new PersistentIndex(_this13, indexName, keyPath, multiEntry);
                _this13._indices.set(indexName, index);
            })();
        }

        /**
         * Deletes a secondary index from the object store.
         * @param indexName
         * @returns {Promise} The promise resolves after deleting the index.
         */
        deleteIndex(indexName) {
            var _this14 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (_this14._db.connected) throw 'Cannot delete index while connected';
                _this14._indicesToDelete.push(indexName);
            })();
        }

        /**
         * Closes the object store and potential connections.
         * @returns {Promise} The promise resolves after closing the object store.
         */
        close() {
            // Nothing to do here, it is all done on the DB level.
            return this._db.close();
        }
    }
    Class.register(IDBBackend);

    /**
     * @implements {IJungleDB}
     */
    class JungleDB {
        /**
         * Initiates a new database connection. All changes to the database structure
         * require an increase in the version number.
         * Whenever new object stores need to be created, old ones deleted,
         * or indices created/deleted, the dbVersion number has to be increased.
         * When the version number increases, the given function onUpgradeNeeded is called
         * after modifying the database structure.
         * @param {string} name The name of the database.
         * @param {number} dbVersion The current version of the database.
         * @param {function()} [onUpgradeNeeded] A function to be called after upgrades of the structure.
         */
        constructor(name, dbVersion, onUpgradeNeeded) {
            if (dbVersion <= 0) throw 'The version provided must not be less or equal to 0.';
            this._databaseDir = name;
            this._dbVersion = dbVersion;
            this._onUpgradeNeeded = onUpgradeNeeded;
            this._connected = false;
            this._objectStores = new _map2.default();
            this._objectStoreBackends = new _map2.default();
            this._objectStoresToDelete = [];
        }

        /**
         * @type {IDBFactory} The browser's IDB factory.
         * @private
         */
        get _indexedDB() {
            return window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
        }

        /**
         * Connects to the indexedDB.
         * @returns {Promise.<IDBDatabase>} A promise resolving on successful connection.
         * The raw IDBDatabase object should not be used.
         */
        connect() {
            if (this._db) return _promise2.default.resolve(this._db);

            const request = this._indexedDB.open(this._databaseDir, this._dbVersion);
            const that = this;

            return new _promise2.default((resolve, reject) => {
                request.onsuccess = () => {
                    that._connected = true;
                    that._db = request.result;
                    resolve(request.result);
                };

                request.onupgradeneeded = event => that._initDB(event);
            });
        }

        /**
         * Internal method that is called when a db upgrade is required.
         * @param {*} event The obupgradeneeded event.
         * @returns {Promise.<void>} A promise that resolves after successful completion.
         * @private
         */
        _initDB(event) {
            var _this15 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const db = event.target.result;

                // Delete existing ObjectStores.
                for (const tableName of _this15._objectStoresToDelete) {
                    db.deleteObjectStore(tableName);
                }
                delete _this15._objectStoresToDelete;

                // Create new ObjectStores.
                for (const [tableName, objStore] of _this15._objectStoreBackends) {
                    const IDBobjStore = db.createObjectStore(tableName);
                    // Create indices.
                    objStore.init(IDBobjStore);
                }
                delete _this15._objectStoreBackends;

                // Call user defined function if requested.
                if (_this15._onUpgradeNeeded) {
                    yield _this15._onUpgradeNeeded();
                }
            })();
        }

        /** @type {Promise.<IDBDatabase>} A promise to the underlying IDBDatabase. */
        get backend() {
            return this.connect();
        }

        /** @type {boolean} Whether a connection is established. */
        get connected() {
            return this._connected;
        }

        /**
         * Returns the ObjectStore object for a given table name.
         * @param {string} tableName The table name to access.
         * @returns {ObjectStore} The ObjectStore object.
         */
        getObjectStore(tableName) {
            return this._objectStores.get(tableName);
        }

        /**
         * Creates a new object store (and allows to access it).
         * This method always has to be called before connecting to the database.
         * If it is not called, the object store will not be accessible afterwards.
         * If a call is newly introduced, but the database version did not change,
         * the table does not exist yet.
         * @param {string} tableName The name of the object store.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default.
         */
        createObjectStore(tableName, decoder = null) {
            if (this._connected) throw 'Cannot create ObjectStore while connected';
            if (this._objectStores.has(tableName)) {
                return this._objectStores.get(tableName);
            }
            const backend = new IDBBackend(this, tableName, decoder);
            const cachedBackend = new CachedBackend(backend);
            const objStore = new ObjectStore(cachedBackend, this, decoder);
            this._objectStores.set(tableName, objStore);
            this._objectStoreBackends.set(tableName, backend);
            return objStore;
        }

        /**
         * Deletes an object store.
         * This method has to be called before connecting to the database.
         * @param {string} tableName
         */
        deleteObjectStore(tableName) {
            var _this16 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (_this16._connected) throw 'Cannot delete ObjectStore while connected';
                _this16._objectStoresToDelete.push(tableName);
            })();
        }

        /**
         * Closes the database connection.
         * @returns {Promise} The promise resolves after closing the database.
         */
        close() {
            var _this17 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (_this17._connected) {
                    _this17._connected = false;
                    (yield _this17.backend).close();
                }
            })();
        }

        /**
         * Fully deletes the database.
         * @returns {Promise} The promise resolves after deleting the database.
         */
        destroy() {
            var _this18 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                yield _this18.close();
                return new _promise2.default(function (resolve, reject) {
                    const req = _this18._indexedDB.deleteDatabase(_this18._databaseDir);
                    req.onsuccess = resolve;
                    req.onerror = reject;
                });
            })();
        }
    }
    Class.register(JungleDB);

    /**
     * This class represents a wrapper around the IndexedDB indices.
     * @implements IIndex
     */
    class PersistentIndex {
        /**
         * @param {IDBBackend} objectStore
         * @param {string} indexName
         * @param {string|Array.<string>} keyPath
         * @param {boolean} multiEntry
         */
        constructor(objectStore, indexName, keyPath, multiEntry = false) {
            this._objectStore = objectStore;
            this._indexName = indexName;
            this._keyPath = keyPath;
            this._multiEntry = multiEntry;
        }

        /**
         * Reinitialises the index.
         * @returns {Promise} The promise resolves after emptying the index.
         */
        truncate() {
            return (0, _asyncToGenerator3.default)(function* () {})();
        }
        // Will automatically be truncated.


        /**
         * The key path associated with this index.
         * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
         * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
         * { 'a': { 'b': 'key' } }
         * @type {string|Array.<string>}
         */
        get keyPath() {
            return this._keyPath;
        }

        /**
         * This value determines whether the index supports multiple secondary keys per entry.
         * If so, the value at the key path is considered to be an iterable.
         * @type {boolean}
         */
        get multiEntry() {
            return this._multiEntry;
        }

        /**
         * Internal method to access IDB index.
         * @param {IDBDatabase} db The indexed DB.
         * @returns {IDBIndex} The indexedDB's index object.
         * @private
         */
        _index(db) {
            return db.transaction([this._objectStore.tableName], 'readonly').objectStore(this._objectStore.tableName).index(this._indexName);
        }

        /**
         * Returns a promise of an array of objects whose secondary keys fulfill the given query.
         * If the optional query is not given, it returns all objects in the index.
         * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
         * @param {KeyRange} [query] Optional query to check secondary keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
         */
        values(query = null, decoder = undefined) {
            var _this19 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this19._objectStore.backend;
                return new _promise2.default(function (resolve, reject) {
                    const getRequest = _this19._index(db).getAll(query);
                    getRequest.onsuccess = function () {
                        return resolve(_this19._objectStore.decodeArray(getRequest.result, decoder));
                    };
                    getRequest.onerror = function () {
                        return reject(getRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
         * If the optional query is not given, it returns all primary keys in the index.
         * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
         * @param {KeyRange} [query] Optional query to check the secondary keys against.
         * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
         */
        keys(query = null) {
            var _this20 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this20._objectStore.backend;
                return new _promise2.default(function (resolve, reject) {
                    const getRequest = _this20._index(db).getAllKeys(query);
                    getRequest.onsuccess = function () {
                        return resolve(_set2.default.from(getRequest.result));
                    };
                    getRequest.onerror = function () {
                        return reject(getRequest.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary key is maximal for the given range.
         * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
         * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
         */
        maxValues(query = null, decoder = undefined) {
            var _this21 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this21._objectStore.backend;
                return new _promise2.default(function (resolve, reject) {
                    const request = _this21._index(db).openCursor(query, 'prev');
                    request.onsuccess = function () {
                        return resolve(request.result ? _this21._objectStore.decodeArray(request.result.value, decoder) : []);
                    };
                    request.onerror = function () {
                        return reject(request.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
         * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
         * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
         */
        maxKeys(query = null) {
            var _this22 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this22._objectStore.backend;
                return new _promise2.default(function (resolve, reject) {
                    const request = _this22._index(db).openKeyCursor(query, 'prev');
                    request.onsuccess = function () {
                        return resolve(_set2.default.from(request.result ? request.result.primaryKey : []));
                    };
                    request.onerror = function () {
                        return reject(request.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary key is minimal for the given range.
         * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
         * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
         */
        minValues(query = null, decoder = undefined) {
            var _this23 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this23._objectStore.backend;
                return new _promise2.default(function (resolve, reject) {
                    const request = _this23._index(db).openCursor(query, 'next');
                    request.onsuccess = function () {
                        return resolve(request.result ? _this23._objectStore.decodeArray(request.result.value, decoder) : []);
                    };
                    request.onerror = function () {
                        return reject(request.error);
                    };
                });
            })();
        }

        /**
         * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
         * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
         * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
         */
        minKeys(query = null) {
            var _this24 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this24._objectStore.backend;
                return new _promise2.default(function (resolve, reject) {
                    const request = _this24._index(db).openKeyCursor(query, 'next');
                    request.onsuccess = function () {
                        return resolve(_set2.default.from(request.result ? request.result.primaryKey : []));
                    };
                    request.onerror = function () {
                        return reject(request.error);
                    };
                });
            })();
        }

        /**
         * Returns the count of entries, whose secondary key is in the given range.
         * If the optional query is not given, it returns the count of entries in the index.
         * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
         * @param {KeyRange} [query]
         * @returns {Promise.<number>}
         */
        count(query = null) {
            var _this25 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                query = IDBTools.convertKeyRange(query);
                const db = yield _this25._objectStore.backend;
                return new _promise2.default(function (resolve, reject) {
                    const request = _this25._index(db).count(query);
                    request.onsuccess = function () {
                        return resolve(request.result);
                    };
                    request.onerror = function () {
                        return reject(request.error);
                    };
                });
            })();
        }
    }
    Class.register(PersistentIndex);

    /*
     B+ Tree processing
     Version 2.0.0
     Based on code by Graham O'Neill, April 2013
     Modified by Pascal Berrang, July 2017
    
     ------------------------------------------------------------------------------
    
     Copyright (c) 2017 Graham O'Neill & Pascal Berrang
    
     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:
    
     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.
    
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE.
    
     ------------------------------------------------------------------------------
    
     */

    /**
     * This abstract class describes a general Node within a B+Tree.
     * Each node owns an array of keys and has an id.
     */
    class Node {
        /**
         * Creates a new node.
         * @param {number} id The node's id.
         * @param {Array.<*>} [keys] Optional array of keys (default is empty).
         */
        constructor(id, keys = []) {
            this._keys = keys;
            this._id = id;
        }

        /**
         * @type {number} The id of the node.
         */
        get id() {
            return this._id;
        }

        /**
         * @type {Array.<*>} The array of keys.
         */
        get keys() {
            return this._keys;
        }

        /**
         * Converts a node to JSON, which is necessary to persist the B+Tree.
         * @returns {{_id: number, _keys: Array.<*>}} The JSON representation.
         */
        toJSON() {
            return {
                _id: this._id,
                _keys: this._keys
            };
        }

        /**
         * Constructs a node from a JSON object.
         * @param {{isLeaf: boolean, _id: number, _keys: Array.<*>}} o The JSON object to build the node from.
         * @returns {Node} The constructed node.
         */
        static fromJSON(o) {
            if (o.isLeaf === true) {
                return LeafNode.fromJSON(o);
            } else if (o.isLeaf === false) {
                return InnerNode.fromJSON(o);
            }
            return undefined;
        }
    }
    Class.register(Node);

    /**
     * A Leaf Node in the B+Tree.
     * @extends Node
     */
    class LeafNode extends Node {
        /**
         * Creates a new leaf node.
         * Leaf nodes store key value pairs,
         * hence the keys and records arrays are required to have the same length.
         * In an index, the keys array usually stores the secondary key,
         * while the records array stores the corresponding primary key.
         * The B+Tree ensures that the items in the keys array are ordered ascending.
         * @param {number} id The node's id.
         * @param {Array.<*>} [keys] Optional array of keys (default is empty).
         * @param {Array.<*>} [records] Optional array of records (default is empty).
         */
        constructor(id, keys = [], records = []) {
            if (keys.length !== records.length) {
                throw 'Keys and records must have the same length';
            }
            super(id, keys);
            this._records = records;
            this.prevLeaf = null;
            this.nextLeaf = null;
        }

        /**
         * @type {Array.<*>} The list of records associated with the keys.
         */
        get records() {
            return this._records;
        }

        /**
         * Returns whether this is a leaf node.
         * @returns {boolean} True, since it is a leaf node.
         */
        isLeaf() {
            return true;
        }

        /**
         * Converts a node to JSON, which is necessary to persist the B+Tree.
         * @returns {{_id: number, _keys: Array.<*>, _records: Array.<*>, isLeaf: boolean, prevLeaf: number, nextLeaf: number}} The JSON representation.
         */
        toJSON() {
            const o = super.toJSON();
            o.isLeaf = true;
            o._records = this._records;
            o.prevLeaf = this.prevLeaf ? this.prevLeaf.id : this.prevLeaf;
            o.nextLeaf = this.nextLeaf ? this.nextLeaf.id : this.nextLeaf;
            return o;
        }

        /**
         * Constructs a node from a JSON object.
         * @param {{_id: number, _keys: Array.<*>, _records: Array.<*>, isLeaf: boolean, prevLeaf: number, nextLeaf: number}} o The JSON object to build the node from.
         * @returns {Node} The constructed node.
         */
        static fromJSON(o) {
            const leaf = new LeafNode(o._id, o._keys, o._records);
            leaf.prevLeaf = o.prevLeaf;
            leaf.nextLeaf = o.nextLeaf;
            return leaf;
        }

        /**
         * Searches the node for a specific key and returns its position if found.
         * The near parameter allows to find either an exact match or the first key
         * greater/less or equal than the specified key.
         *
         * Since the B+tree limits the number of records per leaf node,
         * the complexity of this method is in O([order/2, order-1]).
         * @param {*} key The key to look for.
         * @param {BTree.NEAR_MODE} near
         * @returns {number} The index of the match if found, -1 otherwise.
         */
        getItem(key, near) {
            const keys = this._keys;
            // Find item matching the query.
            if (near === BTree.NEAR_MODE.GE) {
                for (let i = 0, len = keys.length; i < len; ++i) {
                    if (key <= keys[i]) return i;
                }
            } else if (near === BTree.NEAR_MODE.LE) {
                for (let i = keys.length - 1; i >= 0; --i) {
                    if (key >= keys[i]) return i;
                }
            } else {
                for (let i = 0, len = keys.length; i < len; ++i) {
                    if (key === keys[i]) return i;
                }
            }
            return -1;
        }

        /**
         * Adds a key, record pair to this leaf node.
         * By definition, the key is inserted into the keys of this leaf node,
         * such that the ascending order of the keys is maintained.
         * @param {*} key The key to insert.
         * @param {*} record The corresponding record to insert.
         * @returns {number} The position it was inserted at.
         */
        addKey(key, record) {
            let insertPos = this._keys.length;
            // Find position to insert.
            for (let i = 0, len = insertPos; i < len; ++i) {
                // Key already exists.
                if (key === this._keys[i]) {
                    return -1;
                }
                // Update potential position.
                if (key <= this._keys[i]) {
                    insertPos = i;
                    break;
                }
            }
            // Insert key/record.
            this._keys.splice(insertPos, 0, key);
            this._records.splice(insertPos, 0, record);
            return insertPos;
        }

        /**
         * Splits the leaf node into two nodes (this + one new node).
         * The resulting nodes should have almost equal sizes.
         * The new node will return the upper half of the previous entries.
         * @param {number} newId The id to be assigned the new node.
         * @returns {LeafNode} The new leaf node containing the upper half of entries.
         */
        split(newId) {
            const mov = Math.floor(this._keys.length / 2);
            const newKeys = [],
                  newRecords = [];
            for (let i = 0; i < mov; ++i) {
                newKeys.unshift(this._keys.pop());
                newRecords.unshift(this._records.pop());
            }
            const newL = new LeafNode(newId, newKeys, newRecords);
            newL.prevLeaf = this;
            newL.nextLeaf = this.nextLeaf;
            if (this.nextLeaf !== null) this.nextLeaf.prevLeaf = newL;
            this.nextLeaf = newL;
            return newL;
        }

        /**
         * Merges two leaf nodes together (this + frNod).
         * The given node frNod is no longer connected afterwards.
         * @param {LeafNode} frNod The node to merge with.
         * @param {InnerNode} paNod The parent node that needs to be updated.
         * @param {*} frKey The key of the old leaf in the parent.
         */
        merge(frNod, paNod, frKey) {
            // Append keys/records.
            for (let i = 0, len = frNod.keys.length; i < len; ++i) {
                this._keys.push(frNod.keys[i]);
                this._records.push(frNod.records[i]);
            }
            // Update leaf pointers.
            this.nextLeaf = frNod.nextLeaf;
            if (frNod.nextLeaf !== null) frNod.nextLeaf.prevLeaf = this;
            frNod.prevLeaf = null;
            frNod.nextLeaf = null;
            // Update parent: find position of old leaf.
            let pos = paNod.keys.length - 1;
            for (let i = pos; i >= 0; --i) {
                if (paNod.keys[i] === frKey) {
                    pos = i;
                    break;
                }
            }
            // Delete old key from parent.
            paNod.keys.splice(pos, 1);
            paNod.nodePointers.splice(pos + 1, 1);
        }

    }
    Class.register(LeafNode);

    /**
     * An Inner Node in the B+Tree.
     * @extends Node
     */
    class InnerNode extends Node {
        /**
         * Creates a new inner node.
         * The only key values that appear in the internal nodes are the first key values from each leaf,
         * with the exception of the key from the very first leaf which isn't included.
         * Each key value that appears in the internal nodes only appears once.
         * @param {number} id The node's id.
         * @param {Array.<*>} [keys] The first key of each child node (except for the first one).
         * @param {Array.<Node>} [nodePointers] The pointers to the child nodes.
         */
        constructor(id, keys = [], nodePointers = []) {
            super(id, keys);
            this._nodePointers = nodePointers;
        }

        /**
         * Returns whether this is a leaf node.
         * @returns {boolean} False, since it is an inner node.
         */
        isLeaf() {
            return false;
        }

        /**
         * @type {Array.<Node>} The pointers to the children.
         */
        get nodePointers() {
            return this._nodePointers;
        }

        /**
         * Converts a node to JSON, which is necessary to persist the B+Tree.
         * @returns {{_id: number, _keys: Array.<*>, isLeaf: boolean, _nodePointers: Array.<number>}} The JSON representation.
         */
        toJSON() {
            const o = super.toJSON();
            const nodePointers = [];
            for (let i = 0; i < this._nodePointers.length; ++i) {
                nodePointers.push(this._nodePointers[i] ? this._nodePointers[i].id : this._nodePointers[i]);
            }
            o.isLeaf = false;
            o._nodePointers = nodePointers;
            return o;
        }

        /**
         * Constructs a node from a JSON object.
         * @param {{_id: number, _keys: Array.<*>, isLeaf: boolean, _nodePointers: Array.<number>}} o The JSON object to build the node from.
         * @returns {Node} The constructed node.
         */
        static fromJSON(o) {
            return new InnerNode(o._id, o._keys, o._nodePointers);
        }

        /**
         * Searches the node for a specific key and returns the matching child's position.
         *
         * Since the B+tree limits the number of records per leaf node,
         * the complexity of this method is in O([(order-1)/2, order-1]).
         * @param {*} key The key to look for.
         * @returns {number} The index of the match.
         */
        getItem(key) {
            const len = this._keys.length;
            for (let i = 0; i < len; ++i) {
                if (key < this._keys[i]) return i;
            }
            return this._keys.length;
        }

        /**
         * Adds a key corresponding to a new child node to this inner node.
         * By definition, the key is inserted into the keys of this leaf node,
         * such that the ascending order of the keys is maintained.
         * @param {*} key The key to insert.
         * @param {Node} ptrL The pointer to the corresponding child node.
         * @param {Node} ptrR The pointer to the node right of the child node.
         * @returns {number} The position it was inserted at.
         */
        addKey(key, ptrL, ptrR) {
            const len = this._keys.length;
            let insertPos = len;
            // Find position to insert.
            for (let i = 0; i < len; ++i) {
                if (key <= this._keys[i]) {
                    insertPos = i;
                    break;
                }
            }
            // Update keys and pointers.
            this._keys.splice(insertPos, 0, key);
            this._nodePointers.splice(insertPos, 0, ptrL);
            this._nodePointers[insertPos + 1] = ptrR;
        }

        /**
         * Splits the node into two nodes (this + one new node).
         * The resulting nodes should have almost equal sizes.
         * The new node will return the upper half of the previous entries.
         * @param {number} newId The id to be assigned the new node.
         * @returns {InnerNode} The new inner node containing the upper half of entries.
         */
        split(newId) {
            const mov = Math.ceil(this._keys.length / 2) - 1;
            const newNodePointers = [this._nodePointers.pop()];
            const newKeys = [];
            for (let i = mov - 1; i >= 0; --i) {
                newKeys.unshift(this._keys.pop());
                newNodePointers.unshift(this._nodePointers.pop());
            }
            return new InnerNode(newId, newKeys, newNodePointers);
        }

        /**
         * Merges two inner nodes together (this + frNod).
         * The given node frNod is no longer connected afterwards.
         * @param {InnerNode} frNod The node to merge with.
         * @param {InnerNode} paNod The parent node that needs to be updated.
         * @param {number} paItm The position in the parent.
         */
        merge(frNod, paNod, paItm) {
            const del = paNod.keys[paItm];
            // Add key from parent.
            this._keys.push(del);
            // Add keys and nodePointers from merged node.
            for (let i = 0, len = frNod.keys.length; i < len; ++i) {
                this._keys.push(frNod.keys[i]);
                this._nodePointers.push(frNod.nodePointers[i]);
            }
            // Add last nodePointer as well.
            this._nodePointers.push(frNod.nodePointers[frNod.nodePointers.length - 1]);
            paNod.keys.splice(paItm, 1); // Delete old key from parent.
            paNod.nodePointers.splice(paItm + 1, 1); // Delete old pointer from parent.
            return del;
        }
    }
    Class.register(InnerNode);

    /**
     * The actual BTree implementation.
     * @implements {IBTree}
     */
    class BTree {
        /**
         * Creates a new BTree of a given order.
         * The order specifies how many entries a single node can contain.
         * A leaf node generally contains [order/2, order-1] entries,
         * while an inner node contains [(order-1)/2, order-1] entries.
         * @param {number} order The order of the tree.
         */
        constructor(order = 7) {
            this._nodeId = 0; // Needed for persistence.
            this._root = new LeafNode(this._nodeId++);
            this._maxkey = order - 1;
            this._minkyl = Math.floor(order / 2);
            this._minkyn = Math.floor(this._maxkey / 2);
            this._leaf = null;
            this._item = -1;

            this._key = null;
            this._record = null;
            this._length = 0;
            this._eof = true;
            this._found = false;
        }

        /**
         * The total number of records.
         * Note that if the record is a list/set of records, these are not counted.
         * @type {number}
         */
        get length() {
            return this._length;
        }

        /**
         * The current key as returned by any operation.
         * It is null if there is no matching record.
         * @type {*}
         */
        get currentKey() {
            return this._key;
        }

        /**
         * The current record as returned by any operation.
         * It is null if there is no matching record.
         * @type {*}
         */
        get currentRecord() {
            return this._record;
        }

        /**
         * Creates a new TreeTransaction object on this tree.
         * A tree transaction keeps track of the changed nodes and entries,
         * so that these can be updated in a permanent storage.
         * @returns {TreeTransaction}
         */
        transaction() {
            return new TreeTransaction(this);
        }

        /**
         * Inserts a new key-record pair into the BTree, if there is no entry for that key.
         * The current record and current key are set to the new entry in case of success
         * or the existing entry if present.
         * @param {*} key The unique key for the record.
         * @param {*} rec The record associated with the key.
         * @returns {boolean} True if the record was inserted, false if there was already a record with that key.
         */
        insert(key, rec, modified = null) {
            const stack = [];
            this._leaf = this._root;
            while (!this._leaf.isLeaf()) {
                stack.push(this._leaf);
                this._item = this._leaf.getItem(key);
                this._leaf = this._leaf.nodePointers[this._item];
            }
            this._item = this._leaf.addKey(key, rec);
            this._key = key;
            this._eof = false;
            if (this._item === -1) {
                this._found = true;
                this._item = this._leaf.getItem(key, false);
                this._record = this._leaf.records[this._item];
            } else {
                BTree._modifyNode(modified, this._leaf);

                this._found = false;
                this._record = rec;
                this._length++;
                if (this._leaf.keys.length > this._maxkey) {
                    let pL = this._leaf;
                    let pR = this._leaf.split(this._nodeId++);
                    BTree._modifyNode(modified, pL); // we splitted nodes
                    BTree._modifyNode(modified, pR);
                    let ky = pR.keys[0];
                    this._item = this._leaf.getItem(key, false);
                    if (this._item === -1) {
                        this._leaf = this._leaf.nextLeaf;
                        this._item = this._leaf.getItem(key, false);
                    }
                    while (true) {
                        // eslint-disable-line no-constant-condition
                        if (stack.length === 0) {
                            const newN = new InnerNode(this._nodeId++);
                            newN.keys[0] = ky;
                            newN.nodePointers[0] = pL;
                            newN.nodePointers[1] = pR;
                            BTree._modifyNode(modified, newN);
                            this._root = newN;
                            break;
                        }
                        const nod = stack.pop();
                        nod.addKey(ky, pL, pR);
                        BTree._modifyNode(modified, nod);
                        if (nod.keys.length <= this._maxkey) break;
                        pL = nod;
                        pR = nod.split(this._nodeId++);
                        BTree._modifyNode(modified, pL);
                        BTree._modifyNode(modified, pR);
                        ky = nod.keys.pop();
                    }
                }
            }
            return !this._found;
        }

        /**
         * Removes a key-record pair from the BTree.
         * In case of successful deletion, the current record and key will be set to the next entry greater or equal.
         * If no record was found, they will be reset to null.
         * @param {*} key The unique key for the record.
         * @returns {boolean} True if the record was deleted, false if there is no such record.
         */
        remove(key, modified = null, removed = null) {
            if (typeof key === 'undefined') {
                if (this._item === -1) {
                    this._eof = true;
                    this._found = false;
                    return false;
                }
                key = this._leaf.keys[this._item];
            }
            this._del(key, modified, removed);
            if (!this._found) {
                this._item = -1;
                this._eof = true;
                this._key = null;
                this._record = null;
            } else {
                this.seek(key, BTree.NEAR_MODE.GE);
                this._found = true;
            }
            return this._found;
        }

        /**
         * Searches the tree for a specific key and advances the current key/record pointers if found.
         * By default only an exact key match is found, but the near parameter also allows to advance to the next entry
         * greater/less or equal than the specified key.
         * @param {*} key The key to look for.
         * @param {BTree.NEAR_MODE} [near] Optional parameter, specifies to look for a key k' =/≤/≥ key.
         * @returns {boolean} True if such a key was found, false otherwise.
         */
        seek(key, near = BTree.NEAR_MODE.NONE) {
            this._leaf = this._root;
            while (!this._leaf.isLeaf()) {
                this._item = this._leaf.getItem(key);
                this._leaf = this._leaf.nodePointers[this._item];
            }
            this._item = this._leaf.getItem(key, near);
            if (near === BTree.NEAR_MODE.GE && this._item === -1 && this._leaf.nextLeaf !== null) {
                this._leaf = this._leaf.nextLeaf;
                this._item = 0;
            }
            if (near === BTree.NEAR_MODE.LE && this._item === -1 && this._leaf.prevLeaf !== null) {
                this._leaf = this._leaf.prevLeaf;
                this._item = this._leaf.records.length - 1;
            }
            if (this._item === -1) {
                this._eof = true;
                this._key = null;
                this._found = false;
                this._record = null;
            } else {
                this._eof = false;
                this._found = this._leaf.keys[this._item] === key;
                this._key = this._leaf.keys[this._item];
                this._record = this._leaf.records[this._item];
            }
            return !this._eof;
        }

        /**
         * Advances the current key/record pointers by a given number of steps.
         * Default is advancing by 1, which means the next record (the new key will thus be the next larger key).
         * -1 means the previous record (the new key will thus be the next smaller key).
         * @param {number} [cnt] The number of records to advance (may be negative).
         * @returns {boolean} True if there is a record to advance to, false otherwise.
         */
        skip(cnt = 1) {
            if (typeof cnt !== 'number') cnt = 1;
            if (this._item === -1 || this._leaf === null) this._eof = true;
            if (cnt > 0) {
                while (!this._eof && this._leaf.keys.length - this._item - 1 < cnt) {
                    cnt = cnt - this._leaf.keys.length + this._item;
                    this._leaf = this._leaf.nextLeaf;
                    if (this._leaf === null) {
                        this._eof = true;
                    } else {
                        this._item = 0;
                    }
                }
                if (!this._eof) this._item = this._item + cnt;
            } else {
                cnt = -cnt;
                while (!this._eof && this._item < cnt) {
                    cnt = cnt - this._item - 1;
                    this._leaf = this._leaf.prevLeaf;
                    if (this._leaf === null) {
                        this._eof = true;
                    } else {
                        this._item = this._leaf.keys.length - 1;
                    }
                }
                if (!this._eof) {
                    this._item = this._item - cnt;
                }
            }
            if (this._eof) {
                this._item = -1;
                this._found = false;
                this._key = null;
                this._record = null;
            } else {
                this._found = true;
                this._key = this._leaf.keys[this._item];
                this._record = this._leaf.records[this._item];
            }
            return this._found;
        }

        /**
         * Jumps to the cnt entry starting from the smallest key (i.e., leftmost leaf, first entry) if cnt > 0.
         * If cnt < 0, it jumps to the cnt entry starting from the largest key (i.e., rightmost leaf, last entry).
         * @param {number} [cnt] The record to jump to (may be negative).
         * @returns {boolean} True if there is a record to jump to, false otherwise.
         */
        goto(cnt) {
            if (cnt < 0) {
                this.goBottom();
                if (!this._eof) this.skip(cnt + 1);
            } else {
                this.goTop();
                if (!this._eof) this.skip(cnt - 1);
            }
            return this._found;
        }

        /**
         * Returns the index of the current entry (key/record) in a sorted list of all entries.
         * For the B+ Tree, this is done by traversing the leafs from the leftmost leaf, first entry
         * until the respective key is found.
         * @returns {number} The entry position.
         */
        keynum() {
            if (this._leaf === null || this._item === -1) return -1;
            let cnt = this._item + 1;
            let ptr = this._leaf;
            while (ptr.prevLeaf !== null) {
                ptr = ptr.prevLeaf;
                cnt += ptr.keys.length;
            }
            return cnt;
        }

        /**
         * Jumps to the smallest key's entry (i.e., leftmost leaf, first entry).
         * False will only be returned if the tree is completely empty.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goTop() {
            this._leaf = this._root;
            while (!this._leaf.isLeaf()) {
                this._leaf = this._leaf.nodePointers[0];
            }
            if (this._leaf.keys.length === 0) {
                this._item = -1;
                this._eof = true;
                this._found = false;
                this._key = null;
                this._record = null;
            } else {
                this._item = 0;
                this._eof = false;
                this._found = true;
                this._key = this._leaf.keys[0];
                this._record = this._leaf.records[0];
            }
            return this._found;
        }

        /**
         * Jumps to the largest key's entry (i.e., rightmost leaf, last entry).
         * False will only be returned if the tree is completely empty.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goBottom() {
            this._leaf = this._root;
            while (!this._leaf.isLeaf()) {
                this._leaf = this._leaf.nodePointers[this._leaf.nodePointers.length - 1];
            }
            if (this._leaf.keys.length === 0) {
                this._item = -1;
                this._eof = true;
                this._found = false;
                this._key = null;
                this._record = null;
            } else {
                this._item = this._leaf.keys.length - 1;
                this._eof = false;
                this._found = true;
                this._key = this._leaf.keys[this._item];
                this._record = this._leaf.records[this._item];
            }
            return this._found;
        }

        /**
         * Rebuilds/balances the whole tree.
         * Inserting and deleting keys into a tree will result
         * in some leaves and nodes having the minimum number of keys allowed.
         * This routine will ensure that each leaf and node has as many keys as possible,
         * resulting in a denser, flatter tree.
         * False is only returned if the tree is completely empty.
         * @returns {boolean} True if the tree is not completely empty.
         */
        pack(modified = null) {
            let len;
            let i;
            this.goTop(0);
            if (this._leaf === this._root) return false;

            // Pack leaves
            let toN = new LeafNode(this._nodeId++);
            let toI = 0;
            let frN = this._leaf;
            let frI = 0;
            let parKey = [];
            let parNod = [];
            while (true) {
                // eslint-disable-line no-constant-condition
                BTree._modifyNode(modified, toN);
                BTree._modifyNode(modified, frN);
                toN.keys[toI] = frN.keys[frI];
                toN.records[toI] = frN.records[frI];
                if (toI === 0) parNod.push(toN);
                if (frI === frN.keys.length - 1) {
                    if (frN.nextLeaf === null) break;
                    frN = frN.nextLeaf;
                    frI = 0;
                } else {
                    frI++;
                }
                if (toI === this._maxkey - 1) {
                    const tmp = new LeafNode(this._nodeId++);
                    toN.nextLeaf = tmp;
                    tmp.prevLeaf = toN;
                    toN = tmp;
                    toI = 0;
                } else {
                    toI++;
                }
            }
            let mov = this._minkyl - toN.keys.length;
            frN = toN.prevLeaf;
            if (mov > 0 && frN !== null) {
                BTree._modifyNode(modified, frN);
                // Insert new keys/records.
                for (i = mov - 1; i >= 0; --i) {
                    toN.keys.unshift(frN.keys.pop());
                    toN.records.unshift(frN.records.pop());
                }
            }
            for (i = 1, len = parNod.length; i < len; ++i) {
                parKey.push(parNod[i].keys[0]);
            }
            parKey[parKey.length] = null;

            // Rebuild nodes
            let kidKey, kidNod;
            while (parKey[0] !== null) {
                kidKey = parKey;
                kidNod = parNod;
                parKey = [];
                parNod = [];
                toI = this._maxkey + 1;
                i = 0;
                len = kidKey.length;
                for (; i < len; i++) {
                    if (toI > this._maxkey) {
                        toN = new InnerNode(this._nodeId++);
                        toI = 0;
                        parNod.push(toN);
                    }
                    toN.keys[toI] = kidKey[i];
                    toN.nodePointers[toI] = kidNod[i];
                    toI++;
                    BTree._modifyNode(modified, toN);
                }
                mov = this._minkyn - toN.keys.length + 1;
                if (mov > 0 && parNod.length > 1) {
                    frN = parNod[parNod.length - 2];
                    BTree._modifyNode(modified, frN);
                    for (i = mov - 1; i >= 0; --i) {
                        toN.keys.unshift(frN.keys.pop());
                        toN.nodePointers.unshift(frN.nodePointers.pop());
                    }
                }
                i = 0;
                len = parNod.length;
                for (; i < len; ++i) {
                    parKey.push(parNod[i].keys.pop());
                }
            }
            this._root = parNod[0];
            this.goTop();
            return this._found;
        }

        /**
         * Internal helper method to delete a key from the tree.
         * @param {*} key The unique key for the record.
         * @param [modified] The optional set of modified nodes (will be updated by the method).
         * @param [removed] The optional set of removed nodes (will be updated by the method).
         * @private
         */
        _del(key, modified = null, removed = null) {
            const stack = [];
            let parNod = null;
            let parPtr = -1;
            this._leaf = this._root;
            while (!this._leaf.isLeaf()) {
                stack.push(this._leaf);
                parNod = this._leaf;
                parPtr = this._leaf.getItem(key);
                this._leaf = this._leaf.nodePointers[parPtr];
            }
            this._item = this._leaf.getItem(key, false);

            // Key not in tree
            if (this._item === -1) {
                this._found = false;
                return;
            }
            this._found = true;

            // Delete key from leaf
            this._leaf.keys.splice(this._item, 1);
            this._leaf.records.splice(this._item, 1);
            BTree._modifyNode(modified, this._leaf);
            this._length--;

            // Leaf still valid: done
            if (this._leaf === this._root) {
                return;
            }
            if (this._leaf.keys.length >= this._minkyl) {
                if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
                return;
            }
            let delKey;

            // Steal from left sibling if possible
            let sibL = parPtr === 0 ? null : parNod.nodePointers[parPtr - 1];
            if (sibL !== null && sibL.keys.length > this._minkyl) {
                delKey = this._item === 0 ? key : this._leaf.keys[0];
                this._leaf.keys.unshift(sibL.keys.pop());
                this._leaf.records.unshift(sibL.records.pop());
                BTree._fixNodes(stack, delKey, this._leaf.keys[0], modified);
                BTree._modifyNode(modified, sibL);
                return;
            }

            // Steal from right sibling if possible
            let sibR = parPtr === parNod.keys.length ? null : parNod.nodePointers[parPtr + 1];
            if (sibR !== null && sibR.keys.length > this._minkyl) {
                this._leaf.keys.push(sibR.keys.shift());
                this._leaf.records.push(sibR.records.shift());
                if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
                BTree._fixNodes(stack, this._leaf.keys[this._leaf.keys.length - 1], sibR.keys[0], modified);
                BTree._modifyNode(modified, sibR);
                return;
            }

            // Merge left to make one leaf
            if (sibL !== null) {
                delKey = this._item === 0 ? key : this._leaf.keys[0];
                sibL.merge(this._leaf, parNod, delKey);
                BTree._modifyNode(modified, sibL);
                BTree._modifyNode(removed, this._leaf);
                this._leaf = sibL;
            } else {
                delKey = sibR.keys[0];
                this._leaf.merge(sibR, parNod, delKey);
                BTree._modifyNode(modified, this._leaf);
                BTree._modifyNode(removed, sibR);
                if (this._item === 0) BTree._fixNodes(stack, key, this._leaf.keys[0], modified);
            }

            if (stack.length === 1 && parNod.keys.length === 0) {
                this._root = this._leaf;
                return;
            }

            let curNod = stack.pop();
            let parItm;

            // Update all nodes
            while (curNod.keys.length < this._minkyn && stack.length > 0) {

                parNod = stack.pop();
                parItm = parNod.getItem(delKey);

                // Steal from right sibling if possible
                sibR = parItm === parNod.keys.length ? null : parNod.nodePointers[parItm + 1];
                if (sibR !== null && sibR.keys.length > this._minkyn) {
                    curNod.keys.push(parNod.keys[parItm]);
                    parNod.keys[parItm] = sibR.keys.shift();
                    curNod.nodePointers.push(sibR.nodePointers.shift());
                    BTree._modifyNode(modified, curNod);
                    BTree._modifyNode(modified, sibR);
                    BTree._modifyNode(modified, parNod);
                    break;
                }

                // Steal from left sibling if possible
                sibL = parItm === 0 ? null : parNod.nodePointers[parItm - 1];
                if (sibL !== null && sibL.keys.length > this._minkyn) {
                    curNod.keys.unshift(parNod.keys[parItm - 1]);
                    parNod.keys[parItm - 1] = sibL.keys.pop();
                    curNod.nodePointers.unshift(sibL.nodePointers.pop());
                    BTree._modifyNode(modified, curNod);
                    BTree._modifyNode(modified, sibL);
                    BTree._modifyNode(modified, parNod);
                    break;
                }

                // Merge left to make one node
                if (sibL !== null) {
                    delKey = sibL.merge(curNod, parNod, parItm - 1);
                    BTree._modifyNode(removed, curNod);
                    BTree._modifyNode(modified, sibL);
                    curNod = sibL;
                } else if (sibR !== null) {
                    delKey = curNod.merge(sibR, parNod, parItm);
                    BTree._modifyNode(removed, sibR);
                    BTree._modifyNode(modified, curNod);
                }

                // Next level
                if (stack.length === 0 && parNod.keys.length === 0) {
                    this._root = curNod;
                    break;
                }
                curNod = parNod;
            }
        }

        /**
         * Internal helper method to replace a key within the whole stack.
         * @param {Array.<Node>} stk The stack of nodes to examine.
         * @param {*} frKey The key to replace.
         * @param {*} toKey The new key to put in place.
         * @param {*} [modified] The optional set of modified nodes (will be updated by the method).
         * @private
         */
        static _fixNodes(stk, frKey, toKey, modified) {
            let keys,
                lvl = stk.length,
                mor = true;
            do {
                lvl--;
                keys = stk[lvl].keys;
                for (let i = keys.length - 1; i >= 0; --i) {
                    if (keys[i] === frKey) {
                        keys[i] = toKey;
                        BTree._modifyNode(modified, stk[lvl]);
                        mor = false;
                        break;
                    }
                }
            } while (mor && lvl > 0);
        }

        /**
         * Advances to the smallest key k', such that either k' > lower (if lowerOpen) or k' ≥ lower (if !lowerOpen).
         * If lower is undefined, jump to the smallest key's entry.
         * @param {*} lower A lower bound on the key or undefined.
         * @param {boolean} [lowerOpen] Whether lower may be included or not.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goToLowerBound(lower, lowerOpen = false) {
            // TODO: it might be that there is no exact key match, then we do not need to skip!
            if (lower !== undefined) {
                let success = this.seek(lower, BTree.NEAR_MODE.GE);
                if (success && lowerOpen) {
                    success = this.skip();
                }
                return success;
            }
            return this.goTop();
        }

        /**
         * Advances to the largest key k', such that either k' < upper (if upperOpen) or k' ≤ upper (if !upperOpen).
         * If upper is undefined, jump to the largest key's entry.
         * @param {*} upper An upper bound on the key or undefined.
         * @param {boolean} [upperOpen] Whether upper may be included or not.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goToUpperBound(upper, upperOpen = false) {
            // TODO: it might be that there is no exact key match, then we do not need to skip!
            if (upper !== undefined) {
                let success = this.seek(upper, BTree.NEAR_MODE.LE);
                if (success && upperOpen) {
                    success = this.skip(-1);
                }
                return success;
            }
            return this.goBottom();
        }

        /**
         * An internal helper method used to add a node to a set.
         * If the given s is not a set, it does not do anything.
         * @param {Set|*} s The set to add the node to.
         * @param {Node} node The node to add to the set.
         * @private
         */
        static _modifyNode(s, node) {
            if (s instanceof _set2.default) {
                s.add(node);
            }
        }

        /**
         * Load a BTree from JSON objects.
         * This method can be used to load a BTree from a JSON database.
         * @param {number} rootId The id of the root node.
         * @param {Map.<number,Object>} nodes A map mapping node ids to JSON objects.
         * @param {number} [order] The order of the tree the nodes will be added to.
         * This is required to be the same as when storing the tree.
         */
        static loadFromJSON(rootId, nodes, order) {
            const tree = new BTree(order);
            const root = Node.fromJSON(nodes.get(rootId));
            tree._root = root;
            const queue = [root];
            let maxId = 0;
            // Restore all nodes and pointers
            while (queue.length > 0) {
                const node = queue.shift();
                maxId = Math.max(node.id, maxId);

                if (node.isLeaf()) {
                    let tmp = nodes.get(prevLeaf);
                    node.prevLeaf = tmp ? Node.fromJSON(tmp) : null;
                    if (node.prevLeaf) {
                        queue.push(node.prevLeaf);
                    }
                    tmp = nodes.get(nextLeaf);
                    node.nextLeaf = tmp ? Node.fromJSON(tmp) : null;
                    if (node.nextLeaf) {
                        queue.push(node.nextLeaf);
                    }
                } else {
                    for (let i = 0; i < node.nodePointers.length; ++i) {
                        let tmp = nodes.get(node.nodePointers[i]);
                        tmp = tmp ? Node.fromJSON(tmp) : null;
                        if (tmp) {
                            queue.push(tmp);
                        }
                        node.nodePointers[i] = tmp;
                    }
                }
            }
            tree._nodeId = maxId + 1; // Needed for persistence
        }

        /**
         * Dumps the current state of the tree into a map mapping node ids to JSON objects.
         * This method can be used to store the state of the tree into a JSON key value store.
         * @param {Map.<number,Object>} nodes This should be a reference to an empty map.
         * @returns {number} root The id of the root node.
         */
        dump(nodes) {
            nodes.clear();
            const queue = [this._root];
            // Save all nodes and pointers
            while (queue.length > 0) {
                const node = queue.shift();

                nodes.set(node.id, node.toJSON());

                if (node.isLeaf()) {
                    if (node.prevLeaf) {
                        queue.push(node.prevLeaf);
                    }
                    if (node.nextLeaf) {
                        queue.push(node.nextLeaf);
                    }
                } else {
                    for (let i = 0; i < node.nodePointers.length; ++i) {
                        if (node.nodePointers[i]) {
                            queue.push(node.nodePointers[i]);
                        }
                    }
                }
            }
            return this._root.id;
        }
    }
    /**
     * Allows to specify the seek method of a BTree.
     * @enum {number}
     */
    BTree.NEAR_MODE = {
        NONE: 0,
        LE: 1,
        GE: 2
    };
    Class.register(BTree);

    /**
     * A TreeTransaction keeps track of the set of modified and removed nodes
     * during one or multiple operations on an underlying BTree.
     * @implements {IBTree}
     */
    class TreeTransaction {
        /**
         * Create a TreeTransaction from a BTree.
         * @param {BTree} tree The underlying BTree.
         */
        constructor(tree) {
            this._tree = tree;

            // We potentially need to keep track of modifications to persist them.
            // To ensure consistency, the caller needs to collect modifications over multiple calls synchronously.
            // Hence, the observer pattern is not applicable here, and we keep modifications in the state if requested.
            this._modified = new _set2.default();
            this._removed = new _set2.default();
        }

        /**
         * This method allows to merge the set of modified and removed nodes
         * from two TreeTransactions.
         * @param {TreeTransaction} treeTx The other TreeTransaction to be merged.
         */
        merge(treeTx) {
            if (!(treeTx instanceof TreeTransaction)) {
                return;
            }
            this._removed = this._removed.union(treeTx.removed);
            this._modified = this._modified.union(treeTx.modified).difference(this._removed);
        }

        /**
         * The set of modified nodes during the transaction.
         * @type {Set.<Node>}
         */
        get modified() {
            return this._modified;
        }

        /**
         * The set of removed nodes during the transaction.
         * @type {Set.<Node>}
         */
        get removed() {
            return this._removed;
        }

        /**
         * The root node of the underlying tree.
         * @type {Node}
         */
        get root() {
            return this._tree._root;
        }

        /**
         * The total number of records.
         * Note that if the record is a list/set of records, these are not counted.
         * @type {number}
         */
        get length() {
            return this._tree.length;
        }

        /**
         * The current key as returned by any operation.
         * It is null if there is no matching record.
         * @type {*}
         */
        get currentKey() {
            return this._tree.currentKey;
        }

        /**
         * The current record as returned by any operation.
         * It is null if there is no matching record.
         * This getter also adds the node to the set of modified nodes
         * as we cannot keep track whether something will be modified.
         * @type {*}
         */
        get currentRecord() {
            // Potentially untracked modification.
            this._modified.add(this._tree.currentLeaf);
            return this._tree.currentRecord;
        }

        /**
         * Inserts a new key-record pair into the BTree, if there is no entry for that key.
         * The current record and current key are set to the new entry in case of success
         * or the existing entry if present.
         * @param {*} key The unique key for the record.
         * @param {*} rec The record associated with the key.
         * @returns {boolean} True if the record was inserted, false if there was already a record with that key.
         */
        insert(key, rec) {
            return this._tree.insert(key, rec, this._modified);
        }

        /**
         * Removes a key-record pair from the BTree.
         * In case of successful deletion, the current record and key will be set to the next entry greater or equal.
         * If no record was found, they will be reset to null.
         * @param {*} key The unique key for the record.
         * @returns {boolean} True if the record was deleted, false if there is no such record.
         */
        remove(key) {
            return this._tree.remove(key, this._modified, this._removed);
        }

        /**
         * Searches the tree for a specific key and advances the current key/record pointers if found.
         * By default only an exact key match is found, but the near parameter also allows to advance to the next entry
         * greater/less or equal than the specified key.
         * @param {*} key The key to look for.
         * @param {BTree.NEAR_MODE} [near] Optional parameter, specifies to look for a key k' =/≤/≥ key.
         * @returns {boolean} True if such a key was found, false otherwise.
         */
        seek(key, near = BTree.NEAR_MODE.NONE) {
            return this._tree.seek(key, near);
        }

        /**
         * Advances the current key/record pointers by a given number of steps.
         * Default is advancing by 1, which means the next record (the new key will thus be the next larger key).
         * -1 means the previous record (the new key will thus be the next smaller key).
         * @param {number} [cnt] The number of records to advance (may be negative).
         * @returns {boolean} True if there is a record to advance to, false otherwise.
         */
        skip(cnt = 1) {
            return this._tree.skip(cnt);
        }

        /**
         * Jumps to the cnt entry starting from the smallest key (i.e., leftmost leaf, first entry) if cnt > 0.
         * If cnt < 0, it jumps to the cnt entry starting from the largest key (i.e., rightmost leaf, last entry).
         * @param {number} [cnt] The record to jump to (may be negative).
         * @returns {boolean} True if there is a record to jump to, false otherwise.
         */
        goto(cnt) {
            return this._tree.goto(cnt);
        }

        /**
         * Returns the index of the current entry (key/record) in a sorted list of all entries.
         * For the B+ Tree, this is done by traversing the leafs from the leftmost leaf, first entry
         * until the respective key is found.
         * @returns {number} The entry position.
         */
        keynum() {
            return this._tree.keynum();
        }

        /**
         * Jumps to the smallest key's entry (i.e., leftmost leaf, first entry).
         * False will only be returned if the tree is completely empty.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goTop() {
            return this._tree.goTop();
        }

        /**
         * Jumps to the largest key's entry (i.e., rightmost leaf, last entry).
         * False will only be returned if the tree is completely empty.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goBottom() {
            return this._tree.goBottom();
        }

        /**
         * Rebuilds/balances the whole tree.
         * Inserting and deleting keys into a tree will result
         * in some leaves and nodes having the minimum number of keys allowed.
         * This routine will ensure that each leaf and node has as many keys as possible,
         * resulting in a denser, flatter tree.
         * False is only returned if the tree is completely empty.
         * @returns {boolean} True if the tree is not completely empty.
         */
        pack() {
            return this._tree.pack();
        }

        /**
         * Advances to the smallest key k', such that either k' > lower (if lowerOpen) or k' ≥ lower (if !lowerOpen).
         * If lower is undefined, jump to the smallest key's entry.
         * @param {*} lower A lower bound on the key or undefined.
         * @param {boolean} [lowerOpen] Whether lower may be included or not.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goToLowerBound(lower, lowerOpen = false) {
            return this._tree.goToLowerBound(lower, lowerOpen);
        }

        /**
         * Advances to the largest key k', such that either k' < upper (if upperOpen) or k' ≤ upper (if !upperOpen).
         * If upper is undefined, jump to the largest key's entry.
         * @param {*} upper An upper bound on the key or undefined.
         * @param {boolean} [upperOpen] Whether upper may be included or not.
         * @returns {boolean} True if there is such an entry, false otherwise.
         */
        goToUpperBound(upper, upperOpen = false) {
            return this._tree.goToUpperBound(upper, upperOpen);
        }
    }
    Class.register(TreeTransaction);

    /**
     * An implementation of a LRU (least recently used) map.
     * This is a map that contains a maximum of k entries,
     * where k is specified in the constructor.
     * When the maximal number of entries is reached,
     * it will evict the least recently used entry.
     * This behaviour is useful for caches.
     * @template K The keys' type.
     * @template V The values' type.
     */
    class LRUMap {
        /**
         * Instantiate a LRU map of maximum size maxSize.
         * @param {number} maxSize The maximum size of the map.
         */
        constructor(maxSize) {
            this._maxSize = maxSize;
            /** @type {Map.<K,V>} */
            this._map = new _map2.default();
            /** @type {Map.<K,number>} */
            this._numAccesses = new _map2.default();
            /** @type {Array.<K>} */
            this._accessQueue = [];
        }

        /**
         * The current size of the map.
         * @type {number}
         */
        get size() {
            return this._map.size;
        }

        /**
         * Clears the map.
         */
        clear() {
            this._numAccesses.clear();
            this._accessQueue = [];
            return this._map.clear();
        }

        /**
         * Deletes a key from the map.
         * @param {K} key The key to delete.
         * @returns {boolean} Whether an entry was deleted.
         */
        delete(key) {
            return this._map.delete(key);
        }

        /**
         * Returns an iterator over key value pairs [k, v].
         * @returns {Iterator.<Array>}
         */
        entries() {
            return this._map.entries();
        }

        /**
         * Execute a given function for each key value pair in the map.
         * @param {function(key:K, value:V):*} callback The function to be called.
         * @param {*} [thisArg] This value will be used as this when executing the function.
         */
        forEach(callback, thisArg) {
            return this._map.forEach(callback, thisArg);
        }

        /**
         * Return the corresponding value to a specified key.
         * @param {K} key The key to look for.
         * @returns {V} The value the key maps to (or undefined if not present).
         */
        get(key) {
            this.access(key);
            return this._map.get(key);
        }

        /**
         * Returns true if the specified key is to be found in the map.
         * @param {K} key The key to look for.
         * @returns {boolean} True, if the key is in the map, false otherwise.
         */
        has(key) {
            return this._map.has(key);
        }

        /**
         * Returns an iterator over the keys of the map.
         * @returns {Iterator.<K>}
         */
        keys() {
            return this._map.keys();
        }

        /**
         * Evicts the k least recently used entries from the map.
         * @param {number} [k] The number of entries to evict (default is 1).
         */
        evict(k = 1) {
            while (k > 0 && this._accessQueue.length > 0) {
                const oldest = this._accessQueue.shift();
                let accesses = this._numAccesses.get(oldest);
                --accesses;
                this._numAccesses.set(oldest, accesses);
                // Check if not used in the meanwhile.
                if (accesses !== 0) {
                    continue;
                }
                // Otherwise delete that.
                this._numAccesses.delete(oldest);
                // If it was not present however, we need to search further.
                if (!this.delete(oldest)) {
                    continue;
                }
                --k;
            }
        }

        /**
         * Marks a key as accessed.
         * This implicitly makes the key the most recently used key.
         * @param {K} key The key to mark as accessed.
         */
        access(key) {
            if (!this._map.has(key)) {
                return;
            }
            let accesses = 0;
            if (this._numAccesses.has(key)) {
                accesses = this._numAccesses.get(key);
            }
            ++accesses;
            this._numAccesses.set(key, accesses);
            this._accessQueue.push(key);
        }

        /**
         * Inserts or replaces a key's value into the map.
         * If the maxSize of the map is exceeded, the least recently used key is evicted first.
         * Inserting a key implicitly accesses it.
         * @param {K} key The key to set.
         * @param {V} value The associated value.
         */
        set(key, value) {
            if (this.size >= this._maxSize) {
                this.evict();
            }
            this._map.set(key, value);
            this.access(key);
        }

        /**
         * Returns an iterator over the values of the map.
         * @returns {Iterator.<V>}
         */
        values() {
            return this._map.values();
        }

        /**
         * Returns an iterator over key value pairs [k, v].
         * @returns {Iterator.<Array>}
         */
        [_iterator2.default]() {
            return this._map.entries();
        }
    }
    Class.register(LRUMap);

    /**
     * Utils that are related to common JavaScript objects.
     */
    class ObjectUtils {
        /**
         * This method returns the value of an object at a given path.
         * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
         * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
         * { 'a': { 'b': 'key' } }
         * @param {Object} obj The JS object to access.
         * @param {string|Array.<string>} path The key path to access.
         * @returns {*} The value at the given path or undefined if the path does not exist..
         */
        static byKeyPath(obj, path) {
            if (!Array.isArray(path)) {
                return obj[path];
            }
            let tmp = obj;
            for (const component of path) {
                if (tmp === undefined) {
                    return undefined;
                }
                tmp = tmp[component];
            }
            return tmp;
        }
    }
    Class.register(ObjectUtils);

    /**
     * A class, which inherits from Observable, can notify interested parties
     * on occurrence of specified events.
     */
    class Observable {
        /**
         * A special event matching every other event.
         * @type {string}
         * @constant
         */
        static get WILDCARD() {
            return '*';
        }

        constructor() {
            /** @type {Map.<string, Array.<Function>>} */
            this._listeners = new _map2.default();
        }

        /**
         * Registers a handler for a given event.
         * @param {string} type The event to observe.
         * @param {Function} callback The handler to be called on occurrence of the event.
         * @return {number} The handle for this handler. Can be used to unregister it again.
         */
        on(type, callback) {
            if (!this._listeners.has(type)) {
                this._listeners.set(type, [callback]);
                return 0;
            } else {
                return this._listeners.get(type).push(callback) - 1;
            }
        }

        /**
         * Unregisters a handler for a given event.
         * @param {string} type The event to unregister from.
         * @param {number} id The handle received upon calling the on function.
         */
        off(type, id) {
            if (!this._listeners.has(type) || !this._listeners.get(type)[id]) return;
            delete this._listeners.get(type)[id];
        }

        /**
         * Fires an event and notifies all observers.
         * @param {string} type The type of event.
         * @param {...*} args Arguments to pass to the observers.
         */
        fire(type, ...args) {
            // Notify listeners for this event type.
            if (this._listeners.has(type)) {
                for (const i in this._listeners.get(type)) {
                    const listener = this._listeners.get(type)[i];
                    listener.apply(null, args);
                }
            }

            // Notify wildcard listeners. Pass event type as first argument
            if (this._listeners.has(Observable.WILDCARD)) {
                for (const i in this._listeners.get(Observable.WILDCARD)) {
                    const listener = this._listeners.get(Observable.WILDCARD)[i];
                    listener.apply(null, arguments);
                }
            }
        }

        /**
         * Registers handlers on another observable, bubbling its events up to the own observers.
         * @param {Observable} observable The observable, whose events should bubble up.
         * @param {...string} types The events to bubble up.
         */
        bubble(observable, ...types) {
            for (const type of types) {
                let callback;
                if (type == Observable.WILDCARD) {
                    callback = function () {
                        this.fire.apply(this, arguments);
                    };
                } else {
                    callback = function () {
                        this.fire.apply(this, [type, ...arguments]);
                    };
                }
                observable.on(type, callback.bind(this));
            }
        }
    }
    Class.register(Observable);

    /**
     * Calculates the union of two sets.
     * Method of Set.
     * @memberOf Set
     * @param {Set} setB The second set.
     * @returns {Set} The union of this set and the second set.
     */
    _set2.default.prototype.union = function (setB) {
        const union = new _set2.default(this);
        for (const elem of setB) {
            union.add(elem);
        }
        return union;
    };

    /**
     * Calculates the intersection of two sets.
     * Method of Set.
     * @memberOf Set
     * @param {Set} setB The second set.
     * @returns {Set} The intersection of this set and the second set.
     */
    _set2.default.prototype.intersection = function (setB) {
        const intersection = new _set2.default();
        for (const elem of setB) {
            if (this.has(elem)) {
                intersection.add(elem);
            }
        }
        return intersection;
    };

    /**
     * Calculates the difference of two sets.
     * Method of Set.
     * @memberOf Set
     * @param {Set} setB The second set.
     * @returns {Set} The difference of this set and the second set.
     */
    _set2.default.prototype.difference = function (setB) {
        const difference = new _set2.default(this);
        for (const elem of setB) {
            difference.delete(elem);
        }
        return difference;
    };

    /**
     * Checks whether two sets are equal to each other.
     * Method of Set.
     * @memberOf Set
     * @param {Set} setB The second set.
     * @returns {boolean} True if they contain the same elements, false otherwise.
     */
    _set2.default.prototype.equals = function (setB) {
        if (this.size !== setB.size) return false;
        for (const elem of setB) {
            if (!this.has(elem)) {
                return false;
            }
        }
        return true;
    };

    /**
     * Creates a Set from single values and iterables.
     * If arg is not iterable, it creates a new Set with arg as its single member.
     * If arg is iterable, it iterates over arg and puts all items into the Set.
     * Static method of Set.
     * @memberOf Set
     * @param {*} arg The argument to create the Set from.
     * @returns {Set} The resulting Set.
     */
    Set.from = function (arg) {
        // Check if iterable and not string.
        if (arg && typeof arg[_iterator2.default] === 'function' && typeof arg !== 'string') {
            return new _set2.default(arg);
        }
        return new _set2.default([arg]);
    };

    class Synchronizer extends Observable {
        constructor() {
            super();
            this._queue = [];
            this._working = false;
        }

        /**
         * Push function to the Synchronizer for later, synchronous execution
         * @template T
         * @param {function():T} fn Function to be invoked later by this Synchronizer
         * @returns {Promise.<T>}
         */
        push(fn) {
            return new _promise2.default((resolve, error) => {
                this._queue.push({ fn: fn, resolve: resolve, error: error });
                if (!this._working) {
                    this._doWork();
                }
            });
        }

        _doWork() {
            var _this26 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                _this26._working = true;
                _this26.fire('work-start', _this26);

                while (_this26._queue.length) {
                    const job = _this26._queue.shift();
                    try {
                        const result = yield job.fn();
                        job.resolve(result);
                    } catch (e) {
                        if (job.error) job.error(e);
                    }
                }

                _this26._working = false;
                _this26.fire('work-end', _this26);
            })();
        }

        /** @type {boolean} */
        get working() {
            return this._working;
        }
    }
    Class.register(Synchronizer);

    /**
     * This is an intermediate layer caching the results of a backend.
     * While simple get/put queries make use of the cache,
     * more advanced queries will be forwarded to the backend.
     * @implements {IObjectStore}
     */
    class CachedBackend {
        /**
         * Creates a new instance of the cached layer using the specified backend.
         * @param {IObjectStore} backend The backend to use.
         */
        constructor(backend) {
            this._backend = backend;
            /** @type {Map.<string,*>} */
            this._cache = new LRUMap(CachedBackend.MAX_CACHE_SIZE);
        }

        /**
         * A map of index names to indices as defined by the underlying backend.
         * The index names can be used to access an index.
         * @type {Map.<string,IIndex>}
         */
        get indices() {
            return this._backend.indices;
        }

        /**
         * A helper method to retrieve the values corresponding to a set of keys.
         * @param {Set.<string>} keys The set of keys to get the corresponding values for.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of values.
         * @protected
         */
        _retrieveValues(keys, decoder = undefined) {
            var _this27 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const valuePromises = [];
                for (const key of keys) {
                    valuePromises.push(_this27.get(key, decoder));
                }
                return _promise2.default.all(valuePromises);
            })();
        }

        /**
         * Internal method called to decode a single value.
         * @param {*} value Value to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
         */
        decode(value, decoder = undefined) {
            return this._backend.decode(value, decoder);
        }

        /**
         * Internal method called to decode multiple values.
         * @param {Array.<*>} values Values to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
         */
        decodeArray(values, decoder = undefined) {
            return this._backend.decodeArray(values, decoder);
        }

        /**
         * Returns a promise of the object stored under the given primary key.
         * If the item is in the cache, the cached value will be returned.
         * Otherwise, the value will be fetched from the backend object store..
         * Resolves to undefined if the key is not present in the object store.
         * @param {string} key The primary key to look for.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
         */
        get(key, decoder = undefined) {
            var _this28 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (_this28._cache.has(key)) {
                    return _this28.decode(_this28._cache.get(key), decoder);
                }
                const value = yield _this28._backend.get(key, null);
                _this28._cache.set(key, value);
                return _this28.decode(value, decoder);
            })();
        }

        /**
         * Inserts or replaces a key-value pair.
         * Stores the new key-value pair in both the cache and the backend.
         * @param {string} key The primary key to associate the value with.
         * @param {*} value The value to write.
         * @returns {Promise} The promise resolves after writing to the current object store finished.
         */
        put(key, value) {
            this._cache.set(key, value);
            return this._backend.put(key, value);
        }

        /**
         * Removes the key-value pair of the given key from the cache and the backend.
         * @param {string} key The primary key to delete along with the associated object.
         * @returns {Promise} The promise resolves after writing to the current object store finished.
         */
        remove(key) {
            this._cache.delete(key);
            return this._backend.remove(key);
        }

        /**
         * Returns a promise of a set of keys fulfilling the given query by querying the backend.
         * If the optional query is not given, it returns all keys in the object store.
         * If the query is of type KeyRange, it returns all keys of the object store being within this range.
         * If the query is of type Query, it returns all keys fulfilling the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
         */
        keys(query = null) {
            return this._backend.keys(query);
        }

        /**
         * Returns a promise of an array of objects whose primary keys fulfill the given query by relying on the backend.
         * If the optional query is not given, it returns all objects in the object store.
         * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
         * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
         */
        values(query = null, decoder = undefined) {
            var _this29 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this29.keys(query);
                return _this29._retrieveValues(keys, decoder);
            })();
        }

        /**
         * Returns a promise of the object whose primary key is maximal for the given range.
         * If the optional query is not given, it returns the object whose key is maximal.
         * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        maxValue(query = null, decoder = undefined) {
            var _this30 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const key = yield _this30.maxKey(query);
                return _this30.get(key, decoder);
            })();
        }

        /**
         * Returns a promise of the key being maximal for the given range.
         * If the optional query is not given, it returns the maximal key.
         * If the query is of type KeyRange, it returns the key being maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        maxKey(query = null) {
            return this._backend.maxKey(query);
        }

        /**
         * Returns a promise of the key being minimal for the given range.
         * If the optional query is not given, it returns the minimal key.
         * If the query is of type KeyRange, it returns the key being minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        minKey(query = null) {
            return this._backend.minKey(query);
        }

        /**
         * Returns a promise of the object whose primary key is minimal for the given range.
         * If the optional query is not given, it returns the object whose key is minimal.
         * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        minValue(query = null, decoder = undefined) {
            var _this31 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const key = yield _this31.minKey(query);
                return _this31.get(key, decoder);
            })();
        }

        /**
         * Returns the count of entries in the given range.
         * If the optional query is not given, it returns the count of entries in the object store.
         * If the query is of type KeyRange, it returns the count of entries within the given range.
         * @param {KeyRange} [query]
         * @returns {Promise.<number>}
         */
        count(query = null) {
            return this._backend.count(query);
        }

        /**
         * Unsupported operation for a cached backend.
         * @param {Transaction} [tx]
         * @returns {Promise.<boolean>}
         */
        commit(tx) {
            return (0, _asyncToGenerator3.default)(function* () {
                throw 'Unsupported operation';
            })();
        }

        /**
         * Unsupported operation for a cached backend.
         * @param {Transaction} [tx]
         */
        abort(tx) {
            return (0, _asyncToGenerator3.default)(function* () {
                throw 'Unsupported operation';
            })();
        }

        /**
         * Internally applies a transaction to the cache's and backend's state.
         * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
         * or no changes are applied.
         * @param {Transaction} tx The transaction to apply.
         * @returns {Promise} The promise resolves after applying the transaction.
         * @protected
         */
        _apply(tx) {
            // Update local state and push to backend for batch transaction.
            if (tx._truncated) {
                this._cache.clear();
            }
            for (const key of tx._removed) {
                this._cache.delete(key);
            }
            for (const [key, value] of tx._modified) {
                this._cache.set(key, value);
            }
            return this._backend._apply(tx);
        }

        /**
         * Empties the object store.
         * @returns {Promise} The promise resolves after emptying the object store.
         */
        truncate() {
            var _this32 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                _this32._cache.clear();
                return _this32._backend.truncate();
            })();
        }

        /**
         * Returns the index of the given name.
         * If the index does not exist, it returns undefined.
         * @param {string} indexName The name of the requested index.
         * @returns {IIndex} The index associated with the given name.
         */
        index(indexName) {
            return this._backend.index(indexName);
        }

        /**
         * Creates a new secondary index on the object store.
         * Currently, all secondary indices are non-unique.
         * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
         * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
         * { 'a': { 'b': 'key' } }
         * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
         * be used to find this entry.
         * If a new object does not possess the key path associated with that index, it is simply ignored.
         *
         * This function may only be called before the database is connected.
         * Moreover, it is only executed on database version updates or on first creation.
         * @param {string} indexName The name of the index.
         * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
         * @param {boolean} [multiEntry]
         */
        createIndex(indexName, keyPath, multiEntry = false) {
            return this._backend.createIndex(indexName, keyPath, multiEntry);
        }

        /**
         * Deletes a secondary index from the object store.
         * @param indexName
         * @returns {Promise} The promise resolves after deleting the index.
         */
        deleteIndex(indexName) {
            return this._backend.deleteIndex(indexName);
        }

        /**
         * Closes the object store and potential connections.
         * @returns {Promise} The promise resolves after closing the object store.
         */
        close() {
            return this._backend.close();
        }
    }
    /** @type {number} Maximum number of cached elements. */
    CachedBackend.MAX_CACHE_SIZE = 5000 /*elements*/;
    Class.register(CachedBackend);

    /**
     * This is a BTree based index, which is generally stored in memory.
     * It is used by transactions.
     * @implements IIndex
     */
    class InMemoryIndex {
        /**
         * Creates a new InMemoryIndex for a given object store.
         * The key path describes the path of the secondary key within the stored objects.
         * Only objects for which the key path exists are part of the secondary index.
         *
         * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
         * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
         * { 'a': { 'b': 'key' } }
         *
         * If a secondary index is a multi entry index, and the value at the key path is iterable,
         * every item of the iterable value will be associated with the object.
         * @param {IObjectStore} objectStore The underlying object store to use.
         * @param {string|Array.<string>} [keyPath] The key path of the indexed attribute.
         * If the keyPath is not given, this is a primary index.
         * @param {boolean} [multiEntry] Whether the indexed attribute is considered to be iterable or not.
         * @param {boolean} [unique] Whether there is a unique constraint on the attribute.
         */
        constructor(objectStore, keyPath, multiEntry = false, unique = false) {
            this._objectStore = objectStore;
            this._keyPath = keyPath;
            this._multiEntry = multiEntry;
            this._unique = unique;
            this._tree = new BTree();
        }

        /**
         * Reinitialises the index.
         * @returns {Promise} The promise resolves after emptying the index.
         */
        truncate() {
            var _this33 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                _this33._tree = new BTree();
            })();
        }

        /**
         * Helper method to return the attribute associated with the key path if it exists.
         * @param {string} key The primary key of the key-value pair.
         * @param {*} obj The value of the key-value pair.
         * @returns {*} The attribute associated with the key path, if it exists, and undefined otherwise.
         * @private
         */
        _indexKey(key, obj) {
            if (this.keyPath) {
                if (obj === undefined) return undefined;
                return ObjectUtils.byKeyPath(obj, this.keyPath);
            }
            return key;
        }

        /**
         * The key path associated with this index.
         * A key path is defined by a key within the object or alternatively a path through the object to a specific subkey.
         * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
         * { 'a': { 'b': 'key' } }
         * If the keyPath is undefined, this index uses the primary key of the key-value store.
         * @type {string|Array.<string>}
         */
        get keyPath() {
            return this._keyPath;
        }

        /**
         * This value determines whether the index supports multiple secondary keys per entry.
         * If so, the value at the key path is considered to be an iterable.
         * @type {boolean}
         */
        get multiEntry() {
            return this._multiEntry;
        }

        /**
         * A helper method to insert a primary-secondary key pair into the tree.
         * @param {string} key The primary key.
         * @param {*} iKey The indexed key.
         * @param {IBTree} [tree] The optional tree in which to insert the pair.
         * @throws if the uniqueness constraint is violated.
         */
        _insert(key, iKey, tree) {
            tree = tree || this._tree;
            if (!this._multiEntry || !Array.isArray(iKey)) {
                iKey = [iKey];
            }
            // Add all keys.
            for (const component of iKey) {
                if (tree.seek(component)) {
                    if (this._unique) {
                        throw `Uniqueness constraint violated for key ${key} on path ${this._keyPath}`;
                    }
                    tree.currentRecord.add(key);
                } else {
                    tree.insert(component, this._unique ? key : _set2.default.from(key));
                }
            }
        }

        /**
         * Inserts a new key-value pair into the index.
         * For replacing an existing pair, the old value has to be passed as well.
         * @param {string} key The primary key of the pair.
         * @param {*} value The value of the pair. The indexed key will be extracted from this.
         * @param {*} [oldValue] The old value associated with the primary key.
         * @returns {TreeTransaction} The TreeTransaction that was needed to insert/replace the key-value pair.
         */
        put(key, value, oldValue) {
            const treeTx = this._tree.transaction();
            const oldIKey = this._indexKey(key, oldValue);
            const newIKey = this._indexKey(key, value);

            if (oldIKey !== undefined) {
                this._remove(key, oldIKey, treeTx);
            }
            this._insert(key, newIKey, treeTx);
            return treeTx;
        }

        /**
         * Removes a key-value pair from the index.
         * @param {string} key The primary key of the pair.
         * @param {*} oldValue The old value of the pair. The indexed key will be extracted from this.
         * @returns {TreeTransaction} The TreeTransaction that was needed to remove the key-value pair.
         */
        remove(key, oldValue) {
            const treeTx = this._tree.transaction();
            if (oldValue !== undefined) {
                const iKey = this._indexKey(key, oldValue);
                this._remove(key, iKey, treeTx);
            }
            return treeTx;
        }

        /**
         * A helper method to remove a primary-secondary key pair from the tree.
         * @param {string} key The primary key.
         * @param {*} iKey The indexed key.
         * @param {IBTree} [tree] The optional tree in which to insert the pair.
         */
        _remove(key, iKey, tree) {
            tree = tree || this._tree;
            if (!this._multiEntry || !Array.isArray(iKey)) {
                iKey = [iKey];
            }
            // Remove all keys.
            for (const component of iKey) {
                if (tree.seek(component)) {
                    if (!this._unique && tree.currentRecord.size > 1) {
                        tree.currentRecord.delete(key);
                    } else {
                        tree.remove(component);
                    }
                }
            }
        }

        /**
         * A helper method to retrieve the values corresponding to a set of keys.
         * @param {Set.<string>} keys The set of keys to get the corresponding values for.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of values.
         * @protected
         */
        _retrieveValues(keys, decoder = undefined) {
            var _this34 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const valuePromises = [];
                for (const key of keys) {
                    valuePromises.push(_this34._objectStore.get(key, decoder));
                }
                return _promise2.default.all(valuePromises);
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary keys fulfill the given query.
         * If the optional query is not given, it returns all objects in the index.
         * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
         * @param {KeyRange} [query] Optional query to check secondary keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
         */
        values(query = null, decoder = undefined) {
            var _this35 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this35.keys(query);
                return _this35._retrieveValues(keys, decoder);
            })();
        }

        /**
         * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
         * If the optional query is not given, it returns all primary keys in the index.
         * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
         * @param {KeyRange} [query] Optional query to check the secondary keys against.
         * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
         */
        keys(query = null) {
            var _this36 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                let resultSet = new _set2.default();

                // Shortcut for exact match.
                if (query instanceof KeyRange && query.exactMatch) {
                    if (_this36._tree.seek(query.lower)) {
                        resultSet = _set2.default.from(_this36._tree.currentRecord);
                    }
                    return resultSet;
                }

                // Find lower bound and start from there.
                if (!(query instanceof KeyRange)) {
                    _this36._tree.goTop();
                } else {
                    if (!_this36._tree.goToLowerBound(query.lower, query.lowerOpen)) {
                        return resultSet; // empty
                    }
                }

                while (!(query instanceof KeyRange) || query.includes(_this36._tree.currentKey)) {
                    resultSet = resultSet.union(_set2.default.from(_this36._tree.currentRecord));
                    _this36._tree.skip();
                }
                return resultSet;
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary key is maximal for the given range.
         * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
         * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
         */
        maxValues(query = null, decoder = undefined) {
            var _this37 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this37.maxKeys(query);
                return _this37._retrieveValues(keys, decoder);
            })();
        }

        /**
         * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
         * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
         * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
         */
        maxKeys(query = null) {
            var _this38 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const isRange = query instanceof KeyRange;
                if (!_this38._tree.goToUpperBound(isRange ? query.upper : undefined, isRange ? query.upperOpen : false)) {
                    return new _set2.default();
                }
                return _set2.default.from(_this38._tree.currentRecord);
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary key is minimal for the given range.
         * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
         * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
         */
        minValues(query = null, decoder = undefined) {
            var _this39 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this39.minKeys(query);
                return _this39._retrieveValues(keys, decoder);
            })();
        }

        /**
         * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
         * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
         * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
         */
        minKeys(query = null) {
            var _this40 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const isRange = query instanceof KeyRange;
                if (!_this40._tree.goToLowerBound(isRange ? query.lower : undefined, isRange ? query.lowerOpen : false)) {
                    return new _set2.default();
                }
                return _set2.default.from(_this40._tree.currentRecord);
            })();
        }

        /**
         * Returns the count of entries, whose secondary key is in the given range.
         * If the optional query is not given, it returns the count of entries in the index.
         * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
         * @param {KeyRange} [query]
         * @returns {Promise.<number>}
         */
        count(query = null) {
            var _this41 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                return (yield _this41.keys(query)).size;
                // The code below does only work for unique indices.
                // if (!(query instanceof KeyRange)) {
                //     return this._tree.length;
                // }
                // if (!this._tree.goToLowerBound(query.lower, query.lowerOpen)) {
                //     return 0;
                // }
                // const start = this._tree.keynum();
                // if (!this._tree.goToUpperBound(query.upper, query.upperOpen)) {
                //     return 0;
                // }
                // const end = this._tree.keynum();
                // return end - start + 1;
            })();
        }
    }
    Class.register(InMemoryIndex);

    /**
     * This class represents range queries on an index (primary and secondary).
     */
    class KeyRange {
        /**
         * This constructor is only used internally.
         * See static methods for constructing a KeyRange object.
         * @param {*} lower
         * @param {*} upper
         * @param {boolean} lowerOpen
         * @param {boolean} upperOpen
         * @private
         */
        constructor(lower, upper, lowerOpen, upperOpen) {
            this._lower = lower;
            this._upper = upper;
            this._lowerOpen = lowerOpen;
            this._upperOpen = upperOpen;
        }

        /** @type {*} The lower bound of the range. */
        get lower() {
            return this._lower;
        }

        /** @type {*} The upper bound of the range. */
        get upper() {
            return this._upper;
        }

        /** @type {boolean} Whether the lower bound is NOT part of the range. */
        get lowerOpen() {
            return this._lowerOpen;
        }

        /** @type {boolean} Whether the upper bound is NOT part of the range. */
        get upperOpen() {
            return this._upperOpen;
        }

        /** @type {boolean} Whether it is a query for an exact match. */
        get exactMatch() {
            return this._lower === this._upper && !this._lowerOpen && !this.upperOpen;
        }

        /**
         * Returns true if the given key is included in this range.
         * @param {*} key The key to test for.
         * @returns {boolean} True, if the key is included in the range and false otherwise.
         */
        includes(key) {
            return (this._lower === undefined || this._lower < key || !this._lowerOpen && this._lower === key) && (this._upper === undefined || this._upper > key || !this._upperOpen && this._upper === key);
        }

        /**
         * If upperOpen is false, all keys ≤ upper,
         * all keys < upper otherwise.
         * @param {*} upper The upper bound.
         * @param {boolean} upperOpen Whether the upper bound is NOT part of the range.
         * @returns {KeyRange} The corresponding KeyRange object.
         */
        static upperBound(upper, upperOpen = false) {
            return new KeyRange(undefined, upper, false, upperOpen);
        }

        /**
         * If lowerOpen is false, all keys ≥ lower,
         * all keys > lower otherwise.
         * @param {*} lower The lower bound.
         * @param {boolean} lowerOpen Whether the lower bound is NOT part of the range.
         * @returns {KeyRange} The corresponding KeyRange object.
         */
        static lowerBound(lower, lowerOpen = false) {
            return new KeyRange(lower, undefined, lowerOpen, false);
        }

        /**
         * A range bounded by both a lower and upper bound.
         * lowerOpen and upperOpen decide upon whether < (open) or ≤ (inclusive) comparisons
         * should be used for comparison.
         * @param {*} lower The lower bound.
         * @param {*} upper The upper bound.
         * @param {boolean} lowerOpen Whether the lower bound is NOT part of the range.
         * @param {boolean} upperOpen Whether the upper bound is NOT part of the range.
         * @returns {KeyRange} The corresponding KeyRange object.
         */
        static bound(lower, upper, lowerOpen = false, upperOpen = false) {
            return new KeyRange(lower, upper, lowerOpen, upperOpen);
        }

        /**
         * A range matching only exactly one value.
         * @param {*} value The value to match.
         * @returns {KeyRange} The corresponding KeyRange object.
         */
        static only(value) {
            return new KeyRange(value, value, false, false);
        }
    }
    Class.register(KeyRange);

    /**
     * This is the main implementation of an object store.
     * It uses a specified backend (which itself implements the very same interface)
     * and builds upon this backend to answer queries.
     * The main task of this object store is to manage transactions
     * and ensure read isolation on these transactions.
     * @implements {IObjectStore}
     */
    class ObjectStore {
        /**
         * Creates a new object store based on a backend and an underlying database.
         * The database is only used to determine the connection status.
         * @param {IObjectStore} backend The backend underlying this object store.
         * @param {{connected:boolean}} db The database underlying the backend.
         */
        constructor(backend, db) {
            this._backend = backend;
            this._db = db;
            /** @type {Array.<Transaction>} */
            this._stateStack = [];
            /**
             * Maps transactions to their base states.
             * @type {Map.<number|string,number>}
             */
            this._txBaseStates = new _map2.default();
            /**
             * Counter for number of open transactions for base states.
             * @type {Object}
             */
            this._openTransactions = (0, _create2.default)(null);
            /**
             * Set of base states already committed to.
             * @type {Set.<number|string>}
             */
            this._closedBaseStates = new _set2.default();
        }

        /** @type {IObjectStore} */
        get _currentState() {
            return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1] : this._backend;
        }

        /** @type {number|string} */
        get _currentStateId() {
            return this._stateStack.length > 0 ? this._stateStack[this._stateStack.length - 1].id : 'backend';
        }

        /**
         * A map of index names to indices.
         * The index names can be used to access an index.
         * @type {Map.<string,IIndex>}
         */
        get indices() {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.indices;
        }

        /**
         * Returns a promise of the object stored under the given primary key.
         * Resolves to undefined if the key is not present in the object store.
         * @param {string} key The primary key to look for.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
         */
        get(key, decoder = undefined) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.get(key, decoder);
        }

        /**
         * Inserts or replaces a key-value pair.
         * Implicitly creates a transaction for this operation and commits it.
         * @param {string} key The primary key to associate the value with.
         * @param {*} value The value to write.
         * @returns {Promise.<boolean>} A promise of the success outcome.
         */
        put(key, value) {
            var _this42 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (!_this42._db.connected) throw 'JungleDB is not connected';
                const tx = _this42.transaction();
                yield tx.put(key, value);
                return tx.commit();
            })();
        }

        /**
         * Removes the key-value pair of the given key from the object store.
         * Implicitly creates a transaction for this operation and commits it.
         * @param {string} key The primary key to delete along with the associated object.
         * @returns {Promise.<boolean>} A promise of the success outcome.
         */
        remove(key) {
            var _this43 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (!_this43._db.connected) throw 'JungleDB is not connected';
                const tx = _this43.transaction();
                yield tx.remove(key);
                return tx.commit();
            })();
        }

        /**
         * Returns a promise of a set of keys fulfilling the given query.
         * If the optional query is not given, it returns all keys in the object store.
         * If the query is of type KeyRange, it returns all keys of the object store being within this range.
         * If the query is of type Query, it returns all keys fulfilling the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
         */
        keys(query = null) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            if (query !== null && query instanceof Query) {
                return query.keys(this._currentState);
            }
            return this._currentState.keys(query);
        }

        /**
         * Returns a promise of an array of objects whose primary keys fulfill the given query.
         * If the optional query is not given, it returns all objects in the object store.
         * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
         * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
         */
        values(query = null, decoder = undefined) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            if (query !== null && query instanceof Query) {
                return query.values(this._currentState, decoder);
            }
            return this._currentState.values(query, decoder);
        }

        /**
         * Returns a promise of the object whose primary key is maximal for the given range.
         * If the optional query is not given, it returns the object whose key is maximal.
         * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        maxValue(query = null, decoder = undefined) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.maxValue(query, decoder);
        }

        /**
         * Returns a promise of the key being maximal for the given range.
         * If the optional query is not given, it returns the maximal key.
         * If the query is of type KeyRange, it returns the key being maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        maxKey(query = null) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.maxKey(query);
        }

        /**
         * Returns a promise of the key being minimal for the given range.
         * If the optional query is not given, it returns the minimal key.
         * If the query is of type KeyRange, it returns the key being minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        minKey(query = null) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.minKey(query);
        }

        /**
         * Returns a promise of the object whose primary key is minimal for the given range.
         * If the optional query is not given, it returns the object whose key is minimal.
         * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        minValue(query = null, decoder = undefined) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.minValue(query, decoder);
        }

        /**
         * Returns the count of entries in the given range.
         * If the optional query is not given, it returns the count of entries in the object store.
         * If the query is of type KeyRange, it returns the count of entries within the given range.
         * @param {KeyRange} [query]
         * @returns {Promise.<number>}
         */
        count(query = null) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.count(query);
        }

        /**
         * This method is only used by transactions internally to commit themselves to the corresponding object store.
         * Thus, the tx argument is non-optional.
         * A call to this method checks whether the given transaction can be applied and pushes it to
         * the stack of applied transactions. When there is no other transaction requiring to enforce
         * read isolation, the state will be flattened and all transactions will be applied to the backend.
         * @param {Transaction} tx The transaction to be applied.
         * @returns {Promise.<boolean>} A promise of the success outcome.
         * @protected
         */
        commit(tx) {
            var _this44 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (!_this44._db.connected) throw 'JungleDB is not connected';
                if (!(tx instanceof Transaction) || tx.state !== Transaction.STATE.OPEN || !_this44._txBaseStates.has(tx.id)) {
                    throw 'Can only commit open transactions';
                }
                const baseState = _this44._txBaseStates.get(tx.id);

                // Another transaction was already committed.
                if (_this44._closedBaseStates.has(baseState)) {
                    yield _this44.abort(tx);
                    return false;
                }

                const numOpenTransactions = --_this44._openTransactions[baseState];

                // If this is the last transaction, we push our changes to the underlying layer.
                if (numOpenTransactions === 0) {
                    // The underlying layer *has to be* the last one in our stack.
                    yield _this44._flattenState(tx);
                } else {
                    // Otherwise, create new layer on stack.
                    if (_this44._stateStack.length >= ObjectStore.MAX_STACK_SIZE) {
                        throw 'Transaction stack size exceeded';
                    }
                    _this44._stateStack.push(tx);
                    _this44._openTransactions[tx.id] = 0;
                    _this44._closedBaseStates.add(baseState);
                }
                return true;
            })();
        }

        /**
         * This method is only used by transactions internally to abort themselves at the corresponding object store.
         * Thus, the tx argument is non-optional.
         * @param {Transaction} tx The transaction to be aborted.
         * @returns {Promise.<boolean>} A promise of the success outcome.
         * @protected
         */
        abort(tx) {
            var _this45 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (!_this45._db.connected) throw 'JungleDB is not connected';
                if (!(tx instanceof Transaction) || tx.state !== Transaction.STATE.OPEN || !_this45._txBaseStates.has(tx.id)) {
                    throw 'Can only abort open transactions';
                }
                const baseState = _this45._txBaseStates.get(tx.id);

                const numOpenTransactions = --_this45._openTransactions[baseState];
                _this45._txBaseStates.delete(tx.id);

                if (numOpenTransactions === 0) {
                    yield _this45._flattenState();
                }
                return true;
            })();
        }

        /**
         * This internal method applies a transaction to the current state
         * and tries flattening the stack of transactions.
         * @param {Transaction} [tx] An optional transaction to apply to the current state.
         * @private
         */
        _flattenState(tx) {
            var _this46 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // If there is a tx argument, merge it with the current state.
                if (tx && tx instanceof Transaction) {
                    // TODO maybe get around calling a private method here
                    yield _this46._currentState._apply(tx);
                }
                // Try collapsing the states as far as possible.
                if (_this46._openTransactions[_this46._currentState.id] > 0) {
                    // The current state has open transactions,
                    // no way to flatten state here.
                    return;
                }
                // Start flattening at the end.
                while (_this46._stateStack.length > 0) {
                    const currentState = _this46._currentState;
                    const baseState = _this46._txBaseStates.get(currentState.id);
                    // Check whether it is collapsible, if no stop here.
                    if (_this46._openTransactions[baseState] > 0) {
                        break;
                    }
                    _this46._txBaseStates.delete(currentState.id);
                    _this46._stateStack.pop(); // Remove the current state from the stack.
                    yield _this46._currentState._apply(currentState); // And apply it to the underlying layer.
                }
            })();
        }

        /**
         * Returns the index of the given name.
         * If the index does not exist, it returns undefined.
         * @param {string} indexName The name of the requested index.
         * @returns {IIndex} The index associated with the given name.
         */
        index(indexName) {
            if (!this._db.connected) throw 'JungleDB is not connected';
            return this._currentState.index(indexName);
        }

        /**
         * Creates a new secondary index on the object store.
         * Currently, all secondary indices are non-unique.
         * They are defined by a key within the object or alternatively a path through the object to a specific subkey.
         * For example, ['a', 'b'] could be used to use 'key' as the key in the following object:
         * { 'a': { 'b': 'key' } }
         * Secondary indices may be multiEntry, i.e., if the keyPath resolves to an iterable object, each item within can
         * be used to find this entry.
         * If a new object does not possess the key path associated with that index, it is simply ignored.
         *
         * This function may only be called before the database is connected.
         * Moreover, it is only executed on database version updates or on first creation.
         * @param {string} indexName The name of the index.
         * @param {string|Array.<string>} [keyPath] The path to the key within the object. May be an array for multiple levels.
         * @param {boolean} [multiEntry]
         */
        createIndex(indexName, keyPath, multiEntry = false) {
            return this._backend.createIndex(indexName, keyPath, multiEntry);
        }

        /**
         * Deletes a secondary index from the object store.
         * @param indexName
         * @returns {Promise} The promise resolves after deleting the index.
         */
        deleteIndex(indexName) {
            return this._backend.deleteIndex(indexName);
        }

        /**
         * Creates a new transaction, ensuring read isolation
         * on the most recently successfully commited state.
         * @returns {Transaction} The transaction object.
         */
        transaction() {
            if (!this._db.connected) throw 'JungleDB is not connected';
            const tx = new Transaction(this._currentState, this);
            this._txBaseStates.set(tx.id, this._currentStateId);
            this._openTransactions[this._currentStateId] = this._openTransactions[this._currentStateId] ? this._openTransactions[this._currentStateId] + 1 : 1;
            return tx;
        }

        /**
         * An object store is strongly connected to a backend.
         * Hence, it does not store anything by itself and the _apply method is not supported.
         * @param {Transaction} tx
         * @returns {Promise.<boolean>}
         * @protected
         */
        _apply(tx) {
            return (0, _asyncToGenerator3.default)(function* () {
                throw 'Unsupported operation';
            })();
        }

        /**
         * Empties the object store.
         * @returns {Promise} The promise resolves after emptying the object store.
         */
        truncate() {
            var _this47 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (!_this47._db.connected) throw 'JungleDB is not connected';
                const tx = _this47.transaction();
                yield tx.truncate();
                return tx.commit();
            })();
        }

        /**
         * Closes the object store and potential connections.
         * @returns {Promise} The promise resolves after closing the object store.
         */
        close() {
            // TODO perhaps use a different strategy here
            if (this._stateStack.length > 0) {
                throw 'Cannot close database while transactions are active';
            }
            return this._backend.close();
        }

        /**
         * Internal method called to decode a single value.
         * @param {*} value Value to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
         */
        decode(value, decoder = undefined) {
            return this._backend.decode(value, decoder);
        }

        /**
         * Internal method called to decode multiple values.
         * @param {Array.<*>} values Values to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
         */
        decodeArray(values, decoder = undefined) {
            return this._backend.decodeArray(values, decoder);
        }
    }
    /** @type {number} The maximum number of states to stack. */
    ObjectStore.MAX_STACK_SIZE = 10;
    Class.register(ObjectStore);

    /**
     * This class represents a Query object.
     * Queries are constructed using the static helper methods.
     */
    class Query {
        /**
         * Internal helper method that translates an operation to a KeyRange object.
         * @param {Query.OPERATORS} op The operator of the query.
         * @param {*} value The first operand of the query.
         * @param {*} [value2] The optional second operand of the query.
         * @private
         */
        static _parseKeyRange(op, value, value2) {
            switch (op) {
                case Query.OPERATORS.GT:
                    return KeyRange.lowerBound(value, true);
                case Query.OPERATORS.GE:
                    return KeyRange.lowerBound(value, false);
                case Query.OPERATORS.LT:
                    return KeyRange.upperBound(value, true);
                case Query.OPERATORS.LE:
                    return KeyRange.upperBound(value, false);
                case Query.OPERATORS.EQ:
                    return KeyRange.only(value);
                case Query.OPERATORS.BETWEEN:
                    return KeyRange.bound(value, value2, true, true);
                case Query.OPERATORS.WITHIN:
                    return KeyRange.bound(value, value2, false, false);
            }
            throw 'Unknown operator';
        }

        /**
         * Returns the conjunction of multiple queries.
         * @param {...Query} var_args The list of queries, which all have to be fulfilled.
         * @returns {Query} The conjunction of the queries.
         */
        static and(var_args) {
            const args = (0, _from2.default)(arguments);
            return new Query(args, Query.OPERATORS.AND);
        }

        /**
         * Returns the disjunction of multiple queries.
         * @param {...Query} var_args The list of queries, out of which at least one has to be fulfilled.
         * @returns {Query} The disjunction of the queries.
         */
        static or(var_args) {
            const args = (0, _from2.default)(arguments);
            return new Query(args, Query.OPERATORS.OR);
        }

        /**
         * Returns a query for the max key of an index.
         * @param {string} indexName The name of the index, whose maximal key the query matches.
         * @returns {Query} The query for the max key of the index.
         */
        static max(indexName) {
            return new Query(indexName, Query.OPERATORS.MAX);
        }

        /**
         * Returns a query for the min key of an index.
         * @param {string} indexName The name of the index, whose minimal key the query matches.
         * @returns {Query} The query for the min key of the index.
         */
        static min(indexName) {
            return new Query(indexName, Query.OPERATORS.MIN);
        }

        /**
         * Returns a query that matches all keys of an index that are less than a value.
         * The query matches all keys k, such that k < val.
         * @param {string} indexName The name of the index.
         * @param {*} val The upper bound of the query.
         * @returns {Query} The resulting query object.
         */
        static lt(indexName, val) {
            return new Query(indexName, Query.OPERATORS.LT, val);
        }

        /**
         * Returns a query that matches all keys of an index that are less or equal than a value.
         * The query matches all keys k, such that k ≤ val.
         * @param {string} indexName The name of the index.
         * @param {*} val The upper bound of the query.
         * @returns {Query} The resulting query object.
         */
        static le(indexName, val) {
            return new Query(indexName, Query.OPERATORS.LE, val);
        }

        /**
         * Returns a query that matches all keys of an index that are greater than a value.
         * The query matches all keys k, such that k > val.
         * @param {string} indexName The name of the index.
         * @param {*} val The lower bound of the query.
         * @returns {Query} The resulting query object.
         */
        static gt(indexName, val) {
            return new Query(indexName, Query.OPERATORS.GT, val);
        }

        /**
         * Returns a query that matches all keys of an index that are greater or equal than a value.
         * The query matches all keys k, such that k ≥ val.
         * @param {string} indexName The name of the index.
         * @param {*} val The lower bound of the query.
         * @returns {Query} The resulting query object.
         */
        static ge(indexName, val) {
            return new Query(indexName, Query.OPERATORS.GE, val);
        }

        /**
         * Returns a query that matches all keys of an index that equal to a value.
         * The query matches all keys k, such that k = val.
         * @param {string} indexName The name of the index.
         * @param {*} val The value to look for.
         * @returns {Query} The resulting query object.
         */
        static eq(indexName, val) {
            return new Query(indexName, Query.OPERATORS.EQ, val);
        }

        /**
         * Returns a query that matches all keys of an index that are between two values, excluding the boundaries.
         * The query matches all keys k, such that lower < k < upper.
         * @param {string} indexName The name of the index.
         * @param {*} lower The lower bound.
         * @param {*} upper The upper bound.
         * @returns {Query} The resulting query object.
         */
        static between(indexName, lower, upper) {
            return new Query(indexName, Query.OPERATORS.BETWEEN, lower, upper);
        }

        /**
         * Returns a query that matches all keys of an index that are between two values, including the boundaries.
         * The query matches all keys k, such that lower ≤ k ≤ upper.
         * @param {string} indexName The name of the index.
         * @param {*} lower The lower bound.
         * @param {*} upper The upper bound.
         * @returns {Query} The resulting query object.
         */
        static within(indexName, lower, upper) {
            return new Query(indexName, Query.OPERATORS.WITHIN, lower, upper);
        }

        /**
         * Internal constructor for a query.
         * Should not be called directly.
         * @param {string|Array.<Query>} arg Either a list of queries or an index name (depending on the operator).
         * @param {Query.OPERATORS} op The operator to apply.
         * @param {*} [value] The first operand if applicable.
         * @param {*} [value2] The second operand if applicable.
         * @private
         */
        constructor(arg, op, value, value2) {
            // If first argument is an array of queries, this is a combined query.
            if (Array.isArray(arg)) {
                if (arg.some(it => !(it instanceof Query))) {
                    throw 'Invalid query';
                }
                if (Query.COMBINED_OPERATORS.indexOf(op) < 0) {
                    throw 'Unknown operator';
                }
                this._queryType = Query.Type.COMBINED;
                this._queries = arg;
                this._op = op;
            }
            // Otherwise we have a single query.
            else {
                    if (Query.RANGE_OPERATORS.indexOf(op) >= 0) {
                        this._queryType = Query.Type.RANGE;
                        this._keyRange = Query._parseKeyRange(op, value, value2);
                    } else if (Query.ADVANCED_OPERATORS.indexOf(op) >= 0) {
                        this._queryType = Query.Type.ADVANCED;
                        this._op = op;
                    } else {
                        throw 'Unknown operator';
                    }
                    this._indexName = arg;
                }
        }

        /**
         * Returns a promise of an array of objects fulfilling this query.
         * @param {IObjectStore} objectStore The object store to execute the query on.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to this query.
         */
        values(objectStore, decoder = undefined) {
            var _this48 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this48._execute(objectStore);
                const resultPromises = [];
                for (const key of keys) {
                    resultPromises.push(objectStore.get(key, decoder));
                }
                return _promise2.default.all(resultPromises);
            })();
        }

        /**
         * Returns a promise of a set of keys fulfilling this query.
         * @param {IObjectStore} objectStore The object store to execute the query on.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
         */
        keys(objectStore) {
            return this._execute(objectStore);
        }

        /**
         * Internal method to execute a query on an object store.
         * @param {IObjectStore} objectStore The object store to execute the query on.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
         * @private
         */
        _execute(objectStore) {
            var _this49 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                switch (_this49._queryType) {
                    case Query.Type.COMBINED:
                        return _promise2.default.resolve(_this49._executeCombined(objectStore));

                    case Query.Type.ADVANCED:
                        return _promise2.default.resolve(_this49._executeAdvanced(objectStore));

                    case Query.Type.RANGE:
                        return _this49._executeRange(objectStore);
                }
                return _promise2.default.resolve(new _set2.default());
            })();
        }

        /**
         * Internal method for and/or operators.
         * @param {IObjectStore} objectStore The object store to execute the query on.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
         * @private
         */
        _executeCombined(objectStore) {
            var _this50 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Evaluate children.
                const resultPromises = [];
                for (const query of _this50._queries) {
                    resultPromises.push(query._execute(objectStore));
                }
                const results = yield _promise2.default.all(resultPromises);

                if (_this50._op === Query.OPERATORS.AND) {
                    // Provide shortcuts.
                    if (results.length === 0) {
                        return new _set2.default();
                    } else if (results.length === 1) {
                        return results[0];
                    }

                    // Set intersection of all keys.
                    const firstResult = results.shift();
                    const intersection = new _set2.default();
                    for (const val of firstResult) {
                        if (results.every(function (result) {
                            return result.has(val);
                        })) {
                            intersection.add(val);
                        }
                    }
                    return intersection;
                } else if (_this50._op === Query.OPERATORS.OR) {
                    // Set union of all keys.
                    const union = new _set2.default();
                    for (const result of results) {
                        result.forEach(function (val) {
                            return union.add(val);
                        });
                    }
                    return union;
                }
                return new _set2.default();
            })();
        }

        /**
         * Internal method for min/max operators.
         * @param {IObjectStore} objectStore The object store to execute the query on.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
         * @private
         */
        _executeAdvanced(objectStore) {
            var _this51 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const index = objectStore.index(_this51._indexName);
                let results = new _set2.default();
                switch (_this51._op) {
                    case Query.OPERATORS.MAX:
                        results = yield index.maxKeys();
                        break;
                    case Query.OPERATORS.MIN:
                        results = yield index.minKeys();
                        break;
                }
                return new _set2.default(results);
            })();
        }

        /**
         * Internal method for range operators.
         * @param {IObjectStore} objectStore The object store to execute the query on.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to this query.
         * @private
         */
        _executeRange(objectStore) {
            var _this52 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const index = objectStore.index(_this52._indexName);
                return new _set2.default((yield index.keys(_this52._keyRange)));
            })();
        }
    }
    /**
     * Enum for supported operators.
     * @enum {number}
     */
    Query.OPERATORS = {
        GT: 0,
        GE: 1,
        LT: 2,
        LE: 3,
        EQ: 4,
        // NEQ: 5, not supported
        BETWEEN: 7,
        WITHIN: 8,
        MAX: 9,
        MIN: 10,
        AND: 11,
        OR: 12
    };
    Query.RANGE_OPERATORS = [Query.OPERATORS.GT, Query.OPERATORS.GE, Query.OPERATORS.LT, Query.OPERATORS.LE, Query.OPERATORS.EQ, Query.OPERATORS.BETWEEN, Query.OPERATORS.WITHIN];
    Query.ADVANCED_OPERATORS = [Query.OPERATORS.MAX, Query.OPERATORS.MIN];
    Query.COMBINED_OPERATORS = [Query.OPERATORS.AND, Query.OPERATORS.OR];
    /**
     * Enum for query types.
     * Each operator belongs to one of these types as specified above.
     * @enum {number}
     */
    Query.Type = {
        RANGE: 0,
        ADVANCED: 1,
        COMBINED: 2
    };
    Class.register(Query);

    /**
     * This class constitutes an InMemoryIndex for Transactions.
     * It unifies the results of keys changed during the transaction
     * with the underlying backend.
     */
    class TransactionIndex extends InMemoryIndex {
        /**
         * Derives the indices from the backend and returns a new map of transactions.
         * @param {Transaction} objectStore The transaction the index should be based on.
         * @param {IObjectStore} backend The backend underlying the transaction.
         * @returns {Map.<string,TransactionIndex>} A map containing all indices for the transaction.
         */
        static derive(objectStore, backend) {
            const indices = new _map2.default();
            for (const [name, index] of backend.indices) {
                indices.set(name, new TransactionIndex(objectStore, backend, name, index.keyPath, index.multiEntry));
            }
            return indices;
        }

        /** @type {IIndex} The index of the underlying backend. */
        get _index() {
            return this._backend.index(this._databaseDir);
        }

        /**
         * Constructs a new TransactionIndex serving the transaction's changes
         * and unifying the results with the underlying backend.
         * @param {Transaction} objectStore The transaction the index should be based on.
         * @param {IObjectStore} backend The backend underlying the transaction.
         * @param {string|Array.<string>} keyPath The key path of the indexed attribute.
         * @param {boolean} multiEntry Whether the indexed attribute is considered to be iterable or not.
         * @protected
         */
        constructor(objectStore, backend, name, keyPath, multiEntry = false) {
            super(objectStore, keyPath, multiEntry);
            this._backend = backend;
            this._databaseDir = name;
        }

        /**
         * Returns a promise of a set of primary keys, whose associated objects' secondary keys are in the given range.
         * If the optional query is not given, it returns all primary keys in the index.
         * If the query is of type KeyRange, it returns all primary keys for which the secondary key is within this range.
         * @param {KeyRange} [query] Optional query to check the secondary keys against.
         * @returns {Promise.<Set.<string>>} A promise of the set of primary keys relevant to the query.
         */
        keys(query = null) {
            var _this53 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const promises = [];
                promises.push(_this53._index.keys(query));
                promises.push(InMemoryIndex.prototype.keys.call(_this53, query));
                let [keys, newKeys] = yield _promise2.default.all(promises);
                // Remove keys that have been deleted or modified.
                keys = keys.difference(_this53._objectStore._removed);
                keys = keys.difference(_this53._objectStore._modified.keys());
                return keys.union(newKeys);
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary keys fulfill the given query.
         * If the optional query is not given, it returns all objects in the index.
         * If the query is of type KeyRange, it returns all objects whose secondary keys are within this range.
         * @param {KeyRange} [query] Optional query to check secondary keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
         */
        values(query = null, decoder = undefined) {
            var _this54 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this54.keys(query);
                return super._retrieveValues(keys, decoder);
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary key is maximal for the given range.
         * If the optional query is not given, it returns the objects whose secondary key is maximal within the index.
         * If the query is of type KeyRange, it returns the objects whose secondary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
         */
        maxValues(query = null, decoder = undefined) {
            var _this55 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this55.maxKeys(query);
                return super._retrieveValues(keys, decoder);
            })();
        }

        /**
         * Returns an element of a set.
         * @template T
         * @param {Set.<T>} s The set to return an element from.
         * @returns {T} An element of the set.
         * @private
         */
        static _sampleElement(s) {
            return s.size > 0 ? s.values().next().value : undefined;
        }

        /**
         * Returns a promise of a set of primary keys, whose associated secondary keys are maximal for the given range.
         * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is maximal within the index.
         * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
         */
        maxKeys(query = null) {
            var _this56 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                let backendKeys = yield _this56._index.maxKeys(query);

                // Remove keys that have been deleted or modified.
                let sampleElement = TransactionIndex._sampleElement(backendKeys);
                const value = yield _this56._backend.get(sampleElement, null);
                let maxIKey = sampleElement ? ObjectUtils.byKeyPath(value, _this56.keyPath) : undefined;
                backendKeys = backendKeys.difference(_this56._objectStore._removed);
                backendKeys = backendKeys.difference(_this56._objectStore._modified.keys());

                while (sampleElement !== undefined && backendKeys.size === 0) {
                    const tmpQuery = KeyRange.upperBound(maxIKey, true);
                    backendKeys = yield _this56._index.maxKeys(tmpQuery);

                    // Remove keys that have been deleted or modified.
                    sampleElement = TransactionIndex._sampleElement(backendKeys);
                    const value = yield _this56._backend.get(sampleElement, null);
                    maxIKey = sampleElement ? ObjectUtils.byKeyPath(value, _this56.keyPath) : undefined;
                    backendKeys = backendKeys.difference(_this56._objectStore._removed);
                    backendKeys = backendKeys.difference(_this56._objectStore._modified.keys());

                    // If we get out of the range, stop here.
                    if (maxIKey && query !== null && !query.includes(maxIKey)) {
                        backendKeys = new _set2.default();
                        break;
                    }
                }

                const newKeys = yield InMemoryIndex.prototype.maxKeys.call(_this56, query);

                if (backendKeys.size === 0) {
                    return newKeys;
                } else if (newKeys.size === 0) {
                    return backendKeys;
                }

                // Both contain elements, check which one is larger.
                const valueTx = yield _this56._objectStore.get(TransactionIndex._sampleElement(newKeys), null);

                const iKeyBackend = maxIKey;
                const iKeyTx = ObjectUtils.byKeyPath(valueTx, _this56.keyPath);

                if (iKeyBackend > iKeyTx) {
                    return backendKeys;
                } else if (iKeyBackend < iKeyTx) {
                    return newKeys;
                }
                return backendKeys.union(newKeys);
            })();
        }

        /**
         * Returns a promise of an array of objects whose secondary key is minimal for the given range.
         * If the optional query is not given, it returns the objects whose secondary key is minimal within the index.
         * If the query is of type KeyRange, it returns the objects whose secondary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of array of objects relevant to the query.
         */
        minValues(query = null, decoder = undefined) {
            var _this57 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const keys = yield _this57.minKeys(query);
                return super._retrieveValues(keys, decoder);
            })();
        }

        /**
         * Returns a promise of a set of primary keys, whose associated secondary keys are minimal for the given range.
         * If the optional query is not given, it returns the set of primary keys, whose associated secondary key is minimal within the index.
         * If the query is of type KeyRange, it returns the set of primary keys, whose associated secondary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<*>>} A promise of the key relevant to the query.
         */
        minKeys(query = null) {
            var _this58 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                let backendKeys = yield _this58._index.minKeys(query);

                // Remove keys that have been deleted or modified.
                let sampleElement = TransactionIndex._sampleElement(backendKeys);
                const value = yield _this58._backend.get(sampleElement, null);
                let minIKey = sampleElement ? ObjectUtils.byKeyPath(value, _this58.keyPath) : undefined;
                backendKeys = backendKeys.difference(_this58._objectStore._removed);
                backendKeys = backendKeys.difference(_this58._objectStore._modified.keys());

                while (sampleElement !== undefined && backendKeys.size === 0) {
                    const tmpQuery = KeyRange.lowerBound(minIKey, true);
                    backendKeys = yield _this58._index.minKeys(tmpQuery);

                    // Remove keys that have been deleted or modified.
                    sampleElement = TransactionIndex._sampleElement(backendKeys);
                    const value = yield _this58._backend.get(sampleElement, null);
                    minIKey = sampleElement ? ObjectUtils.byKeyPath(value, _this58.keyPath) : undefined;
                    backendKeys = backendKeys.difference(_this58._objectStore._removed);
                    backendKeys = backendKeys.difference(_this58._objectStore._modified.keys());

                    // If we get out of the range, stop here.
                    if (minIKey && query !== null && !query.includes(minIKey)) {
                        backendKeys = new _set2.default();
                        break;
                    }
                }

                const newKeys = yield InMemoryIndex.prototype.minKeys.call(_this58, query);

                if (backendKeys.size === 0) {
                    return newKeys;
                } else if (newKeys.size === 0) {
                    return backendKeys;
                }

                // Both contain elements, check which one is larger.
                const valueTx = yield _this58._objectStore.get(TransactionIndex._sampleElement(newKeys), null);

                const iKeyBackend = minIKey;
                const iKeyTx = ObjectUtils.byKeyPath(valueTx, _this58.keyPath);

                if (iKeyBackend < iKeyTx) {
                    return backendKeys;
                } else if (iKeyBackend > iKeyTx) {
                    return newKeys;
                }
                return backendKeys.union(newKeys);
            })();
        }

        /**
         * Returns the count of entries, whose secondary key is in the given range.
         * If the optional query is not given, it returns the count of entries in the index.
         * If the query is of type KeyRange, it returns the count of entries, whose secondary key is within the given range.
         * @param {KeyRange} [query]
         * @returns {Promise.<number>}
         */
        count(query = null) {
            var _this59 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Unfortunately, we cannot do better than getting keys + counting.
                return (yield _this59.keys(query)).size;
            })();
        }
    }
    Class.register(TransactionIndex);

    /**
     * Transactions are created by calling the transaction method on an ObjectStore object.
     * Transactions ensure read-isolation.
     * On a given state, only *one* transaction can be committed successfully.
     * Other transactions based on the same state will end up in a conflicted state if committed.
     * Transactions opened after the successful commit of another transaction will be based on the
     * new state and hence can be committed again.
     * @implements {IObjectStore}
     */
    class Transaction {
        /**
         * This constructor should only be called by an ObjectStore object.
         * Our transactions have a watchdog enabled by default,
         * aborting them after a certain time specified by WATCHDOG_TIMER.
         * This helps to detect unclosed transactions preventing to store the state in
         * the persistent backend.
         * @param {IObjectStore} backend The backend on which the transaction is based,
         * i.e., another transaction or the real database.
         * @param {IObjectStore} [commitBackend] The object store managing the transactions,
         * i.e., the ObjectStore object.
         * @param {boolean} [enableWatchdog] If this is is set to true (default),
         * transactions will be automatically aborted if left open for longer than WATCHDOG_TIMER.
         * @protected
         */
        constructor(backend, commitBackend, enableWatchdog = true) {
            this._id = Transaction._instanceCount++;
            this._backend = backend;
            this._commitBackend = commitBackend || backend;
            this._modified = new _map2.default();
            this._removed = new _set2.default();
            this._originalValues = new _map2.default();
            this._truncated = false;
            this._indices = TransactionIndex.derive(this, backend);

            this._state = Transaction.STATE.OPEN;

            this._enableWatchdog = enableWatchdog;
            if (this._enableWatchdog) {
                this._watchdog = setTimeout(() => {
                    this.abort();
                    throw 'Watchdog timer aborted transaction';
                }, Transaction.WATCHDOG_TIMER);
            }
        }

        /** @type {number} A unique transaction id. */
        get id() {
            return this._id;
        }

        /**
         * A map of index names to indices.
         * The index names can be used to access an index.
         * @type {Map.<string,IIndex>}
         */
        get indices() {
            return this._indices;
        }

        /**
         * The transaction's current state.
         * @returns {Transaction.STATE}
         */
        get state() {
            return this._state;
        }

        /**
         * Internally applies a transaction to the transaction's state.
         * This needs to be done in batch (as a db level transaction), i.e., either the full state is updated
         * or no changes are applied.
         * @param {Transaction} tx The transaction to apply.
         * @returns {Promise} The promise resolves after applying the transaction.
         * @protected
         */
        _apply(tx) {
            var _this60 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (!(tx instanceof Transaction)) {
                    throw 'Can only apply transactions';
                }
                if (tx._truncated) {
                    yield _this60.truncate();
                }
                for (const [key, value] of tx._modified) {
                    // If this transaction has key in its originalValues, we use it.
                    // Otherwise, the original value has to coincide with the transaction's stored original value.
                    let oldValue;
                    if (_this60._originalValues.has(key)) {
                        oldValue = _this60._originalValues.get(key);
                    } else {
                        oldValue = tx._originalValues.get(key);
                        _this60._originalValues.set(key, oldValue);
                    }

                    _this60._put(key, value, oldValue);
                }
                for (const key of tx._removed) {
                    // If this transaction has key in its originalValues, we use it.
                    // Otherwise, the original value has to coincide with the transaction's stored original value.
                    let oldValue;
                    if (_this60._originalValues.has(key)) {
                        oldValue = _this60._originalValues.get(key);
                    } else {
                        oldValue = tx._originalValues.get(key);
                        _this60._originalValues.set(key, oldValue);
                    }

                    _this60._remove(key, oldValue);
                }
            })();
        }

        /**
         * Empties the object store.
         * @returns {Promise} The promise resolves after emptying the object store.
         */
        truncate() {
            var _this61 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                _this61._truncated = true;
                _this61._modified.clear();
                _this61._removed.clear();
                _this61._originalValues.clear();

                // Update indices.
                for (const index of _this61._indices.values()) {
                    index.truncate();
                }
            })();
        }

        /**
         * Commits a transaction to the underlying backend.
         * The state is only written to the persistent backend if no other transaction is open.
         * If the commit was successful, new transactions will always be based on the new state.
         * There are two outcomes for a commit:
         * If there was no other transaction committed that was based on the same state,
         * it will be successful and change the transaction's state to COMMITTED (returning true).
         * Otherwise, the state will be CONFLICTED and the method will return false.
         * @param {Transaction} [tx] The transaction to be applied, only used internally.
         * @returns {Promise.<boolean>} A promise of the success outcome.
         */
        commit(tx) {
            var _this62 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Transaction is given, forward to backend.
                if (tx !== undefined) {
                    // Make sure transaction can be based on this state.
                    if (_this62._state !== Transaction.STATE.COMMITTED) {
                        throw 'Transaction is based on invalid state';
                    }
                    return _this62._commitBackend.commit(tx);
                }

                if (_this62._state !== Transaction.STATE.OPEN) {
                    throw 'Transaction already closed';
                }
                if (_this62._enableWatchdog) {
                    clearTimeout(_this62._watchdog);
                }
                if (yield _this62._commitBackend.commit(_this62)) {
                    _this62._state = Transaction.STATE.COMMITTED;
                    return true;
                } else {
                    _this62._state = Transaction.STATE.CONFLICTED;
                    return false;
                }
            })();
        }

        /**
         * Aborts a transaction and (if this was the last open transaction) potentially
         * persists the most recent, committed state.
         * @param {Transaction} [tx] The transaction to be applied, only used internally.
         * @returns {Promise.<boolean>} A promise of the success outcome.
         */
        abort(tx) {
            var _this63 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Transaction is given, forward to backend.
                if (tx !== undefined) {
                    // Make sure transaction can be based on this state.
                    if (_this63._state !== Transaction.STATE.COMMITTED) {
                        throw 'Transaction is based on invalid state';
                    }

                    yield _this63._commitBackend.abort(tx);
                }

                if (_this63._state !== Transaction.STATE.OPEN) {
                    throw 'Transaction already closed';
                }
                if (_this63._enableWatchdog) {
                    clearTimeout(_this63._watchdog);
                }
                yield _this63._commitBackend.abort(_this63);
                _this63._state = Transaction.STATE.ABORTED;
                return true;
            })();
        }

        /**
         * Internal method called to decode a single value.
         * @param {*} value Value to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {*} The decoded value, either by the object store's default or the overriding decoder if given.
         */
        decode(value, decoder = undefined) {
            // shortcut to the commit backend (we don't need to go through the transaction stack for this)
            return this._commitBackend.decode(value, decoder);
        }

        /**
         * Internal method called to decode multiple values.
         * @param {Array.<*>} values Values to be decoded.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Array.<*>} The decoded values, either by the object store's default or the overriding decoder if given.
         */
        decodeArray(values, decoder = undefined) {
            // shortcut to the commit backend (we don't need to go through the transaction stack for this)
            return this._commitBackend.decodeArray(values, decoder);
        }

        /**
         * Returns a promise of the object stored under the given primary key.
         * Resolves to undefined if the key is not present in the object store.
         * @param {string} key The primary key to look for.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object stored under the given key, or undefined if not present.
         */
        get(key, decoder = undefined) {
            var _this64 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Order is as follows:
                // 1. check if removed,
                // 2. check if modified,
                // 3. check if truncated
                // 4. request from backend
                if (_this64._removed.has(key)) {
                    return undefined;
                }
                if (_this64._modified.has(key)) {
                    return _this64.decode(_this64._modified.get(key), decoder);
                }
                if (_this64._truncated) {
                    return undefined;
                }
                return yield _this64._backend.get(key, decoder);
            })();
        }

        /**
         * Inserts or replaces a key-value pair.
         * @param {string} key The primary key to associate the value with.
         * @param {*} value The value to write.
         * @returns {Promise} The promise resolves after writing to the current object store finished.
         */
        put(key, value) {
            var _this65 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (_this65._state !== Transaction.STATE.OPEN) {
                    throw 'Transaction already closed';
                }

                const oldValue = yield _this65.get(key, null);

                // Save for indices.
                if (!_this65._originalValues.has(key)) {
                    _this65._originalValues.set(key, oldValue);
                }

                _this65._put(key, value, oldValue);
            })();
        }

        /**
         * Internal method for inserting/replacing a key-value pair.
         * @param {string} key The primary key to associate the value with.
         * @param {*} value The value to write.
         * @param {*} [oldValue] The old value associated with the key to update the indices (if applicable).
         * @private
         */
        _put(key, value, oldValue) {
            this._removed.delete(key);
            this._modified.set(key, value);

            // Update indices.
            for (const index of this._indices.values()) {
                index.put(key, value, oldValue);
            }
        }

        /**
         * Removes the key-value pair of the given key from the object store.
         * @param {string} key The primary key to delete along with the associated object.
         * @returns {Promise} The promise resolves after writing to the current object store finished.
         */
        remove(key) {
            var _this66 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (_this66._state !== Transaction.STATE.OPEN) {
                    throw 'Transaction already closed';
                }

                const oldValue = yield _this66.get(key, null);
                // Only remove if it exists.
                if (oldValue !== undefined) {
                    // Save for indices.
                    if (!_this66._originalValues.has(key)) {
                        _this66._originalValues.set(key, oldValue);
                    }

                    _this66._remove(key, oldValue);
                }
            })();
        }

        /**
         * Internal method for removing a key-value pair.
         * @param {string} key The primary key to delete along with the associated object.
         * @param {*} oldValue The old value associated with the key to update the indices.
         */
        _remove(key, oldValue) {
            this._removed.add(key);
            this._modified.delete(key);

            // Update indices.
            for (const index of this._indices.values()) {
                index.remove(key, oldValue);
            }
        }

        /**
         * Returns a promise of a set of keys fulfilling the given query.
         * If the optional query is not given, it returns all keys in the object store.
         * If the query is of type KeyRange, it returns all keys of the object store being within this range.
         * If the query is of type Query, it returns all keys fulfilling the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<Set.<string>>} A promise of the set of keys relevant to the query.
         */
        keys(query = null) {
            var _this67 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (query !== null && query instanceof Query) {
                    return query.keys(_this67);
                }
                let keys = new _set2.default();
                if (!_this67._truncated) {
                    keys = yield _this67._backend.keys(query);
                }
                keys = keys.difference(_this67._removed);
                for (const key of _this67._modified.keys()) {
                    if (query === null || query.includes(key)) {
                        keys.add(key);
                    }
                }
                return keys;
            })();
        }

        /**
         * Returns a promise of an array of objects whose primary keys fulfill the given query.
         * If the optional query is not given, it returns all objects in the object store.
         * If the query is of type KeyRange, it returns all objects whose primary keys are within this range.
         * If the query is of type Query, it returns all objects whose primary keys fulfill the query.
         * @param {Query|KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<Array.<*>>} A promise of the array of objects relevant to the query.
         */
        values(query = null, decoder = undefined) {
            var _this68 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                if (query !== null && query instanceof Query) {
                    return query.values(_this68);
                }
                const keys = yield _this68.keys(query);
                const valuePromises = [];
                for (const key of keys) {
                    valuePromises.push(_this68.get(key, decoder));
                }
                return _promise2.default.all(valuePromises);
            })();
        }

        /**
         * Returns a promise of the object whose primary key is maximal for the given range.
         * If the optional query is not given, it returns the object whose key is maximal.
         * If the query is of type KeyRange, it returns the object whose primary key is maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        maxValue(query = null, decoder = undefined) {
            var _this69 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const maxKey = yield _this69.maxKey(query);
                return _this69.get(maxKey, decoder);
            })();
        }

        /**
         * Returns a promise of the key being maximal for the given range.
         * If the optional query is not given, it returns the maximal key.
         * If the query is of type KeyRange, it returns the key being maximal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        maxKey(query = null) {
            var _this70 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Take underlying maxKey.
                let maxKey = undefined;
                if (!_this70._truncated) {
                    maxKey = yield _this70._backend.maxKey(query);
                }

                // If this key has been removed, find next best key.
                while (maxKey !== undefined && _this70._removed.has(maxKey)) {
                    const tmpQuery = KeyRange.upperBound(maxKey, true);
                    maxKey = yield _this70._backend.maxKey(tmpQuery);

                    // If we get out of the range, stop here.
                    if (query !== null && !query.includes(maxKey)) {
                        maxKey = undefined;
                        break;
                    }
                }

                for (const key of _this70._modified.keys()) {
                    // Find better maxKey in modified data.
                    if ((query === null || query.includes(key)) && (maxKey === undefined || key > maxKey)) {
                        maxKey = key;
                    }
                }
                return maxKey;
            })();
        }

        /**
         * Returns a promise of the object whose primary key is minimal for the given range.
         * If the optional query is not given, it returns the object whose key is minimal.
         * If the query is of type KeyRange, it returns the object whose primary key is minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @param {function(obj:*):*} [decoder] Optional decoder function overriding the object store's default (null is the identity decoder).
         * @returns {Promise.<*>} A promise of the object relevant to the query.
         */
        minValue(query = null, decoder = undefined) {
            var _this71 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                const minKey = yield _this71.minKey(query);
                return _this71.get(minKey, decoder);
            })();
        }

        /**
         * Returns a promise of the key being minimal for the given range.
         * If the optional query is not given, it returns the minimal key.
         * If the query is of type KeyRange, it returns the key being minimal for the given range.
         * @param {KeyRange} [query] Optional query to check keys against.
         * @returns {Promise.<string>} A promise of the key relevant to the query.
         */
        minKey(query = null) {
            var _this72 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Take underlying minKey.
                let minKey = undefined;
                if (!_this72._truncated) {
                    minKey = yield _this72._backend.minKey(query);
                }

                // If this key has been removed, find next best key.
                while (minKey !== undefined && _this72._removed.has(minKey)) {
                    const tmpQuery = KeyRange.lowerBound(minKey, true);
                    minKey = yield _this72._backend.minKey(tmpQuery);

                    // If we get out of the range, stop here.
                    if (query !== null && !query.includes(minKey)) {
                        minKey = undefined;
                        break;
                    }
                }

                for (const key of _this72._modified.keys()) {
                    // Find better maxKey in modified data.
                    if ((query === null || query.includes(key)) && (minKey === undefined || key < minKey)) {
                        minKey = key;
                    }
                }
                return minKey;
            })();
        }

        /**
         * Returns the count of entries in the given range.
         * If the optional query is not given, it returns the count of entries in the object store.
         * If the query is of type KeyRange, it returns the count of entries within the given range.
         * @param {KeyRange} [query]
         * @returns {Promise.<number>}
         */
        count(query = null) {
            var _this73 = this;

            return (0, _asyncToGenerator3.default)(function* () {
                // Unfortunately, we cannot do better than getting keys + counting.
                return (yield _this73.keys(query)).size;
            })();
        }

        /**
         * Returns the index of the given name.
         * If the index does not exist, it returns undefined.
         * @param {string} indexName The name of the requested index.
         * @returns {IIndex} The index associated with the given name.
         */
        index(indexName) {
            return this._indices.get(indexName);
        }

        /**
         * This method is not implemented for transactions.
         */
        createIndex() {
            return (0, _asyncToGenerator3.default)(function* () {
                throw 'Cannot create index in transaction';
            })();
        }

        /**
         * This method is not implemented for transactions.
         */
        deleteIndex() {
            return (0, _asyncToGenerator3.default)(function* () {
                throw 'Cannot delete index in transaction';
            })();
        }

        /**
         * Alias for abort.
         * @returns {Promise} The promise resolves after successful abortion of the transaction.
         */
        close() {
            return this.abort();
        }
    }
    /** @type {number} Milliseconds to wait until automatically aborting transaction. */
    Transaction.WATCHDOG_TIMER = 10000 /*ms*/;
    /**
     * The states of a transaction.
     * New transactions are in the state OPEN until they are aborted or committed.
     * Aborted transactions move to the state ABORTED.
     * Committed transactions move to the state COMMITTED,
     * if no other transaction has been applied to the same state.
     * Otherwise, they change their state to CONFLICTED.
     * @enum {number}
     */
    Transaction.STATE = {
        OPEN: 0,
        COMMITTED: 1,
        ABORTED: 2,
        CONFLICTED: 3
    };
    Transaction._instanceCount = 0;
    Class.register(Transaction);

    exports._loaded = true;
    if (typeof exports._onload === 'function') exports._onload();
    return exports;
})(JDB);
//# sourceMappingURL=web-babel.js.map
