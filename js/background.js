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

    /*ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);*/
    //山
    ctx.fillStyle = "#5f8f55";
    //左の山
    ctx.beginPath();
    ctx.moveTo(0, 280);
    ctx.lineTo(90, 180);
    ctx.lineTo(180, 280);
    ctx.fill();
    //右の山
    ctx.beginPath();
    ctx.moveTo(220, 280);
    ctx.lineTo(340, 160);
    ctx.lineTo(460, 280);
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

    for (let x = -80; x < canvas.width + 100; x += 120) {

        ctx.beginPath();

        ctx.moveTo(x, 250);
        ctx.lineTo(x + 60, 140);
        ctx.lineTo(x + 120, 250);

        ctx.fill();
    }

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