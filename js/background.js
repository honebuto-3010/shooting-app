// 公開時だけこの1行を入れると、すべての console.log が無効になります
console.log = function() {};
// ============================
// 背景
// ============================
let cloudOffset = 0;
let leafOffset = 0;

//昼・夕方・夜
let timeOfDay = "day";

function updateBackground() {

    cloudOffset += 0.5
    leafOffset += 2;

    console.log(leafOffset);
}

function drawBackground() {
    // ============================
    // 時間帯制御
    // ============================
    const cycle = Math.floor(currentStageIndex / 3) % 3;

    if (cycle === 0) {
        timeOfDay = "day";
    }
    else if (cycle === 1) {
        timeOfDay = "evening";
    }
    else {
        timeOfDay = "night";
    }

    //空
    let skyColor = "#3F7FB8";

    if (timeOfDay === "evening") {
        skyColor = "#E06A3A";
    }
    else if (timeOfDay === "night") {
        skyColor = "#102040";
    }

    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (timeOfDay === "night") {
        skyColor = "#102040";

        ctx.fillStyle = "#FFFFCC";
        ctx.beginPath();
        ctx.arc(
            /*canvas.width -50, */
            280, //x座標
            60, //Y座標
            20, //半径
            0,
            Math.PI * 2
        );
        ctx.fill();

        // 三日月化
        ctx.fillStyle = "#102040";
        ctx.beginPath();
        ctx.arc(
            288,
            60,
            18,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    if (timeOfDay === "day") {

        ctx.fillStyle = "#eb5f08";

        ctx.beginPath();
        ctx.arc(
            300,
            60,
            18,
            0,
            Math.PI * 2
        );
        ctx.fill();

    }

    if (timeOfDay === "evening") {

        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(250, 60);
        ctx.lineTo(262, 48);
        ctx.lineTo(274, 60);

        ctx.moveTo(274, 60);
        ctx.lineTo(286, 48);
        ctx.lineTo(298, 60);

        ctx.stroke();

        // カラス①
        ctx.beginPath();
        ctx.moveTo(170, 85);
        ctx.lineTo(178, 77);
        ctx.lineTo(186, 85);

        ctx.moveTo(186, 85);
        ctx.lineTo(194, 77);
        ctx.lineTo(202, 85);
        ctx.stroke();

        // カラス②
        ctx.beginPath();
        ctx.moveTo(90, 65);
        ctx.lineTo(96, 59);
        ctx.lineTo(102, 65);

        ctx.moveTo(102, 65);
        ctx.lineTo(108, 59);
        ctx.lineTo(114, 65);
        ctx.stroke();

    }

        // =========================================
    // 1. 最遠景の山脈（空に溶け込む淡い青緑・一番奥に描画）
    // =========================================
    ctx.fillStyle = "#3d6347"; // 空の青(#3b78ad前後)に少し緑を混ぜた色
    const farPeaks = [
        { x: -30, peakX: 35,  peakY: 115, w: 150 },
        { x: 110, peakX: 165, peakY: 85,  w: 140 },
        { x: 260, peakX: 325, peakY: 95,  w: 160 },
        { x: 380, peakX: 460, peakY: 120, w: 150 }
    ];
    farPeaks.forEach(m => {
        ctx.beginPath();
        ctx.moveTo(m.x, 280);
        ctx.lineTo(m.peakX, m.peakY);
        ctx.lineTo(m.x + m.w, 280);
        ctx.closePath();
        ctx.fill();
    });

    // =========================================
    // 2. 主峰（左・中央の巨大山・右の3つの大きな山）
    // =========================================
    ctx.fillStyle = "#263c22";
    // 左の山
    ctx.beginPath();
    ctx.moveTo(-50, 280);
    ctx.lineTo(90, 90);
    ctx.lineTo(230, 280);
    ctx.fill();

    // 中央の巨大山
    ctx.beginPath();
    ctx.moveTo(120, 280);
    ctx.lineTo(240, 40);
    ctx.lineTo(360, 280);
    ctx.fill();

    // 右の山
    ctx.beginPath();
    ctx.moveTo(250, 280);
    ctx.lineTo(420, 70);
    ctx.lineTo(590, 280);
    ctx.fill();

    // =========================================
    // 3. 中景の山並み（高さと幅を不規則にして自然な連なりにする）
    // =========================================
    ctx.fillStyle = "#4e7f46";
    const midMountains = [
        { x: -50, peakX: -5,  peakY: 165, w: 95 },
        { x: 25,  peakX: 70,  peakY: 180, w: 90 },
        { x: 95,  peakX: 135, peakY: 168, w: 85 },
        { x: 165, peakX: 215, peakY: 185, w: 100 },
        { x: 255, peakX: 300, peakY: 162, w: 95 },
        { x: 335, peakX: 380, peakY: 178, w: 90 },
        { x: 405, peakX: 455, peakY: 165, w: 100 }
    ];
    midMountains.forEach(m => {
        ctx.beginPath();
        ctx.moveTo(m.x, 240);
        ctx.lineTo(m.peakX, m.peakY);
        ctx.lineTo(m.x + m.w, 240);
        ctx.closePath();
        ctx.fill();
    });

    // =========================================
    // 4. 手前の山（一番濃い緑・数を増やして立体感を出す）
    // =========================================
    ctx.fillStyle = "#3a6b35";
    const frontMountains = [
        { x: -45, peak: 175, w: 120 },
        { x: 65,  peak: 190, w: 110 },
        { x: 145, peak: 155, w: 130 },
        { x: 260, peak: 185, w: 115 },
        { x: 345, peak: 172, w: 130 }
    ];
    frontMountains.forEach(m => {
        ctx.beginPath();
        ctx.moveTo(m.x, 255);
        ctx.lineTo(m.x + m.w / 2, m.peak);
        ctx.lineTo(m.x + m.w, 255);
        ctx.closePath();
        ctx.fill();
    });

    /*ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);*/

    // =====================
    // 山道・地面のベース（追加）
    // =====================
    // 1. 山の裾野から石畳までのベース（深い緑や土色など）
    ctx.fillStyle = "#2b4a26"; // 山の裾野になじむ濃い緑（土色にするなら "#6b543a" など）
    ctx.fillRect(0, 280, canvas.width, canvas.height - 280);
     // 2. 少し川を流す（2段目のギザギザ木々のすぐ下あたり）
    ctx.fillStyle = "#1E5282"; // 空と同じ爽やかな青（少し濃い川色なら "#2d6ca2"）
    ctx.fillRect(0, 395, canvas.width, 65); // 高さ35pxの細めの川
    // 川岸の影（奥側の岸辺に少し濃いラインを入れて立体感を出す）
    ctx.fillStyle = "#143859";
    ctx.fillRect(0, 395, canvas.width, 4);
    // 川の水面のキラキラ（白い細い線を入れて川らしさを出す）
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.fillRect(35,  408, 50, 2);
    ctx.fillRect(250, 405, 45, 2);
    ctx.fillRect(140, 424, 70, 2);
    ctx.fillRect(330, 428, 55, 2);
    ctx.fillRect(60,  443, 60, 2);
    ctx.fillRect(220, 446, 65, 2);

    // 2. 山道（土の道）の表現（お好みで追加）
    ctx.fillStyle = "#8c7355"; // 土の色
    ctx.fillRect(0, 460, canvas.width, 80); // Y=380あたりから石畳までを道にする例
        // =====================
    // 道端のお地蔵様（試し置き）
    // =====================
    const jizoX = canvas.width -30;  // 横の位置（左右に動かしたいときはここを変更）
    const jizoY = 475; // 縦の位置（山道の上端あたり）

    // 1. 台座（濃いグレーの石）
    ctx.fillStyle = "#666666";
    ctx.fillRect(jizoX - 8, jizoY + 14, 16, 5);

    // 2. 体（明るいグレーの石）
    ctx.fillStyle = "#999999";
    ctx.fillRect(jizoX - 6, jizoY + 2, 12, 12);

    // 3. 頭（丸い石）
    ctx.beginPath();
    ctx.arc(jizoX, jizoY, 5, 0, Math.PI * 2);
    ctx.fill();

    // 4. 赤い前掛け（お地蔵様らしさのポイント！）
    ctx.fillStyle = "#d93829";
    ctx.fillRect(jizoX - 5, jizoY + 4, 10, 6);

    // =====================
    // 奥森
    // =====================

    ctx.fillStyle = "#356835";

    for (let x = -15; x < canvas.width; x += 30) {

        ctx.beginPath();

        ctx.moveTo(x, 320);
        ctx.lineTo(x + 15, 290);
        ctx.lineTo(x + 30, 320);

        ctx.fill();
    }
    //森
    ctx.fillStyle = "#2a5d2a";

    // 後ろ側の森
    for (let x = -15; x < canvas.width; x += 30) {

        ctx.beginPath();

        ctx.moveTo(x, 380);
        ctx.lineTo(x + 15, 350);
        ctx.lineTo(x + 30, 380);

        ctx.fill();
    }

    ctx.fillStyle = "#1f4f1f";

    for (let x = 0; x < canvas.width; x += 30) {

        const height = (x / 30) % 2 === 0
            ? 20
            : 35;

        ctx.beginPath();
        ctx.moveTo(x, 400);
        ctx.lineTo(x + 15, 400 - height);
        ctx.lineTo(x + 30, 400);
        ctx.fill();
    }

        // =========================================
    // 手前の森の木々（五重塔・ケーブルと重ならない配置）
    // =========================================
    const forestTrees = [
        // x: 木の頂点のX, y: 木の頂点のY, scale: 大きさ倍率, color: 葉の色
        { x: 65,  y: 332, scale: 1.0,  color: "#142e12" }, // 左の白い標識の右側
        { x: 92,  y: 345, scale: 0.85, color: "#1e421b" }, // 少し小さめの木
        { x: 145, y: 338, scale: 1.1,  color: "#142e12" }, // 左中央・大きめ
        { x: 175, y: 350, scale: 0.8,  color: "#254f21" }, // 中央やや左
        { x: 245, y: 342, scale: 0.95, color: "#1e421b" }, // 中央やや右（ケーブルの左側）
        { x: 325, y: 348, scale: 0.85, color: "#142e12" }, // 五重塔のすぐ左
        { x: 408, y: 335, scale: 1.05, color: "#1e421b" }  // 五重塔の右端
    ];

    forestTrees.forEach(t => {
        const w = 14 * t.scale; // 葉の半分の幅
        const h = 26 * t.scale; // 葉の高さ

        // 葉（2段重ねのファミコン風針葉樹にして立体感を出す）
        ctx.fillStyle = t.color;
        // 下段の葉
        ctx.beginPath();
        ctx.moveTo(t.x, t.y + h * 0.35);
        ctx.lineTo(t.x - w, t.y + h);
        ctx.lineTo(t.x + w, t.y + h);
        ctx.closePath();
        ctx.fill();

        // 上段の葉
        ctx.beginPath();
        ctx.moveTo(t.x, t.y);
        ctx.lineTo(t.x - w * 0.78, t.y + h * 0.6);
        ctx.lineTo(t.x + w * 0.78, t.y + h * 0.6);
        ctx.closePath();
        ctx.fill();

        // 幹（茶色）
        ctx.fillStyle = "#5c3a21";
        ctx.fillRect(
            t.x - 2.5 * t.scale,
            t.y + h,
            5 * t.scale,
            9 * t.scale
        );
    });

    //遍路道
    ctx.fillStyle = "#a9a9a9";
    ctx.fillRect(
        0,
        canvas.height - 80,
        canvas.width,
        80
    );

    //　石①
    ctx.fillStyle = "#808080";

    ctx.fillRect(
        40,
        canvas.height - 95,
        20,
        10
    );

    //石②
    ctx.fillRect(
        150,
        canvas.height - 100,
        30,
        15
    );
    //石③
    ctx.fillRect(
        290,
        canvas.height - 110,
        45,
        20
    );
    ctx.fillRect(
        290,
        canvas.height - 120,
        25,
        10
    );

    // 石畳の線
    ctx.strokeStyle = "#333333";

    for (
        let y = canvas.height - 80;
        y < canvas.height;
        y += 20
    ) {

        let offset = (y / 20 % 2) * 10;

        for (
            let x = -20;
            x < canvas.width + 20;
            x += 20
        ) {

            ctx.strokeRect(
                x + offset,
                y,
                20,
                20
            );
        }
    }
    // 道標
    ctx.fillStyle = "#cfcfcf";
    ctx.fillRect(40, 220, 8, 40);

    ctx.fillStyle = "#222";
    ctx.fillRect(38, 225, 12, 3);
    ctx.fillStyle = "#A9A9A9";

    for (let x = 0; x < canvas.width; x += 40) {

        ctx.fillRect(
            x,
            canvas.height - 45,
            20,
            4
        );
    }

        // =================================================================
    // 新レイアウト用：五重塔・鳥居・仁王門・中腹のお寺・ロープウェイ
    // =================================================================

    // ---------------------------------
    // 1. 山の中腹のお寺（一番高い主峰の左斜面に配置）
    // ---------------------------------
    const midTempleX = 185;
    const midTempleY = 128;

    // 石垣の土台
    ctx.fillStyle = "#8C8C8C";
    ctx.fillRect(midTempleX - 2, midTempleY + 12, 34, 5);

    // 本堂の白壁と赤い柱
    ctx.fillStyle = "#F5F5F5";
    ctx.fillRect(midTempleX + 3, midTempleY + 5, 24, 7);
    ctx.fillStyle = "#D9381E";
    ctx.fillRect(midTempleX + 2, midTempleY + 5, 2, 7);
    ctx.fillRect(midTempleX + 14, midTempleY + 5, 2, 7);
    ctx.fillRect(midTempleX + 26, midTempleY + 5, 2, 7);

    // 瓦屋根
    ctx.fillStyle = "#222222";
    ctx.fillRect(midTempleX,     midTempleY + 3, 30, 3);
    ctx.fillRect(midTempleX + 5, midTempleY,     20, 3);

    // ---------------------------------
    // 2. 五重塔（川の向こう側・森林帯の右寄りに着地）
    // ---------------------------------
    const towerX = 355;
    const towerY = 302; // 土台がちょうど川の岸辺（Y=383付近）に着地する高さ

    // 相輪（てっぺんの飾り）
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(towerX + 19, towerY,      2, 16);
    ctx.fillRect(towerX + 17, towerY + 4,  6, 2);
    ctx.fillRect(towerX + 16, towerY + 8,  8, 2);
    ctx.fillRect(towerX + 17, towerY + 12, 6, 2);

    // 五層の屋根と赤い塔身
    for (let i = 0; i < 5; i++) {
        const layerY = towerY + 16 + (i * 12);
        const roofW  = 24 + (i * 4);
        const roofX  = towerX + 20 - (roofW / 2);

        ctx.fillStyle = "#D9381E";
        ctx.fillRect(roofX + 4, layerY + 4, roofW - 8, 8);

        ctx.fillStyle = "#F5F5F5";
        ctx.fillRect(roofX + 7, layerY + 5, roofW - 14, 6);

        ctx.fillStyle = "#D9381E";
        ctx.fillRect(towerX + 19, layerY + 4, 2, 8);

        ctx.fillStyle = "#222222";
        ctx.fillRect(roofX, layerY, roofW, 4);

        ctx.fillStyle = "#555555";
        ctx.fillRect(roofX + 2, layerY + 1, roofW - 4, 1);
    }

    // 石の土台
    const baseY = towerY + 16 + (5 * 12);
    ctx.fillStyle = "#9E9E9E";
    ctx.fillRect(towerX - 2, baseY, 44, 5);

        // ---------------------------------
    // 6. お接待処（茶屋と赤い和傘）
    // ---------------------------------
    const teaX = 45;
    const teaY = 478; // 仁王門と同じ高さのライン

    // 1. 茶屋の小屋（木造・瓦屋根）
    ctx.fillStyle = "#5D4037"; // 柱・壁（こげ茶）
    ctx.fillRect(teaX, teaY + 8, 36, 22);
    ctx.fillStyle = "#D7CCC8"; // のれん・障子風（薄いベージュ）
    ctx.fillRect(teaX + 4, teaY + 12, 28, 12);

    // 屋根
    ctx.fillStyle = "#263238";
    ctx.fillRect(teaX - 4, teaY + 2, 44, 6);
    ctx.fillRect(teaX,     teaY,     36, 3);

    // 2. 赤い和傘（野点傘）と縁台
    const umbrellaX = teaX + 52;
    const umbrellaY = teaY + 6;

    // 傘の柄
    ctx.fillStyle = "#3E2723";
    ctx.fillRect(umbrellaX, umbrellaY + 6, 2, 24);

    // 赤い傘（三角形風ドット）
    ctx.fillStyle = "#D9381E";
    ctx.fillRect(umbrellaX - 12, umbrellaY + 4, 26, 4);
    ctx.fillRect(umbrellaX - 8,  umbrellaY + 1, 18, 3);
    ctx.fillRect(umbrellaX - 3,  umbrellaY - 1, 8,  2);

    // 長椅子（縁台）
    ctx.fillStyle = "#8D6E63";
    ctx.fillRect(umbrellaX - 10, umbrellaY + 18, 22, 4);
    ctx.fillRect(umbrellaX - 8,  umbrellaY + 22, 3,  4);
    ctx.fillRect(umbrellaX + 7,  umbrellaY + 22, 3,  4);


    // ---------------------------------
    // 3. ファミコン風・赤い鳥居（石畳の入り口・手前サイズ版）
    // ---------------------------------
    const toriiX = 50;
    const toriiY = canvas.height - 115; // 石畳の一番上のラインに足元（+45px）が着地する高さ

    // 柱と貫（手前に来た分、少し大きく存在感を出す）
    ctx.fillStyle = "#D9381E";
    ctx.fillRect(toriiX + 9,  toriiY + 6, 6, 39); // 左の柱
    ctx.fillRect(toriiX + 37, toriiY + 6, 6, 39); // 右の柱
    ctx.fillRect(toriiX + 3,  toriiY + 15, 46, 5); // 貫（横木）
    ctx.fillRect(toriiX + 24, toriiY + 6, 4, 9);   // 額束

    // 笠木（上の屋根部分）
    ctx.fillStyle = "#1A1A1A";
    ctx.fillRect(toriiX,     toriiY,     52, 3);
    ctx.fillStyle = "#D9381E";
    ctx.fillRect(toriiX + 2, toriiY + 3, 48, 3);

    // 根元の石台（亀腹）
    ctx.fillStyle = "#E0E0E0";
    ctx.fillRect(toriiX + 8,  toriiY + 41, 8, 4);
    ctx.fillRect(toriiX + 36, toriiY + 41, 8, 4);

    // ---------------------------------
    // 4. ファミコン風・仁王門（茶色い道の右側・お地蔵さんの左隣に配置）
    // ---------------------------------
    const gateX = 315;
    const gateY = 470; // 鳥居と高さを揃えて道に着地

    // 屋根（2層）
    ctx.fillStyle = "#222222";
    ctx.fillRect(gateX + 12, gateY,      46, 5);
    ctx.fillRect(gateX + 4,  gateY + 12, 62, 6);

    ctx.fillStyle = "#555555";
    ctx.fillRect(gateX + 14, gateY + 1,  42, 2);
    ctx.fillRect(gateX + 6,  gateY + 13, 58, 2);

    // 2階部分
    ctx.fillStyle = "#F5F5F5";
    ctx.fillRect(gateX + 16, gateY + 5, 38, 7);
    ctx.fillStyle = "#D9381E";
    ctx.fillRect(gateX + 16, gateY + 5, 3, 7);
    ctx.fillRect(gateX + 51, gateY + 5, 3, 7);
    ctx.fillRect(gateX + 14, gateY + 10, 42, 2);

    // 1階部分
    ctx.fillStyle = "#3E2723";
    ctx.fillRect(gateX + 26, gateY + 18, 18, 26);

    ctx.fillStyle = "#F5F5F5";
    ctx.fillRect(gateX + 12, gateY + 18, 14, 26);
    ctx.fillRect(gateX + 44, gateY + 18, 14, 26);

    ctx.fillStyle = "#D9381E";
    ctx.fillRect(gateX + 11, gateY + 18, 3, 26);
    ctx.fillRect(gateX + 24, gateY + 18, 3, 26);
    ctx.fillRect(gateX + 43, gateY + 18, 3, 26);
    ctx.fillRect(gateX + 56, gateY + 18, 3, 26);
    ctx.fillRect(gateX + 11, gateY + 25, 48, 3);

    // 扁額と提灯
    ctx.fillStyle = "#111111";
    ctx.fillRect(gateX + 31, gateY + 19, 8, 5);
    ctx.fillStyle = "#FFEB3B";
    ctx.fillRect(gateX + 33, gateY + 26, 4, 6);

    // 石段
    ctx.fillStyle = "#9E9E9E";
    ctx.fillRect(gateX + 8,  gateY + 44, 54, 4);

    // ---------------------------------
    // 5. 仁王門 ↔ 中腹のお寺 をつなぐロープウェイ
    // ---------------------------------
    const startX = gateX + 35;      // 仁王門の中央
    const startY = gateY + 6;       // 仁王門の2階
    const endX   = midTempleX + 26; // 山の中腹のお寺の右端
    const endY   = midTempleY + 10; // 山の中腹のお寺の土台付近

    // ケーブル
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // ゴンドラ（緑の森林帯の上あたりを移動中）
    const ratio = 0.45;
    const gondolaX = startX + (endX - startX) * ratio - 7;
    const gondolaY = startY + (endY - startY) * ratio + 6;

    // 懸垂器
    ctx.fillStyle = "#222222";
    ctx.fillRect(gondolaX + 6, gondolaY - 6, 2, 6);
    ctx.fillRect(gondolaX + 3, gondolaY - 7, 8, 2);

    // ゴンドラ本体
    ctx.fillStyle = "#D9381E";
    ctx.fillRect(gondolaX, gondolaY, 14, 9);
    ctx.fillStyle = "#E0F7FA";
    ctx.fillRect(gondolaX + 2, gondolaY + 2, 4, 3);
    ctx.fillRect(gondolaX + 8, gondolaY + 2, 4, 3);

        // =================================================================
    // 最終仕上げ：明かりの灯った石灯籠（石畳の上端ラインに3基配置）
    // =================================================================
    const lanternPositions = [
        130, // 1基目：鳥居の右側
        255, // 2基目：中央やや右（仁王門の手前あたり）
        380  // 3基目：右端（お地蔵様の下あたり）
    ];
    const lanternBaseY = canvas.height - 72; // 石畳の上から少し入ったライン（足元）

    lanternPositions.forEach(lx => {
        // 1. ほんのり広がる温かい光のオーラ（半透明の黄色）
        ctx.fillStyle = "rgba(255, 224, 102, 0.28)";
        ctx.beginPath();
        ctx.arc(lx, lanternBaseY - 19, 13, 0, Math.PI * 2);
        ctx.fill();

        // 2. 基礎・竿（さお：柱）・中台（石のグレー）
        ctx.fillStyle = "#757575";
        ctx.fillRect(lx - 6, lanternBaseY - 3, 12, 3);  // 土台
        ctx.fillStyle = "#9E9E9E";
        ctx.fillRect(lx - 2, lanternBaseY - 14, 4, 11);  // 竿（柱）
        ctx.fillStyle = "#757575";
        ctx.fillRect(lx - 5, lanternBaseY - 16, 10, 2);  // 中台（火袋の受け皿）

        // 3. 火袋（ひぶくろ：明かりが灯る部分）
        ctx.fillStyle = "#FFA000"; // 外枠のオレンジ光
        ctx.fillRect(lx - 4, lanternBaseY - 22, 8, 6);
        ctx.fillStyle = "#FFF59D"; // 中心の明るい芯の光
        ctx.fillRect(lx - 2, lanternBaseY - 21, 4, 4);

        // 4. 笠（かさ：三角屋根）と宝珠（てっぺんの飾り）
        ctx.fillStyle = "#616161";
        ctx.fillRect(lx - 7, lanternBaseY - 24, 14, 2); // 笠の下段
        ctx.fillRect(lx - 4, lanternBaseY - 26, 8, 2);  // 笠の上段
        ctx.fillStyle = "#9E9E9E";
        ctx.fillRect(lx - 1, lanternBaseY - 28, 2, 2);  // 宝珠
    });


    // ==================================
    // 雲
    // ==================================
    //雲①
    let cloudY1 =
        (50 + cloudOffset) % (canvas.height + 60) - 60;
    ctx.fillStyle = "white";

    ctx.fillRect(80, cloudY1 + 8, 50, 8);
    ctx.fillRect(90, cloudY1, 25, 8);
    ctx.fillRect(70, cloudY1 + 5, 20, 8);
    ctx.fillRect(120, cloudY1 + 5, 20, 8);
    ctx.fillRect(85, cloudY1 + 16, 40, 6);

    //雲②
    let cloudY2 =
        (180 + cloudOffset) % (canvas.height + 80) - 80;

    ctx.fillRect(240, cloudY2 + 8, 60, 8);
    ctx.fillRect(255, cloudY2, 25, 8);
    ctx.fillRect(230, cloudY2 + 5, 20, 8);
    ctx.fillRect(290, cloudY2 + 5, 20, 8);
    ctx.fillRect(250, cloudY2 + 16, 45, 6);

    //雲③
    let cloudY3 =
        (320 + cloudOffset) %
        (canvas.height + 100) - 100;

    ctx.fillRect(140, cloudY3 + 8, 50, 8);
    ctx.fillRect(150, cloudY3, 25, 8);
    ctx.fillRect(130, cloudY3 + 5, 20, 8);
    ctx.fillRect(180, cloudY3 + 5, 20, 8);
    ctx.fillRect(145, cloudY3 + 16, 35, 6);

    //雲④
    let cloudY4 =
        (500 + cloudOffset) %
        (canvas.height + 120) - 120;

    ctx.fillRect(40, cloudY4 + 8, 40, 8);
    ctx.fillRect(50, cloudY4, 20, 8);
    ctx.fillRect(30, cloudY4 + 5, 15, 8);
    ctx.fillRect(70, cloudY4 + 5, 15, 8);
    ctx.fillRect(45, cloudY4 + 16, 30, 6);

    // ===================================
    // 落ち葉
    // ===================================
    ctx.fillStyle = "#b87733";

    ctx.fillRect(
        60,
        (100 + leafOffset) % canvas.height,
        8,
        5
    );

    ctx.fillRect(
        220,
        (260 + leafOffset) % canvas.height,
        10,
        6
    );

    ctx.fillRect(
        320,
        (420 + leafOffset) % canvas.height,
        8,
        5
    );

    ctx.fillStyle = "#d4a017";

    ctx.fillRect(
        140,
        (180 + leafOffset) % canvas.height,
        8,
        5
    );

    ctx.fillRect(
        280,
        (340 + leafOffset) % canvas.height,
        10,
        6
    );
}
