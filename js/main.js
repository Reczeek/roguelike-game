const scene = document.getElementById('scene');
function loadScene(nazwa) {
    scenes[nazwa]();
}



loadScene("combat");