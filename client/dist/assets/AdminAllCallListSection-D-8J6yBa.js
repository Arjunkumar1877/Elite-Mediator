import{u as y,r as d,j as t,af as h,ag as j,ah as S,ai as C,aj as k,ao as I,ap as A}from"./vendor-tgZ2SDwj.js";import{u as _}from"./index-310xL3pC.js";const M=()=>{const{currentAdmin:a}=y(e=>e.admin),[m,g]=d.useState([]),{socket:x,setIsVideoCall:p}=_(),[n,u]=d.useState(1),[c,N]=d.useState(0),f=async(e=!1,s,i,r)=>{try{p(e),x.emit("join room",s);const l=await(await fetch("/api/start_call",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({callData:{conversationId:s,callerId:a._id,adminId:a._id,userId:i,caller:"Admin",callType:e?"video":"audio",receiver:"User"},token:r,username:a.username})})).json();l._id&&x.emit("incoming-call",{conId:s,incommingId:a._id,adminId:a._id,callerId:l._id,videoCall:!!e,admin:!0})}catch(o){console.error("Error starting call:",o)}};function w(e){const s=Math.floor(e/1e3%60),i=Math.floor(e/(1e3*60)%60),r=Math.floor(e/(1e3*60*60)%24),o=s<10?`0${s}`:s.toString(),l=i<10?`0${i}`:i.toString(),v=r<10?`0${r}`:r.toString();return r===0?`${l}:${o}`:`${v}:${l}:${o}`}const b=async()=>{try{const s=await(await fetch(`/api/get_calls/${a._id}/${n}`)).json();console.log(s),s&&(g(s.calls),N(Math.ceil(s.totalCalls/10)))}catch(e){console.log(e)}};return d.useEffect(()=>{b()},[n]),t.jsxs("div",{className:"container mx-auto flex flex-col",children:[t.jsxs("div",{className:"p-4 w-full h-full border-2 rounded-lg shadow-lg bg-white",children:[t.jsx("div",{className:"flex justify-between h-full items-center px-5 py-2 border-b cursor-pointer",children:t.jsx("h2",{className:"text-2xl font-bold",children:"All Calls"})}),t.jsx("div",{className:"overflow-y-scroll max-h-[540px]",children:m&&m.map(e=>{var s;return t.jsxs("div",{className:"flex items-center h-[70px] rounded-lg justify-between border-b mt-2 p-2 hover:bg-gray-100",children:[t.jsxs("div",{className:"flex flex-col w-2/3",children:[t.jsx("span",{className:"text-xs md:text-sm text-gray-500",children:new Date(e.createdAt).toLocaleString()}),t.jsx("span",{className:"text-sm md:text-lg font-semibold",children:(s=e==null?void 0:e.userId)==null?void 0:s.username}),t.jsxs("div",{className:"flex items-center gap-3 text-xs md:text-sm text-gray-500",children:[e.caller==="Admin"?t.jsx(h,{className:"text-blue-500"}):t.jsx(j,{className:"text-green-500"}),t.jsx("span",{children:e.caller==="Admin"?"Outgoing":"Incoming"}),t.jsx("span",{children:(e==null?void 0:e.callDuration)&&t.jsxs(t.Fragment,{children:["Call Duration: ",w(e==null?void 0:e.callDuration)]})})]})]}),t.jsxs("div",{className:"flex flex-col items-center gap-1 w-1/3",children:[t.jsx("div",{className:"flex items-center gap-2",children:e.callType==="video"?t.jsx(S,{onClick:()=>f(!0,e.conversationId,e.userId._id,e.userId.fcmToken),className:"cursor-pointer text-red-500"}):t.jsx(h,{onClick:()=>f(!1,e.conversationId,e.userId._id,e.userId.fcmToken),className:"cursor-pointer text-green-500"})}),t.jsxs("div",{className:"flex items-center gap-2",children:[e.callStatus==="answered"&&t.jsx(C,{className:"text-green-500"}),e.callStatus==="declined"&&t.jsx(k,{className:"text-red-500"}),e.callStatus!=="answered"&&e.callStatus!=="declined"&&t.jsx(j,{className:"text-yellow-500"}),t.jsx("span",{className:"text-xs md:text-sm",children:e.callStatus==="answered"?"Answered":e.callStatus==="declined"?"Declined":"Missed"})]})]})]},e._id)})})]}),t.jsxs("div",{className:"flex justify-between items-center mt-4",children:[t.jsx("button",{className:"p-2 bg-sky-500 text-white rounded",onClick:()=>u(e=>Math.max(e-1,1)),disabled:n===1,children:t.jsx(I,{})}),t.jsxs("span",{children:["Page ",n," of ",c]}),t.jsx("button",{className:"p-2 bg-sky-500 text-white rounded",onClick:()=>u(e=>Math.min(e+1,c)),disabled:n===c,children:t.jsx(A,{})})]})]})};export{M as default};
