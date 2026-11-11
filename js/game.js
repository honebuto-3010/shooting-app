// ==========================================
// Canvas
// ==========================================

const canvas = document.getElementById("gameCanvas");

canvas.width = 450;
canvas.height = 700;
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

// ==========================================
// ボス弾
// ==========================================

const bossBullets = [];
const bossBulletSpeed = 4;

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

    const bonno = ["欲", "怒", "痴"];

    enemies.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        type: bonno[Math.floor(Math.random() * bonno.length)]
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
        speed: 0.6
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

    bullets.length = 0;
    enemies.length = 0;
    bossBullets.length = 0;

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
    if (score >= 100 && !bossSpawned) {
        spawnBoss();
    }

    spawnTimer++;
    if (!bossSpawned) {
        if (spawnTimer % 40 === 0) {
            spawnEnemy();
        }
        if (spawnTimer % 700 === 0) {
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

                playSE("enemyHit"); //仮のBGM設定中

                bullets.splice(j, 1);
                boss.hp--;
                if (boss.hp <= 0 && !stageCleared) {
                    boss.hp = 0;
                    stageCleared = true;
                    bossSpawned = false;

                    stopBGM();

                    if (!collectedGoshuin.includes(getCurrentTempleName())) {
                         collectedGoshuin.push(getCurrentTempleName());
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
                    x: boss.x + boss.width / 2 - 4,
                    y: boss.y + boss.height,
                    width: 8,
                    height: 8,
                    color: "#ff00a0"
                });
            }
        }

        for (let k = bossBullets.length - 1; k >= 0; k--) {
            bossBullets[k].y += bossBulletSpeed;
            ctx.fillStyle = bossBullets[k].color;
            ctx.fillRect(bossBullets[k].x, bossBullets[k].y, bossBullets[k].width, bossBullets[k].height);

            if (checkCollision(player, bossBullets[k])) {

                stopBGM();

                playSE("gameOver");

                gameOver = true;
            }
            if (bossBullets[k].y > canvas.height) {
                bossBullets.splice(k, 1);
            }
        }

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
    }

    // 4. ザコ敵の移動と描画、衝突判定
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemySpeed;
        
        ctx.fillStyle = "#ffcc00";
        ctx.font = "20px 'Hiragino Mincho ProN', 'MS Mincho', serif";
        let bonnoText = "欲";
        if (enemies[i].x % 3 === 0) bonnoText = "怒";
        if (enemies[i].x % 3 === 1) bonnoText = "痴";
        ctx.fillText(bonnoText, enemies[i].x + 5, enemies[i].y + 22);

        if (checkCollision(player, enemies[i])) {

            stopBGM();

            playSE("gameOver");

            gameOver = true;
        }

        for (let j = bullets.length - 1; j >= 0; j--) {
            if (checkCollision(bullets[j], enemies[i])) {

                playSE("enemyHit");

                enemies.splice(i, 1);
                bullets.splice(j, 1);
                if (!bossSpawned) {
                    score += 10;
                }
                break;
            }
        }

        if (enemies[i] && enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
        }
    }

    // 5. UI（情報）の表示
    ctx.font = "16px Arial, sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`第 ${currentStageIndex + 1} 番札所 【${getCurrentTempleName()}】`, 20, 30);
    
    if (bossSpawned === false) {
        ctx.fillText(`煩悩退散: ${score} / 100`, 20, 55);
    } else {
        ctx.fillStyle = "#ff5555";
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
