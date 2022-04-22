const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isGameOver = false;
let position = 0;


function handKeyUp(event){
    if(event.keyCode === 32){
        if (!isJumping) {
        jump();
    }
    }
}
function jump(){
    isJumping = true;


    let upInterval = setInterval(() =>{
        if (position >= 150){
            clearInterval(upInterval);
            //
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else {
                position -= 70;
                dino.style.bottom = position + 'px';
                } 
            }, 30);
        }else{
        //
        position += 70;
        dino.style.bottom = position + 'px';
        }
    }, 30);
}

function createBarril(){
    const barril = document.createElement('div');
    let barrilPosition = 1000;
    let randowTime = Math.random() * 6000;

    if (isGameOver) return;

    barril.classList.add('barril');
    background.appendChild(barril);
    barril.style.left = 1000 + 'px';

    let leftInterval = setInterval(() =>{
        barrilPosition -= 10;
        barril.style.left = barrilPosition + 'px';

        if(barrilPosition <= -60){
            clearInterval(leftInterval);
            background.removeChild(barril);
        }else if (barrilPosition > 0 && barrilPosition < 60 && position < 60){
            clearInterval(leftInterval);
            isGameOver = true;  
            document.body.innerHTML ='<h1 class="game-over" onClick="window.location.reload()">Fim de Jogo</h1>';
            return;
        } else {
            barrilPosition -= 10;
        barril.style.left = barrilPosition + 'px';
        }
    },30);
    setTimeout(createBarril, randowTime);
}
createBarril();
document.addEventListener ('keyup', handKeyUp);