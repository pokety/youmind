const socket = io();

const btnresultado=document.querySelector("#resultado")
const enviar=document.querySelector("#enviar")
const resetar=document.querySelector("#resetar")
fetch('/questions').then((resp)=>resp.json()).then((result)=>{
    
    let lista=document.querySelector("#lista")
    result.forEach(el => {
        lista.innerHTML+=`<li  onclick="selectQuestion(this)" class="flex items-center space-x-3 rtl:space-x-reverse">
        <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
        </svg>
        
        <span  >${el.id} </span>
        <span class="text-wrap" >${el.pergunta}</span>
    </li>`
    });
})

function selectQuestion(opts){

    let pergunta=document.querySelector("#pergunta")
    let prevPergunta=document.querySelector("#prevPergunta")
    pergunta.value=opts.children[1].innerText
    opts.children[2].setAttribute('class','line-through')
    prevPergunta.innerText=opts.children[2].innerText
    prevPergunta.style.display='block'
    }

enviar.addEventListener("click",()=>{
    let pergunta=document.querySelector("#pergunta")
    socket.emit("perguntapainel",pergunta.value)
    pergunta.value=''
})
btnresultado.addEventListener('click',()=>{
    socket.emit("resultadopainel",1)
})
resetar.addEventListener('click',()=>{
    socket.emit("clear",1)
})
