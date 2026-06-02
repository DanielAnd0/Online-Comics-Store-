window.addEventListener("DOMContentLoaded", function(){


sw = document.getElementById("schimba_tema")
sw.addEventListener("change", function(){
    if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark")
        localStorage.removeItem("tema");
    }
    else{
        document.body.classList.add("dark")
        localStorage.setItem("tema","dark");
    }
}
);
})