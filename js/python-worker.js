'use strict';
// Dépendance facultative : chargée uniquement à l’activation de l’atelier.
let engine;
const ready=(async()=>{
    try {
        importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.3/full/pyodide.js');
        engine=await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.27.3/full/'});
        engine.setStdout({batched:text=>postMessage({type:'output',text})});
        engine.setStderr({batched:text=>postMessage({type:'output',text})});
        postMessage({type:'ready'});
    } catch(error) {postMessage({type:'error',text:'Moteur indisponible : '+error.message});}
})();
onmessage=async event=>{
    await ready;
    if(!engine)return;
    const lines=event.data.inputs.slice();
    engine.setStdin({stdin:()=>lines.length?lines.shift():null});
    try { await engine.runPythonAsync(event.data.code); }
    catch(error) {postMessage({type:'output',text:error.message});}
    postMessage({type:'done'});
};
