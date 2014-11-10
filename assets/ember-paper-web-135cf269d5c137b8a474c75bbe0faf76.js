define("ember-paper-web/app",["ember","ember/resolver","ember/load-initializers","ember-paper-web/config/environment","exports"],function(e,t,a,s,n){"use strict";var r=e["default"],p=t["default"],o=a["default"],l=s["default"];r.MODEL_FACTORY_INJECTIONS=!0;var i=r.Application.extend({modulePrefix:l.modulePrefix,podModulePrefix:l.podModulePrefix,Resolver:p});o(i,l.modulePrefix),n["default"]=i}),define("ember-paper-web/components/base-focusable",["ember-paper/components/base-focusable","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/components/paper-button",["ember-paper/components/paper-button","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/components/paper-checkbox",["ember-paper/components/paper-checkbox","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/components/paper-content",["ember-paper/components/paper-content","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/components/paper-drawer",["ember-paper/components/paper-drawer","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/components/paper-radio",["ember-paper/components/paper-radio","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/components/paper-sidenav",["ember-paper/components/paper-sidenav","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/components/paper-toggle",["ember-paper/components/paper-toggle","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a}),define("ember-paper-web/controllers/checkbox",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Controller.extend({value1:!0,value2:!1})}),define("ember-paper-web/initializers/export-application-global",["ember","ember-paper-web/config/environment","exports"],function(e,t,a){"use strict";function s(e,t){var a=n.String.classify(r.modulePrefix);r.exportApplicationGlobal&&(window[a]=t)}var n=e["default"],r=t["default"];a.initialize=s,a["default"]={name:"export-application-global",initialize:s}}),define("ember-paper-web/router",["ember","ember-paper-web/config/environment","exports"],function(e,t,a){"use strict";var s=e["default"],n=t["default"],r=s.Router.extend({location:n.locationType});r.map(function(){this.route("introduction"),this.route("button"),this.route("checkbox"),this.route("radio"),this.route("toggle"),this.route("typography"),this.route("lists"),this.route("navigation")}),a["default"]=r}),define("ember-paper-web/routes/application",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Route.extend({actions:{raisedButton:function(){alert("You pressed a raised button.")},flatButton:function(){alert("You pressed a flat button.")}}})}),define("ember-paper-web/templates/application",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n,r,p="";return t.buffer.push("\n  "),r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(2,o,t),contexts:[],types:[],data:t},(n=s["paper-drawer"])?a=n.call(e,r):(n=e&&e["paper-drawer"],a=typeof n===w?n.call(e,r):n),s["paper-drawer"]||(a=I.call(e,"paper-drawer",{hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(2,o,t),contexts:[],types:[],data:t})),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n  "),r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(19,m,t),contexts:[],types:[],data:t},(n=s["paper-content"])?a=n.call(e,r):(n=e&&e["paper-content"],a=typeof n===w?n.call(e,r):n),s["paper-content"]||(a=I.call(e,"paper-content",{hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(19,m,t),contexts:[],types:[],data:t})),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n"),p}function o(e,t){var a,n,r,p="";return t.buffer.push('\n    <h1 class="logo"><img src="ember-logo-2459d8249860e287c483e2d6891f8276.png" height="30"/>&nbsp;&nbsp;<strong>Paper</strong></h1>\n    <nav class="sidenav-nav">\n      <ul>\n      <li>'),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(3,l,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"index",r):T.call(e,"link-to","index",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n        <li>"),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(5,i,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"typography",r):T.call(e,"link-to","typography",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n        <li>"),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(7,h,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"lists",r):T.call(e,"link-to","lists",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n        <li>"),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(9,u,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"button",r):T.call(e,"link-to","button",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n        <li>"),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(11,c,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"checkbox",r):T.call(e,"link-to","checkbox",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n        <li>"),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(13,d,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"toggle",r):T.call(e,"link-to","toggle",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n        <li>"),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(15,f,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"radio",r):T.call(e,"link-to","radio",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n        <li>"),n=s["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(17,b,t),contexts:[e],types:["STRING"],data:t},a=n?n.call(e,"navigation",r):T.call(e,"link-to","navigation",r),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n      </ul>\n    </nav>\n  "),p}function l(e,t){t.buffer.push("Introduction")}function i(e,t){t.buffer.push("Typography")}function h(e,t){t.buffer.push("Lists")}function u(e,t){t.buffer.push("Button")}function c(e,t){t.buffer.push("Checkbox")}function d(e,t){t.buffer.push("Toggle")}function f(e,t){t.buffer.push("Radio")}function b(e,t){t.buffer.push("Navigation")}function m(e,t){var a,n="";return t.buffer.push("\n    "),a=s._triageMustache.call(e,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n  "),n}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var g,x,v,y="",k=this,T=s.helperMissing,w="function",I=s.blockHelperMissing;return v={hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(1,p,r),contexts:[],types:[],data:r},(x=s["paper-sidenav"])?g=x.call(t,v):(x=t&&t["paper-sidenav"],g=typeof x===w?x.call(t,v):x),s["paper-sidenav"]||(g=I.call(t,"paper-sidenav",{hash:{},hashTypes:{},hashContexts:{},inverse:k.noop,fn:k.program(1,p,r),contexts:[],types:[],data:r})),(g||0===g)&&r.buffer.push(g),r.buffer.push('\n<!-- Place this tag right after the last button or just before your close body tag. -->\n<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>'),y})}),define("ember-paper-web/templates/button",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){t.buffer.push("Button")}function o(e,t){t.buffer.push("Primary (noink)")}function l(e,t){t.buffer.push("disabled")}function i(e,t){t.buffer.push("warn")}function h(e,t){t.buffer.push("Primary")}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var u,c,d,f="",b=this,m="function",g=s.blockHelperMissing,x=s.helperMissing;return r.buffer.push("<h3>Buttons</h3>\n<p>\n  "),d={hash:{},hashTypes:{},hashContexts:{},inverse:b.noop,fn:b.program(1,p,r),contexts:[],types:[],data:r},(c=s["paper-button"])?u=c.call(t,d):(c=t&&t["paper-button"],u=typeof c===m?c.call(t,d):c),s["paper-button"]||(u=g.call(t,"paper-button",{hash:{},hashTypes:{},hashContexts:{},inverse:b.noop,fn:b.program(1,p,r),contexts:[],types:[],data:r})),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  "),c=s["paper-button"]||t&&t["paper-button"],d={hash:{noink:!0,classNames:"paper-primary"},hashTypes:{noink:"BOOLEAN",classNames:"STRING"},hashContexts:{noink:t,classNames:t},inverse:b.noop,fn:b.program(3,o,r),contexts:[],types:[],data:r},u=c?c.call(t,d):x.call(t,"paper-button",d),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  "),c=s["paper-button"]||t&&t["paper-button"],d={hash:{disabled:!0},hashTypes:{disabled:"BOOLEAN"},hashContexts:{disabled:t},inverse:b.noop,fn:b.program(5,l,r),contexts:[],types:[],data:r},u=c?c.call(t,d):x.call(t,"paper-button",d),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  "),c=s["paper-button"]||t&&t["paper-button"],d={hash:{classNames:"paper-warn"},hashTypes:{classNames:"STRING"},hashContexts:{classNames:t},inverse:b.noop,fn:b.program(7,i,r),contexts:[],types:[],data:r},u=c?c.call(t,d):x.call(t,"paper-button",d),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n</p>\n<p>\n  "),c=s["paper-button"]||t&&t["paper-button"],d={hash:{raised:!0},hashTypes:{raised:"BOOLEAN"},hashContexts:{raised:t},inverse:b.noop,fn:b.program(1,p,r),contexts:[],types:[],data:r},u=c?c.call(t,d):x.call(t,"paper-button",d),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  "),c=s["paper-button"]||t&&t["paper-button"],d={hash:{raised:!0,classNames:"paper-primary"},hashTypes:{raised:"BOOLEAN",classNames:"STRING"},hashContexts:{raised:t,classNames:t},inverse:b.noop,fn:b.program(9,h,r),contexts:[],types:[],data:r},u=c?c.call(t,d):x.call(t,"paper-button",d),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  "),c=s["paper-button"]||t&&t["paper-button"],d={hash:{raised:!0,disabled:!0},hashTypes:{raised:"BOOLEAN",disabled:"BOOLEAN"},hashContexts:{raised:t,disabled:t},inverse:b.noop,fn:b.program(5,l,r),contexts:[],types:[],data:r},u=c?c.call(t,d):x.call(t,"paper-button",d),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  "),c=s["paper-button"]||t&&t["paper-button"],d={hash:{raised:!0,classNames:"paper-warn"},hashTypes:{raised:"BOOLEAN",classNames:"STRING"},hashContexts:{raised:t,classNames:t},inverse:b.noop,fn:b.program(7,i,r),contexts:[],types:[],data:r},u=c?c.call(t,d):x.call(t,"paper-button",d),(u||0===u)&&r.buffer.push(u),r.buffer.push('\n</p>\n<h3>Template</h3>\n<pre>\n&lt;p&gt;\n  {{#paper-button}}Button{{/paper-button}}\n  {{#paper-button noink=true classNames="paper-primary"}}Primary (noink){{/paper-button}}\n  {{#paper-button disabled=true}}disabled{{/paper-button}}\n  {{#paper-button classNames="paper-warn"}}warn{{/paper-button}}\n&lt;/p&gt;\n&lt;p&gt;\n  {{#paper-button raised=true}}Button{{/paper-button}}\n  {{#paper-button raised=true classNames="paper-primary"}}Primary{{/paper-button}}\n  {{#paper-button raised=true disabled=true}}disabled{{/paper-button}}\n  {{#paper-button raised=true classNames="paper-warn"}}warn{{/paper-button}}\n&lt;/p&gt;\n</pre>\n'),f})}),define("ember-paper-web/templates/checkbox",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n="";return t.buffer.push("A checkbox: "),a=s._triageMustache.call(e,"value1",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),n}function o(e,t){var a,n="";return t.buffer.push("A checkbox: "),a=s["if"].call(e,"value2",{hash:{},hashTypes:{},hashContexts:{},inverse:g.program(6,i,t),fn:g.program(4,l,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),n}function l(e,t){t.buffer.push("yep")}function i(e,t){t.buffer.push("nope")}function h(e,t){t.buffer.push("Checkbox (disabled)")}function u(e,t){t.buffer.push("Checkbox (disabled and checked)")}function c(e,t){t.buffer.push("Checkbox (no ink)")}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var d,f,b,m="",g=this,x=s.helperMissing;return r.buffer.push("<h3>Checkboxes</h3>\n"),f=s["paper-checkbox"]||t&&t["paper-checkbox"],b={hash:{checked:"value1"},hashTypes:{checked:"ID"},hashContexts:{checked:t},inverse:g.noop,fn:g.program(1,p,r),contexts:[],types:[],data:r},d=f?f.call(t,b):x.call(t,"paper-checkbox",b),(d||0===d)&&r.buffer.push(d),r.buffer.push("\n"),f=s["paper-checkbox"]||t&&t["paper-checkbox"],b={hash:{checked:"value2"},hashTypes:{checked:"ID"},hashContexts:{checked:t},inverse:g.noop,fn:g.program(3,o,r),contexts:[],types:[],data:r},d=f?f.call(t,b):x.call(t,"paper-checkbox",b),(d||0===d)&&r.buffer.push(d),r.buffer.push("\n"),f=s["paper-checkbox"]||t&&t["paper-checkbox"],b={hash:{disabled:!0},hashTypes:{disabled:"BOOLEAN"},hashContexts:{disabled:t},inverse:g.noop,fn:g.program(8,h,r),contexts:[],types:[],data:r},d=f?f.call(t,b):x.call(t,"paper-checkbox",b),(d||0===d)&&r.buffer.push(d),r.buffer.push("\n"),f=s["paper-checkbox"]||t&&t["paper-checkbox"],b={hash:{disabled:!0,checked:!0},hashTypes:{disabled:"BOOLEAN",checked:"BOOLEAN"},hashContexts:{disabled:t,checked:t},inverse:g.noop,fn:g.program(10,u,r),contexts:[],types:[],data:r},d=f?f.call(t,b):x.call(t,"paper-checkbox",b),(d||0===d)&&r.buffer.push(d),r.buffer.push("\n"),f=s["paper-checkbox"]||t&&t["paper-checkbox"],b={hash:{noink:!0},hashTypes:{noink:"BOOLEAN"},hashContexts:{noink:t},inverse:g.noop,fn:g.program(12,c,r),contexts:[],types:[],data:r},d=f?f.call(t,b):x.call(t,"paper-checkbox",b),(d||0===d)&&r.buffer.push(d),r.buffer.push("\n\n<h3>Template</h3>\n<pre>\n  {{#paper-checkbox checked=value1}}A checkbox: {{value1}}{{/paper-checkbox}}\n  {{#paper-checkbox checked=value2}}A checkbox: {{#if value2}}yep{{else}}nope{{/if}}{{/paper-checkbox}}\n  {{#paper-checkbox disabled=true}}Checkbox (disabled){{/paper-checkbox}}\n  {{#paper-checkbox disabled=true checked=true}}Checkbox (disabled and checked){{/paper-checkbox}}\n  {{#paper-checkbox noink=true}}Checkbox (no ink){{/paper-checkbox}}\n</pre>\n"),m})}),define("ember-paper-web/templates/components/base-focusable",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,o="";return p=s._triageMustache.call(t,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(p||0===p)&&r.buffer.push(p),r.buffer.push("\n"),o})}),define("ember-paper-web/templates/components/paper-button",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,o="",l=this.escapeExpression;return r.buffer.push("<button "),r.buffer.push(l(s["bind-attr"].call(t,{hash:{type:"type",disabled:"disabled"},hashTypes:{type:"ID",disabled:"ID"},hashContexts:{type:t,disabled:t},contexts:[],types:[],data:r}))),r.buffer.push(' class="paper-button-inner">\n  '),p=s._triageMustache.call(t,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(p||0===p)&&r.buffer.push(p),r.buffer.push("\n</button>\n"),o})}),define("ember-paper-web/templates/components/paper-checkbox",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n="";return t.buffer.push('\n  <div class="paper-label">\n    '),a=s._triageMustache.call(e,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n  </div>\n"),n}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var o,l="",i=this;return r.buffer.push('<div class="paper-container">\n  <div class="paper-icon"></div>\n</div>\n'),o=s["if"].call(t,"template",{hash:{},hashTypes:{},hashContexts:{},inverse:i.noop,fn:i.program(1,p,r),contexts:[t],types:["ID"],data:r}),(o||0===o)&&r.buffer.push(o),r.buffer.push("\n"),l})}),define("ember-paper-web/templates/components/paper-content",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,o="";return p=s._triageMustache.call(t,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(p||0===p)&&r.buffer.push(p),r.buffer.push("\n"),o})}),define("ember-paper-web/templates/components/paper-drawer",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,o="";return p=s._triageMustache.call(t,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(p||0===p)&&r.buffer.push(p),r.buffer.push("\n"),o})}),define("ember-paper-web/templates/components/paper-radio",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){var a,n="";return t.buffer.push('\n  <div class="paper-radio-label">\n    '),a=s._triageMustache.call(e,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n  </div>\n"),n}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var o,l,i,h="",u=this.escapeExpression,c=s.helperMissing,d=this;return r.buffer.push('<div class="paper-radio-container">\n  <div class="paper-radio-off"></div>\n  <div '),r.buffer.push(u(s["bind-attr"].call(t,{hash:{"class":"checked:fill :paper-radio-on"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:r}))),r.buffer.push("></div>\n  "),r.buffer.push(u((l=s["paper-ripple"]||t&&t["paper-ripple"],i={hash:{recenteringTouch:!0,lastDownEvent:"lastDownEvent",lastUpEvent:"lastUpEvent",classNames:"circle"},hashTypes:{recenteringTouch:"BOOLEAN",lastDownEvent:"ID",lastUpEvent:"ID",classNames:"STRING"},hashContexts:{recenteringTouch:t,lastDownEvent:t,lastUpEvent:t,classNames:t},contexts:[],types:[],data:r},l?l.call(t,i):c.call(t,"paper-ripple",i)))),r.buffer.push("\n</div>\n"),o=s["if"].call(t,"template",{hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(1,p,r),contexts:[t],types:["ID"],data:r}),(o||0===o)&&r.buffer.push(o),h})}),define("ember-paper-web/templates/components/paper-ripple",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{},r.buffer.push('<div class="ripple-bg"></div>\n<div class="ripple-waves"></div>')})}),define("ember-paper-web/templates/components/paper-sidenav",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,o="",l=this.escapeExpression;return r.buffer.push('<div class="icon ic-menu nav-button" '),r.buffer.push(l(s.action.call(t,"toggleDrawer",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r}))),r.buffer.push("></div>\n"),p=s._triageMustache.call(t,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(p||0===p)&&r.buffer.push(p),r.buffer.push("\n<div "),r.buffer.push(l(s["bind-attr"].call(t,{hash:{"class":":animatable drawerOpen:visible :sidenav-modal-bg"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:r}))),r.buffer.push(" "),r.buffer.push(l(s.action.call(t,"closeDrawer",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r}))),r.buffer.push("></div>"),o})}),define("ember-paper-web/templates/components/paper-toggle",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,o,l="",i=this.escapeExpression,h=s.helperMissing;return r.buffer.push("<div "),r.buffer.push(i(s["bind-attr"].call(t,{hash:{"class":"checked :paper-toggle-container"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:r}))),r.buffer.push(">\n  <div "),r.buffer.push(i(s["bind-attr"].call(t,{hash:{"class":"checked :paper-toggle-bar"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:r}))),r.buffer.push("></div>\n  "),r.buffer.push(i((p=s["paper-radio"]||t&&t["paper-radio"],o={hash:{checked:"checked",disabled:"disabled"},hashTypes:{checked:"ID",disabled:"ID"},hashContexts:{checked:t,disabled:t},contexts:[],types:[],data:r},p?p.call(t,o):h.call(t,"paper-radio",o)))),r.buffer.push("\n</div>"),l})}),define("ember-paper-web/templates/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{},r.buffer.push('<h3>Introduction <small>Welcome to Ember Paper.</small></h3>\n<p><br>This project aims to bring Google\'s new <a href="https://www.google.com/design/spec/material-design/introduction.html">Material Design</a> to Ember. The goal is to encapsulate everything possible in Ember components. This project is packaged as an <a href="http://www.ember-cli.com/">Ember-cli</a> addon. This allows a much nicer "plug and play" experience, as you can see for yourself in the "Installation" section.</p>\n\n<h3>Installation</h3>\n<p>Install the ember-cli addon in your ember-cli project:</p>\n<div class="preview-block">\n  <pre style="margin:0">$ npm install --save-dev ember-paper</pre>\n</div>\n<p>All the components and styles are ready to use in your application templates.</p>\n<p>Navigate through the docs to understand how to use each component.</p>\n\n<h3>Contribution</h3>\n<p><p>This is a very ambitious project. Google\'s design specs are extensive, and not trivial to implement. I\'ve been porting <a href="https://www.polymer-project.org/docs/elements/paper-elements.html">Polymer Paper Elements</a> and <a href="https://github.com/google/web-starter-kit/tree/material-sprint">Google Web Starter Kit</a> (material-sprint branch) to Ember. These seem to be the most useful resources at the moment. If you feel like porting or fixing an element or two, please drop a pull request or issue at GitHub!</p>\n<p>I believe that with the help of everyone we can bring these amazing design spec to Ember in a modular and robust way. The Ember way. </p>\n<p>\n<strong>Help us on Github!</strong>\n<!-- Place this tag where you want the button to render. -->\n</p>\n<p>\n<a class="github-button" href="https://github.com/miguelcobain/ember-paper" data-style="mega" data-count-href="/miguelcobain/ember-paper/network" data-count-api="/repos/miguelcobain/ember-paper#forks_count">Fork</a></p>')})}),define("ember-paper-web/templates/lists",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{},r.buffer.push('<h3>Lists</h3>\n<div class="preview-block">\n\n  <h3>Ordered</h3>\n  <ol>\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n    <li>Item 4</li>\n    <li>Item 5</li>\n  </ol>\n  <h3>Unordered</h3>\n  <ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n    <li>Item 4</li>\n    <li>Item 5</li>\n  </ul>\n  <h3>Inlined</h3>\n  <ul class="paper-list-inline">\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n    <li>Item 4</li>\n    <li>Item 5</li>\n  </ul>\n\n</div>')})}),define("ember-paper-web/templates/navigation",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p="";return r.buffer.push('<h3>Navigation</h3>\n<p>Try to resize this webpage.</p>\n<h3>Template</h3>\n<pre>\n  {{#paper-sidenav}}\n    {{#paper-drawer}}\n\n      &lt;h1 class="logo"&gt;&lt;img src="ember-logo-2459d8249860e287c483e2d6891f8276.png" height="30"/&gt;&nbsp;&nbsp;&lt;strong&gt;Paper&lt;/strong&gt;&lt;/h1&gt;\n      &lt;nav class="sidenav-nav"&gt;\n        &lt;ul&gt;\n          &lt;li&gt;{{#link-to "typography"}}Typography{{/link-to}}&lt;/li&gt;\n          &lt;li&gt;{{#link-to "lists"}}Lists{{/link-to}}&lt;/li&gt;\n          &lt;li&gt;{{#link-to "button"}}Button{{/link-to}}&lt;/li&gt;\n          &lt;li&gt;{{#link-to "checkbox"}}Checkbox{{/link-to}}&lt;/li&gt;\n          &lt;li&gt;{{#link-to "toggle"}}Toggle{{/link-to}}&lt;/li&gt;\n          &lt;li&gt;{{#link-to "radio"}}Radio{{/link-to}}&lt;/li&gt;\n        &lt;/ul&gt;\n      &lt;/nav&gt;\n\n    {{/paper-drawer}}\n    {{#paper-content}}\n\n      {{outlet}}\n\n    {{/paper-content}}\n  {{/paper-sidenav}}\n</pre>'),p})}),define("ember-paper-web/templates/radio",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function p(e,t){t.buffer.push("A radio button")}function o(e,t){t.buffer.push("Toggable radio button")}function l(e,t){t.buffer.push("Disabled radio button")}function i(e,t){t.buffer.push("Radio button 1")}function h(e,t){t.buffer.push("Radio button 2")}function u(e,t){t.buffer.push("Radio button 3")}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var c,d,f,b="",m=this,g="function",x=s.blockHelperMissing,v=s.helperMissing;return r.buffer.push('<h3>Radio Buttons</h3>\n<ul class="paper-list-inline">\n  <li>'),f={hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(1,p,r),contexts:[],types:[],data:r},(d=s["paper-radio"])?c=d.call(t,f):(d=t&&t["paper-radio"],c=typeof d===g?d.call(t,f):d),s["paper-radio"]||(c=x.call(t,"paper-radio",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(1,p,r),contexts:[],types:[],data:r})),(c||0===c)&&r.buffer.push(c),r.buffer.push("</li>\n  <li>"),d=s["paper-radio"]||t&&t["paper-radio"],f={hash:{toggle:!0},hashTypes:{toggle:"BOOLEAN"},hashContexts:{toggle:t},inverse:m.noop,fn:m.program(3,o,r),contexts:[],types:[],data:r},c=d?d.call(t,f):v.call(t,"paper-radio",f),(c||0===c)&&r.buffer.push(c),r.buffer.push("</li>\n  <li>"),d=s["paper-radio"]||t&&t["paper-radio"],f={hash:{disabled:!0},hashTypes:{disabled:"BOOLEAN"},hashContexts:{disabled:t},inverse:m.noop,fn:m.program(5,l,r),contexts:[],types:[],data:r},c=d?d.call(t,f):v.call(t,"paper-radio",f),(c||0===c)&&r.buffer.push(c),r.buffer.push('</li>\n</ul>\n<h3>Radio Button Group</h3>\n<ul class="paper-list-inline">\n  <li>'),d=s["paper-radio"]||t&&t["paper-radio"],f={hash:{value:"1",selected:"selectedValue"},hashTypes:{value:"STRING",selected:"ID"},hashContexts:{value:t,selected:t},inverse:m.noop,fn:m.program(7,i,r),contexts:[],types:[],data:r},c=d?d.call(t,f):v.call(t,"paper-radio",f),(c||0===c)&&r.buffer.push(c),r.buffer.push("</li>\n  <li>"),d=s["paper-radio"]||t&&t["paper-radio"],f={hash:{value:"2",selected:"selectedValue"},hashTypes:{value:"STRING",selected:"ID"},hashContexts:{value:t,selected:t},inverse:m.noop,fn:m.program(9,h,r),contexts:[],types:[],data:r},c=d?d.call(t,f):v.call(t,"paper-radio",f),(c||0===c)&&r.buffer.push(c),r.buffer.push("</li>\n  <li>"),d=s["paper-radio"]||t&&t["paper-radio"],f={hash:{value:"3",selected:"selectedValue"},hashTypes:{value:"STRING",selected:"ID"},hashContexts:{value:t,selected:t},inverse:m.noop,fn:m.program(11,u,r),contexts:[],types:[],data:r},c=d?d.call(t,f):v.call(t,"paper-radio",f),(c||0===c)&&r.buffer.push(c),r.buffer.push("</li>\n</ul>\n<p>Selected value: "),c=s._triageMustache.call(t,"selectedValue",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(c||0===c)&&r.buffer.push(c),r.buffer.push('</p>\n<h3>Template</h3>\n<pre>\n  {{#paper-radio}}A radio button{{/paper-radio}}\n  {{#paper-radio toggle=true}}Toggable radio button{{/paper-radio}}\n  {{#paper-radio disabled=true}}Disabled radio button{{/paper-radio}}\n\n  {{#paper-radio value="1" selected=selectedValue}}Radio button 1{{/paper-radio}}\n  {{#paper-radio value="2" selected=selectedValue}}Radio button 2{{/paper-radio}}\n  {{#paper-radio value="3" selected=selectedValue}}Radio button 3{{/paper-radio}}\n</pre>'),b})}),define("ember-paper-web/templates/toggle",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var p,o,l,i="",h=s.helperMissing,u=this.escapeExpression;return r.buffer.push("<h3>Toggle</h3>\n<p>\n  "),p=s._triageMustache.call(t,"paper-toggle",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),(p||0===p)&&r.buffer.push(p),r.buffer.push("\n  "),r.buffer.push(u((o=s["paper-toggle"]||t&&t["paper-toggle"],l={hash:{disabled:!0},hashTypes:{disabled:"BOOLEAN"},hashContexts:{disabled:t},contexts:[],types:[],data:r},o?o.call(t,l):h.call(t,"paper-toggle",l)))),r.buffer.push("\n</p>\n<h3>Template</h3>\n<pre>\n  {{paper-toggle}}\n\n  {{paper-toggle disabled=true}}\n</pre>"),i})}),define("ember-paper-web/templates/typography",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{},r.buffer.push('<h3>HTML Elements</h3>\n<hr/>\n<h3>Headings</h3>\n<div class="preview-block">\n  <h1>&lt;h1&gt;</h1>\n  <h2>&lt;h2&gt;</h2>\n  <h3>&lt;h3&gt;</h3>\n  <h4>&lt;h4&gt;</h4>\n  <h5>&lt;h5&gt;</h5>\n  <h6>&lt;h6&gt;</h6>\n</div>\n\n<h3>Formatting</h3>\n<div class="preview-block">\n  <p><u>&lt;u&gt;Underlined&lt;u&gt;</u></p>\n\n  <p><b>&lt;b&gt;Bold&lt;b&gt;</b></p>\n\n  <p><strong>&lt;strong&gt;Strong&lt;strong&gt;</strong></p>\n\n  <p><i>&lt;italic&gt;Italic&lt;italic&gt;</i></p>\n\n  <p><em>&lt;em&gt;Em&lt;em&gt;</em></p>\n\n  <p><s>&lt;s&gt;Strikethrough&lt;s&gt;</s></p>\n\n  <p><small>&lt;small&gt;Small&lt;small&gt;</small></p>\n\n  <p><mark>&lt;mark&gt;Mark&lt;mark&gt;</mark></p>\n</div>\n\n<h3>Subtitles</h3>\n<div class="preview-block">\n  <h1>&lt;h1&gt; <small>Subtitle</small></h1>\n  <h2>&lt;h2&gt; <small>Subtitle</small></h2>\n  <h3>&lt;h3&gt; <small>Subtitle</small></h3>\n  <h4>&lt;h4&gt; <small>Subtitle</small></h4>\n  <h5>&lt;h5&gt; <small>Subtitle</small></h5>\n  <h6>&lt;h6&gt; <small>Subtitle</small></h6>\n</div>\n\n<h3>Description</h3>\n<div class="preview-block">\n  <dl>\n    <dt>Description lists</dt>\n    <dd>A description list is perfect for defining terms.</dd>\n    <dt>Euismod</dt>\n    <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>\n    <dd>Donec id elit non mi porta gravida at eget metus.</dd>\n    <dt>Malesuada porta</dt>\n    <dd>Etiam porta sem malesuada magna mollis euismod.</dd>\n  </dl>\n</div>\n\n<h3>Quotes</h3>\n<div class="preview-block">\n  <blockquote>&lt;blockquote&gt;</blockquote>\n</div>\n\n<h2>Addresses</h2>\n\n<address>\n  <strong>Googleplex</strong><br>\n  1600 Amphitheatre Pkwy<br>\n  Mountain View, CA 94043<br>\n  <abbr title="Phone">P:</abbr> (650) 253-0000\n</address>\n\n<h2>Code</h2>\n\n<h3>Multi-line code blocks</h3>\n<p>\nUse &lt;pre&gt; for multi-line code blocks.\n<pre>\n&lt;p&gt;This is the first line of code&lt;/p&gt;\n&lt;p&gt;This is the second line of code&lt;/p&gt;\n</pre>\n</p>\n\n<h3>Inline code blocks</h3>\n<p>Code blocks like <code>&lt;main&gt;</code> could be displayed inline.</p>\n\n<h2>Tables</h2>\n\n<h3>Basic table</h3>\n\n<table>\n  <thead>\n    <tr>\n      <th>#</th>\n      <th>First Name</th>\n      <th>Last Name</th>\n      <th>Username</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>1</td>\n      <td>Larry</td>\n      <td>Page</td>\n      <td>+LarryPage</td>\n    </tr>\n    <tr>\n      <td>2</td>\n      <td>Sergey</td>\n      <td>Brin</td>\n      <td>+SergeyBrin</td>\n    </tr>\n    <tr>\n      <td>3</td>\n      <td>Eric</td>\n      <td>Schmidt</td>\n      <td>+EricSchmidt</td>\n    </tr>\n  </tbody>\n</table>')
})}),define("ember-paper-web/config/environment",["ember"],function(e){var t="ember-paper-web";try{var a=t+"/config/environment",s=e["default"].$('meta[name="'+a+'"]').attr("content"),n=JSON.parse(unescape(s));return{"default":n}}catch(r){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("ember-paper-web/tests/test-helper"):require("ember-paper-web/app")["default"].create({});