const backgroundElement = document.getElementById("background");
const flexSlider = document.getElementById("flexSlide");
const choicesFlex = document.getElementById("choicesFlex");
const btnEtapes = document.getElementById("btnEtapes");

var botChoice;
var whoWin;

var fireworks = []

function playerObject(){
    this.inaction = false;
    this.changeSlide = false
    this.choice = 0;
    this.score = { moi : 0, bot : 0 }
    this.changeStatus = function(){
        backgroundElement.classList.toggle("inAction")
    }
    this.inAction = function(status){
        if (status) {
            this.inaction = status;
        } else {
            return this.inaction;
        }
    }
    this.resetScore = function() {
        this.score = { moi : 0, bot : 0 }
    }
    this.getMyScore = function() {
        return this.score.moi
    }
    this.getBotScore = function() {
        return this.score.bot
    }
}

var player = new playerObject();

function changeSlide(action){
    if (!player.changeSlide) {
        player.changeSlide = true;
        flexSlider.classList.toggle("animate__animated")
        flexSlider.classList.toggle("animate__backOutLeft")

        setTimeout(() => {
            if (action == "build") {
                buildGame();
            } else if (action == "launch") {
                buildResult();
            } else if (action == "botwin") {
                botWin();
            } else if (action == "playerwin") {
                playerWin()
            }
            
            flexSlider.classList.toggle("animate__backOutLeft")
            flexSlider.classList.toggle("animate__backInRight")
            setTimeout(() => {
                flexSlider.classList.toggle("animate__backInRight")
                flexSlider.classList.toggle("animate__animated")
                player.changeSlide = false;
            }, 1000);
        }, 500);
    }
}

function getImage(choix){
    switch (choix) {
        case 1:
            return "img/paper.png";
        case 2:
            return "img/rock.png";
        case 3:
            return "img/scissors.png";
    }
}

function buildResult() {
    var txt = "";
        txt += "<p class='text-white fs-4 fw-bold mb-4'>Voici les résultats de la partie :</p>"
        if (whoWin != "Egalité") {
            txt += "<p class='text-white fs-4 mb-4'>Le gagnant est : "+whoWin+"</p>"
        } else {
            txt += "<p class='text-white fs-4 mb-4'>Vous avez fait le même choix ! Egalité !</p>"
        }
        txt += "<div class='d-flex flex-row justify-content-around align-items-center w-100 my-5'>"
            txt += "<a class='hover-click'><img src="+getImage(player.choice)+" alt='Papier' width='128px' height='128px'/></a>"
            if (whoWin == "Player") {
                txt += "<p class='text-white fs-1 fw-bold mb-4'>></p>"
            } else if (whoWin == "Le noob d'ordi") {
                txt += "<p class='text-white fs-1 fw-bold mb-4'><</p>"
            } else {
                txt += "<p class='text-white fs-1 fw-bold mb-4'>=</p>"
            }
            txt += "<a class='hover-click'><img src="+getImage(botChoice)+" alt='Ciseaux' width='128px' height='128px'/></a>"
        txt += "</div>"
        txt += "<p class='text-white fs-5 fw-bold mt-4'>Moi : "+player.getMyScore()+" | Le noob d'ordi : "+player.getBotScore()+"</p>"
    choicesFlex.innerHTML = txt;

    setTimeout(() => {
        if (player.getMyScore() >= 5) {
            changeSlide("playerwin");
        } else if (player.getBotScore() >= 5) {
            changeSlide("botwin");
        } else {
            changeSlide("build");
        }
        
    }, 3000);
}

function launchGame(choice) {
    player.choice = choice;
    botChoice = Math.floor(Math.random() * 3) + 1;
    if (player.choice == botChoice) {
        whoWin = "Egalité"
    } else if ((player.choice === 2 && botChoice === 3) || (player.choice === 3 && botChoice === 1) || (player.choice === 1) && (botChoice === 2)) {
        whoWin = "Player"
    } else {
        whoWin = "Le noob d'ordi"
    }

    if (whoWin == "Player") {
        player.score.moi += 1;
    } else if (whoWin == "Le noob d'ordi") {
        player.score.bot += 1;
    }
    changeSlide("launch");
}

function botWin(){
    var txt = "";
    txt += "<img src='img/loser.gif' width='450px' height='450px' alt='LOSER TEXT'/>"
    txt += "<img src='img/giphy.gif' alt='LOSER GIF'/>"
    choicesFlex.innerHTML = txt;
    setTimeout(() => {
        fireworks.forEach(element => {
            element.remove();
        });
        fireworks = [];
        player.resetScore()
        changeSlide("build");
    }, 5000);
}

function playerWin(){
    var txt = "<p class='text-white fs-2 fw-bold mb-4'>Vous avez gagné !</p>"
    choicesFlex.innerHTML = txt;
    for (let index = 1; index < 5; index++) {
        var firework = document.createElement("div");
        firework.classList.add("firework");
        fireworks.push(firework)
        backgroundElement.appendChild(firework);
    }
    setTimeout(() => {
        fireworks.forEach(element => {
            element.remove();
        });
        fireworks = [];
        player.resetScore()
        changeSlide("build");
    }, 5000);
}

function buildGame() {
    btnEtapes.style.display = "none";

    var txt = "";
        txt += "<p class='text-white fs-2 fw-bold mb-4'>Sélectionner votre arme !</p>"
        txt += "<div class='d-flex flex-row justify-content-around align-items-center w-100 my-5'>"
            txt += "<a class='hover-click' onclick='launchGame(1)'><img src='img/paper.png' alt='Papier' width='128px' height='128px'/></a>"
            txt += "<a class='hover-click' onclick='launchGame(2)'><img src='img/rock.png' alt='Pierre' width='128px' height='128px'/></a>"
            txt += "<a class='hover-click' onclick='launchGame(3)'><img src='img/scissors.png' alt='Ciseaux' width='128px' height='128px'/></a>"
        txt += "</div>"
        txt += "<p class='text-white fs-5 fw-bold mt-4'>Moi : "+player.getMyScore()+" | Le noob d'ordi : "+player.getBotScore()+"</p>"
    choicesFlex.innerHTML = txt;
}

function ETAPES_1() {
    player.inAction(true);
    player.changeStatus();
    changeSlide("build");
}
