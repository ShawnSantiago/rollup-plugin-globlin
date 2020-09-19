import{join as t,basename as e}from"path";import n from"chokidar";import o from"minimatch";import{remove as r,copy as i,outputFile as a,existsSync as c,readFile as s}from"fs-extra";import{mark as d,stop as f}from"marky";import l from"pretty-ms";import m from"chalk";const{log:p}=console,u=(t,n,o,r)=>{if(!1===n)return t;const i=o.substring(o.lastIndexOf("."),o.length),a=("object"==typeof n&&n.name?n.name:"string"==typeof n?e(n):t).replace(/\[\bname\b\]/,t).replace(/\[\bext\b\]/,i||null);return r.has(o)||r.set(o,a),t!==a&&p(m`{dim renamed ${t} to ${a}}`),r.get(o)},y=(t,e,n)=>"object"==typeof e&&e.dest?e.dest.replace(/\[\bname\b\]/,t):n;export default(b={})=>{const{globs:g=!1,clean:w=!0,dest:h="./package",cwd:$=process.cwd(),transform:j=!1}=b;if(!g)throw new Error("Missing { globs: [] } in rollup-plugin-globlin");let k,E,x,O=0;return{name:"rollup-plugin-globlin",options(t){k=void 0===t.watch},async buildStart(){if(O++)return;w&&await r(h);const b=new Map,k=((n,o)=>async i=>{d(i);const a=t(o,e(i));await r(a),n.delete(i),p(m`{bold.red deleted} {red ${a}} in {dim ${l(f(i).duration)}}`)})(b,h),v=((n,o,r)=>async c=>{d(c);const s=e(c),b=await r(s,c);if("boolean"==typeof b||"string"==typeof b)await i(c,t(y(s,b,o),u(s,b,c,n))),p(m`{bold copied} {cyan ${c}} in {dim ${l(f(c).duration)}}`);else if("object"==typeof b){if(b.content&&"string"!=typeof b.content)throw new Error(`The ${c} content property did not return a string!`);b.dest=y(s,b,o),b.name=u(s,b,c,n),b.content?(await a(t(b.dest,b.name),b.content,"utf8"),p(m`{bold modified} {cyan ${c}} in {dim ${l(f(c).duration)}}`)):(await i(c,t(b.dest,b.name)),p(m`{bold copied} {cyan ${c}} in {dim ${l(f(c).duration)}}`))}})(b,h,((t,e)=>async(n,r)=>{if(!e||!r)return!1;if(!["function","object"].includes(typeof e))throw new Error(r+" transform must be of type object or function");try{c(r)}catch(t){throw new Error(t)}const i=await s(r);if("function"==typeof e)return e({name:r,content:i,dest:t});if("object"==typeof e){if("string"==typeof e[n]&&e[n]!==n)return e[n];const a=Object.keys(e).find(t=>o(r,t));if(!a)return!1;if("string"==typeof e[a])return e[a];if("function"==typeof e[a])return e[a]({content:i,dest:t,name:r});p(m.dim(`The transform used by ${a} must of type function or string`))}})(h,j));E=n.watch(((t,e)=>[...t.filter(Boolean),"!**/node_modules/**",`!${e}/**`])(g,h),{cwd:$}),E.on("add",v),E.on("change",v),E.on("unlink",k),E.on("unlinkDir",k),E.on("error",t=>{throw t}),x=new Promise((t=>e=>t.on("ready",()=>{const n=t.getWatched();return p(`Watching ${Object.keys(n).length} paths`),e()}))(E)),p(m`{underline rollup-plugin-globlin v${"0.1.2"}}`)},async generateBundle(){await x},buildEnd(){k&&E.close()}}};
