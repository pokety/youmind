const socket = io();
let content=document.querySelector("#paragraph")
socket.on("perguntas",(pergunta)=>{
    rating.style.display='none'
    if(pergunta=='LOADIING'){
        content.innerHTML=`<p  id="paragraph" class="font-serif font-semibold text-4xl mx-16">
            
        <img class="scale-150" src="/public/qr.png" alt="WFI" >

    </p>`
    }else{

        content.innerHTML=pergunta
    }
})
socket.on("pontuacao",(pontos)=>{
    let rating=document.querySelector('#rating')
    content.innerHTML=''
    rating.innerHTML=''
    rating.style.display='block'
    
    pontos.forEach(el => {
        rating.innerHTML+=`
        <div class="p-3 bg-gray-300 shadow-md rounded-lg flex justify-center items-center  select-none w-96 mt-4">
    <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">${el[0]}</a>
    <div class="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
        <div class="h-5 bg-yellow-300 rounded" style="width: ${el[1].point*10}%"></div>
    </div>
    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">${el[1].point}</span>
</div>

       `

    });

    
})