const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(){
 const elements=new Map();
 const get=id=>{if(!elements.has(id)) elements.set(id,{innerHTML:'',textContent:'',value:'',disabled:false,replaceChildren(...nodes){this.children=nodes;},scrollIntoView(){}});return elements.get(id);};
 let tick=null;
 const context=vm.createContext({document:{getElementById:get,querySelectorAll:()=>[],createElement:()=>({textContent:''})},setInterval:f=>(tick=f,1),clearInterval:()=>tick=null,Map});
 vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8'),context);
 return {get,run:s=>vm.runInContext(s,context),tick:()=>tick?.()};
}
test('each scenario preserves source facts and reaches audit without crossing contexts',()=>{
 const app=setup();
 for(let i=0;i<3;i++){
  app.run(`selected=samples[${i}];step=0;render()`);
  assert.equal(app.get('sourceFacts').children.length,4);
  assert.equal(app.get('next').disabled,false);
  for(let n=0;n<6;n++) app.get('next').onclick();
  assert.equal(app.get('currentStep').textContent,'Audit');
  assert.equal(app.get('next').disabled,true);
  assert.match(app.get('results').innerHTML,/SOURCE/);
  assert.ok(app.get('results').innerHTML.includes(app.get('deadlineInline').textContent));
 }
});
test('draft changes survive advance, reset and scenario switches; HTML is escaped',()=>{
 const app=setup();app.run('step=4;render()');
 app.get('responseDraft').value='<img src=x onerror=alert(1)> edited';
 app.get('responseDraft').oninput();app.get('next').onclick();
 app.run('selected=samples[1];step=4;render();selected=samples[0];render()');
 assert.match(app.get('results').innerHTML,/&lt;img/);
 assert.doesNotMatch(app.get('results').innerHTML,/<img/);
 app.get('reset').onclick();assert.equal(app.get('currentStep').textContent,'Read');
 app.run('step=4;render()');assert.match(app.get('results').innerHTML,/edited/);
});
test('guided demo completes and reset stops the timer',()=>{
 const app=setup();app.get('autoDemo').onclick();
 for(let n=0;n<7;n++) app.tick();
 assert.equal(app.get('currentStep').textContent,'Audit');
 assert.match(app.get('autoDemo').textContent,/Run guided/);
 app.get('autoDemo').onclick();app.get('reset').onclick();app.tick();
 assert.equal(app.get('currentStep').textContent,'Read');
});
