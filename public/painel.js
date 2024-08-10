const socket = io();
let content=document.querySelector("#paragraph")
const ctx = document.getElementById('myChart');
const paragraph=document.querySelector('#paragraph')


const config={
    type: 'bar',
    data: {
        axis: 'y',
        labels: [],
        datasets: [{
            label: 'SCORE',
            data: [],
            borderWidth: 2,
            borderRadius:5,
            
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
        }],
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                type: 'linear',
                grace: '100%',
                ticks: {
                    stepSize: 0.5
                }
            },
        },
        plugins: {
            
        }
    }
  }
const charts=new Chart(ctx,config)

socket.on("perguntas",(pergunta)=>{
    paragraph.style.display='block'
    ctx.style.display='none'
    if(pergunta=='LOADIING'){
        paragraph.innerHTML=`  
        <img class="scale-150" src="/public/qr.png" alt="WFI" >
    `
    }else{

        paragraph.innerHTML=pergunta
    }
})
socket.on("pontuacao",(pontos)=>{
    paragraph.style.display='none'
    ctx.style.display='block'

    let nomes=[]
    let ptn=[]


    pontos.forEach(el => {
        nomes.push(el[0])
        ptn.push(el[1].point)
    });

    config.data.labels=nomes
    config.data.datasets[0].data=ptn
    console.log(config.data.labels)
    console.log(config.data.datasets[0].data)
    charts.update()
    
})