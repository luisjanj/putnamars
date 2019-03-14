var list = document.getElementById('pitanja');
    
    function dodajPitanja(){
    var pitanje1 = document.getElementById('pitanje1').value;
    var pitanje2 = document.getElementById('pitanje2').value;
    var pitanje3 = document.getElementById('pitanje3').value;
    var pitanje4 = document.getElementById('pitanje4').value;
    var pitanje5 = document.getElementById('pitanje5').value;
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(pitanje1 + ' ' + pitanje2 + ' ' + pitanje3 + ' ' + pitanje4 + ' ' + pitanje5));
    list.appendChild(entry);
    

    return false;
}


