// 公開時だけこの1行を入れると、すべての console.log が無効になります
console.log = function() {};
// ============================
// 背景
// ============================
let cloudOffset = 0;
let leafOffset = 0;

//昼・夕方・夜
let timeOfDay = "day";

// ★追加：季節（"normal" | "autumn" | "winter"）
let season = "normal";

// ★追加：季節ごとのカラーパレット一括管理
const SEASON_THEMES = {
    // 通常の緑（夏・新緑）
    normal: {
        mountain: { main: "#263c22", far: "#4e7f46", front: "#3a6b35" },
        base: "#2b4a26",
        forest: { far: "#356835", mid: "#2a5d2a", front: "#1f4f1f" }
    },
    // ① 紅葉（秋）
    autumn: {
        mountain: { main: "#5c1d16", far: "#d97228", front: "#9e351b" },
        base: "#4a2816",
        forest: { far: "#7a3b1e", mid: "#592b15", front: "#3d1e10" }
    },
    // ② 雪山（冬）
    winter: {
        mountain: { main: "#7a92a8", far: "#eef4f8", front: "#b8cce0" },
        base: "#cfdbe6",
        forest: { far: "#dce8f2", mid: "#a3b8cc", front: "#566b7d" }
    },

      // ③ 桜・春（spring）上品な和風の桜色に調整
    spring: {
        mountain: {
            main:  "#486b46", // 主峰（春の山肌・落ち着いた若草緑）
            far:   "#f4c2d7", // 遠くの山（淡く優しいソメイヨシノ色）
            front: "#d88ea8"  // 手前の山（彩度を落とした上品な紅梅色）
        },
        base: "#3e6338",      // ベース下地（春の若草緑）
        forest: {
            far:   "#e8a8c0", // 奥森（遠景に咲く桜並木の淡いピンク）
            mid:   "#558246", // 後ろ側の森（芽吹いた新緑の緑）
            front: "#264d24"  // 一番手前の森（濃い緑に戻して五重塔と川を引き締める）
        }
    }


};



function updateBackground() {

    cloudOffset += 0.5
    leafOffset += 2;

    console.log(leafOffset);
}

