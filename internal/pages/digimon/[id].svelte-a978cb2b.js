import{S as J,i as K,s as Q,e as k,t as X,k as P,c as w,a as E,g as z,n as T,d as g,b as h,f as A,E as m,F as se,a1 as ne,h as Y,T as G,I as L,j as R,U as ke,m as U,o as M,x as p,u as I,v as q,P as we,R as Ee,A as De,a2 as ye,r as O,w as F,V as Se,W as Ie,X as Ve}from"../../chunks/vendor-ce64767f.js";import{p as je}from"../../chunks/stores-bd39f723.js";import{m as Be,P as Pe,D as Z,a as Te,S as Ae}from"../../chunks/Page-e08449ba.js";import{S as Ce}from"../../chunks/SupportCard-6a03a54a.js";import{D as x}from"../../chunks/DigiRow-50941dfd.js";import{S as Ne}from"../../chunks/SkillCard-ba28a546.js";function re(a,e,l){const s=a.slice();return s[5]=e[l],s}function ae(a,e,l){const s=a.slice();return s[8]=e[l],s[10]=l,s}function ie(a){let e,l=a[8]+"",s,n,o,t,i;function r(){return a[4](a[10])}return{c(){e=k("button"),s=X(l),n=P(),this.h()},l(f){e=w(f,"BUTTON",{class:!0});var u=E(e);s=z(u,l),n=T(u),u.forEach(g),this.h()},h(){h(e,"class",o=""+((a[10]!==a[1]?"text-gray-500 hover:text-gray-700":"bg-indigo-100 text-indigo-700")+" px-3 py-2 font-medium text-sm rounded-md"))},m(f,u){A(f,e,u),m(e,s),m(e,n),t||(i=se(e,"click",r),t=!0)},p(f,u){a=f,u&2&&o!==(o=""+((a[10]!==a[1]?"text-gray-500 hover:text-gray-700":"bg-indigo-100 text-indigo-700")+" px-3 py-2 font-medium text-sm rounded-md"))&&h(e,"class",o)},d(f){f&&g(e),t=!1,i()}}}function oe(a){let e,l,s,n,o,t,i,r=a[0][a[5]][a[1]].toString().padStart(4," ")+"",f,u;return{c(){e=k("div"),l=k("span"),s=X(a[5]),n=P(),o=k("div"),t=k("span"),i=k("pre"),f=X(r),u=P(),this.h()},l(c){e=w(c,"DIV",{class:!0});var d=E(e);l=w(d,"SPAN",{class:!0});var V=E(l);s=z(V,a[5]),V.forEach(g),n=T(d),o=w(d,"DIV",{style:!0,class:!0});var N=E(o);t=w(N,"SPAN",{style:!0,class:!0});var C=E(t);i=w(C,"PRE",{class:!0});var v=E(i);f=z(v,r),v.forEach(g),C.forEach(g),N.forEach(g),u=T(d),d.forEach(g),this.h()},h(){h(l,"class","uppercase flex w-16 text-sm font-semibold bg-gray-500 text-white tracking-tight items-center justify-center"),h(i,"class","ml-2 mt-0.5"),ne(t,"width",Math.round(a[0][a[5]][a[1]]*100/a[2][a[5]])+"%"),h(t,"class","bg-gray-700 inline-block h-full rounded-r-md transition-width duration-500"),h(o,"class","flex overflow-hidden text-sm w-full text-gray-100 font-extrabold font-mono "),h(e,"class","border-4 border-white flex bg-gray-500 rounded-lg overflow-hidden")},m(c,d){A(c,e,d),m(e,l),m(l,s),m(e,n),m(e,o),m(o,t),m(t,i),m(i,f),m(e,u)},p(c,d){d&3&&r!==(r=c[0][c[5]][c[1]].toString().padStart(4," ")+"")&&Y(f,r),d&3&&ne(t,"width",Math.round(c[0][c[5]][c[1]]*100/c[2][c[5]])+"%")},d(c){c&&g(e)}}}function Re(a){let e,l,s,n,o=a[3],t=[];for(let f=0;f<o.length;f+=1)t[f]=ie(ae(a,o,f));let i=["hp","sp","atk","int","def","spd","total"],r=[];for(let f=0;f<7;f+=1)r[f]=oe(re(a,i,f));return{c(){e=k("div"),l=k("div"),s=k("nav");for(let f=0;f<t.length;f+=1)t[f].c();n=P();for(let f=0;f<7;f+=1)r[f].c();this.h()},l(f){e=w(f,"DIV",{class:!0});var u=E(e);l=w(u,"DIV",{class:!0});var c=E(l);s=w(c,"NAV",{class:!0,"aria-label":!0});var d=E(s);for(let V=0;V<t.length;V+=1)t[V].l(d);d.forEach(g),c.forEach(g),n=T(u);for(let V=0;V<7;V+=1)r[V].l(u);u.forEach(g),this.h()},h(){h(s,"class","flex space-x-4"),h(s,"aria-label","Tabs"),h(l,"class","flex items-center justify-center py-2"),h(e,"class","overflow-hidden px-4 pb-4 pt-2 bg-white rounded-md shadow-inner")},m(f,u){A(f,e,u),m(e,l),m(l,s);for(let c=0;c<t.length;c+=1)t[c].m(s,null);m(e,n);for(let c=0;c<7;c+=1)r[c].m(e,null)},p(f,[u]){if(u&10){o=f[3];let c;for(c=0;c<o.length;c+=1){const d=ae(f,o,c);t[c]?t[c].p(d,u):(t[c]=ie(d),t[c].c(),t[c].m(s,null))}for(;c<t.length;c+=1)t[c].d(1);t.length=o.length}if(u&7){i=["hp","sp","atk","int","def","spd","total"];let c;for(c=0;c<7;c+=1){const d=re(f,i,c);r[c]?r[c].p(d,u):(r[c]=oe(d),r[c].c(),r[c].m(e,null))}for(;c<7;c+=1)r[c].d(1)}},i:G,o:G,d(f){f&&g(e),L(t,f),L(r,f)}}}function Ue(a,e,l){let{stats:s}=e,n=0;const o=Be,t=["Base","Level 50","Level 99"],i=r=>{l(1,n=r)};return a.$$set=r=>{"stats"in r&&l(0,s=r.stats)},[s,n,o,t,i]}class Me extends J{constructor(e){super();K(this,e,Ue,Re,Q,{stats:0})}}function fe(a,e,l){const s=a.slice();return s[4]=e[l],s}function ce(a){let e,l=a[4]+"",s,n,o,t,i;function r(){return a[3](a[4])}return{c(){e=k("button"),s=X(l),n=P(),this.h()},l(f){e=w(f,"BUTTON",{class:!0});var u=E(e);s=z(u,l),n=T(u),u.forEach(g),this.h()},h(){h(e,"class",o=""+((a[4]!==a[0]?"text-gray-500 hover:text-gray-700":"bg-indigo-100 text-indigo-700")+" px-3 py-2 font-medium text-sm rounded-md transition-colors duration-300"))},m(f,u){A(f,e,u),m(e,s),m(e,n),t||(i=se(e,"click",r),t=!0)},p(f,u){a=f,u&2&&l!==(l=a[4]+"")&&Y(s,l),u&3&&o!==(o=""+((a[4]!==a[0]?"text-gray-500 hover:text-gray-700":"bg-indigo-100 text-indigo-700")+" px-3 py-2 font-medium text-sm rounded-md transition-colors duration-300"))&&h(e,"class",o)},d(f){f&&g(e),t=!1,i()}}}function qe(a){let e,l,s,n=a[1],o=[];for(let t=0;t<n.length;t+=1)o[t]=ce(fe(a,n,t));return{c(){e=k("div"),l=k("nav");for(let t=0;t<o.length;t+=1)o[t].c();this.h()},l(t){e=w(t,"DIV",{class:!0});var i=E(e);l=w(i,"NAV",{class:!0,"aria-label":!0});var r=E(l);for(let f=0;f<o.length;f+=1)o[f].l(r);r.forEach(g),i.forEach(g),this.h()},h(){h(l,"class","flex space-x-4"),h(l,"aria-label","Tabs"),h(e,"class",s="flex items-center justify-center "+a[2])},m(t,i){A(t,e,i),m(e,l);for(let r=0;r<o.length;r+=1)o[r].m(l,null)},p(t,[i]){if(i&3){n=t[1];let r;for(r=0;r<n.length;r+=1){const f=fe(t,n,r);o[r]?o[r].p(f,i):(o[r]=ce(f),o[r].c(),o[r].m(l,null))}for(;r<o.length;r+=1)o[r].d(1);o.length=n.length}i&4&&s!==(s="flex items-center justify-center "+t[2])&&h(e,"class",s)},i:G,o:G,d(t){t&&g(e),L(o,t)}}}function Le(a,e,l){let{tabs:s=[]}=e,{value:n=s[0]}=e,{class:o=""}=e;const t=i=>l(0,n=i);return a.$$set=i=>{"tabs"in i&&l(1,s=i.tabs),"value"in i&&l(0,n=i.value),"class"in i&&l(2,o=i.class)},[n,s,o,t]}class Oe extends J{constructor(e){super();K(this,e,Le,qe,Q,{tabs:1,value:0,class:2})}}const{document:ee}=ye;function ue(a,e,l){const s=a.slice();return s[4]=e[l],s}function de(a,e,l){const s=a.slice();return s[4]=e[l],s}function he(a,e,l){const s=a.slice();return s[18]=e[l],s[20]=l,s}function _e(a){let e,l;return e=new Ce({props:{support:a[5],inner:!0}}),{c(){R(e.$$.fragment)},l(s){U(e.$$.fragment,s)},m(s,n){M(e,s,n),l=!0},p(s,n){const o={};n&32&&(o.support=s[5]),e.$set(o)},i(s){l||(p(e.$$.fragment,s),l=!0)},o(s){I(e.$$.fragment,s),l=!1},d(s){q(e,s)}}}function ge(a){let e,l;return e=new Ne({props:{skill:a[18],level:a[4].learns[a[20]].level}}),{c(){R(e.$$.fragment)},l(s){U(e.$$.fragment,s)},m(s,n){M(e,s,n),l=!0},p(s,n){const o={};n&64&&(o.skill=s[18]),n&16&&(o.level=s[4].learns[s[20]].level),e.$set(o)},i(s){l||(p(e.$$.fragment,s),l=!0)},o(s){I(e.$$.fragment,s),l=!1},d(s){q(e,s)}}}function me(a){let e,l,s=a[3],n=[];for(let t=0;t<s.length;t+=1)n[t]=pe(de(a,s,t));const o=t=>I(n[t],1,1,()=>{n[t]=null});return{c(){e=k("div");for(let t=0;t<n.length;t+=1)n[t].c();this.h()},l(t){e=w(t,"DIV",{class:!0,id:!0});var i=E(e);for(let r=0;r<n.length;r+=1)n[r].l(i);i.forEach(g),this.h()},h(){h(e,"class","space-y-4 py-4 svelte-51dx8w"),h(e,"id","Evolve")},m(t,i){A(t,e,i);for(let r=0;r<n.length;r+=1)n[r].m(e,null);l=!0},p(t,i){if(i&8){s=t[3];let r;for(r=0;r<s.length;r+=1){const f=de(t,s,r);n[r]?(n[r].p(f,i),p(n[r],1)):(n[r]=pe(f),n[r].c(),p(n[r],1),n[r].m(e,null))}for(O(),r=s.length;r<n.length;r+=1)o(r);F()}},i(t){if(!l){for(let i=0;i<s.length;i+=1)p(n[i]);l=!0}},o(t){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)I(n[i]);l=!1},d(t){t&&g(e),L(n,t)}}}function pe(a){let e,l,s,n,o;return l=new x({props:{digimon:a[4],conditions:!0}}),{c(){e=k("a"),R(l.$$.fragment),s=P(),this.h()},l(t){e=w(t,"A",{href:!0,class:!0});var i=E(e);U(l.$$.fragment,i),s=T(i),i.forEach(g),this.h()},h(){h(e,"href",n="/digi-db/digimon/"+a[4].id),h(e,"class","block")},m(t,i){A(t,e,i),M(l,e,null),m(e,s),o=!0},p(t,i){const r={};i&8&&(r.digimon=t[4]),l.$set(r),(!o||i&8&&n!==(n="/digi-db/digimon/"+t[4].id))&&h(e,"href",n)},i(t){o||(p(l.$$.fragment,t),o=!0)},o(t){I(l.$$.fragment,t),o=!1},d(t){t&&g(e),q(l)}}}function ve(a){let e,l,s=a[2],n=[];for(let t=0;t<s.length;t+=1)n[t]=be(ue(a,s,t));const o=t=>I(n[t],1,1,()=>{n[t]=null});return{c(){e=k("div");for(let t=0;t<n.length;t+=1)n[t].c();this.h()},l(t){e=w(t,"DIV",{class:!0,id:!0});var i=E(e);for(let r=0;r<n.length;r+=1)n[r].l(i);i.forEach(g),this.h()},h(){h(e,"class","space-y-4 py-4 svelte-51dx8w"),h(e,"id","De-Evolve")},m(t,i){A(t,e,i);for(let r=0;r<n.length;r+=1)n[r].m(e,null);l=!0},p(t,i){if(i&4){s=t[2];let r;for(r=0;r<s.length;r+=1){const f=ue(t,s,r);n[r]?(n[r].p(f,i),p(n[r],1)):(n[r]=be(f),n[r].c(),p(n[r],1),n[r].m(e,null))}for(O(),r=s.length;r<n.length;r+=1)o(r);F()}},i(t){if(!l){for(let i=0;i<s.length;i+=1)p(n[i]);l=!0}},o(t){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)I(n[i]);l=!1},d(t){t&&g(e),L(n,t)}}}function be(a){let e,l,s,n,o;return l=new x({props:{digimon:a[4]}}),{c(){e=k("a"),R(l.$$.fragment),s=P(),this.h()},l(t){e=w(t,"A",{href:!0,class:!0});var i=E(e);U(l.$$.fragment,i),s=T(i),i.forEach(g),this.h()},h(){h(e,"href",n="/digi-db/digimon/"+a[4].id),h(e,"class","block")},m(t,i){A(t,e,i),M(l,e,null),m(e,s),o=!0},p(t,i){const r={};i&4&&(r.digimon=t[4]),l.$set(r),(!o||i&4&&n!==(n="/digi-db/digimon/"+t[4].id))&&h(e,"href",n)},i(t){o||(p(l.$$.fragment,t),o=!0)},o(t){I(l.$$.fragment,t),o=!1},d(t){t&&g(e),q(l)}}}function Fe(a){let e,l,s,n,o,t,i,r,f=a[4].description+"",u,c,d,V,N,C,v=a[5]&&_e(a);o=new Me({props:{stats:a[4].stats}});let j=a[6],b=[];for(let _=0;_<j.length;_+=1)b[_]=ge(he(a,j,_));const $e=_=>I(b[_],1,1,()=>{b[_]=null});let y=a[3].length&&me(a),S=a[2].length&&ve(a);return{c(){e=k("div"),l=k("div"),s=k("div"),v&&v.c(),n=P(),R(o.$$.fragment),t=P(),i=k("div"),r=k("p"),u=X(f),c=P(),d=k("div");for(let _=0;_<b.length;_+=1)b[_].c();V=P(),y&&y.c(),N=P(),S&&S.c(),this.h()},l(_){e=w(_,"DIV",{class:!0});var $=E(e);l=w($,"DIV",{class:!0});var B=E(l);s=w(B,"DIV",{class:!0,id:!0});var D=E(s);v&&v.l(D),n=T(D),U(o.$$.fragment,D),t=T(D),i=w(D,"DIV",{class:!0});var W=E(i);r=w(W,"P",{class:!0});var te=E(r);u=z(te,f),te.forEach(g),W.forEach(g),D.forEach(g),c=T(B),d=w(B,"DIV",{class:!0,id:!0});var le=E(d);for(let H=0;H<b.length;H+=1)b[H].l(le);le.forEach(g),V=T(B),y&&y.l(B),N=T(B),S&&S.l(B),B.forEach(g),$.forEach(g),this.h()},h(){h(r,"class","text-gray-800 text-sm text-center"),h(i,"class","bg-white rounded-md p-4 shadow-inner"),h(s,"class","space-y-4 h-full py-4 svelte-51dx8w"),h(s,"id","Details"),h(d,"class","space-y-2 h-full py-4 svelte-51dx8w"),h(d,"id","Skills"),h(l,"class","slides w-full h-full space-x-5 svelte-51dx8w"),h(e,"class","slider w-full h-full svelte-51dx8w")},m(_,$){A(_,e,$),m(e,l),m(l,s),v&&v.m(s,null),m(s,n),M(o,s,null),m(s,t),m(s,i),m(i,r),m(r,u),m(l,c),m(l,d);for(let B=0;B<b.length;B+=1)b[B].m(d,null);m(l,V),y&&y.m(l,null),m(l,N),S&&S.m(l,null),C=!0},p(_,$){_[5]?v?(v.p(_,$),$&32&&p(v,1)):(v=_e(_),v.c(),p(v,1),v.m(s,n)):v&&(O(),I(v,1,1,()=>{v=null}),F());const B={};if($&16&&(B.stats=_[4].stats),o.$set(B),(!C||$&16)&&f!==(f=_[4].description+"")&&Y(u,f),$&80){j=_[6];let D;for(D=0;D<j.length;D+=1){const W=he(_,j,D);b[D]?(b[D].p(W,$),p(b[D],1)):(b[D]=ge(W),b[D].c(),p(b[D],1),b[D].m(d,null))}for(O(),D=j.length;D<b.length;D+=1)$e(D);F()}_[3].length?y?(y.p(_,$),$&8&&p(y,1)):(y=me(_),y.c(),p(y,1),y.m(l,N)):y&&(O(),I(y,1,1,()=>{y=null}),F()),_[2].length?S?(S.p(_,$),$&4&&p(S,1)):(S=ve(_),S.c(),p(S,1),S.m(l,null)):S&&(O(),I(S,1,1,()=>{S=null}),F())},i(_){if(!C){p(v),p(o.$$.fragment,_);for(let $=0;$<j.length;$+=1)p(b[$]);p(y),p(S),C=!0}},o(_){I(v),I(o.$$.fragment,_),b=b.filter(Boolean);for(let $=0;$<b.length;$+=1)I(b[$]);I(y),I(S),C=!1},d(_){_&&g(e),v&&v.d(),q(o),L(b,_),y&&y.d(),S&&S.d()}}}function We(a){let e,l,s,n,o,t;l=new x({props:{digimon:a[4]}});function i(f){a[11](f)}let r={tabs:a[1],class:"mt-2 -mb-2"};return a[0]!==void 0&&(r.value=a[0]),n=new Oe({props:r}),Se.push(()=>Ie(n,"value",i)),{c(){e=k("div"),R(l.$$.fragment),s=P(),R(n.$$.fragment),this.h()},l(f){e=w(f,"DIV",{slot:!0,class:!0});var u=E(e);U(l.$$.fragment,u),s=T(u),U(n.$$.fragment,u),u.forEach(g),this.h()},h(){h(e,"slot","header"),h(e,"class","flex-1")},m(f,u){A(f,e,u),M(l,e,null),m(e,s),M(n,e,null),t=!0},p(f,u){const c={};u&16&&(c.digimon=f[4]),l.$set(c);const d={};u&2&&(d.tabs=f[1]),!o&&u&1&&(o=!0,d.value=f[0],Ve(()=>o=!1)),n.$set(d)},i(f){t||(p(l.$$.fragment,f),p(n.$$.fragment,f),t=!0)},o(f){I(l.$$.fragment,f),I(n.$$.fragment,f),t=!1},d(f){f&&g(e),q(l),q(n)}}}function Xe(a){let e,l,s,n;return ee.title=e="DigiDB | "+a[4].name,s=new Pe({props:{$$slots:{header:[We],default:[Fe]},$$scope:{ctx:a}}}),{c(){l=P(),R(s.$$.fragment)},l(o){ke('[data-svelte="svelte-16flyu"]',ee.head).forEach(g),l=T(o),U(s.$$.fragment,o)},m(o,t){A(o,l,t),M(s,o,t),n=!0},p(o,[t]){(!n||t&16)&&e!==(e="DigiDB | "+o[4].name)&&(ee.title=e);const i={};t&2097279&&(i.$$scope={dirty:t,ctx:o}),s.$set(i)},i(o){n||(p(s.$$.fragment,o),n=!0)},o(o){I(s.$$.fragment,o),n=!1},d(o){o&&g(l),q(s,o)}}}function ze(a,e,l){let s,n,o,t,i,r,f;we(a,je,j=>l(10,f=j));var u;let c="Details",d=[],V=!1;const N=Ee("title");De(()=>{l(8,V=!0)});function C(j){return l(0,c="Details"),parseInt(j)}function v(j){c=j,l(0,c)}return a.$$.update=()=>{a.$$.dirty&1024&&l(9,s=C(f.params.id)),a.$$.dirty&512&&l(4,n=Z.get(s)),a.$$.dirty&385&&V&&(l(7,u=document.getElementById(c))===null||u===void 0||u.scrollIntoView()),a.$$.dirty&16&&l(6,o=n.learns.map(({move_id:j})=>Te.get(j))),a.$$.dirty&16&&l(3,t=n.digivolve_to.map(j=>Z.get(j))),a.$$.dirty&16&&l(2,i=Z.where({digivolve_to:n.id})),a.$$.dirty&16&&l(5,r=Ae.get(n.support_id)),a.$$.dirty&14&&(l(1,d=["Details","Skills"]),t.length&&d.push("Evolve"),i.length&&d.push("De-Evolve")),a.$$.dirty&16&&N.set(`${n.name} - #${n.id.toString().padStart(3,"0")}`)},[c,d,i,t,n,r,o,u,V,s,f,v]}class Ze extends J{constructor(e){super();K(this,e,ze,Xe,Q,{})}}export{Ze as default};
