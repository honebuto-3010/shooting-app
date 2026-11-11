//==========================================
// BGM
//==========================================
const bgm = {
    stage: new Audio("sounds/stage.mp3"),
    boss: new Audio("sounds/boss.mp3"),
    title: new Audio("sounds/title.mp3")
};

bgm.stage.loop = true;
bgm.boss.loop = true;
bgm.title.loop = true;

//==========================================
//SE
//==========================================
const se = {
    shot: new Audio("sounds/shot.mp3"),
    enemyHit: new Audio("sounds/enemyHit.mp3"),
    damage: new Audio("sounds/damage.mp3"),
    clear: new Audio("sounds/clear.mp3"),
    pause: new Audio("sounds/pause.mp3"),
    restart: new Audio("sounds/restart.mp3"),
    gameOver: new Audio("sounds/gameover.mp3"),
    daishi: new Audio("sounds/daishi.mp3")
};

se.shot.volume = 0.2;
//==========================================
//BGM再生
//==========================================
function playBGM(name) {

    stopBGM();

    if(!bgm[name]) return;

    bgm[name].currentTime = 0;
    bgm[name].play();
}

///========================================
//BGM停止
//=========================================
function stopBGM() {

    Object.values(bgm).forEach(audio => {

        audio.pause();
        audio.currentTime = 0;

    });
}

//========================================
//SE再生
//========================================
function playSE(name) {

    if (!se[name]) return;

    se[name].currentTime = 0;
    se[name].play();
}
