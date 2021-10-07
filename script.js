const dino = document.querySelector(".dino")
const background = document.querySelector(".background")
let isJumping = false
let position = 0

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump()
        }
        
    }
}//handleKeyUp

function jump(){
    isJumping = true

    let upInterval = setInterval( () => {
        if(position >= 150){
            clearInterval(upInterval)
            //Descendo
            let downInterval = setInterval( () => {
                position -= 20
                dino.style.bottom = `${position}px`
                if(position === 0){
                    clearInterval(downInterval)
                    isJumping = false
                }
            }, 20)
        } else {
            //Subindo
            position += 20
            dino.style.bottom = `${position}px`
        }
    }, 20)
}//jump

function createCactus(){
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * 6000

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftInterval = setInterval( () => {
        cactusPosition -= 1 
        cactus.style.left = `${cactusPosition}px`

        if(cactusPosition < -60){
            clearInterval(leftInterval)
            background.removeChild(cactus)
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game Over
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class="gameover">Fim de Jogo</h1>'
        } else {
            cactusPosition -= 10
            cactus.style.left = `${cactusPosition}px`
        }

    }, 20)

    setTimeout(createCactus, randomTime)

} //createCactus

createCactus()
document.addEventListener('keyup', handleKeyUp)