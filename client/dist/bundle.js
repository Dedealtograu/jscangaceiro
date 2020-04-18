!function(e){var t={};function o(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);class a extends Error{constructor(e=""){super(e),this.name=this.constructor.name}}const n=a;function r(e){return function(e){return e instanceof n||Object.getPrototypeOf(e)instanceof n}(e)?e.message:(console.log(e),"Não foi possível realizar a operação.")}class s{static create(e,t,o){return new Proxy(e,{get:(e,a,n)=>s._ehFuncao(e[a])&&t.includes(a)?function(){console.log(`"${a}" disparou a armadilha`),e[a].apply(e,arguments),o(e)}:e[a],set(e,a,n,r){const s=Reflect.set(e,a,n);return t.includes(a)&&o(e),s}})}static _ehFuncao(e){return typeof e==typeof Function}}class i{constructor(e,t,...o){const a=s.create(e,o,e=>{t.update(e)});return t.update(e),a}}const c=["negociacoes"];let u=null,l=null;class d{constructor(){throw new Error("Não é possível criar instância dessa classe")}static getConnection(){return new Promise((e,t)=>{if(u)return e(u);const o=indexedDB.open("jscangaceiro",2);o.onupgradeneeded=e=>{d._createStores(e.target.result)},o.onsuccess=t=>{u=t.target.result,l=u.close.bind(u),u.close=()=>{throw new Error("Você não pode fechar diretamente a conexão")},e(u)},o.onerror=e=>{console.log(e.target.result),t(e.target.error.name)}})}static _createStores(e){c.forEach(t=>{e.objectStoreNames.contains(t)&&e.deleteObjectStore(t),e.createObjectStore(t,{autoIncrement:!0})})}static closeCommection(){u&&l()}}class p{constructor(e){this._connection=e,this._store="negociacoes"}adiciona(e){return new Promise((t,o)=>{const a=this._connection.transaction([this._store],"readwrite").objectStore(this._store).add(e);a.onsuccess=e=>t(),a.onerror=e=>{console.log(e.target.error),o("Não foi possível salvar a negociação")}})}listaTodos(){return new Promise((e,t)=>{const o=[],a=this._connection.transaction([this._store],"readwrite").objectStore(this._store).openCursor();a.onsuccess=t=>{const a=t.target.result;if(a){const e=new v(a.value._data,a.value._quantidade,a.value._valor);o.push(e),a.continue()}else e(o)},a.onerror=e=>{console.log(e.target.error),t("Não foi possível listar as negociações")}})}apagaTodas(){return new Promise((e,t)=>{const o=this._connection.transaction([this._store],"readwrite").objectStore(this._store).clear();o.onsuccess=t=>e(),o.onerror=e=>{console.log("Não foi possível apagar as negociações")}})}}async function h(){let e=await d.getConnection();return new p(e)}class g{_handleErrors(e){if(!e.ok)throw new Error(e.statusText);return e}get(e){return fetch(e).then(e=>this._handleErrors(e).then(e=>e.json()))}}function m(e=500){return function(t,o,a){const n=a.value,r=0;return a.value=function(...t){event&&event.preventDefault(),clearTimeout(r),r=setTimeout(()=>n.apply(this,t),e)},a}}function f(e){throw new Error(e+" é um parâmetro obrigatório")}function _(e=f("event"),t=f("selector"),o=!0){return function(a,n,r){return Reflect.defineMetadata("bindEvent",{event:e,seletor:t,prevent:o,propertyKey:n},Object.getPrototypeOf(a),n),r}}class v{constructor(e=f("data"),t=f("quantidade"),o=f("valor")){Object.assign(this,{_quantidade:t,_valor:o}),this._data=new Date(e.getTime()),Object.freeze(this)}get volume(){return this._quantidade*this._valor}get data(){return new Date(this._data.getTime())}get quantidade(){return this._quantidade}get valor(){return this._valor}equals(e){return JSON.stringify(this)==JSON.stringify(e)}}class w{constructor(){this._http=new g}obterNegociacoesDaSemana(){return this._http.get("negociacoes/semana").then(e=>e.map(e=>new v(new Date(e.data),e.quantidade,e.valor)),e=>{throw new a("Não foi possível obter as negociações da semana")})}obterNegociacoesDaSemanaAnterior(){return this._http.get("negociacoes/anterior").then(e=>e.map(e=>new v(new Date(e.data),e.quantidade,e.valor)),e=>{throw new a("Não foi possível obter as negociações da semana anterior")})}obterNegociacoesDaSemanaRetrasada(){return this._http.get("negociacoes/retrasada").then(e=>e.map(e=>new v(new Date(e.data),e.quantidade,e.valor)),e=>{throw new a("Não foi possível obter as negociações da semana retrasada")})}async obterNegociacoesDoPeriodo(){try{return(await Promise.all([this.obterNegociacoesDaSemana(),this.obterNegociacoesDaSemanaAnterior(),this.obterNegociacoesDaSemanaRetrasada()])).reduce((e,t)=>e.concat(t),[]).sort((e,t)=>t.data.getTime()-e.data.getTime())}catch(e){throw console.log(e),new a("Não foi possível obter as negociações do período")}}}class b{constructor(){this._negociacoes=[],Object.freeze(this)}adiciona(e){this._negociacoes.push(e)}paraArray(){return[].concat(this._negociacoes)}get volumeTotal(){return this._negociacoes.reduce((e,t)=>e+t.volume,0)}esvazia(){this._negociacoes.length=0}}class y{constructor(e){this._elemento=document.querySelector(e)}template(e){throw new Error("Você precisa implementar o método template")}update(e){this._elemento.innerHTML=this.template(e)}}class D extends y{template(e){return e.texto?`<p class="alert alert-info">${e.texto}</p>`:"<p></p>"}}class O extends a{constructor(){super("A data deve estar no formato dd/mm/aaaa"),this.name=this.constructor.name}}class N{constructor(){throw new Error("Esta classe não pode ser instanciada!")}static paraTexto(e){return`${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()}`}static paraData(e){if(!/\d{2}\/\d{2}\/\d{4}$/.test(e))throw new O;return new Date(...e.split("/").reverse().map((e,t)=>e-t%2))}}class x extends y{template(e){return`\n        <table class="table table-hover table-bordered">\n        <thead>\n            <tr>\n                <th>DATA</th>\n                <th>QUANTIDADE</th>\n                <th>VALOR</th>\n                <th>VOLUME</th>\n            </tr>\n        </thead>\n            ${e.paraArray().map(e=>`    <tr>\n                        <td>${N.paraTexto(e.data)}</td>\n                        <td>${e.quantidade}</td>\n                        <td>${e.valor}</td>\n                        <td>${e.volume}</td>\n                    </tr>\n                `).join("")}\n        <tbody>\n        </tbody>\n        \n        <tfoot>\n            <tr>\n                <td colspan="3"></td>\n                <td>${e.volumeTotal}</td>\n            </tr>\n        </tfoot>\n    </table> `}}class j{constructor(e=""){this._texto=e}get texto(){return this._texto}set texto(e){this._texto=e}}var S,T,E,P,q,z,$,A;function M(e,t,o,a,n){var r={};return Object.keys(a).forEach((function(e){r[e]=a[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=o.slice().reverse().reduce((function(o,a){return a(e,t,o)||o}),r),n&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(n):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}new(S=function(...e){const t=e.map(e=>document.querySelector(e));return function(e){const o=e,a=function(){const e=new o(...t);Object.getOwnPropertyNames(o.prototype).forEach(t=>{Reflect.hasMetadata("bindEvent",e,t)&&function(e,t){document.querySelector(t.seletor).addEventListener(t.event,o=>{t.prevent&&o.preventDefault(),e[t.propertyKey](o)})}(e,Reflect.getMetadata("bindEvent",e,t))})};return a.prototype=o.prototype,a}}("#data","#quantidade","#valor"),T=_("submit",".form"),E=m(),P=_("click","#botao-apaga"),q=_("click","#botao-importa"),z=m(1e3),S((M((A=class{constructor(e,t,o){Object.assign(this,{_inputData:e,_inputQuantidade:t,_inputValor:o}),this._negociacoes=new i(new b,new x("#negociacoes"),"adiciona","esvazia"),this._mensagem=new i(new j,new D("#mensagemView"),"texto"),this._service=new w,this._init()}async _init(){try{const e=await h();(await e.listaTodos()).forEach(e=>this._negociacoes.adiciona(e))}catch(e){this._mensagem.texto=r(e)}}async adiciona(e){try{e.preventDefault();const t=this._criaNegociacao(),o=await h();await o.adiciona(t),this._negociacoes.adiciona(t),this._mensagem.texto="Negociação adicionada com sucesso",this._limpaFormulorio()}catch(e){this._mensagem.texto=r(e)}}async apaga(){try{const e=await h();await e.apagaTodas(),this._negociacoes.esvazia(),this._mensagem.texto="Negociações apacada com sucesso"}catch(e){this._mensagem.texto=r(e)}}_criaNegociacao(){return new v(N.paraData(this._inputData.value),parseInt(this._inputQuantidade.value),parseFloat(this._inputValor.value))}_limpaFormulorio(){this._inputData.value="",this._inputQuantidade.value=1,this._inputValor.value=0,this._inputData.focus()}async importaNegociacoes(){try{const e=await this._service.obterNegociacoesDoPeriodo();console.log(e),e.filter(e=>!this._negociacoes.paraArray().some(t=>e.equals(t))).forEach(e=>this._negociacoes.adiciona(e)),this._mensagem.texto="Negociações do período importadas com sucesso"}catch(e){this._mensagem.texto=r(e)}}}).prototype,"adiciona",[T,E],Object.getOwnPropertyDescriptor(A.prototype,"adiciona"),A.prototype),M(A.prototype,"apaga",[P],Object.getOwnPropertyDescriptor(A.prototype,"apaga"),A.prototype),M(A.prototype,"importaNegociacoes",[q,z],Object.getOwnPropertyDescriptor(A.prototype,"importaNegociacoes"),A.prototype),$=A))||$);const V=new v(new Date,1,200),F=new Headers;F.set("Content-Type","application/json");const R=JSON.stringify(V);fetch("/negociacoes",{method:"POST",headers:F,body:R}).then(()=>console.log("Dados enviados com sucesso"))}]);