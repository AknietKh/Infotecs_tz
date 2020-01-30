!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";function a(){return fetch("./db/db.json").then(e=>{if(e.ok)return e.json();throw new Error("Данные не были получены, ошибка: "+e.status)}).catch(e=>{console.warn(e),document.body.innerHTML='<div style="color: red; font-size: 30px; ">Упс, что-то пошло не так!</div>'})}function r(e,t=10){const n=[],a=Math.ceil(e.length/t);for(let r=0;r<a;r++)n[r]=e.slice(r*t,r*t+t);return n}function o(e,t=1){!localStorage.getItem("jsonData")&&localStorage.setItem("jsonData",JSON.stringify(e));const n=localStorage.getItem("jsonData")?JSON.parse(localStorage.getItem("jsonData")):e,a=document.querySelector(".main-data"),o=document.querySelector(".about").clientWidth,l=r(n.JSON)[t-1];a.innerHTML="",l.forEach(e=>{const t=document.createElement("tr");t.setAttribute("id",e.id),t.className="data-row",t.innerHTML=`\n        <td class='first-name _cell' data-type='text'>${e.name.firstName}</td>\n        <td class='last-name _cell' data-type='text'>${e.name.lastName}</td>\n        <td class='about _cell' data-type='text'>${e.about.slice(0,o/4)+"..."}</td>\n        <td class='eye-color _cell' data-type='text'>${e.eyeColor}</td>\n    `,a.append(t),function(e){const t=document.createElement("div");t.className="colored-eye",t.innerHTML=e.innerHTML,e.innerHTML="",e.append(t),e.firstChild.style.cssText=`background-color: ${e.firstChild.innerHTML};`}(t.querySelector(".eye-color"))})}function l(e){const t=localStorage.getItem("jsonData")?JSON.parse(localStorage.getItem("jsonData")):e,n=document.querySelector(".table"),a=r(t.JSON).length,l=document.createElement("div"),c=document.createElement("span");l.className="pagination",c.textContent="Пагинация:",l.append(c);for(let e=0;e<a;e++){const t=document.createElement("div");t.className="pagination-number",t.innerHTML=e+1,0===e&&t.classList.add("current-pagination"),l.append(t)}n.insertAdjacentElement("beforebegin",l),function(e){document.querySelectorAll(".pagination-number").forEach((t,n)=>{t.addEventListener("click",()=>{var t;t=n,document.querySelectorAll(".pagination-number").forEach((e,n)=>{e.classList.contains("current-pagination")&&n!==t?e.classList.remove("current-pagination"):e.classList.contains("current-pagination")||n!==t||e.classList.add("current-pagination")}),o(e,n+1)})})}(t)}function c(){document.querySelectorAll("th").forEach((e,t)=>{e.addEventListener("click",()=>{var n;n=t,document.querySelectorAll("th").forEach((e,t)=>{e.classList.contains("selected")&&t!==n&&(e.classList.toggle("selected"),e.removeAttribute("data-order"))}),e.dataset.order&&"-1"!==e.dataset.order?"1"===e.dataset.order&&e.setAttribute("data-order",-1):e.setAttribute("data-order",1);const a=e.dataset.order;e.classList.add("selected"),function(e,t){const n=document.querySelectorAll(".data-row"),a=document.querySelector(".main-data"),r=Array.from(n).sort((n,a)=>n.cells[e].innerHTML>a.cells[e].innerHTML?t:-t);a.append(...r)}(t,a)})})}n.r(t);n(0);window.addEventListener("resize",()=>{a().then(()=>{o(JSON.parse(localStorage.getItem("jsonData")))})}),a().then(e=>{o(e),l(e),c(),function(){const e=document.querySelector("table"),t=document.querySelector(".form-wrapper"),n=t.querySelectorAll("input"),a=t.querySelector("textarea"),l=t.querySelector(".btn-edit"),c=t.querySelector(".btn-close");let i;e.addEventListener("click",(function(r){const o=r.target.closest(".data-row");i=o,o&&e.contains(o)&&(t.style.cssText=`display: block;  top: ${o.offsetTop}px; left: ${o.offsetWidth+20}px;`,n[0].value=o.cells[0].innerHTML,n[1].value=o.cells[1].innerHTML,a.value=o.cells[2].innerHTML.slice(0,o.cells[2].innerHTML.length-3),n[2].value=o.cells[3].firstChild.innerHTML)})),l.addEventListener("click",()=>{const e=JSON.parse(localStorage.getItem("jsonData")),l=r(e.JSON).length,c={id:i.id,name:{firstName:n[0].value,lastName:n[1].value},phone:null,about:a.value,eyeColor:n[2].value};let s=0;e.JSON.forEach((e,t,n)=>{e.id===i.id&&(n.splice(t,1,c),s=t+1)}),localStorage.setItem("jsonData",JSON.stringify(e)),t.style="",o(e,Math.ceil(s/(e.JSON.length/l)))}),c.addEventListener("click",()=>t.style="")}(),function(){const e=document.querySelector(".btn-hidden_all"),t=document.querySelector(".main-data");e.addEventListener("click",()=>{t.dataset.hidden&&"off"!==t.dataset.hidden?"on"===t.dataset.hidden&&(t.setAttribute("data-hidden","off"),e.innerHTML="Скрыть все колонки",t.style.display=""):(t.setAttribute("data-hidden","on"),e.innerHTML="Показать все колонки",t.style.display="none")})}(),function(){const e=document.querySelectorAll(".btn-hidden"),t=document.querySelector(".table");e.forEach((e,n)=>{e.addEventListener("click",()=>{"off"===e.children[0].dataset.hidden?(e.children[0].setAttribute("data-hidden","on"),t.classList.add(`hidden-${n+1}`)):"on"===e.children[0].dataset.hidden&&(e.children[0].setAttribute("data-hidden","off"),t.classList.remove(`hidden-${n+1}`)),a().then(()=>{o(JSON.parse(localStorage.getItem("jsonData")))})})})}()})}]);