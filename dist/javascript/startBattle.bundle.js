(()=>{"use strict";document.getElementById("start").addEventListener("click",(()=>{console.log("Before EB"),(()=>{alert("THIS IS AN ALERT!");const e=document.querySelector("body"),t=(document.querySelector(".happy"),document.createElement("div"));for(t.textContent="hahahahaah",t.style.color="red",e.appendChild(t);e.lastChild;){if(console.log(e.lastChild.tagName),"H1"===e.lastChild.tagName)return;e.removeChild(e.lastChild)}})(),console.log("After EB")}))})();