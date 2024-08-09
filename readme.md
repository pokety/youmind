# You Mind
E um jogo de quiz em rede local onde tem um painel que administra as perguntas ,um painel de exibicao ,eu um cliente.

## Como usar

`$ npm install ` \
`$ npm start` \
\
[http://localhost:3000]()

## Perguntas
As perguntas e um arquivo **_perguntas.json_** no seguinte esquema:
```json
[
    {
        "id": 2,
        "pergunta": "De quem é a famosa frase 'Penso,   logo existo'?",
        "choices": [
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

## Screenshots
> admin

![](/admin.png)
> painel

![](/painel.png)
> cliente

![](/client.png)