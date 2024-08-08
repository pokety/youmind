const socket = io();
sessionStorage.setItem('nome','')
const content=document.querySelector("#content")
const send=document.querySelector("#send")
const setnome=document.querySelector("#setnome")


socket.on("clientchoices",(choices)=>{
    let getNome=sessionStorage.getItem('nome')
    if(getNome!=''){
        content.style.display='block'
        var opcoes=''
        choices.forEach(el => {
            opcoes+=`<button class="h-32 w-full px-6 font-semibold rounded-md bg-white text-black mr-2 mt-2" onclick='enviarReposta(this)'>${el}</button>`
        });
        content.innerHTML=opcoes
    }
})

function enviarReposta(opc){
    let getNome=sessionStorage.getItem('nome')

    var btns=document.querySelectorAll("button")
    socket.emit('respostaClient',[getNome,opc.innerHTML])
    socket.on("cbClient",(opt)=>{

        btns.forEach((el)=>{
            if(el.innerHTML!=opc.innerHTML){
                el.setAttribute("disabled","")
                el.setAttribute("class","h-32 w-full px-6 font-semibold rounded-md text-zinc-400 mr-2 mt-2 bg-white")
            }else{
                console.log()
                if(opc.innerHTML==opt){
                    
                    el.setAttribute("class","h-32 w-full px-6 font-semibold rounded-md text-black mr-2 mt-2 bg-green-300")
                }else{
                    el.setAttribute("class","h-32 w-full px-6 font-semibold rounded-md text-black mr-2 mt-2 bg-red-300")

                }
            }
        })

    })

    
    
    // content.innerHTML=`
    //     <div class="flex justify-center items-center w-48 h-48 select-none" >
    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#3C051A"></stop><stop offset=".3" stop-color="#3C051A" stop-opacity=".9"></stop><stop offset=".6" stop-color="#3C051A" stop-opacity=".6"></stop><stop offset=".8" stop-color="#3C051A" stop-opacity=".3"></stop><stop offset="1" stop-color="#3C051A" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#3C051A" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>

    //     </div>
    //     `
}

send.addEventListener('click',()=>{
    let nome=document.querySelector("#nome")
    let logo=document.querySelector("#logo")

    if(nome.value!=''){
        sessionStorage.setItem('nome',nome.value.trimStart().trimEnd())
        setnome.style.display='none'
        logo.style.display='none'
        content.innerHTML=`  
            <div class=" w-48 h-48 flex-none select-none" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#3C051A"></stop><stop offset=".3" stop-color="#3C051A" stop-opacity=".9"></stop><stop offset=".6" stop-color="#3C051A" stop-opacity=".6"></stop><stop offset=".8" stop-color="#3C051A" stop-opacity=".3"></stop><stop offset="1" stop-color="#3C051A" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#3C051A" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
            </div>
            `
        content.style.display='block'
    }
 })