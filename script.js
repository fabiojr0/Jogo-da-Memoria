const cardsImages = [
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

const cards = document.querySelectorAll('.cardImg');

function shuffleCards() {
    for(let i = 0; i < 8; i++){
        let cont = 0
        for(let index = 0; index < 16; index++){
            cards[sorteados[index]].setAttribute('data-id', `${cardsImages[i].id}`);
            cont++
            if (cont == 2) {
                cont=0;
                i++;
            }
        };   
    };
}
shuffleCards()


var lastId
var lastIndex=-1
var playable = true
cards.forEach(function(card, index){
    card.addEventListener('click', (infos) =>{
        if(playable == true && !cards[index].classList.contains('found')){
            
            var click = cards[index];
            var clickId = click.getAttribute('data-id')
            var cardImage = photoOfId(clickId)
            
            click.setAttribute('src', `photos/${cardImage}`);
    
            var match = checkCards(clickId, lastId)
            if (lastIndex >= 0 && lastIndex != index) {
                playable = false
                if (match == false) {
                    backCard(index);
                    backCard(lastIndex);                
                } else {
                    cardFounded(index)
                    cardFounded(lastIndex)
                }
                lastIndex = -1
            }
            else{
                lastId = clickId;
                lastIndex = index
            }
        }  
    })
});

function photoOfId(id) {
    let photo
    cardsImages.forEach((image) =>{
        if (Number(id) == image.id) {
            photo = image.img
        }
    })
    return photo
}

function checkCards(id, lastId = -1) {
    let match = false
    id == lastId ? match = true : match = false
    return match
}

function backCard(index) {
    cards[index].classList.add('wrong')
    setTimeout(()=>{
        cards[index].setAttribute('src', `photos/Jogo da memória.png`);
        playable = true
        cards[index].classList.remove('wrong')
    },1000)
}

function cardFounded(index) {
    cards[index].classList.add('found')
    playable = true
}