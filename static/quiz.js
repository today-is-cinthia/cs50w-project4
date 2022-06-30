//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const id = document.querySelector("#id_test").value

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}

// salir de
//quit_quiz.onclick = ()=>{
  //  window.location.reload(); //recargar la pagina en vez de redireccionar
//}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// boton siguiente es presionado
next_btn.onclick = ()=>{
    if(id == 5){
    if(que_count < questions5.length - 1){
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); //showResult function
    }}
    if(id == 8){
        if(que_count < questions8.length - 1){ 
            que_count++;
            que_numb++; 
            showQuetions(que_count); 
            queCounter(que_numb); 
            clearInterval(counter); 
            clearInterval(counterLine); 
            startTimer(timeValue); 
            startTimerLine(widthValue); 
            timeText.textContent = "Time Left"; 
            next_btn.classList.remove("show"); 
        }else{
            clearInterval(counter); 
            clearInterval(counterLine);
            showResult(); //showResult function
        }}
        if(id == 7){
            if(que_count < questions7.length - 1){
                que_count++; 
                que_numb++; 
                showQuetions(que_count); 
                queCounter(que_numb); 
                clearInterval(counter); 
                clearInterval(counterLine); 
                startTimer(timeValue); 
                startTimerLine(widthValue); 
                timeText.textContent = "Time Left"; 
                next_btn.classList.remove("show"); 
            }else{
                clearInterval(counter); 
                clearInterval(counterLine); 
                showResult(); //showResult function
            }}
}


function showQuetions(index){
    const que_text = document.querySelector(".que_text");
if(id == 5){
    let que_tag = '<span>'+ questions5[index].numb + ". " + questions5[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions5[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions5[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions5[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions5[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
if(id == 8){
    let que_tag = '<span>'+ questions8[index].numb + ". " + questions8[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions8[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions8[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions8[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions8[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // onclick para todas las opcionees
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
if(id == 7){
    let que_tag = '<span>'+ questions7[index].numb + ". " + questions7[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions7[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions7[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions7[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions7[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // onclick para todas las opcionees
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
}
// divs para icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    if(id == 5){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions5[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}
if(id == 8){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions8[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                alert("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); 
}
if(id == 7){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions7[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                alert("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); 
}
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 6){ // si el usuario obtuvo mas de 6 correctas
        let scoreTag = '<span>Opa!, You got <p>'+ userScore +'</p> out of <p>'+ questions7.length +'🤩</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 3){ // si el usuario obtuvo mas de 3
        let scoreTag = '<span>Nice, You got <p>'+ userScore +'</p> out of <p>'+ questions7.length +'🤪</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // si el usuario obtuvo menos o 1 respuesta correcta
        let scoreTag = '<span>Yikes, You got only <p>'+ userScore +'</p> out of <p>'+ questions7.length +'☠️🥱</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; //extrae todas las opciones 
            if(id == 5){
            let correcAns = questions5[que_count].answer;  //extrae respuesta correcta de la lista
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    alert("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //cuando el usuario selecciona una opcion deshabilota las demas
            }
            next_btn.classList.add("show"); //muestra el boton siguiente
        }
        if(id == 8){
            let correcAns = questions8[que_count].answer; //extrae respuesta correcta de la lista
            for(i=0; i < allOptions; i++){
                //añade color e icono a la respuesta correcta autoseleccionada
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    alert("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //cuando el usuario selecciona una opcion deshabilota las demas
            }
            next_btn.classList.add("show"); //muestra el boton siguiente
        }
        if(id == 7){
            let correcAns = questions7[que_count].answer; //extrae respuesta correcta de la lista
            for(i=0; i < allOptions; i++){
                //añade color e icono a la respuesta correcta autoseleccionada
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    alert("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //cuando el usuario selecciona una opcion deshabilota las demas
            }
            next_btn.classList.add("show"); //muestra el boton siguiente
        }

    }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    //imrpime numero final de preguntas respondidas correctamnete
    if(id == 5){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions5.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
    }
    if(id == 8){
        let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions8.length +'</p> Questions</span>';
        bottom_ques_counter.innerHTML = totalQueCounTag;  
        }
        if(id == 7){
            let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions7.length +'</p> Questions</span>';
            bottom_ques_counter.innerHTML = totalQueCounTag;  
            }
}