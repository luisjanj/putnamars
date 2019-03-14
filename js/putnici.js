var greska = document.getElementById('greska');
        var putnik = {};
        var putnici = [];
        var dohvaceni = false;
        document.getElementById('izlistaj').addEventListener("click", izlistaj);
        document.getElementById('filter').addEventListener('click', filtriraj);
        document.getElementById('dodaj').addEventListener('click', function(){
            var f = document.getElementById('forma');
            //toggle
            if(f.getAttribute('class') == "hidden"){
                //ovo je kad je forma otvorena
                f.setAttribute('class',"");
                this.innerHTML = "Sakrij formu";
                var identifikator = document.getElementById('identifikator');
                identifikator.value = kreiraj_identifikator();
            }else{
                f.setAttribute('class', 'hidden');
                this.innerHTML = "Dodaj putnika";
            }
            
        });

        function kreiraj_identifikator(){
            //definise se najpre sta je identifikator
            //zelimo 4cifreni broj ili nisku
            var brojac_identifikatora = localStorage.getItem('br_id');
            if(brojac_identifikatora == null){
                brojac_identifikatora = 1;
            }
            var formiraj_id = brojac_identifikatora.toString().split("");
            var br = brojac_identifikatora.toString();
            var duzina = br.length;
            while(duzina<4){
                formiraj_id.unshift(0);
                duzina++;
            }
            var id = formiraj_id.join("");
            console.log(id);
            brojac_identifikatora++;
            localStorage.setItem('br_id', brojac_identifikatora);
            putnik.identifikator = id;
            return id;

        }

        function filtriraj(){
            var p = dohvati();
            var filter_datuma = document.querySelectorAll('input[name="kr"]');
            var filter_drzava = document.querySelectorAll('input[name="kr"]');
            var niz = p.filter(function(element){
                for(i in filter_datuma || i in filter_drzava){
                    if(filter_datuma[i].checked && element.datum_polaska == filter_datuma[i].value || filter_drzava[i].checked && element.drzava == filter_drzava[i].value){
                       return true;     
                    }
                }
                return false;
            });
            for(i in niz){
                kreiraj_tabelu(niz[i],"tabela2");   
            }
            
        }

        function izlistaj(){
            if(!dohvaceni){
                var p = dohvati();
                if(p == null){
                    greska.innerHTML = "Nema podataka";
                }else{
                    for(i=0; i < p.length; i++){
                        kreiraj_tabelu(p[i],'tabela');
                    }
                }
            }
            var lista = document.getElementById('lista');
            lista.className = "shown";
            dohvaceni = true;
            return;
        }

        function kreiraj_tabelu(osoba, t){
            var tabela = document.getElementById(t);
            var red = document.createElement('tr');
            tabela.appendChild(red);
            for(svojstvo in osoba){
                var kol = document.createElement("td");
                kol.innerHTML = osoba[svojstvo];
                red.appendChild(kol);
            }
            return;
        }
        
        function dohvati(){
            var za_dohvatanje = localStorage.getItem("putnici");
            var p = JSON.parse(za_dohvatanje);
            console.log(p);
            return p;
        }
        function smesti_putnika(putnik){
            dohvaceni = false;
            var p = dohvati();
            if(p != null){
                p.push(putnik);
                za_smestanje = JSON.stringify(p);
            }else{
                putnici.push(putnik);
                za_smestanje = JSON.stringify(putnici);
            }
            localStorage.setItem("putnici", za_smestanje);
            return;
        }

        function brojevi(niska){
            for(i in niska){
                if(niska[i] >= '0' && niska[i] <= '9'){
                    continue;
                }else{
                    return false;
                }
            }
            return true;
        }
        function godiste_provera(){
            var tren_godina = new Date().getFullYear();
            var godiste = document.getElementById('godiste').value;
            if(godiste > 1900 && godiste <= tren_godina){
                putnik.godiste = godiste;
                return true;
            }
            greska.innerHTML = "Morate uneti ispravno godiste!";
            return false;
        }
        function telefon_provera(){
            var telefon = document.getElementById('telefon').value;
            if(telefon.length != 10 || !brojevi(telefon)){
                greska.innerHTML = "Neispravan telefon";
                return false;
            }
            
            putnik.telefon = telefon;
            return true;
        }
        
        function ime_provera(){
            var ime = document.getElementById('name').value;
            if(ime.trim().length == 0 || ime.indexOf(' ') == -1){
                greska.innerHTML = 'Neispravno uneto ime i prezime';
                return false;
            }
            for(i=0;i<ime.length;i++){
                if(ime[i] != " "){
                    if(ime[i].toUpperCase() == ime[i].toLowerCase()){
                        greska.innerHTML = 'Neslovni karakteri u imenu i prezimenu';
                        return false;
                    }
                }
            }
            putnik.ime_prezime = ime;
            return true;
        }
        function drzava(){
            var drzava = document.getElementById('drzava');
            if(drzava.selectedIndex == 0){
                greska.innerHTML = "Morate odabrati drzavu";
                return false;
            }
            putnik.drzava = drzava[drzava.selectedIndex].value;
            return true;
        }

        function datum_polaska_provera(){
            var datum_polaska = document.getElementById('datum_polaska');
            if(datum_polaska.selectedIndex == 0){
                greska.innerHTML = "Morate odabrati datum polaska";
                return false;
            }
            putnik.datum_polaska = datum_polaska[datum_polaska.selectedIndex].value;
            return true;
        }
        
        function provera(){
            if(ime_provera() && telefon_provera() && godiste_provera() && drzava() && datum_polaska_provera()){
                console.log(putnik);
                smesti_putnika(putnik);
                return true;
            }
            return false;
        }