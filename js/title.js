document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        localStorage.removeItem(
            "henroShooterSave"
        );

        window.location.href = 
            "index.html?newgame=true";

    });

document
    .getElementById("continueBtn")
    .addEventListener("click", () => {

        window.location.href =
            "index.html?continue=true";

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