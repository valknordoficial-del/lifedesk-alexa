const samples = [
  {
    id:'finance', label:'Vehicle finance notice', category:'Financial document', title:'Finance provider requests missing documentation', deadline:'18 October 2026', days:14,
    summary:'The lender asks for proof of insurance and an updated direct-debit mandate before the next payment cycle.',
    facts:['Account remains active','Two documents requested','Response channel: secure portal','No penalty stated in the letter'],
    actions:['Locate current insurance certificate','Verify bank mandate details','Upload both documents via secure portal','Save confirmation receipt'],
    draft:'Hello, I am responding to your documentation request. I have attached the current insurance certificate and the updated direct-debit mandate. Please confirm receipt and advise if anything else is required.',
    reminder:'Remind me on 16 October if I have not marked the upload as completed.'
  },
  {
    id:'warranty', label:'Vehicle warranty notice', category:'Consumer document', title:'Warranty inspection window', deadline:'27 October 2026', days:23,
    summary:'The manufacturer offers a no-cost inspection during a fixed eligibility window and asks the owner to book in advance.',
    facts:['Inspection described as no-cost','Booking required','VIN requested at booking','No repair authorization is implied'],
    actions:['Check preferred service centre','Prepare VIN','Request inspection slot','Keep booking confirmation'],
    draft:'Hello, I would like to book the warranty inspection referenced in your notice. Please share the available appointment times and confirm what documents I should bring.',
    reminder:'Remind me on 20 October if no appointment is confirmed.'
  },
  {
    id:'appointment', label:'Appointment letter', category:'Health administration', title:'Outpatient appointment with preparation instructions', deadline:'12 October 2026', days:8,
    summary:'The letter confirms an appointment and lists preparation instructions plus a contact number for rescheduling.',
    facts:['Arrival requested 20 minutes early','Photo ID requested','Preparation instructions included','Rescheduling phone number provided'],
    actions:['Add appointment to calendar','Review preparation instructions the day before','Prepare ID/documentation','Set departure reminder'],
    draft:'No reply is required. LifeDesk recommends contacting the clinic only if you need to reschedule or clarify preparation instructions.',
    reminder:'Remind me the evening before and two hours before departure.'
  }
];

const steps=['Read','Extract','Explain','Plan','Draft','Remind','Audit'];
let selected=samples[0], step=0, timer=null;
// The scenario clock is fixed so the same fictional letter remains reproducible.
const scenarioDate='4 October 2026';
const drafts=new Map();
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=id=>document.getElementById(id);

function renderTabs(){ $('sampleTabs').innerHTML=samples.map(s=>`<button class="${s.id===selected.id?'active':''}" data-id="${s.id}">${s.label}</button>`).join(''); document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{selected=samples.find(s=>s.id===b.dataset.id); step=0; stopAuto(); render();}); }
function renderStepper(){ $('stepper').innerHTML=steps.map((s,i)=>`<div class="step ${i<=step?'on':''}"><span>${i<step?'✓':i+1}</span><small>${s}</small></div>`).join(''); }
function resultBlock(num,title,html){return `<section class="result-block"><div class="result-title"><code>${num}</code><strong>${title}</strong></div>${html}</section>`;}
function renderResults(){ let html=''; if(step===0) html='<div class="empty">✦<h3>Ready to reason across the document</h3><p>Press “Next step” or run the automated judge demo to watch the full workflow.</p></div>';
 if(step>=1) html+=resultBlock('01','Facts extracted',`<span class="confidence">Predefined sample facts · no AI confidence score</span><ul>${selected.facts.map(f=>`<li>${f}</li>`).join('')}</ul><div class="highlight"><strong>${selected.deadline}</strong><small>${selected.days} days remaining in this simulation</small></div>`);
 if(step>=2) html+=resultBlock('02','Plain-language explanation',`<p>${selected.summary} LifeDesk separates what the document explicitly says from what it merely recommends.</p>`);
 if(step>=3) html+=resultBlock('03','Action plan',`<ol>${selected.actions.map(a=>`<li>${a}</li>`).join('')}</ol>`);
 if(step>=4) html+=resultBlock('04','Draft response',`<label for="responseDraft">Edit the proposed response</label><textarea id="responseDraft" class="draft" rows="6">${escapeHtml(drafts.get(selected.id) ?? selected.draft)}</textarea><small>Nothing is sent. Edits are kept for this browser tab session.</small>`);
 if(step>=5) html+=resultBlock('05','Suggested reminder',`<div class="highlight">🔔 <span>${selected.reminder}</span></div>`);
 if(step>=6) html+=resultBlock('06','Why LifeDesk suggested this',`<div class="audit"><div><code>SOURCE</code><p>Deadline text in document</p></div><b>→</b><div><code>INFERENCE</code><p>Follow-up needed before expiry</p></div><b>→</b><div><code>ACTION</code><p>Reminder + ordered checklist</p></div></div>`);
 $('results').innerHTML=html; const editor=$('responseDraft'); if(editor) editor.oninput=()=>drafts.set(selected.id,editor.value); }
function render(){ renderTabs(); renderStepper(); $('category').textContent=selected.category; $('docTitle').textContent=selected.title; $('reference').textContent='REFERENCE: LD-'+selected.id.toUpperCase()+'-26'; $('docSummary').textContent=selected.summary; $('sourceFacts').replaceChildren(...selected.facts.map(f=>{const li=document.createElement('li');li.textContent=f;return li;})); $('scenarioDate').textContent=scenarioDate; $('deadlineInline').textContent=selected.deadline; $('currentStep').textContent=steps[step]; renderResults(); $('next').disabled=step>=steps.length-1; }
function stopAuto(){ if(timer){clearInterval(timer); timer=null;} $('autoDemo').textContent='▶ Run guided judge demo'; }
function startAuto(){ stopAuto(); selected=samples[0]; step=0; render(); $('autoDemo').textContent='● Auto demo running'; document.getElementById('demo').scrollIntoView({behavior:'smooth'}); timer=setInterval(()=>{ if(step>=steps.length-1){stopAuto(); return;} step++; render(); },1500); }
$('next').onclick=()=>{stopAuto(); step=Math.min(step+1,steps.length-1); render();}; $('reset').onclick=()=>{stopAuto(); step=0; render();}; $('autoDemo').onclick=startAuto; render();
