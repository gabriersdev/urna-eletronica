document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
  botao.addEventListener('click', () => {
      window.location.reload();
  })
})

function feedback(status, action){
  if(status == "on"){
    if(action == "success"){
      $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    }
    if(action == "warning"){
      $( "div.warning" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    }
    if(action == "failure"){
      $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    }
  }
}

function btnNum(n){
  var painel1 = document.getElementById('painel-n1').value;
  var painel2 = document.getElementById('painel-n2').value;
  if(painel1 == "" || painel1 == null){
    document.getElementById('painel-n1').value=n
  }else if (painel2 == "" || painel2 == null){
    document.getElementById('painel-n2').value=n;
  }else{
    feedback('on','warning');
    var msg="Caracteres completos!";
    document.getElementById('msg-warning').value=msg;
  }
}

function corrige(){
  limparPainel();
}

function limparPainel(){
  document.getElementById('painel-n1').value="";
  document.getElementById('painel-n2').value="";
}

function playSomUrna(){
  som = document.querySelector('audio');
  som.volume = 0.25;
  som.play();
}

function computar(valor){
  var painel1 = document.getElementById('painel-n1').value;
  var painel2 = document.getElementById('painel-n2').value;
  //Caso o voto seja em um CANDIDATO
  if(valor == "valor"){
    //Para impedir que o voto seja registrado mais de uma vez
    // document.querySelector('#btn-confirma').setAttribute('onclick','');
    // document.querySelector('#btn-branco').setAttribute('onclick','');
    // setTimeout(function (){location.reload()}, 3500);
    limparPainel();
    if(painel1 !== "" && painel2 !== ""){
      let valor1 = parseInt(painel1);
      let valor2 = parseInt(painel2);
      //Criando e armazenando na variável o número do candidato
      let candidato = (valor1 * 10) + valor2;
      //Armazena os votos localmente em sessões
      if (localStorage.getItem(candidato) != null) { //Atribuindo um voto
        votos = parseInt(localStorage.getItem(candidato)) + 1;
        localStorage.setItem(candidato, votos);
      }else{ //Inserindo um candidato
        localStorage.setItem(candidato, 1);
      }
      //Alerta na tela
      Swal.fire({
        title: 'Voto computado!',
        text: 'O seu voto foi gravado com sucesso. Aguarde o recarregamento da página',
        imageUrl: './assets/img/som-urna.png',
        imageWidth: 350,
        imageHeight: 350,
        imageAlt: 'Custom image',
        timer: 3000
      });
      feedback('on','success');
      var msg="Aguarde!";
      document.getElementById('msg-success').value=msg;
      playSomUrna();
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Vote em um candidato',
        text: 'Caso o número do candidato seja menor que 10 digite o zero primeiro. Exemplo: 07, 03 e 01',
        timer: 2000
      })
    }
    //Caso o voto seja BRANCO
  }else if(valor == "branco"){
    limparPainel();
    //Para impedir que o voto seja registrado mais de uma vez
    // document.querySelector('#btn-confirma').setAttribute('onclick','');
    // document.querySelector('#btn-branco').setAttribute('onclick','');
    // setTimeout(function (){location.reload()}, 3500);
    //Criando e armazenando na variável o número do candidato
    let candidato = 00;
    //Armazena os votos localmente em sessões
    if (localStorage.getItem(candidato) != null) { //Atribuindo um voto
      votos = parseInt(localStorage.getItem(candidato)) + 1;
      localStorage.setItem(candidato, votos);
    }else{ //Inserindo um candidato
      localStorage.setItem(candidato, 1);
    }
    Swal.fire({
      title: 'Voto computado!',
      text: 'O seu voto foi gravado com sucesso. Aguarde o recarregamento da página',
      imageUrl: './img/som-urna.png',
      //https://pbs.twimg.com/media/E8r2jiMWEAIpwVP.jpg
      imageWidth: 350,
      imageHeight: 350,
      imageAlt: 'Custom image',
      timer: 3000
    });
    feedback('on','success');
    var msg="Aguarde!";
    document.getElementById('msg-success').value=msg;
  }
}

function resultados(){
  //Exibir pop-up com o resultado dos votos apurados
  // document.getElementById('campo-resultado').value="";
  for (i=0; i<100; i++){
    if(localStorage.getItem(i) != null){
      // alert("Candidato "+i+" tem "+localStorage.getItem(i)+ " votos");  
      if (i == "0" || i == "00" || i == "000"){
        document.getElementById('campo-resultado').innerHTML += "Branco tem "+localStorage.getItem(i)+" votos <br/>";
      }else{
        document.getElementById('campo-resultado').innerHTML += "Candidato "+i+" tem "+localStorage.getItem(i)+" votos <br/>";
      }
    }
  }
  document.getElementById('campo-resultado').innerHTML += "<br/>";
}

function limpaSessao(){
  Swal.fire({
    icon: 'warning',
    title: 'Os votos serão apagados',
    text: 'Tem certeza disso?',
    showCancelButton: true,
    focusConfirm: false,
    cancelButtonColor: '#d45',
    cancelButtonText: 'Não apagar',
  }).then((result) => {
    if(result.isConfirmed){
      localStorage.clear()
      feedback('on','warning');
      var msg="Votos apagados! Aguarde";
      document.getElementById('msg-warning').value=msg;
      setTimeout(function (){location.replace("./index.html");}, 2000);
    }else{
      feedback('on','success');
      var msg="Votos mantidos! Aguarde";
      document.getElementById('msg-success').value=msg;
      setTimeout(function (){location.replace("./index.html");}, 2000);
    }
  }
  )
}
