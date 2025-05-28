function updateSelectColor(level) {
    const select = document.getElementById("level-select");
    const colors = [
      "#a29bfe", // Level 1 - 淡紫
      "#81ecec", // Level 2 - 淡青
      "#74b9ff", // Level 3 - 藍
      "#55efc4", // Level 4 - 薄荷綠
      "#ffeaa7", // Level 5 - 淡黃
      "#fab1a0", // Level 6 - 粉橘
      "#ff7675", // Level 7 - 珊瑚紅
      "#fd79a8", // Level 8 - 粉紅
      "#e17055", // Level 9 - 橘紅
      "#d63031", // Level 10 - 紅
    ];
    select.style.backgroundColor = colors[level - 1] || "#74b9ff"; // 若超出預設範圍則使用預設色
  }
  