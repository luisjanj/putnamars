function validacija(){
                        //pretpostavimo da je forma validna
                        var formaValidna = true; 
        
                        if(formaValidna){
                            return true;
                        }else{
                            return false;
                        }
                    }
                    
        
                    //ODAVDE POCINJE VALIDACIJA FORME
                    var formular = document.getElementById('forma');
                    var greska = document.getElementById('greska');
                    
                    function provera()
                    {
                    var korisnickoIme = document.getElementById('korisnickoIme').value;
                    var lozinka = document.getElementById('lozinka').value;
                    localStorage.setItem(korisnickoIme, lozinka);
                    return uneto_korisnicko_ime() && ispravna_lozinka();
                        
                    }
        
                    function uneto_korisnicko_ime()
                    {
                        var korisnickoIme = document.getElementById('korisnickoIme').value;
        
                        if(korisnickoIme.trim().length == 0)
                        {
                            greska.innerHTML = "Nije uneto korisnicko ime";
                            return false;
                        }
        
                        return true;
                        
                    }
        
                    function ispravna_lozinka()
                    {
                        var lozinka = document.getElementById('lozinka').value.trim();
                        

                        if(lozinka.length < 8)
                        {
                            greska.innerHTML = "Neispravna duzina lozinke";
                            return false;
                        }
        
                        var broj_cifara = 0;
                        var broj_velikih_slova = 0;
                        var broj_malih_slova = 0;
                        var broj_ostalih_karaktera = 0;
        
                        for(var i = 0; i < lozinka.length; i++)
                        {
                            var karakter = lozinka.charAt(i);
        
                            if(cifra(karakter))
                                broj_cifara++;
                            else if(malo_slovo(karakter))
                                broj_malih_slova++;
                            else if(veliko_slovo(karakter))
                                broj_velikih_slova++;
                            else
                                broj_ostalih_karaktera++;
                        }
        
                        if(broj_cifara == 0)
                        {
                            greska.innerHTML = "Lozinka mora sadrzati bar jednu cifru";
                            return false;
                        }
        
                        if(broj_malih_slova < 2)
                        {
                            greska.innerHTML = "Lozinka mora sadrzati bar dva mala slova";
                            return false;
                        }
        
                        if(broj_velikih_slova == 0)
                        {
                            greska.innerHTML = "Lozinka mora sadrati bar jedno veliko slovo";
                            return false;
                        }
        
                        return true;
                    }
        
                    function cifra(karakter)
                    {
                        if(karakter >= '0' && karakter <= '9')
                            return true;
        
                        return false;
                    }
        
                    function malo_slovo(karakter)
                    {
                        if(karakter >= 'a' && karakter <= 'z')
                            return true;
        
                        return false;
                    }
        
                    function veliko_slovo(karakter)
                    {
                        if(karakter >= 'A' && karakter <= 'Z')
                            return true;
        
                        return false;
                    }