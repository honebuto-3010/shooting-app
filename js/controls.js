// ==========================================
// 入力管理
// ==========================================

// キーボード入力
const keys = {};

// スマホ入力
let moveLeft = false;
let moveRight = false;

// ==========================================
// キーボード
// ==========================================

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// ==========================================
// スマホ左右ボタン
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");

    if (leftBtn) {

        leftBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();

            if (!bgmStarted) {
                bgmStarted = true;
                playBGM("stage");
            }
            moveLeft = true;
        });

        leftBtn.addEventListener("touchend", () => {
            moveLeft = false;
        });

        leftBtn.addEventListener("touchcancel", () => {
            moveLeft = false;
        });
    }

    if (rightBtn) {

        rightBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();

            if (!bgmStarted) {
                bgmStarted = true;
                playBGM("stage");
            }
            moveRight = true;
        });

        rightBtn.addEventListener("touchend", () => {
            moveRight = false;
        });

        rightBtn.addEventListener("touchcancel", () => {
            moveRight = false;
        });
    }

});

// ==========================================
// 自動発射
// ==========================================

setInterval(() => {

    if (
        !gameOver &&
        !stageCleared &&
        player
    ) {

        if (paused) return;

        bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y,
            width: 4,
            height: 10,
            color: "#00ffff"
        });

        playSE("shot");
    }

}, 500);

document.addEventListener("DOMContentLoaded", () => {

    const pauseBtn = document.getElementById("pauseBtn");

    if (pauseBtn) {

        pauseBtn.addEventListener("click", () => {

            paused = !paused;

            if (paused) {
                pauseBtn.textContent = "▶ RESUME";

                titleBtn.style.display = "inline-block";


                playSE("pause");

                stopBGM();

            } else {
                pauseBtn.textContent = "⏸ PAUSE";

                titleBtn.style.display = "none";

                playSE("restart");

                if (bossSpawned) {
                    playBGM("boss");
                }else {
                    playBGM("stage");
                }

                console.log("RESUME");
            }

        });

    }

    if (titleBtn) {
         
        titleBtn.addEventListener("click" , () => {

            saveGame();

            stopBGM();

            window.location.href = "title.html";
        });
        
    }

});

const restartBtn =
    document.getElementById("restartBtn");

if (restartBtn) {

    restartBtn.addEventListener("click", () => {

        playSE("restart");

        resetGame(false);

    });

}

let bgmStarted = false;

window.addEventListener("keydown", () => {

    if (!bgmStarted) {
        bgmStarted = true;
        playBGM("stage");
    }

});

/*function startStageBGM() {

    if (bgmStarted) return;

    bgmStarted = true;
    playBGM("stage");
}

startButton.addEventListener("click", () => {

    playBGM("stage");

    resetGame(true);

});*/
