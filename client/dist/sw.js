if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),d={module:{uri:l},exports:o,require:t};s[l]=Promise.all(r.map((e=>d[e]||t(e)))).then((e=>(n(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AdminAllCallListSection-CilwX9oO.js",revision:null},{url:"assets/index-5AXRPeda.js",revision:null},{url:"assets/index-BsXmo9t1.css",revision:null},{url:"assets/vendor-kbKtIrwV.css",revision:null},{url:"assets/vendor-ZQ85wmCP.js",revision:null},{url:"firebase-messaging-sw.js",revision:"b75a421edcbe60bdcd324183a4ea51cb"},{url:"index.html",revision:"f85a016afe044fd8f3ac79174bfd546f"},{url:"offline.html",revision:"93575b7d87e8dc7782c3f1df327f85a3"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"service-worker.js",revision:"e57492d2af4ad99a53a43b710f293739"},{url:"logo.png",revision:"c13be39bc35c2df799f625c5767918b6"},{url:"manifest.webmanifest",revision:"aa5a849eeb44afe7539727a2f18fe480"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
