(this["webpackJsonpcheck-in"]=this["webpackJsonpcheck-in"]||[]).push([[0],{30:function(e,t,n){e.exports=n.p+"static/media/AppLab.55f63b92.png"},33:function(e,t,n){e.exports=n(62)},38:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(17),r=n.n(l),o=(n(38),n(11)),i=n(12),u=n(14),s=n(13),m=(n(8),n(6)),h=n(1),p=n(30),E=n.n(p),d=function(){return c.a.createElement("div",{class:"container"},c.a.createElement("div",{class:"column"},c.a.createElement("h1",null,"  Welcome to the"),c.a.createElement("img",{src:E.a,class:"App-logo",alt:"logo"})),c.a.createElement("div",{class:"column"},c.a.createElement(m.b,{to:"/check-in"},c.a.createElement("button",{class:"home",type:"button"},"Check In")),c.a.createElement("br",null),c.a.createElement(m.b,{to:"/check-out"},c.a.createElement("button",{class:"home",type:"button"},"Check Out"))))},v=n(15),f=n.n(v),k=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"SubmitCheckIn",value:function(e,t,n){if(""===t)alert("Please enter in a valid PID");else if(""===n)alert("Please enter a reason for visit");else{var a=new Date,c=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate(),l=a.getHours()+":"+a.getMinutes();f()({method:"POST",url:"/api/checkins/",headers:{authorization:localStorage.token},data:{name:e,PID:t,date:c,timeIn:l,timeOut:"00:00",reason:n,checkedIn:!0,staff:""}}),this.props.history.push("")}}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{class:"checkin"},c.a.createElement("h2",null,"Check In"),c.a.createElement("form",{onSubmit:function(){e.SubmitCheckIn(document.getElementById("name").value,document.getElementById("pid").value,document.getElementById("reason").value)}},c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"Name:",c.a.createElement("input",{type:"text",name:"name",id:"name"}))),c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"PID:",c.a.createElement("input",{type:"text",name:"pid",id:"pid"})),c.a.createElement("p",null,"(Scanner can be used to input PID)")),c.a.createElement("div",{class:"textbox"},c.a.createElement("label",null,"Reason:",c.a.createElement("input",{type:"text",name:"reason",id:"reason"}))),c.a.createElement("button",{class:"check-in"},"Submit")))}}]),n}(c.a.Component),b=n(32),g=(n(61),function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={visitors:[]},e.submit=function(t){Object(b.confirmAlert)({customUI:function(n){var a=n.onClose;return c.a.createElement("div",{className:"custom-ui",class:"dialogdiv"},c.a.createElement("h1",null,"Are you sure you want to check out?"),c.a.createElement("button",{class:"dialog",onClick:function(){e.checkOut(t),a()}},"Yes"),c.a.createElement("button",{class:"dialog",onClick:a},"No"))}})},e}return Object(i.a)(n,[{key:"getVisitors",value:function(){var e=this;f.a.get("/api/checkins/").then((function(t){var n=t.data.filter((function(e){return!0===e.checkedIn}));e.setState({visitors:n})}))}},{key:"componentDidMount",value:function(){this.getVisitors()}},{key:"checkOut",value:function(e){var t=new Date,n=t.getHours()+":"+t.getMinutes();e.name,e.PID,e.date,e.timeIn,e.reason,e.staff;f()({method:"PUT",url:"/api/checkins/".concat(e.id,"/"),headers:{authorization:localStorage.token},data:{name:e.name,PID:e.PID,date:e.date,timeIn:e.timeIn,timeOut:n,reason:e.reason,checkedIn:!1,staff:e.staff}}),this.props.history.push("")}},{key:"render",value:function(){var e=this,t=this.state.visitors;return c.a.createElement("div",{class:"checkout"},c.a.createElement("h2",null,"Check Out"),c.a.createElement("p",null,"Select your name to check out"),c.a.createElement("div",{class:"grid"},c.a.createElement("section",{class:"grid"},t.map((function(t,n){return c.a.createElement("button",{class:"gridEl",key:n,onClick:function(){return e.submit(t)}},c.a.createElement("p",null,t.name),c.a.createElement("p",null,t.PID))})))))}}]),n}(c.a.Component)),I=function(){return c.a.createElement("div",null,c.a.createElement(m.b,{to:"/"},"Home"))},y=function(){return c.a.createElement("div",null,c.a.createElement("br",null),c.a.createElement(m.b,{to:"/kpi-1"},"KPI 1"),c.a.createElement("br",null),c.a.createElement(m.b,{to:"/kpi-2"},"KPI 2"))},O=function(){return c.a.createElement("div",null,"KPI PAGE",c.a.createElement("div",null,c.a.createElement("p",null,"Trying to get review apps to work")))},P=function(){return c.a.createElement("div",null,"KPI PAGE 2",c.a.createElement("div",null,c.a.createElement("p",null,"This is KPI Page 2")))},w=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return c.a.createElement(m.a,null,c.a.createElement("div",null,c.a.createElement(I,null),c.a.createElement(h.c,null,c.a.createElement(h.a,{path:"/",component:d,exact:!0}),c.a.createElement(h.a,{path:"/check-in",component:k}),c.a.createElement(h.a,{path:"/check-out",component:g}),c.a.createElement(h.a,{path:"/kpi",component:y}),c.a.createElement(h.a,{path:"/kpi-1",component:O}),c.a.createElement(h.a,{path:"/kpi-2",component:P}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,n){}},[[33,1,2]]]);
//# sourceMappingURL=main.b53d1d0a.chunk.js.map