function drawBackground() {
    // ============================
    // 時間帯制御
    // ============================
    const cycle = currentStageIndex % 3; //変更

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
    let skyColor = "#2E86C1";

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

    // ★追加：季節制御（仮：9ステージごとに 緑 → 紅葉 → 雪山 と切り替え）
    const seasonCycle = Math.floor(currentStageIndex / 3) % 4;
    if (seasonCycle === 0) {
        season = "normal";
    } else if (seasonCycle === 1) {
        season = "autumn";
    } else if (seasonCycle === 2) {
        season = "winter";
    } else {
        season = "spring"; //春を追加
    }

    // ★追加：今の季節のカラーセットを取り出す（これ以降ずっと theme を使います）
    const theme = SEASON_THEMES[season];
    // ★ここに移動！毎フレーム・毎ステージ正しく更新されるようになります
    let farMountainColor = theme.mountain.far;
    if (timeOfDay === "evening" && season === "autumn") {
        farMountainColor = "#4e7f46"; // 夕方 × 紅葉 のときだけ緑のアクセント
    }

    //山
    ctx.fillStyle = theme.mountain.main //変更箇所
    //左の山
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
    //右の山
    ctx.beginPath();
    ctx.moveTo(250, 280);
    ctx.lineTo(420, 70);
    ctx.lineTo(590, 280);
    ctx.fill();

    //==========================
    //　遠くの山
    // ========================

    ctx.fillStyle = farMountainColor; //変更箇所

    for (let x = -50; x < canvas.width + 100; x += 80) {

        ctx.beginPath();

        ctx.moveTo(x, 220);
        ctx.lineTo(x + 40, 170);
        ctx.lineTo(x + 80, 220);

        ctx.fill();
    }
    // =====================
    // 手前の山
    // =====================
    ctx.fillStyle = theme.mountain.front; //変更箇所

    // 数を減らして主峰を目立たせる
    const frontMountains = [
        { x: -40, peak: 175 },
        { x: 140, peak: 155 },
        { x: 340, peak: 180 }
    ];

    frontMountains.forEach(m => {

        ctx.beginPath();

        ctx.moveTo(m.x, 250);
        ctx.lineTo(m.x + 60, m.peak);
        ctx.lineTo(m.x + 120, 250);

        ctx.fill();

    });

    // =====================
    // のぼり描画用ヘルパー関数
    // =====================
    function drawNobori(x, y, scale = 1.0) {
        const w = 9 * scale;
        const h = 30 * scale;
        const poleH = 45 * scale;

        // 竿（ポール）
        ctx.fillStyle = "#555555";
        ctx.fillRect(x, y, 3 * scale, poleH);
        ctx.fillRect(x, y + 2 * scale, 12 * scale, 2 * scale);

        // 旗（白）
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 3 * scale, y + 4 * scale, w, h);

        // 模様（黒ドット）
        ctx.fillStyle = "#333333";
        ctx.fillRect(x + 6 * scale, y + 9 * scale, 3 * scale, 3 * scale);
        ctx.fillRect(x + 6 * scale, y + 16 * scale, 3 * scale, 3 * scale);
    }

    // 1. 左側の柱の横ののぼり（既存）
    drawNobori(72, 230, 1.0);

    // 2. 鳥居周辺ののぼり（3本・鳥居より少し小さめにして遠近感を出す）
    drawNobori(262, 218, 0.85); // 鳥居のすぐ左
    drawNobori(274, 224, 0.85); // 鳥居の左手前
    drawNobori(332, 220, 0.85); // 鳥居のすぐ右
    drawNobori(344, 226, 0.85); // ★追加：鳥居の右手前（左と同じく右に+12、下に+6ずらす

    // 3. 「鳥居」（のぼりの手前に描画）
    function drawTorii(x, y, w, h) {
        // 柱（朱色）
        ctx.fillStyle = "#c83232";
        ctx.fillRect(x + w * 0.15, y + h * 0.3, w * 0.12, h * 0.7);
        ctx.fillRect(x + w * 0.73, y + h * 0.3, w * 0.12, h * 0.7);
        // 貫（横木）
        ctx.fillRect(x + w * 0.08, y + h * 0.45, w * 0.84, h * 0.14);
        // 額束（中央の白）
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + w * 0.43, y + h * 0.3, w * 0.14, h * 0.25);
        // 笠木（黒屋根）
        ctx.fillStyle = "#222831";
        ctx.fillRect(x, y, w, h * 0.22);
        // 島木（黄色のライン）
        ctx.fillStyle = "#f2c94c";
        ctx.fillRect(x + w * 0.05, y + h * 0.22, w * 0.9, h * 0.08);
    }

    drawTorii(285, 222, 42, 26);



    // =====================
    // 山道・地面のベース（追加）
    // =====================

    // 1. 山の裾野から石畳までのベース
    ctx.fillStyle = theme.base;
    ctx.fillRect(0, 280, canvas.width, canvas.height - 280);

    // 2. 少し川を流す（2段目のギザギザ木々のすぐ下あたり）
    ctx.fillStyle = "#1E5282";
    ctx.fillRect(0, 395, canvas.width, 70);

    // 水面のグラデーション（奥は明るく、手前は深く）
    const riverGrad = ctx.createLinearGradient(0, 395, 0, 465);
    riverGrad.addColorStop(0, "rgba(120, 200, 255, 0.25)");
    riverGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
    riverGrad.addColorStop(1, "rgba(10, 25, 50, 0.25)");
    ctx.fillStyle = riverGrad;
    ctx.fillRect(0, 395, canvas.width, 70);

    // 右上の太陽（x: 310付近）の水面反射（サンロード）
    const sunReflections = [
        { x: 292, y: 400, w: 32, color: "rgba(255, 235, 160, 0.45)" },
        { x: 282, y: 409, w: 48, color: "rgba(255, 215, 130, 0.35)" },
        { x: 290, y: 420, w: 40, color: "rgba(255, 245, 190, 0.30)" },
        { x: 278, y: 433, w: 56, color: "rgba(255, 255, 255, 0.25)" },
        { x: 295, y: 447, w: 34, color: "rgba(255, 225, 150, 0.22)" },
        { x: 288, y: 458, w: 42, color: "rgba(255, 255, 255, 0.18)" }
    ];
    sunReflections.forEach(ref => {
        ctx.fillStyle = ref.color;
        ctx.fillRect(ref.x, ref.y, ref.w, 2);
    });

    // 川の水面のキラキラ（大小の光の線＋光るドット粒）
    const sparkles = [
        { x: 40, y: 405, w: 50, alpha: 0.55 },
        { x: 115, y: 412, w: 18, alpha: 0.80 },
        { x: 180, y: 415, w: 70, alpha: 0.50 },
        { x: 260, y: 402, w: 40, alpha: 0.65 },
        { x: 365, y: 410, w: 45, alpha: 0.60 },
        { x: 65, y: 430, w: 25, alpha: 0.75 },
        { x: 145, y: 438, w: 35, alpha: 0.55 },
        { x: 350, y: 435, w: 20, alpha: 0.85 },
        { x: 90, y: 448, w: 60, alpha: 0.50 },
        { x: 210, y: 452, w: 45, alpha: 0.65 },
        { x: 380, y: 455, w: 30, alpha: 0.70 }
    ];

    sparkles.forEach(s => {
        // 光の帯
        ctx.fillStyle = `rgba(220, 245, 255, ${s.alpha})`;
        ctx.fillRect(s.x, s.y, s.w, 2);

        // 端にキラッと光る白い粒（ドット）を追加
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillRect(s.x + s.w + 4, s.y, 3, 2);
    });

    // 2. 山道（土の道／冬は雪道）の表現
    if (season === "winter") {
        // 冬：雪が積もった道（少し青みがかった白）
        ctx.fillStyle = "#e3edf5";
        ctx.fillRect(0, 465, canvas.width, 75);

        // 雪の陰影や踏み跡のアクセント
        ctx.fillStyle = "#c5d6e6";
        ctx.fillRect(0, 465, canvas.width, 4); // 川岸の雪のフチ
        ctx.fillRect(40, 490, 50, 3);
        ctx.fillRect(160, 515, 70, 3);
        ctx.fillRect(290, 485, 45, 3);
    } else {
        // 通常・秋：土の道
        ctx.fillStyle = "#8c7355";
        ctx.fillRect(0, 465, canvas.width, 75);
    }

        // =====================
    // 冬の動物：雪道のキツネ（追加）
    // =====================
    function drawFox(x, y) {
        // 尻尾の揺れアニメーション（leafOffsetを利用）
        const tailWag = Math.sin(leafOffset * 0.04) * 1.5;

        // 1. ふわふわの尻尾（オレンジ＋先端が白）
        ctx.fillStyle = "#e66c2c";
        ctx.fillRect(x - 10, y - 9 + tailWag, 9, 6);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x - 12, y - 10 + tailWag, 4, 5);

        // 2. 体（お座りしている胴体）
        ctx.fillStyle = "#e66c2c";
        ctx.fillRect(x - 3, y - 12, 9, 12);

        // 胸元の白いモフモフ
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 3, y - 10, 3, 8);

        // 3. 頭と耳
        ctx.fillStyle = "#e66c2c";
        ctx.fillRect(x - 2, y - 19, 10, 8);
        // ピンと立った三角の耳（2つ）
        ctx.fillRect(x - 1, y - 22, 3, 3);
        ctx.fillRect(x + 4, y - 22, 3, 3);
        // 耳の先の黒アクセント
        ctx.fillStyle = "#222222";
        ctx.fillRect(x - 1, y - 22, 2, 1.5);
        ctx.fillRect(x + 5, y - 22, 2, 1.5);

        // 4. 顔の白い頬と目・鼻
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 3, y - 15, 5, 4); // 白い口元
        ctx.fillStyle = "#111111";
        ctx.fillRect(x + 4, y - 17, 2, 2); // つぶらな瞳
        ctx.fillRect(x + 8, y - 15, 2, 2); // 黒い鼻先
    }

    // 冬のステージのときだけ、お茶所の近くにキツネを登場させる
    if (season === "winter") {
        drawFox(165, 512); // お茶所（X=210）の少し左側に配置
    }

    // =====================
    // 川の下のお茶所・休憩所（追加）
    // =====================
    function drawChaya(x, y) {
        // 1. 縁台（木のベンチ）の脚
        ctx.fillStyle = "#4a3219";
        ctx.fillRect(x + 6, y - 6, 4, 6);
        ctx.fillRect(x + 34, y - 6, 4, 6);

        // 2. 縁台の座面（赤い毛氈・もうせん風）
        ctx.fillStyle = "#b8292f";
        ctx.fillRect(x + 2, y - 10, 40, 4);

        // 3. 湯呑み（お接待のお茶）
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 12, y - 13, 4, 3);
        ctx.fillStyle = "#7cb342"; // 緑茶の色
        ctx.fillRect(x + 13, y - 13, 2, 1);

        // 4. 野点傘（のだてがさ）の柱
        ctx.fillStyle = "#3e2723";
        ctx.fillRect(x + 28, y - 34, 3, 28);

        // 5. 野点傘の赤い傘部分
        ctx.fillStyle = "#d32f2f";
        ctx.beginPath();
        ctx.moveTo(x + 8, y - 28);   // 左端
        ctx.lineTo(x + 51, y - 28);  // 右端
        ctx.lineTo(x + 29.5, y - 38); // 頂点
        ctx.closePath();
        ctx.fill();

        // 傘のフチの白いライン（アクセント）
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 9, y - 28, 41, 1.5);
    }

    // 土の道の右側（例：X=210, Y=515あたり）に配置
    // ※川と石畳の間の茶色いエリアに収まるようにY座標を調整してください
    drawChaya(210, 515);

    // =====================
    // 左端の屋根付き休憩小屋（東屋・追加）
    // =====================
    function drawAzumaya(x, y) {
        // 1. 土台（石の基礎）
        ctx.fillStyle = "#7a7a7a";
        ctx.fillRect(x + 2, y - 3, 56, 3);

        // 2. 奥の柱（少し暗い茶色で奥行きを出す）
        ctx.fillStyle = "#4e342e";
        ctx.fillRect(x + 12, y - 24, 3, 21);
        ctx.fillRect(x + 45, y - 24, 3, 21);

        // 3. 中のベンチ（縁台）
        ctx.fillStyle = "#8d6e63";
        ctx.fillRect(x + 10, y - 9, 40, 3);
        ctx.fillRect(x + 14, y - 6, 3, 3); // ベンチ脚
        ctx.fillRect(x + 43, y - 6, 3, 3); // ベンチ脚

        // 4. 手前の柱（明るい茶色）
        ctx.fillStyle = "#6d4c41";
        ctx.fillRect(x + 6, y - 24, 4, 21);
        ctx.fillRect(x + 50, y - 24, 4, 21);

        // 5. 屋根（瓦屋根風の濃いグレー）
        ctx.fillStyle = "#37474f";
        ctx.beginPath();
        ctx.moveTo(x, y - 24);         // 屋根の左端
        ctx.lineTo(x + 60, y - 24);    // 屋根の右端
        ctx.lineTo(x + 44, y - 38);    // 屋根の上部・右
        ctx.lineTo(x + 16, y - 38);    // 屋根の上部・左
        ctx.closePath();
        ctx.fill();

        // 6. 屋根の棟（一番上の飾り・アクセント）
        ctx.fillStyle = "#263238";
        ctx.fillRect(x + 15, y - 40, 30, 2);
    }

    // 土の道の左端（例：X=15, Y=520あたり）に配置
    // ※右側の「drawChaya(210, 515)」と並べてバランスを見て調整してください
    drawAzumaya(15, 520);


    // =====================
    // 道端のお地蔵様（試し置き）
    // =====================
    const jizoX = canvas.width - 30;  // 横の位置（左右に動かしたいときはここを変更）
    const jizoY = 445; // 縦の位置（山道の上端あたり）

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
    // 奥森（一番奥の木々）
    // =====================
    ctx.fillStyle = theme.forest.far;
    for (let x = -15; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 320);
        ctx.lineTo(x + 15, 290);
        ctx.lineTo(x + 30, 320);
        ctx.fill();
    }

    // =====================
    // 後ろ側の森
    // =====================
    ctx.fillStyle = theme.forest.mid;
    for (let x = -15; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 380);
        ctx.lineTo(x + 15, 350);
        ctx.lineTo(x + 30, 380);
        ctx.fill();
    }

    // 後ろ側の森（Y=380）より手前に描画し、Y=388に配置
    drawGojunoto(15, 388, "wood");                  // 左端：木造の五重塔
    drawGojunoto(canvas.width - 59, 388, "red");    // 右端：赤系と白系の五重塔

    // =====================
    // 一番手前の森（塔の足元が少し隠れて自然になじむ）
    // =====================
    ctx.fillStyle = theme.forest.front;
    for (let x = 0; x < canvas.width; x += 30) {
        const height = (x / 30) % 2 === 0 ? 20 : 35;
        ctx.beginPath();
        ctx.moveTo(x, 400);
        ctx.lineTo(x + 15, 400 - height);
        ctx.lineTo(x + 30, 400);
        ctx.fill();
    }


    // =====================
    // 山のふもとの五重塔（森の間に配置！）
    // =====================
    function drawGojunoto(x, y, type = "wood") {
        const colors = type === "wood" ? {
            base: "#7a7a7a",    // 石の土台
            wall: "#6d4c41",    // 木造の壁（濃い茶色）
            pillar: "#4e342e",  // 木の柱（さらに濃い茶色）
            roof: "#37474f",    // 瓦屋根（濃いグレー）
            sorin: "#b0bec5"    // 相輪
        } : {
            base: "#8d8d8d",    // 石の土台
            wall: "#f5f5f5",    // 白壁
            pillar: "#c62828",  // 朱塗りの柱・欄干
            roof: "#263238",    // 濃い瓦屋根
            sorin: "#fbc02d"    // 金色の相輪
        };

        // 1. 土台（基壇）
        ctx.fillStyle = colors.base;
        ctx.fillRect(x + 4, y - 5, 36, 5);

        // 2. 五重の層
        for (let i = 0; i < 5; i++) {
            const layerY = y - 5 - (i * 13);
            const shrink = i * 2.5;

            const wallW = 28 - shrink;
            const wallX = x + 22 - (wallW / 2);
            const roofW = 42 - (shrink * 1.2);
            const roofX = x + 22 - (roofW / 2);

            ctx.fillStyle = colors.wall;
            ctx.fillRect(wallX, layerY - 8, wallW, 8);

            ctx.fillStyle = colors.pillar;
            ctx.fillRect(wallX, layerY - 8, 2, 8);
            ctx.fillRect(wallX + wallW - 2, layerY - 8, 2, 8);
            ctx.fillRect(x + 21, layerY - 8, 2, 8);

            ctx.fillStyle = colors.roof;
            ctx.beginPath();
            ctx.moveTo(roofX, layerY - 8);
            ctx.lineTo(roofX + roofW, layerY - 8);
            ctx.lineTo(roofX + roofW - 5, layerY - 13);
            ctx.lineTo(roofX + 5, layerY - 13);
            ctx.closePath();
            ctx.fill();
        }

        // 3. 相輪
        const topY = y - 5 - (5 * 13);
        ctx.fillStyle = colors.sorin;
        ctx.fillRect(x + 21, topY - 16, 2, 16);
        ctx.fillRect(x + 19, topY - 11, 6, 1.5);
        ctx.fillRect(x + 19, topY - 7, 6, 1.5);
    }

    // 後ろ側の森（Y=380）より手前に描画し、Y=388に配置
    drawGojunoto(15, 388, "wood");                  // 左端：木造の五重塔
    drawGojunoto(canvas.width - 59, 388, "red");    // 右端：赤系と白系の五重塔

    // =====================
    // 一番手前の森（塔の足元が少し隠れて自然になじむ）
    // =====================
    ctx.fillStyle = theme.mountain.front; //変更箇所
    for (let x = 0; x < canvas.width; x += 30) {
        const height = (x / 30) % 2 === 0 ? 20 : 35;
        ctx.beginPath();
        ctx.moveTo(x, 400);
        ctx.lineTo(x + 15, 400 - height);
        ctx.lineTo(x + 30, 400);
        ctx.fill();
    }
    // ススキ描画関数（x, y は根元の座標、scale は大きさ倍率）
    function drawSusuki(x, y, scale = 1.0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // 風で少し揺れる動き（leafOffsetを利用）
        const sway = Math.sin(leafOffset * 0.05 + x) * 2;

        // 茎（3本：左・中央・右に広がる）
        ctx.strokeStyle = "#8c6239";
        ctx.lineWidth = 1.5;

        // 左の茎
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-4, -10, -8 + sway, -18);
        ctx.stroke();

        // 中央の茎
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(0, -12, 1 + sway, -24);
        ctx.stroke();

        // 右の茎
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(4, -10, 9 + sway, -19);
        ctx.stroke();

        // 穂（黄金色・クリーム色のふわふわした先端）
        ctx.fillStyle = "#f2d16b";
        ctx.fillRect(-11 + sway, -22, 5, 7); // 左の穂
        ctx.fillRect(-1 + sway, -28, 5, 8);  // 中央の穂
        ctx.fillRect(7 + sway, -23, 5, 7);   // 右の穂

        // ハイライト（穂の先端を少し明るく）
        ctx.fillStyle = "#fff5cc";
        ctx.fillRect(-10 + sway, -22, 3, 3);
        ctx.fillRect(0 + sway, -28, 3, 4);
        ctx.fillRect(8 + sway, -23, 3, 3);

        ctx.restore();
    }

    // 変更箇所:秋の時だけススキを描画する
    if (season === "autumn") {
        drawSusuki(45, 402, 0.9);
        drawSusuki(65, 403, 1.1);
        drawSusuki(120, 401, 0.85);
        drawSusuki(280, 402, 1.0);
        drawSusuki(305, 403, 0.9);
        drawSusuki(360, 401, 1.05);
    }


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

    // =====================
    // 1. 真ん中の山頂のお寺（本堂）
    // =====================
    function drawMountainTemple(x, y) {
        // 石垣（土台）
        ctx.fillStyle = "#7a7a7a";
        ctx.fillRect(x - 22, y - 5, 44, 5);

        // 本堂の壁・柱（白壁と朱塗り柱）
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(x - 18, y - 17, 36, 12);
        ctx.fillStyle = "#c62828"; // 朱色の柱
        ctx.fillRect(x - 18, y - 17, 3, 12);
        ctx.fillRect(x - 6, y - 17, 2, 12);
        ctx.fillRect(x + 4, y - 17, 2, 12);
        ctx.fillRect(x + 15, y - 17, 3, 12);

        // 大屋根（瓦屋根）
        ctx.fillStyle = "#263238";
        ctx.beginPath();
        ctx.moveTo(x - 25, y - 17);
        ctx.lineTo(x + 25, y - 17);
        ctx.lineTo(x + 15, y - 27);
        ctx.lineTo(x - 15, y - 27);
        ctx.closePath();
        ctx.fill();

        // 屋根の棟（金の飾り）
        ctx.fillStyle = "#fbc02d";
        ctx.fillRect(x - 15, y - 28, 30, 2);
    }

    // =====================
    // 2. 山道の仁王門（山門）
    // =====================
    function drawNiomon(x, y) {
        // 石の土台（左右）
        ctx.fillStyle = "#7a7a7a";
        ctx.fillRect(x - 24, y - 4, 16, 4);
        ctx.fillRect(x + 8, y - 4, 16, 4);

        // 仁王門の左右の柱・格子（朱塗り）
        ctx.fillStyle = "#b71c1c";
        ctx.fillRect(x - 22, y - 26, 12, 22);
        ctx.fillRect(x + 10, y - 26, 12, 22);

        // 仁王像のシルエット（暗い格子の中）
        ctx.fillStyle = "#3e2723";
        ctx.fillRect(x - 19, y - 22, 6, 15);
        ctx.fillRect(x + 13, y - 22, 6, 15);

        // 中央の通路の奥（少し暗くして奥行きを出す）
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(x - 10, y - 24, 20, 20);

        // 上部の貫（ぬき・横木）と扁額（お寺の看板）
        ctx.fillStyle = "#c62828";
        ctx.fillRect(x - 24, y - 28, 48, 4);
        ctx.fillStyle = "#212121"; // 黒い扁額
        ctx.fillRect(x - 4, y - 27, 8, 6);
        ctx.fillStyle = "#fbc02d"; // 金文字風
        ctx.fillRect(x - 2, y - 25, 4, 2);

        // 仁王門の大きな瓦屋根（入母屋風）
        ctx.fillStyle = "#37474f";
        ctx.beginPath();
        ctx.moveTo(x - 30, y - 28);
        ctx.lineTo(x + 30, y - 28);
        ctx.lineTo(x + 18, y - 40);
        ctx.lineTo(x - 18, y - 40);
        ctx.closePath();
        ctx.fill();

        // 屋根の棟
        ctx.fillStyle = "#263238";
        ctx.fillRect(x - 18, y - 42, 36, 2);
    }

    // =====================
    // 3. ロープウェイ（ケーブル＋動くゴンドラ）
    // =====================
    function drawRopeway(startX, startY, endX, endY) {
        // 1. ロープ（2本のワイヤーを少しずらしてリアルに）
        ctx.strokeStyle = "rgba(40, 40, 40, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY + 2);
        ctx.lineTo(endX, endY + 2);
        ctx.stroke();

        // 2. ゴンドラの現在位置を計算（時間経過で0.0〜1.0を往復）
        // ※約16秒かけて片道をゆっくり移動します
        const progress = (Math.sin(Date.now() * 0.0004) + 1) / 2;
        const gx = startX + (endX - startX) * progress;
        const gy = startY + (endY - startY) * progress;

        // 3. ゴンドラ本体を描画
        // 懸垂アーム（ロープとゴンドラをつなぐアーム）
        ctx.fillStyle = "#424242";
        ctx.fillRect(gx - 1, gy, 2, 7);

        // キャビン（赤と白のレトロなゴンドラ）
        ctx.fillStyle = "#d32f2f"; // 上半分：赤
        ctx.fillRect(gx - 8, gy + 7, 16, 5);
        ctx.fillStyle = "#ffffff"; // 下半分：白
        ctx.fillRect(gx - 8, gy + 12, 16, 5);

        // 窓（水色）
        ctx.fillStyle = "#81d4fa";
        ctx.fillRect(gx - 6, gy + 8, 3, 3);
        ctx.fillRect(gx - 1.5, gy + 8, 3, 3);
        ctx.fillRect(gx + 3, gy + 8, 3, 3);
    }

    // --- 配置の実行 ---
    // 1. 真ん中の山の頂上付近にお寺を配置
    const templeX = canvas.width / 2;
    const templeY = 115;
    drawMountainTemple(templeX, templeY);

    // 2. 山道の右側（茶屋と被らない位置）に仁王門を移動！
    // ※右端の余裕を見ながら「canvas.width - 65」あたりに配置します
    const gateX = canvas.width - 65;
    const gateY = 525;
    drawNiomon(gateX, gateY);

    // 3. 仁王門の左横から山頂のお寺の右横まで、斜めにロープウェイを結ぶ
    drawRopeway(gateX - 15, gateY - 25, templeX + 18, templeY - 12);


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
    // =====================
    // 石畳の上の石灯籠（大小対応版）
    // =====================
    function drawToro(x, y, scale = 1.0) {
        ctx.save();
        ctx.translate(x, y);      // 基準点（灯籠の足元・左端）に移動
        ctx.scale(scale, scale);  // 全体のサイズを拡大・縮小

        // 1. 基礎（一番下の台座）
        ctx.fillStyle = "#7a7a7a";
        ctx.fillRect(0, -6, 24, 6);

        // 2. 竿（真ん中の柱）
        ctx.fillStyle = "#999999";
        ctx.fillRect(8, -22, 8, 16);

        // 3. 中台（火袋の下の受け皿）
        ctx.fillStyle = "#7a7a7a";
        ctx.fillRect(4, -26, 16, 4);

        // 4. 火袋（明かりが灯る部分）
        ctx.fillStyle = "#555555";
        ctx.fillRect(6, -36, 12, 10);
        // 火袋の中の温かい光
        ctx.fillStyle = "#ffcc33";
        ctx.fillRect(9, -34, 6, 6);

        // 5. 笠（屋根部分・三角形）
        ctx.fillStyle = "#666666";
        ctx.beginPath();
        ctx.moveTo(-2, -36);
        ctx.lineTo(26, -36);
        ctx.lineTo(12, -46);
        ctx.closePath();
        ctx.fill();

        // 6. 宝珠（てっぺんの丸い飾り）
        ctx.fillStyle = "#888888";
        ctx.fillRect(10, -49, 4, 3);

        ctx.restore(); // 拡大・縮小の設定を元に戻す
    }

    // --- 配置例 ---
    // 外側に「大きい灯籠（1.0倍）」、内側に「小さい灯籠（0.7倍）」を配置
    // ※プレイヤーが真ん中を通りやすいように間隔を空けています
    drawToro(20, 565, 1.0);                  // 左・大
    drawToro(75, 558, 0.7);                  // 左・小（少し奥に置くと遠近感が出ます）

    drawToro(canvas.width - 92, 558, 0.7);   // 右・小
    drawToro(canvas.width - 44, 565, 1.0);   // 右・大

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
    // 季節ごとの舞い散るエフェクト（若葉/ホタル・落ち葉・雪・桜の花びら）
    // ===================================
    let particleColor1 = "#b87733"; // デフォルト（秋）：茶色の落ち葉
    let particleColor2 = "#d4a017"; // デフォルト（秋）：黄金色の落ち葉
    let pWidth = 8;
    let pHeight = 5;

    if (season === "normal") {
        if (timeOfDay === "night") {
            // 通常・夜：幻想的なホタルの光
            particleColor1 = "#ccff90";
            particleColor2 = "#ffff8d";
            pWidth = 4;
            pHeight = 4;
        } else {
            // 通常・昼/夕方：爽やかな青葉（若葉）と黄色い蝶々
            particleColor1 = "#7cb342"; // 新緑の若葉
            particleColor2 = "#ffee58"; // モンキチョウの黄色
            pWidth = 7;
            pHeight = 5;
        }
    } else if (season === "spring") {
        // 春：淡い桜ピンクと濃い桜ピンクの花びら
        particleColor1 = "#ffb7c5";
        particleColor2 = "#ff8fa3";
        pWidth = 6;
        pHeight = 4;
    } else if (season === "winter") {
        // 冬：白と淡い氷色の粉雪
        particleColor1 = "#ffffff";
        particleColor2 = "#e1f5fe";
        pWidth = 4;
        pHeight = 4;
    }

    // 1グループ目（3枚）
    ctx.fillStyle = particleColor1;

    ctx.fillRect(
        60,
        (100 + leafOffset) % canvas.height,
        pWidth,
        pHeight
    );

    ctx.fillRect(
        220,
        (260 + leafOffset) % canvas.height,
        pWidth + 2,
        pHeight + 1
    );

    ctx.fillRect(
        320,
        (420 + leafOffset) % canvas.height,
        pWidth,
        pHeight
    );

    // 2グループ目（2枚）
    ctx.fillStyle = particleColor2;

    ctx.fillRect(
        140,
        (180 + leafOffset) % canvas.height,
        pWidth,
        pHeight
    );

    ctx.fillRect(
        280,
        (340 + leafOffset) % canvas.height,
        pWidth + 2,
        pHeight + 1
    );

}
