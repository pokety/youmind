const express =require( "express")
const QRCode =require('qrcode')
const {createServer} =require( "http")
const {Server} =require( "socket.io")
const {join} =require( "path")
const fs =require( "fs-extra")
const {networkInterfaces} =require( "os")
const perguntas=fs.readJSONSync('./perguntas.json')

const interfaces=Object.keys(networkInterfaces())
const redeLocal=interfaces.filter((el)=>el!="lo")
const localhost=networkInterfaces()[redeLocal[0]].filter((el)=>el.family!='IPv6')

QRCode.toFile('./public/qr.png',localhost[0].address + ':3000')

const app=express()
const server=createServer(app)
const io =new Server(server)
app.use("/public",express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(join(__dirname, '/public/client.html'));
})

app.get("/painel",(req,res)=>{
    res.sendFile(join(__dirname, '/public/painel.html'));
})

app.get("/admin",(req,res)=>{
    res.sendFile(join(__dirname, '/public/admin.html'));
})
app.get("/questions",(req,res)=>{
    res.json(perguntas)
})
var perguntal
var clientes=new Map()
io.on('connection', (socket) => {
    
    socket.on("perguntapainel",async(id)=>{
        perguntal=perguntas.filter((el)=>el.id==id)

        if(perguntal.length>0){
            io.emit("perguntas",perguntal[0].pergunta)
            io.emit('clientchoices',perguntal[0].choices)
        }else{
            io.emit("perguntas",'LOADIING')
        }
        
    })

    socket.on('respostaClient',([getNome,opc])=>{
        if(perguntal[0].resposta==opc){
            if(clientes.get(getNome)){
                clientes.get(getNome).point+=1
                
            }else{
                clientes.set(getNome,{point:1}) 
                
            }
        }
        io.emit("cbClient",perguntal[0].resposta)
    })
    socket.on('resultadopainel',()=>{
        const [...values]=clientes
       
        io.emit("pontuacao",values)
        
    })
    socket.on('clear',()=>{
       clientes.clear()
      
    })
});


server.listen(3000,()=>{
    console.log("ADMIN : http://"+ localhost[0].address + ':3000/admin')
    console.log("PAINEL : http://"+ localhost[0].address + ':3000/painel')
})