# Urna Eletrônica

Projeto desenvolvido usando recursos simples de Programação WEB.

## Funções

- Teclado virtual, em que os números são acionados ao clicar nos botões e exibidos no painel
- Limpar painel
- Registrar votos
- Exibir votos registrados

## Como funciona?

O usuário clica nas teclas numéricas do painel e os números são registrados no `input:text` (painel). <br>
Ao clicar no botão "Confirma", os valores registrados no painel são armazenados no navegador através de `localStorage()` <br>
Caso já tenha sido armazenado voto para o número escolhido, mais um é atribuído. Caso contrário, um elemento no array do `localStorage()` é criado. <br>
Clicando no botão "Branco", um voto é branco é armazenado.
Os votos são armazendados no navegador e ao clicar no botão "Resultado Apurado" os votos são exibidos em um modal.

## Recursos utitilizados

- Fonte: sans-serif
- Biblioteca: FontAwesome, jQuery
- Frameworks: SweetAlert, Bootstrap

## Créditos

As imagens usadas neste projeto são adaptações do trabalho do [Chris Vector](https://crisvector.myportfolio.com)