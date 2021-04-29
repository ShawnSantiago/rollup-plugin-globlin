import{join as t,basename as n}from"path";import e from"chokidar";import o from"minimatch";import{remove as r,copy as i,outputFile as a,existsSync as c,readFile as s}from"fs-extra";import{mark as d,stop as f}from"marky";import l from"pretty-ms";import m from"chalk";const{log:p}=console,u=(t,e,o,r)=>{if(!1===e)return t;const i=o.substring(o.lastIndexOf("."),o.length),a=("object"==typeof e&&e.name?e.name:"string"==typeof e?n(e):t).replace(/\[\bname\b\]/,t).replace(/\[\bext\b\]/,i||null);return r.has(o)||r.set(o,a),t!==a&&p(m`{dim renamed ${t} to ${a}}`),r.get(o)},y=(t,n,e)=>"object"==typeof n&&n.dest?n.dest.replace(/\[\bname\b\]/,t):e;export default(b={})=>{const{globs:g=!1,clean:w=!0,dest:h="./package",cwd:$=process.cwd(),transform:j=!1}=b;if(!g)throw new Error("Missing { globs: [] } in rollup-plugin-globlin");let k,E,x,T=0;return{name:"rollup-plugin-globlin",options(t){k=void 0===t.watch},async buildStart(){if(T++)return;w&&await r(h);const b=new Map,k=((e,o)=>async i=>{d(i);const a=t(o,n(i));await r(a),e.delete(i),p(m`{bold.red deleted} {red ${a}} in {dim ${l(f(i).duration)}}`)})(b,h),O=((e,o,r)=>async c=>{d(c);const s=n(c),b=await r(s,c);if("boolean"==typeof b||"string"==typeof b)await i(c,t(y(s,b,o),u(s,b,c,e))),p(m`{bold copied} {cyan ${c}} in {dim ${l(f(c).duration)}}`);else if("object"==typeof b){if(b.content&&"string"!=typeof b.content)throw new Error(`The ${c} content property did not return a string!`);b.dest=y(s,b,o),b.name=u(s,b,c,e),b.content?(await a(t(b.dest,b.name),b.content,"utf8"),p(m`{bold modified} {cyan ${c}} in {dim ${l(f(c).duration)}}`)):(await i(c,t(b.dest,b.name)),p(m`{bold copied} {cyan ${c}} in {dim ${l(f(c).duration)}}`))}})(b,h,((t,n)=>async(e,r)=>{if(!n||!r)return!1;if(!["function","object"].includes(typeof n))throw new Error(`${r} transform must be of type object or function`);try{c(r)}catch(t){throw new Error(t)}const i=await s(r);if("function"==typeof n)return p(m`{dim - Transformed:) {cyan ${r}}`),n({name:r,content:i,dest:t});if("object"==typeof n){if("string"==typeof n[e]&&n[e]!==e)return n[e];const a=Object.keys(n).find((t=>o(r,t)));if(!a)return!1;if("string"==typeof n[a])return n[a];if("function"==typeof n[a])return p(m`{dim - Transformed:) {cyan ${r}}`),n[a]({content:i,dest:t,name:r});p(m.dim(`The transform used by ${a} must of type function or string`))}})(h,j));E=e.watch(((t,n)=>[...t.filter(Boolean),"!**/node_modules/**",`!${n}/**`])(g,h),{cwd:$}),E.on("add",O),E.on("change",O),E.on("unlink",k),E.on("unlinkDir",k),E.on("error",(t=>{throw t})),x=new Promise((t=>n=>t.on("ready",(()=>{const e=t.getWatched();return p(`Watching ${Object.keys(e).length} paths`),n()})))(E)),p(m`{underline rollup-plugin-globlin v${"0.1.4"}}`)},async generateBundle(){await x},buildEnd(){k&&E.close()}}};
