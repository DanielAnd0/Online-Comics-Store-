window.addEventListener("DOMContentLoaded", function(){

    sw = document.getElementById("schimba_tema")
    sw.addEventListener("change", function(){
    if(!sw.checked){
        document.body.classList.add("dark")
        localStorage.setItem("tema","dark");
    }
    else{
        document.body.classList.remove("dark")
        localStorage.removeItem("tema");
    }
});
});
