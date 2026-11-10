// =====================
// セーブ
// =====================

function saveGame() {

    const saveData = {

        currentStageIndex,
        collectedGoshuin

    };

    console.log("SAVE実行", saveData);

    localStorage.setItem(
        "henroShooterSave",
        JSON.stringify(saveData)
    );

}

// =====================
// ロード
// =====================

function loadGame() {

    const saveData =
        localStorage.getItem(
            "henroShooterSave"
        );

    if (!saveData) return false;

    const data =
        JSON.parse(saveData);

    currentStageIndex =
        data.currentStageIndex || 0;

    collectedGoshuin =
        data.collectedGoshuin || [];

    return true;
}

// =====================
// セーブ削除
// =====================

function deleteSave() {

    localStorage.removeItem(
        "henroShooterSave"
    );

}

newGameBtn.addEventListener("click", () => {

    localStorage.removeItem("henroShooterSave");

    window.location.href = "index.html";

});

continueBtn.addEventListener("click", () => {

    window.location.href = "index.html";

});