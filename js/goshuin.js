//札所のデータ一覧
const temples = [
    // 徳島（1～23）
    "霊山寺",
    "極楽寺",
    "金泉寺",
    "大日寺",
    "地蔵寺",
    "安楽寺",
    "十楽寺",
    "熊谷寺",
    "法輪寺",
    "切幡寺",
    "藤井寺",
    "焼山寺",
    "大日寺",
    "常楽寺",
    "國分寺",
    "観音寺",
    "井戸寺",
    "恩山寺",
    "立江寺",
    "鶴林寺",
    "太龍寺",
    "平等寺",
    "薬王寺",

    // 高知（24～39）
    "最御崎寺",
    "津照寺",
    "金剛頂寺",
    "神峯寺",
    "大日寺",
    "国分寺",
    "善楽寺",
    "竹林寺",
    "禅師峰寺",
    "雪蹊寺",
    "種間寺",
    "清瀧寺",
    "青龍寺",
    "岩本寺",
    "金剛福寺",
    "延光寺",

    // 愛媛（40～65）
    "観自在寺",
    "龍光寺",
    "佛木寺",
    "明石寺",
    "大宝寺",
    "岩屋寺",
    "浄瑠璃寺",
    "八坂寺",
    "西林寺",
    "浄土寺",
    "繁多寺",
    "石手寺",
    "太山寺",
    "圓明寺",
    "延命寺",
    "南光坊",
    "泰山寺",
    "栄福寺",
    "仙遊寺",
    "国分寺",
    "横峰寺",
    "香園寺",
    "宝寿寺",
    "吉祥寺",
    "前神寺",
    "三角寺",

    // 香川（66～88）
    "雲辺寺",
    "大興寺",
    "神恵院",
    "観音寺",
    "本山寺",
    "弥谷寺",
    "曼荼羅寺",
    "出釈迦寺",
    "甲山寺",
    "善通寺",
    "金倉寺",
    "道隆寺",
    "郷照寺",
    "天皇寺",
    "讃岐国分寺",
    "白峯寺",
    "根香寺",
    "一宮寺",
    "屋島寺",
    "八栗寺",
    "志度寺",
    "長尾寺",
    "大窪寺"
];

//localStorageから取得
const saveData = 
    JSON.parse(localStorage.getItem("henroShooterSave")) || [];

const collectedGoshuin =
    saveData.collectedGoshuin || [];    

//納経率表示
const collectionRate =
    document.getElementById("collectionRate");

const percent =
    Math.floor((collectedGoshuin.length / 88) * 100);    
    
collectionRate.textContent =
    `${collectedGoshuin.length} / 88 (${percent}%)`;

//一覧生成
const goshuinList =
     document.getElementById("goshuinList");

temples.forEach((temple, index) => {

    const div = document.createElement("div");

    div.classList.add("temple");

    if (collectedGoshuin.includes(temple)) {

        div.classList.add("acquired");

        div.textContent = 
           `✅ 第${index + 1}番 ${temple}`;

    } else {

        div.textContent = 
           `□ 第${index + 1}番 ${temple}`;

    }

    goshuinList.appendChild(div);

});

//タイトルへ戻る
document.getElementById("backButton")
     .addEventListener("click" , () => {

        playSE("pause");

        setTimeout(() => {

        window.location.href = "title.html";

    }, 300);    

});

// ==========================================
// 納経帳BGM
// ==========================================

let goshuinBGMStarted = false;

function startGoshuinBGM() {

    if (goshuinBGMStarted) return;

    goshuinBGMStarted = true;

    console.log("納経帳BGM開始");

    playBGM("goshuin");
}

document.addEventListener(
    "click",
    startGoshuinBGM,
    { once: true }
);