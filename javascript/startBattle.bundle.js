(()=>{"use strict";var l,t={412:(l,t,n)=>{n.d(t,{J5:()=>s,VL:()=>u,lO:()=>e});const e=l=>{const t=l;let n=0,e=[0,0],u=[0,l-1];return{getStartCoord:()=>e,getEndCoord:()=>u,getLength:()=>t,getHits:()=>n,hit:()=>{n+=1},isSunk:()=>n===t,setCoord:(l,n,s)=>(e[0]=l,e[1]=n,"horizontal"===s?(u[0]=l+t-1,u[1]=n):(u[0]=l,u[1]=n+t-1),[e,u])}},u=()=>{let l=[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]],t=[];return{ships:t,board:l,addShip:(n,e,u,s)=>{n.setCoord(e,u,s);const r=t.push(n)-1,a=n.getStartCoord()[0],o=n.getStartCoord()[1],i=n.getEndCoord()[0],c=n.getEndCoord()[1];let d;if("horizontal"===s)for(d=a;d<=i;d++)l[o][d]=r;else if("vertical"===s)for(d=o;d<=c;d++)l[d][a]=r;return l},receiveAttack:(n,e)=>{if(null===l[e][n])return l[e][n]="miss",{xAttack:n,yAttack:e,result:l[e][n]};if(null!==l[e][n]&&"miss"!==l[e][n]&&"hit"!==l[e][n]){const u=l[e][n];return l[e][n]="hit",t[u].hit(),{xAttack:n,yAttack:e,result:"hit"}}return{xAttack:n,yAttack:e,result:"invalid"}},allShipsSunk:()=>{for(let l=0;l<t.length;l++)if(!t[l].isSunk())return!1;return!0}}},s=()=>({attack:(l,t,n,e)=>{let u=t,s=n;return!0===e&&(u=Math.floor(10*Math.random())+0,s=Math.floor(10*Math.random())+0),l.receiveAttack(u,s)}})}},n={};function e(l){var u=n[l];if(void 0!==u)return u.exports;var s=n[l]={exports:{}};return t[l](s,s.exports,e),s.exports}e.d=(l,t)=>{for(var n in t)e.o(t,n)&&!e.o(l,n)&&Object.defineProperty(l,n,{enumerable:!0,get:t[n]})},e.o=(l,t)=>Object.prototype.hasOwnProperty.call(l,t),l=e(412),document.getElementById("start").addEventListener("click",(()=>{const t=document.querySelector("body");for(;t.lastChild&&"H1"!==t.lastChild.tagName;)t.removeChild(t.lastChild);const n=(0,l.J5)(),e=(0,l.J5)();e.computer=!0;const u=(0,l.VL)(),s=(0,l.VL)();[5,4,3,3,2].forEach(((t,n)=>{u.addShip((0,l.lO)(t),0,n,"horizontal"),s.addShip((0,l.lO)(t),n,0,"vertical")}));const r=document.createElement("div");r.classList="player1 board grey",u.board.forEach(((l,t)=>{l.forEach(((l,n)=>{const e=document.createElement("div");e.setAttribute("id","P1-"+t+"-"+n),null===l?(e.textContent="~",e.classList="space"):l>=0?(e.textContent=l,e.classList="space ship"):"miss"===l?(e.textContent="X",e.classList="space miss"):(e.textContent="O",e.classList="space hit"),r.appendChild(e)}))}));const a=document.createElement("div");a.classList="player2 board",s.board.forEach(((l,t)=>{l.forEach(((l,r)=>{const o=document.createElement("div");o.classList="space enemy",o.setAttribute("id",r),o.addEventListener("click",(()=>{const l=n.attack(s,r,t);"miss"===l.result?(o.textContent="X",o.classList="space hit"):"hit"===l.result?(o.textContent="O",o.classList="space hit"):"invalid"===l.result&&alert("Move Invalid");const a=e.attack(u,0,0,!0),i=document.querySelector(`#P1-${a.yAttack}-${a.xAttack}`);"miss"===a.result?(i.textContent="X",i.classList="space miss"):"hit"===a.result?(i.textContent="O",i.classList="space hit"):"invalid"===a.result&&alert("Move Invalid")})),a.appendChild(o)}))})),t.appendChild(r),t.appendChild(a)}))})();