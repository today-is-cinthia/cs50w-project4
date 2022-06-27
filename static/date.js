document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#submitreview").onclick = () =>{
        const time = new Date().toLocaleString()

        comentario = document.querySelector("#date");

        comentario.append(time)
    }
})