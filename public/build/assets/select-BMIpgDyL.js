import{R as Q,j as r,r as n}from"./app-B0LyX4Ia.js";import{a as Ee,u as O,S as Se,P as A,r as _e,b as z}from"./input-DFf3wjqo.js";import{c as Me,a as be,u as Ne,m as G,b,e as xt,n as St,h as wt,g as yt,f as Ct,F as It,D as Tt}from"./index-kiGpvPed.js";import{c as je,R as Nt,A as Rt,C as bt,a as Pt,b as Et}from"./index-GLr8_9FT.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Ae=Ee("ChevronDown",_t);/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],jt=Ee("ChevronUp",Mt);function Pe(t,[o,e]){return Math.min(e,Math.max(o,t))}function At(t){const o=t+"CollectionProvider",[e,a]=Me(o),[i,p]=e(o,{collectionRef:{current:null},itemMap:new Map}),l=y=>{const{scope:S,children:d}=y,h=Q.useRef(null),x=Q.useRef(new Map).current;return r.jsx(i,{scope:S,itemMap:x,collectionRef:h,children:d})};l.displayName=o;const c=t+"CollectionSlot",s=Q.forwardRef((y,S)=>{const{scope:d,children:h}=y,x=p(c,d),u=O(S,x.collectionRef);return r.jsx(Se,{ref:u,children:h})});s.displayName=c;const f=t+"CollectionItemSlot",v="data-radix-collection-item",w=Q.forwardRef((y,S)=>{const{scope:d,children:h,...x}=y,u=Q.useRef(null),m=O(S,u),P=p(f,d);return Q.useEffect(()=>(P.itemMap.set(u,{ref:u,...x}),()=>void P.itemMap.delete(u))),r.jsx(Se,{[v]:"",ref:m,children:h})});w.displayName=f;function R(y){const S=p(t+"CollectionConsumer",y);return Q.useCallback(()=>{const h=S.collectionRef.current;if(!h)return[];const x=Array.from(h.querySelectorAll(`[${v}]`));return Array.from(S.itemMap.values()).sort((P,M)=>x.indexOf(P.ref.current)-x.indexOf(M.ref.current))},[S.collectionRef,S.itemMap])}return[{Provider:l,Slot:s,ItemSlot:w},R,a]}var Ot=n.createContext(void 0);function Dt(t){const o=n.useContext(Ot);return t||o||"ltr"}function Lt(t){const o=n.useRef({value:t,previous:t});return n.useMemo(()=>(o.current.value!==t&&(o.current.previous=o.current.value,o.current.value=t),o.current.previous),[t])}var kt="VisuallyHidden",Oe=n.forwardRef((t,o)=>r.jsx(A.span,{...t,ref:o,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...t.style}}));Oe.displayName=kt;var Vt=[" ","Enter","ArrowUp","ArrowDown"],Bt=[" ","Enter"],le="Select",[de,ue,Ht]=At(le),[oe,wo]=Me(le,[Ht,je]),pe=je(),[Ft,q]=oe(le),[Wt,Ut]=oe(le),De=t=>{const{__scopeSelect:o,children:e,open:a,defaultOpen:i,onOpenChange:p,value:l,defaultValue:c,onValueChange:s,dir:f,name:v,autoComplete:w,disabled:R,required:y,form:S}=t,d=pe(o),[h,x]=n.useState(null),[u,m]=n.useState(null),[P,M]=n.useState(!1),ne=Dt(f),[E=!1,L]=be({prop:a,defaultProp:i,onChange:p}),[U,X]=be({prop:l,defaultProp:c,onChange:s}),V=n.useRef(null),B=h?S||!!h.closest("form"):!0,[K,H]=n.useState(new Set),F=Array.from(K).map(_=>_.props.value).join(";");return r.jsx(Nt,{...d,children:r.jsxs(Ft,{required:y,scope:o,trigger:h,onTriggerChange:x,valueNode:u,onValueNodeChange:m,valueNodeHasChildren:P,onValueNodeHasChildrenChange:M,contentId:Ne(),value:U,onValueChange:X,open:E,onOpenChange:L,dir:ne,triggerPointerDownPosRef:V,disabled:R,children:[r.jsx(de.Provider,{scope:o,children:r.jsx(Wt,{scope:t.__scopeSelect,onNativeOptionAdd:n.useCallback(_=>{H(k=>new Set(k).add(_))},[]),onNativeOptionRemove:n.useCallback(_=>{H(k=>{const W=new Set(k);return W.delete(_),W})},[]),children:e})}),B?r.jsxs(lt,{"aria-hidden":!0,required:y,tabIndex:-1,name:v,autoComplete:w,value:U,onChange:_=>X(_.target.value),disabled:R,form:S,children:[U===void 0?r.jsx("option",{value:""}):null,Array.from(K)]},F):null]})})};De.displayName=le;var Le="SelectTrigger",ke=n.forwardRef((t,o)=>{const{__scopeSelect:e,disabled:a=!1,...i}=t,p=pe(e),l=q(Le,e),c=l.disabled||a,s=O(o,l.onTriggerChange),f=ue(e),v=n.useRef("touch"),[w,R,y]=at(d=>{const h=f().filter(m=>!m.disabled),x=h.find(m=>m.value===l.value),u=ct(h,d,x);u!==void 0&&l.onValueChange(u.value)}),S=d=>{c||(l.onOpenChange(!0),y()),d&&(l.triggerPointerDownPosRef.current={x:Math.round(d.pageX),y:Math.round(d.pageY)})};return r.jsx(Rt,{asChild:!0,...p,children:r.jsx(A.button,{type:"button",role:"combobox","aria-controls":l.contentId,"aria-expanded":l.open,"aria-required":l.required,"aria-autocomplete":"none",dir:l.dir,"data-state":l.open?"open":"closed",disabled:c,"data-disabled":c?"":void 0,"data-placeholder":st(l.value)?"":void 0,...i,ref:s,onClick:b(i.onClick,d=>{d.currentTarget.focus(),v.current!=="mouse"&&S(d)}),onPointerDown:b(i.onPointerDown,d=>{v.current=d.pointerType;const h=d.target;h.hasPointerCapture(d.pointerId)&&h.releasePointerCapture(d.pointerId),d.button===0&&d.ctrlKey===!1&&d.pointerType==="mouse"&&(S(d),d.preventDefault())}),onKeyDown:b(i.onKeyDown,d=>{const h=w.current!=="";!(d.ctrlKey||d.altKey||d.metaKey)&&d.key.length===1&&R(d.key),!(h&&d.key===" ")&&Vt.includes(d.key)&&(S(),d.preventDefault())})})})});ke.displayName=Le;var Ve="SelectValue",Be=n.forwardRef((t,o)=>{const{__scopeSelect:e,className:a,style:i,children:p,placeholder:l="",...c}=t,s=q(Ve,e),{onValueNodeHasChildrenChange:f}=s,v=p!==void 0,w=O(o,s.onValueNodeChange);return G(()=>{f(v)},[f,v]),r.jsx(A.span,{...c,ref:w,style:{pointerEvents:"none"},children:st(s.value)?r.jsx(r.Fragment,{children:l}):p})});Be.displayName=Ve;var Kt="SelectIcon",He=n.forwardRef((t,o)=>{const{__scopeSelect:e,children:a,...i}=t;return r.jsx(A.span,{"aria-hidden":!0,...i,ref:o,children:a||"▼"})});He.displayName=Kt;var $t="SelectPortal",Fe=t=>r.jsx(xt,{asChild:!0,...t});Fe.displayName=$t;var ee="SelectContent",We=n.forwardRef((t,o)=>{const e=q(ee,t.__scopeSelect),[a,i]=n.useState();if(G(()=>{i(new DocumentFragment)},[]),!e.open){const p=a;return p?_e.createPortal(r.jsx(Ue,{scope:t.__scopeSelect,children:r.jsx(de.Slot,{scope:t.__scopeSelect,children:r.jsx("div",{children:t.children})})}),p):null}return r.jsx(Ke,{...t,ref:o})});We.displayName=ee;var D=10,[Ue,Y]=oe(ee),zt="SelectContentImpl",Ke=n.forwardRef((t,o)=>{const{__scopeSelect:e,position:a="item-aligned",onCloseAutoFocus:i,onEscapeKeyDown:p,onPointerDownOutside:l,side:c,sideOffset:s,align:f,alignOffset:v,arrowPadding:w,collisionBoundary:R,collisionPadding:y,sticky:S,hideWhenDetached:d,avoidCollisions:h,...x}=t,u=q(ee,e),[m,P]=n.useState(null),[M,ne]=n.useState(null),E=O(o,g=>P(g)),[L,U]=n.useState(null),[X,V]=n.useState(null),B=ue(e),[K,H]=n.useState(!1),F=n.useRef(!1);n.useEffect(()=>{if(m)return wt(m)},[m]),yt();const _=n.useCallback(g=>{const[N,...j]=B().map(I=>I.ref.current),[T]=j.slice(-1),C=document.activeElement;for(const I of g)if(I===C||(I==null||I.scrollIntoView({block:"nearest"}),I===N&&M&&(M.scrollTop=0),I===T&&M&&(M.scrollTop=M.scrollHeight),I==null||I.focus(),document.activeElement!==C))return},[B,M]),k=n.useCallback(()=>_([L,m]),[_,L,m]);n.useEffect(()=>{K&&k()},[K,k]);const{onOpenChange:W,triggerPointerDownPosRef:$}=u;n.useEffect(()=>{if(m){let g={x:0,y:0};const N=T=>{var C,I;g={x:Math.abs(Math.round(T.pageX)-(((C=$.current)==null?void 0:C.x)??0)),y:Math.abs(Math.round(T.pageY)-(((I=$.current)==null?void 0:I.y)??0))}},j=T=>{g.x<=10&&g.y<=10?T.preventDefault():m.contains(T.target)||W(!1),document.removeEventListener("pointermove",N),$.current=null};return $.current!==null&&(document.addEventListener("pointermove",N),document.addEventListener("pointerup",j,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",N),document.removeEventListener("pointerup",j,{capture:!0})}}},[m,W,$]),n.useEffect(()=>{const g=()=>W(!1);return window.addEventListener("blur",g),window.addEventListener("resize",g),()=>{window.removeEventListener("blur",g),window.removeEventListener("resize",g)}},[W]);const[fe,ae]=at(g=>{const N=B().filter(C=>!C.disabled),j=N.find(C=>C.ref.current===document.activeElement),T=ct(N,g,j);T&&setTimeout(()=>T.ref.current.focus())}),me=n.useCallback((g,N,j)=>{const T=!F.current&&!j;(u.value!==void 0&&u.value===N||T)&&(U(g),T&&(F.current=!0))},[u.value]),he=n.useCallback(()=>m==null?void 0:m.focus(),[m]),te=n.useCallback((g,N,j)=>{const T=!F.current&&!j;(u.value!==void 0&&u.value===N||T)&&V(g)},[u.value]),ce=a==="popper"?we:$e,re=ce===we?{side:c,sideOffset:s,align:f,alignOffset:v,arrowPadding:w,collisionBoundary:R,collisionPadding:y,sticky:S,hideWhenDetached:d,avoidCollisions:h}:{};return r.jsx(Ue,{scope:e,content:m,viewport:M,onViewportChange:ne,itemRefCallback:me,selectedItem:L,onItemLeave:he,itemTextRefCallback:te,focusSelectedItem:k,selectedItemText:X,position:a,isPositioned:K,searchRef:fe,children:r.jsx(Ct,{as:Se,allowPinchZoom:!0,children:r.jsx(It,{asChild:!0,trapped:u.open,onMountAutoFocus:g=>{g.preventDefault()},onUnmountAutoFocus:b(i,g=>{var N;(N=u.trigger)==null||N.focus({preventScroll:!0}),g.preventDefault()}),children:r.jsx(Tt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:p,onPointerDownOutside:l,onFocusOutside:g=>g.preventDefault(),onDismiss:()=>u.onOpenChange(!1),children:r.jsx(ce,{role:"listbox",id:u.contentId,"data-state":u.open?"open":"closed",dir:u.dir,onContextMenu:g=>g.preventDefault(),...x,...re,onPlaced:()=>H(!0),ref:E,style:{display:"flex",flexDirection:"column",outline:"none",...x.style},onKeyDown:b(x.onKeyDown,g=>{const N=g.ctrlKey||g.altKey||g.metaKey;if(g.key==="Tab"&&g.preventDefault(),!N&&g.key.length===1&&ae(g.key),["ArrowUp","ArrowDown","Home","End"].includes(g.key)){let T=B().filter(C=>!C.disabled).map(C=>C.ref.current);if(["ArrowUp","End"].includes(g.key)&&(T=T.slice().reverse()),["ArrowUp","ArrowDown"].includes(g.key)){const C=g.target,I=T.indexOf(C);T=T.slice(I+1)}setTimeout(()=>_(T)),g.preventDefault()}})})})})})})});Ke.displayName=zt;var Gt="SelectItemAlignedPosition",$e=n.forwardRef((t,o)=>{const{__scopeSelect:e,onPlaced:a,...i}=t,p=q(ee,e),l=Y(ee,e),[c,s]=n.useState(null),[f,v]=n.useState(null),w=O(o,E=>v(E)),R=ue(e),y=n.useRef(!1),S=n.useRef(!0),{viewport:d,selectedItem:h,selectedItemText:x,focusSelectedItem:u}=l,m=n.useCallback(()=>{if(p.trigger&&p.valueNode&&c&&f&&d&&h&&x){const E=p.trigger.getBoundingClientRect(),L=f.getBoundingClientRect(),U=p.valueNode.getBoundingClientRect(),X=x.getBoundingClientRect();if(p.dir!=="rtl"){const C=X.left-L.left,I=U.left-C,Z=E.left-I,J=E.width+Z,ge=Math.max(J,L.width),ve=window.innerWidth-D,xe=Pe(I,[D,Math.max(D,ve-ge)]);c.style.minWidth=J+"px",c.style.left=xe+"px"}else{const C=L.right-X.right,I=window.innerWidth-U.right-C,Z=window.innerWidth-E.right-I,J=E.width+Z,ge=Math.max(J,L.width),ve=window.innerWidth-D,xe=Pe(I,[D,Math.max(D,ve-ge)]);c.style.minWidth=J+"px",c.style.right=xe+"px"}const V=R(),B=window.innerHeight-D*2,K=d.scrollHeight,H=window.getComputedStyle(f),F=parseInt(H.borderTopWidth,10),_=parseInt(H.paddingTop,10),k=parseInt(H.borderBottomWidth,10),W=parseInt(H.paddingBottom,10),$=F+_+K+W+k,fe=Math.min(h.offsetHeight*5,$),ae=window.getComputedStyle(d),me=parseInt(ae.paddingTop,10),he=parseInt(ae.paddingBottom,10),te=E.top+E.height/2-D,ce=B-te,re=h.offsetHeight/2,g=h.offsetTop+re,N=F+_+g,j=$-N;if(N<=te){const C=V.length>0&&h===V[V.length-1].ref.current;c.style.bottom="0px";const I=f.clientHeight-d.offsetTop-d.offsetHeight,Z=Math.max(ce,re+(C?he:0)+I+k),J=N+Z;c.style.height=J+"px"}else{const C=V.length>0&&h===V[0].ref.current;c.style.top="0px";const Z=Math.max(te,F+d.offsetTop+(C?me:0)+re)+j;c.style.height=Z+"px",d.scrollTop=N-te+d.offsetTop}c.style.margin=`${D}px 0`,c.style.minHeight=fe+"px",c.style.maxHeight=B+"px",a==null||a(),requestAnimationFrame(()=>y.current=!0)}},[R,p.trigger,p.valueNode,c,f,d,h,x,p.dir,a]);G(()=>m(),[m]);const[P,M]=n.useState();G(()=>{f&&M(window.getComputedStyle(f).zIndex)},[f]);const ne=n.useCallback(E=>{E&&S.current===!0&&(m(),u==null||u(),S.current=!1)},[m,u]);return r.jsx(Yt,{scope:e,contentWrapper:c,shouldExpandOnScrollRef:y,onScrollButtonChange:ne,children:r.jsx("div",{ref:s,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:P},children:r.jsx(A.div,{...i,ref:w,style:{boxSizing:"border-box",maxHeight:"100%",...i.style}})})})});$e.displayName=Gt;var qt="SelectPopperPosition",we=n.forwardRef((t,o)=>{const{__scopeSelect:e,align:a="start",collisionPadding:i=D,...p}=t,l=pe(e);return r.jsx(bt,{...l,...p,ref:o,align:a,collisionPadding:i,style:{boxSizing:"border-box",...p.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});we.displayName=qt;var[Yt,Re]=oe(ee,{}),ye="SelectViewport",ze=n.forwardRef((t,o)=>{const{__scopeSelect:e,nonce:a,...i}=t,p=Y(ye,e),l=Re(ye,e),c=O(o,p.onViewportChange),s=n.useRef(0);return r.jsxs(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:a}),r.jsx(de.Slot,{scope:e,children:r.jsx(A.div,{"data-radix-select-viewport":"",role:"presentation",...i,ref:c,style:{position:"relative",flex:1,overflow:"hidden auto",...i.style},onScroll:b(i.onScroll,f=>{const v=f.currentTarget,{contentWrapper:w,shouldExpandOnScrollRef:R}=l;if(R!=null&&R.current&&w){const y=Math.abs(s.current-v.scrollTop);if(y>0){const S=window.innerHeight-D*2,d=parseFloat(w.style.minHeight),h=parseFloat(w.style.height),x=Math.max(d,h);if(x<S){const u=x+y,m=Math.min(S,u),P=u-m;w.style.height=m+"px",w.style.bottom==="0px"&&(v.scrollTop=P>0?P:0,w.style.justifyContent="flex-end")}}}s.current=v.scrollTop})})})]})});ze.displayName=ye;var Ge="SelectGroup",[Xt,Zt]=oe(Ge),Jt=n.forwardRef((t,o)=>{const{__scopeSelect:e,...a}=t,i=Ne();return r.jsx(Xt,{scope:e,id:i,children:r.jsx(A.div,{role:"group","aria-labelledby":i,...a,ref:o})})});Jt.displayName=Ge;var qe="SelectLabel",Ye=n.forwardRef((t,o)=>{const{__scopeSelect:e,...a}=t,i=Zt(qe,e);return r.jsx(A.div,{id:i.id,...a,ref:o})});Ye.displayName=qe;var ie="SelectItem",[Qt,Xe]=oe(ie),Ze=n.forwardRef((t,o)=>{const{__scopeSelect:e,value:a,disabled:i=!1,textValue:p,...l}=t,c=q(ie,e),s=Y(ie,e),f=c.value===a,[v,w]=n.useState(p??""),[R,y]=n.useState(!1),S=O(o,u=>{var m;return(m=s.itemRefCallback)==null?void 0:m.call(s,u,a,i)}),d=Ne(),h=n.useRef("touch"),x=()=>{i||(c.onValueChange(a),c.onOpenChange(!1))};if(a==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return r.jsx(Qt,{scope:e,value:a,disabled:i,textId:d,isSelected:f,onItemTextChange:n.useCallback(u=>{w(m=>m||((u==null?void 0:u.textContent)??"").trim())},[]),children:r.jsx(de.ItemSlot,{scope:e,value:a,disabled:i,textValue:v,children:r.jsx(A.div,{role:"option","aria-labelledby":d,"data-highlighted":R?"":void 0,"aria-selected":f&&R,"data-state":f?"checked":"unchecked","aria-disabled":i||void 0,"data-disabled":i?"":void 0,tabIndex:i?void 0:-1,...l,ref:S,onFocus:b(l.onFocus,()=>y(!0)),onBlur:b(l.onBlur,()=>y(!1)),onClick:b(l.onClick,()=>{h.current!=="mouse"&&x()}),onPointerUp:b(l.onPointerUp,()=>{h.current==="mouse"&&x()}),onPointerDown:b(l.onPointerDown,u=>{h.current=u.pointerType}),onPointerMove:b(l.onPointerMove,u=>{var m;h.current=u.pointerType,i?(m=s.onItemLeave)==null||m.call(s):h.current==="mouse"&&u.currentTarget.focus({preventScroll:!0})}),onPointerLeave:b(l.onPointerLeave,u=>{var m;u.currentTarget===document.activeElement&&((m=s.onItemLeave)==null||m.call(s))}),onKeyDown:b(l.onKeyDown,u=>{var P;((P=s.searchRef)==null?void 0:P.current)!==""&&u.key===" "||(Bt.includes(u.key)&&x(),u.key===" "&&u.preventDefault())})})})})});Ze.displayName=ie;var se="SelectItemText",Je=n.forwardRef((t,o)=>{const{__scopeSelect:e,className:a,style:i,...p}=t,l=q(se,e),c=Y(se,e),s=Xe(se,e),f=Ut(se,e),[v,w]=n.useState(null),R=O(o,x=>w(x),s.onItemTextChange,x=>{var u;return(u=c.itemTextRefCallback)==null?void 0:u.call(c,x,s.value,s.disabled)}),y=v==null?void 0:v.textContent,S=n.useMemo(()=>r.jsx("option",{value:s.value,disabled:s.disabled,children:y},s.value),[s.disabled,s.value,y]),{onNativeOptionAdd:d,onNativeOptionRemove:h}=f;return G(()=>(d(S),()=>h(S)),[d,h,S]),r.jsxs(r.Fragment,{children:[r.jsx(A.span,{id:s.textId,...p,ref:R}),s.isSelected&&l.valueNode&&!l.valueNodeHasChildren?_e.createPortal(p.children,l.valueNode):null]})});Je.displayName=se;var Qe="SelectItemIndicator",et=n.forwardRef((t,o)=>{const{__scopeSelect:e,...a}=t;return Xe(Qe,e).isSelected?r.jsx(A.span,{"aria-hidden":!0,...a,ref:o}):null});et.displayName=Qe;var Ce="SelectScrollUpButton",tt=n.forwardRef((t,o)=>{const e=Y(Ce,t.__scopeSelect),a=Re(Ce,t.__scopeSelect),[i,p]=n.useState(!1),l=O(o,a.onScrollButtonChange);return G(()=>{if(e.viewport&&e.isPositioned){let c=function(){const f=s.scrollTop>0;p(f)};const s=e.viewport;return c(),s.addEventListener("scroll",c),()=>s.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),i?r.jsx(nt,{...t,ref:l,onAutoScroll:()=>{const{viewport:c,selectedItem:s}=e;c&&s&&(c.scrollTop=c.scrollTop-s.offsetHeight)}}):null});tt.displayName=Ce;var Ie="SelectScrollDownButton",ot=n.forwardRef((t,o)=>{const e=Y(Ie,t.__scopeSelect),a=Re(Ie,t.__scopeSelect),[i,p]=n.useState(!1),l=O(o,a.onScrollButtonChange);return G(()=>{if(e.viewport&&e.isPositioned){let c=function(){const f=s.scrollHeight-s.clientHeight,v=Math.ceil(s.scrollTop)<f;p(v)};const s=e.viewport;return c(),s.addEventListener("scroll",c),()=>s.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),i?r.jsx(nt,{...t,ref:l,onAutoScroll:()=>{const{viewport:c,selectedItem:s}=e;c&&s&&(c.scrollTop=c.scrollTop+s.offsetHeight)}}):null});ot.displayName=Ie;var nt=n.forwardRef((t,o)=>{const{__scopeSelect:e,onAutoScroll:a,...i}=t,p=Y("SelectScrollButton",e),l=n.useRef(null),c=ue(e),s=n.useCallback(()=>{l.current!==null&&(window.clearInterval(l.current),l.current=null)},[]);return n.useEffect(()=>()=>s(),[s]),G(()=>{var v;const f=c().find(w=>w.ref.current===document.activeElement);(v=f==null?void 0:f.ref.current)==null||v.scrollIntoView({block:"nearest"})},[c]),r.jsx(A.div,{"aria-hidden":!0,...i,ref:o,style:{flexShrink:0,...i.style},onPointerDown:b(i.onPointerDown,()=>{l.current===null&&(l.current=window.setInterval(a,50))}),onPointerMove:b(i.onPointerMove,()=>{var f;(f=p.onItemLeave)==null||f.call(p),l.current===null&&(l.current=window.setInterval(a,50))}),onPointerLeave:b(i.onPointerLeave,()=>{s()})})}),eo="SelectSeparator",rt=n.forwardRef((t,o)=>{const{__scopeSelect:e,...a}=t;return r.jsx(A.div,{"aria-hidden":!0,...a,ref:o})});rt.displayName=eo;var Te="SelectArrow",to=n.forwardRef((t,o)=>{const{__scopeSelect:e,...a}=t,i=pe(e),p=q(Te,e),l=Y(Te,e);return p.open&&l.position==="popper"?r.jsx(Pt,{...i,...a,ref:o}):null});to.displayName=Te;function st(t){return t===""||t===void 0}var lt=n.forwardRef((t,o)=>{const{value:e,...a}=t,i=n.useRef(null),p=O(o,i),l=Lt(e);return n.useEffect(()=>{const c=i.current,s=window.HTMLSelectElement.prototype,v=Object.getOwnPropertyDescriptor(s,"value").set;if(l!==e&&v){const w=new Event("change",{bubbles:!0});v.call(c,e),c.dispatchEvent(w)}},[l,e]),r.jsx(Oe,{asChild:!0,children:r.jsx("select",{...a,ref:p,defaultValue:e})})});lt.displayName="BubbleSelect";function at(t){const o=St(t),e=n.useRef(""),a=n.useRef(0),i=n.useCallback(l=>{const c=e.current+l;o(c),function s(f){e.current=f,window.clearTimeout(a.current),f!==""&&(a.current=window.setTimeout(()=>s(""),1e3))}(c)},[o]),p=n.useCallback(()=>{e.current="",window.clearTimeout(a.current)},[]);return n.useEffect(()=>()=>window.clearTimeout(a.current),[]),[e,i,p]}function ct(t,o,e){const i=o.length>1&&Array.from(o).every(f=>f===o[0])?o[0]:o,p=e?t.indexOf(e):-1;let l=oo(t,Math.max(p,0));i.length===1&&(l=l.filter(f=>f!==e));const s=l.find(f=>f.textValue.toLowerCase().startsWith(i.toLowerCase()));return s!==e?s:void 0}function oo(t,o){return t.map((e,a)=>t[(o+a)%t.length])}var no=De,it=ke,ro=Be,so=He,lo=Fe,dt=We,ao=ze,ut=Ye,pt=Ze,co=Je,io=et,ft=tt,mt=ot,ht=rt;const yo=no,Co=ro,uo=n.forwardRef(({className:t,children:o,...e},a)=>r.jsxs(it,{ref:a,className:z("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",t),...e,children:[o,r.jsx(so,{asChild:!0,children:r.jsx(Ae,{className:"h-4 w-4 opacity-50"})})]}));uo.displayName=it.displayName;const gt=n.forwardRef(({className:t,...o},e)=>r.jsx(ft,{ref:e,className:z("flex cursor-default items-center justify-center py-1",t),...o,children:r.jsx(jt,{className:"h-4 w-4"})}));gt.displayName=ft.displayName;const vt=n.forwardRef(({className:t,...o},e)=>r.jsx(mt,{ref:e,className:z("flex cursor-default items-center justify-center py-1",t),...o,children:r.jsx(Ae,{className:"h-4 w-4"})}));vt.displayName=mt.displayName;const po=n.forwardRef(({className:t,children:o,position:e="popper",...a},i)=>r.jsx(lo,{children:r.jsxs(dt,{ref:i,className:z("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...a,children:[r.jsx(gt,{}),r.jsx(ao,{className:z("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:o}),r.jsx(vt,{})]})}));po.displayName=dt.displayName;const fo=n.forwardRef(({className:t,...o},e)=>r.jsx(ut,{ref:e,className:z("px-2 py-1.5 text-sm font-semibold",t),...o}));fo.displayName=ut.displayName;const mo=n.forwardRef(({className:t,children:o,...e},a)=>r.jsxs(pt,{ref:a,className:z("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...e,children:[r.jsx("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(io,{children:r.jsx(Et,{className:"h-4 w-4"})})}),r.jsx(co,{children:o})]}));mo.displayName=pt.displayName;const ho=n.forwardRef(({className:t,...o},e)=>r.jsx(ht,{ref:e,className:z("-mx-1 my-1 h-px bg-muted",t),...o}));ho.displayName=ht.displayName;export{yo as S,uo as a,Co as b,po as c,mo as d};
