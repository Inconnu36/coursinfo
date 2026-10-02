'use strict';
// API documentée : https://pyodide.org/en/0.27.3/usage/api/js-api.html
const activatePython=document.getElementById('charger-python');
const runPython=document.getElementById('executer-python');
const stopPython=document.getElementById('arreter-python');
const pythonStatus=document.getElementById('etat-python');
const pythonOutput=document.getElementById('sortie-python');
let pythonWorker=null, pythonTimer=null;
function stopEngine(message) {
    if(pythonWorker) pythonWorker.terminate();
    pythonWorker=null; clearTimeout(pythonTimer); runPython.disabled=true; stopPython.disabled=true; activatePython.disabled=false; pythonStatus.textContent=message;
}
activatePython.addEventListener('click',()=>{
    if(location.protocol==='file:') { pythonStatus.textContent='Démarrez node server.js puis ouvrez http://localhost:8080/atelier.html pour utiliser le moteur.';return; }
    activatePython.disabled=true;stopPython.disabled=false;pythonStatus.textContent='Chargement du moteur…';
    try { pythonWorker=new Worker('js/python-worker.js'); }
    catch(error) { stopEngine('Moteur indisponible. Vous pouvez toujours étudier le programme.');return; }
    pythonWorker.onmessage=event=>{
        const message=event.data;
        if(message.type==='ready') {clearTimeout(pythonTimer);runPython.disabled=false;pythonStatus.textContent='Moteur prêt.';}
        if(message.type==='output')pythonOutput.textContent=(pythonOutput.textContent+message.text+'\n').slice(0,30000);
        if(message.type==='done'){clearTimeout(pythonTimer);runPython.disabled=false;pythonStatus.textContent='Exécution terminée.';}
        if(message.type==='error')stopEngine(message.text);
    };
    pythonWorker.onerror=()=>stopEngine('Chargement impossible. Vérifiez la connexion ou utilisez votre Python local.');
    pythonTimer=setTimeout(()=>stopEngine('Chargement trop long. Réessayez avec une connexion disponible.'),90000);
});
runPython.addEventListener('click',()=>{
    if(!pythonWorker)return;
    runPython.disabled=true;pythonOutput.textContent='';pythonStatus.textContent='Exécution…';
    pythonWorker.postMessage({code:document.getElementById('code-python').value,inputs:document.getElementById('entrees-python').value.split('\n')});
    pythonTimer=setTimeout(()=>stopEngine('Exécution arrêtée après 10 secondes. Réactivez le moteur pour recommencer.'),10000);
});
stopPython.addEventListener('click',()=>stopEngine('Moteur arrêté.'));
