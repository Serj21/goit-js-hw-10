import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const s=document.querySelector(".form"),n=s.querySelector('input[name="delay"]'),a=s.querySelectorAll('input[name="state"]');s.addEventListener("submit",function(r){r.preventDefault();const t=parseInt(n.value);let o="";a.forEach(e=>{e.checked&&(o=e.value)}),new Promise((e,l)=>{setTimeout(()=>{o==="fulfilled"?e(t):l(t)},t)}).then(e=>{i.success({title:"✅ Fulfilled promise",message:`Fulfilled promise in ${e}ms`})}).catch(e=>{i.error({title:"❌ Rejected promise",message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map