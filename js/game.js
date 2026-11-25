// ==========================================
// Canvas
// ==========================================

const canvas = document.getElementById("gameCanvas");

canvas.width = 450;
canvas.height = 650;

const ctx = canvas.getContext("2d");

// ==========================================
// ゲーム状態
// ==========================================

let score = 0;
let gameOver = false;

let currentStageIndex = 0;
let currentStage = 1;

let bossSpawned = false;
let stageCleared = false;

let gateWidth = 0;
let gateState = "closed";

let paused = false;


// ==========================================
// 御朱印コレクション
// ==========================================

let collectedGoshuin = [];

// ==========================================
// プレイヤー
// ==========================================

const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    speed: 5,
    color: "#00ffcc"
};

// ==========================================
// ボス
// ==========================================

const boss = {
    x: 0,
    y: -100,
    width: 60,
    height: 60,
    speed: 1.5,
    direction: 1,
    hp: 10,
    maxHp: 10,
    color: "#ff00ff"
};

// ==========================================
// 弾
// ==========================================

const bullets = [];
const bulletSpeed = 7;

// ==========================================
// 敵
// ==========================================

const enemies = [];
const enemySpeed = 2;
let spawnTimer = 0;

// =========================================
//大師さま
// =========================================
let daishiList = [];
let daishiCount = 0;       //獲得した大師さまの数（追加）
const daishiTarget = 5;    //ボス出現に必要な数　(追加）

// ==========================================
// ボス弾
// ==========================================

const bossBullets = [];
const bossBulletSpeed = 4;

// ==========================================
//スマホのスクロールを完全禁止
// =========================================
document.addEventListener(
    "touchmove",
    (e) => {
        e.preventDefault();
    },
    { passive: false }
);

// ==========================================
// キー入力
// ==========================================

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

window.addEventListener("keydown", (e) => {

    if (e.key === " " && !gameOver && !stageCleared) {

        bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y,
            width: 4,
            height: 10,
            color: "#ff0055"
        });

    }

    if (e.key === "r" && gameOver) {

        playBGM("stage");

        resetGame(true);
    }
});

// ==========================================
// 汎用関数
// ==========================================

function checkCollision(rect1, rect2) {

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function getCurrentTempleName() {

    const currentTemple = TEMPLES[currentStageIndex];

    return currentTemple
        ? currentTemple.name
        : "不明";
}

function getBossKanjiNumber() {

    const temple = TEMPLES[currentStageIndex];

    return temple
        ? convertToKanji(temple.id)
        : "主";
}

// ==========================================
// ステージ管理
// ==========================================

function initNextStage() {

    playBGM("stage");

    const currentTemple = TEMPLES[currentStageIndex];

    if (!currentTemple) return;

    const mainTempleNameEl =
        document.getElementById("gameTempleName");

    if (mainTempleNameEl) {
        mainTempleNameEl.textContent =
            currentTemple.name;
    }

    console.log(
        `次のステージを読み込みました: ${currentTemple.name}`
    );
}

// ==========================================
// ザコ敵を生成
// ==========================================
function spawnEnemy() {
    // 煩悩の3種類と、それぞれのイメージカラーを設定
    const bonnoList = [
        { type: "欲", color: "#9c36b5" }, // 欲：妖しい紫色
        { type: "怒", color: "#d93829" }, // 怒：燃える赤色
        { type: "痴", color: "#343a40" }  // 痴：迷いの濃いグレー
    ];

    const selected = bonnoList[Math.floor(Math.random() * bonnoList.length)];

    enemies.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        type: selected.type,
        color: selected.color
    });
}
// =========================================
//お大師さまを生成
// =========================================
function spawnDaishi() {

    daishiList.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        speed: 0.5
    });
}
// ==========================================
// ボス出現
// ==========================================

function spawnBoss() {

    playBGM("boss");

    bossSpawned = true;

    boss.x = canvas.width / 2 - boss.width / 2;
    boss.y = 50;

    const stageNo = currentStageIndex + 1;

    boss.hp = 10 + (stageNo * 2);
    boss.maxHp = boss.hp;

    boss.speed = 1.5 + (stageNo * 0.1);

    boss.direction = 1;

    gateWidth = canvas.width / 2;
    gateState = "opening";

    console.log(
        `ボス出現: ${getCurrentTempleName()} HP:${boss.hp}`
    );

}

