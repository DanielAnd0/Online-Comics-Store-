window.addEventListener("DOMContentLoaded", function(){
if (localStorage.getItem("tema")){
    document.body.classList.add("dark")
    document.getElementById("schimba_tema").checked = false; 
}
else{
    document.body.classList.remove("dark")
    document.getElementById("schimba_tema").checked = true;
}
});