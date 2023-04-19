const cards = [
    {
        img: "dabi.jpg",
        id: 1
    },{
        img: "deku.jpg",
        id: 2
    },{
        img: "gojo.jpg",
        id: 3
    },{
        img: "hawks.jpg",
        id: 4
    },{
        img: "mirio.jpg",
        id: 5
    },{
        img: "senku.jpg",
        id: 6
    },{
        img: "tanjiro.jpg",
        id: 7
    },{
        img: "zenitisu.jpg",
        id: 8
    }
];

var sorteados = [];

function criarUnico(min, max) {
    var sugestao = Math.floor(Math.random() * (max - min) ) + min; // Escolher um numero ao acaso
    while (sorteados.indexOf(sugestao) >= 0) {  // Enquanto o numero já existir, escolher outro
        sugestao = Math.floor(Math.random() * (max - min) ) + min;
    }
    sorteados.push(sugestao);
}
function sortear(max) {    
    for (let index = 0; index < max; index++) {
        criarUnico(0, max)    
    }   
}
sortear(16)
console.log(sorteados);
const cardsBack = document.querySelectorAll('.back img');

console.log(cardsBack);

for(let i = 0; i < 8; i++){
    let cont = 0
    for(let index = 0; index < 16; index++){
        cardsBack[sorteados[index]].setAttribute('src', `photos/${cards[i].img}`);
        cardsBack[sorteados[index]].setAttribute('data-id', `${cards[i].id}`);
        cont++
        if (cont == 2) {
            cont=0;
            i++;
        }
    };   
};


const flippers = document.querySelectorAll('.flipper')
var lastClick = "";
var lastIndex = 0;
var cont=0;
flippers.forEach(function(flipper, index) {
    flipper.addEventListener('click',(infos) => {
        if(!flipper.classList.contains('showBack')){ 
        rotateCard(flipper)
        var clicked = infos.target;
        setTimeout(function() {
        if (lastClick != "") {
            const idAtual = cardsBack[index].getAttribute('data-id');
            const idLast = lastClick.getAttribute('data-id');
            if (idAtual === idLast) {
                cardsBack.forEach(element => {
                    if (idAtual == element.getAttribute('data-id')) {
                        element.classList.add('showBack');
                        element.classList.add('stayBack');
                    }
                });
                
            }
            if (idAtual !== idLast && !clicked.classList.contains('stayBack') && !lastClick.classList.contains('stayBack')){
                rotateBack(lastIndex, index)
            }
            lastClick = "";
            lastIndex = 0;
        }
        
        console.log(lastClick, cardsBack[index]);
        lastClick = cardsBack[index];
        lastIndex = index;
        }, 2000);
    } 
    })
});

function rotateCard(flipper) {
    if(flipper.classList.contains('showBack')) {
        flipper.classList.remove('showBack');
        flipper.setAttribute('transform', "rotateY(-180deg)")
    }else {
        flipper.classList.add('showBack');
    }
}

function rotateBack(last, click) {
    flippers[last].classList.remove('showBack');
    flippers[click].classList.remove('showBack');
    lastClick = "";
}