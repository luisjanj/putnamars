function provera()
{
var pitanje1 = document.getElementById('pitanje1').value;
var pitanje2 = document.getElementById('pitanje2').value;
var pitanje3 = document.getElementById('pitanje3').value;
var pitanje4 = document.getElementById('pitanje4').value;
var pitanje5 = document.getElementById('pitanje5').value;
localStorage.setItem("Da li ste zainteresovani za putovanje na mars?", pitanje1);
localStorage.setItem("Kolika je udaljenost zemlje od marsa?", pitanje2);
localStorage.setItem("Koliko novca ste spremni da izdvojite za putovanje?", pitanje3);
localStorage.setItem("Da li postoji voda na marsu?", pitanje4);
localStorage.setItem("Da li smatrate da ima zivota na marsu?", pitanje5);
return  uneto_pitanje1() && uneto_pitanje2();   
}

function uneto_pitanje1()
{
var pitanje1 = document.getElementById('pitanje1').value;
var pitanje2 = document.getElementById('pitanje2').value;
var pitanje3 = document.getElementById('pitanje3').value;
var pitanje4 = document.getElementById('pitanje4').value;
var pitanje5 = document.getElementById('pitanje5').value;
if(pitanje1.trim().length == 0 || pitanje2.trim().length == 0 || pitanje3.trim().length == 0 || pitanje4.trim().length == 0 || pitanje5.trim().length == 0)
{
greska.innerHTML = "Unesite odgovor";
return false;
}
return true;  
}