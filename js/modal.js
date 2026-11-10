/**
 * 数値を漢数字に変換する補助関数
 */
function convertToKanji(num) {
    const kanjiNums = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

    if (num <= 10) return kanjiNums[num];

    if (num < 20) {
        return `十${kanjiNums[num % 10] === '〇' ? '' : kanjiNums[num % 10]}`;
    }

    const tens = Math.floor(num / 10);
    const ones = num % 10;

    return `${kanjiNums[tens]}十${ones === 0 ? '' : kanjiNums[ones]}`;
}

/**
 * 御朱印モーダル表示
 */

function showGoshuinModal() {

    playSE("clear");

    console.log("御朱印モーダルを起動します。現在のIndex:", currentStageIndex);

    if (currentStageIndex >= TEMPLES.length) {
        console.warn("Indexが範囲外だったため、0にリセットしました");
        currentStageIndex = 0;
    }

    const currentTemple = TEMPLES[currentStageIndex];

    if (!currentTemple) {
        console.error("【致命的エラー】霊場データが取得できません。Index:", currentStageIndex);
        alert("巡礼データの読み込みに失敗しました。");
        return;
    }

    const modal = document.getElementById("goshuinModal");
    const templeNameEl = document.getElementById("modalTempleName");
    const stageNumEl = document.getElementById("modalStageNum");

    if (templeNameEl && stageNumEl && modal) {

        templeNameEl.textContent = currentTemple.name;

        const kanjiNum =
            typeof convertToKanji === "function"
                ? convertToKanji(currentTemple.id)
                : currentTemple.id;

        stageNumEl.textContent =
            `第 ${kanjiNum} 番札所 (${currentTemple.prefecture})`;

        modal.classList.add("active");
        modal.style.display = "flex";
    }
}

/**
 * モーダルを閉じて次の札所へ進む
 */
function closeGoshuinModal() {

    const modal = document.getElementById("goshuinModal");

    if (modal) {
        modal.classList.remove("active");
        modal.style.display = "none";
    }

    currentStageIndex++;

    saveGame();

    if (currentStageIndex >= TEMPLES.length) {
        alert("祝・結願！すべての霊場を巡礼しました！");
        currentStageIndex = 0;
    }

    if (typeof initNextStage === "function") {
        initNextStage();
    }

    // 次ステージ用にリセット
    stageCleared = false;
    score = 0;
    bossSpawned = false;

    bullets.length = 0;
    enemies.length = 0;
    bossBullets.length = 0;

    boss.y = -100;

    console.log("次ステージ開始");
    console.log("stageCleared=", stageCleared);
    console.log("currentStageIndex=", currentStageIndex);
}

/**
 * モーダル関連イベント
 */
document.addEventListener("DOMContentLoaded", () => {

    const closeBtn = document.getElementById("modalCloseBtn");

    if (closeBtn) {
        closeBtn.addEventListener("click", closeGoshuinModal);
    }

    // 開発用テスト
    window.addEventListener("keydown", (e) => {

        if (e.key === "g" || e.key === "G") {
            showGoshuinModal();
        }

    });

});