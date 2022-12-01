(()=>{"use strict";var l,n={412:(l,n,t)=>{t.d(n,{J5:()=>r,VL:()=>e,lO:()=>u});const u=l=>{const n=l;let t=0,u=[0,0],e=[0,l-1];return{getStartCoord:()=>u,getEndCoord:()=>e,getLength:()=>n,getHits:()=>t,hit:()=>{t+=1},isSunk:()=>t===n,setCoord:(l,t,r)=>(u[0]=l,u[1]=t,"horizontal"===r?(e[0]=l+n-1,e[1]=t):(e[0]=l,e[1]=t+n-1),[u,e])}},e=()=>{let l=[[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null]],n=[];return{ships:n,board:l,addShip:(t,u,e,r)=>{t.setCoord(u,e,r);const s=n.push(t)-1,o=t.getStartCoord()[0],a=t.getStartCoord()[1],i=t.getEndCoord()[0],c=t.getEndCoord()[1];let d;if("horizontal"===r)for(d=o;d<=i;d++)l[a][d]=s;else if("vertical"===r)for(d=a;d<=c;d++)l[d][o]=s;return l},receiveAttack:(t,u)=>{if(null===l[u][t])return l[u][t]="miss",{xAttack:t,yAttack:u,result:l[u][t]};if(null!==l[u][t]&&"miss"!==l[u][t]&&"hit"!==l[u][t]){const e=l[u][t];return l[u][t]="hit",n[e].hit(),{xAttack:t,yAttack:u,result:"hit"}}return{xAttack:t,yAttack:u,result:"invalid"}},allShipsSunk:()=>{for(let l=0;l<n.length;l++)if(!n[l].isSunk())return!1;return!0}}},r=()=>({computer:!1,attack:(l,n,t)=>{let u=n,e=t;return l.receiveAttack(u,e)}})}},t={};function u(l){var e=t[l];if(void 0!==e)return e.exports;var r=t[l]={exports:{}};return n[l](r,r.exports,u),r.exports}u.d=(l,n)=>{for(var t in n)u.o(n,t)&&!u.o(l,t)&&Object.defineProperty(l,t,{enumerable:!0,get:n[t]})},u.o=(l,n)=>Object.prototype.hasOwnProperty.call(l,n),l=u(412),document.getElementById("start").addEventListener("click",(()=>{const n=document.querySelector("body");for(;n.lastChild&&"H1"!==n.lastChild.tagName;)n.removeChild(n.lastChild);const t=(0,l.J5)();(0,l.J5)().computer=!0;const u=(0,l.VL)(),e=(0,l.VL)();[5,4,3,3,2].forEach(((n,t)=>{u.addShip((0,l.lO)(n),0,t,"horizontal"),e.addShip((0,l.lO)(n),t,0,"vertical")}));const r=document.createElement("div");r.classList="player1 board grey",u.board.forEach((l=>{l.forEach((l=>{const n=document.createElement("div");null===l?(n.textContent="~",n.classList="space"):l>=0?(n.textContent=l,n.setAttribute("id",l),n.classList="space ship"):"miss"===l?(n.textContent="X",n.classList="space miss"):(n.textContent="O",n.classList="space hit"),r.appendChild(n)}))}));const s=document.createElement("div");s.classList="player2 board",e.board.forEach(((l,n)=>{l.forEach(((l,u)=>{const r=document.createElement("div");r.classList="space enemy",r.setAttribute("id",u),r.addEventListener("click",(()=>{const l=t.attack(e,u,n);"miss"===l.result?(r.textContent="X",r.classList="space hit"):"hit"===l.result?(r.textContent="O",r.classList="space hit"):"invalid"===l.result&&alert("Move Invalid")})),s.appendChild(r)}))})),n.appendChild(r),n.appendChild(s)}))})();