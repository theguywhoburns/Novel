import{W as t}from"./index-mbH_Tke6.js";class a extends t{async getCurrentPosition(e){return new Promise((n,o)=>{navigator.geolocation.getCurrentPosition(i=>{n(i)},i=>{o(i)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))})}async watchPosition(e,n){return`${navigator.geolocation.watchPosition(i=>{n(i)},i=>{n(null,i)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0,minimumUpdateInterval:5e3},e))}`}async clearWatch(e){window.navigator.geolocation.clearWatch(parseInt(e.id,10))}async checkPermissions(){if(typeof navigator>"u"||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");const e=await window.navigator.permissions.query({name:"geolocation"});return{location:e.state,coarseLocation:e.state}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}}const c=new a;export{c as Geolocation,a as GeolocationWeb};
