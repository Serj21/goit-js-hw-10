import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as s}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form"),a=i.querySelector('input[name="delay"]'),l=i.querySelectorAll('input[name="state"]');s.settings({position:"topRight",transitionIn:"fadeIn",transitionOut:"fadeOut"});i.addEventListener("submit",function(n){n.preventDefault();const t=parseInt(a.value);let o="";l.forEach(e=>{e.checked&&(o=e.value)}),new Promise((e,r)=>{setTimeout(()=>{o==="fulfilled"?e(t):r(t)},t)}).then(e=>{s.success({title:"✅ Fulfilled promise",message:`Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({title:"❌ Rejected promise",message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