function startNextStage() {

    playBGM("stage");

    stageCleared = false;
    bossSpawned = false;

    score = 0;
    daishiCount = 0; //大師さま獲得数リセット

    bullets.length = 0;
    enemies.length = 0;
    bossBullets.length = 0;
    daishiList.length = 0; //画面に残っている大師さまも消す

    boss.y = -100;

    gateWidth = 0;
    gateState = "closed";

    player.x = canvas.width / 2 - 15;
    player.y = canvas.height - 50;

    console.log("次ステージ開始");
}

// ==========================================
// リセット
// ==========================================

function resetGame(fullReset = false) {

    if (bgmStarted) {
        playBGM("stage");
    }

    if (fullReset) {

        currentStageIndex = 0;

        collectedGoshuin.length = 0;
    }

    score = 0;
    daishiCount = 0; //大師さま獲得数をリセット
    gameOver = false;

    stageCleared = false;
    bossSpawned = false;

    gateWidth = 0;
    gateState = "closed";

    player.x = canvas.width / 2 - 15;
    player.y = canvas.height - 50;

    bullets.length = 0;
    enemies.length = 0;
    bossBullets.length = 0;
    daishiList.length = 0; //画面に残っている大師さまも消す

    boss.y = -100;
}

// メインのゲームループ
function animate() {
    requestAnimationFrame(animate);

    if (!gameOver) {
        document.getElementById("restartBtn").style.display = "none";
    }

    //ポーズボタンと再開ボタンの実装
    if (paused) {

        ctx.fillStyle = "white";
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";

        ctx.fillText(
            "PAUSE",
            canvas.width / 2,
            canvas.height / 2
        );

        return;
    }

    // A. ゲームオーバー画面の描画
    if (gameOver) {

        document.getElementById("restartBtn").style.display = "block";
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "24px Arial, sans-serif";
        ctx.fillText("GAME OVER", canvas.width / 2 - 70, canvas.height / 2 - 40);

        ctx.fillStyle = "#ffcc00";
        ctx.font = "16px Arial, sans-serif";
        ctx.fillText(`集めた御朱印: ${collectedGoshuin.length} / 88 枚`, canvas.width / 2 - 85, canvas.height / 2 + 10);

        ctx.fillStyle = "white";
        ctx.fillText("RESTARTボタンで再挑戦", canvas.width / 2 - 70, canvas.height / 2 + 50);
        return;
    }

    // B. ステージクリアモーダル表示中の背景描画
    if (stageCleared) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }

    // --- ここから通常のゲーム計算・描画 ---
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //背景画像の描画
    updateBackground();
    drawBackground();

    // 1. プレイヤーの移動処理
    if ((keys["ArrowLeft"] || keys["a"] || moveLeft) && player.x > 0) {
        player.x -= player.speed;
    }
    if ((keys["ArrowRight"] || keys["d"] || moveRight) && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // プレイヤーの描画（お遍路さん）
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.x + 5, player.y + 10, player.width - 10, player.height - 10);
    ctx.fillStyle = "#e0b060";
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x, player.y + 12);
    ctx.lineTo(player.x + player.width, player.y + 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(player.x + player.width - 4, player.y + 12, 3, player.height - 12);

    // 2. 弾の移動と描画（お札ミサイル）
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bulletSpeed;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
        ctx.strokeStyle = "#cc3333";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bullets[i].x + bullets[i].width / 2, bullets[i].y + 2);
        ctx.lineTo(bullets[i].x + bullets[i].width / 2, bullets[i].y + bullets[i].height - 2);
        ctx.stroke();

        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }

    // 3. 敵（ザコ・ボス）の出現と管理
    if (score >= 100 && daishiCount >= daishiTarget && !bossSpawned) {
        spawnBoss();
    }

    spawnTimer++;
    if (!bossSpawned) {
        if (spawnTimer % 40 === 0) {
            spawnEnemy();
        }

        //お大師さま出現
        if (spawnTimer % 100 === 0) {
            spawnDaishi();
        }

    } else {
        if (spawnTimer % 120 === 0) {
            spawnEnemy();
        }
    }

    // ボスが存在する場合の移動と描画
    if (bossSpawned) {
        // 門が閉まっている間はボスは動かない
        if (gateState === "open") {
            boss.x += boss.speed * boss.direction;
            if (boss.x <= 0 || boss.x >= canvas.width - boss.width) {
                boss.direction *= -1;
            }
        }

        // --- ボスのグラフィック（御朱印の呪印）描画 ---
        let pulse = Math.sin(spawnTimer * 0.15) * 6;
        ctx.fillStyle = "rgba(40, 0, 10, 0.4)";
        ctx.beginPath();
        ctx.arc(boss.x + boss.width / 2, boss.y + boss.height / 2, boss.width / 2 + 25 + pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(20, 20, 20, 0.9)";
        ctx.fillRect(boss.x - 5, boss.y - 5, boss.width + 10, boss.height + 10);
        ctx.strokeStyle = "#cc3333";
        ctx.lineWidth = 4;
        ctx.strokeRect(boss.x, boss.y, boss.width, boss.height);
        ctx.lineWidth = 1;
        ctx.strokeRect(boss.x + 5, boss.y + 5, boss.width - 10, boss.height - 10);

        ctx.fillStyle = "#cc3333";
        ctx.font = "10px sans-serif";
        ctx.fillText("卍", boss.x + 8, boss.y + 18);
        ctx.fillText("卍", boss.x + boss.width - 18, boss.y + 18);
        ctx.fillText("卍", boss.x + 8, boss.y + boss.height - 8);
        ctx.fillText("卍", boss.x + boss.width - 18, boss.y + boss.height - 8);

        let bossText = getBossKanjiNumber();
        ctx.fillStyle = "#000000";
        ctx.font = "bold 42px 'Hiragino Mincho ProN', 'MS Mincho', serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(bossText, boss.x + boss.width / 2 + 3, boss.y + boss.height / 2 + 3);

        ctx.fillStyle = "#e5af42";
        ctx.fillText(bossText, boss.x + boss.width / 2, boss.y + boss.height / 2);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";

        // ボスのHPバー描画
        ctx.fillStyle = "red";
        ctx.fillRect(boss.x, boss.y - 15, boss.width, 6);
        ctx.fillStyle = "green";
        ctx.fillRect(boss.x, boss.y - 15, boss.width * (boss.hp / boss.maxHp), 6);

        // 自機とボスの衝突判定
        if (checkCollision(player, boss) && gateState === "open") {
            gameOver = true;
        }

        // 弾とボスの衝突判定（門が開いている時だけ当たる）
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (checkCollision(bullets[j], boss) && gateState === "open") {

                playSE("damage", 0.5); //仮のBGM設定中

                bullets.splice(j, 1);
                boss.hp--;
                if (boss.hp <= 0 && !stageCleared) {
                    boss.hp = 0;
                    stageCleared = true;
                    bossSpawned = false;

                    stopBGM();

                    if (!collectedGoshuin.includes(getCurrentTempleName())) {
                        collectedGoshuin.push(getCurrentTempleName());

                        console.log("御朱印追加", collectedGoshuin);

                        localStorage.setItem(
                            "collectedGoshuin",
                            JSON.stringify(collectedGoshuin)
                        );

                        console.log(
                            "保存確認",
                            localStorage.getItem("collectedGoshuin")
                        );
                    }

                    showGoshuinModal();
                    break;
                }
            }
        }

        // --- ボスの攻撃処理（門が開いている時だけ発射・移動） ---
        if (gateState === "open") {
            if (spawnTimer % 50 === 0) {
                bossBullets.push({
                    x: boss.x + boss.width / 2 - 8,
                    y: boss.y + boss.height,
                    width: 16,
                    height: 16,
                    color: "#cc0000",
                    text: "怨"
                });
            }
        }
        for (let k = bossBullets.length - 1; k >= 0; k--) {
            const b = bossBullets[k];
            b.y += bossBulletSpeed;

            // --- ここから鬼火の描画 ---
            let fireColor = "#d6336c"; // 昼（青背景に映える鮮やかな赤紫）
            if (timeOfDay === "evening") {
                fireColor = "#7048e8"; // 夕方（オレンジ背景にくっきり見える濃い紫）
            } else if (timeOfDay === "night") {
                fireColor = "#22b8cf"; // 夜（暗闇に怪しく光る青白い人魂）
            }

            const w = b.width || 16;
            const h = b.height || 16;
            const centerX = b.x + w / 2;
            const centerY = b.y + h / 2;
            const radius = Math.min(w, h) * 0.45;

            // 1. 外側の炎
            ctx.fillStyle = fireColor;
            ctx.strokeStyle = "#1a1a1a";
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.arc(centerX, centerY + 2, radius, 0, Math.PI * 2);
            ctx.moveTo(centerX - radius, centerY + 2);
            ctx.lineTo(centerX, b.y);
            ctx.lineTo(centerX + radius, centerY + 2);
            ctx.fill();
            ctx.stroke();

            // 2. 中心の白い光の芯
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(centerX, centerY + 2, radius * 0.5, 0, Math.PI * 2);
            ctx.fill();
            // --- ここまで鬼火の描画 ---

            if (checkCollision(player, b)) {
                stopBGM();
                playSE("gameOver");
                gameOver = true;
            }
            if (b.y > canvas.height) {
                bossBullets.splice(k, 1);
            }
        }
    } // ← これが「if (bossSpawned) {」を閉じる大事なカッコです！

    // --- 「開門」アニメーション演出 ---
    if (gateState === "opening") {
        if (gateWidth > 0) {
            gateWidth -= 4;
        } else {
            gateWidth = 0;
            gateState = "open";
        }
    }

    if (gateState === "opening" && gateWidth > 0) {
        ctx.fillStyle = "#3a2214";
        ctx.fillRect(0, 0, gateWidth, canvas.height);
        ctx.strokeStyle = "#cc3333";
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, gateWidth, canvas.height);

        ctx.fillRect(canvas.width - gateWidth, 0, gateWidth, canvas.height);
        ctx.strokeRect(canvas.width - gateWidth, 0, gateWidth, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 40px 'Hiragino Mincho ProN', 'MS Mincho', serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("開 門", canvas.width / 2, canvas.height / 2);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
    }

    // 4. ザコ敵(笠おばけ、カラス天狗、提灯おばけ）の移動と描画、衝突判定
    // ==========================================
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += enemySpeed;

        // ★季節ごとの特殊な動き（秋は落ち葉のように左右にゆらゆら揺れる）
        if (season === "autumn") {
            enemy.x += Math.sin(enemy.y * 0.05 + i) * 0.8;
        }

        const centerX = enemy.x + 15;
        const centerY = enemy.y + 15;

        if (season === "autumn") {
            // ====================================
            // ---(秋・紅葉ステージ)落ち葉お化け（木の葉天狗） ----
            // ====================================
            const sway = Math.sin(Date.now() * 0.01 + i) * 3;

            //左右の紅葉の羽（オレンジの葉っぱ）
            ctx.fillStyle = "#f27d24";
            ctx.beginPath();
            ctx.moveTo(centerX - 6, centerY);
            ctx.lineTo(centerX - 18, centerY - 6 + sway);
            ctx.lineTo(centerX - 12, centerY + 6 + sway);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX + 6, centerY);
            ctx.lineTo(centerX + 18, centerY - 6 - sway);
            ctx.lineTo(centerX + 12, centerY + 6 - sway);
            ctx.closePath();
            ctx.fill();

            // 体（真っ赤なモミジの葉の重なり）
            ctx.fillStyle = "#d93829";
            ctx.beginPath();
            ctx.moveTo(centerX, enemy.y + 2);        // 葉の先端（上）
            ctx.lineTo(enemy.x + 26, centerY + 2);   // 右の葉先
            ctx.lineTo(centerX + 6, enemy.y + 28);   // 右下
            ctx.lineTo(centerX - 6, enemy.y + 28);   // 左下
            ctx.lineTo(enemy.x + 4, centerY + 2);    // 左の葉先
            ctx.closePath();
            ctx.fill();

            // 中心の黄色の葉っぱ模様（アクセント）
            ctx.fillStyle = "#f2c94c";
            ctx.fillRect(centerX - 5, centerY - 4, 10, 10);

            // 天狗の小さなお面・目つき
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(centerX - 6, centerY - 3, 4, 4);
            ctx.fillRect(centerX + 2, centerY - 3, 4, 4);
            ctx.fillStyle = "#111111";
            ctx.fillRect(centerX - 4, centerY - 2, 2, 2);
            ctx.fillRect(centerX + 3, centerY - 2, 2, 2);

            // 木の葉天狗の小さな鼻（赤）
            ctx.fillStyle = "#b71c1c";
            ctx.fillRect(centerX - 1.5, centerY, 3, 5);

        } else if (season === "winter") {
            // ==========================================
            // --- 【冬・雪山ステージ】つらら小僧 ---
            // ==========================================
            // 氷のオーラ（冷気）
            ctx.fillStyle = "rgba(180, 235, 255, 0.25)";
            ctx.beginPath();
            ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
            ctx.fill();

            // 氷柱（つらら）の本体（鋭い逆三角形）
            ctx.fillStyle = "#4fc3f7";
            ctx.beginPath();
            ctx.moveTo(enemy.x + 4, enemy.y + 5);    // 左上
            ctx.lineTo(enemy.x + 26, enemy.y + 5);   // 右上
            ctx.lineTo(centerX, enemy.y + 30);       // 鋭い先端（下）
            ctx.closePath();
            ctx.fill();

            // 氷の透明感・ハイライト（左半分を明るく）
            ctx.fillStyle = "#b3e5fc";
            ctx.beginPath();
            ctx.moveTo(enemy.x + 6, enemy.y + 6);
            ctx.lineTo(centerX, enemy.y + 6);
            ctx.lineTo(centerX, enemy.y + 28);
            ctx.closePath();
            ctx.fill();

            // 頭に積もった雪（白い雪帽子）
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(enemy.x + 3, enemy.y + 2, 24, 5);
            ctx.fillRect(enemy.x + 6, enemy.y, 18, 3);

            // 鋭い目つき（黒目＋白い光）
            ctx.fillStyle = "#01579b";
            ctx.fillRect(centerX - 6, centerY - 4, 4, 4);
            ctx.fillRect(centerX + 2, centerY - 4, 4, 4);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(centerX - 5, centerY - 3, 1.5, 1.5);
            ctx.fillRect(centerX + 3, centerY - 3, 1.5, 1.5);

            // ギザギザの口（寒そうに震える口）
            ctx.fillStyle = "#0277bd";
            ctx.fillRect(centerX - 4, centerY + 3, 8, 2);
        } else if (season === "spring") {
            // ==========================================
            // --- 【春・桜ステージ】ばけ狸（陣笠・鬼火バージョン） ---
            // ==========================================
            // 1. 妖しい青い鬼火（周囲をフワフワ浮遊する妖怪の証）
            const fireY = Math.sin(Date.now() * 0.01 + i) * 3;
            ctx.fillStyle = "rgba(0, 229, 255, 0.35)";
            ctx.beginPath();
            ctx.arc(centerX - 13, centerY - 2 + fireY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#84ffff";
            ctx.fillRect(centerX - 14, centerY - 3 + fireY, 2.5, 3);

            // 2. ふわふわの大きな尻尾（後ろ側・左右に少し揺れる）
            const tailSway = Math.sin(Date.now() * 0.012 + i) * 2;
            ctx.fillStyle = "#6d4c41";
            ctx.beginPath();
            ctx.arc(centerX + 8 + tailSway, centerY + 6, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#3e2723";
            ctx.fillRect(centerX + 5 + tailSway, centerY + 4, 6, 2);

            // 3. 体（丸っこい茶色の胴体＋ぽんぽこお腹）
            ctx.fillStyle = "#795548";
            ctx.fillRect(centerX - 8, centerY - 2, 16, 15);
            ctx.fillStyle = "#ffe0b2";
            ctx.fillRect(centerX - 6, centerY + 1, 12, 10);

            // 4. 頭とアイマスク模様
            ctx.fillStyle = "#795548";
            ctx.fillRect(centerX - 7, centerY - 10, 14, 9);
            ctx.fillStyle = "#3e2723";
            ctx.fillRect(centerX - 6, centerY - 8, 5, 4);
            ctx.fillRect(centerX + 1, centerY - 8, 5, 4);

            // 吊り上がった妖怪の赤目（怒り目）
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(centerX - 5, centerY - 7, 3, 2.5);
            ctx.fillRect(centerX + 2, centerY - 7, 3, 2.5);
            ctx.fillStyle = "#ff1744";
            ctx.fillRect(centerX - 4, centerY - 7, 1.5, 2);
            ctx.fillRect(centerX + 3, centerY - 7, 1.5, 2);
            // 吊り眉（キリッとした敵の表情）
            ctx.fillStyle = "#111111";
            ctx.fillRect(centerX - 5, centerY - 9, 4, 1.5);
            ctx.fillRect(centerX + 1, centerY - 9, 4, 1.5);

            // 口元と鼻
            ctx.fillStyle = "#ffe0b2";
            ctx.fillRect(centerX - 3, centerY - 4, 6, 3);
            ctx.fillStyle = "#111111";
            ctx.fillRect(centerX - 1, centerY - 4, 2, 2);

            // 5. 黒塗りの陣笠（じんがさ）＋金色の家紋（★敵キャラ感の決め手！）
            ctx.fillStyle = "#212121";
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - 17);       // 陣笠の頂点
            ctx.lineTo(centerX - 12, centerY - 9);   // 左のツバ
            ctx.lineTo(centerX + 12, centerY - 9);   // 右のツバ
            ctx.closePath();
            ctx.fill();

            // 陣笠の金色のフチ・紋章
            ctx.fillStyle = "#fbc02d";
            ctx.fillRect(centerX - 11, centerY - 10, 22, 1.5);
            ctx.fillRect(centerX - 1.5, centerY - 14, 3, 3);

        } else {
            // ==========================================
            // --- 【通常・緑ステージ】既存の昼・夕方・夜の妖怪 ---
            // ==========================================


            if (timeOfDay === "day") {
                // --- 【昼】白い笠お化け（一つ目）描画 ---
                ctx.fillStyle = "#8c583a";
                ctx.fillRect(centerX - 2, enemy.y + 18, 4, 10);
                ctx.fillRect(centerX - 5, enemy.y + 27, 10, 3);

                ctx.fillStyle = "#5c3a21";
                ctx.fillRect(centerX - 2, enemy.y, 4, 4);

                ctx.fillStyle = "#ffffff";
                ctx.strokeStyle = "#adb5bd";
                ctx.lineWidth = 1.5;

                ctx.beginPath();
                ctx.moveTo(centerX, enemy.y + 3);
                ctx.lineTo(enemy.x + 1, enemy.y + 19);
                ctx.lineTo(enemy.x + 29, enemy.y + 19);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(centerX, enemy.y + 12, 4.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "#111111";
                ctx.beginPath();
                ctx.arc(centerX, enemy.y + 13, 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#ff4d4d";
                ctx.fillRect(centerX + 2, enemy.y + 19, 4, 6);

            } else if (timeOfDay === "evening") {
                // --- 【夕方】カラス天狗 ---
                const flap = Math.sin(Date.now() * 0.015) * 4;

                ctx.fillStyle = "#1a1a1a";
                ctx.beginPath();
                ctx.moveTo(centerX - 4, centerY - 2);
                ctx.lineTo(centerX - 20, centerY - 8 + flap);
                ctx.lineTo(centerX - 13, centerY + 6 + flap);
                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(centerX + 4, centerY - 2);
                ctx.lineTo(centerX + 20, centerY - 8 + flap);
                ctx.lineTo(centerX + 13, centerY + 6 + flap);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "#263238";
                ctx.fillRect(centerX - 6, centerY - 3, 12, 14);
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(centerX - 4, centerY, 2, 2);
                ctx.fillRect(centerX + 2, centerY, 2, 2);
                ctx.fillRect(centerX - 4, centerY + 5, 2, 2);
                ctx.fillRect(centerX + 2, centerY + 5, 2, 2);

                ctx.fillStyle = "#111111";
                ctx.fillRect(centerX - 6, centerY - 12, 12, 9);

                ctx.fillStyle = "#d32f2f";
                ctx.fillRect(centerX - 3, centerY - 16, 6, 4);

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(centerX - 4, centerY - 10, 3, 2);
                ctx.fillRect(centerX + 1, centerY - 10, 3, 2);
                ctx.fillStyle = "#ff1744";
                ctx.fillRect(centerX - 3, centerY - 10, 1.5, 2);
                ctx.fillRect(centerX + 2, centerY - 10, 1.5, 2);

                ctx.fillStyle = "#fbc02d";
                ctx.beginPath();
                ctx.moveTo(centerX - 3, centerY - 7);
                ctx.lineTo(centerX + 3, centerY - 7);
                ctx.lineTo(centerX, centerY - 2);
                ctx.closePath();
                ctx.fill();

            } else {
                // --- 【夜】提灯お化け ---
                const glow = 0.25 + (Math.sin(Date.now() * 0.008) + 1) * 0.1;
                ctx.fillStyle = `rgba(255, 190, 50, ${glow})`;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#e53935";
                ctx.fillRect(centerX - 10, centerY - 11, 20, 22);
                ctx.fillStyle = "#ffb300";
                ctx.fillRect(centerX - 7, centerY - 8, 14, 16);

                ctx.fillStyle = "#212121";
                ctx.fillRect(centerX - 8, centerY - 14, 16, 3);
                ctx.fillRect(centerX - 8, centerY + 11, 16, 3);
                ctx.strokeStyle = "#757575";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(centerX, centerY - 16, 3, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(centerX - 6, centerY - 7, 5, 5);
                ctx.fillRect(centerX + 1, centerY - 7, 5, 5);
                ctx.fillStyle = "#000000";
                ctx.fillRect(centerX - 4, centerY - 5, 2, 2);
                ctx.fillRect(centerX + 3, centerY - 5, 2, 2);

                ctx.fillStyle = "#212121";
                ctx.fillRect(centerX - 7, centerY + 1, 14, 4);
                ctx.fillStyle = "#ff4081";
                ctx.fillRect(centerX - 2, centerY + 3, 4, 7);
            }
        }

        // プレイヤーとザコ敵の衝突判定
        if (checkCollision(player, enemy)) {
            stopBGM();
            playSE("gameOver");
            gameOver = true;
        }

        // 弾とザコ敵の当たり判定
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (enemies[i] && checkCollision(bullets[j], enemies[i])) {
                playSE("enemyHit");
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                if (!bossSpawned) {
                    score += 10;
                }
                break;
            }
        }

        // 画面外へ出たらザコ敵を削除
        if (enemies[i] && enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
        }
    }

    // ==========================================
    // お大師さまの移動と描画（完全に独立！）
    // ==========================================
    for (let i = daishiList.length - 1; i >= 0; i--) {
        daishiList[i].y += daishiList[i].speed * 4;

        // 笠
        ctx.fillStyle = "#e0b060";
        ctx.beginPath();
        ctx.moveTo(daishiList[i].x + 12, daishiList[i].y);
        ctx.lineTo(daishiList[i].x, daishiList[i].y + 8);
        ctx.lineTo(daishiList[i].x + 24, daishiList[i].y + 8);
        ctx.closePath();
        ctx.fill();

        // 顔
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(daishiList[i].x + 7, daishiList[i].y + 8, 10, 8);

        // 袈裟
        ctx.fillStyle = "#ffff66";
        ctx.fillRect(daishiList[i].x + 6, daishiList[i].y + 16, 16, 10);

        // ① プレイヤーと大師さまの当たり判定（獲得）
        if (daishiList[i] && checkCollision(player, daishiList[i])) {
            playSE("daishi");
            daishiCount = Math.min(daishiTarget, daishiCount + 1);
            daishiList.splice(i, 1);
            console.log("お大師さま獲得！現在:", daishiCount);
            continue;
        }

        // 弾の当たり判定
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (daishiList[i] && checkCollision(bullets[j], daishiList[i])) {
                playSE("daishi");
                bullets.splice(j, 1);
                daishiList.splice(i, 1);
                console.log("お大師さま誤射！取り逃がし");
                break;
            }
        }

        // 画面外へ出たら削除
        if (daishiList[i] && daishiList[i].y > canvas.height) {
            daishiList.splice(i, 1);
        }
    }


    // 5. UI（情報）の表示
    ctx.font = "16px Arial, sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`第 ${currentStageIndex + 1} 番札所 【${getCurrentTempleName()}】`, 20, 30);

    if (bossSpawned === false) {
        //100点達成したら文字を黄色にする
        ctx.fillStyle = (score >= 100) ? "#ffdd44" : "white";
        ctx.fillText(`煩悩退散: ${Math.min(100, score)} / 100`, 20, 55);

        //大師さま5体獲得達成したら文字を黄色にする
        ctx.fillStyle = (daishiCount >= daishiTarget) ? "#ffdd44" : "white";
        ctx.fillText(`大師同行: ${daishiCount} / ${daishiTarget}`, 20, 80);
    } else {
        //白い縁取りの設定
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4; //縁取りの太さ
        ctx.lineJoin = "round"; //角を丸くしてキレイに見せる
        ctx.strokeText(`★ ボス出現：煩悩の主 ★`, 10, 55);

        //内側の赤文字
        ctx.fillStyle = "#ff2222";
        ctx.fillText(`★ ボス出現：煩悩の主 ★`, 10, 55);
    }
}

// 初期化を行ってからループアニメーションを開始
const params =
    new URLSearchParams(
        window.location.search
    );

if (
    params.get("continue") === "true"
) {

    loadGame();

} else {

    resetGame(true);

}

playBGM("stage");

animate();


