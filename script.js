let infoInicial = document.querySelector('.area1-1 span');
let cargo = document.querySelector('.area1-2 span');
let infosCandidato = document.querySelector('.area1-4');
let aviso = document.querySelector('.area2');
let infosDireita = document.querySelector('.area1-right');
let numeros = document.querySelector('.area1-3');  

let inicio = 0;
let num = '';
let votoBranco = false;
let votos = [];
let finalizado = false;

function comecarEtapa(){
    let etapa = candidatos[inicio];
    let qntdNum = '';
    votoBranco = false;
    num = '';
    for(let i = 0;i<etapa.numeros;i++){
        if(i === 0){
            qntdNum += '<div class="numBox pisca"></div>';
        }
        else{
            qntdNum += '<div class="numBox"></div>';
        }
    }
    infoInicial.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    infosCandidato.innerHTML = '';
    aviso.style.display = 'none'
    infosDireita.innerHTML = '';
    numeros.innerHTML = qntdNum;
}


function atualizar(){
    console.log(num);
    let etapa = candidatos[inicio];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === num){
            return true;
        }else{
            return false;
        }
        });
    console.log('Candidato: ', candidato);
    if(candidato.length > 0){
        candidato = candidato[0];
        infoInicial.style.display = 'block';
        aviso.style.display = 'block';
        infosCandidato.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosCand = '';
        for(let i in candidato.fotos){
            fotosCand += `<div class="area1-right-image"><img src="imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
        }
        infosDireita.innerHTML = fotosCand;
    }else{
        infoInicial.style.display = 'block';
        aviso.style.display = 'block';
        infosCandidato.innerHTML  = '<div class="aviso-nulo pisca">VOTO NULO</div>';

    }
}
function clicou(n){
    let elemento_num = document.querySelector('.numBox.pisca');
    if(elemento_num !== null){
        elemento_num.innerHTML = n;
        num = `${num}${n}`;
        elemento_num.classList.remove('pisca');
        if(elemento_num.nextSibling !== null){
            elemento_num.nextSibling.classList.add('pisca');
        }else{
            atualizar();
        }

    }

}

function branco(){
    if(num === ''){
        infoInicial.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        infosCandidato.innerHTML  = '<div class="aviso-nulo pisca">VOTO EM BRANCO</div>';
        votoBranco = true;
    }else{
        alert('Não se pode votar em branco após ter teclado algum número.');
    }

}

function corrigir(){
    if(finalizado === true)
        alert('Seu voto já foi finalizado.');
    else
        comecarEtapa();
}

function confirma(){
    let etapa = candidatos[inicio];
    let votoConfirmado = false;
    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: candidatos[inicio].titulo,
            nome: 'branco',
            voto: 'branco'
        })
    }else if(num.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: candidatos[inicio].titulo,
            voto: num
        })
    }

    if(votoConfirmado === true){
        inicio++;
        if(candidatos[inicio] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="fim">FIM</div>';
            console.log(votos);
            finalizado = true;
        }
    }
}

comecarEtapa();