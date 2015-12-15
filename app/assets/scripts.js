var dropzone = document.getElementById('drop');

function entree(event){
    event.target.className = 'depose';
    event.preventDefault();
}

function sortie(event){
    event.target.className = '';
}

if (window.addEventListener){
    dropzone.addEventListener('dragenter', entree);
    dropzone.addEventListener('dragleave', sortie);
}
else{
    dropzone.attachEvent('dragenter', entree);
    dropzone.attachEvent('dragleave', sortie);
}
