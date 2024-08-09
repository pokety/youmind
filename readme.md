# You Mind
E um jogo de quiz em rede local onde tem um painel que administra as perguntas ,um painel de exibicao ,e um cliente.

## Como usar
`$ git clone https://github.com/pokety/youmind.git` \
`$ cd youmind` 

### Perguntas
As perguntas e um arquivo **_perguntas.json_** no seguinte esquema:
```json
[
    {
        "id": 2,
        "pergunta": "De quem é a famosa frase 'Penso,logo existo'?",
        "opcoes": [
            "Platão",
            "Galileu Galilei",
            "Descartes",
            "Sócrates",
            "Francis Bacon"
        ],
        "resposta": "Descartes"
    },
]
```
### Iniciando

`$ npm install ` \
`$ npm start` 

#### Admin
[http://localhost:3000/admin](http://localhost:3000/admin) 
#### Painel
[http://localhost:3000/painel](http://localhost:3000/painel)



## Screenshots
> admin

![](/admin.png)
> painel

![](/painel.png)
> cliente

![](/client.png)