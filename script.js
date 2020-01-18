// OKVIR ZA SLIKE 
var slike=document.getElementsByClassName("VilaKolonaOkvir");
for(var i=0;i<slike.length;i++){
    var a=slike[i];
    a.onmouseover=function(){
        this.style.border="3px solid yellow";
    }
    a.onmouseout=function(){
        this.style.border="none";
    }
}
// PADAJUCI MENI DUGME ZA RESPONSIVE 
$("#IzbornikDugme").on('click',function(){
    $("#Izbornik").slideToggle();
})
// PREUZIMANJE TABELE (JQUERY)
document.onreadystatechange=function(){
    $("tbody").html('');
    $.ajax({
        url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll',
        success:function(rez){
            rez.reverse();
            for(var i=0;i<rez.length;i++){
                var datum=new Date(rez[i].datumNarudzbe).toISOString().slice(0,10);
                var IzreziDatum=datum.split('-');
                datum=IzreziDatum[2]+'.'+IzreziDatum[1]+'.'+IzreziDatum[0];
                $("tbody").append("<tr><td>"+rez[i].narudzbaId+"</td><td>"+datum+"</td><td>"+rez[i].dostavaIme+"</td><td>"+rez[i].dostavaAdresa+"</td><td>"+rez[i].dostavaPostanskiBroj+"</td><td>"+rez[i].dostavaTelefon+"</td><td>"+rez[i].napomena+"</td></tr>");
                
            }
        }
    });
}
// DODAVANJE ZAPISA U TABELU 
$("#dodaj").on('click',function(){
    if(!forma.valid()){
        alert("Unesite ispravne podatke u formu");
        return;
    }
    var z=new Object();
    z.dostavaAdresa=document.getElementById("dostavaAdresa").value;
    z.dostavaIme=document.getElementById("dostavaIme").value;
    z.dostavaPostanskiBroj=document.getElementById("dostavaPostanskiBroj").value;
    z.dostavaTelefon=document.getElementById("dostavaTelefon").value;
    z.napomena=document.getElementById("napomena").value;
    var strJson=JSON.stringify(z);

    var mojUrl='http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj';
    var zahtjev=new XMLHttpRequest();
    zahtjev.onload=function(){
        if(zahtjev.status===200){
            var r=JSON.parse(zahtjev.response);
            alert("Uspjesno dodano");
        }
        else{
            alert("Server javlja gresku "+ zahtjev.statusText);
        }
    }
    zahtjev.onerror=function(){
        alert("Greska u komunikaciji sa serverom");
    }

    zahtjev.open("POST",mojUrl,true);
    zahtjev.setRequestHeader("Content-Type","application/json");
    zahtjev.send(strJson);
})
// VALIDACIJA 
$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Unos nije validan!"
);
var forma=$("#forma");
forma.validate({
    rules:{
        dostavaIme:{
            required:true,
            regex:/^[a-zA-Z]+$/
        },
        dostavaAdresa:{
            required:true,
            regex:/^[a-zA-Z]+$/
        },
        dostavaPostanskiBroj:{
            required:true,
            regex:/^\d{5}$/
        },
        dostavaTelefon:{
            required:true,
            regex:/^\+\d{3}-\d{2}-\d{3}-\d{4}$/
        }
    },
    messages:{
        dostavaIme:{
            required:"Polje je obavezno",
            regex:"Unos mora biti tekstualni"
        },
        dostavaAdresa:{
            required:"Polje je obavezno",
            regex:"Unos mora biti tekstualni"
        },
        dostavaPostanskiBroj:{
            required:"Polje je obavezno",
            regex:"Polje mora sadrzavati 5 cifri"
        },
        dostavaTelefon:{
            required:"Polje je obavezno",
            regex:"broj mora biti u formatu +111-11-111-1111"
        }
    }
});