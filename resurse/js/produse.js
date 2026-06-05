window.onload = function(){


  /*traducere data adaugarii*/
    document.querySelectorAll('time.val-data').forEach(el => {
        const raw = el.textContent.trim();
        const data = new Date(raw);
        el.setAttribute('datetime', raw);
        const zi = data.toLocaleDateString('ro-RO', { day: 'numeric' });
        const luna = data.toLocaleDateString('ro-RO', { month: 'long' });
        const an = data.toLocaleDateString('ro-RO', { year: 'numeric' });
        const ziSapt = data.toLocaleDateString('ro-RO', { weekday: 'long' });
        el.textContent = `${zi} ${luna} ${an} (${ziSapt})`;
    });



    document.getElementById("inp-volum-range").onchange = function(){
        document.getElementById("infoRange").innerHTML = `(${this.value})`
    }

    document.getElementById("filtrare").onclick = function(){

        // 1. text - nume
        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase()

        // 2. range - volum minim
        let inpVolum = parseInt(document.getElementById("inp-volum-range").value.trim())

        // 3. datalist - autor
        let inpAutor = document.getElementById("inp-autor").value.trim().toLowerCase()

        // 4. filtru varsta
        let varsteSelectate = Array.from(document.querySelectorAll(".chk-varsta:checked"))
                                .map(chk => chk.value)


        // 5. radio - color
        let grupColor = document.getElementsByName("gr_color")
        let colorSelectat;
        for (let rad of grupColor){
            if (rad.checked){
                colorSelectat = rad.value
                break   
            }
        }

        // 6. textarea - descriere
        let inpDescriere = document.getElementById("inp-descriere").value.trim().toLowerCase()

        // 7. select simplu - data
        let inpData = document.getElementById("inp-data").value.trim().toLowerCase()

        // 8. select multiplu - genuri
        let inpGenuri = Array.from(document.getElementById("inp-genuri").selectedOptions)
                            .map(opt => opt.value.toLowerCase())

        let produse = document.getElementsByClassName("produs")
        for (let prod of produse){
            prod.style.display = "none"

            // 1. filtru nume
            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
            let cond1 = nume.includes(inpNume)

            // 2. filtru volum
            let volum = parseInt(prod.getElementsByClassName("val-volum")[0].innerHTML.trim())
            let cond2 = volum > inpVolum

            // 3. filtru autor  
            let autor = prod.getElementsByClassName("val-autor")[0].innerHTML.trim().toLowerCase()
            if(/^[a-zA-Z\s]+$/.test(inpAutor) == false && inpAutor != ""){
                alert("Câmpul autor este invalid!")
                return
            }
            let cond3 = autor.includes(inpAutor) || inpAutor == ""

            // 4. filtru varsta

            let varsta = prod.getElementsByClassName("val-varsta")[0].innerHTML.trim().toLowerCase()
            let cond4 = varsteSelectate.length == 0 || varsteSelectate.includes(varsta)

            // 5. filtru color
            let color = prod.getElementsByClassName("val-culoare")[0].innerHTML.trim()
            let cond5 = colorSelectat == "toate" ||
                        (colorSelectat == "da" && color == "DA") ||
                        (colorSelectat == "nu" && color == "NU")

            // 6. filtru descriere
            let descriere = prod.getElementsByClassName("val-descriere")[0].innerHTML.trim().toLowerCase()
            let cond6 = descriere.includes(inpDescriere) || inpDescriere == ""

            // 7. filtru data
            let data = prod.getElementsByClassName("val-data")[0].innerHTML.trim().toLocaleLowerCase()
            let azi = new Date()
            const zi = azi.toLocaleDateString('ro-RO', { day: 'numeric' });
            const luna = azi.toLocaleDateString('ro-RO', { month: 'long' });
            const an = azi.toLocaleDateString('ro-RO', { year: 'numeric' });
            const ziSapt = azi.toLocaleDateString('ro-RO', { weekday: 'long' });

            cond7 = inpData == "oricare" ||
                    (inpData == "ultima-zi" && `${zi} ${luna} ${an} (${ziSapt})` === data) ||
                    (inpData == "ultima-saptamana" && an === data.split(" ")[2] && luna === data.split(" ")[1] && `(${ziSapt})` === data.split(" ")[3]) ||
                    (inpData == "ultima-luna" && an === data.split(" ")[2] && luna === data.split(" ")[1]) ||
                    (inpData == "ultimul-an" && an === data.split(" ")[2])

            // 8. filtru genuri
            let genuri = prod.getElementsByClassName("val-genuri")[0].innerHTML.trim().toLowerCase()
            let cond8 = inpGenuri.length == 0 || inpGenuri.every(gen => genuri.includes(gen))

            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                prod.style.display = "block"
            }
        }
    }

    document.getElementById("resetare").onclick = function(){

        if (!confirm("Sigur doriți să resetați filtrele?")){
            return
        }   
        // resetare inputuri
        document.getElementById("inp-nume").value = ""
        document.getElementById("inp-volum-range").value = "0"
        document.getElementById("infoRange").innerHTML = "(0)"
        document.getElementById("inp-autor").value = ""
        document.getElementById("inp-descriere").value = ""
        document.getElementById("inp-data").value = "oricare"

        // resetare checkbox varsta
        const checkboxuri = document.querySelectorAll('input[type="checkbox"]');

        checkboxuri.forEach(cb => {
                    cb.checked = false;
            });

        // resetare radio color
        document.querySelector("input[name='gr_color'][value='toate']").checked = true
        // resetare select multiplu
        Array.from(document.getElementById("inp-genuri").options)
             .forEach(opt => opt.selected = false)

        // afiseaza toate produsele
        let produse = document.getElementsByClassName("produs")
        for (let prod of produse){
            prod.style.display = "block"
        }
    }

    function sorteaza(semn){
        let produse = document.getElementsByClassName("produs")
        let vProduse = Array.from(produse)
        vProduse.sort(function(a, b){
            let pretA = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML.trim())
            let pretB = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML.trim())
            if (pretA == pretB){
                let numeA = a.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
                let numeB = b.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
                return semn * numeA.localeCompare(numeB)
            }
            return semn * (pretA - pretB)
        })
        for (let prod of vProduse){
            prod.parentElement.appendChild(prod)
        }
    }

    document.getElementById("sortCrescNume").onclick = function(){ sorteaza(1) }
    document.getElementById("sortDescrescNume").onclick = function(){ sorteaza(-1) }

    window.onkeydown = function(e){
        if (e.key == "c" && e.altKey){
            let produse = document.getElementsByClassName("produs")
            let suma = 0;
            for (let prod of produse){
                if (prod.style.display != "none"){
                    suma += parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim())
                }
            }
            let p = this.document.getElementById("infoSuma")
            if (!p){
                p = this.document.createElement("p")
                p.innerHTML = suma
                p.id = "infoSuma"
                let sectiuneProduse = this.document.getElementById("produse")
                sectiuneProduse.parentElement.insertBefore(p, sectiuneProduse)
                this.setTimeout(function(){
                    let p1 = this.document.getElementById("infoSuma")
                    p1.remove()
                }, 2000)
            }
            else{
                p.innerHTML = suma
            }
        }
    }

    



   const textarea = document.getElementById("inp-descriere");
   
   textarea.addEventListener("input", function () {
   const val = textarea.value;

   const valid = /^[a-zA-Z0-9\s.,!?;:'"-]{5,}$/.test(val);

        if (valid) {
                    textarea.classList.remove("is-invalid");
                    textarea.classList.add("is-valid");
        } else {
                    textarea.classList.add("is-invalid");
                    textarea.classList.remove("is-valid");
                }

    });

}