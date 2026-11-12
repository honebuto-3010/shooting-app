document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        playSE("pause");

        setTimeout(() => {

        stopBGM();

        localStorage.removeItem(
            "henroShooterSave"
        );

        window.location.href = 
            "index.html?newgame=true";

        }, 500);        

    });

document
    .getElementById("continueBtn")
    .addEventListener("click", () => {

        playSE("pause");

        setTimeout(() => {

        stopBGM();

        window.location.href =
            "index.html?continue=true";

        }, 500);        

    });

const continueBtn =
    document.getElementById(
        "continueBtn"
    );

if (
    !localStorage.getItem(
        "henroShooterSave"
    )
) {

    continueBtn.disabled = true;

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("クリック検出");
});

let titleBGMStarted = false;

function startTitleBGM() {

    if (titleBGMStarted) return;

    titleBGMStarted = true;

    console.log("タイトルBGM開始");

    playBGM("title");
}

/*
document.addEventListener("click", startTitleBGM, { once: true });
document.addEventListener("touchstart", startTitleBGM, { once: true });*/
document.addEventListener("pointerdown", startTitleBGM,{once: true});

document.addEventListener("visibilitychange" , () => {

    if (document.hidden) {
        stopBGM();
    }
});

window.addEventListerer("pagehide" , () => {

    stopBGM();
});    
    
const goshuinBtn =
    document.getElementById("goshuinBtn");

if (goshuinBtn) {

    goshuinBtn.addEventListener("click" ,() => {

        playSE("pause");

        setTimeout(() => {

        window.location.href = "goshuin.html";

        },300);

    });
}    
    
