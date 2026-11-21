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

    /*ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);*/
    //山
    ctx.fillStyle = "#263c22";
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

    ctx.fillStyle = "#4e7f46";

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
    ctx.fillStyle = "#3a6b35";

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
    // 山道・地面のベース（追加）
    // =====================
    // 1. 山の裾野から石畳までのベース（深い緑や土色など）
    ctx.fillStyle = "#2b4a26"; // 山の裾野になじむ濃い緑（土色にするなら "#6b543a" など）
    ctx.fillRect(0, 280, canvas.width, canvas.height - 280);
    // 2. 少し川を流す（2段目のギザギザ木々のすぐ下あたり）
    ctx.fillStyle = "#1E5282"; // 空と同じ爽やかな青（少し濃い川色なら "#2d6ca2"）
    ctx.fillRect(0, 395, canvas.width, 70); // 高さ35pxの細めの川

    // 川の水面のキラキラ（白い細い線を入れて川らしさを出す）
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.fillRect(40, 405, 50, 2);
    ctx.fillRect(180, 415, 70, 2);
    ctx.fillRect(260, 402, 40, 2);
    ctx.fillRect(90, 448, 60, 2);  // 追加
    ctx.fillRect(210, 452, 45, 2); // 追加


    // 2. 山道（土の道）の表現（お好みで追加）
    ctx.fillStyle = "#8c7355"; // 土の色
    ctx.fillRect(0, 465, canvas.width, 75); // Y=380あたりから石畳までを道にする例
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
    ctx.fillStyle = "#356835";
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
    ctx.fillStyle = "#2a5d2a";
    for (let x = -15; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 380);
        ctx.lineTo(x + 15, 350);
        ctx.lineTo(x + 30, 380);
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
    ctx.fillStyle = "#1f4f1f";
    for (let x = 0; x < canvas.width; x += 30) {
        const height = (x / 30) % 2 === 0 ? 20 : 35;
        ctx.beginPath();
        ctx.moveTo(x, 400);
        ctx.lineTo(x + 15, 400 - height);
        ctx.lineTo(x + 30, 400);
        ctx.fill();
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
