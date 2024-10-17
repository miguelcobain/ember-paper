"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[277],{424:(e,t,i)=>{i.r(t),i.d(t,{graphFor:()=>U,isBelongsTo:()=>u,peekGraph:()=>H})
var r=i(603),n=i(921),s=i(175)
function o(e){return e._store}function a(e,t,i){return(e[t]=e[t]||Object.create(null))[i]}function l(e,t,i,r){(e[t]=e[t]||Object.create(null))[i]=r}function c(e){if(!e.id)return!0
const t=(0,n.oX)(e)
return Boolean(t?.isNew(e))}function u(e){return"belongsTo"===e.definition.kind}function h(e){return e.definition.isImplicit}function d(e){return"hasMany"===e.definition.kind}function f(e,t){if(u(e))e.remoteState&&t(e.remoteState),e.localState&&e.localState!==e.remoteState&&t(e.localState)
else if(d(e)){for(let i=0;i<e.remoteState.length;i++){const r=e.remoteState[i]
t(r)}e.additions?.forEach(t)}else e.localMembers.forEach(t),e.remoteMembers.forEach((i=>{e.localMembers.has(i)||t(i)}))}function p(e,t,i,r){if(u(t))t.remoteState===i&&(t.remoteState=null),t.localState===i&&(t.localState=null,y(e,t.identifier,t.definition.key))
else if(d(t)){t.remoteMembers.delete(i),t.additions?.delete(i)
const r=t.removals?.delete(i),n=t.remoteState.indexOf(i)
if(-1!==n&&t.remoteState.splice(n,1),!r){const r=t.localState?.indexOf(i);-1!==r&&void 0!==r&&(t.localState.splice(r,1),y(e,t.identifier,t.definition.key))}}else t.remoteMembers.delete(i),t.localMembers.delete(i)}function y(e,t,i){t!==e._removing&&e.store.notifyChange(t,"relationships",i)}function g(e){return"belongsTo"===e.kind||"hasMany"===e.kind}const m=null,v=Date.now()
function b(e,t){return`implicit-${e}:${t}${v}`}function _(e,t){e.inverseKind=t.kind,e.inverseKey=t.key,e.inverseType=t.type,e.inverseIsAsync=t.isAsync,e.inverseIsCollection=t.isCollection,e.inverseIsPolymorphic=t.isPolymorphic,e.inverseIsImplicit=t.isImplicit
const i=!1!==e.resetOnRemoteUpdate&&!1!==t.resetOnRemoteUpdate
e.resetOnRemoteUpdate=i,t.resetOnRemoteUpdate=i}function w(e){var t
g(e)||(e={kind:"resource"===(t=e).kind?"belongsTo":"hasMany",name:t.name,type:t.type,options:Object.assign({},{async:!1,inverse:null,resetOnRemoteUpdate:!1},t.options)})
const i={},r=e.options
return i.kind=e.kind,i.key=e.name,i.type=e.type,i.isAsync=r.async,i.isImplicit=!1,i.isCollection="hasMany"===e.kind,i.isPolymorphic=r&&!!r.polymorphic,i.inverseKey=r&&r.inverse||"",i.inverseType="",i.inverseIsAsync=m,i.inverseIsImplicit=r&&null===r.inverse||m,i.inverseIsCollection=m,i.resetOnRemoteUpdate=!!g(e)&&!1!==e.options?.resetOnRemoteUpdate,i}function k(e,t,i){i?function(e,t,i){const n=t.value,s=e.get(t.record,t.field)
i&&e._addToTransaction(s),s.state.hasReceivedData=!0
const{definition:o}=s,{type:a}=s.definition,l=C(n,s,(r=>{a!==r.type&&e.registerPolymorphicType(a,r.type),s.additions?.has(r)?s.additions.delete(r):s.isDirty=!0,A(e,r,o.inverseKey,t.record,i)}),(r=>{s.removals?.has(r)?s.removals.delete(r):s.isDirty=!0,S(e,r,o.inverseKey,t.record,i)}))
if(s.remoteMembers=l.finalSet,s.remoteState=l.finalState,l.changed&&(s.isDirty=!0),s._diff=l,"hasMany"===s.definition.kind&&!1!==s.definition.resetOnRemoteUpdate){const n={removals:[],additions:[],triggered:!1}
s.removals&&(s.isDirty=!0,s.removals.forEach((r=>{n.triggered=!0,n.removals.push(r),A(e,r,o.inverseKey,t.record,i)})),s.removals=null),s.additions&&(s.additions.forEach((r=>{c(r)||(n.triggered=!0,n.additions.push(r),s.isDirty=!0,s.additions.delete(r),S(e,r,o.inverseKey,t.record,i))})),0===s.additions.size&&(s.additions=null)),n.triggered&&(0,r.deprecate)(`EmberData is changing the default semantics of updates to the remote state of relationships.\n\nThe following local state was cleared from the <${s.identifier.type}>.${s.definition.key} hasMany relationship but will not be once this deprecation is resolved by opting into the new behavior:\n\n\tAdded: [${n.additions.map((e=>e.lid)).join(", ")}]\n\tRemoved: [${n.removals.map((e=>e.lid)).join(", ")}]`,!1,{id:"ember-data:deprecate-relationship-remote-update-clearing-local-state",for:"ember-data",since:{enabled:"5.3",available:"5.3"},until:"6.0",url:"https://deprecations.emberjs.com/v5.x#ember-data-deprecate-relationship-remote-update-clearing-local-state"})}s.isDirty&&R(e,s)}(e,t,i):function(e,t,i){const r=t.value,n=e.get(t.record,t.field),s=0===n.remoteState.length&&null===n.localState&&!1===n.state.hasReceivedData
n.state.hasReceivedData=!0
const{additions:o,removals:a}=n,{inverseKey:l,type:c}=n.definition,{record:u}=t,h=n.isDirty
n.isDirty=!1
const d=r=>{const s=a?.has(r)
!s&&o?.has(r)||(c!==r.type&&e.registerPolymorphicType(c,r.type),n.isDirty=!0,A(e,r,l,t.record,i),s&&a.delete(r))},f=t=>{const r=o?.has(t)
!r&&a?.has(t)||(n.isDirty=!0,S(e,t,l,u,i),r&&o.delete(t))},p=C(r,n,d,f)
n.isDirty||p.changed,o&&o.size>0&&o.forEach((e=>{p.add.has(e)||f(e)})),a&&a.size>0&&a.forEach((e=>{p.del.has(e)||d(e)})),n.additions=p.add,n.removals=p.del,n.localState=p.finalState,n.isDirty=h,(s||!h)&&y(e,t.record,t.field)}(e,t,i)}function A(e,t,i,r,n){const s=e.get(t,i),{type:o}=s.definition
o!==r.type&&e.registerPolymorphicType(o,r.type),u(s)?(s.state.hasReceivedData=!0,s.state.isEmpty=!1,n&&(e._addToTransaction(s),null!==s.remoteState&&S(e,s.remoteState,s.definition.inverseKey,t,n),s.remoteState=r),s.localState!==r&&(!n&&s.localState&&S(e,s.localState,s.definition.inverseKey,t,n),s.localState=r,y(e,t,i))):d(s)?n?s.remoteMembers.has(r)||(e._addToTransaction(s),s.remoteState.push(r),s.remoteMembers.add(r),s.additions?.has(r)?s.additions.delete(r):(s.isDirty=!0,s.state.hasReceivedData=!0,R(e,s))):M(e,0,s,r,null)&&y(e,t,i):n?s.remoteMembers.has(r)||(s.remoteMembers.add(r),s.localMembers.add(r)):s.localMembers.has(r)||s.localMembers.add(r)}function S(e,t,i,r,n){const s=e.get(t,i)
u(s)?(s.state.isEmpty=!0,n&&(e._addToTransaction(s),s.remoteState=null),s.localState===r&&(s.localState=null,y(e,t,i))):d(s)?n?(e._addToTransaction(s),function(e,t){const{remoteMembers:i,additions:r,removals:n,remoteState:s}=e
if(!i.has(t))return!1
i.delete(t)
let o=s.indexOf(t)
return s.splice(o,1),n?.has(t)?(n.delete(t),!1):(e.localState&&(o=e.localState.indexOf(t),e.localState.splice(o,1)),!0)}(s,r)&&y(e,t,i)):E(s,r)&&y(e,t,i):n?(s.remoteMembers.delete(r),s.localMembers.delete(r)):r&&s.localMembers.has(r)&&s.localMembers.delete(r)}function R(e,t){e._scheduleLocalSync(t)}function x(e,t,i=!1){const n=e.get(t.record,t.field)
i&&e._addToTransaction(n)
const{definition:s,state:o}=n,a=i?"remoteState":"localState",l=n[a]
if(t.value!==l)if(l&&S(e,l,s.inverseKey,t.record,i),n[a]=t.value,o.hasReceivedData=!0,o.isEmpty=null===t.value,o.isStale=!1,o.hasFailedLoadAttempt=!1,t.value&&(s.type!==t.value.type&&e.registerPolymorphicType(s.type,t.value.type),A(e,t.value,s.inverseKey,t.record,i)),i){const{localState:t,remoteState:i}=n
if(t&&c(t)&&!i)return
t!==i&&t===l?(n.localState=i,y(e,n.identifier,n.definition.key)):t!==i&&t!==l&&!1!==n.definition.resetOnRemoteUpdate&&(n.localState=i,(0,r.deprecate)(`EmberData is changing the default semantics of updates to the remote state of relationships.\n\nThe following local state was cleared from the <${n.identifier.type}>.${n.definition.key} belongsTo relationship but will not be once this deprecation is resolved:\n\n\t${t?"Added: "+t.lid+"\n\t":""}${l?"Removed: "+l.lid:""}`,!1,{id:"ember-data:deprecate-relationship-remote-update-clearing-local-state",for:"ember-data",since:{enabled:"5.3",available:"5.3"},until:"6.0",url:"https://deprecations.emberjs.com/v5.x#ember-data-deprecate-relationship-remote-update-clearing-local-state"}),y(e,n.identifier,n.definition.key))}else y(e,n.identifier,n.definition.key)
else if(o.hasReceivedData=!0,i){const{localState:o}=n
if(o&&c(o)&&!l)return
l&&o===l?function(e,t,i,r,n){const s=e.get(t,i)
d(s)&&n&&s.remoteMembers.has(r)&&y(e,t,i)}(e,l,s.inverseKey,t.record,i):o!==t.value&&!1!==n.definition.resetOnRemoteUpdate&&(n.localState=l,(0,r.deprecate)(`EmberData is changing the default semantics of updates to the remote state of relationships.\n\nThe following local state was cleared from the <${n.identifier.type}>.${n.definition.key} belongsTo relationship but will not be once this deprecation is resolved:\n\n\t${o?"Added: "+o.lid+"\n\t":""}${l?"Removed: "+l.lid:""}`,!1,{id:"ember-data:deprecate-relationship-remote-update-clearing-local-state",for:"ember-data",since:{enabled:"5.3",available:"5.3"},until:"6.0",url:"https://deprecations.emberjs.com/v5.x#ember-data-deprecate-relationship-remote-update-clearing-local-state"}),y(e,n.identifier,n.definition.key))}}function C(e,t,i,r){const n=new Set(e),{remoteState:s,remoteMembers:o}=t
if(e.length!==n.size){const{diff:t,duplicates:a}=function(e,t,i,r,n,s){const o=e.length,a=i.length,l=Math.max(o,a)
let c=t.size!==r.size
const u=new Set,h=new Set,d=new Map,f=new Set,p=[]
for(let y=0,g=0;y<l;y++){let l,m=!1
if(y<o)if(l=e[y],f.has(l)){let e=d.get(l)
void 0===e&&(e=[],d.set(l,e)),e.push(y)}else p[g]=l,f.add(l),m=!0,r.has(l)||(c=!0,u.add(l),n(l))
if(y<a){const e=i[y]
l!==i[g]&&(c=!0),t.has(e)||(c=!0,h.add(e),s(e))}else m&&g<a&&l!==i[g]&&(c=!0)
m&&g++}return{diff:{add:u,del:h,finalState:p,finalSet:f,changed:c},duplicates:d}}(e,n,s,o,i,r)
return t}return function(e,t,i,r,n,s){const o=e.length,a=i.length,l=Math.max(o,a),c=o===a
let u=t.size!==r.size
const h=new Set,d=new Set
for(let f=0;f<l;f++){let l
if(f<o&&(l=e[f],r.has(l)||(u=!0,h.add(l),n(l))),f<a){const e=i[f]
c&&l!==e&&(u=!0),t.has(e)||(u=!0,d.add(e),s(e))}}return{add:h,del:d,finalState:e,finalSet:t,changed:u}}(e,n,s,o,i,r)}function M(e,t,i,r,n){const{remoteMembers:s,removals:o}=i
let a=i.additions
if((s.has(r)||a?.has(r))&&!o?.has(r))return!1
if(o?.has(r))o.delete(r)
else{a||(a=i.additions=new Set),i.state.hasReceivedData=!0,a.add(r)
const{type:t}=i.definition
t!==r.type&&e.registerPolymorphicType(r.type,t)}return i.localState&&(null!==n?i.localState.splice(n,0,r):i.localState.push(r)),!0}function E(e,t){const{remoteMembers:i,additions:r}=e
let n=e.removals
if(!i.has(t)&&!r?.has(t)||n?.has(t))return!1
if(r?.has(t)?r.delete(t):(n||(n=e.removals=new Set),n.add(t)),e.localState){const i=e.localState.indexOf(t)
e.localState.splice(i,1)}return!0}function O(e,t,i,r){u(r)?x(e,{op:"replaceRelatedRecord",record:t,field:i,value:r.remoteState},!1):k(e,{op:"replaceRelatedRecords",record:t,field:i,value:r.remoteState.slice()},!1)}function T(e){const t={}
return e.state.hasReceivedData&&(t.data=function(e){if(!e.isDirty)return e.localState
const t=e.remoteState.slice()
return e.removals?.forEach((e=>{const i=t.indexOf(e)
t.splice(i,1)})),e.additions?.forEach((e=>{t.push(e)})),e.localState=t,e.isDirty=!1,t}(e)),e.links&&(t.links=e.links),e.meta&&(t.meta=e.meta),t}function P(e,t,i,r,n,s){M(e,0,t,r,n??null)&&A(e,r,t.definition.inverseKey,i,s)}function D(e,t,i,r,n){E(t,r)&&S(e,r,t.definition.inverseKey,i,n)}function j(e){switch(typeof e){case"object":return e
case"string":return{href:e}}}function N(e,t){for(let i=0;i<e.length;i++)e[i]=t.upgradeIdentifier(e[i])
return e}const F=(0,s.L1)("Graphs",new Map)
class L{constructor(e){this._definitionCache=Object.create(null),this._metaCache=Object.create(null),this._potentialPolymorphicTypes=Object.create(null),this.identifiers=new Map,this.store=e,this.isDestroyed=!1,this._willSyncRemote=!1,this._willSyncLocal=!1,this._pushedUpdates={belongsTo:void 0,hasMany:void 0,deletions:[]},this._updatedRelationships=new Set,this._transaction=null,this._removing=null,this.silenceNotifications=!1}has(e,t){const i=this.identifiers.get(e)
return!!i&&void 0!==i[t]}getDefinition(e,t){let i=this._metaCache[e.type],r=i?.[t]
if(!r){const n=function(e,t,i){const r=e._definitionCache,n=e.store,s=e._potentialPolymorphicTypes,{type:c}=t
let u=a(r,c,i)
if(void 0!==u)return u
const h=n.schema.fields(t).get(i)
if(!h){if(s[c]){const e=Object.keys(s[c])
for(let t=0;t<e.length;t++){const n=a(r,e[t],i)
if(n)return l(r,c,i,n),n.rhs_modelNames.push(c),n}}return r[c][i]=null,null}const d=w(h)
let f,p
const y=d.type
if(null===d.inverseKey?f=null:(p=function(e,t,i){const r=e.schema.fields(t).get(i)
return r?r.options.inverse:null}(o(n),t,i),f=!p&&d.isPolymorphic&&d.inverseKey?{kind:"belongsTo",key:d.inverseKey,type:c,isAsync:!1,isImplicit:!1,isCollection:!1,isPolymorphic:!1}:p?w(n.schema.fields({type:y}).get(p)):null),!f){p=b(c,i),f={kind:"implicit",key:p,type:c,isAsync:!1,isImplicit:!0,isCollection:!0,isPolymorphic:!1},_(d,f),_(f,d)
const e={lhs_key:`${c}:${i}`,lhs_modelNames:[c],lhs_baseModelName:c,lhs_relationshipName:i,lhs_definition:d,lhs_isPolymorphic:d.isPolymorphic,rhs_key:f.key,rhs_modelNames:[y],rhs_baseModelName:y,rhs_relationshipName:f.key,rhs_definition:f,rhs_isPolymorphic:!1,hasInverse:!1,isSelfReferential:c===y,isReflexive:!1}
return l(r,y,p,e),l(r,c,i,e),e}const g=f.type
if(u=a(r,g,i)||a(r,y,p),u)return(u.lhs_baseModelName===g?u.lhs_modelNames:u.rhs_modelNames).push(c),l(r,c,i,u),u
_(d,f),_(f,d)
const m=[c]
c!==g&&m.push(g)
const v=g===y,k={lhs_key:`${g}:${i}`,lhs_modelNames:m,lhs_baseModelName:g,lhs_relationshipName:i,lhs_definition:d,lhs_isPolymorphic:d.isPolymorphic,rhs_key:`${y}:${p}`,rhs_modelNames:[y],rhs_baseModelName:y,rhs_relationshipName:p,rhs_definition:f,rhs_isPolymorphic:f.isPolymorphic,hasInverse:!0,isSelfReferential:v,isReflexive:v&&i===p}
return l(r,g,i,k),l(r,c,i,k),l(r,y,p,k),k}(this,e,t)
r=function(e,t,i){const r=e.isSelfReferential
return 1==(i===e.lhs_relationshipName)&&(!0===r||t===e.lhs_baseModelName||e.rhs_isPolymorphic&&e.lhs_modelNames.includes(t))}(n,e.type,t)?n.lhs_definition:n.rhs_definition,i=this._metaCache[e.type]=i||{},i[t]=r}return r}get(e,t){let i=this.identifiers.get(e)
i||(i=Object.create(null),this.identifiers.set(e,i))
let r=i[t]
if(!r){const n=this.getDefinition(e,t)
r="belongsTo"===n.kind?i[t]=function(e,t){return{definition:e,identifier:t,state:{hasReceivedData:!1,isEmpty:!0,isStale:!1,hasFailedLoadAttempt:!1,shouldForceReload:!1,hasDematerializedInverse:!1},transactionRef:0,localState:null,remoteState:null,meta:null,links:null}}(n,e):"hasMany"===n.kind?i[t]=function(e,t){return{definition:e,identifier:t,state:{hasReceivedData:!1,isEmpty:!0,isStale:!1,hasFailedLoadAttempt:!1,shouldForceReload:!1,hasDematerializedInverse:!1},remoteMembers:new Set,remoteState:[],additions:null,removals:null,meta:null,links:null,localState:null,isDirty:!0,transactionRef:0,_diff:void 0}}(n,e):i[t]=function(e,t){return{definition:e,identifier:t,localMembers:new Set,remoteMembers:new Set}}(n,e)}return r}getData(e,t){const i=this.get(e,t)
return u(i)?function(e){let t
const i={}
return e.localState&&(t=e.localState),null===e.localState&&e.state.hasReceivedData&&(t=null),e.links&&(i.links=e.links),void 0!==t&&(i.data=t),e.meta&&(i.meta=e.meta),i}(i):T(i)}registerPolymorphicType(e,t){const i=this._potentialPolymorphicTypes
let r=i[e]
r||(r=i[e]=Object.create(null)),r[t]=!0
let n=i[t]
n||(n=i[t]=Object.create(null)),n[e]=!0}isReleasable(e){const t=this.identifiers.get(e)
if(!t)return!0
const i=Object.keys(t)
for(let r=0;r<i.length;r++){const n=t[i[r]]
if(void 0!==n&&n.definition.inverseIsAsync&&!c(e))return!1}return!0}unload(e,t){const i=this.identifiers.get(e)
i&&Object.keys(i).forEach((e=>{const r=i[e]
r&&(function(e,t,i){if(h(t))return void(e.isReleasable(t.identifier)&&I(e,t))
const{identifier:r}=t,{inverseKey:n}=t.definition
t.definition.inverseIsImplicit||f(t,(t=>function(e,t,i,r,n){if(!e.has(t,i))return
const s=e.get(t,i)
u(s)&&s.localState&&r!==s.localState||function(e,t,i,r){if(u(t)){const i=t.localState
!t.definition.isAsync||i&&c(i)?(t.localState===i&&null!==i&&(t.localState=null),t.remoteState===i&&null!==i&&(t.remoteState=null,t.state.hasReceivedData=!0,t.state.isEmpty=!0,t.localState&&!c(t.localState)&&(t.localState=null))):t.state.hasDematerializedInverse=!0,r||y(e,t.identifier,t.definition.key)}else!t.definition.isAsync||i&&c(i)?p(e,t,i):t.state.hasDematerializedInverse=!0,r||y(e,t.identifier,t.definition.key)}(e,s,r,n)}(e,t,n,r,i))),t.definition.inverseIsImplicit||t.definition.inverseIsAsync||(t.state.isStale=!0,$(t),t.definition.isAsync||i||y(e,t.identifier,t.definition.key))}(this,r,t),h(r)&&(i[e]=void 0))}))}_isDirty(e,t){const i=this.identifiers.get(e)
if(!i)return!1
const r=i[t]
if(!r)return!1
if(u(r))return r.localState!==r.remoteState
if(d(r)){const e=null!==r.additions&&r.additions.size>0,t=null!==r.removals&&r.removals.size>0
return e||t||z(r)}return!1}getChanged(e){const t=this.identifiers.get(e),i=new Map
if(!t)return i
const r=Object.keys(t)
for(let n=0;n<r.length;n++){const e=r[n],s=t[e]
if(s)if(u(s))s.localState!==s.remoteState&&i.set(e,{kind:"resource",remoteState:s.remoteState,localState:s.localState})
else if(d(s)){const t=null!==s.additions&&s.additions.size>0,r=null!==s.removals&&s.removals.size>0,n=z(s);(t||r||n)&&i.set(e,{kind:"collection",additions:new Set(s.additions)||new Set,removals:new Set(s.removals)||new Set,remoteState:s.remoteState,localState:T(s).data||[],reordered:n})}}return i}hasChanged(e){const t=this.identifiers.get(e)
if(!t)return!1
const i=Object.keys(t)
for(let r=0;r<i.length;r++)if(this._isDirty(e,i[r]))return!0
return!1}rollback(e){const t=this.identifiers.get(e),i=[]
if(!t)return i
const r=Object.keys(t)
for(let n=0;n<r.length;n++){const s=r[n],o=t[s]
o&&this._isDirty(e,s)&&(O(this,e,s,o),i.push(s))}return i}remove(e){this._removing=e,this.unload(e),this.identifiers.delete(e),this._removing=null}push(e){if("deleteRecord"===e.op)this._pushedUpdates.deletions.push(e)
else{const t=this.getDefinition(e.record,e.field)
!function(e,t,i){const r=e[t.kind]=e[t.kind]||new Map
let n=r.get(t.inverseType)
n||(n=new Map,r.set(t.inverseType,n))
let s=n.get(i.field)
s||(s=[],n.set(i.field,s)),s.push(i)}(this._pushedUpdates,t,e)}this._willSyncRemote||(this._willSyncRemote=!0,o(this.store)._schedule("coalesce",(()=>this._flushRemoteQueue())))}update(e,t=!1){switch(e.op){case"mergeIdentifiers":{const t=this.identifiers.get(e.record)
t&&function(e,t,i){Object.keys(i).forEach((r=>{const n=i[r]
n&&function(e,t,i){i.identifier=t.value,f(i,(r=>{const n=e.get(r,i.definition.inverseKey)
!function(e,t,i){u(t)?function(e,t,i){t.remoteState===i.record&&(t.remoteState=i.value),t.localState===i.record&&(t.localState=i.value,y(e,t.identifier,t.definition.key))}(e,t,i):d(t)?function(e,t,i){if(t.remoteMembers.has(i.record)){t.remoteMembers.delete(i.record),t.remoteMembers.add(i.value)
const e=t.remoteState.indexOf(i.record)
t.remoteState.splice(e,1,i.value),t.isDirty=!0}t.additions?.has(i.record)&&(t.additions.delete(i.record),t.additions.add(i.value),t.isDirty=!0),t.removals?.has(i.record)&&(t.removals.delete(i.record),t.removals.add(i.value),t.isDirty=!0),t.isDirty&&y(e,t.identifier,t.definition.key)}(e,t,i):function(e,t,i){t.remoteMembers.has(i.record)&&(t.remoteMembers.delete(i.record),t.remoteMembers.add(i.value)),t.localMembers.has(i.record)&&(t.localMembers.delete(i.record),t.localMembers.add(i.value))}(0,t,i)}(e,n,t)}))}(e,t,n)}))}(this,e,t)
break}case"updateRelationship":(function(e,t){const i=e.get(t.record,t.field),{definition:n,state:s,identifier:o}=i,{isCollection:a}=n,l=t.value
let c=!1,u=!1
if(l.meta&&(i.meta=l.meta),void 0!==l.data)if(c=!0,a){null===l.data&&(l.data=[])
const i=e.store.identifierCache
e.update({op:"replaceRelatedRecords",record:o,field:t.field,value:N(l.data,i)},!0)}else e.update({op:"replaceRelatedRecord",record:o,field:t.field,value:l.data?e.store.identifierCache.upgradeIdentifier(l.data):null},!0)
else!1!==n.isAsync||s.hasReceivedData||(c=!0,a?e.update({op:"replaceRelatedRecords",record:o,field:t.field,value:[]},!0):e.update({op:"replaceRelatedRecord",record:o,field:t.field,value:null},!0))
if(l.links){const e=i.links
if(i.links=l.links,l.links.related){const t=j(l.links.related),i=e&&e.related?j(e.related):null,a=i?i.href:null
t&&t.href&&t.href!==a&&((0,r.warn)(`You pushed a record of type '${o.type}' with a relationship '${n.key}' configured as 'async: false'. You've included a link but no primary data, this may be an error in your payload. EmberData will treat this relationship as known-to-be-empty.`,n.isAsync||s.hasReceivedData,{id:"ds.store.push-link-for-sync-relationship"}),u=!0)}}if(i.state.hasFailedLoadAttempt=!1,c){const e=null===l.data||Array.isArray(l.data)&&0===l.data.length
i.state.hasReceivedData=!0,i.state.isStale=!1,i.state.hasDematerializedInverse=!1,i.state.isEmpty=e}else u&&(a||!i.state.hasReceivedData||(h=i.transactionRef,d=e._transaction,0===h||null===d||h<d)?(i.state.isStale=!0,y(e,i.identifier,i.definition.key)):i.state.isStale=!1)
var h,d})(this,e)
break
case"deleteRecord":{const t=e.record,i=this.identifiers.get(t)
i&&(Object.keys(i).forEach((e=>{const t=i[e]
t&&(i[e]=void 0,I(this,t))})),this.identifiers.delete(t))
break}case"replaceRelatedRecord":x(this,e,t)
break
case"addToRelatedRecords":(function(e,t,i){const{record:r,value:n,index:s}=t,o=e.get(r,t.field)
if(Array.isArray(n))for(let a=0;a<n.length;a++)P(e,o,r,n[a],void 0!==s?s+a:s,i)
else P(e,o,r,n,s,i)
y(e,o.identifier,o.definition.key)})(this,e,t)
break
case"removeFromRelatedRecords":(function(e,t,i){const{record:r,value:n}=t,s=e.get(r,t.field)
if(Array.isArray(n))for(let o=0;o<n.length;o++)D(e,s,r,n[o],i)
else D(e,s,r,n,i)
y(e,s.identifier,s.definition.key)})(this,e,t)
break
case"replaceRelatedRecords":k(this,e,t)}}_scheduleLocalSync(e){this._updatedRelationships.add(e),this._willSyncLocal||(this._willSyncLocal=!0,o(this.store)._schedule("sync",(()=>this._flushLocalQueue())))}_flushRemoteQueue(){if(!this._willSyncRemote)return
let e=(0,s.Yj)("transactionRef")??0
this._transaction=++e,(0,s.dV)("transactionRef",e),this._willSyncRemote=!1
const t=this._pushedUpdates,{deletions:i,hasMany:r,belongsTo:n}=t
t.deletions=[],t.hasMany=void 0,t.belongsTo=void 0
for(let s=0;s<i.length;s++)this.update(i[s],!0)
r&&q(this,r),n&&q(this,n),this._transaction=null}_addToTransaction(e){e.transactionRef=this._transaction}_flushLocalQueue(){if(!this._willSyncLocal)return
if(this.silenceNotifications)return this.silenceNotifications=!1,void(this._updatedRelationships=new Set)
this._willSyncLocal=!1
const e=this._updatedRelationships
this._updatedRelationships=new Set,e.forEach((e=>y(this,e.identifier,e.definition.key)))}destroy(){F.delete(this.store),this.identifiers.clear(),this.store=null,this.isDestroyed=!0}}function q(e,t){t.forEach((t=>{t.forEach((t=>{!function(e,t){for(let i=0;i<t.length;i++)e.update(t[i],!0)}(e,t)}))}))}function $(e){u(e)?(e.localState=null,e.remoteState=null,e.state.hasReceivedData=!1,e.state.isEmpty=!0):(e.remoteMembers.clear(),e.remoteState=[],e.additions=null,e.removals=null,e.localState=null)}function I(e,t){const{identifier:i}=t,{inverseKey:r}=t.definition
f(t,(t=>{e.has(t,r)&&p(e,e.get(t,r),i)})),u(t)?(t.definition.isAsync||$(t),t.localState=null):d(t)?t.definition.isAsync||($(t),y(e,t.identifier,t.definition.key)):(t.remoteMembers.clear(),t.localMembers.clear())}function z(e){if(e.isDirty)return!1
const{remoteState:t,localState:i,additions:r,removals:n}=e
for(let s=0,o=0;s<t.length;s++){const e=t[s],a=i[o]
if(e!==a){if(n&&n.has(e))continue
if(r&&r.has(a)){o++,s--
continue}return!0}o++}return!1}function B(e){return void 0!==e._instanceCache?e._instanceCache._storeWrapper:e}function H(e){return F.get(B(e))}function U(e){const t=B(e)
let i=F.get(t)
return i||(i=new L(t),F.set(t,i),o(t)._graph=i),i}},380:(e,t,i)=>{i.d(t,{F:()=>p,S:()=>f,a:()=>c,b:()=>l,c:()=>d,i:()=>u,n:()=>h,u:()=>v})
var r=i(921),n=i(603),s=i(598),o=i(175),a=i(903)
class l{constructor(e,t,i={}){this.__store=e,this._snapshots=null,this.modelName=t,this.adapterOptions=i.adapterOptions,this.include=i.include}get _recordArray(){return this.__store.peekAll(this.modelName)}get length(){return this._recordArray.length}snapshots(){if(null!==this._snapshots)return this._snapshots
this.__store
const{_fetchManager:e}=this.__store
return this._snapshots=this._recordArray[r.u2].map((t=>e.createSnapshot(t))),this._snapshots}}function c(e){}function u(e,t){return Array.isArray(e)?e.map(t):t(e,0)}function h(e,t,i,r,n,s){return e?e.normalizeResponse(t,i,r,n,s):r}class d{constructor(e,t,i){this._store=i,this.__attributes=null,this._belongsToRelationships=Object.create(null),this._belongsToIds=Object.create(null),this._hasManyRelationships=Object.create(null),this._hasManyIds=Object.create(null)
const r=!!i._instanceCache.peek(t)
if(this.modelName=t.type,this.identifier=t,r&&this._attributes,this.id=t.id,this.adapterOptions=e.adapterOptions,this.include=e.include,this.modelName=t.type,r){const e=this._store.cache
this._changedAttributes=e.changedAttrs(t)}}get record(){return this._store.peekRecord(this.identifier)}get _attributes(){if(null!==this.__attributes)return this.__attributes
const e=this.__attributes=Object.create(null),{identifier:t}=this,i=this._store.schema.fields(t),r=this._store.cache
return i.forEach(((i,n)=>{"attribute"===i.kind&&(e[n]=r.getAttr(t,n))})),e}get isNew(){const e=this._store.cache
return e?.isNew(this.identifier)||!1}attr(e){if(e in this._attributes)return this._attributes[e]}attributes(){return{...this._attributes}}changedAttributes(){const e=Object.create(null)
if(!this._changedAttributes)return e
const t=Object.keys(this._changedAttributes)
for(let i=0,r=t.length;i<r;i++){const r=t[i]
e[r]=this._changedAttributes[r].slice()}return e}belongsTo(e,t){const r=!(!t||!t.id)
let n
const s=this._store
if(!0===r&&e in this._belongsToIds)return this._belongsToIds[e]
if(!1===r&&e in this._belongsToRelationships)return this._belongsToRelationships[e]
s.schema.fields({type:this.modelName}).get(e)
const o=(0,a.A)(i(424)).graphFor,{identifier:l}=this,c=o(this._store).getData(l,e),u=c&&c.data,h=u?s.identifierCache.getOrCreateRecordIdentifier(u):null
if(c&&void 0!==c.data){const e=s.cache
n=h&&!e.isDeleted(h)?r?h.id:s._fetchManager.createSnapshot(h):null}return r?this._belongsToIds[e]=n:this._belongsToRelationships[e]=n,n}hasMany(e,t){const r=!(!t||!t.ids)
let n
const s=this._hasManyIds[e],o=this._hasManyRelationships[e]
if(!0===r&&e in this._hasManyIds)return s
if(!1===r&&e in this._hasManyRelationships)return o
const l=this._store,c=(l.schema.fields({type:this.modelName}).get(e),(0,a.A)(i(424)).graphFor),{identifier:u}=this,h=c(this._store).getData(u,e)
return h.data&&(n=[],h.data.forEach((e=>{const t=l.identifierCache.getOrCreateRecordIdentifier(e)
l.cache.isDeleted(t)||(r?n.push(t.id):n.push(l._fetchManager.createSnapshot(t)))}))),r?this._hasManyIds[e]=n:this._hasManyRelationships[e]=n,n}eachAttribute(e,t){this._store.schema.fields(this.identifier).forEach(((i,r)=>{"attribute"===i.kind&&e.call(t,r,i)}))}eachRelationship(e,t){this._store.schema.fields(this.identifier).forEach(((i,r)=>{"belongsTo"!==i.kind&&"hasMany"!==i.kind||e.call(t,r,i)}))}serialize(e){return this._store,this._store.serializerFor(this.modelName).serialize(this,e)}}const f=(0,o.L1)("SaveOp",Symbol("SaveOp"))
class p{constructor(e){this._store=e,this._pendingFetch=new Map,this.requestCache=e.getRequestStateService(),this.isDestroyed=!1}createSnapshot(e,t={}){return new d(t,e,this._store)}scheduleSave(e,t){const i=(0,s.ud)(),r={data:[{op:"saveRecord",recordIdentifier:e,options:t}]},n={snapshot:this.createSnapshot(e,t),resolver:i,identifier:e,options:t,queryRequest:r},o=this.requestCache._enqueue(i.promise,n.queryRequest)
return function(e,t){const{snapshot:i,resolver:r,identifier:n,options:s}=t,o=e.adapterFor(n.type),a=s[f],l=i.modelName,c=e.modelFor(l)
let u=Promise.resolve().then((()=>o[a](e,c,i)))
const d=e.serializerFor(l)
u=u.then((t=>{if(t)return h(d,e,c,t,i.id,a)})),r.resolve(u)}(this._store,n),o}scheduleFetch(e,t,r){const n={data:[{op:"findRecord",recordIdentifier:e,options:t}]},o=this.getPendingFetch(e,t)
if(o)return o
const l=e.type,c=(0,s.ud)(),u={identifier:e,resolver:c,options:t,queryRequest:n},h=c.promise,d=this._store,f=!d._instanceCache.recordIsLoaded(e)
let p=this.requestCache._enqueue(h,u.queryRequest).then((i=>{i.data&&!Array.isArray(i.data)&&(i.data.lid=e.lid)
const r=d._push(i,t.reload)
return r&&!Array.isArray(r)?r:e}),(t=>{const r=d.cache
if(!r||r.isEmpty(e)||f){let t=!0
if(!r){const r=(0,(0,a.A)(i(424)).graphFor)(d)
t=r.isReleasable(e),t||r.unload(e,!0)}(r||t)&&(d._enableAsyncFlush=!0,d._instanceCache.unloadRecord(e),d._enableAsyncFlush=null)}throw t}))
0===this._pendingFetch.size&&new Promise((e=>setTimeout(e,0))).then((()=>{this.flushAllPendingFetches()}))
const y=this._pendingFetch
let g=y.get(l)
g||(g=new Map,y.set(l,g))
let m=g.get(e)
return m||(m=[],g.set(e,m)),m.push(u),u.promise=p,p}getPendingFetch(e,t){const i=this._pendingFetch.get(e.type)?.get(e)
if(i){const e=i.find((e=>function(e={},t={}){return i=e.adapterOptions,r=t.adapterOptions,(!i||i===r||0===Object.keys(i).length)&&function(e,t){if(!e?.length)return!0
if(!t?.length)return!1
const i=(Array.isArray(e)?e:e.split(",")).sort(),r=(Array.isArray(t)?t:t.split(",")).sort()
if(i.join(",")===r.join(","))return!0
for(let n=0;n<i.length;n++)if(!r.includes(i[n]))return!1
return!0}(e.include,t.include)
var i,r}(t,e.options)))
if(e)return e.promise}}flushAllPendingFetches(){if(this.isDestroyed)return
const e=this._store
this._pendingFetch.forEach(((t,i)=>function(e,t,i){const r=e.adapterFor(i)
if(r.findMany&&r.coalesceFindRequests){const n=[]
t.forEach(((e,i)=>{e.length>1||(t.delete(i),n.push(e[0]))}))
const s=n.length
if(s>1){const t=new Array(s),o=new Map
for(let i=0;i<s;i++){const r=n[i]
t[i]=e._fetchManager.createSnapshot(r.identifier,r.options),o.set(t[i],r)}let a
a=r.groupRecordsForFindMany?r.groupRecordsForFindMany(e,t):[t]
for(let n=0,s=a.length;n<s;n++)m(e,o,a[n],r,i)}else 1===s&&g(e,r,n[0])}t.forEach((t=>{t.forEach((t=>{g(e,r,t)}))}))}(e,t,i))),this._pendingFetch.clear()}fetchDataIfNeededForIdentifier(e,t={},i){const r=function(e,t){const i=e.cache
if(!i)return!0
const r=i.isNew(t),n=i.isDeleted(t),s=i.isEmpty(t)
return(!r||n)&&s}(this._store._instanceCache,e),n=function(e,t){const i=e.store.getRequestStateService()
return!e.recordIsLoaded(t)&&i.getPendingRequestsForRecord(t).some((e=>"query"===e.type))}(this._store._instanceCache,e)
let s
return r?(t.reload=!0,s=this.scheduleFetch(e,t,i)):s=n?this.getPendingFetch(e,t):Promise.resolve(e),s}destroy(){this.isDestroyed=!0}}function y(e,t,i){for(let r=0,n=t.length;r<n;r++){const n=t[r],s=e.get(n)
s&&s.resolver.reject(i||new Error(`Expected: '<${n.modelName}:${n.id}>' to be present in the adapter provided payload, but it was not found.`))}}function g(e,t,i){const s=i.identifier,o=s.type,a=e._fetchManager.createSnapshot(s,i.options),l=e.modelFor(s.type),c=s.id
let u=Promise.resolve().then((()=>t.findRecord(e,l,s.id,a)))
u=u.then((t=>{const i=h(e.serializerFor(o),e,l,t,c,"findRecord")
return(0,n.warn)(`You requested a record of type '${o}' with id '${c}' but the adapter returned a payload with primary data having an id of '${i.data.id}'. Use 'store.findRecord()' when the requested id is the same as the one returned by the adapter. In other cases use 'store.queryRecord()' instead.`,(0,r.pG)(i.data.id)===(0,r.pG)(c),{id:"ds.store.findRecord.id-mismatch"}),i})),i.resolver.resolve(u)}function m(e,t,i,r,s){i.length>1?function(e,t,i,r){const n=e.modelFor(i)
return Promise.resolve().then((()=>{const i=r.map((e=>e.id))
return t.findMany(e,n,i,r)})).then((t=>h(e.serializerFor(i),e,n,t,null,"findMany")))}(e,r,s,i).then((r=>{!function(e,t,i,r){const s=new Map
for(let n=0;n<i.length;n++){const e=i[n].id
let t=s.get(e)
t||(t=[],s.set(e,t)),t.push(i[n])}const o=Array.isArray(r.included)?r.included:[],a=r.data
for(let n=0,c=a.length;n<c;n++){const e=a[n],i=s.get(e.id)
s.delete(e.id),i?i.forEach((i=>{t.get(i).resolver.resolve({data:e})})):o.push(e)}if(o.length>0&&e._push({data:null,included:o},!0),0===s.size)return
const l=[]
s.forEach((e=>{l.push(...e)})),(0,n.warn)('Ember Data expected to find records with the following ids in the adapter response from findMany but they were missing: [ "'+[...s.values()].map((e=>e[0].id)).join('", "')+'" ]',{id:"ds.store.missing-records-from-adapter"}),y(t,l)}(e,t,i,r)})).catch((e=>{y(t,i,e)})):1===i.length&&g(e,r,t.get(i[0]))}function v(e){}},604:(e,t,i)=>{i.r(t),i.d(t,{FetchManager:()=>r.F,SaveOp:()=>r.S,Snapshot:()=>r.c,SnapshotRecordArray:()=>r.b,upgradeStore:()=>r.u})
var r=i(380)},917:(e,t,i)=>{i.r(t)
var r=i(603),n=i(984)
{const e=(0,i(903).A)(i(40)).default,{inflector:t}=e,s=t.plural,o=t.singular,a=t.irregular,l=t.uncountable,c=new Set,u=new Set
n.m.plurals.forEach((([e])=>{c.add(e.toString())})),n.m.singular.forEach((([e])=>{u.add(e.toString())}))
const{defaultRules:h}=e,{rules:d}=t,f=new Map,p=new Set,y=new Set(h.uncountable)
h.irregularPairs.forEach((([e,t])=>{f.set(e.toLowerCase(),t),p.add(t.toLowerCase())}))
const g=new Map
Object.keys(d.irregular).forEach((e=>{const t=d.irregular[e]
g.set(e,t)})),d.plurals.forEach((([e,t])=>{c.has(e.toString())||((0,n.b)(e,t),(0,r.deprecate)("WarpDrive/EmberData no longer uses ember-inflector for pluralization.\nPlease `import { plural } from '@ember-data/request-utils/string';` instead to register a custom pluralization rule for use with EmberData.",!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"}))})),d.singular.forEach((([e,t])=>{u.has(e.toString())||((0,n.a)(e,t),(0,r.deprecate)("WarpDrive/EmberData no longer uses ember-inflector for singularization.\nPlease `import { singular } from '@ember-data/request-utils/string';` instead to register a custom singularization rule for use with EmberData.",!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"}))})),Object.keys(d.irregular).forEach((e=>{const t=d.irregular[e],i=f.get(e)
if(i&&i===t)return
if(p.has(e))return
const s=g.get(t.toLowerCase())||e
p.add(t.toLowerCase()),(0,n.i)(s,t),(0,r.deprecate)(`WarpDrive/EmberData no longer uses ember-inflector for irregular rules.\nPlease \`import { irregular } from '@ember-data/request-utils/string';\` instead to register a custom irregular rule for use with EmberData for '${s}' <=> '${t}'.`,!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"})})),Object.keys(d.uncountable).forEach((e=>{y.has(e)||!0!==d.uncountable[e]||((0,n.u)(e),(0,r.deprecate)(`WarpDrive/EmberData no longer uses ember-inflector for uncountable rules.\nPlease \`import { uncountable } from '@ember-data/request-utils/string';\` instead to register a custom uncountable rule for '${e}' for use with EmberData.`,!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"}))})),t.plural=function(...e){return(0,n.b)(...e),(0,r.deprecate)("WarpDrive/EmberData no longer uses ember-inflector for pluralization.\nPlease `import { plural } from '@ember-data/request-utils/string';` instead to register a custom pluralization rule for use with EmberData.",!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"}),s.apply(t,e)},t.singular=function(...e){return(0,n.a)(...e),(0,r.deprecate)("WarpDrive/EmberData no longer uses ember-inflector for singularization.\nPlease `import { singular } from '@ember-data/request-utils/string';` instead to register a custom singularization rule for use with EmberData.",!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"}),o.apply(t,e)},t.irregular=function(...e){return(0,n.i)(...e),(0,r.deprecate)("WarpDrive/EmberData no longer uses ember-inflector for irregular rules.\nPlease `import { irregular } from '@ember-data/request-utils/string';` instead to register a custom irregular rule for use with EmberData.",!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"}),a.apply(t,e)},t.uncountable=function(...e){return(0,n.u)(...e),(0,r.deprecate)("WarpDrive/EmberData no longer uses ember-inflector for uncountable rules.\nPlease `import { uncountable } from '@ember-data/request-utils/string';` instead to register a custom uncountable rule for use with EmberData.",!1,{id:"warp-drive.ember-inflector",until:"6.0.0",for:"warp-drive",since:{enabled:"5.3.4",available:"5.3.4"},url:"https://deprecations.emberjs.com/id/warp-drive.ember-inflector"}),l.apply(t,e)}}},984:(e,t,i)=>{i.d(t,{a:()=>H,b:()=>B,c:()=>D,d:()=>F,e:()=>q,f:()=>g,g:()=>m,h:()=>b,i:()=>j,j:()=>v,k:()=>_,l:()=>N,m:()=>r,p:()=>I,r:()=>L,s:()=>$,u:()=>P})
const r={plurals:[[/$/,"s"],[/s$/i,"s"],[/^(ax|test)is$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(octop|vir)i$/i,"$1i"],[/(alias|status|bonus)$/i,"$1es"],[/(bu)s$/i,"$1ses"],[/(buffal|tomat)o$/i,"$1oes"],[/([ti])um$/i,"$1a"],[/([ti])a$/i,"$1a"],[/sis$/i,"ses"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/(hive)$/i,"$1s"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(x|ch|ss|sh)$/i,"$1es"],[/(matr|vert|ind)(?:ix|ex)$/i,"$1ices"],[/^(m|l)ouse$/i,"$1ice"],[/^(m|l)ice$/i,"$1ice"],[/^(ox)$/i,"$1en"],[/^(oxen)$/i,"$1"],[/(quiz)$/i,"$1zes"]],singular:[[/s$/i,""],[/(ss)$/i,"$1"],[/(n)ews$/i,"$1ews"],[/([ti])a$/i,"$1um"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i,"$1sis"],[/(^analy)(sis|ses)$/i,"$1sis"],[/([^f])ves$/i,"$1fe"],[/(hive)s$/i,"$1"],[/(tive)s$/i,"$1"],[/([lr])ves$/i,"$1f"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/(s)eries$/i,"$1eries"],[/(m)ovies$/i,"$1ovie"],[/(x|ch|ss|sh)es$/i,"$1"],[/^(m|l)ice$/i,"$1ouse"],[/(bus)(es)?$/i,"$1"],[/(o)es$/i,"$1"],[/(shoe)s$/i,"$1"],[/(cris|test)(is|es)$/i,"$1is"],[/^(a)x[ie]s$/i,"$1xis"],[/(octop|vir)(us|i)$/i,"$1us"],[/(alias|status|bonus)(es)?$/i,"$1"],[/^(ox)en/i,"$1"],[/(vert|ind)ices$/i,"$1ex"],[/(matr)ices$/i,"$1ix"],[/(quiz)zes$/i,"$1"],[/(database)s$/i,"$1"]],irregularPairs:[["person","people"],["man","men"],["child","children"],["sex","sexes"],["move","moves"],["cow","kine"],["zombie","zombies"]],uncountable:["equipment","information","rice","money","species","series","fish","sheep","jeans","police"]}
class n{constructor(e,t){this.size=t||1e4,this.state=new Map,this.doWork=e}get(e){const t=this.state.get(e)
if(t)return this.state.delete(e),this.state.set(e,t),t
const i=this.doWork(e)
return this.set(e,i),i}set(e,t){if(this.state.size===this.size)for(const[i]of this.state){this.state.delete(i)
break}this.state.set(e,t)}clear(){this.state.clear()}}const s=/[ _]/g,o=/([a-z\d])([A-Z])/g,a=new n((e=>e.replace(o,"$1_$2").toLowerCase().replace(s,"-"))),l=/(\-|\_|\.|\s)+(.)?/g,c=/(^|\/)([A-Z])/g,u=new n((e=>e.replace(l,((e,t,i)=>i?i.toUpperCase():"")).replace(c,(e=>e.toLowerCase())))),h=/([a-z\d])([A-Z]+)/g,d=/\-|\s+/g,f=new n((e=>e.replace(h,"$1_$2").replace(d,"_").toLowerCase())),p=/(^|\/)([a-z\u00C0-\u024F])/g,y=new n((e=>e.replace(p,(e=>e.toUpperCase()))))
function g(e){return a.get(e)}function m(e){return u.get(e)}function v(e){return f.get(e)}function b(e){return y.get(e)}function _(e){u.size=e,f.size=e,y.size=e,a.size=e}const w=/^\s*$/,k=/([\w/-]+[_/\s-])([a-z\d]+$)/,A=/([\w/\s-]+)([A-Z][a-z\d]*$)/,S=/[A-Z][a-z\d]*$/,R=new n((e=>function(e){return U(e,O,E)}(e))),x=new n((e=>function(e){return U(e,T,M)}(e))),C=new Set(r.uncountable),M=new Map,E=new Map,O=new Map(r.singular.reverse()),T=new Map(r.plurals.reverse())
function P(e){C.add(e.toLowerCase())}function D(e){e.forEach((e=>{P(e)}))}function j(e,t){M.set(e.toLowerCase(),t),M.set(t.toLowerCase(),t),E.set(t.toLowerCase(),e),E.set(e.toLowerCase(),e)}function N(e){e.forEach((e=>{M.set(e[0].toLowerCase(),e[1]),M.set(e[1].toLowerCase(),e[1]),E.set(e[1].toLowerCase(),e[0]),E.set(e[0].toLowerCase(),e[0])}))}function F(){R.clear(),x.clear()}function L(){q(),r.uncountable.forEach((e=>C.add(e))),r.singular.forEach((e=>O.set(e[0],e[1]))),r.plurals.forEach((e=>T.set(e[0],e[1]))),N(r.irregularPairs)}function q(){R.clear(),x.clear(),C.clear(),M.clear(),E.clear(),O.clear(),T.clear()}function $(e){return e?R.get(e):""}function I(e){return e?x.get(e):""}function z(e,t){const i=[e,...t.entries()]
t.clear(),i.forEach((e=>{t.set(e[0],e[1])}))}function B(e,t){T.has(e)&&T.delete(e),z([e,t],T)}function H(e,t){O.has(e)&&O.delete(e),z([e,t],O)}function U(e,t,i){if(!e||w.test(e))return e
const r=e.toLowerCase()
if(C.has(r))return e
const n=k.exec(e)||A.exec(e),s=n?n[2].toLowerCase():null
if(s&&C.has(s))return e
const o=S.test(e)
for(let[a,l]of i)if(r.match(a+"$"))return o&&s&&i.has(s)&&(l=b(l),a=b(a)),e.replace(new RegExp(a,"i"),l)
for(const[a,l]of t)if(a.test(e))return e.replace(a,l)
return e}N(r.irregularPairs)},500:(e,t,i)=>{i.r(t),i.d(t,{camelize:()=>r.g,capitalize:()=>r.h,clear:()=>r.d,clearRules:()=>r.e,dasherize:()=>r.f,irregular:()=>r.i,loadIrregular:()=>r.l,loadUncountable:()=>r.c,plural:()=>r.b,pluralize:()=>r.p,resetToDefaults:()=>r.r,setMaxLRUCacheSize:()=>r.k,singular:()=>r.a,singularize:()=>r.s,uncountable:()=>r.u,underscore:()=>r.j})
var r=i(984)},121:(e,t,i)=>{i.d(t,{I:()=>p,b:()=>_,c:()=>h,e:()=>b,f:()=>A,g:()=>d,s:()=>f,u:()=>w})
var r=i(175),n=i(856)
function s(e,t){return e.get(o(e,t))}function o(e,t,i){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:i
throw new TypeError("Private element is not present on this object")}function a(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var i=t.call(e,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}const l=(0,r.vs)("PromiseCache",new WeakMap),c=(0,r.vs)("RequestMap",new Map)
function u(e,t){c.set(e,t)}function h(e){c.delete(e)}function d(e){return c.get(e)}function f(e,t){l.set(e,t)}const p=(0,r.L1)("IS_CACHE_HANDLER",Symbol("IS_CACHE_HANDLER"))
function y(e){return e&&!0===e[n.k0]}function g(e,t,i){return y(t)?t:i?{[n.k0]:!0,request:e.request,response:e.getResponse(),error:t}:{[n.k0]:!0,request:e.request,response:e.getResponse(),content:t}}function m(e){return new DOMException(e||"The user aborted a request.","AbortError")}function v(e,t){return 0===t&&Boolean(e[p])}function b(e,t,i,r){const s=new S(t,r,0===i),o=new x(s)
let a
try{a=e[i].request(o,(function(t){return s.nextCalled++,b(e,t,i+1,r)})),a&&v(e[i],i)&&(a instanceof Promise||(u(s.requestId,{isError:!1,result:g(s,a,!1)}),a=Promise.resolve(a)))}catch(t){v(e[i],i)&&u(s.requestId,{isError:!0,result:g(s,t,!0)}),a=Promise.reject(t)}const l=function(e){const t=_()
let i,{promise:r}=t
return r=r.finally((()=>{e.resolveStream(),i&&i.forEach((e=>e()))})),r.onFinalize=e=>{i=i||[],i.push(e)},r[n.J6]=!0,r.getStream=()=>e.getStream(),r.abort=t=>{e.abort(m(t))},t.promise=r,t}(s)
return c=a,Boolean(c&&c instanceof Promise&&!0===c[n.J6])?function(e,t,i){return e.setStream(t.getStream()),t.then((t=>{const r={[n.k0]:!0,request:e.request,response:t.response,content:t.content}
i.resolve(r)}),(t=>{if(y(t)&&e.setStream(e.god.stream),!(t&&t instanceof Error))try{throw new Error(t||"Request Rejected with an Unknown Error")}catch(e){t&&"object"==typeof t&&(Object.assign(e,t),e.message=t.message||"Request Rejected with an Unknown Error"),t=e}t[n.k0]=!0,t.request=e.request,t.response=e.getResponse(),t.error=t.error||t.message,i.reject(t)})),i.promise}(s,a,l):function(e,t,i){return t.then((t=>{if(e.controller.signal.aborted)return void i.reject(m(e.controller.signal.reason))
y(t)&&(e.setStream(e.god.stream),t=t.content)
const r={[n.k0]:!0,request:e.request,response:e.getResponse(),content:t}
i.resolve(r)}),(t=>{if(y(t)&&e.setStream(e.god.stream),!(t&&t instanceof Error))try{throw new Error(t||"Request Rejected with an Unknown Error")}catch(e){t&&"object"==typeof t&&(Object.assign(e,t),e.message=t.message||"Request Rejected with an Unknown Error"),t=e}t[n.k0]=!0,t.request=e.request,t.response=e.getResponse(),t.error=t.error||t.message,i.reject(t)})),i.promise}(s,a,l)
var c}function _(){let e,t
const i=new Promise(((i,r)=>{e=i,t=r}))
return{resolve:e,reject:t,promise:i}}function w(e,t){return e[n.J6]=!0,e.getStream=t.getStream,e.abort=t.abort,e.onFinalize=t.onFinalize,e}function k(e){return e.clone=()=>new Headers(e),e.toJSON=()=>Array.from(e),e}function A(e){const{headers:t,ok:i,redirected:r,status:n,statusText:s,type:o,url:a}=e
return k(t),{headers:t,ok:i,redirected:r,status:n,statusText:s,type:o,url:a}}class S{constructor(e,t,i=!1){a(this,"hasSetStream",!1),a(this,"hasSetResponse",!1),a(this,"hasSubscribers",!1),a(this,"stream",_()),a(this,"response",null),a(this,"nextCalled",0),this.isRoot=i,this.requestId=t.id,this.controller=e.controller||t.controller,this.stream.promise.sizeHint=0,e.controller&&(e.controller!==t.controller&&t.controller.signal.addEventListener("abort",(()=>{this.controller.abort(t.controller.signal.reason)})),delete e.controller)
let r=Object.assign({signal:this.controller.signal},e)
e.headers&&k(e.headers),this.enhancedRequest=r,this.request=e,this.god=t,this.stream.promise=this.stream.promise.then((e=>(this.god.stream===e&&this.hasSubscribers&&(this.god.stream=null),e)))}get hasRequestedStream(){return this.god.hasRequestedStream}getResponse(){return this.hasSetResponse?this.response:1===this.nextCalled?this.god.response:null}getStream(){if(this.isRoot&&(this.god.hasRequestedStream=!0),!this.hasSetResponse){const e=this.god.response?.headers?.get("content-length")
this.stream.promise.sizeHint=e?parseInt(e,10):0}return this.hasSubscribers=!0,this.stream.promise}abort(e){this.controller.abort(e)}setStream(e){this.hasSetStream||(this.hasSetStream=!0,e instanceof Promise||(this.god.stream=e),this.stream.resolve(e))}resolveStream(){this.setStream(1===this.nextCalled?this.god.stream:null)}setResponse(e){if(!this.hasSetResponse)if(this.hasSetResponse=!0,e instanceof Response){let t=A(e)
this.response=t,this.god.response=t
const i=e.headers?.get("content-length")
this.stream.promise.sizeHint=i?parseInt(i,10):0}else this.response=e,this.god.response=e}}var R=new WeakMap
class x{constructor(e){var t,i;(function(e,t){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.set(e,void 0)})(this,R),this.id=e.requestId,i=e,(t=R).set(o(t,this),i),this.request=e.enhancedRequest}setStream(e){s(R,this).setStream(e)}setResponse(e){s(R,this).setResponse(e)}get hasRequestedStream(){return s(R,this).hasRequestedStream}}new Map([["records","array"],["data","json"],["body",{type:"string",klass:["Blob","ArrayBuffer","TypedArray","DataView","FormData","URLSearchParams","ReadableStream"]}],["disableTestWaiter","boolean"],["options","object"],["cacheOptions","object"],["op","string"],["store","object"],["url","string"],["cache",["default","force-cache","no-cache","no-store","only-if-cached","reload"]],["credentials",["include","omit","same-origin"]],["destination",["","object","audio","audioworklet","document","embed","font","frame","iframe","image","manifest","paintworklet","report","script","sharedworker","style","track","video","worker","xslt"]],["headers","headers"],["integrity","string"],["keepalive","boolean"],["method",["GET","PUT","PATCH","DELETE","POST","OPTIONS"]],["mode",["same-origin","cors","navigate","no-cors"]],["redirect",["error","follow","manual"]],["referrer","string"],["signal","AbortSignal"],["controller","AbortController"],["referrerPolicy",["","same-origin","no-referrer","no-referrer-when-downgrade","origin","origin-when-cross-origin","strict-origin","strict-origin-when-cross-origin","unsafe-url"]]]),(0,r.L1)("IS_FROZEN",Symbol("FROZEN")),(0,r.L1)("IS_COLLECTION",Symbol.for("Collection")),new Set([])},598:(e,t,i)=>{i.d(t,{Ay:()=>a,ud:()=>n.b})
var r=i(175),n=i(121)
function s(e,t){return e.get(function(e,t,i){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:i
throw new TypeError("Private element is not present on this object")}(e,t))}var o=new WeakMap
class a{constructor(e){var t,i
i=[],function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(this,t=o),t.set(this,i),Object.assign(this,e),this._pending=new Map}useCache(e){e[n.I]=!0,s(o,this).unshift(e)}use(e){s(o,this).push(...e)}request(e){const t=s(o,this),i=e.controller||new AbortController
e.controller&&delete e.controller
const a=(0,r.dN)("REQ_ID")??0;(0,r.ml)("REQ_ID",a+1)
const l=(0,n.e)(t,e,0,{controller:i,response:null,stream:null,hasRequestedStream:!1,id:a}),c=(0,n.g)(a),u=(0,n.u)(l.then((e=>((0,n.s)(u,{isError:!1,result:e}),(0,n.c)(a),e)),(e=>{throw(0,n.s)(u,{isError:!0,result:e}),(0,n.c)(a),e})),l)
return c&&(0,n.s)(u,c),u}static create(e){return new this(e)}}},60:(e,t,i)=>{i.r(t),i.d(t,{BooleanTransform:()=>l,DateTransform:()=>c,NumberTransform:()=>h,StringTransform:()=>d,default:()=>a})
var r=i(471),n=i.n(r),s=i(220)
function o(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var i=t.call(e,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}const a=n()
class l{constructor(){o(this,s.k5,"boolean")}deserialize(e,t){return null==e&&!0===t?.allowNull?null:"boolean"==typeof e?e:"string"==typeof e?/^(true|t|1)$/i.test(e):"number"==typeof e&&1===e}serialize(e,t){return null==e&&!0===t?.allowNull?null:Boolean(e)}static create(){return new this}}class c{constructor(){o(this,s.k5,"date")}deserialize(e,t){if("string"==typeof e){let t=e.indexOf("+")
return-1!==t&&e.length-5===t?(t+=3,new Date(e.slice(0,t)+":"+e.slice(t))):new Date(e)}return"number"==typeof e?new Date(e):null==e?e:null}serialize(e,t){return e instanceof Date&&!isNaN(e)?e.toISOString():null}static create(){return new this}}function u(e){return e==e&&e!==1/0&&e!==-1/0}class h{constructor(){o(this,s.k5,"number")}deserialize(e,t){if(""===e||null==e)return null
{const t=Number(e)
return u(t)?t:null}}serialize(e,t){if(""===e||null==e)return null
{const t=Number(e)
return u(t)?t:null}}static create(){return new this}}class d{constructor(){o(this,s.k5,"string")}deserialize(e,t){return e||""===e?String(e):null}serialize(e,t){return e||""===e?String(e):null}static create(){return new this}}},921:(e,t,i)=>{i.d(t,{J4:()=>r.n,RX:()=>r.l,TP:()=>r.o,To:()=>r.A,Wz:()=>r.t,XK:()=>r.M,di:()=>r.u,fV:()=>r.s,i:()=>r.q,o:()=>r.r,oX:()=>r.p,oz:()=>r.I,pG:()=>r.g,u2:()=>r.k,xm:()=>r.i})
var r=i(635)},635:(e,t,i)=>{i.d(t,{A:()=>Se,C:()=>at,I:()=>Te,M:()=>xe,S:()=>Ge,a:()=>x,b:()=>C,c:()=>M,d:()=>E,e:()=>O,g:()=>p,i:()=>A,k:()=>Re,l:()=>Fe,n:()=>Ee,o:()=>X,p:()=>Y,q:()=>Z,r:()=>J,s:()=>Q,t:()=>V,u:()=>g})
var r=i(603),n=i(856),s=i(175)
Symbol("record-originated-on-client"),Symbol("identifier-bucket"),Symbol("warpDriveStaleCache")
const o=Symbol("warpDriveCache")
var a=i(500),l=i(284),c=i(223),u=i(684)
function h(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function d(e,t,i){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:i
throw new TypeError("Private element is not present on this object")}function f(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var i=t.call(e,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function p(e){{let t
return t=null==e||""===e?null:String(e),(0,r.deprecate)(`The resource id '<${typeof e}> ${String(e)} ' is not normalized. Update your application code to use '${JSON.stringify(t)}' instead.`,t===e,{id:"ember-data:deprecate-non-strict-id",until:"6.0",for:"ember-data",since:{available:"5.3",enabled:"5.3"}}),t}}function y(e){let t=null
return"string"==typeof e?t=e.length>0?e:null:"number"!=typeof e||isNaN(e)||(t=String(e)),t}function g(e){{const t=(0,a.dasherize)(e)
return(0,r.deprecate)(`The resource type '${e}' is not normalized. Update your application code to use '${t}' instead of '${e}'.`,t===e,{id:"ember-data:deprecate-non-strict-types",until:"6.0",for:"ember-data",since:{available:"5.3",enabled:"5.3"}}),t}}function m(e){return Boolean(e&&"object"==typeof e)}function v(e,t){return Boolean(m(e)&&t in e&&"string"==typeof e[t]&&e[t].length)}function b(e){return v(e,"lid")}function _(e){return v(e,"id")||Boolean(m(e)&&"id"in e&&"number"==typeof e.id)}const w=(0,s.L1)("IDENTIFIERS",new Set),k=(0,s.L1)("DOCUMENTS",new Set)
function A(e){return void 0!==e[o]||w.has(e)}function S(e){return k.has(e)}const R="undefined"!=typeof FastBoot?FastBoot.require("crypto"):window.crypto
function x(e){(0,s.dV)("configuredGenerationMethod",e)}function C(e){(0,s.dV)("configuredUpdateMethod",e)}function M(e){(0,s.dV)("configuredForgetMethod",e)}function E(e){(0,s.dV)("configuredResetMethod",e)}function O(e){(0,s.dV)("configuredKeyInfoMethod",e)}const T=new Map
let P=0
function D(e,t,i){"record"===i&&!e.id&&_(t)&&function(e,t,i){let r=e.get(t.type)
r||(r=new Map,e.set(t.type,r)),r.set(i,t.lid)}(T,e,t.id)}function j(e,t){const i=_(e)?p(e.id):null
return{type:function(e){return v(e,"type")}(e)?g(e.type):t?t.type:null,id:i}}function N(e,t){if("record"===t){if(b(e))return e.lid
if(_(e)){const t=g(e.type),i=T.get(t)?.get(e.id)
return i||`@lid:${t}-${e.id}`}return R.randomUUID()}if("document"===t)return e.url?e.method&&"GET"!==e.method.toUpperCase()?null:e.url:null}function F(...e){}function L(e,t,i){return e}class q{constructor(){this._generate=(0,s.Yj)("configuredGenerationMethod")||N,this._update=(0,s.Yj)("configuredUpdateMethod")||D,this._forget=(0,s.Yj)("configuredForgetMethod")||F,this._reset=(0,s.Yj)("configuredResetMethod")||F,this._merge=L,this._keyInfoForResource=(0,s.Yj)("configuredKeyInfoMethod")||j,this._id=P++,this._cache={resources:new Map,resourcesByType:Object.create(null),documents:new Map,polymorphicLidBackMap:new Map}}__configureMerge(e){this._merge=e||L}upgradeIdentifier(e){return this._getRecordIdentifier(e,2)}_getRecordIdentifier(e,t){if(A(e))return e
const i=this._generate(e,"record")
let r=I(this._cache,i)
if(null!==r)return r
if(0!==t){if(2===t)e.lid=i,e[o]=this._id,r=$(e)
else{const t=this._keyInfoForResource(e,null)
t.lid=i,t[o]=this._id,r=$(t)}return z(this._cache,r),r}}peekRecordIdentifier(e){return this._getRecordIdentifier(e,0)}getOrCreateDocumentIdentifier(e){let t=e.cacheOptions?.key
if(t||(t=this._generate(e,"document")),!t)return null
let i=this._cache.documents.get(t)
return void 0===i&&(i={lid:t},k.add(i),this._cache.documents.set(t,i)),i}getOrCreateRecordIdentifier(e){return this._getRecordIdentifier(e,1)}createIdentifierForNewRecord(e){const t=this._generate(e,"record"),i=$({id:e.id||null,type:e.type,lid:t,[o]:this._id})
return z(this._cache,i),i}updateRecordIdentifier(e,t){let i=this.getOrCreateRecordIdentifier(e)
const r=this._keyInfoForResource(t,i)
let n=function(e,t,i,r){const n=t.id,{id:s,type:o,lid:a}=i,l=e.resourcesByType[i.type]
if(null!==s&&s!==n&&null!==n){const e=l&&l.id.get(n)
return void 0!==e&&e}{const i=t.type
if(null!==s&&s===n&&i===o&&b(r)&&r.lid!==a)return I(e,r.lid)||!1
if(null!==s&&s===n&&i&&i!==o&&b(r)&&r.lid===a){const t=e.resourcesByType[i],r=t&&t.id.get(n)
return void 0!==r&&r}}return!1}(this._cache,r,i,t)
const s=b(t)
if(n||i.type!==r.type&&(s&&delete t.lid,n=this.getOrCreateRecordIdentifier(t)),n){const e=i
i=this._mergeRecordIdentifiers(r,e,n,t),s&&(t.lid=i.lid)}const o=i.id;(function(e,t,i,r){r(e,i,"record"),void 0!==i.id&&(e.id=p(i.id))})(i,0,t,this._update)
const a=i.id
if(o!==a&&null!==a){const e=this._cache.resourcesByType[i.type]
e.id.set(a,i),null!==o&&e.id.delete(o)}return i}_mergeRecordIdentifiers(e,t,i,r){const n=this._merge(t,i,r),s=n===t?i:t,o=this._cache.polymorphicLidBackMap.get(s.lid)
o&&this._cache.polymorphicLidBackMap.delete(s.lid),this.forgetRecordIdentifier(s),this._cache.resources.set(s.lid,n)
const a=this._cache.polymorphicLidBackMap.get(n.lid)??[]
return a.push(s.lid),o&&o.forEach((e=>{a.push(e),this._cache.resources.set(e,n)})),this._cache.polymorphicLidBackMap.set(n.lid,a),n}forgetRecordIdentifier(e){const t=this.getOrCreateRecordIdentifier(e),i=this._cache.resourcesByType[t.type]
null!==t.id&&i.id.delete(t.id),this._cache.resources.delete(t.lid),i.lid.delete(t.lid)
const r=this._cache.polymorphicLidBackMap.get(t.lid)
r&&(r.forEach((e=>{this._cache.resources.delete(e)})),this._cache.polymorphicLidBackMap.delete(t.lid)),t[o]=void 0,w.delete(t),this._forget(t,"record")}destroy(){T.clear(),this._cache.documents.forEach((e=>{k.delete(e)})),this._reset()}}function $(e,t,i){return w.add(e),e}function I(e,t,i){return e.resources.get(t)||null}function z(e,t){e.resources.set(t.lid,t)
let i=e.resourcesByType[t.type]
i||(i={lid:new Map,id:new Map},e.resourcesByType[t.type]=i),i.lid.set(t.lid,t),t.id&&i.id.set(t.id,t)}class B{constructor(e,t){f(this,"___token",void 0),f(this,"___identifier",void 0),this.store=e,this.___identifier=t,this.___token=e.notifications.subscribe(t,((e,t,i)=>{("identity"===t||"attributes"===t&&"id"===i)&&this._ref++}))}destroy(){this.store.notifications.unsubscribe(this.___token)}get type(){return this.identifier().type}id(){return this._ref,this.___identifier.id}identifier(){return this.___identifier}remoteType(){return"identity"}push(e){return Promise.resolve(e).then((e=>this.store.push(e)))}value(){return this.store.peekRecord(this.___identifier)}load(){const e=this.id()
if(null!==e)return this.store.findRecord(this.type,e)}reload(){const e=this.id()
if(null!==e)return this.store.findRecord(this.type,e,{reload:!0})}}(0,l.sg)(B.prototype,"_ref")
class H{constructor(e){this._store=e,this._willNotify=!1,this._pendingNotifies=new Map}get identifierCache(){return this._store.identifierCache}_scheduleNotification(e,t){let i=this._pendingNotifies.get(e)
i||(i=new Set,this._pendingNotifies.set(e,i)),i.add(t),!0!==this._willNotify&&(this._willNotify=!0,this._store._cbs?this._store._schedule("notify",(()=>this._flushNotifications())):this._flushNotifications())}_flushNotifications(){if(!1===this._willNotify)return
const e=this._pendingNotifies
this._pendingNotifies=new Map,this._willNotify=!1,e.forEach(((e,t)=>{e.forEach((e=>{this._store.notifications.notify(t,"relationships",e)}))}))}notifyChange(e,t,i){"relationships"===t&&i?this._scheduleNotification(e,i):this._store.notifications.notify(e,t,i)}get schema(){return this._store.schema}setRecordId(e,t){this._store._instanceCache.setRecordId(e,t)}hasRecord(e){return Boolean(this._store._instanceCache.peek(e))}disconnectRecord(e){this._store._instanceCache.disconnect(e),this._pendingNotifies.delete(e)}}H.prototype.getSchemaDefinitionService=function(){return this._store.schema}
const U=(0,s.L1)("CacheForIdentifierCache",new Map)
function V(e,t){U.set(e,t)}function W(e){U.delete(e)}function Y(e){return U.has(e)?U.get(e):null}const G=(0,s.L1)("RecordCache",new Map)
function K(e){return G.get(e)}function J(e){return G.get(e)}function X(e,t){G.set(e,t)}const Z=(0,s.L1)("StoreMap",new Map)
function Q(e){return Z.get(e)}class ee{constructor(e){f(this,"__instances",{record:new Map,reference:new WeakMap}),this.store=e,this._storeWrapper=new H(this.store),e.identifierCache.__configureMerge(((e,t,i)=>{let r=e
e.id!==t.id?r="id"in i&&e.id===i.id?e:t:e.type!==t.type&&(r="type"in i&&e.type===i.type?e:t)
const n=e===r?t:e,s=this.__instances.record.has(r),o=this.__instances.record.has(n)
if(s&&o&&"id"in i)throw new Error(`Failed to update the 'id' for the RecordIdentifier '${e.type}:${String(e.id)} (${e.lid})' to '${String(i.id)}', because that id is already in use by '${t.type}:${String(t.id)} (${t.lid})'`)
return this.store.cache.patch({op:"mergeIdentifiers",record:n,value:r}),this.unloadRecord(n),r}))}peek(e){return this.__instances.record.get(e)}getRecord(e,t){let i=this.__instances.record.get(e)
if(!i){const r=this.store.cache
V(e,r),i=this.store.instantiateRecord(e,t||{}),X(i,e),V(i,r),Z.set(i,this.store),this.__instances.record.set(e,i)}return i}getReference(e){const t=this.__instances.reference
let i=t.get(e)
return i||(i=new B(this.store,e),t.set(e,i)),i}recordIsLoaded(e,t=!1){const i=this.cache
if(!i)return!1
const r=i.isNew(e),n=i.isEmpty(e)
return r?!i.isDeleted(e):!(t&&i.isDeletionCommitted(e)||n)}disconnect(e){this.__instances.record.get(e),this.store._graph?.remove(e),this.store.identifierCache.forgetRecordIdentifier(e),W(e),this.store._requestCache._clearEntries(e)}unloadRecord(e){this.store._join((()=>{const t=this.__instances.record.get(e),i=this.cache
t&&(this.store.teardownRecord(t),this.__instances.record.delete(e),Z.delete(t),G.delete(t),W(t)),i?(i.unloadRecord(e),W(e)):this.disconnect(e),this.store._requestCache._clearEntries(e)}))}clear(e){const t=this.store.identifierCache._cache
if(void 0===e)t.resources.forEach((e=>{this.unloadRecord(e)}))
else{const i=t.resourcesByType,r=i[e]?.lid
r&&r.forEach((e=>{this.unloadRecord(e)}))}}setRecordId(e,t){const{type:i,lid:n}=e,s=e.id
null===s||null!==t?(this.store.identifierCache.peekRecordIdentifier({type:i,id:t}),null===e.id&&this.store.identifierCache.updateRecordIdentifier(e,{type:i,id:t}),this.store.notifications.notify(e,"identity")):(0,r.warn)(`Your ${i} record was saved to the server, but the response does not have an id.`,!(null!==s&&null===t))}}function te(e,t){return"string"==typeof e||"number"==typeof e?{type:t,id:y(e)}:J(e)}const ie=(0,s.L1)("AvailableShims",new WeakMap)
class re{constructor(e,t){this.__store=e,this.modelName=t}get fields(){const e=new Map
return this.__store.schema.fields({type:this.modelName}).forEach(((t,i)=>{"attribute"!==t.kind&&"belongsTo"!==t.kind&&"hasMany"!==t.kind||e.set(i,t.kind)})),e}get attributes(){const e=new Map
return this.__store.schema.fields({type:this.modelName}).forEach(((t,i)=>{"attribute"===t.kind&&e.set(i,t)})),e}get relationshipsByName(){const e=new Map
return this.__store.schema.fields({type:this.modelName}).forEach(((t,i)=>{"belongsTo"!==t.kind&&"hasMany"!==t.kind||e.set(i,t)})),e}eachAttribute(e,t){this.__store.schema.fields({type:this.modelName}).forEach(((i,r)=>{"attribute"===i.kind&&e.call(t,r,i)}))}eachRelationship(e,t){this.__store.schema.fields({type:this.modelName}).forEach(((i,r)=>{"belongsTo"!==i.kind&&"hasMany"!==i.kind||e.call(t,r,i)}))}eachTransformedAttribute(e,t){this.__store.schema.fields({type:this.modelName}).forEach(((i,r)=>{if("attribute"===i.kind){const n=i.type
n&&e.call(t,r,n)}}))}}const ne=new Set(["added","removed","state","updated"])
function se(e){return ne.has(e)}function oe(){return!!c._backburner.currentInstance&&!0!==c._backburner._autorun}class ae{constructor(e){this.store=e,this.isDestroyed=!1,this._buffered=new Map,this._hasFlush=!1,this._cache=new Map,this._tokens=new Map}subscribe(e,t){let i=this._cache.get(e)
i||(i=new Map,this._cache.set(e,i))
const r={}
return i.set(r,t),this._tokens.set(r,e),r}unsubscribe(e){this.isDestroyed||function(e,t,i){const r=e.get(t)
if(r){e.delete(t)
const n=i.get(r)
n?.delete(t)}}(this._tokens,e,this._cache)}notify(e,t,i){if(!A(e)&&!S(e))return!1
const r=Boolean(this._cache.get(e)?.size)
if(se(t)||r){let r=this._buffered.get(e)
r||(r=[],this._buffered.set(e,r)),r.push([t,i]),this._scheduleNotify()}return r}_onNextFlush(e){this._onFlushCB=e}_scheduleNotify(){const e=this.store._enableAsyncFlush
this._hasFlush&&!1!==e&&!oe()||(!e||oe()?this._flush():this._hasFlush=!0)}_flush(){this._buffered.size&&(this._buffered.forEach(((e,t)=>{e.forEach((e=>{this._flushNotification(t,e[0],e[1])}))})),this._buffered=new Map),this._hasFlush=!1,this._onFlushCB?.(),this._onFlushCB=void 0}_flushNotification(e,t,i){if(se(t)){const i=this._cache.get(S(e)?"document":"resource")
i&&i.forEach((i=>{i(e,t)}))}const r=this._cache.get(e)
return!(!r||!r.size||(r.forEach((r=>{r(e,t,i)})),0))}destroy(){this.isDestroyed=!0,this._tokens.clear(),this._cache.clear()}}const le=Proxy
var ce=Object.defineProperty;((e,t)=>{for(var i in t)ce(e,i,{get:t[i],enumerable:!0})})({},{c:()=>ge,f:()=>he,g:()=>de,i:()=>ye,m:()=>fe,n:()=>pe,p:()=>me})
var ue=new WeakMap
function he(e,t,i,r){return de(e.prototype,t,i,r)}function de(e,t,i,r){let n={configurable:!0,enumerable:!0,writable:!0,initializer:null}
r&&(n.initializer=r)
for(let s of i)n=s(e,t,n)||n
void 0===n.initializer?Object.defineProperty(e,t,n):function(e,t,i){let r=ue.get(e)
r||(r=new Map,ue.set(e,r)),r.set(t,i)}(e,t,n)}function fe({prototype:e},t,i){return pe(e,t,i)}function pe(e,t,i){let r={...Object.getOwnPropertyDescriptor(e,t)}
for(let n of i)r=n(e,t,r)||r
void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(e):void 0,r.initializer=void 0),Object.defineProperty(e,t,r)}function ye(e,t){let i=function(e,t){let i=e.prototype
for(;i;){let e=ue.get(i)?.get(t)
if(e)return e
i=i.prototype}}(e.constructor,t)
i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(e):void 0})}function ge(e,t){return t.reduce(((e,t)=>t(e)||e),e)}function me(e,t){for(let[i,r,n]of t)"field"===i?ve(e,r,n):pe(e,r,n)
return e}function ve(e,t,i){let r={configurable:!0,enumerable:!0,writable:!0,initializer:()=>Object.getOwnPropertyDescriptor(e,t)?.value}
for(let n of i)r=n(e,t,r)||r
r.initializer&&(r.value=r.initializer.call(e),delete r.initializer),Object.defineProperty(e,t,r)}const be=new Set([Symbol.iterator,"concat","entries","every","fill","filter","find","findIndex","flat","flatMap","forEach","includes","indexOf","join","keys","lastIndexOf","map","reduce","reduceRight","slice","some","values"]),_e=new Set(["push","pop","unshift","shift","splice","sort"]),we=new Set(["[]","length","links","meta"])
function ke(e){return be.has(e)}function Ae(e,t){return t in e}const Se=(0,s.L1)("#signal",Symbol("#signal")),Re=(0,s.L1)("#source",Symbol("#source")),xe=(0,s.L1)("#update",Symbol("#update")),Ce=(0,s.L1)("#notify",Symbol("#notify")),Me=(0,s.L1)("IS_COLLECTION",Symbol.for("Collection"))
function Ee(e){(0,l.RH)(e[Se])}function Oe(e){if("symbol"==typeof e)return null
const t=Number(e)
return isNaN(t)?null:t%1==0?t:null}class Te{[Ce](){Ee(this)}destroy(e){this.isDestroying=!e,this[Re].length=0,this[Ce](),this.isDestroyed=!e}get length(){return this[Re].length}set length(e){this[Re].length=e}constructor(e){f(this,"isLoaded",!0),f(this,"isDestroying",!1),f(this,"isDestroyed",!1),f(this,"_updatingPromise",null),f(this,Me,!0),f(this,Re,void 0)
const t=this
this.modelName=e.type,this.store=e.store,this._manager=e.manager,this[Re]=e.identifiers,this[Se]=(0,l.n5)(this,"length")
const i=e.store,r=new Map,n=this[Se],s={links:e.links||null,meta:e.meta||null}
let o=!1
const a=new le(this[Re],{get(a,c,u){const h=Oe(c)
if(n.shouldReset&&(null!==h||we.has(c)||ke(c))&&(e.manager._syncArray(u),n.t=!1,n.shouldReset=!1),null!==h){const e=a[h]
return o||(0,l.B1)(n),e&&i._instanceCache.getRecord(e)}if("meta"===c)return(0,l.B1)(n),s.meta
if("links"===c)return(0,l.B1)(n),s.links
if("[]"===c)return(0,l.B1)(n),u
if(ke(c)){let e=r.get(c)
return void 0===e&&(e="forEach"===c?function(){(0,l.B1)(n),o=!0
const e=function(e,t,i,r,n){void 0===n&&(n=null)
const s=(t=t.slice()).length
for(let o=0;o<s;o++)r.call(n,i._instanceCache.getRecord(t[o]),o,e)
return e}(u,a,i,arguments[0],arguments[1])
return o=!1,e}:function(){(0,l.B1)(n),o=!0
const e=Reflect.apply(a[c],u,arguments)
return o=!1,e},r.set(c,e)),e}if(function(e){return _e.has(e)}(c)){let i=r.get(c)
return void 0===i&&(i=function(){if(!e.allowMutation)return
const i=Array.prototype.slice.call(arguments)
o=!0
const r=t[xe](a,u,c,i,n)
return o=!1,r},r.set(c,i)),i}if(Ae(t,c)){if(c===Ce||c===Se||c===Re)return t[c]
let e=r.get(c)
if(e)return e
const i=t[c]
return"function"==typeof i?(e=function(){return(0,l.B1)(n),Reflect.apply(i,u,arguments)},r.set(c,e),e):((0,l.B1)(n),i)}return a[c]},set(i,r,a,l){if("length"===r){if(!o&&0===a)return o=!0,t[xe](i,l,"length 0",[],n),o=!1,!0
if(o)return Reflect.set(i,r,a)}if("links"===r)return s.links=a||null,!0
if("meta"===r)return s.meta=a||null,!0
const c=Oe(r)
if(null===c||c>i.length){if(null!==c&&o){const e=J(a)
return i[c]=e,!0}return!!Ae(t,r)&&(t[r]=a,!0)}if(!e.allowMutation)return!1
const u=i[c],h=(d=a)?J(d):null
var d
return i[c]=h,o?i[c]=h:t[xe](i,l,"replace cell",[c,u,h],n),!0},deleteProperty:(e,t)=>!!o&&Reflect.deleteProperty(e,t),getPrototypeOf:()=>Te.prototype})
return(0,l.zs)(a,n),this[Ce]=this[Ce].bind(a),a}update(){if(this.isUpdating)return this._updatingPromise
this.isUpdating=!0
const e=this._update()
return e.finally((()=>{this._updatingPromise=null,this.isDestroying||this.isDestroyed||(this.isUpdating=!1)})),this._updatingPromise=e,e}_update(){return this.store.findAll(this.modelName,{reload:!0})}save(){return Promise.all(this.map((e=>this.store.saveRecord(e)))).then((()=>this))}}pe(Te.prototype,"length",[u.Vv])
const Pe={enumerable:!0,configurable:!1,get:function(){return this}};(0,u.Vv)(Pe),Object.defineProperty(Te.prototype,"[]",Pe),(0,l.sg)(Te.prototype,"isUpdating",!1)
class De extends Te{constructor(e){super(e),f(this,"query",null),this.query=e.query||null,this.isLoaded=e.isLoaded||!1}_update(){const{store:e,query:t}=this
return e.query(this.modelName,t,{_recordArray:this})}destroy(e){super.destroy(e),this._manager._managed.delete(this),this._manager._pending.delete(this)}}De.prototype.query=null
const je=(0,s.L1)("FAKE_ARR",{}),Ne=1200
function Fe(e,t){let i=0
const r=t.length
for(;r-i>Ne;)e.push.apply(e,t.slice(i,i+Ne)),i+=Ne
e.push.apply(e,t.slice(i))}class Le{constructor(e){this.store=e.store,this.isDestroying=!1,this.isDestroyed=!1,this._live=new Map,this._managed=new Set,this._pending=new Map,this._staged=new Map,this._keyedArrays=new Map,this._identifiers=new Map,this._set=new Map,this._visibilitySet=new Map,this._subscription=this.store.notifications.subscribe("resource",((e,t)=>{"added"===t?(this._visibilitySet.set(e,!0),this.identifierAdded(e)):"removed"===t?(this._visibilitySet.set(e,!1),this.identifierRemoved(e)):"state"===t&&this.identifierChanged(e)}))}_syncArray(e){const t=this._pending.get(e)
!t||this.isDestroying||this.isDestroyed||(function(e,t,i){const r=e[Re],n=[],s=[]
t.forEach(((e,t)=>{if("add"===e){if(i.has(t))return
n.push(t),i.add(t)}else i.has(t)&&(s.push(t),i.delete(t))})),s.length&&(s.length===r.length?r.length=0:s.forEach((e=>{const t=r.indexOf(e);-1!==t&&(r.splice(t,1),i.delete(e))}))),n.length&&Fe(r,n)}(e,t,this._set.get(e)),this._pending.delete(e))}liveArrayFor(e){let t=this._live.get(e)
const i=[],r=this._staged.get(e)
return r&&(r.forEach(((e,t)=>{"add"===e&&i.push(t)})),this._staged.delete(e)),t||(t=new Te({type:e,identifiers:i,store:this.store,allowMutation:!1,manager:this}),this._live.set(e,t),this._set.set(t,new Set(i))),t}createArray(e){const t={type:e.type,links:e.doc?.links||null,meta:e.doc?.meta||null,query:e.query||null,identifiers:e.identifiers||[],isLoaded:!!e.identifiers?.length,allowMutation:!1,store:this.store,manager:this},i=new De(t)
return this._managed.add(i),this._set.set(i,new Set(t.identifiers||[])),e.identifiers&&qe(this._identifiers,i,e.identifiers),i}dirtyArray(e,t){if(e===je)return
const i=e[Se]
i.shouldReset?t>0&&!i.t&&(0,l.Fe)(e[Ce]):(i.shouldReset=!0,(0,l.Fe)(e[Ce]))}_getPendingFor(e,t,i){if(this.isDestroying||this.isDestroyed)return
const r=this._live.get(e.type),n=this._pending,s=new Map
if(t){const t=this._identifiers.get(e)
t&&t.forEach((e=>{let t=n.get(e)
t||(t=new Map,n.set(e,t)),s.set(e,t)}))}if(r&&0===r[Re].length&&i){const e=n.get(r)
if(!e||0===e.size)return s}if(r){let e=n.get(r)
e||(e=new Map,n.set(r,e)),s.set(r,e)}else{let t=this._staged.get(e.type)
t||(t=new Map,this._staged.set(e.type,t)),s.set(je,t)}return s}populateManagedArray(e,t,i){this._pending.delete(e)
const r=e[Re],n=r.slice()
r.length=0,Fe(r,t),this._set.set(e,new Set(t)),Ee(e),e.meta=i.meta||null,e.links=i.links||null,e.isLoaded=!0,function(e,t,i){for(let r=0;r<i.length;r++)$e(e,t,i[r])}(this._identifiers,e,n),qe(this._identifiers,e,t)}identifierAdded(e){const t=this._getPendingFor(e,!1)
t&&t.forEach(((t,i)=>{"del"===t.get(e)?t.delete(e):(t.set(e,"add"),this.dirtyArray(i,t.size))}))}identifierRemoved(e){const t=this._getPendingFor(e,!0,!0)
t&&t.forEach(((t,i)=>{"add"===t.get(e)?t.delete(e):(t.set(e,"del"),this.dirtyArray(i,t.size))}))}identifierChanged(e){const t=this.store._instanceCache.recordIsLoaded(e,!0)
this._visibilitySet.get(e)!==t&&(t?this.identifierAdded(e):this.identifierRemoved(e))}clear(e=!0){this._live.forEach((t=>t.destroy(e))),this._managed.forEach((t=>t.destroy(e))),this._managed.clear(),this._identifiers.clear(),this._pending.clear(),this._set.forEach((e=>e.clear())),this._visibilitySet.clear()}destroy(){this.isDestroying=!0,this.clear(!1),this._live.clear(),this.isDestroyed=!0,this.store.notifications.unsubscribe(this._subscription)}}function qe(e,t,i){for(let r=0;r<i.length;r++){const n=i[r]
let s=e.get(n)
s||(s=new Set,e.set(n,s)),s.add(t)}}function $e(e,t,i){const r=e.get(i)
r&&r.delete(t)}const Ie=(0,s.L1)("Touching",Symbol("touching")),ze=(0,s.L1)("RequestPromise",Symbol("promise")),Be=[]
class He{constructor(e){f(this,"_pending",new Map),f(this,"_done",new Map),f(this,"_subscriptions",new Map),f(this,"_toFlush",[]),f(this,"_store",void 0),this._store=e}_clearEntries(e){this._done.delete(e)}_enqueue(e,t){const i=t.data[0]
if("recordIdentifier"in i){const r=i.recordIdentifier,n="saveRecord"===i.op?"mutation":"query"
this._pending.has(r)||this._pending.set(r,[])
const s={state:"pending",request:t,type:n}
return s[Ie]=[i.recordIdentifier],s[ze]=e,this._pending.get(r).push(s),this._triggerSubscriptions(s),e.then((e=>{this._dequeue(r,s)
const i={state:"fulfilled",request:t,type:n,response:{data:e}}
return i[Ie]=s[Ie],this._addDone(i),this._triggerSubscriptions(i),e}),(e=>{this._dequeue(r,s)
const i={state:"rejected",request:t,type:n,response:{data:e}}
throw i[Ie]=s[Ie],this._addDone(i),this._triggerSubscriptions(i),e}))}}_triggerSubscriptions(e){"pending"!==e.state?(this._toFlush.push(e),1===this._toFlush.length&&this._store.notifications._onNextFlush((()=>{this._flush()}))):this._flushRequest(e)}_flush(){this._toFlush.forEach((e=>{this._flushRequest(e)})),this._toFlush=[]}_flushRequest(e){e[Ie].forEach((t=>{const i=this._subscriptions.get(t)
i&&i.forEach((t=>t(e)))}))}_dequeue(e,t){const i=this._pending.get(e)
this._pending.set(e,i.filter((e=>e!==t)))}_addDone(e){e[Ie].forEach((t=>{const i=e.request.data[0].op
let r=this._done.get(t)
r&&(r=r.filter((e=>{let t
return t=Array.isArray(e.request.data)?e.request.data[0]:e.request.data,t.op!==i}))),r=r||[],r.push(e),this._done.set(t,r)}))}subscribeForRecord(e,t){let i=this._subscriptions.get(e)
i||(i=[],this._subscriptions.set(e,i)),i.push(t)}getPendingRequestsForRecord(e){return this._pending.get(e)||Be}getLastRequestForRecord(e){const t=this._done.get(e)
return t?t[t.length-1]:null}}function Ue(e){return Boolean(e&&"string"==typeof e)}function Ve(e,t,i){if("object"==typeof e&&null!==e){const t=e
return A(t)||"id"in t&&(t.id=p(t.id)),t}{const r=p(t)
if(!Ue(r)){if(Ue(i))return{lid:i}
throw new Error("Expected either id or lid to be a valid string")}return Ue(i)?{type:e,id:r,lid:i}:{type:e,id:r}}}const We=class{constructor(e){}},Ye=We
Ye!==We&&(0,r.deprecate)("The Store class extending from EmberObject is deprecated.\nPlease remove usage of EmberObject APIs and mark your class as not requiring it.\n\nTo mark the class as no longer extending from EmberObject, in ember-cli-build.js\nset the following config:\n\n```js\nconst app = new EmberApp(defaults, {\n  emberData: {\n    deprecations: {\n      DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false\n    }\n  }\n});\n```\n",!1,{id:"ember-data:deprecate-store-extends-ember-object",until:"6.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}})
class Ge extends Ye{get schema(){return this._schema||(this._schema=this.createSchemaService()),this._schema}get isDestroying(){return this._isDestroying}set isDestroying(e){this._isDestroying=e}get isDestroyed(){return this._isDestroyed}set isDestroyed(e){this._isDestroyed=e}constructor(e){super(e),Object.assign(this,e),this.identifierCache=new q,this.notifications=new ae(this),this.recordArrayManager=new Le({store:this}),this._requestCache=new He(this),this._instanceCache=new ee(this),this._documentCache=new Map,this.isDestroying=!1,this.isDestroyed=!1}_run(e){const t=this._cbs={}
e(),t.coalesce&&t.coalesce(),t.sync&&t.sync(),t.notify&&t.notify(),this._cbs=null}_join(e){this._cbs?e():this._run(e)}_schedule(e,t){this._cbs[e]=t}getRequestStateService(){return this._requestCache}_getAllPending(){}request(e){const t={store:this,[n._q]:!0}
if(e.records){const i=this.identifierCache
t.records=e.records.map((e=>i.getOrCreateRecordIdentifier(e)))}const i=Object.assign({},e,t),r=this.requestManager.request(i)
return r.onFinalize((()=>{("findBelongsTo"!==e.op||e.url)&&this.notifications._flush()})),r}modelFor(e){return function(e,t){let i=ie.get(e)
i||(i=Object.create(null),ie.set(e,i))
let r=i[t]
return void 0===r&&(r=i[t]=new re(e,t)),r}(this,e)}createRecord(e,t){let i
return this._join((()=>{const r=g(e),n={...t}
let s=null
if(null===n.id||void 0===n.id){const e=this.adapterFor?.(r,!0)
s=e&&e.generateIdForRecord?n.id=p(e.generateIdForRecord(this,r,n)):n.id=null}else s=n.id=p(n.id)
const o={type:r,id:s}
o.id&&this.identifierCache.peekRecordIdentifier(o)
const a=this.identifierCache.createIdentifierForNewRecord(o),l=this.cache,c=function(e,t,i){if(void 0!==i){const{type:r}=t,n=e.schema.fields({type:r})
if(n.size){const e=Object.keys(i)
for(let t=0;t<e.length;t++){const r=e[t],s=n.get(r)
s&&("hasMany"===s.kind?i[r]=i[r].map((e=>Je(e))):"belongsTo"===s.kind&&(i[r]=Je(i[r])))}}}return i}(this,a,n),u=l.clientDidCreate(a,c)
i=this._instanceCache.getRecord(a,u)})),i}deleteRecord(e){const t=K(e),i=this.cache
this._join((()=>{i.setIsDeleted(t,!0),i.isNew(t)&&this._instanceCache.unloadRecord(t)}))}unloadRecord(e){const t=K(e)
t&&this._instanceCache.unloadRecord(t)}findRecord(e,t,i){Ke(e)?i=t:e=Ve(g(e),y(t))
const r=this.identifierCache.getOrCreateRecordIdentifier(e)
return(i=i||{}).preload&&(this._instanceCache.recordIsLoaded(r)||(i.reload=!0),this._join((()=>{!function(e,t,i){const r={},n=e.schema.fields(t)
Object.keys(i).forEach((e=>{const t=i[e],s=n.get(e)
!s||"hasMany"!==s.kind&&"belongsTo"!==s.kind?(r.attributes||(r.attributes={}),r.attributes[e]=t):(r.relationships||(r.relationships={}),r.relationships[e]=function(e,t){const i=e.type
return"hasMany"===e.kind?{data:t.map((e=>te(e,i)))}:{data:t?te(t,i):null}}(s,t))}))
const s=e.cache,o=Boolean(e._instanceCache.peek(t))
s.upsert(t,r,o)}(this,r,i.preload)}))),this.request({op:"findRecord",data:{record:r,options:i},cacheOptions:{[n.ER]:!0}}).then((e=>e.content))}getReference(e,t){let i
i=1===arguments.length&&Ke(e)?e:Ve(g(e),y(t))
const r=this.identifierCache.getOrCreateRecordIdentifier(i)
return this._instanceCache.getReference(r)}peekRecord(e,t){if(1===arguments.length&&Ke(e)){const t=this.identifierCache.peekRecordIdentifier(e)
return t&&this._instanceCache.recordIsLoaded(t)?this._instanceCache.getRecord(t):null}const i={type:g(e),id:y(t)},r=this.identifierCache.peekRecordIdentifier(i)
return r&&this._instanceCache.recordIsLoaded(r)?this._instanceCache.getRecord(r):null}query(e,t,i={}){return this.request({op:"query",data:{type:g(e),query:t,options:i},cacheOptions:{[n.ER]:!0}}).then((e=>e.content))}queryRecord(e,t,i){return this.request({op:"queryRecord",data:{type:g(e),query:t,options:i||{}},cacheOptions:{[n.ER]:!0}}).then((e=>e.content))}findAll(e,t={}){return this.request({op:"findAll",data:{type:g(e),options:t||{}},cacheOptions:{[n.ER]:!0}}).then((e=>e.content))}peekAll(e){return this.recordArrayManager.liveArrayFor(g(e))}unloadAll(e){this._join((()=>{void 0===e?(this._graph?.identifiers.clear(),this.recordArrayManager.clear(),this._instanceCache.clear()):this._instanceCache.clear(g(e))}))}push(e){const t=this._push(e,!1)
return Array.isArray(t)?t.map((e=>this._instanceCache.getRecord(e))):null===t?null:this._instanceCache.getRecord(t)}_push(e,t){let i
return t&&(this._enableAsyncFlush=!0),this._join((()=>{i=this.cache.put({content:e})})),this._enableAsyncFlush=null,"data"in i?i.data:null}saveRecord(e,t={}){const i=J(e),r=this.cache
if(!i)return Promise.reject(new Error("Record Is Disconnected"))
if(function(e,t){const i=e.cache
return!i||function(e,t){return t.isDeletionCommitted(e)||t.isNew(e)&&t.isDeleted(e)}(t,i)}(this._instanceCache,i))return Promise.resolve(e)
t||(t={})
let s="updateRecord"
r.isNew(i)?s="createRecord":r.isDeleted(i)&&(s="deleteRecord")
const o={op:s,data:{options:t,record:i},records:[i],cacheOptions:{[n.ER]:!0}}
return this.request(o).then((e=>e.content))}get cache(){let{cache:e}=this._instanceCache
return e||(e=this._instanceCache.cache=this.createCache(this._instanceCache._storeWrapper)),e}destroy(){this.isDestroyed||(this.isDestroying=!0,this._graph?.destroy(),this._graph=void 0,this.notifications.destroy(),this.recordArrayManager.destroy(),this.identifierCache.destroy(),this.unloadAll(),this.isDestroyed=!0)}static create(e){return new this(e)}}function Ke(e){return Boolean(null!==e&&"object"==typeof e&&("id"in e&&"type"in e&&e.id&&e.type||e.lid))}function Je(e){return e?J(e):null}function Xe(e){return"string"==typeof e?e:e.href}Ge.prototype.getSchemaDefinitionService=function(){return(0,r.deprecate)("Use `store.schema` instead of `store.getSchemaDefinitionService()`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this._schema},Ge.prototype.registerSchemaDefinitionService=function(e){(0,r.deprecate)("Use `store.createSchemaService` instead of `store.registerSchemaDefinitionService()`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this._schema=e},Ge.prototype.registerSchema=function(e){(0,r.deprecate)("Use `store.createSchemaService` instead of `store.registerSchema()`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this._schema=e}
var Ze=new WeakMap,Qe=new WeakSet
class et{constructor(e,t){var i
h(this,i=Qe),i.add(this),function(e,t){h(e,t),t.set(e,void 0)}(this,Ze),function(e,t,i){e.set(d(e,t),i)}(Ze,this,e),this.identifier=t}fetch(e={}){return e.cacheOptions=e.cacheOptions||{},e.cacheOptions.key=this.identifier?.lid,d(Qe,this,tt).call(this,this.links.related?"related":"self",e)}next(e={}){return d(Qe,this,tt).call(this,"next",e)}prev(e={}){return d(Qe,this,tt).call(this,"prev",e)}first(e={}){return d(Qe,this,tt).call(this,"first",e)}last(e={}){return d(Qe,this,tt).call(this,"last",e)}toJSON(){const e={}
return e.identifier=this.identifier,void 0!==this.data&&(e.data=this.data),void 0!==this.links&&(e.links=this.links),void 0!==this.errors&&(e.errors=this.errors),void 0!==this.meta&&(e.meta=this.meta),e}}async function tt(e,t){const i=this.links?.[e]
return i?(t.method=t.method||"GET",Object.assign(t,{url:Xe(i)}),(await(r=Ze,r.get(d(r,this))).request(t)).content):null
var r}(0,l.sg)(et.prototype,"data"),(0,l.sg)(et.prototype,"links"),(0,l.sg)(et.prototype,"errors"),(0,l.sg)(et.prototype,"meta")
const it=new Set(["createRecord","updateRecord","deleteRecord"])
function rt(e,t,i,r,n){const{identifier:s}=i
if(!r)return r
if(function(e){return"errors"in e}(r)){if(!s&&!i.shouldHydrate)return r
let t
return s&&(t=e._documentCache.get(s)),t?n||(t.data=void 0,lt(t,r)):(t=new et(e,s),lt(t,r),s&&e._documentCache.set(s,t)),i.shouldHydrate?t:r}if(Array.isArray(r.data)){const{recordArrayManager:o}=e
if(!s){if(!i.shouldHydrate)return r
const n=o.createArray({type:t.url,identifiers:r.data,doc:r,query:t}),s=new et(e,null)
return s.data=n,s.meta=r.meta,s.links=r.links,s}let a=o._keyedArrays.get(s.lid)
if(a){const t=e._documentCache.get(s)
return n||(o.populateManagedArray(a,r.data,r),t.data=a,t.meta=r.meta,t.links=r.links),i.shouldHydrate?t:r}{a=o.createArray({type:s.lid,identifiers:r.data,doc:r}),o._keyedArrays.set(s.lid,a)
const t=new et(e,s)
return t.data=a,t.meta=r.meta,t.links=r.links,e._documentCache.set(s,t),i.shouldHydrate?t:r}}{if(!s&&!i.shouldHydrate)return r
const t=r.data?e.peekRecord(r.data):null
let o
return s&&(o=e._documentCache.get(s)),o?n||(o.data=t,lt(o,r)):(o=new et(e,s),o.data=t,lt(o,r),s&&e._documentCache.set(s,o)),i.shouldHydrate?o:r}}function nt(e){return Boolean(e.op&&it.has(e.op))}function st(e,t,i,r,s){const{store:o}=t.request,a=t.request[n._q]||!1
let l=!1
if(nt(t.request)){l=!0
const e=t.request.data?.record||t.request.records?.[0]
e&&o.cache.willCommit(e,t)}o.lifetimes?.willRequest&&o.lifetimes.willRequest(t.request,i,o)
const c=e(t.request).then((e=>{let n
if(o.requestManager._pending.delete(t.id),o._enableAsyncFlush=!0,o._join((()=>{if(nt(t.request)){const i=t.request.data?.record||t.request.records?.[0]
i?n=o.cache.didCommit(i,e):function(e){return!nt(e.request)||("createRecord"===e.request.op&&201===e.response?.status?!!e.content&&Object.keys(e.content).length>0:204!==e.response?.status)}(e)&&(n=o.cache.put(e))}else n=o.cache.put(e)
n=rt(o,t.request,{shouldHydrate:a,shouldFetch:r,shouldBackgroundFetch:s,identifier:i},n,!1)})),o._enableAsyncFlush=null,o.lifetimes?.didRequest&&o.lifetimes.didRequest(t.request,e.response,i,o),r)return n
s&&o.notifications._flush()}),(e=>{if(o.requestManager._pending.delete(t.id),t.request.signal?.aborted)throw e
let n
if(o.requestManager._pending.delete(t.id),o._enableAsyncFlush=!0,o._join((()=>{if(nt(t.request)){const i=e&&e.content&&"object"==typeof e.content&&"errors"in e.content&&Array.isArray(e.content.errors)?e.content.errors:void 0,r=t.request.data?.record||t.request.records?.[0]
throw o.cache.commitWasRejected(r,i),e}n=o.cache.put(e),n=rt(o,t.request,{shouldHydrate:a,shouldFetch:r,shouldBackgroundFetch:s,identifier:i},n,!1)})),o._enableAsyncFlush=null,i&&o.lifetimes?.didRequest&&o.lifetimes.didRequest(t.request,e.response,i,o),!s){const t=ot(e)
throw t.content=n,t}o.notifications._flush()}))
if(!l)return c
const u=t.request.data?.record||t.request.records?.[0]
return o._requestCache._enqueue(c,{data:[{op:"saveRecord",recordIdentifier:u,options:void 0}]})}function ot(e){const t=function(e){return e instanceof AggregateError||"AggregateError"===e.name&&Array.isArray(e.errors)}(e),i=t?new AggregateError(structuredClone(e.errors),e.message):new Error(e.message)
return i.stack=e.stack,i.error=e.error,Object.assign(i,e),i}const at={request(e,t){if(!e.request.store||e.request.cacheOptions?.[n.ER])return t(e.request)
const{store:i}=e.request,r=i.identifierCache.getOrCreateDocumentIdentifier(e.request),s=r?i.cache.peekRequest(r):null
if(function(e,t,i,r){const{cacheOptions:n}=t
return t.op&&it.has(t.op)||n?.reload||!i||!(!e.lifetimes||!r)&&e.lifetimes.isHardExpired(r,e)}(i,e.request,!!s,r))return st(t,e,r,!0,!1)
if(function(e,t,i,r){const{cacheOptions:n}=t
return n?.backgroundReload||!(!e.lifetimes||!r)&&e.lifetimes.isSoftExpired(r,e)}(i,e.request,0,r)){const n=st(t,e,r,!1,!0)
i.requestManager._pending.set(e.id,n)}const o=e.request[n._q]||!1
if(e.setResponse(s.response),"error"in s){const t=o?rt(i,e.request,{shouldHydrate:o,identifier:r},s.content,!0):s.content,n=ot(s)
throw n.content=t,n}return o?rt(i,e.request,{shouldHydrate:o,identifier:r},s.content,!0):s.content}}
function lt(e,t){"links"in t&&(e.links=t.links),"meta"in t&&(e.meta=t.meta),"errors"in t&&(e.errors=t.errors)}},879:(e,t,i)=>{i.r(t),i.d(t,{CacheHandler:()=>r.C,default:()=>r.S,recordIdentifierFor:()=>r.r,setIdentifierForgetMethod:()=>r.c,setIdentifierGenerationMethod:()=>r.a,setIdentifierResetMethod:()=>r.d,setIdentifierUpdateMethod:()=>r.b,setKeyInfoForResource:()=>r.e,storeFor:()=>r.s})
var r=i(635)
i(603),i(500)},284:(e,t,i)=>{i.d(t,{B1:()=>l,Fe:()=>u,RH:()=>c,V1:()=>y,i$:()=>g,n5:()=>p,sg:()=>d,zs:()=>f})
var r=i(463),n=i(606),s=i(175)
function o(e){e&&(0,n.consumeTag)(e)}function a(e){e&&(0,n.dirtyTag)(e)}function l(e){const t=(0,s.Yj)("TRANSACTION")
t?t.sub.add(e):"tag"in e?(o(e["[]"]),o(e["@length"]),(0,n.consumeTag)(e.tag)):e.ref}function c(e){const t=(0,s.Yj)("TRANSACTION")
t?t.props.add(e):function(e){"tag"in e?(a(e["[]"]),a(e["@length"]),(0,n.dirtyTag)(e.tag)):e.ref=null}(e)}function u(e){const t=(0,s.Yj)("TRANSACTION")
t?t.cbs.add(e):e()}const h=(0,s.L1)("Signals",Symbol("Signals"))
function d(e,t,i){Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get(){const e=this[h]=this[h]||new Map,r=e.has(t),n=function(e,t,i){let r=e.get(i)
return r||(r=p(t,i),e.set(i,r)),l(r),r}(e,this,t)
return r||void 0===i||(n.lastValue=i),n.lastValue},set(e){const i=this[h]=this[h]||new Map
let r=i.get(t)
r||(r=p(this,t),i.set(t,r)),r.lastValue!==e&&(r.lastValue=e,c(r))}})}function f(e,t){t["[]"]=(0,r.tagForProperty)(e,"[]"),t["@length"]=(0,r.tagForProperty)(e,"length")}function p(e,t){return{key:t,tag:(0,r.tagForProperty)(e,t),t:!1,shouldReset:!1,"[]":null,"@length":null,lastValue:void 0}}function y(e,t,i){let r=e[h]
r||(r=new Map,e[h]=r)
let n=r.get(t)
return n||(n=p(e,t),n.shouldReset=i,r.set(t,n)),n}function g(e,t){const i=e[h]
if(i)return i.get(t)}},684:(e,t,i)=>{i.d(t,{PO:()=>s,Vv:()=>n.dependentKeyCompat})
var r=i(217),n=(i(284),i(394))
function s(e,t,i){const n=new WeakMap,s=i.get
i.get=function(){return n.has(this)||n.set(this,(0,r.createCache)(s.bind(this))),(0,r.getValue)(n.get(this))}}},903:(e,t,i)=>{function r(e){return e?.__esModule?e:{default:e,...e}}i.d(t,{A:()=>r})},175:(e,t,i)=>{i.d(t,{L1:()=>l,Yj:()=>c,dN:()=>d,dV:()=>u,ml:()=>f,vs:()=>h})
const r="@warp-drive/core-types",n=globalThis,s=n.__warpDrive_universalCache=n.__warpDrive_universalCache??{}
n[r]=n[r]??{__version:"0.0.0-beta.11"}
const o=n[r],a=o.__warpDrive_ModuleScopedCaches??{}
if(o.__warpDrive_hasOtherCopy)throw new Error("Multiple copies of EmberData detected, the application will malfunction.")
function l(e,t){return t}function c(e){return a[`(transient) ${e}`]??null}function u(e,t){return a[`(transient) ${e}`]=t}function h(e,t){return t}function d(e){return s[`(transient) ${e}`]??null}function f(e,t){return s[`(transient) ${e}`]=t}o.__warpDrive_hasOtherCopy=!0},856:(e,t,i)=>{i.d(t,{ER:()=>n,J6:()=>o,_q:()=>s,k0:()=>a})
var r=i(175)
const n=(0,r.vs)("SkipCache",Symbol.for("wd:skip-cache")),s=(0,r.vs)("EnableHydration",Symbol.for("wd:enable-hydration")),o=(0,r.L1)("IS_FUTURE",Symbol("IS_FUTURE")),a=(0,r.L1)("DOC",Symbol("DOC"))},220:(e,t,i)=>{i.d(t,{k5:()=>s,pm:()=>n})
var r=i(175)
const n=(0,r.L1)("Store",Symbol("Store")),s=(0,r.L1)("$type",Symbol("$type"));(0,r.L1)("RequestSignature",Symbol("RequestSignature"))},83:(e,t,i)=>{i.r(t),i.d(t,{default:()=>mt})
var r=i(424)
const n={iterator:()=>({next:()=>({done:!0,value:void 0})})}
class s{constructor(e){this.version="2",this._capabilities=e,this.__cache=new Map,this.__graph=(0,r.graphFor)(e),this.__destroyedCache=new Map,this.__documents=new Map}put(e){if(b(e))return this._putDocument(e,void 0,void 0)
if(function(e){return!(e instanceof Error)&&e.content&&!("data"in e.content)&&!("included"in e.content)&&"meta"in e.content}(e))return this._putDocument(e,void 0,void 0)
const t=e.content,i=t.included
let r,n
const{identifierCache:s}=this._capabilities
if(i)for(r=0,n=i.length;r<n;r++)i[r]=m(this,s,i[r])
if(Array.isArray(t.data)){n=t.data.length
const o=[]
for(r=0;r<n;r++)o.push(m(this,s,t.data[r]))
return this._putDocument(e,o,i)}if(null===t.data)return this._putDocument(e,null,i)
const o=m(this,s,t.data)
return this._putDocument(e,o,i)}_putDocument(e,t,i){const r=b(e)?function(e){const t={}
return e.content&&(_(t,e.content),"errors"in e.content?t.errors=e.content.errors:"object"==typeof e.error&&"errors"in e.error?t.errors=e.error.errors:t.errors=[{title:e.message}]),t}(e):function(e){const t={},i=e.content
return i&&_(t,i),t}(e)
void 0!==t&&(r.data=t),void 0!==i&&(r.included=i)
const n=e.request,s=n?this._capabilities.identifierCache.getOrCreateDocumentIdentifier(n):null
if(s){r.lid=s.lid,e.content=r
const t=this.__documents.has(s.lid)
this.__documents.set(s.lid,e),this._capabilities.notifyChange(s,t?"updated":"added")}return r}patch(e){if("mergeIdentifiers"===e.op){const t=this.__cache.get(e.record)
t&&(this.__cache.set(e.value,t),this.__cache.delete(e.record)),this.__graph.update(e,!0)}}mutate(e){this.__graph.update(e,!1)}peek(e){if("type"in e){const t=this.__safePeek(e,!1)
if(!t)return null
const{type:i,id:r,lid:n}=e,s=Object.assign({},t.remoteAttrs,t.inflightAttrs,t.localAttrs),o={},a=this.__graph.identifiers.get(e)
a&&Object.keys(a).forEach((t=>{a[t].definition.isImplicit||(o[t]=this.__graph.getData(e,t))})),this._capabilities
const c=this._capabilities._store
return this._capabilities.schema.fields(e).forEach(((t,i)=>{if(i in s&&void 0!==s[i])return
const r=l(t,e,c)
void 0!==r&&(s[i]=r)})),{type:i,id:r,lid:n,attributes:s,relationships:o}}const t=this.peekRequest(e)
return t&&"content"in t?t.content:null}peekRequest(e){return this.__documents.get(e.lid)||null}upsert(e,t,i){let r
const n=this.__safePeek(e,!1),s=!!n,o=n||this._createCache(e),a=function(e,t,i){const r=t._store.getRequestStateService()
return!d(e)&&r.getPendingRequestsForRecord(i).some((e=>"query"===e.type))}(n,this._capabilities,e)||!d(n),l=!function(e){if(!e)return!0
const t=e.isNew,i=e.isDeleted,r=h(e)
return(!t||i)&&r}(n)&&!a
return o.isNew&&(o.isNew=!1,this._capabilities.notifyChange(e,"identity"),this._capabilities.notifyChange(e,"state")),i&&(r=s?u(o,t.attributes):Object.keys(t.attributes||{})),o.remoteAttrs=Object.assign(o.remoteAttrs||Object.create(null),t.attributes),o.localAttrs&&g(o)&&this._capabilities.notifyChange(e,"state"),l||this._capabilities.notifyChange(e,"added"),t.id&&(o.id=t.id),t.relationships&&f(this.__graph,this._capabilities,e,t),r&&r.length&&c(this._capabilities,e,r),r}fork(){throw new Error("Not Implemented")}merge(e){throw new Error("Not Implemented")}diff(){throw new Error("Not Implemented")}dump(){throw new Error("Not Implemented")}hydrate(e){throw new Error("Not Implemented")}clientDidCreate(e,t){this._createCache(e).isNew=!0
const i={}
if(void 0!==t){const r=this._capabilities.schema.fields(e),n=this.__graph,s=Object.keys(t)
for(let o=0;o<s.length;o++){const a=s[o],l=t[a]
if("id"===a)continue
const c=r.get(a)
let u
switch(void 0!==c?"kind"in c?c.kind:"attribute":null){case"attribute":this.setAttr(e,a,l),i[a]=l
break
case"belongsTo":this.mutate({op:"replaceRelatedRecord",field:a,record:e,value:l}),u=n.get(e,a),u.state.hasReceivedData=!0,u.state.isEmpty=!1
break
case"hasMany":this.mutate({op:"replaceRelatedRecords",field:a,record:e,value:l}),u=n.get(e,a),u.state.hasReceivedData=!0,u.state.isEmpty=!1
break
default:i[a]=l}}}return this._capabilities.notifyChange(e,"added"),i}willCommit(e){const t=this.__peek(e,!1)
t.inflightAttrs?t.localAttrs&&Object.assign(t.inflightAttrs,t.localAttrs):t.inflightAttrs=t.localAttrs,t.localAttrs=null}didCommit(e,t){const i=t.content,r=t.request.op,n=i&&i.data,{identifierCache:s}=this._capabilities,o=e.id,a="deleteRecord"!==r&&n?s.updateRecordIdentifier(e,n):e,l=this.__peek(a,!1)
let h
l.isDeleted&&(this.__graph.push({op:"deleteRecord",record:a,isNew:!1}),l.isDeletionCommitted=!0,this._capabilities.notifyChange(a,"removed")),l.isNew=!1,n&&(n.id&&!l.id&&(l.id=n.id),a===e&&a.id!==o&&this._capabilities.notifyChange(a,"identity"),n.relationships&&f(this.__graph,this._capabilities,a,n),h=n.attributes)
const d=u(l,h)
l.remoteAttrs=Object.assign(l.remoteAttrs||Object.create(null),l.inflightAttrs,h),l.inflightAttrs=null,g(l),l.errors&&(l.errors=null,this._capabilities.notifyChange(a,"errors")),c(this._capabilities,a,d),this._capabilities.notifyChange(a,"state")
const p=i&&i.included
if(p)for(let c=0,u=p.length;c<u;c++)m(this,s,p[c])
return{data:a}}commitWasRejected(e,t){const i=this.__peek(e,!1)
if(i.inflightAttrs){const e=Object.keys(i.inflightAttrs)
if(e.length>0){const t=i.localAttrs=i.localAttrs||Object.create(null)
for(let r=0;r<e.length;r++)void 0===t[e[r]]&&(t[e[r]]=i.inflightAttrs[e[r]])}i.inflightAttrs=null}t&&(i.errors=t),this._capabilities.notifyChange(e,"errors")}unloadRecord(e){const t=this._capabilities
if(!this.__cache.has(e))return void(0,r.peekGraph)(t)?.unload(e)
const i=!this.isDeletionCommitted(e)
let n=!1
const s=this.__peek(e,!1)
s.isNew?(0,r.peekGraph)(t)?.push({op:"deleteRecord",record:e,isNew:!0}):(0,r.peekGraph)(t)?.unload(e),s.localAttrs=null,s.remoteAttrs=null,s.defaultAttrs=null,s.inflightAttrs=null
const o=function(e,t){const i=[],r=[],n=new Set
for(r.push(t);r.length>0;){const s=r.shift()
i.push(s),n.add(s)
const o=v(e,t).iterator()
for(let e=o.next();!e.done;e=o.next()){const t=e.value
t&&!n.has(t)&&(n.add(t),r.push(t))}}return i}(t,e)
if(function(e,t){for(let i=0;i<t.length;++i){const r=t[i]
if(e.hasRecord(r))return!1}return!0}(t,o))for(let r=0;r<o.length;++r){const e=o[r]
t.notifyChange(e,"removed"),n=!0,t.disconnectRecord(e)}this.__cache.delete(e),this.__destroyedCache.set(e,s),1===this.__destroyedCache.size&&setTimeout((()=>{this.__destroyedCache.clear()}),100),!n&&i&&t.notifyChange(e,"removed")}getAttr(e,t){const i=!Array.isArray(t)||1===t.length
if(Array.isArray(t)&&1===t.length&&(t=t[0]),i){const i=t,n=this.__peek(e,!0)
if(n.localAttrs&&i in n.localAttrs)return n.localAttrs[i]
if(n.inflightAttrs&&i in n.inflightAttrs)return n.inflightAttrs[i]
if(n.remoteAttrs&&i in n.remoteAttrs)return n.remoteAttrs[i]
if(n.defaultAttrs&&i in n.defaultAttrs)return n.defaultAttrs[i]
{const t=this._capabilities.schema.fields(e).get(i)
this._capabilities
const s=l(t,e,this._capabilities._store)
return(r=t)&&a(r.options)&&(n.defaultAttrs=n.defaultAttrs||Object.create(null),n.defaultAttrs[i]=s),s}}var r
const n=t,s=this.__peek(e,!0),o=n[0]
let c=s.localAttrs&&o in s.localAttrs?s.localAttrs[o]:void 0
if(void 0===c&&(c=s.inflightAttrs&&o in s.inflightAttrs?s.inflightAttrs[o]:void 0),void 0===c&&(c=s.remoteAttrs&&o in s.remoteAttrs?s.remoteAttrs[o]:void 0),void 0!==c){for(let e=1;e<n.length;e++)if(c=c[n[e]],void 0===c)return
return c}}setAttr(e,t,i){const r=!Array.isArray(t)||1===t.length
if(Array.isArray(t)&&1===t.length&&(t=t[0]),r){const r=this.__peek(e,!1),n=t,s=r.inflightAttrs&&n in r.inflightAttrs?r.inflightAttrs[n]:r.remoteAttrs&&n in r.remoteAttrs?r.remoteAttrs[n]:void 0
return s!==i?(r.localAttrs=r.localAttrs||Object.create(null),r.localAttrs[n]=i,r.changes=r.changes||Object.create(null),r.changes[n]=[s,i]):r.localAttrs&&(delete r.localAttrs[n],delete r.changes[n]),r.defaultAttrs&&n in r.defaultAttrs&&delete r.defaultAttrs[n],void this._capabilities.notifyChange(e,"attributes",n)}const n=t,s=this.__peek(e,!1),o=n[0],a=s.inflightAttrs&&o in s.inflightAttrs?s.inflightAttrs[o]:s.remoteAttrs&&o in s.remoteAttrs?s.remoteAttrs[o]:void 0
let l
if(a){l=a[n[1]]
for(let e=2;e<n.length;e++)l=l[n[e]]}if(l!==i){s.localAttrs=s.localAttrs||Object.create(null),s.localAttrs[o]=s.localAttrs[o]||structuredClone(a),s.changes=s.changes||Object.create(null)
let e=s.localAttrs[o],t=1
for(;t<n.length-1;)e=e[n[t++]]
e[n[t]]=i,s.changes[o]=[a,s.localAttrs[o]]}else if(s.localAttrs)try{if(!a)return
JSON.stringify(a)!==JSON.stringify(s.localAttrs[o])&&(delete s.localAttrs[o],delete s.changes[o])}catch(e){}this._capabilities.notifyChange(e,"attributes",o)}changedAttrs(e){return this.__peek(e,!1).changes||Object.create(null)}hasChangedAttrs(e){const t=this.__peek(e,!0)
return null!==t.inflightAttrs&&Object.keys(t.inflightAttrs).length>0||null!==t.localAttrs&&Object.keys(t.localAttrs).length>0}rollbackAttrs(e){const t=this.__peek(e,!1)
let i
return t.isDeleted=!1,null!==t.localAttrs&&(i=Object.keys(t.localAttrs),t.localAttrs=null,t.changes=null),t.isNew&&(t.isDeletionCommitted=!0,t.isDeleted=!0,t.isNew=!1),t.inflightAttrs=null,t.defaultAttrs=null,t.errors&&(t.errors=null,this._capabilities.notifyChange(e,"errors")),this._capabilities.notifyChange(e,"state"),i&&i.length&&c(this._capabilities,e,i),i||[]}changedRelationships(e){return this.__graph.getChanged(e)}hasChangedRelationships(e){return this.__graph.hasChanged(e)}rollbackRelationships(e){let t
return this._capabilities,this._capabilities._store._join((()=>{t=this.__graph.rollback(e)})),t}getRelationship(e,t){return this.__graph.getData(e,t)}setIsDeleted(e,t){this.__peek(e,!1).isDeleted=t,this._capabilities.notifyChange(e,"state")}getErrors(e){return this.__peek(e,!0).errors||[]}isEmpty(e){const t=this.__safePeek(e,!0)
return!t||null===t.remoteAttrs&&null===t.inflightAttrs&&null===t.localAttrs}isNew(e){return this.__safePeek(e,!0)?.isNew||!1}isDeleted(e){return this.__safePeek(e,!0)?.isDeleted||!1}isDeletionCommitted(e){return this.__safePeek(e,!0)?.isDeletionCommitted||!1}_createCache(e){const t={id:null,remoteAttrs:null,localAttrs:null,defaultAttrs:null,inflightAttrs:null,changes:null,errors:null,isNew:!1,isDeleted:!1,isDeletionCommitted:!1}
return this.__cache.set(e,t),t}__safePeek(e,t){let i=this.__cache.get(e)
return!i&&t&&(i=this.__destroyedCache.get(e)),i}__peek(e,t){return this.__safePeek(e,t)}}function o(e){return(0,r.isBelongsTo)(e)?e.remoteState?[e.remoteState]:[]:e.remoteState}function a(e){return!!e&&"function"==typeof e.defaultValue}function l(e,t,i){const r=e?.options
if(e&&(r||e.type)&&("attribute"===e.kind||"field"===e.kind)){if(a(r))return r.defaultValue()
if(r&&"defaultValue"in r)return r.defaultValue
if("attribute"!==e.kind&&e.type){const n=i.schema.transformation(e)
if(n?.defaultValue)return n.defaultValue(r||null,t)}}}function c(e,t,i){if(i)for(let r=0;r<i.length;r++)e.notifyChange(t,"attributes",i[r])
else e.notifyChange(t,"attributes")}function u(e,t){const i=[]
if(t){const r=Object.keys(t),n=r.length,s=e.localAttrs,o=Object.assign(Object.create(null),e.remoteAttrs,e.inflightAttrs)
for(let e=0;e<n;e++){const n=r[e],a=t[n]
s&&void 0!==s[n]||o[n]!==a&&i.push(n)}}return i}function h(e){return!e||null===e.remoteAttrs&&null===e.inflightAttrs&&null===e.localAttrs}function d(e,t=!1){if(!e)return!1
const i=e.isNew,r=h(e)
return i?!e.isDeleted:!(t&&e.isDeletionCommitted||r)}function f(e,t,i,r){const n=t.schema.fields(i)
for(const[s,o]of n){if(!y(o))continue
const t=r.relationships[s]
t&&e.push({op:"updateRelationship",record:i,field:s,value:t})}}const p=new Set(["hasMany","belongsTo","resource","collection"])
function y(e){return p.has(e.kind)}function g(e){const{localAttrs:t,remoteAttrs:i,inflightAttrs:r,defaultAttrs:n,changes:s}=e
if(!t)return e.changes=null,!1
let o=!1
const a=Object.keys(t)
for(let l=0,c=a.length;l<c;l++){const e=a[l];(r&&e in r?r[e]:i&&e in i?i[e]:void 0)===t[e]&&(o=!0,delete t[e],delete s[e]),n&&e in n&&delete n[e]}return o}function m(e,t,i){let r=t.peekRecordIdentifier(i)
return r=r?t.updateRecordIdentifier(r,i):t.getOrCreateRecordIdentifier(i),e.upsert(r,i,e._capabilities.hasRecord(r)),r}function v(e,t){const i=(0,r.peekGraph)(e),s=i?.identifiers.get(t)
if(!s)return n
const a=[]
Object.keys(s).forEach((e=>{const t=s[e]
t&&!t.definition.isImplicit&&a.push(t)}))
let l=0,c=0,u=0
return{iterator:()=>({next:()=>{const e=(()=>{for(;l<a.length;){for(;c<2;){const t=0===c?(e=a[l],(0,r.isBelongsTo)(e)?e.localState?[e.localState]:[]:e.additions?[...e.additions]:[]):o(a[l])
for(;u<t.length;){const e=t[u++]
if(null!==e)return e}u=0,c++}c=0,l++}var e})()
return{value:e,done:void 0===e}}})}}function b(e){return e instanceof Error}function _(e,t){"links"in t&&(e.links=t.links),"meta"in t&&(e.meta=t.meta)}var w=i(294),k=i(879),A=i(921),S=i(380)
function R(e,t,i,r){const n=t.data?(0,S.i)(t.data,((t,n)=>{const{id:s,type:o}=t
return function(e,t,i,r){const{id:n,type:s}=e
e.relationships||(e.relationships={})
const{relationships:o}=e,a=function(e,t,i,r){const{name:n}=i,{type:s}=t,o=function(e,t,i){const r=e.schema.fields(t).get(i)
return r?r.options.inverse:null}(e,{type:s},n)
if(o)return{inverseKey:o,kind:e.schema.fields({type:r}).get(o).kind}}(i,t,r,s)
if(a){const{inverseKey:e,kind:i}=a,r=o[e]?.data
"hasMany"===i&&void 0===r||(o[e]=o[e]||{},o[e].data=function(e,t,{id:i,type:r}){const n={id:i,type:r}
let s=null
if("hasMany"===t){const t=e||[]
e&&e.find((e=>e.type===n.type&&e.id===n.id))||t.push(n),s=t}else{const t=e||{}
Object.assign(t,n),s=t}return s}(r??null,i,t))}}(t,i,e,r),{id:s,type:o}})):null,s={}
"meta"in t&&(s.meta=t.meta),"links"in t&&(s.links=t.links),"data"in t&&(s.data=n)
const o={id:i.id,type:i.type,relationships:{[r.name]:s}}
return Array.isArray(t.included)||(t.included=[]),t.included.push(o),t}const x=new Set(["findRecord","findAll","query","queryRecord","findBelongsTo","findHasMany","updateRecord","createRecord","deleteRecord"]),C={request(e,t){if(e.request.url||!e.request.op||!x.has(e.request.op))return t(e.request)
const{store:i}=e.request
switch(i._fetchManager||(i._fetchManager=new S.F(i)),e.request.op){case"findRecord":return function(e){const{store:t,data:i}=e.request,{record:r,options:n}=i
let s
if(t._instanceCache.recordIsLoaded(r))if(n.reload)(0,S.a)(r),s=t._fetchManager.scheduleFetch(r,n,e.request)
else{let i=null
const o=t.adapterFor(r.type)
void 0===n.reload&&o.shouldReloadRecord&&o.shouldReloadRecord(t,i=t._fetchManager.createSnapshot(r,n))?((0,S.a)(r),n.reload=!0,s=t._fetchManager.scheduleFetch(r,n,e.request)):(!1===n.backgroundReload||!n.backgroundReload&&o.shouldBackgroundReloadRecord&&!o.shouldBackgroundReloadRecord(t,i=i||t._fetchManager.createSnapshot(r,n))||((0,S.a)(r),n.backgroundReload=!0,t._fetchManager.scheduleFetch(r,n,e.request)),s=Promise.resolve(r))}else s=t._fetchManager.fetchDataIfNeededForIdentifier(r,n,e.request)
return s.then((e=>t.peekRecord(e)))}(e)
case"findAll":return function(e){const{store:t,data:i}=e.request,{type:r,options:n}=i,s=t.adapterFor(r),o=t.recordArrayManager._live.get(r),a=new S.b(t,r,n)
let l
return n.reload||!1!==n.reload&&(s.shouldReloadAll&&s.shouldReloadAll(t,a)||!s.shouldReloadAll&&0===a.length)?(o&&(o.isUpdating=!0),l=E(s,t,r,a,e.request,!0)):(l=Promise.resolve(t.peekAll(r)),(n.backgroundReload||!1!==n.backgroundReload&&(!s.shouldBackgroundReloadAll||s.shouldBackgroundReloadAll(t,a)))&&(o&&(o.isUpdating=!0),E(s,t,r,a,e.request,!1))),l}(e)
case"query":return function(e){const{store:t,data:i}=e.request
let{options:r}=i
const{type:n,query:s}=i,o=t.adapterFor(n),a=r._recordArray||t.recordArrayManager.createArray({type:n,query:s})
delete r._recordArray
const l=t.modelFor(n)
return Promise.resolve().then((()=>o.query(t,l,s,a,r))).then((e=>{const i=t.serializerFor(n),r=(0,S.n)(i,t,l,e,null,"query"),s=t._push(r,!0)
return t.recordArrayManager.populateManagedArray(a,s,r),a}))}(e)
case"queryRecord":return function(e){const{store:t,data:i}=e.request,{type:r,query:n,options:s}=i,o=t.adapterFor(r),a=t.modelFor(r)
return Promise.resolve().then((()=>o.queryRecord(t,a,n,s))).then((e=>{const i=t.serializerFor(r),n=(0,S.n)(i,t,a,e,null,"queryRecord"),s=t._push(n,!0)
return s?t.peekRecord(s):null}))}(e)
case"findBelongsTo":return function(e){const{store:t,data:i,records:r}=e.request,{options:n,record:s,links:o,useLink:a,field:l}=i,c=r?.[0],u=c&&t._fetchManager.getPendingFetch(c,n)
if(u)return u
if(a)return function(e,t,i,r,n){return Promise.resolve().then((()=>{const s=e.adapterFor(t.type),o=e._fetchManager.createSnapshot(t,n),a=i&&"string"!=typeof i?i.href:i
return s.findBelongsTo(e,o,a,r)})).then((i=>{const n=e.modelFor(r.type),s=e.serializerFor(r.type)
let o=(0,S.n)(s,e,n,i,null,"findBelongsTo")
return o.data||o.links||o.meta?(o=R(e,o,t,r),e._push(o,!0)):null}),null)}(t,s,o.related,l,n)
const h=t._fetchManager
return(0,S.a)(c),n.reload?h.scheduleFetch(c,n,e.request):h.fetchDataIfNeededForIdentifier(c,n,e.request)}(e)
case"findHasMany":return function(e){const{store:t,data:i,records:r}=e.request,{options:n,record:s,links:o,useLink:a,field:l}=i
if(a)return function(e,t,i,r,n,s){return Promise.resolve().then((()=>{const o=t._fetchManager.createSnapshot(i,s),a=r&&"string"!=typeof r?r.href:r
return e.findHasMany(t,o,a,n)})).then((e=>{const r=t.modelFor(n.type),s=t.serializerFor(n.type)
let o=(0,S.n)(s,t,r,e,null,"findHasMany")
return o=R(t,o,i,n),t._push(o,!0)}),null)}(t.adapterFor(s.type),t,s,o.related,l,n)
const c=new Array(r.length),u=t._fetchManager
for(let h=0;h<r.length;h++){const t=r[h];(0,S.a)(t),c[h]=n.reload?u.scheduleFetch(t,n,e.request):u.fetchDataIfNeededForIdentifier(t,n,e.request)}return Promise.all(c)}(e)
case"updateRecord":case"createRecord":case"deleteRecord":return function(e){const{store:t,data:i,op:r}=e.request,{options:n,record:s}=i
t.cache.willCommit(s,e)
const o=Object.assign({[S.S]:r},n)
return t._fetchManager.scheduleSave(s,o).then((i=>{let n
return t._join((()=>{n=t.cache.didCommit(s,{request:e.request,content:i})})),t.lifetimes?.didRequest&&"createRecord"===r&&t.lifetimes.didRequest(e.request,{status:201},null,t),t.peekRecord(n.data)})).catch((e=>{let i=e
throw e?"string"==typeof e&&(i=new Error(e)):i=new Error("Unknown Error Occurred During Request"),function(e,t,i){if(i&&!0===i.isAdapterError&&"InvalidError"===i.code){const r=e.serializerFor(t.type)
if(r&&"function"==typeof r.extractErrors){const n=r.extractErrors(e,e.modelFor(t.type),i,t.id)
i.errors=function(e){const t=[]
return e&&Object.keys(e).forEach((i=>{const r=(n=e[i],Array.isArray(n)?n:[n])
var n
for(let e=0;e<r.length;e++){let n="Invalid Attribute",s=`/data/attributes/${i}`
i===M&&(n="Invalid Document",s="/data"),t.push({title:n,detail:r[e],source:{pointer:s}})}})),t}(n)}}const r=e.cache
if(i.errors){let e=i.errors
0===e.length&&(e=[{title:"Invalid Error",detail:"",source:{pointer:"/data"}}]),r.commitWasRejected(t,e)}else r.commitWasRejected(t)}(t,s,i),i}))}(e)
default:return t(e.request)}}},M="base"
function E(e,t,i,r,n,s){const o=t.modelFor(i)
let a=Promise.resolve().then((()=>e.findAll(t,o,null,r)))
return a=a.then((e=>{const n=t.serializerFor(i),a=(0,S.n)(n,t,o,e,null,"findAll")
return t._push(a,s),r._recordArray.isUpdating=!1,r._recordArray})),a}function O(e,t){this._adapterCache=this._adapterCache||Object.create(null)
const i=(0,A.di)(e),{_adapterCache:r}=this
let n=r[i]
if(n)return n
const s=(0,w.getOwner)(this)
return n=s.lookup(`adapter:${i}`),void 0!==n?(r[i]=n,n):(n=r.application||s.lookup("adapter:application"),void 0!==n?(r[i]=n,r.application=n,n):void 0)}function T(e){this._serializerCache=this._serializerCache||Object.create(null)
const t=(0,A.di)(e),{_serializerCache:i}=this
let r=i[t]
if(r)return r
const n=(0,w.getOwner)(this)
return r=n.lookup(`serializer:${t}`),void 0!==r?(i[t]=r,r):(r=i.application||n.lookup("serializer:application"),void 0!==r?(i[t]=r,i.application=r,r):null)}function P(e,t){const i=(0,A.di)(e),r=this.serializerFor(i),n=this.modelFor(i)
return r.normalize(n,t)}function D(e,t){const i=t||e,r=t?(0,A.di)(e):"application"
this.serializerFor(r).pushPayload(this,i)}function j(e,t){return this._fetchManager||(this._fetchManager=new S.F(this)),this._fetchManager.createSnapshot((0,k.recordIdentifierFor)(e)).serialize(t)}function N(){for(const e in this._adapterCache){const t=this._adapterCache[e]
"function"==typeof t.destroy&&t.destroy()}for(const e in this._serializerCache){const t=this._serializerCache[e]
"function"==typeof t.destroy&&t.destroy()}}var F,L,q,$,I,z=i(603),B=i(500),H=i(471),U=i.n(H),V=i(684),W=i(284),Y=i(220),G=i(389),K=i(410),J=i.n(K),X=i(991),Z=i(604),Q=i(175),ee=i(280),te=i.n(ee),ie=i(104),re=i.n(ie),ne=i(666),se=i(903)
function oe(e,t,i){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.set(e,i)}function ae(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var i=t.call(e,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function le(e){{const t=(0,B.dasherize)(e)
return(0,z.deprecate)(`The resource type '${e}' is not normalized. Update your application code to use '${t}' instead of '${e}'.`,t===e,{id:"ember-data:deprecate-non-strict-types",until:"6.0",for:"ember-data",since:{available:"5.3",enabled:"5.3"}}),t}}class ce extends A.oz{constructor(e){super(e),this.isLoaded=e.isLoaded||!1,this.isAsync=e.isAsync||!1,this.isPolymorphic=e.isPolymorphic||!1,this.identifier=e.identifier,this.key=e.key}[A.XK](e,t,i,r,n){switch(i){case"length 0":return Reflect.set(e,"length",0),ye(this,[],n),!0
case"replace cell":{const[t,i,s]=r
return e[t]=s,function(e,t,i){ge(e,{op:"replaceRelatedRecord",record:e.identifier,field:e.key,...t},i)}(this,{value:s,prior:i,index:t},n),!0}case"push":{const s=ue(r)
de(this,e,(e=>e.push(...s)),"Cannot push duplicates to a hasMany's state.")
{const s=new Set(e),o=new Set
r.forEach((e=>{const t=(0,A.o)(e)
s.has(t)||(s.add(t),o.add(e))}))
const a=Array.from(o),l=Reflect.apply(e[i],t,a)
return a.length&&fe(this,{value:ue(a)},n),l}}case"pop":{const s=Reflect.apply(e[i],t,r)
return s&&pe(this,{value:(0,A.o)(s)},n),s}case"unshift":{const s=ue(r)
de(this,e,(e=>e.unshift(...s)),"Cannot unshift duplicates to a hasMany's state.")
{const s=new Set(e),o=new Set
r.forEach((e=>{const t=(0,A.o)(e)
s.has(t)||(s.add(t),o.add(e))}))
const a=Array.from(o),l=Reflect.apply(e[i],t,a)
return a.length&&fe(this,{value:ue(a),index:0},n),l}}case"shift":{const s=Reflect.apply(e[i],t,r)
return s&&pe(this,{value:(0,A.o)(s),index:0},n),s}case"sort":{const s=Reflect.apply(e[i],t,r)
return function(e,t,i){ge(e,{op:"sortRelatedRecords",record:e.identifier,field:e.key,value:t},i)}(this,s.map(A.o),n),s}case"splice":{const[s,o,...a]=r
if(0===s&&o===this[A.u2].length){const r=ue(a)
de(this,e,(e=>e.splice(s,o,...r)),"Cannot replace a hasMany's state with a new state that contains duplicates.")
{const r=new Set(a),l=Array.from(r),c=[s,o].concat(l),u=Reflect.apply(e[i],t,c)
return ye(this,ue(l),n),u}}const l=ue(a)
de(this,e,(e=>e.splice(s,o,...l)),"Cannot splice a hasMany's state with a new state that contains duplicates.")
{const r=e.slice()
r.splice(s,o)
const l=new Set(r),c=[]
a.forEach((e=>{const t=(0,A.o)(e)
l.has(t)||(l.add(t),c.push(e))}))
const u=[s,o,...c],h=Reflect.apply(e[i],t,u)
return o>0&&pe(this,{value:h.map(A.o),index:s},n),c.length>0&&fe(this,{value:ue(c),index:s},n),h}}}}notify(){this[A.To].shouldReset=!0,(0,A.J4)(this)}reload(e){return this._manager.reloadHasMany(this.key,e)}createRecord(e){const{store:t}=this,i=t.createRecord(this.modelName,e)
return this.push(i),i}destroy(){super.destroy(!1)}}function ue(e){return e.map(he)}function he(e){return(0,A.o)(e)}function de(e,t,i,r){const n=t.slice()
if(i(n),n.length!==new Set(n).size){const t=n.filter(((e,t)=>n.indexOf(e)!==t));(0,z.deprecate)(`${r} This behavior is deprecated. Found duplicates for the following records within the new state provided to \`<${e.identifier.type}:${e.identifier.id||e.identifier.lid}>.${e.key}\`\n\t- ${Array.from(new Set(t)).map((e=>(0,A.xm)(e)?e.lid:(0,A.o)(e).lid)).sort(((e,t)=>e.localeCompare(t))).join("\n\t- ")}`,!1,{id:"ember-data:deprecate-many-array-duplicates",for:"ember-data",until:"6.0",since:{enabled:"5.3",available:"5.3"}})}}function fe(e,t,i){ge(e,{op:"addToRelatedRecords",record:e.identifier,field:e.key,...t},i)}function pe(e,t,i){ge(e,{op:"removeFromRelatedRecords",record:e.identifier,field:e.key,...t},i)}function ye(e,t,i){ge(e,{op:"replaceRelatedRecords",record:e.identifier,field:e.key,value:t},i)}function ge(e,t,i){e._manager.mutate(t),(0,W.RH)(i)}ce.prototype.isAsync=!1,ce.prototype.isPolymorphic=!1,ce.prototype.identifier=null,ce.prototype.cache=null,ce.prototype._inverseIsAsync=!1,ce.prototype.key="",ce.prototype.DEPRECATED_CLASS_NAME="ManyArray"
const me=re().extend(te())
var ve=Object.defineProperty;((e,t)=>{for(var i in t)ve(e,i,{get:t[i],enumerable:!0})})({},{c:()=>Re,f:()=>_e,g:()=>we,i:()=>Se,m:()=>ke,n:()=>Ae,p:()=>xe})
var be=new WeakMap
function _e(e,t,i,r){return we(e.prototype,t,i,r)}function we(e,t,i,r){let n={configurable:!0,enumerable:!0,writable:!0,initializer:null}
r&&(n.initializer=r)
for(let s of i)n=s(e,t,n)||n
void 0===n.initializer?Object.defineProperty(e,t,n):function(e,t,i){let r=be.get(e)
r||(r=new Map,be.set(e,r)),r.set(t,i)}(e,t,n)}function ke({prototype:e},t,i){return Ae(e,t,i)}function Ae(e,t,i){let r={...Object.getOwnPropertyDescriptor(e,t)}
for(let n of i)r=n(e,t,r)||r
void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(e):void 0,r.initializer=void 0),Object.defineProperty(e,t,r)}function Se(e,t){let i=function(e,t){let i=e.prototype
for(;i;){let e=be.get(i)?.get(t)
if(e)return e
i=i.prototype}}(e.constructor,t)
i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(e):void 0})}function Re(e,t){return t.reduce(((e,t)=>t(e)||e),e)}function xe(e,t){for(let[i,r,n]of t)"field"===i?Ce(e,r,n):Ae(e,r,n)
return e}function Ce(e,t,i){let r={configurable:!0,enumerable:!0,writable:!0,initializer:()=>Object.getOwnPropertyDescriptor(e,t)?.value}
for(let n of i)r=n(e,t,r)||r
r.initializer&&(r.value=r.initializer.call(e),delete r.initializer),Object.defineProperty(e,t,r)}const Me=Symbol.for("LegacyPromiseProxy"),Ee=me
class Oe extends Ee{constructor(...e){super(...e),ae(this,Me,!0)}get id(){const{key:e,legacySupport:t}=this._belongsToState
return t.referenceFor("belongsTo",e).id()}get meta(){}async reload(e){const{key:t,legacySupport:i}=this._belongsToState
return await i.reloadBelongsTo(t,e),this}}Ae((F=Oe).prototype,"id",[V.PO]),Ae(F.prototype,"meta",[(0,H.computed)()])
class Te{constructor(e,t){ae(this,Me,!0),this._update(e,t),this.isDestroyed=!1}get length(){return this["[]"],this.content?this.content.length:0}forEach(e){this.content&&this.length&&this.content.forEach(e)}reload(e){return this.content.reload(e),this}then(e,t){return this.promise.then(e,t)}catch(e){return this.promise.catch(e)}finally(e){return this.promise.finally(e)}destroy(){this.isDestroyed=!0,this.content=null,this.promise=null}get links(){return this.content?this.content.links:void 0}get meta(){return this.content?this.content.meta:void 0}_update(e,t){void 0!==t&&(this.content=t),this.promise=function(e,t){return e.isPending=!0,e.isSettled=!1,e.isFulfilled=!1,e.isRejected=!1,Promise.resolve(t).then((t=>(e.isPending=!1,e.isFulfilled=!0,e.isSettled=!0,e.content=t,t)),(t=>{throw e.isPending=!1,e.isFulfilled=!1,e.isRejected=!0,e.isSettled=!0,t}))}(this,e)}static create({promise:e,content:t}){return new this(e,t)}}Ae((L=Te).prototype,"length",[V.Vv]),Ae(L.prototype,"links",[V.Vv]),Ae(L.prototype,"meta",[V.Vv]),(0,W.sg)(Te.prototype,"content",null),(0,W.sg)(Te.prototype,"isPending",!1),(0,W.sg)(Te.prototype,"isRejected",!1),(0,W.sg)(Te.prototype,"isFulfilled",!1),(0,W.sg)(Te.prototype,"isSettled",!1)
{const e={enumerable:!0,configurable:!1,get:function(){return this.content?.length&&this.content}};(0,V.Vv)(e),Object.defineProperty(Te.prototype,"[]",e)}class Pe{constructor(e,t,i,r,n){ae(this,"___token",void 0),ae(this,"___identifier",void 0),ae(this,"___relatedTokenMap",void 0),this.graph=t,this.key=n,this.hasManyRelationship=r,this.type=r.definition.type,this.store=e,this.___identifier=i,this.___token=e.notifications.subscribe(i,((e,t,i)=>{"relationships"===t&&i===n&&this._ref++})),this.___relatedTokenMap=new Map}destroy(){this.store.notifications.unsubscribe(this.___token),this.___relatedTokenMap.forEach((e=>{this.store.notifications.unsubscribe(e)})),this.___relatedTokenMap.clear()}get identifiers(){this._ref
const e=this._resource(),t=this.___relatedTokenMap
return this.___relatedTokenMap=new Map,e&&e.data?e.data.map((e=>{const i=this.store.identifierCache.getOrCreateRecordIdentifier(e)
let r=t.get(i)
return r?t.delete(i):r=this.store.notifications.subscribe(i,((e,t,i)=>{("identity"===t||"attributes"===t&&"id"===i)&&this._ref++})),this.___relatedTokenMap.set(i,r),i})):(t.forEach((e=>{this.store.notifications.unsubscribe(e)})),t.clear(),[])}_resource(){return this.store.cache.getRelationship(this.___identifier,this.key)}remoteType(){const e=this._resource()
return e&&e.links&&e.links.related?"link":"ids"}ids(){return this.identifiers.map((e=>e.id))}link(){const e=this._resource()
if(t=e,Boolean(t&&t.links&&t.links.related)&&e.links){const t=e.links.related
return t&&"string"!=typeof t?t.href:t}var t
return null}links(){const e=this._resource()
return e&&e.links?e.links:null}meta(){let e=null
const t=this._resource()
return t&&t.meta&&"object"==typeof t.meta&&(e=t.meta),e}async push(e,t){const{store:i}=this,r=Array.isArray(e)?{data:e}:e,n=Array.isArray(r.data)&&r.data.length>0&&De(r.data[0]),s=Array.isArray(r.data)?n?i._push(r,!0):r.data.map((e=>i.identifierCache.getOrCreateRecordIdentifier(e))):[],{identifier:o}=this.hasManyRelationship,a={}
if(Array.isArray(r.data)&&(a.data=s),"links"in r&&(a.links=r.links),"meta"in r&&(a.meta=r.meta),i._join((()=>{this.graph.push({op:"updateRelationship",record:o,field:this.key,value:a})})),!t)return this.load()}_isLoaded(){if(!this.hasManyRelationship.state.hasReceivedData)return!1
const e=this.graph.getData(this.hasManyRelationship.identifier,this.key)
return e.data?.every((e=>!0===this.store._instanceCache.recordIsLoaded(e,!0)))}value(){const e=Fe.get(this.___identifier)
return this._isLoaded()?e.getManyArray(this.key):(this._ref,null)}async load(e){const t=Fe.get(this.___identifier)
return this.hasManyRelationship.definition.isAsync||Ie(this.store,this._resource())?t.getHasMany(this.key,e):t.reloadHasMany(this.key,e)}reload(e){return Fe.get(this.___identifier).reloadHasMany(this.key,e)}}function De(e){return Object.keys(e).filter((e=>"id"!==e&&"type"!==e&&"lid"!==e)).length>0}function je(e){return Boolean(e&&e.links&&e.links.related)}Ae(Pe.prototype,"identifiers",[V.Vv,V.PO]),(0,W.sg)(Pe.prototype,"_ref",0)
class Ne{constructor(e,t,i,r,n){this.graph=t,this.key=n,this.belongsToRelationship=r,this.type=r.definition.type,this.store=e,this.___identifier=i,this.___relatedToken=null,this.___token=e.notifications.subscribe(i,((e,t,i)=>{"relationships"===t&&i===n&&this._ref++}))}destroy(){this.store.notifications.unsubscribe(this.___token),this.___token=null,this.___relatedToken&&(this.store.notifications.unsubscribe(this.___relatedToken),this.___relatedToken=null)}get identifier(){this.___relatedToken&&(this.store.notifications.unsubscribe(this.___relatedToken),this.___relatedToken=null)
const e=this._resource()
if(e&&e.data){const t=this.store.identifierCache.getOrCreateRecordIdentifier(e.data)
return this.___relatedToken=this.store.notifications.subscribe(t,((e,t,i)=>{("identity"===t||"attributes"===t&&"id"===i)&&this._ref++})),t}return null}id(){return this.identifier?.id||null}link(){const e=this._resource()
if(je(e)&&e.links){const t=e.links.related
return t&&"string"!=typeof t?t.href:t}return null}links(){const e=this._resource()
return e&&e.links?e.links:null}meta(){let e=null
const t=this._resource()
return t&&t.meta&&"object"==typeof t.meta&&(e=t.meta),e}_resource(){return this._ref,this.store.cache.getRelationship(this.___identifier,this.key)}remoteType(){return je(this._resource())?"link":"id"}async push(e,t){const{store:i}=this,r=e.data&&De(e.data)?i._push(e,!0):e.data?i.identifierCache.getOrCreateRecordIdentifier(e.data):null,{identifier:n}=this.belongsToRelationship,s={}
if((e.data||null===e.data)&&(s.data=r),"links"in e&&(s.links=e.links),"meta"in e&&(s.meta=e.meta),i._join((()=>{this.graph.push({op:"updateRelationship",record:n,field:this.key,value:s})})),!t)return this.load()}value(){const e=this._resource()
return e&&e.data?this.store.peekRecord(e.data):null}async load(e){const t=Fe.get(this.___identifier)
return this.belongsToRelationship.definition.isAsync||Ie(this.store,this._resource())?t.getBelongsTo(this.key,e):t.reloadBelongsTo(this.key,e).then((()=>this.value()))}reload(e){return Fe.get(this.___identifier).reloadBelongsTo(this.key,e).then((()=>this.value()))}}Ae(Ne.prototype,"identifier",[V.Vv,V.PO]),(0,W.sg)(Ne.prototype,"_ref",0)
const Fe=(0,Q.L1)("LEGACY_SUPPORT",new Map)
function Le(e){const t=(0,A.o)(e)
let i=Fe.get(t)
return i||(i=new qe(e),Fe.set(t,i),Fe.set(e,i)),i}class qe{constructor(e){this.record=e,this.store=(0,A.fV)(e),this.identifier=(0,A.o)(e),this.cache=(0,A.oX)(e)
{const e=(0,se.A)(i(424)).graphFor
this.graph=e(this.store)}this._manyArrayCache=Object.create(null),this._relationshipPromisesCache=Object.create(null),this._relationshipProxyCache=Object.create(null),this._pending=Object.create(null),this.references=Object.create(null)}_syncArray(e){if(this.isDestroyed||this.isDestroying)return
const t=e[A.u2],i=this.identifier,[r,n]=this._getCurrentState(i,e.key)
n.meta&&(e.meta=n.meta),n.links&&(e.links=n.links),t.length=0,(0,A.RX)(t,r)}mutate(e){this.cache.mutate(e)}_findBelongsTo(e,t,i,r){return this._findBelongsToByJsonApiResource(t,this.identifier,i,r).then((t=>$e(this,e,i,t)),(t=>$e(this,e,i,null,t)))}reloadBelongsTo(e,t){const i=this._relationshipPromisesCache[e]
if(i)return i
const r=this.graph.get(this.identifier,e),n=this.cache.getRelationship(this.identifier,e)
r.state.hasFailedLoadAttempt=!1,r.state.shouldForceReload=!0
const s=this._findBelongsTo(e,n,r,t)
return this._relationshipProxyCache[e]?this._updatePromiseProxyFor("belongsTo",e,{promise:s}):s}getBelongsTo(e,t){const{identifier:i,cache:r}=this,n=r.getRelationship(this.identifier,e),s=n&&n.data?n.data:null,o=this.store,a=this.graph.get(this.identifier,e),l=a.definition.isAsync,c={key:e,store:o,legacySupport:this,modelName:a.definition.type}
if(l){if(a.state.hasFailedLoadAttempt)return this._relationshipProxyCache[e]
const i=this._findBelongsTo(e,n,a,t),r=s&&o._instanceCache.recordIsLoaded(s)
return this._updatePromiseProxyFor("belongsTo",e,{promise:i,content:r?o._instanceCache.getRecord(s):null,_belongsToState:c})}return null===s?null:o._instanceCache.getRecord(s)}setDirtyBelongsTo(e,t){return this.cache.mutate({op:"replaceRelatedRecord",record:this.identifier,field:e,value:(i=t,i?(0,A.o)(i):null)},!0)
var i}_getCurrentState(e,t){const i=this.cache.getRelationship(e,t),r=this.store._instanceCache,n=[]
if(i.data)for(let s=0;s<i.data.length;s++){const e=i.data[s]
r.recordIsLoaded(e,!0)&&n.push(e)}return[n,i]}getManyArray(e,t){{let i=this._manyArrayCache[e]
if(t||(t=this.graph.get(this.identifier,e).definition),!i){const[r,n]=this._getCurrentState(this.identifier,e)
i=new ce({store:this.store,type:t.type,identifier:this.identifier,cache:this.cache,identifiers:r,key:e,meta:n.meta||null,links:n.links||null,isPolymorphic:t.isPolymorphic,isAsync:t.isAsync,_inverseIsAsync:t.inverseIsAsync,manager:this,isLoaded:!t.isAsync,allowMutation:!0}),this._manyArrayCache[e]=i}return i}}fetchAsyncHasMany(e,t,i,r){{let n=this._relationshipPromisesCache[e]
if(n)return n
const s=this.cache.getRelationship(this.identifier,e),o=this._findHasManyByJsonApiResource(s,this.identifier,t,r)
return o?(n=o.then((()=>$e(this,e,t,i)),(r=>$e(this,e,t,i,r))),this._relationshipPromisesCache[e]=n,n):(i.isLoaded=!0,Promise.resolve(i))}}reloadHasMany(e,t){{const i=this._relationshipPromisesCache[e]
if(i)return i
const r=this.graph.get(this.identifier,e),{definition:n,state:s}=r
s.hasFailedLoadAttempt=!1,s.shouldForceReload=!0
const o=this.getManyArray(e,n),a=this.fetchAsyncHasMany(e,r,o,t)
return this._relationshipProxyCache[e]?this._updatePromiseProxyFor("hasMany",e,{promise:a}):a}}getHasMany(e,t){{const i=this.graph.get(this.identifier,e),{definition:r,state:n}=i,s=this.getManyArray(e,r)
if(r.isAsync){if(n.hasFailedLoadAttempt)return this._relationshipProxyCache[e]
const r=this.fetchAsyncHasMany(e,i,s,t)
return this._updatePromiseProxyFor("hasMany",e,{promise:r,content:s})}return s}}_updatePromiseProxyFor(e,t,i){let r=this._relationshipProxyCache[t]
if("hasMany"===e){const{promise:e,content:n}=i
return r?r._update(e,n):r=this._relationshipProxyCache[t]=new Te(e,n),r}if(r){const{promise:e,content:t}=i
void 0!==t&&r.set("content",t),r.set("promise",e)}else r=Oe.create(i),this._relationshipProxyCache[t]=r
return r}referenceFor(e,t){let i=this.references[t]
if(!i){const{graph:e,identifier:r}=this,n=e.get(r,t),s=n.definition.kind
"belongsTo"===s?i=new Ne(this.store,e,r,n,t):"hasMany"===s&&(i=new Pe(this.store,e,r,n,t)),this.references[t]=i}return i}_findHasManyByJsonApiResource(e,t,i,r={}){{if(!e)return
const{definition:n,state:s}=i;(0,Z.upgradeStore)(this.store)
const o=this.store.adapterFor?.(n.type),{isStale:a,hasDematerializedInverse:l,hasReceivedData:c,isEmpty:u,shouldForceReload:h}=s,d=Ie(this.store,e),f=e.data,p=e.links&&e.links.related&&("function"==typeof o?.findHasMany||void 0===f)&&(h||l||a||!d&&!u),y={useLink:p,field:this.store.schema.fields({type:n.inverseType}).get(n.key),links:e.links,meta:e.meta,options:r,record:t}
if(p)return this.store.request({op:"findHasMany",records:f||[],data:y,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}})
const g=c&&!u,m=l||u&&Array.isArray(f)&&f.length>0,v=!h&&!a&&(g||m)
if(v&&d)return
return v||c&&!u||m?(r.reload=r.reload||!v||void 0,this.store.request({op:"findHasMany",records:f,data:y,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}})):void 0}}_findBelongsToByJsonApiResource(e,t,i,r={}){if(!e)return Promise.resolve(null)
const n=i.definition.key
if(this._pending[n])return this._pending[n]
const s=e.data?e.data:null,{isStale:o,hasDematerializedInverse:a,hasReceivedData:l,isEmpty:c,shouldForceReload:u}=i.state,h=Ie(this.store,e),d=e.links?.related&&(u||a||o||!h&&!c),f={useLink:d,field:this.store.schema.fields(this.identifier).get(i.definition.key),links:e.links,meta:e.meta,options:r,record:t}
if(d){const e=this.store.request({op:"findBelongsTo",records:s?[s]:[],data:f,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}})
return this._pending[n]=e.then((e=>e.content)).finally((()=>{this._pending[n]=void 0})),this._pending[n]}const p=l&&h&&!c,y=a||c&&e.data,g=!u&&!o&&(p||y)
return g&&!s?Promise.resolve(null):g&&h||null===s?.id?Promise.resolve(s):s?(r.reload=r.reload||!g||void 0,this._pending[n]=this.store.request({op:"findBelongsTo",records:[s],data:f,cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}}).then((e=>e.content)).finally((()=>{this._pending[n]=void 0})),this._pending[n]):Promise.resolve(null)}destroy(){this.isDestroying=!0
let e=this._manyArrayCache
this._manyArrayCache=Object.create(null),Object.keys(e).forEach((t=>{e[t].destroy()})),e=this._relationshipProxyCache,this._relationshipProxyCache=Object.create(null),Object.keys(e).forEach((t=>{const i=e[t]
i.destroy&&i.destroy()})),e=this.references,this.references=Object.create(null),Object.keys(e).forEach((t=>{e[t].destroy()})),this.isDestroyed=!0}}function $e(e,t,i,r,n){delete e._relationshipPromisesCache[t],i.state.shouldForceReload=!1
const s="hasMany"===i.definition.kind
if(s&&r.notify(),n){i.state.hasFailedLoadAttempt=!0
const r=e._relationshipProxyCache[t]
throw r&&!s&&(r.content&&r.content.isDestroying&&r.set("content",null),e.store.notifications._flush()),n}return s?r.isLoaded=!0:e.store.notifications._flush(),i.state.hasFailedLoadAttempt=!1,i.state.isStale=!1,s||!r?r:e.store.peekRecord(r)}function Ie(e,t){const i=e._instanceCache,r=t.data
return Array.isArray(r)?r.every((e=>i.recordIsLoaded(e))):!r||i.recordIsLoaded(r)}const ze=J()
var Be=new WeakMap,He=new WeakMap
class Ue extends ze{constructor(...e){super(...e),oe(this,Be,void Se(this,"messages")),oe(this,He,void Se(this,"isEmpty"))}get errorsByAttributeName(){return new Map}errorsFor(e){const t=this.errorsByAttributeName
let i=t.get(e)
return void 0===i&&(i=(0,G.A)(),t.set(e,i)),(0,H.get)(i,"[]"),i}get content(){return(0,G.A)()}unknownProperty(e){const t=this.errorsFor(e)
if(0!==t.length)return t}add(e,t){const i=this._findOrCreateMessages(e,t)
this.addObjects(i),this.errorsFor(e).addObjects(i),this.__record.currentState.notify("isValid"),this.notifyPropertyChange(e)}_findOrCreateMessages(e,t){const i=this.errorsFor(e),r=Array.isArray(t)?t:[t],n=new Array(r.length)
for(let s=0;s<r.length;s++){const t=r[s],o=i.findBy("message",t)
n[s]=o||{attribute:e,message:t}}return n}remove(e){if(this.isEmpty)return
const t=this.rejectBy("attribute",e)
this.content.setObjects(t)
const i=this.errorsFor(e)
for(let r=0;r<i.length;r++)i[r].attribute===e&&i.replace(r,1)
this.errorsByAttributeName.delete(e),this.__record.currentState.notify("isValid"),this.notifyPropertyChange(e),this.notifyPropertyChange("length")}clear(){if(this.isEmpty)return
const e=this.errorsByAttributeName,t=[]
e.forEach((function(e,i){t.push(i)})),e.clear(),t.forEach((e=>{this.notifyPropertyChange(e)})),this.__record.currentState.notify("isValid"),super.clear()}has(e){return this.errorsFor(e).length>0}}function Ve(e,t,i,r){if("belongsTo"===r.kind)i.notifyPropertyChange(t)
else if("hasMany"===r.kind){const n=Fe.get(e),s=n&&n._manyArrayCache[t],o=n&&n._relationshipPromisesCache[t]
if(s&&o)return
s&&(s.notify(),r.options.async&&i.notifyPropertyChange(t))}}function We(e,t,i,r){(0,ne.cacheFor)(r,i)!==e.cache.getAttr(t,i)&&r.notifyPropertyChange(i)}Ae((q=Ue).prototype,"errorsByAttributeName",[(0,H.computed)()]),we(q.prototype,"messages",[(0,X.mapBy)("content","message")]),Ae(q.prototype,"content",[(0,H.computed)()]),we(q.prototype,"isEmpty",[(0,X.not)("length")])
const Ye=/^\/?data\/(attributes|relationships)\/(.*)/,Ge=/^\/?data/
function Ke(e){return!!e&&e instanceof Error&&"isAdapterError"in e&&!0===e.isAdapterError&&"code"in e&&"InvalidError"===e.code}function Je(e,t,i){const r=i.get,n=i.set
return i.get=function(){const e=(0,W.V1)(this,t,!0)
return(0,W.B1)(e),e.shouldReset&&(e.shouldReset=!1,e.lastValue=r.call(this)),e.lastValue},i.set=function(e){(0,W.V1)(this,t,!0),n.call(this,e)},(0,V.Vv)(i),i}function Xe(e,t){const i=(0,W.i$)(e,t)
i&&(i.shouldReset=!0,(0,W.RH)(i))}class Ze{constructor(e){const t=(0,k.storeFor)(e),i=(0,A.o)(e)
this.identifier=i,this.record=e,this.cache=t.cache,this.pendingCount=0,this.fulfilledCount=0,this.rejectedCount=0,this._errorRequests=[],this._lastError=null
const r=t.getRequestStateService(),n=t.notifications,s=e=>{if("mutation"===e.type)switch(e.state){case"pending":this.isSaving=!0
break
case"rejected":this.isSaving=!1,this._lastError=e,e.response&&Ke(e.response.data)||this._errorRequests.push(e),Qe(this)
break
case"fulfilled":this._errorRequests=[],this._lastError=null,this.isSaving=!1,this.notify("isDirty"),Qe(this)}else switch(e.state){case"pending":this.pendingCount++,this.notify("isLoading")
break
case"rejected":this.pendingCount--,this._lastError=e,e.response&&Ke(e.response.data)||this._errorRequests.push(e),this.notify("isLoading"),Qe(this)
break
case"fulfilled":this.pendingCount--,this.fulfilledCount++,this.notify("isLoading"),this.notify("isDirty"),Qe(this),this._errorRequests=[],this._lastError=null}}
r.subscribeForRecord(i,s)
const o=r.getLastRequestForRecord(i)
o&&s(o),this.handler=n.subscribe(i,((e,t,i)=>{switch(t){case"state":this.notify("isSaved"),this.notify("isNew"),this.notify("isDeleted"),this.notify("isDirty")
break
case"attributes":this.notify("isEmpty"),this.notify("isDirty")
break
case"errors":this.updateInvalidErrors(this.record.errors),this.notify("isValid")}}))}destroy(){(0,k.storeFor)(this.record).notifications.unsubscribe(this.handler)}notify(e){Xe(this,e)}updateInvalidErrors(e){const t=this.cache.getErrors(this.identifier)
e.clear()
for(let i=0;i<t.length;i++){const r=t[i]
if(r.source&&r.source.pointer){const t=r.source.pointer.match(Ye)
let i
if(t?i=t[2]:-1!==r.source.pointer.search(Ge)&&(i="base"),i){const t=r.detail||r.title
e.add(i,t)}}}}cleanErrorRequests(){this.notify("isValid"),this.notify("isError"),this.notify("adapterError"),this._errorRequests=[],this._lastError=null}get isLoading(){return!this.isLoaded&&this.pendingCount>0&&0===this.fulfilledCount}get isLoaded(){return!!this.isNew||this.fulfilledCount>0||!this.isEmpty}get isSaved(){const e=this.cache
return this.isDeleted?e.isDeletionCommitted(this.identifier):!(this.isNew||this.isEmpty||!this.isValid||this.isDirty||this.isLoading)}get isEmpty(){const e=this.cache
return!this.isNew&&e.isEmpty(this.identifier)}get isNew(){return this.cache.isNew(this.identifier)}get isDeleted(){return this.cache.isDeleted(this.identifier)}get isValid(){return 0===this.record.errors.length}get isDirty(){const e=this.cache
return!(this.isEmpty||e.isDeletionCommitted(this.identifier)||this.isDeleted&&this.isNew)&&(this.isDeleted||this.isNew||e.hasChangedAttrs(this.identifier))}get isError(){return!!this._errorRequests[this._errorRequests.length-1]}get adapterError(){const e=this._lastError
return e?"rejected"===e.state&&e.response.data:null}get isPreloaded(){return!this.isEmpty&&this.isLoading}get stateName(){return this.isLoading?"root.loading":this.isEmpty?"root.empty":this.isDeleted?this.isSaving?"root.deleted.inFlight":this.isSaved?"root.deleted.saved":this.isValid?"root.deleted.uncommitted":"root.deleted.invalid":this.isNew?this.isSaving?"root.loaded.created.inFlight":this.isValid?"root.loaded.created.uncommitted":"root.loaded.created.invalid":this.isSaving?"root.loaded.updated.inFlight":this.isValid?this.isDirty?"root.loaded.updated.uncommitted":"root.loaded.saved":"root.loaded.updated.invalid"}get dirtyType(){return this.isLoading||this.isEmpty?"":this.isDirty&&this.isDeleted?"deleted":this.isNew?"created":this.isSaving||!this.isValid||this.isDirty?"updated":""}}function Qe(e){e.notify("isValid"),e.notify("isError"),e.notify("adapterError")}function et(e,t,i){const r=new WeakMap,n=i.get
return i.get=function(){let e=r.get(this)
return e||(e={hasComputed:!1,value:void 0},r.set(this,e)),e.hasComputed||(e.value=n.call(this),e.hasComputed=!0),e.value},i}Ae(($=Ze).prototype,"isLoading",[Je]),Ae($.prototype,"isLoaded",[Je]),Ae($.prototype,"isSaved",[Je]),Ae($.prototype,"isEmpty",[Je]),Ae($.prototype,"isNew",[Je]),Ae($.prototype,"isDeleted",[Je]),Ae($.prototype,"isValid",[Je]),Ae($.prototype,"isDirty",[Je]),Ae($.prototype,"isError",[Je]),Ae($.prototype,"adapterError",[Je]),Ae($.prototype,"isPreloaded",[V.PO]),Ae($.prototype,"stateName",[V.PO]),Ae($.prototype,"dirtyType",[V.PO]),(0,W.sg)(Ze.prototype,"isSaving",!1)
class tt extends(U()){init(e){const t=e._createProps,i=e._secretInit
e._createProps=null,e._secretInit=null
const r=this.store=i.store
super.init(e),this[Y.pm]=r
const n=i.identifier
i.cb(this,i.cache,n,i.store),this.___recordState=null,this.setProperties(t)
const s=r.notifications
this.___private_notifications=s.subscribe(n,((e,t,i)=>{!function(e,t,i,r,n){if("attributes"===t)i?We(n,e,i,r):r.eachAttribute((t=>{We(n,e,t,r)}))
else if("relationships"===t)if(i){const t=r.constructor.relationshipsByName.get(i)
Ve(e,i,r,t)}else r.eachRelationship(((t,i)=>{Ve(e,t,r,i)}))
else"identity"===t&&r.notifyPropertyChange("id")}(e,t,i,this,r)}))}destroy(){const e=(0,k.recordIdentifierFor)(this)
this.___recordState?.destroy(),(0,k.storeFor)(this).notifications.unsubscribe(this.___private_notifications),this.eachRelationship(((e,t)=>{"belongsTo"===t.kind&&this.notifyPropertyChange(e)})),Fe.get(this)?.destroy(),Fe.delete(this),Fe.delete(e),super.destroy()}get isEmpty(){return this.currentState.isEmpty}get isLoading(){return this.currentState.isLoading}get isLoaded(){return this.currentState.isLoaded}get hasDirtyAttributes(){return this.currentState.isDirty}get isSaving(){return this.currentState.isSaving}get isDeleted(){return this.currentState.isDeleted}get isNew(){return this.currentState.isNew}get isValid(){return this.currentState.isValid}get dirtyType(){return this.currentState.dirtyType}get isError(){return this.currentState.isError}set isError(e){}get id(){return(0,k.recordIdentifierFor)(this).id}set id(e){const t=(0,A.pG)(e),i=(0,k.recordIdentifierFor)(this),r=t!==i.id
null!==t&&r&&(this.store._instanceCache.setRecordId(i,t),this.store.notifications.notify(i,"identity"))}toString(){return`<model::${this.constructor.modelName}:${this.id}>`}get currentState(){return this.___recordState||(this.___recordState=new Ze(this)),this.___recordState}set currentState(e){throw new Error("cannot set currentState")}get errors(){const e=Ue.create({__record:this})
return this.currentState.updateInvalidErrors(e),e}get adapterError(){return this.currentState.adapterError}set adapterError(e){throw new Error("adapterError is not directly settable")}notifyPropertyChange(e){Xe(this,e),super.notifyPropertyChange(e)}attr(){}eachRelationship(e,t){this.constructor.eachRelationship(e,t)}relationshipFor(e){return this.constructor.relationshipsByName.get(e)}inverseFor(e){return this.constructor.inverseFor(e,(0,k.storeFor)(this))}eachAttribute(e,t){this.constructor.eachAttribute(e,t)}static typeForRelationship(e,t){const i=this.relationshipsByName.get(e)
return i&&t.modelFor(i.type)}static get inverseMap(){return Object.create(null)}static inverseFor(e,t){const i=this.inverseMap
if(i[e])return i[e]
{const r=this._findInverseFor(e,t)
return i[e]=r,r}}static _findInverseFor(e,t){const i=this.relationshipsByName.get(e)
if(!i)return null
const{options:r}=i
return null===r.inverse?null:t.schema.hasResource(i)&&t.schema.fields(i).get(r.inverse)||null}static get relationships(){const e=new Map
return this.relationshipsByName.forEach((t=>{const{type:i}=t
e.has(i)||e.set(i,[]),e.get(i).push(t)})),e}static get relationshipNames(){const e={hasMany:[],belongsTo:[]}
return this.eachComputedProperty(((t,i)=>{it(i)&&e[i.kind].push(t)})),e}static get relatedTypes(){const e=[],t=this.relationshipsObject,i=Object.keys(t)
for(let r=0;r<i.length;r++){const n=t[i[r]].type
e.includes(n)||e.push(n)}return e}static get relationshipsByName(){const e=new Map,t=this.relationshipsObject,i=Object.keys(t)
for(let r=0;r<i.length;r++){const n=t[i[r]]
e.set(n.name,n)}return e}static get relationshipsObject(){const e=Object.create(null)
return this.modelName,this.eachComputedProperty(((t,i)=>{it(i)&&(i.key=t,i.name=t,e[t]=i)})),e}static get fields(){const e=new Map
return this.eachComputedProperty(((t,i)=>{it(i)?e.set(t,i.kind):rt(i)&&e.set(t,"attribute")})),e}static eachRelationship(e,t){this.relationshipsByName.forEach(((i,r)=>{e.call(t,r,i)}))}static eachRelatedType(e,t){const i=this.relatedTypes
for(let r=0;r<i.length;r++){const n=i[r]
e.call(t,n)}}static determineRelationshipType(e,t){const i=e.name,r=e.kind,n=this.inverseFor(i,t)
return n?"belongsTo"===n.kind?"belongsTo"===r?"oneToOne":"manyToOne":"belongsTo"===r?"oneToMany":"manyToMany":"belongsTo"===r?"oneToNone":"manyToNone"}static get attributes(){const e=new Map
return this.eachComputedProperty(((t,i)=>{rt(i)&&(i.key=t,i.name=t,e.set(t,i))})),e}static get transformedAttributes(){const e=new Map
return this.eachAttribute(((t,i)=>{i.type&&e.set(t,i.type)})),e}static eachAttribute(e,t){this.attributes.forEach(((i,r)=>{e.call(t,r,i)}))}static eachTransformedAttribute(e,t){this.transformedAttributes.forEach(((i,r)=>{e.call(t,r,i)}))}static toString(){return`model:${this.modelName}`}}function it(e){return"object"==typeof e&&null!==e&&"kind"in e&&"options"in e&&("hasMany"===e.kind||"belongsTo"===e.kind)}function rt(e){return"object"==typeof e&&null!==e&&"kind"in e&&"attribute"===e.kind}Ae((I=tt).prototype,"isEmpty",[V.Vv]),Ae(I.prototype,"isLoading",[V.Vv]),Ae(I.prototype,"isLoaded",[V.Vv]),Ae(I.prototype,"hasDirtyAttributes",[V.Vv]),Ae(I.prototype,"isSaving",[V.Vv]),Ae(I.prototype,"isDeleted",[V.Vv]),Ae(I.prototype,"isNew",[V.Vv]),Ae(I.prototype,"isValid",[V.Vv]),Ae(I.prototype,"dirtyType",[V.Vv]),Ae(I.prototype,"isError",[V.Vv]),Ae(I.prototype,"id",[Je]),Ae(I.prototype,"currentState",[Je]),Ae(I.prototype,"errors",[et]),Ae(I.prototype,"adapterError",[V.Vv]),ae(tt,"isModel",!0),ae(tt,"modelName",null),Ae(I,"inverseMap",[et]),Ae(I,"relationships",[et]),Ae(I,"relationshipNames",[et]),Ae(I,"relatedTypes",[et]),Ae(I,"relationshipsByName",[et]),Ae(I,"relationshipsObject",[et]),Ae(I,"fields",[et]),Ae(I,"attributes",[et]),Ae(I,"transformedAttributes",[et]),tt.prototype.save=function(e){let t
return this.currentState.isNew&&this.currentState.isDeleted?t=Promise.resolve(this):(this.errors.clear(),t=this[Y.pm].saveRecord(this,e)),t},tt.prototype.destroyRecord=function(e){const{isNew:t}=this.currentState
return this.deleteRecord(),t?Promise.resolve(this):this.save(e).then((e=>(this.unloadRecord(),this)))},tt.prototype.unloadRecord=function(){this.currentState.isNew&&(this.isDestroyed||this.isDestroying)||this[Y.pm].unloadRecord(this)},tt.prototype.hasMany=function(e){return Le(this).referenceFor("hasMany",e)},tt.prototype.belongsTo=function(e){return Le(this).referenceFor("belongsTo",e)},tt.prototype.serialize=function(e){return(0,Z.upgradeStore)(this[Y.pm]),this[Y.pm].serializeRecord(this,e)},tt.prototype._createSnapshot=function(){const e=this[Y.pm]
if((0,Z.upgradeStore)(e),!e._fetchManager){const t=(0,se.A)(i(604)).FetchManager
e._fetchManager=new t(e)}return e._fetchManager.createSnapshot((0,k.recordIdentifierFor)(this))},tt.prototype.deleteRecord=function(){this.currentState&&this[Y.pm].deleteRecord(this)},tt.prototype.changedAttributes=function(){return(0,A.oX)(this).changedAttrs((0,k.recordIdentifierFor)(this))},tt.prototype.rollbackAttributes=function(){const{currentState:e}=this,{isNew:t}=e
this[Y.pm]._join((()=>{(0,A.oX)(this).rollbackAttrs((0,k.recordIdentifierFor)(this)),this.errors.clear(),e.cleanErrorRequests(),t&&this.unloadRecord()}))},tt.prototype.reload=function(e={}){e.isReloading=!0,e.reload=!0
const t=(0,k.recordIdentifierFor)(this)
return this.isReloading=!0,this[Y.pm].request({op:"findRecord",data:{options:e,record:t},cacheOptions:{[Symbol.for("wd:skip-cache")]:!0}}).then((()=>this)).finally((()=>{this.isReloading=!1}))},(0,W.sg)(tt.prototype,"isReloading",!1),tt.prototype._createProps=null,tt.prototype._secretInit=null
class nt{constructor(e){this.store=e,this._schemas=new Map,this._typeMisses=new Set}hasTrait(e){return!1}resourceHasTrait(e,t){return!1}transformation(e){}derivation(e){}hashFn(e){}resource(e){const t=le(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).schema}registerResources(e){}registerResource(e){}registerTransformation(e){}registerDerivation(e){}registerHashFn(e){}_loadModelSchema(e){const t=this.store.modelFor(e),i=t.attributes,r=Object.create(null)
i.forEach(((e,t)=>r[t]=e))
const n=t.relationshipsObject||null,s=new Map
for(const a of Object.values(r))s.set(a.name,a)
for(const a of Object.values(n))s.set(a.name,a)
const o={schema:{legacy:!0,identity:{name:"id",kind:"@id"},type:e,fields:Array.from(s.values())},attributes:r,relationships:n,fields:s}
return this._schemas.set(e,o),o}fields(e){const t=le(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).fields}hasResource(e){const t=le(e.type)
return!!this._schemas.has(t)||!this._typeMisses.has(t)&&!(null===st(this.store,t)&&(this._typeMisses.add(t),1))}}function st(e,t){e._modelFactoryCache||(e._modelFactoryCache=Object.create(null))
const i=e._modelFactoryCache
let r=i[t]
if(!r){if(r=(0,w.getOwner)(e).factoryFor(`model:${t}`),r||(r=function(e,t){const i=(0,w.getOwner)(e),r=i.factoryFor(`mixin:${t}`),n=r&&r.class
if(n){const e=tt.extend(n)
e.__isMixin=!0,e.__mixin=n,i.register(`model:${t}`,e)}return i.factoryFor(`model:${t}`)}(e,t)),!r)return null
const n=r.class
n.isModel&&(n.modelName&&Object.prototype.hasOwnProperty.call(n,"modelName")||Object.defineProperty(n,"modelName",{value:t})),i[t]=r}return r}function ot(e,t){const i=e.type,r={_createProps:t,_secretInit:{identifier:e,cache:this.cache,store:this,cb:ct}}
return(0,w.setOwner)(r,(0,w.getOwner)(this)),st(this,i).class.create(r)}function at(e){e.destroy()}function lt(e){const t=st(this,le(e)),i=t&&t.class?t.class:null
if(i&&i.isModel&&!this._forceShim)return i}function ct(e,t,i,r){(0,A.TP)(e,i),A.i.set(e,r),(0,A.Wz)(e,t)}nt.prototype.doesTypeExist=function(e){return(0,z.deprecate)("Use `schema.hasResource({ type })` instead of `schema.doesTypeExist(type)`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}}),this.hasResource({type:e})},nt.prototype.attributesDefinitionFor=function(e){(0,z.deprecate)("Use `schema.fields({ type })` instead of `schema.attributesDefinitionFor({ type })`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}})
const t=le(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).attributes},nt.prototype.relationshipsDefinitionFor=function(e){(0,z.deprecate)("Use `schema.fields({ type })` instead of `schema.relationshipsDefinitionFor({ type })`",!1,{id:"ember-data:schema-service-updates",until:"5.0",for:"ember-data",since:{available:"5.4",enabled:"5.4"}})
const t=le(e.type)
return this._schemas.has(t)||this._loadModelSchema(t),this._schemas.get(t).relationships}
var ut=i(598),ht=i(121)
const dt="undefined"!=typeof fetch?(...e)=>fetch(...e):"undefined"!=typeof FastBoot?(...e)=>FastBoot.require("node-fetch")(...e):()=>{throw new Error("No Fetch Implementation Found")},ft=new Set(["updateRecord","createRecord","deleteRecord"]),pt=new Map([[400,"Bad Request"],[401,"Unauthorized"],[402,"Payment Required"],[403,"Forbidden"],[404,"Not Found"],[405,"Method Not Allowed"],[406,"Not Acceptable"],[407,"Proxy Authentication Required"],[408,"Request Timeout"],[409,"Conflict"],[410,"Gone"],[411,"Length Required"],[412,"Precondition Failed"],[413,"Payload Too Large"],[414,"URI Too Long"],[415,"Unsupported Media Type"],[416,"Range Not Satisfiable"],[417,"Expectation Failed"],[419,"Page Expired"],[420,"Enhance Your Calm"],[421,"Misdirected Request"],[422,"Unprocessable Entity"],[423,"Locked"],[424,"Failed Dependency"],[425,"Too Early"],[426,"Upgrade Required"],[428,"Precondition Required"],[429,"Too Many Requests"],[430,"Request Header Fields Too Large"],[431,"Request Header Fields Too Large"],[450,"Blocked By Windows Parental Controls"],[451,"Unavailable For Legal Reasons"],[500,"Internal Server Error"],[501,"Not Implemented"],[502,"Bad Gateway"],[503,"Service Unavailable"],[504,"Gateway Timeout"],[505,"HTTP Version Not Supported"],[506,"Variant Also Negotiates"],[507,"Insufficient Storage"],[508,"Loop Detected"],[509,"Bandwidth Limit Exceeded"],[510,"Not Extended"],[511,"Network Authentication Required"]]),yt={async request(e){let t
try{t=await dt(e.request.url,e.request)}catch(e){throw e instanceof DOMException&&"AbortError"===e.name?(e.statusText="Aborted",e.status=20,e.isRequestError=!0):(e.statusText="Unknown Network Error",e.status=0,e.isRequestError=!0),e}const i=!t.ok||t.status>=400,r=e.request.op,n=Boolean(r&&ft.has(r))
if(!i&&!n&&204!==t.status&&!t.headers.has("date")){const e=new Headers(t.headers)
e.set("date",(new Date).toUTCString()),t=function(e,t){const i=(0,ht.f)(e)
return new Response(e.body,Object.assign(i,t))}(t,{headers:e})}if(e.setResponse(t),204===t.status)return null
let s=""
{const i=t.body.getReader(),r=new TextDecoder
let n=e.hasRequestedStream,o=n?new TransformStream:null,a=o?.writable.getWriter()
for(n&&(e.request.signal?.addEventListener("abort",(()=>{n&&(o.writable.abort("Request Aborted"),o.readable.cancel("Request Aborted"))})),e.setStream(o.readable));;){const{done:t,value:l}=await i.read()
if(t){n&&(n=!1,await a.ready,await a.close())
break}if(s+=r.decode(l,{stream:!0}),n)await a.ready,await a.write(l)
else if(e.hasRequestedStream){const t=new TextEncoder
n=!0,o=new TransformStream,e.request.signal?.addEventListener("abort",(()=>{n&&(o.writable.abort("Request Aborted"),o.readable.cancel("Request Aborted"))})),e.setStream(o.readable),a=o.writable.getWriter(),await a.ready,await a.write(t.encode(s)),await a.ready,await a.write(l)}}n&&(n=!1,await a.ready,await a.close())}if(i){let i
try{i=JSON.parse(s)}catch{}const r=Array.isArray(i)?i:null!==(o=i)&&"object"==typeof o&&Array.isArray(i.errors)?i.errors:null,n=t.statusText||pt.get(t.status)||"Unknown Request Error",a=`[${t.status} ${n}] ${e.request.method??"GET"} (${t.type}) - ${t.url}`,l=r?new AggregateError(r,a):new Error(a)
throw l.status=t.status,l.statusText=n,l.isRequestError=!0,l.code=l.status,l.name=l.statusText.replaceAll(" ","")+"Error",l.content=i,l}return JSON.parse(s)
var o}}
function gt(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var i=t.call(e,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class mt extends k.default{constructor(e){super(e),gt(this,"adapterFor",O),gt(this,"serializerFor",T),gt(this,"pushPayload",D),gt(this,"normalize",P),gt(this,"serializeRecord",j),"requestManager"in this||(this.requestManager=new ut.Ay,this.requestManager.use([C,yt])),this.requestManager.useCache(k.CacheHandler)}createSchemaService(){return new nt(this)}createCache(e){return new s(e)}instantiateRecord(e,t){return ot.call(this,e,t)}teardownRecord(e){at.call(this,e)}modelFor(e){return lt.call(this,e)||super.modelFor(e)}destroy(){N.call(this),super.destroy()}}},141:(e,t,i)=>{i.r(t),i.d(t,{default:()=>n})
var r=i(40),n=(0,i(726).A)((function(e,t){let i=new Array(...e)
return 2===i.length&&i.push({withoutCount:t["without-count"]}),(0,r.pluralize)(...i)}))},94:(e,t,i)=>{i.r(t),i.d(t,{default:()=>n})
var r=i(40),n=(0,i(726).A)((function(e){return(0,r.singularize)(e[0])}))},40:(e,t,i)=>{i.r(t),i.d(t,{default:()=>d,pluralize:()=>p,singularize:()=>y})
var r={plurals:[[/$/,"s"],[/s$/i,"s"],[/^(ax|test)is$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(octop|vir)i$/i,"$1i"],[/(alias|status|bonus)$/i,"$1es"],[/(bu)s$/i,"$1ses"],[/(buffal|tomat)o$/i,"$1oes"],[/([ti])um$/i,"$1a"],[/([ti])a$/i,"$1a"],[/sis$/i,"ses"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/(hive)$/i,"$1s"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(x|ch|ss|sh)$/i,"$1es"],[/(matr|vert|ind)(?:ix|ex)$/i,"$1ices"],[/^(m|l)ouse$/i,"$1ice"],[/^(m|l)ice$/i,"$1ice"],[/^(ox)$/i,"$1en"],[/^(oxen)$/i,"$1"],[/(quiz)$/i,"$1zes"]],singular:[[/s$/i,""],[/(ss)$/i,"$1"],[/(n)ews$/i,"$1ews"],[/([ti])a$/i,"$1um"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i,"$1sis"],[/(^analy)(sis|ses)$/i,"$1sis"],[/([^f])ves$/i,"$1fe"],[/(hive)s$/i,"$1"],[/(tive)s$/i,"$1"],[/([lr])ves$/i,"$1f"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/(s)eries$/i,"$1eries"],[/(m)ovies$/i,"$1ovie"],[/(x|ch|ss|sh)es$/i,"$1"],[/^(m|l)ice$/i,"$1ouse"],[/(bus)(es)?$/i,"$1"],[/(o)es$/i,"$1"],[/(shoe)s$/i,"$1"],[/(cris|test)(is|es)$/i,"$1is"],[/^(a)x[ie]s$/i,"$1xis"],[/(octop|vir)(us|i)$/i,"$1us"],[/(alias|status|bonus)(es)?$/i,"$1"],[/^(ox)en/i,"$1"],[/(vert|ind)ices$/i,"$1ex"],[/(matr)ices$/i,"$1ix"],[/(quiz)zes$/i,"$1"],[/(database)s$/i,"$1"]],irregularPairs:[["person","people"],["man","men"],["child","children"],["sex","sexes"],["move","moves"],["cow","kine"],["zombie","zombies"]],uncountable:["equipment","information","rice","money","species","series","fish","sheep","jeans","police"]}
const n=/^\s*$/,s=/([\w/-]+[_/\s-])([a-z\d]+$)/,o=/([\w/\s-]+)([A-Z][a-z\d]*$)/,a=/[A-Z][a-z\d]*$/,l=/(^|\/)([a-z\u00C0-\u024F])/g
function c(e){return e.replace(l,(e=>e.toUpperCase()))}function u(e,t){for(let i=0,r=t.length;i<r;i++)e.uncountable[t[i].toLowerCase()]=!0}function h(e,t){let i
for(let r=0,n=t.length;r<n;r++)i=t[r],e.irregular[i[0].toLowerCase()]=i[1],e.irregular[i[1].toLowerCase()]=i[1],e.irregularInverse[i[1].toLowerCase()]=i[0],e.irregularInverse[i[0].toLowerCase()]=i[0]}function d(e){(e=e||{}).uncountable=e.uncountable||f(),e.irregularPairs=e.irregularPairs||f()
const t=this.rules={plurals:e.plurals||[],singular:e.singular||[],irregular:f(),irregularInverse:f(),uncountable:f()}
u(t,e.uncountable),h(t,e.irregularPairs),this.enableCache()}if(!Object.create&&!Object.create(null).hasOwnProperty)throw new Error("This browser does not support Object.create(null), please polyfil with es5-sham: http://git.io/yBU2rg")
function f(){var e=Object.create(null)
return e._dict=null,delete e._dict,e}function p(){return d.inflector.pluralize(...arguments)}function y(e){return d.inflector.singularize(e)}d.prototype={enableCache(){this.purgeCache(),this.singularize=function(e){return this._cacheUsed=!0,this._sCache[e]||(this._sCache[e]=this._singularize(e))},this.pluralize=function(e,t,i={}){this._cacheUsed=!0
var r=[e,t,i.withoutCount]
return this._pCache[r]||(this._pCache[r]=this._pluralize(e,t,i))}},purgeCache(){this._cacheUsed=!1,this._sCache=f(),this._pCache=f()},disableCache(){this._sCache=null,this._pCache=null,this.singularize=function(e){return this._singularize(e)},this.pluralize=function(){return this._pluralize(...arguments)}},plural(e,t){this._cacheUsed&&this.purgeCache(),this.rules.plurals.push([e,t.toLowerCase()])},singular(e,t){this._cacheUsed&&this.purgeCache(),this.rules.singular.push([e,t.toLowerCase()])},uncountable(e){this._cacheUsed&&this.purgeCache(),u(this.rules,[e.toLowerCase()])},irregular(e,t){this._cacheUsed&&this.purgeCache(),h(this.rules,[[e,t]])},pluralize(){return this._pluralize(...arguments)},_pluralize(e,t,i={}){return void 0===t?this.inflect(e,this.rules.plurals,this.rules.irregular):(1!==parseFloat(e)&&(t=this.inflect(t,this.rules.plurals,this.rules.irregular)),i.withoutCount?t:`${e} ${t}`)},singularize(e){return this._singularize(e)},_singularize(e){return this.inflect(e,this.rules.singular,this.rules.irregularInverse)},inflect(e,t,i){let r,l,u,h,d,f,p,y,g,m
if(p=!e||n.test(e),y=a.test(e),p)return e
if(h=e.toLowerCase(),d=s.exec(e)||o.exec(e),d&&(f=d[2].toLowerCase()),m=this.rules.uncountable[h]||this.rules.uncountable[f],m)return e
for(g in i)if(h.match(g+"$"))return l=i[g],y&&i[f]&&(l=c(l),g=c(g)),e.replace(new RegExp(g,"i"),l)
for(var v=t.length;v>0&&(r=t[v-1],g=r[0],!g.test(e));v--);return r=r||[],g=r[0],l=r[1],u=e.replace(g,l),u}},d.defaultRules=r,d.inflector=new d(r)},726:(e,t,i)=>{i.d(t,{A:()=>a})
var r=i(211),n=i.n(r),s=i(336),o=i.n(s)
function a(e){return o()?o().helper(e):n().HTMLBars?n().HTMLBars.makeBoundHelper(e):n().Handlebars.makeBoundHelper(e)}},202:(e,t,i)=>{function r(e,t,i){return(t="symbol"==typeof(r=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var i=t.call(e,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?r:String(r))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e
var r}function n(e,t,i,r){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}function s(e,t,i,r,n){var s={}
return Object.keys(r).forEach((function(e){s[e]=r[e]})),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=i.slice().reverse().reduce((function(i,r){return r(e,t,i)||i}),s),n&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(n):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(e,t,s),s=null),s}i.d(t,{_:()=>s,a:()=>n,b:()=>r})},417:(e,t,i)=>{i.r(t),i.d(t,{default:()=>h})
var r,n,s,o=i(202),a=i(735),l=i(336),c=i.n(l),u=i(666)
let h=(r=(0,a.inject)("page-title"),n=class extends(c()){constructor(e){super(e),(0,o.a)(this,"tokens",s,this),(0,o.b)(this,"tokenId",(0,u.guidFor)(this)),this.tokens.push({id:this.tokenId})}compute(e,t){const i={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(i),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},s=(0,o._)(n.prototype,"tokens",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),n)},754:(e,t,i)=>{i.r(t),i.d(t,{default:()=>m})
var r,n,s,o,a,l=i(202),c=i(223),u=i(735),h=i.n(u),d=i(553),f=i(603)
const p="undefined"!=typeof FastBoot,y="routeDidChange",g=["separator","prepend","replace"]
let m=(r=(0,u.inject)("router"),n=(0,u.inject)("-document"),s=class extends(h()){constructor(e){if(super(e),(0,l.a)(this,"router",o,this),(0,l.a)(this,"document",a,this),(0,l.b)(this,"tokens",[]),(0,l.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,l.b)(this,"scheduleTitleUpdate",(()=>{(0,c.scheduleOnce)("afterRender",this,this._updateTitle)})),this._validateExistingTitleElement(),function(e){return"resolveRegistration"in e}(e)){const i=e.resolveRegistration("config:environment")
"object"==typeof(t=i)&&null!==t&&"pageTitle"in t&&g.forEach((e=>{if(!(0,d.isEmpty)(i.pageTitle[e])){const t=i.pageTitle[e]
this._defaultConfig[e]=t}}))}var t
this.router.on(y,this.scheduleTitleUpdate)}applyTokenDefaults(e){const t=this._defaultConfig.separator,i=this._defaultConfig.prepend,r=this._defaultConfig.replace
e.previous??=null,e.next??=null,null==e.separator&&(e.separator=t),null==e.prepend&&null!=i&&(e.prepend=i),null==e.replace&&null!=r&&(e.replace=r)}inheritFromPrevious(e){const t=e.previous
t&&(null==e.separator&&(e.separator=t.separator),null==e.prepend&&(e.prepend=t.prepend))}push(e){const t=this._findTokenById(e.id)
if(t){const i=this.tokens.indexOf(t),r=[...this.tokens],n=t.previous
return e.previous=n,e.next=t.next,this.inheritFromPrevious(e),this.applyTokenDefaults(e),r.splice(i,1,e),void(this.tokens=r)}const i=this.tokens.slice(-1)[0]
i&&(e.previous=i??null,i.next=e,this.inheritFromPrevious(e)),this.applyTokenDefaults(e),this.tokens=[...this.tokens,e]}remove(e){const t=this._findTokenById(e)
if(!t)return
const{next:i,previous:r}=t
i&&(i.previous=r),r&&(r.next=i),t.previous=t.next=null
const n=[...this.tokens]
n.splice(n.indexOf(t),1),this.tokens=n}get visibleTokens(){const e=this.tokens
let t=e?e.length:0
const i=[]
for(;t--;){const r=e[t]
if(r){if(r.replace){i.unshift(r)
break}i.unshift(r)}}return i}get sortedTokens(){const e=this.visibleTokens
if(!e)return[]
let t=!0,i=[]
const r=[i],n=[]
return e.forEach((e=>{if(e.front)n.unshift(e)
else if(e.prepend){t&&(t=!1,i=[],r.push(i))
const n=i[0]
n&&((e={...e}).separator=n.separator),i.unshift(e)}else t||(t=!0,i=[],r.push(i)),i.push(e)})),n.concat(r.reduce(((e,t)=>e.concat(t)),[]))}toString(){const e=this.sortedTokens,t=[]
for(let i=0,r=e.length;i<r;i++){const n=e[i]
n&&n.title&&(t.push(n.title),i+1<r&&t.push(n.separator))}return t.join("")}willDestroy(){super.willDestroy(),this.router.off(y,this.scheduleTitleUpdate)}_updateTitle(){const e=this.toString()
p?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){p||(0,f.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find((t=>t.id===e))}updateFastbootTitle(e){if(!p)return
const t=this.document.head,i=t.childNodes
for(let s=0;s<i.length;s++){const e=i[s]
e&&"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}const r=this.document.createElement("title"),n=this.document.createTextNode(e)
r.appendChild(n),t.appendChild(r)}titleDidUpdate(e){}},o=(0,l._)(s.prototype,"router",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=(0,l._)(s.prototype,"document",[n],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s)},244:(e,t,i)=>{function r(e,t){return"string"==typeof e?(t||document).querySelector(e):e||null}function n(e){var t=e.getBoundingClientRect()
return{top:t.top+(document.documentElement.scrollTop||document.body.scrollTop),left:t.left+(document.documentElement.scrollLeft||document.body.scrollLeft)}}function s(e){return e.titleHeight+e.margins.top+e.paddings.top}function o(e){return e.margins.left+e.paddings.left}function a(e){return e.margins.top+e.margins.bottom+e.paddings.top+e.paddings.bottom+e.titleHeight+e.legendHeight}function l(e){return e.margins.left+e.margins.right+e.paddings.left+e.paddings.right}function c(e){return parseFloat(e.toFixed(2))}function u(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3]
i||(i=r?e[0]:e[e.length-1])
var n=new Array(Math.abs(t)).fill(i)
return r?n.concat(e):e.concat(n)}function h(e,t){return(e+"").length*t}function d(e,t){return{x:Math.sin(e*ne)*t,y:Math.cos(e*ne)*t}}function f(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
return!(Number.isNaN(e)||void 0===e||!Number.isFinite(e)||t&&e<0)}function p(e){var t=void 0,i=void 0,r=void 0
if(e instanceof Date)return new Date(e.getTime())
if("object"!==(void 0===e?"undefined":ae(e))||null===e)return e
for(r in t=Array.isArray(e)?[]:{},e)i=e[r],t[r]=p(i)
return t}function y(e,t){var i=void 0,r=void 0
return e<=t?(i=t-e,r=e):(i=e-t,r=t),[i,r]}function g(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.length-e.length
return i>0?e=u(e,i):t=u(t,i),[e,t]}function m(e,t){if(e)return e.length>t?e.slice(0,t-3)+"...":e}function v(e,t){for(var i=[],r=0;r<e.length;r++)i.push([e[r],t[r]])
var n=function(e,t,i,r){var n=function(e,t){var i=t[0]-e[0],r=t[1]-e[1]
return{length:Math.sqrt(Math.pow(i,2)+Math.pow(r,2)),angle:Math.atan2(r,i)}}(t||e,i||e),s=n.angle+(r?Math.PI:0),o=.2*n.length
return[e[0]+Math.cos(s)*o,e[1]+Math.sin(s)*o]}
return function(e){return e.reduce((function(e,t,i,r){return 0===i?t[0]+","+t[1]:e+" "+function(e,t,i){var r=n(i[t-1],i[t-2],e),s=n(e,i[t-1],i[t+1],!0)
return"C "+r[0]+","+r[1]+" "+s[0]+","+s[1]+" "+e[0]+","+e[1]}(t,i,r)}),"")}(i)}function b(e){return e>255?255:e<0?0:e}function _(e,t){var i=ce(e),r=!1
"#"==i[0]&&(i=i.slice(1),r=!0)
var n=parseInt(i,16),s=b((n>>16)+t),o=b((n>>8&255)+t)
return(r?"#":"")+(b((255&n)+t)|o<<8|s<<16).toString(16)}function w(e,t){return"string"==typeof e?(t||document).querySelector(e):e||null}function k(e,t){var i=document.createElementNS("http://www.w3.org/2000/svg",e)
for(var r in t){var n=t[r]
if("inside"===r)w(n).appendChild(i)
else if("around"===r){var s=w(n)
s.parentNode.insertBefore(i,s),i.appendChild(s)}else"styles"===r?"object"===(void 0===n?"undefined":ue(n))&&Object.keys(n).map((function(e){i.style[e]=n[e]})):("className"===r&&(r="class"),"innerHTML"===r?i.textContent=n:i.setAttribute(r,n))}return i}function A(e,t,i,r){return k("stop",{inside:e,style:"stop-color: "+i,offset:t,"stop-opacity":r})}function S(e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,i={className:e,transform:arguments.length>1&&void 0!==arguments[1]?arguments[1]:""}
return t&&(i.inside=t),k("g",i)}function R(e){return k("path",{className:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",d:e,styles:{stroke:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none",fill:arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none","stroke-width":arguments.length>4&&void 0!==arguments[4]?arguments[4]:2}})}function x(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r="path-fill-gradient-"+t+"-"+(i?"lighter":"default"),n=function(e,t){return k("linearGradient",{inside:e,id:t,x1:0,x2:0,y1:0,y2:1})}(e,r),s=[1,.6,.2]
return i&&(s=[.4,.2,0]),A(n,"0%",t,s[0]),A(n,"50%",t,s[1]),A(n,"100%",t,s[2]),r}function C(e,t,i,r,n){var s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{},o={className:e,x:t,y:i,width:r,height:r,rx:n,fill:arguments.length>5&&void 0!==arguments[5]?arguments[5]:"none"}
return Object.keys(s).map((function(e){o[e]=s[e]})),k("rect",o)}function M(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=n.fontSize||de
return k("text",{className:e,x:t,y:i,dy:(void 0!==n.dy?n.dy:s/2)+"px","font-size":s+"px",fill:n.fill||pe,"text-anchor":n.textAnchor||"start",innerHTML:r})}function E(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{}
n.stroke||(n.stroke=fe),n.lineType||(n.lineType=""),n.shortenNumbers&&(t=function(e){var t=void 0
if("number"==typeof e)t=e
else if("string"==typeof e&&(t=Number(e),Number.isNaN(t)))return e
var i=Math.floor(Math.log10(Math.abs(t)))
if(i<=2)return t
var r=Math.floor(i/3),n=Math.pow(10,i-3*r)*+(t/Math.pow(10,i)).toFixed(1)
return Math.round(100*n)/100+" "+["","K","M","B","T"][r]}(t))
var s=k("line",{className:"line-horizontal "+n.className+("dashed"===n.lineType?"dashed":""),x1:i,x2:r,y1:0,y2:0,styles:{stroke:n.stroke}}),o=k("text",{x:i<r?i-he:i+he,y:0,dy:de/2-2+"px","font-size":de+"px","text-anchor":i<r?"end":"start",innerHTML:t+""}),a=k("g",{transform:"translate(0, "+e+")","stroke-opacity":1})
return 0!==o&&"0"!==o||(a.style.stroke="rgba(27, 31, 35, 0.6)"),a.appendChild(s),a.appendChild(o),a}function O(e,t,i,r){var n="string"==typeof t?t:t.join(", ")
return[e,{transform:i.join(", ")},r,be,"translate",{transform:n}]}function T(e,t,i){return O(e,[0,i],[0,t],ve)}function P(e,t){return[e,{d:t},me,be]}function D(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"linear",n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},o=e.cloneNode(!0),a=e.cloneNode(!0)
for(var l in t){var c=void 0
c="transform"===l?document.createElementNS("http://www.w3.org/2000/svg","animateTransform"):document.createElementNS("http://www.w3.org/2000/svg","animate")
var u=s[l]||e.getAttribute(l),h=t[l],d={attributeName:l,from:u,to:h,begin:"0s",dur:i/1e3+"s",values:u+";"+h,keySplines:we[r],keyTimes:"0;1",calcMode:"spline",fill:"freeze"}
for(var f in n&&(d.type=n),d)c.setAttribute(f,d[f])
o.appendChild(c),n?a.setAttribute(l,"translate("+h+")"):a.setAttribute(l,h)}return[o,a]}function j(e,t){e.style.transform=t,e.style.webkitTransform=t,e.style.msTransform=t,e.style.mozTransform=t,e.style.oTransform=t}function N(e,t){var i=[],r=[]
t.map((function(e){var t,n,s=e[0],o=s.parentNode
e[0]=s
var a=D.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}(e)),l=_e(a,2)
t=l[0],n=l[1],i.push(n),r.push([t,o]),o&&o.replaceChild(t,s)}))
var n=e.cloneNode(!0)
return r.map((function(e,r){e[1]&&(e[1].replaceChild(i[r],e[0]),t[r][0]=i[r])})),n}function F(e){var t=new Date(e)
return t.setMinutes(t.getMinutes()-t.getTimezoneOffset()),t}function L(e){var t=e.getDate(),i=e.getMonth()+1
return[e.getFullYear(),(i>9?"":"0")+i,(t>9?"":"0")+t].join("-")}function q(e){return new Date(e.getTime())}function $(e,t){var i=H(e)
return Math.ceil(function(e,t){var i=Ee*Me
return(F(t)-F(e))/i}(i,t)/Ce)}function I(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}function z(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=Oe[e]
return t?i.slice(0,3):i}function B(e,t){return new Date(t,e+1,0)}function H(e){var t=q(e),i=t.getDay()
return 0!==i&&U(t,-1*i),t}function U(e,t){e.setDate(e.getDate()+t)}function V(e,t,i){var r=Object.keys(Ne).filter((function(t){return e.includes(t)})),n=Ne[r[0]]
return Object.assign(n,{constants:t,getData:i}),new je(n)}function W(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}function Y(e){if(0===e)return[0,0]
if(isNaN(e))return{mantissa:-6755399441055744,exponent:972}
var t=e>0?1:-1
if(!isFinite(e))return{mantissa:4503599627370496*t,exponent:972}
e=Math.abs(e)
var i=Math.floor(Math.log10(e))
return[t*(e/Math.pow(10,i)),i]}function G(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=Y(e),r=Be(i,2),n=r[0],s=r[1],o=t?t/Math.pow(10,s):0,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=Math.ceil(e),r=Math.floor(t),n=i-r,s=n,o=1
n>5&&(n%2!=0&&(n=++i-r),s=n/2,o=2),n<=2&&(o=n/(s=4)),0===n&&(s=5,o=1)
for(var a=[],l=0;l<=s;l++)a.push(r+o*l)
return a}(n=n.toFixed(6),o)
return a.map((function(e){return e*Math.pow(10,s)}))}function K(e){return e[1]-e[0]}function J(e,t){return c(t.zeroLine-e*t.scaleMultiplier)}function X(e,t){return t.filter((function(t){return t<e})).length}function Z(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}i.r(t),i.d(t,{AxisChart:()=>Ye,Chart:()=>Ze,Heatmap:()=>Ue,PercentageChart:()=>qe,PieChart:()=>ze}),function(e,t){void 0===t&&(t={})
var i=t.insertAt
if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style")
n.type="text/css","top"===i&&r.firstChild?r.insertBefore(n,r.firstChild):r.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}('.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}')
var Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
r.create=function(e,t){var i=document.createElement(e)
for(var n in t){var s=t[n]
if("inside"===n)r(s).appendChild(i)
else if("around"===n){var o=r(s)
o.parentNode.insertBefore(i,o),i.appendChild(o)}else"styles"===n?"object"===(void 0===s?"undefined":Q(s))&&Object.keys(s).map((function(e){i.style[e]=s[e]})):n in i?i[n]=s:i.setAttribute(n,s)}return i}
var ee={margins:{top:10,bottom:10,left:20,right:20},paddings:{top:20,bottom:40,left:30,right:10},baseHeight:240,titleHeight:20,legendHeight:30,titleFontSize:12},te=["line","bar"],ie=["light-blue","blue","violet","red","orange","yellow","green","light-green","purple","magenta","light-grey","dark-grey"],re={bar:ie,line:ie,pie:ie,percentage:ie,heatmap:["#ebedf0","#c6e48b","#7bc96f","#239a3b","#196127"],donut:ie},ne=Math.PI/180,se=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),oe=function(){function e(t){var i=t.parent,r=void 0===i?null:i,n=t.colors,s=void 0===n?[]:n;(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.parent=r,this.colors=s,this.titleName="",this.titleValue="",this.listValues=[],this.titleValueFirst=0,this.x=0,this.y=0,this.top=0,this.left=0,this.setup()}return se(e,[{key:"setup",value:function(){this.makeTooltip()}},{key:"refresh",value:function(){this.fill(),this.calcPosition()}},{key:"makeTooltip",value:function(){var e=this
this.container=r.create("div",{inside:this.parent,className:"graph-svg-tip comparison",innerHTML:'<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>'}),this.hideTip(),this.title=this.container.querySelector(".title"),this.dataPointList=this.container.querySelector(".data-point-list"),this.parent.addEventListener("mouseleave",(function(){e.hideTip()}))}},{key:"fill",value:function(){var e,t=this
this.index&&this.container.setAttribute("data-point-index",this.index),e=this.titleValueFirst?"<strong>"+this.titleValue+"</strong>"+this.titleName:this.titleName+"<strong>"+this.titleValue+"</strong>",this.title.innerHTML=e,this.dataPointList.innerHTML="",this.listValues.map((function(e,i){var n=t.colors[i]||"black",s=0===e.formatted||e.formatted?e.formatted:e.value,o=r.create("li",{styles:{"border-top":"3px solid "+n},innerHTML:'<strong style="display: block;">'+(0===s||s?s:"")+"</strong>\n\t\t\t\t\t"+(e.title?e.title:"")})
t.dataPointList.appendChild(o)}))}},{key:"calcPosition",value:function(){var e=this.container.offsetWidth
this.top=this.y-this.container.offsetHeight-5,this.left=this.x-e/2
var t=this.parent.offsetWidth-e,i=this.container.querySelector(".svg-pointer")
if(this.left<0)i.style.left="calc(50% - "+-1*this.left+"px)",this.left=0
else if(this.left>t){var r="calc(50% + "+(this.left-t)+"px)"
i.style.left=r,this.left=t}else i.style.left="50%"}},{key:"setValues",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1
this.titleName=i.name,this.titleValue=i.value,this.listValues=r,this.x=e,this.y=t,this.titleValueFirst=i.valueFirst||0,this.index=n,this.refresh()}},{key:"hideTip",value:function(){this.container.style.top="0px",this.container.style.left="0px",this.container.style.opacity="0"}},{key:"showTip",value:function(){this.container.style.top=this.top+"px",this.container.style.left=this.left+"px",this.container.style.opacity="1"}}]),e}(),ae="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},le={"light-blue":"#7cd6fd",blue:"#5e64ff",violet:"#743ee2",red:"#ff5858",orange:"#ffa00a",yellow:"#feef72",green:"#28a745","light-green":"#98d85b",purple:"#b554ff",magenta:"#ffa3ef",black:"#36114C",grey:"#bdd3e6","light-grey":"#f0f4f7","dark-grey":"#b8c2cc"},ce=function(e){return/rgb[a]{0,1}\([\d, ]+\)/gim.test(e)?/\D+(\d*)\D+(\d*)\D+(\d*)/gim.exec(e).map((function(e,t){return 0!==t?Number(e).toString(16):"#"})).reduce((function(e,t){return""+e+t})):le[e]||e},ue="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},he=4,de=10,fe="#dadada",pe="#555b51",ye={bar:function(e){var t=void 0
"rect"!==e.nodeName&&(t=e.getAttribute("transform"),e=e.childNodes[0])
var i=e.cloneNode()
return i.style.fill="#000000",i.style.opacity="0.4",t&&i.setAttribute("transform",t),i},dot:function(e){var t=void 0
"circle"!==e.nodeName&&(t=e.getAttribute("transform"),e=e.childNodes[0])
var i=e.cloneNode(),r=e.getAttribute("r"),n=e.getAttribute("fill")
return i.setAttribute("r",parseInt(r)+4),i.setAttribute("fill",n),i.style.opacity="0.6",t&&i.setAttribute("transform",t),i},heat_square:function(e){var t=void 0
"circle"!==e.nodeName&&(t=e.getAttribute("transform"),e=e.childNodes[0])
var i=e.cloneNode(),r=e.getAttribute("r"),n=e.getAttribute("fill")
return i.setAttribute("r",parseInt(r)+4),i.setAttribute("fill",n),i.style.opacity="0.6",t&&i.setAttribute("transform",t),i}},ge={bar:function(e,t){var i=void 0
"rect"!==e.nodeName&&(i=e.getAttribute("transform"),e=e.childNodes[0])
var r=["x","y","width","height"]
Object.values(e.attributes).filter((function(e){return r.includes(e.name)&&e.specified})).map((function(e){t.setAttribute(e.name,e.nodeValue)})),i&&t.setAttribute("transform",i)},dot:function(e,t){var i=void 0
"circle"!==e.nodeName&&(i=e.getAttribute("transform"),e=e.childNodes[0])
var r=["cx","cy"]
Object.values(e.attributes).filter((function(e){return r.includes(e.name)&&e.specified})).map((function(e){t.setAttribute(e.name,e.nodeValue)})),i&&t.setAttribute("transform",i)},heat_square:function(e,t){var i=void 0
"circle"!==e.nodeName&&(i=e.getAttribute("transform"),e=e.childNodes[0])
var r=["cx","cy"]
Object.values(e.attributes).filter((function(e){return r.includes(e.name)&&e.specified})).map((function(e){t.setAttribute(e.name,e.nodeValue)})),i&&t.setAttribute("transform",i)}},me=350,ve=me,be="easein",_e=function(e,t){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e,t){var i=[],r=!0,n=!1,s=void 0
try{for(var o,a=e[Symbol.iterator]();!(r=(o=a.next()).done)&&(i.push(o.value),!t||i.length!==t);r=!0);}catch(e){n=!0,s=e}finally{try{!r&&a.return&&a.return()}finally{if(n)throw s}}return i}(e,t)
throw new TypeError("Invalid attempt to destructure non-iterable instance")},we={ease:"0.25 0.1 0.25 1",linear:"0 0 1 1",easein:"0.1 0.8 0.2 1",easeout:"0 0 0.58 1",easeinout:"0.42 0 0.58 1"},ke=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),Ae=function(){function e(t,i){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i=p(i),this.parent="string"==typeof t?document.querySelector(t):t,!(this.parent instanceof HTMLElement))throw new Error("No `parent` element to render on was provided.")
this.rawChartArgs=i,this.title=i.title||"",this.type=i.type||"",this.realData=this.prepareData(i.data),this.data=this.prepareFirstData(this.realData),this.colors=this.validateColors(i.colors,this.type),this.config={showTooltip:1,showLegend:1,isNavigable:i.isNavigable||0,animate:void 0!==i.animate?i.animate:1,truncateLegends:i.truncateLegends||1},this.measures=JSON.parse(JSON.stringify(ee))
var r=this.measures
this.setMeasures(i),this.title.length||(r.titleHeight=0),this.config.showLegend||(r.legendHeight=0),this.argHeight=i.height||r.baseHeight,this.state={},this.options={},this.initTimeout=700,this.config.isNavigable&&(this.overlays=[]),this.configure(i)}return ke(e,[{key:"prepareData",value:function(e){return e}},{key:"prepareFirstData",value:function(e){return e}},{key:"validateColors",value:function(e,t){var i=[]
return(e=(e||[]).concat(re[t])).forEach((function(e){var t=ce(e)
!function(e){return/(^\s*)(#)((?:[A-Fa-f0-9]{3}){1,2})$/i.test(e)||/(^\s*)(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/i.test(e)}(t)?console.warn('"'+e+'" is not a valid color.'):i.push(t)})),i}},{key:"setMeasures",value:function(){}},{key:"configure",value:function(){var e=this,t=this.argHeight
this.baseHeight=t,this.height=t-a(this.measures),this.boundDrawFn=function(){return e.draw(!0)},ResizeObserver&&(this.resizeObserver=new ResizeObserver(this.boundDrawFn),this.resizeObserver.observe(this.parent)),window.addEventListener("resize",this.boundDrawFn),window.addEventListener("orientationchange",this.boundDrawFn)}},{key:"destroy",value:function(){this.resizeObserver&&this.resizeObserver.disconnect(),window.removeEventListener("resize",this.boundDrawFn),window.removeEventListener("orientationchange",this.boundDrawFn)}},{key:"setup",value:function(){this.makeContainer(),this.updateWidth(),this.makeTooltip(),this.draw(!1,!0)}},{key:"makeContainer",value:function(){this.parent.innerHTML=""
var e={inside:this.parent,className:"chart-container"}
this.independentWidth&&(e.styles={width:this.independentWidth+"px"}),this.container=r.create("div",e)}},{key:"makeTooltip",value:function(){this.tip=new oe({parent:this.container,colors:this.colors}),this.bindTooltip()}},{key:"bindTooltip",value:function(){}},{key:"draw",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
t&&function(e){return null===e.offsetParent}(this.parent)||(this.updateWidth(),this.calc(t),this.makeChartArea(),this.setupComponents(),this.components.forEach((function(t){return t.setup(e.drawArea)})),this.render(this.components,!1),i&&(this.data=this.realData,setTimeout((function(){e.update(e.data)}),this.initTimeout)),this.renderLegend(),this.setupNavigation(i))}},{key:"calc",value:function(){}},{key:"updateWidth",value:function(){this.baseWidth=function(e){var t=window.getComputedStyle(e),i=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)
return e.clientWidth-i}(this.parent),this.width=this.baseWidth-l(this.measures)}},{key:"makeChartArea",value:function(){this.svg&&this.container.removeChild(this.svg)
var e=this.measures
this.svg=function(e,t,i,r){return k("svg",{className:"frappe-chart chart",inside:e,width:i,height:r})}(this.container,0,this.baseWidth,this.baseHeight),this.svgDefs=function(e){return k("defs",{inside:e})}(this.svg),this.title.length&&(this.titleEL=M("title",e.margins.left,e.margins.top,this.title,{fontSize:e.titleFontSize,fill:"#666666",dy:e.titleFontSize}))
var t=s(e)
this.drawArea=S(this.type+"-chart chart-draw-area","translate("+o(e)+", "+t+")"),this.config.showLegend&&(t+=this.height+e.paddings.bottom,this.legendArea=S("chart-legend","translate("+o(e)+", "+t+")")),this.title.length&&this.svg.appendChild(this.titleEL),this.svg.appendChild(this.drawArea),this.config.showLegend&&this.svg.appendChild(this.legendArea),this.updateTipOffset(o(e),s(e))}},{key:"updateTipOffset",value:function(e,t){this.tip.offset={x:e,y:t}}},{key:"setupComponents",value:function(){this.components=new Map}},{key:"update",value:function(e){e||console.error("No data to update."),this.data=this.prepareData(e),this.calc(),this.render(this.components,this.config.animate),this.renderLegend()}},{key:"render",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.components,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
this.config.isNavigable&&this.overlays.map((function(e){return e.parentNode.removeChild(e)}))
var r=[]
t.forEach((function(e){r=r.concat(e.update(i))})),r.length>0?(function(e,t,i){if(0!==i.length){var r=N(t,i)
t.parentNode==e&&(e.removeChild(t),e.appendChild(r)),setTimeout((function(){r.parentNode==e&&(e.removeChild(r),e.appendChild(t))}),250)}}(this.container,this.svg,r),setTimeout((function(){t.forEach((function(e){return e.make()})),e.updateNav()}),400)):(t.forEach((function(e){return e.make()})),this.updateNav())}},{key:"updateNav",value:function(){this.config.isNavigable&&(this.makeOverlay(),this.bindUnits())}},{key:"renderLegend",value:function(){}},{key:"setupNavigation",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
this.config.isNavigable&&t&&(this.bindOverlay(),this.keyActions={13:this.onEnterKey.bind(this),37:this.onLeftArrow.bind(this),38:this.onUpArrow.bind(this),39:this.onRightArrow.bind(this),40:this.onDownArrow.bind(this)},document.addEventListener("keydown",(function(t){(function(e){var t=e.getBoundingClientRect()
return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)})(e.container)&&(t=t||window.event,e.keyActions[t.keyCode]&&e.keyActions[t.keyCode]())})))}},{key:"makeOverlay",value:function(){}},{key:"updateOverlay",value:function(){}},{key:"bindOverlay",value:function(){}},{key:"bindUnits",value:function(){}},{key:"onLeftArrow",value:function(){}},{key:"onRightArrow",value:function(){}},{key:"onUpArrow",value:function(){}},{key:"onDownArrow",value:function(){}},{key:"onEnterKey",value:function(){}},{key:"addDataPoint",value:function(){}},{key:"removeDataPoint",value:function(){}},{key:"getDataPoint",value:function(){}},{key:"setCurrentDataPoint",value:function(){}},{key:"updateDataset",value:function(){}},{key:"export",value:function(){var e=function(e){var t=e.cloneNode(!0)
t.classList.add("chart-container"),t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink")
var i=r.create("style",{innerHTML:".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}"})
t.insertBefore(i,t.firstChild)
var n=r.create("div")
return n.appendChild(t),n.innerHTML}(this.svg)
!function(e,t){var i=document.createElement("a")
i.style="display: none"
var r=new Blob(t,{type:"image/svg+xml; charset=utf-8"}),n=window.URL.createObjectURL(r)
i.href=n,i.download=e,document.body.appendChild(i),i.click(),setTimeout((function(){document.body.removeChild(i),window.URL.revokeObjectURL(n)}),300)}(this.title||"Chart",[e])}}]),e}(),Se=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),Re=function e(t,i,r){null===t&&(t=Function.prototype)
var n=Object.getOwnPropertyDescriptor(t,i)
if(void 0===n){var s=Object.getPrototypeOf(t)
return null===s?void 0:e(s,i,r)}if("value"in n)return n.value
var o=n.get
return void 0!==o?o.call(r):void 0},xe=function(e){function t(e,i){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),Se(t,[{key:"configure",value:function(e){Re(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"configure",this).call(this,e),this.config.formatTooltipY=(e.tooltipOptions||{}).formatTooltipY,this.config.maxSlices=e.maxSlices||20,this.config.maxLegendPoints=e.maxLegendPoints||20}},{key:"calc",value:function(){var e=this,t=this.state,i=this.config.maxSlices
t.sliceTotals=[]
var r=this.data.labels.map((function(t,i){var r=0
return e.data.datasets.map((function(e){r+=e.values[i]})),[r,t]})).filter((function(e){return e[0]>=0})),n=r
if(r.length>i){r.sort((function(e,t){return t[0]-e[0]})),n=r.slice(0,i-1)
var s=0
r.slice(i-1).map((function(e){s+=e[0]})),n.push([s,"Rest"]),this.colors[i-1]="grey"}t.labels=[],n.map((function(e){t.sliceTotals.push(function(e){return Number(Math.round(e+"e4")+"e-4")}(e[0])),t.labels.push(e[1])})),t.grandTotal=t.sliceTotals.reduce((function(e,t){return e+t}),0),this.center={x:this.width/2,y:this.height/2}}},{key:"renderLegend",value:function(){var e=this,t=this.state
this.legendArea.textContent="",this.legendTotals=t.sliceTotals.slice(0,this.config.maxLegendPoints)
var i=0,r=0
this.legendTotals.map((function(n,s){var o=150,a=Math.floor((e.width-l(e.measures))/o)
e.legendTotals.length<a&&(o=e.width/e.legendTotals.length),i>a&&(i=0,r+=20)
var c=o*i+5,u=e.config.truncateLegends?m(t.labels[s],o/10):t.labels[s],h=e.config.formatTooltipY?e.config.formatTooltipY(n):n,d=function(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",n=arguments[4]
n=arguments.length>5&&void 0!==arguments[5]&&arguments[5]?m(n,15):n
var s={className:"legend-dot",cx:0,cy:0,r:i,fill:r},o=k("text",{className:"legend-dataset-text",x:0,y:0,dx:de+"px",dy:de/3+"px","font-size":1.2*de+"px","text-anchor":"start",fill:pe,innerHTML:n}),a=k("g",{transform:"translate("+e+", "+t+")"})
return a.appendChild(k("circle",s)),a.appendChild(o),a}(c,r,5,e.colors[s],u+": "+h,!1)
e.legendArea.appendChild(d),i++}))}}]),t}(Ae),Ce=7,Me=1e3,Ee=86400,Oe=["January","February","March","April","May","June","July","August","September","October","November","December"],Te=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Pe=function(e,t){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e,t){var i=[],r=!0,n=!1,s=void 0
try{for(var o,a=e[Symbol.iterator]();!(r=(o=a.next()).done)&&(i.push(o.value),!t||i.length!==t);r=!0);}catch(e){n=!0,s=e}finally{try{!r&&a.return&&a.return()}finally{if(n)throw s}}return i}(e,t)
throw new TypeError("Invalid attempt to destructure non-iterable instance")},De=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),je=function(){function e(t){var i=t.layerClass,r=void 0===i?"":i,n=t.layerTransform,s=void 0===n?"":n,o=t.constants,a=t.getData,l=t.makeElements,c=t.animateElements;(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.layerTransform=s,this.constants=o,this.makeElements=l,this.getData=a,this.animateElements=c,this.store=[],this.labels=[],this.layerClass=r,this.layerClass="function"==typeof this.layerClass?this.layerClass():this.layerClass,this.refresh()}return De(e,[{key:"refresh",value:function(e){this.data=e||this.getData()}},{key:"setup",value:function(e){this.layer=S(this.layerClass,this.layerTransform,e)}},{key:"make",value:function(){this.render(this.data),this.oldData=this.data}},{key:"render",value:function(e){var t=this
this.store=this.makeElements(e),this.layer.textContent="",this.store.forEach((function(e){t.layer.appendChild(e)})),this.labels.forEach((function(e){t.layer.appendChild(e)}))}},{key:"update",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0]
this.refresh()
var t=[]
return e&&(t=this.animateElements(this.data)||[]),t}}]),e}(),Ne={donutSlices:{layerClass:"donut-slices",makeElements:function(e){return e.sliceStrings.map((function(t,i){var r=R(t,"donut-path",e.colors[i],"none",e.strokeWidth)
return r.style.transition="transform .3s;",r}))},animateElements:function(e){return this.store.map((function(t,i){return P(t,e.sliceStrings[i])}))}},pieSlices:{layerClass:"pie-slices",makeElements:function(e){return e.sliceStrings.map((function(t,i){var r=R(t,"pie-path","none",e.colors[i])
return r.style.transition="transform .3s;",r}))},animateElements:function(e){return this.store.map((function(t,i){return P(t,e.sliceStrings[i])}))}},percentageBars:{layerClass:"percentage-bars",makeElements:function(e){var t=this
return e.xPositions.map((function(i,r){return function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:2,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"none"
return k("rect",{className:"percentage-bar",x:e,y:t,width:i,height:r,fill:s,styles:{stroke:_(s,-25),"stroke-dasharray":"0, "+(r+i)+", "+i+", "+r,"stroke-width":n}})}(i,0,e.widths[r],t.constants.barHeight,t.constants.barDepth,e.colors[r])}))},animateElements:function(e){if(e)return[]}},yAxis:{layerClass:"y axis",makeElements:function(e){var t=this
return e.positions.map((function(i,r){return function(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{}
f(e)||(e=0),r.pos||(r.pos="left"),r.offset||(r.offset=0),r.mode||(r.mode="span"),r.stroke||(r.stroke=fe),r.className||(r.className="")
var n=-6,s="span"===r.mode?i+6:0
return"tick"===r.mode&&"right"===r.pos&&(n=i+6,s=i),E(e,t,n+=r.offset,s+=r.offset,{stroke:r.stroke,className:r.className,lineType:r.lineType,shortenNumbers:r.shortenNumbers})}(i,e.labels[r],t.constants.width,{mode:t.constants.mode,pos:t.constants.pos,shortenNumbers:t.constants.shortenNumbers})}))},animateElements:function(e){var t=e.positions,i=e.labels,r=this.oldData.positions,n=this.oldData.labels,s=g(r,t),o=Pe(s,2)
r=o[0],t=o[1]
var a=g(n,i),l=Pe(a,2)
return n=l[0],i=l[1],this.render({positions:r,labels:i}),this.store.map((function(e,i){return T(e,t[i],r[i])}))}},xAxis:{layerClass:"x axis",makeElements:function(e){var t=this
return e.positions.map((function(i,r){return function(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{}
f(e)||(e=0),r.pos||(r.pos="bottom"),r.offset||(r.offset=0),r.mode||(r.mode="span"),r.stroke||(r.stroke=fe),r.className||(r.className="")
var n=i+6,s="span"===r.mode?-6:i
return"tick"===r.mode&&"top"===r.pos&&(n=-6,s=0),function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{}
n.stroke||(n.stroke=fe)
var s=k("line",{className:"line-vertical "+n.className,x1:0,x2:0,y1:i,y2:r,styles:{stroke:n.stroke}}),o=k("text",{x:0,y:i>r?i+he:i-he-de,dy:de+"px","font-size":de+"px","text-anchor":"middle",innerHTML:t+""}),a=k("g",{transform:"translate("+e+", 0)"})
return a.appendChild(s),a.appendChild(o),a}(e,t,n,s,{stroke:r.stroke,className:r.className,lineType:r.lineType})}(i,e.calcLabels[r],t.constants.height,{mode:t.constants.mode,pos:t.constants.pos})}))},animateElements:function(e){var t=e.positions,i=e.calcLabels,r=this.oldData.positions,n=this.oldData.calcLabels,s=g(r,t),o=Pe(s,2)
r=o[0],t=o[1]
var a=g(n,i),l=Pe(a,2)
return n=l[0],i=l[1],this.render({positions:r,calcLabels:i}),this.store.map((function(e,i){return function(e,t,i){return O(e,[i,0],[t,0],ve)}(e,t[i],r[i])}))}},yMarkers:{layerClass:"y-markers",makeElements:function(e){var t=this
return e.map((function(e){return function(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{}
r.labelPos||(r.labelPos="right")
var n=k("text",{className:"chart-label",x:"left"===r.labelPos?he:i-h(t,5)-he,y:0,dy:de/-2+"px","font-size":de+"px","text-anchor":"start",innerHTML:t+""}),s=E(e,"",0,i,{stroke:r.stroke||fe,className:r.className||"",lineType:r.lineType})
return s.appendChild(n),s}(e.position,e.label,t.constants.width,{labelPos:e.options.labelPos,mode:"span",lineType:"dashed"})}))},animateElements:function(e){var t=g(this.oldData,e),i=Pe(t,2)
this.oldData=i[0]
var r=(e=i[1]).map((function(e){return e.position})),n=e.map((function(e){return e.label})),s=e.map((function(e){return e.options})),o=this.oldData.map((function(e){return e.position}))
return this.render(o.map((function(e,t){return{position:o[t],label:n[t],options:s[t]}}))),this.store.map((function(e,t){return T(e,r[t],o[t])}))}},yRegions:{layerClass:"y-regions",makeElements:function(e){var t=this
return e.map((function(e){return function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=e-t,o=k("rect",{className:"bar mini",styles:{fill:"rgba(228, 234, 239, 0.49)",stroke:fe,"stroke-dasharray":i+", "+s},x:0,y:0,width:i,height:s})
n.labelPos||(n.labelPos="right")
var a=k("text",{className:"chart-label",x:"left"===n.labelPos?he:i-h(r+"",4.5)-he,y:0,dy:de/-2+"px","font-size":de+"px","text-anchor":"start",innerHTML:r+""}),l=k("g",{transform:"translate(0, "+t+")"})
return l.appendChild(o),l.appendChild(a),l}(e.startPos,e.endPos,t.constants.width,e.label,{labelPos:e.options.labelPos})}))},animateElements:function(e){var t=g(this.oldData,e),i=Pe(t,2)
this.oldData=i[0]
var r=(e=i[1]).map((function(e){return e.endPos})),n=e.map((function(e){return e.label})),s=e.map((function(e){return e.startPos})),o=e.map((function(e){return e.options})),a=this.oldData.map((function(e){return e.endPos})),l=this.oldData.map((function(e){return e.startPos}))
this.render(a.map((function(e,t){return{startPos:l[t],endPos:a[t],label:n[t],options:o[t]}})))
var c=[]
return this.store.map((function(e,t){c=c.concat(function(e,t,i,r){var n=t-i,s=e.childNodes[0]
return[[s,{height:n,"stroke-dasharray":s.getAttribute("width")+", "+n},ve,be],O(e,[0,r],[0,i],ve)]}(e,s[t],r[t],a[t]))})),c}},heatDomain:{layerClass:function(){return"heat-domain domain-"+this.constants.index},makeElements:function(e){var t=this,i=this.constants,r=i.index,n=i.colWidth,s=i.rowHeight,o=i.squareSize,a=i.radius,l=i.xTranslate,c=0
return this.serializedSubDomains=[],e.cols.map((function(e,i){1===i&&t.labels.push(M("domain-name",l,-12,z(r,!0).toUpperCase(),{fontSize:9})),e.map((function(e,i){if(e.fill){var r={"data-date":e.yyyyMmDd,"data-value":e.dataValue,"data-day":i},n=C("day",l,c,o,a,e.fill,r)
t.serializedSubDomains.push(n)}c+=s})),c=0,l+=n})),this.serializedSubDomains},animateElements:function(e){if(e)return[]}},barGraph:{layerClass:function(){return"dataset-units dataset-bars dataset-"+this.constants.index},makeElements:function(e){var t=this.constants
return this.unitType="bar",this.units=e.yPositions.map((function(i,r){return function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,a=arguments.length>7&&void 0!==arguments[7]?arguments[7]:{},l=function(e){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e){var t=[],i=!0,r=!1,n=void 0
try{for(var s,o=e[Symbol.iterator]();!(i=(s=o.next()).done)&&(t.push(s.value),2!==t.length);i=!0);}catch(e){r=!0,n=e}finally{try{!i&&o.return&&o.return()}finally{if(r)throw n}}return t}(e)
throw new TypeError("Invalid attempt to destructure non-iterable instance")}(y(t,a.zeroLine)),c=l[0],u=l[1]
u-=o,0===c&&(c=a.minHeight,u-=a.minHeight),f(e)||(e=0),f(u)||(u=0),f(c,!0)||(c=0),f(i,!0)||(i=0)
var h=k("rect",{className:"bar mini",style:"fill: "+r,"data-point-index":s,x:e,y:u,width:i,height:c})
if((n+="")||n.length){h.setAttribute("y",0),h.setAttribute("x",0)
var d=k("text",{className:"data-point-value",x:i/2,y:0,dy:de/2*-1+"px","font-size":de+"px","text-anchor":"middle",innerHTML:n}),p=k("g",{"data-point-index":s,transform:"translate("+e+", "+u+")"})
return p.appendChild(h),p.appendChild(d),p}return h}(e.xPositions[r],i,e.barWidth,t.color,e.labels[r],r,e.offsets[r],{zeroLine:e.zeroLine,barsWidth:e.barsWidth,minHeight:t.minHeight})})),this.units},animateElements:function(e){var t=e.xPositions,i=e.yPositions,r=e.offsets,n=e.labels,s=this.oldData.xPositions,o=this.oldData.yPositions,a=this.oldData.offsets,l=this.oldData.labels,c=g(s,t),u=Pe(c,2)
s=u[0],t=u[1]
var h=g(o,i),d=Pe(h,2)
o=d[0],i=d[1]
var f=g(a,r),p=Pe(f,2)
a=p[0],r=p[1]
var m=g(l,n),v=Pe(m,2)
l=v[0],n=v[1],this.render({xPositions:s,yPositions:o,offsets:a,labels:n,zeroLine:this.oldData.zeroLine,barsWidth:this.oldData.barsWidth,barWidth:this.oldData.barWidth})
var b=[]
return this.store.map((function(n,s){b=b.concat(function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,s=function(e){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e){var t=[],i=!0,r=!1,n=void 0
try{for(var s,o=e[Symbol.iterator]();!(i=(s=o.next()).done)&&(t.push(s.value),2!==t.length);i=!0);}catch(e){r=!0,n=e}finally{try{!i&&o.return&&o.return()}finally{if(r)throw n}}return t}(e)
throw new TypeError("Invalid attempt to destructure non-iterable instance")}(y(i,(arguments.length>5&&void 0!==arguments[5]?arguments[5]:{}).zeroLine)),o=s[0],a=s[1]
return a-=n,"rect"!==e.nodeName?[[e.childNodes[0],{width:r,height:o},me,be],O(e,e.getAttribute("transform").split("(")[1].slice(0,-1),[t,a],ve)]:[[e,{width:r,height:o,x:t,y:a},me,be]]}(n,t[s],i[s],e.barWidth,r[s],{zeroLine:e.zeroLine}))})),b}},lineGraph:{layerClass:function(){return"dataset-units dataset-line dataset-"+this.constants.index},makeElements:function(e){var t=this.constants
return this.unitType="dot",this.paths={},t.hideLine||(this.paths=function(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=t.map((function(t,i){return e[i]+","+t})).join("L")
r.spline&&(s=v(e,t))
var o=R("M"+s,"line-graph-path",i)
if(r.heatline){var a=x(n.svgDefs,i)
o.style.stroke="url(#"+a+")"}var l={path:o}
if(r.regionFill){var c=x(n.svgDefs,i,!0),u="M"+e[0]+","+n.zeroLine+"L"+s+"L"+e.slice(-1)[0]+","+n.zeroLine
l.region=R(u,"region-fill","none","url(#"+c+")")}return l}(e.xPositions,e.yPositions,t.color,{heatline:t.heatline,regionFill:t.regionFill,spline:t.spline},{svgDefs:t.svgDefs,zeroLine:e.zeroLine})),this.units=[],t.hideDots||(this.units=e.yPositions.map((function(i,r){return function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=k("circle",{style:"fill: "+r,"data-point-index":s,cx:e,cy:t,r:i})
if((n+="")||n.length){o.setAttribute("cy",0),o.setAttribute("cx",0)
var a=k("text",{className:"data-point-value",x:0,y:0,dy:de/2*-1-i+"px","font-size":de+"px","text-anchor":"middle",innerHTML:n}),l=k("g",{"data-point-index":s,transform:"translate("+e+", "+t+")"})
return l.appendChild(o),l.appendChild(a),l}return o}(e.xPositions[r],i,e.radius,t.color,t.valuesOverPoints?e.values[r]:"",r)}))),Object.values(this.paths).concat(this.units)},animateElements:function(e){var t=e.xPositions,i=e.yPositions,r=e.values,n=this.oldData.xPositions,s=this.oldData.yPositions,o=this.oldData.values,a=g(n,t),l=Pe(a,2)
n=l[0],t=l[1]
var c=g(s,i),u=Pe(c,2)
s=u[0],i=u[1]
var h=g(o,r),d=Pe(h,2)
o=d[0],r=d[1],this.render({xPositions:n,yPositions:s,values:r,zeroLine:this.oldData.zeroLine,radius:this.oldData.radius})
var f=[]
return Object.keys(this.paths).length&&(f=f.concat(function(e,t,i,r,n){var s=[],o=i.map((function(e,i){return t[i]+","+e})).join("L")
n&&(o=v(t,i))
var a=[e.path,{d:"M"+o},350,be]
if(s.push(a),e.region){var l=t[0]+","+r+"L",c="L"+t.slice(-1)[0]+", "+r,u=[e.region,{d:"M"+l+o+c},350,be]
s.push(u)}return s}(this.paths,t,i,e.zeroLine,this.constants.spline))),this.units.length&&this.units.map((function(e,r){f=f.concat(function(e,t,i){return"circle"!==e.nodeName?[O(e,e.getAttribute("transform").split("(")[1].slice(0,-1),[t,i],ve)]:[[e,{cx:t,cy:i},me,be]]}(e,t[r],i[r]))})),f}}},Fe=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),Le=function e(t,i,r){null===t&&(t=Function.prototype)
var n=Object.getOwnPropertyDescriptor(t,i)
if(void 0===n){var s=Object.getPrototypeOf(t)
return null===s?void 0:e(s,i,r)}if("value"in n)return n.value
var o=n.get
return void 0!==o?o.call(r):void 0},qe=function(e){function t(e,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))
return r.type="percentage",r.setup(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),Fe(t,[{key:"setMeasures",value:function(e){var t=this.measures
this.barOptions=e.barOptions||{}
var i=this.barOptions
i.height=i.height||20,i.depth=i.depth||2,t.paddings.right=30,t.legendHeight=60,t.baseHeight=8*(i.height+.5*i.depth)}},{key:"setupComponents",value:function(){var e=this.state,t=[["percentageBars",{barHeight:this.barOptions.height,barDepth:this.barOptions.depth},function(){return{xPositions:e.xPositions,widths:e.widths,colors:this.colors}}.bind(this)]]
this.components=new Map(t.map((function(e){var t=V.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}(e))
return[e[0],t]})))}},{key:"calc",value:function(){var e=this
Le(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"calc",this).call(this)
var i=this.state
i.xPositions=[],i.widths=[]
var r=0
i.sliceTotals.map((function(t){var n=e.width*t/i.grandTotal
i.widths.push(n),i.xPositions.push(r),r+=n}))}},{key:"makeDataByIndex",value:function(){}},{key:"bindTooltip",value:function(){var e=this,t=this.state
this.container.addEventListener("mousemove",(function(i){var r=e.components.get("percentageBars").store,s=i.target
if(r.includes(s)){var o=r.indexOf(s),a=n(e.container),l=n(s),c=l.left-a.left+parseInt(s.getAttribute("width"))/2,u=l.top-a.top,h=(e.formattedLabels&&e.formattedLabels.length>0?e.formattedLabels[o]:e.state.labels[o])+": ",d=t.sliceTotals[o]/t.grandTotal
e.tip.setValues(c,u,{name:h,value:(100*d).toFixed(1)+"%"}),e.tip.showTip()}}))}}]),t}(xe),$e=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),Ie=function e(t,i,r){null===t&&(t=Function.prototype)
var n=Object.getOwnPropertyDescriptor(t,i)
if(void 0===n){var s=Object.getPrototypeOf(t)
return null===s?void 0:e(s,i,r)}if("value"in n)return n.value
var o=n.get
return void 0!==o?o.call(r):void 0},ze=function(e){function t(e,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))
return r.type="pie",r.initTimeout=0,r.init=1,r.setup(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),$e(t,[{key:"configure",value:function(e){Ie(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"configure",this).call(this,e),this.mouseMove=this.mouseMove.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.hoverRadio=e.hoverRadio||.1,this.config.startAngle=e.startAngle||0,this.clockWise=e.clockWise||!1}},{key:"calc",value:function(){var e=this
Ie(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"calc",this).call(this)
var i=this.state
this.radius=this.height>this.width?this.center.x:this.center.y
var r=this.radius,n=this.clockWise,s=i.slicesProperties||[]
i.sliceStrings=[],i.slicesProperties=[]
var o=180-this.config.startAngle
i.sliceTotals.map((function(t,a){var l=o,c=t/i.grandTotal*360,u=c>180?1:0,h=n?-c:c,f=o+=h,p=d(l,r),y=d(f,r),g=e.init&&s[a],m=void 0,v=void 0
e.init?(m=g?g.startPosition:p,v=g?g.endPosition:p):(m=p,v=y)
var b=360===c?function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=i.x+e.x,a=i.y+e.y,l=i.x+t.x,c=2*i.y,u=i.y+t.y
return"M"+i.x+" "+i.y+"\n\t\tL"+o+" "+a+"\n\t\tA "+r+" "+r+" 0 "+s+" "+(n?1:0)+"\n\t\t"+l+" "+c+" z\n\t\tL"+o+" "+c+"\n\t\tA "+r+" "+r+" 0 "+s+" "+(n?1:0)+"\n\t\t"+l+" "+u+" z"}(m,v,e.center,e.radius,n,u):function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=i.x+e.x,a=i.y+e.y,l=i.x+t.x,c=i.y+t.y
return"M"+i.x+" "+i.y+"\n\t\tL"+o+" "+a+"\n\t\tA "+r+" "+r+" 0 "+s+" "+(n?1:0)+"\n\t\t"+l+" "+c+" z"}(m,v,e.center,e.radius,n,u)
i.sliceStrings.push(b),i.slicesProperties.push({startPosition:p,endPosition:y,value:t,total:i.grandTotal,startAngle:l,endAngle:f,angle:h})})),this.init=0}},{key:"setupComponents",value:function(){var e=this.state,t=[["pieSlices",{},function(){return{sliceStrings:e.sliceStrings,colors:this.colors}}.bind(this)]]
this.components=new Map(t.map((function(e){var t=V.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}(e))
return[e[0],t]})))}},{key:"calTranslateByAngle",value:function(e){var t=this.radius,i=this.hoverRadio,r=d(e.startAngle+e.angle/2,t)
return"translate3d("+r.x*i+"px,"+r.y*i+"px,0)"}},{key:"hoverSlice",value:function(e,t,i,r){if(e){var s=this.colors[t]
if(i){j(e,this.calTranslateByAngle(this.state.slicesProperties[t])),e.style.fill=_(s,50)
var o=n(this.svg),a=r.pageX-o.left+10,l=r.pageY-o.top-10,c=(this.formatted_labels&&this.formatted_labels.length>0?this.formatted_labels[t]:this.state.labels[t])+": ",u=(100*this.state.sliceTotals[t]/this.state.grandTotal).toFixed(1)
this.tip.setValues(a,l,{name:c,value:u+"%"}),this.tip.showTip()}else j(e,"translate3d(0,0,0)"),this.tip.hideTip(),e.style.fill=s}}},{key:"bindTooltip",value:function(){this.container.addEventListener("mousemove",this.mouseMove),this.container.addEventListener("mouseleave",this.mouseLeave)}},{key:"mouseMove",value:function(e){var t=e.target,i=this.components.get("pieSlices").store,r=this.curActiveSliceIndex,n=this.curActiveSlice
if(i.includes(t)){var s=i.indexOf(t)
this.hoverSlice(n,r,!1),this.curActiveSlice=t,this.curActiveSliceIndex=s,this.hoverSlice(t,s,!0,e)}else this.mouseLeave()}},{key:"mouseLeave",value:function(){this.hoverSlice(this.curActiveSlice,this.curActiveSliceIndex,!1)}}]),t}(xe),Be=function(e,t){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e,t){var i=[],r=!0,n=!1,s=void 0
try{for(var o,a=e[Symbol.iterator]();!(r=(o=a.next()).done)&&(i.push(o.value),!t||i.length!==t);r=!0);}catch(e){n=!0,s=e}finally{try{!r&&a.return&&a.return()}finally{if(n)throw s}}return i}(e,t)
throw new TypeError("Invalid attempt to destructure non-iterable instance")},He=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),Ue=function(e){function t(e,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))
r.type="heatmap",r.countLabel=i.countLabel||""
var n=["Sunday","Monday"],s=n.includes(i.startSubDomain)?i.startSubDomain:"Sunday"
return r.startSubDomainIndex=n.indexOf(s),r.setup(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),He(t,[{key:"setMeasures",value:function(e){var t=this.measures
this.discreteDomains=0===e.discreteDomains?0:1,t.paddings.top=36,t.paddings.bottom=0,t.legendHeight=24,t.baseHeight=12*Ce+a(t)
var i=this.data,r=this.discreteDomains?12:0
this.independentWidth=12*($(i.start,i.end)+r)+l(t)}},{key:"updateWidth",value:function(){var e=this.discreteDomains?12:0,t=this.state.noOfWeeks?this.state.noOfWeeks:52
this.baseWidth=12*(t+e)+l(this.measures)}},{key:"prepareData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data
if(e.start&&e.end&&e.start>e.end)throw new Error("Start date cannot be greater than end date.")
if(e.start||(e.start=new Date,e.start.setFullYear(e.start.getFullYear()-1)),e.end||(e.end=new Date),e.dataPoints=e.dataPoints||{},parseInt(Object.keys(e.dataPoints)[0])>1e5){var t={}
Object.keys(e.dataPoints).forEach((function(i){var r=new Date(i*Me)
t[L(r)]=e.dataPoints[i]})),e.dataPoints=t}return e}},{key:"calc",value:function(){var e=this.state
e.start=q(this.data.start),e.end=q(this.data.end),e.firstWeekStart=q(e.start),e.noOfWeeks=$(e.start,e.end),e.distribution=function(e){for(var t=Math.max.apply(Math,W(e)),i=[],r=0;r<5;r++){var n=t*(.25*r)
i.push(n)}return i}(Object.values(this.data.dataPoints)),e.domainConfigs=this.getDomains()}},{key:"setupComponents",value:function(){var e=this,t=this.state,i=this.discreteDomains?0:1,r=t.domainConfigs.map((function(r,n){return["heatDomain",{index:r.index,colWidth:12,rowHeight:12,squareSize:10,radius:e.rawChartArgs.radius||0,xTranslate:12*t.domainConfigs.filter((function(e,t){return t<n})).map((function(e){return e.cols.length-i})).reduce((function(e,t){return e+t}),0)},function(){return t.domainConfigs[n]}.bind(e)]}))
this.components=new Map(r.map((function(e,t){var i=V.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}(e))
return[e[0]+"-"+t,i]})))
var n=0
Te.forEach((function(t,i){if([1,3,5].includes(i)){var r=M("subdomain-name",-6,n,t,{fontSize:10,dy:8,textAnchor:"end"})
e.drawArea.appendChild(r)}n+=12}))}},{key:"update",value:function(e){e||console.error("No data to update."),this.data=this.prepareData(e),this.draw(),this.bindTooltip()}},{key:"bindTooltip",value:function(){var e=this
this.container.addEventListener("mousemove",(function(t){e.components.forEach((function(i){var r=i.store,n=t.target
if(r.includes(n)){var s=n.getAttribute("data-value"),o=n.getAttribute("data-date").split("-"),a=z(parseInt(o[1])-1,!0),l=e.container.getBoundingClientRect(),c=n.getBoundingClientRect(),u=parseInt(t.target.getAttribute("width")),h=c.left-l.left+u/2,d=c.top-l.top,f=s+" "+e.countLabel,p=" on "+a+" "+o[0]+", "+o[2]
e.tip.setValues(h,d,{name:p,value:f,valueFirst:1},[]),e.tip.showTip()}}))}))}},{key:"renderLegend",value:function(){var e=this
this.legendArea.textContent=""
var t=0,i=this.rawChartArgs.radius||0,r=M("subdomain-name",t,12,"Less",{fontSize:11,dy:9})
t=30,this.legendArea.appendChild(r),this.colors.slice(0,5).map((function(r,n){var s=C("heatmap-legend-unit",t+15*n,12,10,i,r)
e.legendArea.appendChild(s)}))
var n=M("subdomain-name",t+75+3,12,"More",{fontSize:11,dy:9})
this.legendArea.appendChild(n)}},{key:"getDomains",value:function(){for(var e=this.state,t=[e.start.getMonth(),e.start.getFullYear()],i=t[0],r=t[1],n=[e.end.getMonth(),e.end.getFullYear()],s=n[0]-i+1+12*(n[1]-r),o=[],a=q(e.start),l=0;l<s;l++){var c=e.end
if(!I(a,e.end)){var u=[a.getMonth(),a.getFullYear()]
c=B(u[0],u[1])}o.push(this.getDomainConfig(a,c)),U(c,1),a=c}return o}},{key:"getDomainConfig",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=[e.getMonth(),e.getFullYear()],r=i[0],n=i[1],s=H(e),o={index:r,cols:[]}
U(t=q(t)||B(r,n),1)
for(var a=$(s,t),l=[],c=void 0,u=0;u<a;u++)c=this.getCol(s,r),l.push(c),U(s=new Date(c[Ce-1].yyyyMmDd),1)
return void 0!==c[Ce-1].dataValue&&(U(s,1),l.push(this.getCol(s,r,!0))),o.cols=l,o}},{key:"getCol",value:function(e,t){for(var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.state,n=q(e),s=[],o=0;o<Ce;o++,U(n,1)){var a={},l=n>=r.start&&n<=r.end
i||n.getMonth()!==t||!l?a.yyyyMmDd=L(n):a=this.getSubDomainConfig(n),s.push(a)}return s}},{key:"getSubDomainConfig",value:function(e){var t=L(e),i=this.data.dataPoints[t]
return{yyyyMmDd:t,dataValue:i||0,fill:this.colors[X(i,this.state.distribution)]}}}]),t}(Ae),Ve=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),We=function e(t,i,r){null===t&&(t=Function.prototype)
var n=Object.getOwnPropertyDescriptor(t,i)
if(void 0===n){var s=Object.getPrototypeOf(t)
return null===s?void 0:e(s,i,r)}if("value"in n)return n.value
var o=n.get
return void 0!==o?o.call(r):void 0},Ye=function(e){function t(e,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))
return r.barOptions=i.barOptions||{},r.lineOptions=i.lineOptions||{},r.type=i.type||"line",r.init=1,r.setup(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),Ve(t,[{key:"setMeasures",value:function(){this.data.datasets.length<=1&&(this.config.showLegend=0,this.measures.paddings.bottom=30)}},{key:"configure",value:function(e){We(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"configure",this).call(this,e),e.axisOptions=e.axisOptions||{},e.tooltipOptions=e.tooltipOptions||{},this.config.xAxisMode=e.axisOptions.xAxisMode||"span",this.config.yAxisMode=e.axisOptions.yAxisMode||"span",this.config.xIsSeries=e.axisOptions.xIsSeries||0,this.config.shortenYAxisNumbers=e.axisOptions.shortenYAxisNumbers||0,this.config.formatTooltipX=e.tooltipOptions.formatTooltipX,this.config.formatTooltipY=e.tooltipOptions.formatTooltipY,this.config.valuesOverPoints=e.valuesOverPoints}},{key:"prepareData",value:function(){return function(e,t){e.labels=e.labels||[]
var i=e.labels.length,r=e.datasets,n=new Array(i).fill(0)
return r||(r=[{values:n}]),r.map((function(e){if(e.values){var r=e.values
r=(r=r.map((function(e){return isNaN(e)?0:e}))).length>i?r.slice(0,i):u(r,i-r.length,0),e.values=r}else e.values=n
e.chartType||(te.includes(t),e.chartType=t)})),e.yRegions&&e.yRegions.map((function(e){if(e.end<e.start){var t=[e.end,e.start]
e.start=t[0],e.end=t[1]}})),e}(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data,this.type)}},{key:"prepareFirstData",value:function(){return function(e){var t=e.labels.length,i=new Array(t).fill(0),r={labels:e.labels.slice(0,-1),datasets:e.datasets.map((function(e){return{name:"",values:i.slice(0,-1),chartType:e.chartType}}))}
return e.yMarkers&&(r.yMarkers=[{value:0,label:""}]),e.yRegions&&(r.yRegions=[{start:0,end:0,label:""}]),r}(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data)}},{key:"calc",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
this.calcXPositions(),e||this.calcYAxisParameters(this.getAllYValues(),"line"===this.type),this.makeDataByIndex()}},{key:"calcXPositions",value:function(){var e=this.state,t=this.data.labels
e.datasetLength=t.length,e.unitWidth=this.width/e.datasetLength,e.xOffset=e.unitWidth/2,e.xAxis={labels:t,positions:t.map((function(t,i){return c(e.xOffset+i*e.unitWidth)}))}}},{key:"calcYAxisParameters",value:function(e){var t=function(e){function t(e,t){for(var i=G(e),r=i[1]-i[0],n=0,s=1;n<t;s++)n+=r,i.unshift(-1*n)
return i}var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=Math.max.apply(Math,W(e)),n=Math.min.apply(Math,W(e)),s=[]
if(r>=0&&n>=0)Y(r)[1],s=i?G(r,n):G(r)
else if(r>0&&n<0){var o=Math.abs(n)
r>=o?(Y(r)[1],s=t(r,o)):(Y(o)[1],s=t(o,r).reverse().map((function(e){return-1*e})))}else if(r<=0&&n<=0){var a=Math.abs(n),l=Math.abs(r)
Y(a)[1],s=(s=i?G(a,l):G(a)).reverse().map((function(e){return-1*e}))}return s}(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"false"),i=this.height/function(e){return e[e.length-1]-e[0]}(t),r=K(t)*i,n=this.height-function(e){var t=K(e)
return e.indexOf(0)>=0?e.indexOf(0):e[0]>0?-1*e[0]/t:-1*e[e.length-1]/t+(e.length-1)}(t)*r
this.state.yAxis={labels:t,positions:t.map((function(e){return n-e*i})),scaleMultiplier:i,zeroLine:n},this.calcDatasetPoints(),this.calcYExtremes(),this.calcYRegions()}},{key:"calcDatasetPoints",value:function(){var e=this.state,t=function(t){return t.map((function(t){return J(t,e.yAxis)}))}
e.datasets=this.data.datasets.map((function(e,i){var r=e.values,n=e.cumulativeYs||[]
return{name:e.name&&e.name.replace(/<|>|&/g,(function(e){return"&"==e?"&amp;":"<"==e?"&lt;":"&gt;"})),index:i,chartType:e.chartType,values:r,yPositions:t(r),cumulativeYs:n,cumulativeYPos:t(n)}}))}},{key:"calcYExtremes",value:function(){var e=this.state
this.barOptions.stacked?e.yExtremes=e.datasets[e.datasets.length-1].cumulativeYPos:(e.yExtremes=new Array(e.datasetLength).fill(9999),e.datasets.map((function(t){t.yPositions.map((function(t,i){t<e.yExtremes[i]&&(e.yExtremes[i]=t)}))})))}},{key:"calcYRegions",value:function(){var e=this.state
this.data.yMarkers&&(this.state.yMarkers=this.data.yMarkers.map((function(t){return t.position=J(t.value,e.yAxis),t.options||(t.options={}),t}))),this.data.yRegions&&(this.state.yRegions=this.data.yRegions.map((function(t){return t.startPos=J(t.start,e.yAxis),t.endPos=J(t.end,e.yAxis),t.options||(t.options={}),t})))}},{key:"getAllYValues",value:function(){var e,t=this,i="values"
if(this.barOptions.stacked){i="cumulativeYs"
var r=new Array(this.state.datasetLength).fill(0)
this.data.datasets.map((function(e,n){var s=t.data.datasets[n].values
e[i]=r=r.map((function(e,t){return e+s[t]}))}))}var n=this.data.datasets.map((function(e){return e[i]}))
return this.data.yMarkers&&n.push(this.data.yMarkers.map((function(e){return e.value}))),this.data.yRegions&&this.data.yRegions.map((function(e){n.push([e.end,e.start])})),(e=[]).concat.apply(e,Z(n))}},{key:"setupComponents",value:function(){var e=this,t=[["yAxis",{mode:this.config.yAxisMode,width:this.width,shortenNumbers:this.config.shortenYAxisNumbers},function(){return this.state.yAxis}.bind(this)],["xAxis",{mode:this.config.xAxisMode,height:this.height},function(){var e=this.state
return e.xAxis.calcLabels=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=e/t.length
r<=0&&(r=1)
var n=r/7,s=void 0
if(i){var o=Math.max.apply(Math,function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}(t.map((function(e){return e.length}))))
s=Math.ceil(o/n)}return t.map((function(e,t){return(e+="").length>n&&(i?t%s!=0&&(e=""):e=n-3>0?e.slice(0,n-3)+" ...":e.slice(0,n)+".."),e}))}(this.width,e.xAxis.labels,this.config.xIsSeries),e.xAxis}.bind(this)],["yRegions",{width:this.width,pos:"right"},function(){return this.state.yRegions}.bind(this)]],i=this.state.datasets.filter((function(e){return"bar"===e.chartType})),r=this.state.datasets.filter((function(e){return"line"===e.chartType})),n=i.map((function(t){var r=t.index
return["barGraph-"+t.index,{index:r,color:e.colors[r],stacked:e.barOptions.stacked,valuesOverPoints:e.config.valuesOverPoints,minHeight:0*e.height},function(){var e=this.state,t=e.datasets[r],n=this.barOptions.stacked,s=this.barOptions.spaceRatio||.5,o=e.unitWidth*(1-s),a=o/(n?1:i.length),l=e.xAxis.positions.map((function(e){return e-o/2}))
n||(l=l.map((function(e){return e+a*r})))
var c=new Array(e.datasetLength).fill("")
this.config.valuesOverPoints&&(c=n&&t.index===e.datasets.length-1?t.cumulativeYs:t.values)
var u=new Array(e.datasetLength).fill(0)
return n&&(u=t.yPositions.map((function(e,i){return e-t.cumulativeYPos[i]}))),{xPositions:l,yPositions:t.yPositions,offsets:u,labels:c,zeroLine:e.yAxis.zeroLine,barsWidth:o,barWidth:a}}.bind(e)]})),s=r.map((function(t){var i=t.index
return["lineGraph-"+t.index,{index:i,color:e.colors[i],svgDefs:e.svgDefs,heatline:e.lineOptions.heatline,regionFill:e.lineOptions.regionFill,spline:e.lineOptions.spline,hideDots:e.lineOptions.hideDots,hideLine:e.lineOptions.hideLine,valuesOverPoints:e.config.valuesOverPoints},function(){var e=this.state,t=e.datasets[i],r=e.yAxis.positions[0]<e.yAxis.zeroLine?e.yAxis.positions[0]:e.yAxis.zeroLine
return{xPositions:e.xAxis.positions,yPositions:t.yPositions,values:t.values,zeroLine:r,radius:this.lineOptions.dotSize||4}}.bind(e)]})),o=[["yMarkers",{width:this.width,pos:"right"},function(){return this.state.yMarkers}.bind(this)]]
t=t.concat(n,s,o)
var a=["yMarkers","yRegions"]
this.dataUnitComponents=[],this.components=new Map(t.filter((function(t){return!a.includes(t[0])||e.state[t[0]]})).map((function(t){var i=V.apply(void 0,Z(t))
return(t[0].includes("lineGraph")||t[0].includes("barGraph"))&&e.dataUnitComponents.push(i),[t[0],i]})))}},{key:"makeDataByIndex",value:function(){var e=this
this.dataByIndex={}
var t=this.state,i=this.config.formatTooltipX,r=this.config.formatTooltipY
t.xAxis.labels.map((function(n,s){var o=e.state.datasets.map((function(t,i){var n=t.values[s]
return{title:t.name,value:n,yPos:t.yPositions[s],color:e.colors[i],formatted:r?r(n):n}}))
e.dataByIndex[s]={label:n,formattedLabel:i?i(n):n,xPos:t.xAxis.positions[s],values:o,yExtreme:t.yExtremes[s]}}))}},{key:"bindTooltip",value:function(){var e=this
this.container.addEventListener("mousemove",(function(t){var i=e.measures,r=n(e.container),a=t.pageX-r.left-o(i),l=t.pageY-r.top
l<e.height+s(i)&&l>s(i)?e.mapTooltipXPosition(a):e.tip.hideTip()}))}},{key:"mapTooltipXPosition",value:function(e){var t=this.state
if(t.yExtremes){var i=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=t.reduce((function(t,i){return Math.abs(i-e)<Math.abs(t-e)?i:t}),[])
return i?t.indexOf(r):r}(e,t.xAxis.positions,!0)
if(i>=0){var r=this.dataByIndex[i]
this.tip.setValues(r.xPos+this.tip.offset.x,r.yExtreme+this.tip.offset.y,{name:r.formattedLabel,value:""},r.values,i),this.tip.showTip()}}}},{key:"renderLegend",value:function(){var e=this,t=this.data
t.datasets.length>1&&(this.legendArea.textContent="",t.datasets.map((function(t,i){var r=function(e,t,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",n=arguments[4]
n=arguments.length>5&&void 0!==arguments[5]&&arguments[5]?m(n,15):n
var s={className:"legend-bar",x:0,y:0,width:i,height:"2px",fill:r},o=k("text",{className:"legend-dataset-text",x:0,y:0,dy:2*de+"px","font-size":1.2*de+"px","text-anchor":"start",fill:pe,innerHTML:n}),a=k("g",{transform:"translate("+e+", "+t+")"})
return a.appendChild(k("rect",s)),a.appendChild(o),a}(100*i,"0",100,e.colors[i],t.name,e.config.truncateLegends)
e.legendArea.appendChild(r)})))}},{key:"makeOverlay",value:function(){var e=this
this.init?this.init=0:(this.overlayGuides&&this.overlayGuides.forEach((function(e){var t=e.overlay
t.parentNode.removeChild(t)})),this.overlayGuides=this.dataUnitComponents.map((function(e){return{type:e.unitType,overlay:void 0,units:e.units}})),void 0===this.state.currentIndex&&(this.state.currentIndex=this.state.datasetLength-1),this.overlayGuides.map((function(t){var i=t.units[e.state.currentIndex]
t.overlay=ye[t.type](i),e.drawArea.appendChild(t.overlay)})))}},{key:"updateOverlayGuides",value:function(){this.overlayGuides&&this.overlayGuides.forEach((function(e){var t=e.overlay
t.parentNode.removeChild(t)}))}},{key:"bindOverlay",value:function(){var e=this
this.parent.addEventListener("data-select",(function(){e.updateOverlay()}))}},{key:"bindUnits",value:function(){var e=this
this.dataUnitComponents.map((function(t){t.units.map((function(t){t.addEventListener("click",(function(){var i=t.getAttribute("data-point-index")
e.setCurrentDataPoint(i)}))}))})),this.tip.container.addEventListener("click",(function(){var t=e.tip.container.getAttribute("data-point-index")
e.setCurrentDataPoint(t)}))}},{key:"updateOverlay",value:function(){var e=this
this.overlayGuides.map((function(t){var i=t.units[e.state.currentIndex]
ge[t.type](i,t.overlay)}))}},{key:"onLeftArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex-1)}},{key:"onRightArrow",value:function(){this.setCurrentDataPoint(this.state.currentIndex+1)}},{key:"getDataPoint",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.currentIndex,t=this.state
return{index:e,label:t.xAxis.labels[e],values:t.datasets.map((function(t){return t.values[e]}))}}},{key:"setCurrentDataPoint",value:function(e){var t=this.state;(e=parseInt(e))<0&&(e=0),e>=t.xAxis.labels.length&&(e=t.xAxis.labels.length-1),e!==t.currentIndex&&(t.currentIndex=e,function(e,t,i){var r=document.createEvent("HTMLEvents")
for(var n in r.initEvent("data-select",!0,!0),i)r[n]=i[n]
e.dispatchEvent(r)}(this.parent,0,this.getDataPoint()))}},{key:"addDataPoint",value:function(e,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.state.datasetLength
We(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"addDataPoint",this).call(this,e,i,r),this.data.labels.splice(r,0,e),this.data.datasets.map((function(e,t){e.values.splice(r,0,i[t])})),this.update(this.data)}},{key:"removeDataPoint",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.datasetLength-1
this.data.labels.length<=1||(We(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"removeDataPoint",this).call(this,e),this.data.labels.splice(e,1),this.data.datasets.map((function(t){t.values.splice(e,1)})),this.update(this.data))}},{key:"updateDataset",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
this.data.datasets[t].values=e,this.update(this.data)}},{key:"updateDatasets",value:function(e){this.data.datasets.map((function(t,i){e[i]&&(t.values=e[i])})),this.update(this.data)}}]),t}(Ae),Ge=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),Ke=function e(t,i,r){null===t&&(t=Function.prototype)
var n=Object.getOwnPropertyDescriptor(t,i)
if(void 0===n){var s=Object.getPrototypeOf(t)
return null===s?void 0:e(s,i,r)}if("value"in n)return n.value
var o=n.get
return void 0!==o?o.call(r):void 0},Je=function(e){function t(e,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)
var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))
return r.type="donut",r.initTimeout=0,r.init=1,r.setup(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),Ge(t,[{key:"configure",value:function(e){Ke(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"configure",this).call(this,e),this.mouseMove=this.mouseMove.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.hoverRadio=e.hoverRadio||.1,this.config.startAngle=e.startAngle||0,this.clockWise=e.clockWise||!1,this.strokeWidth=e.strokeWidth||30}},{key:"calc",value:function(){var e=this
Ke(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"calc",this).call(this)
var i=this.state
this.radius=this.height>this.width?this.center.x-this.strokeWidth/2:this.center.y-this.strokeWidth/2
var r=this.radius,n=this.clockWise,s=i.slicesProperties||[]
i.sliceStrings=[],i.slicesProperties=[]
var o=180-this.config.startAngle
i.sliceTotals.map((function(t,a){var l=o,c=t/i.grandTotal*360,u=c>180?1:0,h=n?-c:c,f=o+=h,p=d(l,r),y=d(f,r),g=e.init&&s[a],m=void 0,v=void 0
e.init?(m=g?g.startPosition:p,v=g?g.endPosition:p):(m=p,v=y)
var b=360===c?function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,o=i.x+e.x,a=i.y+e.y,l=i.x+t.x,c=2*r+a
return"M"+o+" "+a+"\n\t\tA "+r+" "+r+" 0 "+s+" "+(n?1:0)+"\n\t\t"+l+" "+c+"\n\t\tM"+o+" "+c+"\n\t\tA "+r+" "+r+" 0 "+s+" "+(n?1:0)+"\n\t\t"+l+" "+(i.y+e.y)}(m,v,e.center,e.radius,e.clockWise,u):function(e,t,i,r){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0
return"M"+(i.x+e.x)+" "+(i.y+e.y)+"\n\t\tA "+r+" "+r+" 0 "+s+" "+(n?1:0)+"\n\t\t"+(i.x+t.x)+" "+(i.y+t.y)}(m,v,e.center,e.radius,e.clockWise,u)
i.sliceStrings.push(b),i.slicesProperties.push({startPosition:p,endPosition:y,value:t,total:i.grandTotal,startAngle:l,endAngle:f,angle:h})})),this.init=0}},{key:"setupComponents",value:function(){var e=this.state,t=[["donutSlices",{},function(){return{sliceStrings:e.sliceStrings,colors:this.colors,strokeWidth:this.strokeWidth}}.bind(this)]]
this.components=new Map(t.map((function(e){var t=V.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t]
return i}return Array.from(e)}(e))
return[e[0],t]})))}},{key:"calTranslateByAngle",value:function(e){var t=this.radius,i=this.hoverRadio,r=d(e.startAngle+e.angle/2,t)
return"translate3d("+r.x*i+"px,"+r.y*i+"px,0)"}},{key:"hoverSlice",value:function(e,t,i,r){if(e){var s=this.colors[t]
if(i){j(e,this.calTranslateByAngle(this.state.slicesProperties[t])),e.style.stroke=_(s,50)
var o=n(this.svg),a=r.pageX-o.left+10,l=r.pageY-o.top-10,c=(this.formatted_labels&&this.formatted_labels.length>0?this.formatted_labels[t]:this.state.labels[t])+": ",u=(100*this.state.sliceTotals[t]/this.state.grandTotal).toFixed(1)
this.tip.setValues(a,l,{name:c,value:u+"%"}),this.tip.showTip()}else j(e,"translate3d(0,0,0)"),this.tip.hideTip(),e.style.stroke=s}}},{key:"bindTooltip",value:function(){this.container.addEventListener("mousemove",this.mouseMove),this.container.addEventListener("mouseleave",this.mouseLeave)}},{key:"mouseMove",value:function(e){var t=e.target,i=this.components.get("donutSlices").store,r=this.curActiveSliceIndex,n=this.curActiveSlice
if(i.includes(t)){var s=i.indexOf(t)
this.hoverSlice(n,r,!1),this.curActiveSlice=t,this.curActiveSliceIndex=s,this.hoverSlice(t,s,!0,e)}else this.mouseLeave()}},{key:"mouseLeave",value:function(){this.hoverSlice(this.curActiveSlice,this.curActiveSliceIndex,!1)}}]),t}(xe),Xe={bar:Ye,line:Ye,percentage:qe,heatmap:Ue,pie:ze,donut:Je},Ze=function e(t,i){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"line",t=arguments[1],i=arguments[2]
return"axis-mixed"===e?(i.type="line",new Ye(t,i)):Xe[e]?new Xe[e](t,i):void console.error("Undefined chart type: "+e)}(i.type,t,i)}}}])
