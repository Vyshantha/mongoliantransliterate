function hide() {
  document.getElementById("tooltip1").classList.remove("block");
  document.getElementById("tooltip2").classList.remove("block");
}
function show1() {
  document.getElementById("tooltip1").classList.add("block");
  var self = this;
  setTimeout(function () {
    self.hide();
  }, 3000);
}
function show2() {
  document.getElementById("tooltip2").classList.add("block");
  var self = this;
  setTimeout(function () {
    self.hide();
  }, 3000);
}

function swapTransliteration() {
  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2mongolian") {
    localStorage.setItem("direction", "mongolian2latin");
    document.getElementById("textarea1").readOnly = true;
    document.getElementById('textarea2').removeAttribute('readonly');
    document.getElementById("textarea2").focus();
    document.getElementById("Mongolian").classList.add("currentTab");
    document.getElementById("Latin").classList.remove("currentTab");
  } else if (localStorage.getItem("direction") == "mongolian2latin") {
    localStorage.setItem("direction", "latin2mongolian");
    document.getElementById('textarea1').removeAttribute('readonly');
    document.getElementById("textarea2").readOnly = true;
    if (localStorage.getItem("encoding") == "Latin")
      document.getElementById("textarea1").focus();
    document.getElementById("Mongolian").classList.remove("currentTab");
    document.getElementById("Latin").classList.add("currentTab");
  }
}

function clearFooter() {
  document.getElementsByClassName("footerOfPage")[0].style = "display:none";
}

function copyContent1() {
  navigator.clipboard.writeText(document.getElementById("textarea1").value);
}

function copyContent2() {
  navigator.clipboard.writeText(document.getElementById("textarea2").value);
}

function transliterate() {
  if (document.getElementById("textarea1").value.indexOf("script>") > -1 || document.getElementById("textarea2").value.indexOf("script>") > -1) {
    document.getElementById("textarea1").value = "";
    document.getElementById("textarea2").value = "";
    document.getElementById("textarea1").innerHTML = "";
    document.getElementById("textarea2").innerHTML = "";
  }

  /*  
    Mongolian Writing Systems : https://en.wikipedia.org/wiki/Mongolian_writing_systems
    Traditional Hudum : https://en.wikipedia.org/wiki/Mongolian_script
    Clear / Oirat : https://en.wikipedia.org/wiki/Clear_Script
    Manchu : https://en.wikipedia.org/wiki/Manchu_alphabet
    Galik : https://en.wikipedia.org/wiki/Galik_alphabet
    Xibe : https://en.wikipedia.org/wiki/Xibe_language#Writing_system
    Evenki : https://en.wikipedia.org/wiki/Evenki_language#China
    Languages : Mongolian - Khalkha, Chakhar, Oirat, Khamnigan, Buryat, Ordos, Khorchin, Kharchin, Baarin, Xilingol, Darkhad, Alasha, Tibetian, Sanskrit
    Unicode blocks : 
      https://en.wikipedia.org/wiki/Mongolian_(Unicode_block)
      https://en.wikipedia.org/wiki/Mongolian_Supplement
  */

  // Adhered Standard : ALA-LC romanization - https://en.wikipedia.org/wiki/ALA-LC_romanization
  // Complete ALA-LC romanisation : https://www.loc.gov/catdir/cpso/roman.html

  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2mongolian") {
    const latinToMongolian = { " ": "  ", ".": ".", ",": ",", ";": ";", "?": "?", "!": "!", "\"": "\"", "'": "'", "(": "(", ")": ")", ":": ":", "+": "+", "=": "=", "/": "/", "-": "-", "<": "<", ">": ">", "*": "*", "|": "|", "\\": "\\", "{": "{", "}": "}", "[": "[", "]": "]", "_": "_", "%": "%", "@": "@", "ˆ": "ˆ", "`": "`", "´": "´", "·": "·", "˙": "˙", "¯": "¯", "¨": "¨", "˚": "˚", "˝": "˝", "ˇ": "ˇ", "¸": "¸", "˛": "˛", "˘": "˘", "’": "’", "0":"᠐", "1":"᠑", "2":"᠒", "3":"᠓", "4":"᠔", "5":"᠕", "6":"᠖", "7":"᠗", "8":"᠘", "9":"᠙" };

    let resultMong = "";
    let textLa = document.getElementById("textarea1").value.toLowerCase();

    for (let u = 0; u < textLa.length; u++) {
      if (textLa[u].indexOf("\n") > -1) { // New Lines
        resultMong = resultMong + "\n";
      } else if (latinToMongolian[textLa[u]] != undefined && latinToMongolian[textLa[u]] != null && textLa[u] != "") { // Default Single Character
        resultMong = resultMong + latinToMongolian[textLa[u]];
      }
    }

    document.getElementById("textarea2").value = resultMong;
    document.getElementById("textarea2").innerHTML = resultMong;
  } else if (localStorage.getItem("direction") == "mongolian2latin") {
    const mongolianToLatin = { " ": " ", " ":"‑", "᠎":"‑", "।": ".", "॥": ".", ",": ",", ";": ";", "?": "?", "!": "!", "\"": "\"", "'": "'", "(": "(", ")": ")", ":": ":", "+": "+", "=": "=", "/": "/", "-": "-", "<": "<", ">": ">", "*": "*", "|": "|", "\\": "\\", "{": "{", "}": "}", "[": "[", "]": "]", "_": "_", "%": "%", "@": "@", "ˆ": "ˆ", "`": "`", "´": "´", "˜": "˜", "·": "·", "˙": "˙", "¯": "¯", "¨": "¨", "˚": "˚", "˝": "˝", "ˇ": "ˇ", "¸": "¸", "˛": "˛", "˘": "˘", "’": "’", "᠐":"0", "᠑":"1", "᠒":"2", "᠓":"3", "᠔":"4", "᠕":"5", "᠖":"6", "᠗":"7", "᠘":"8", "᠙":"9", "ᠠ":"a","ᠠ‍":"a","ᠠ‍":"a","‍ᠠ‍":"a","‍ᠠ":"a","‍ᠠ᠋":"a","ᠡ":"e","ᠡ‍":"e","‍ᠡ‍":"e","‍ᠡ":"e","‍ᠡ᠋":"e","ᠢ":"i","ᠢ‍":"i","‍ᠢ‍":"i","‍ᠢ":"i","ᠣ":"o","ᠣ‍":"o","‍ᠣ‍":"o","‍ᠣ":"o","ᠤ":"u","ᠤ‍":"u","‍ᠤ‍":"u","‍ᠤ":"u","ᠥ":"ö","ᠥ‍":"ö","‍ᠥ᠋‍":"ö","‍ᠥ‍":"ö","‍ᠥ":"ö","ᠦ":"ü","ᠦ‍":"ü","‍ᠦ᠋‍":"ü","‍ᠦ‍":"ü","‍ᠦ":"ü", "ᠨ":"","ᠨ‍":"","‍ᠨ‍":"","‍ᠨ᠋‍":"","‍ᠨ":"n","ᠨ‍᠎":"n","ᠩ":"ng","ᠩ‍":"ng","‍ᠩ":"ng","ᠪ":"b","ᠪ‍":"b","‍ᠪ‍":"b","‍ᠪ":"b","ᠫ":"p","ᠫ‍":"p","‍ᠫ‍":"p","ᠬ":"q","ᠬ":"q","‍ᠬ‍":"q","‍ᠬ":"q","ᠭ":"g","ᠭ":"γ","‍ᠭ‍":"γ","‍ᠭ᠋‍":"γ","‍ᠭ":"γ","ᠭ":"γ","":"γ","ᠮ":"m","ᠮ‍":"m","‍ᠮ‍":"m","‍ᠮ":"m","ᠯ":"l","ᠯ‍":"l","‍ᠯ‍":"l","‍ᠯ":"l","ᠰ":"s","ᠰ‍":"s","‍ᠰ‍":"s","‍ᠰ":"s","ᠱ":"š","ᠱ‍":"š","‍ᠱ‍":"š","‍ᠱ":"š","ᠲ":"t","ᠲ‍":"t","‍ᠲ‍":"t","ᠳ":"d","ᠳ‍":"d","‍ᠳ‍":"d","‍ᠳ᠋‍":"d","‍ᠳ":"d","ᠴ":"č","ᠴ‍":"č","‍ᠴ‍":"č","ᠵ":"ǰ","ᠵ‍":"ǰ","‍ᠵ‍":"ǰ","ᠶ":"y","ᠶ‍":"y","‍ᠶ‍":"y","‍ᠶ":"y","ᠷ":"r","ᠷ‍":"r","‍ᠷ‍":"r","‍ᠷ":"r","᠀":"","᠀᠋":"","᠀᠌":"","᠀᠍":"","᠂":",","᠈":",","᠉":".","᠃":".","᠅":"","᠁":"…","᠄":":","᠆":"","᠇":"","᠊":"-","ᠠ᠋":"a","ᠠ᠋᠎ᠠ":"ā","ᠢ":"i","ᠢᠢ":"ī","ᠦ᠋":"u","ᠤᠦ":"ū","ᠷᠢ":"ṛ","ᠷᠢᠢ":"ṝ","ᠯᠢ":"ḷ","ᠯᠢᠢ":"ḹ","ᠧ":"e","ᠧᠧ":"ai","ᠣᠸᠠ":"o","ᠣᠸᠸᠠ":"au","ᢀ᠋ᠠ᠋":"aṃ","ᠠ᠋ᢁ":"aḥ","ᢀ":"ã","ᢀ᠋":"ṃ","ᢁ":"ḥ","ᢁ᠋":"","ᢂ":"","ᢃ":"","ᢄ":"","ᢅ":"","ᢆ":""," ᢩ":"","ᢉᠠ":"ka","ᠻᠠ":"kha","ᠺᠠ":"ga","ᠺᠾᠠ᠋":"gha","ᢊᢇ":"ṅa","ᢋᠠ᠋":"ca","ᠼᠠ᠋":"cha","ᢖᠠ᠋":"ja","ᠽᠠ᠋":"ja","ᢖᠾᠠ᠋":"jha","ᠽᠾᠠ᠋":"jha","ᡛᠠ᠋":"ña","ᢌᠠ᠋":"ṭa","ᢍᠠ᠋":"ṭha","ᢎᠠ᠋":"ḍa","ᢎᠾᠠ᠋":"ḍha","ᢏᠠ᠋":"ṇa","ᢐᠠ᠋":"ta","ᠲᠠ᠋":"tha","ᡐᠠ᠋":"tha","ᢑᠠ᠋":"da","ᡑᠠ᠋":"da","ᢑᠾᠠ᠋":"dha","ᡑᠾᠠ᠋":"dha","ᠨᠠ᠋":"na","ᢒᠠ":"pa","ᠹᠠ":"pha","ᠪᠠ":"ba","ᠪᠾᠠ᠋":"bha","ᠮᠠ᠋":"ma","ᠶ᠋ᠠ᠋":"ya","ᠷᠠ᠋":"ra","ᠯᠠ᠋":"la","ᠸᠠ᠋":"va","ᢕᠠ᠋":"zha","ᠱᠠ᠋":"śa","ᢔᠠ᠋":"ṣa","ᠰᠠ᠋":"sa","ᠾᠠ᠋":"ha","ᢖᠠ᠋":"za","ᢗᠠ᠋":"'a","ᢉᢔᠠ᠋":"kṣa","ᢚ":"gha","ᢛ":"nga","ᢜ":"ca","ᢝ":"jha","ᢞ":"tta","ᢟ":"ddha","ᢠ":"ta","ᢡ":"dha","ᢢ":"ssa","ᢣ":"cya","ᢤ":"zha","ᢥ":"za","ᢦ":"ᴗ","ᢧ":"y","ᢨ":"bha","ᢪ":"lha" };

    // display:inline-block; font-weight:normal; font-size: 2em; line-height: 1.2em; -webkit-writing-mode: vertical-lr; -o-writing-mode: vertical-lr; -ms-writing-mode: tb-lr; writing-mode: tb-lr; writing-mode: vertical-lr;; text-orientation: sideways; vertical-align:middle;
    // https://en.wikipedia.org/wiki/Mongolian_script
    // hudum_vow = {"ᠠ":"a","ᠠ‍":"a","ᠠ‍":"a","‍ᠠ‍":"a","‍ᠠ":"a","‍ᠠ᠋":"a","ᠡ":"e","ᠡ‍":"e","‍ᠡ‍":"e","‍ᠡ":"e","‍ᠡ᠋":"e","ᠢ":"i","ᠢ‍":"i","‍ᠢ‍":"i","‍ᠢ":"i","ᠣ":"o","ᠣ‍":"o","‍ᠣ‍":"o","‍ᠣ":"o","ᠤ":"u","ᠤ‍":"u","‍ᠤ‍":"u","‍ᠤ":"u","ᠥ":"ö","ᠥ‍":"ö","‍ᠥ᠋‍":"ö","‍ᠥ‍":"ö","‍ᠥ":"ö","ᠦ":"ü","ᠦ‍":"ü","‍ᠦ᠋‍":"ü","‍ᠦ‍":"ü","‍ᠦ":"ü"}
    // hudum_con = {"ᠨ":"","ᠨ‍":"","‍ᠨ‍":"","‍ᠨ᠋‍":"","‍ᠨ":"n","‍‍&zwj;ᠨ‍᠎":"n","ᠩ":"ng","ᠩ‍":"ng","‍ᠩ":"ng","ᠪ":"b","ᠪ‍":"b","‍ᠪ‍":"b","‍ᠪ":"b","ᠫ":"p","ᠫ‍":"p","‍ᠫ‍":"p","ᠬ":"q","ᠬ":"q","‍ᠬ‍":"‍q","‍ᠬ":"q","ᠭ":"g","ᠭ":"g","‍ᠭ‍":"g","‍ᠭ᠋‍":"g","‍ᠭ":"g","‍&zwj;ᠭ":"g","":"g","ᠮ":"m","ᠮ‍":"m","‍ᠮ‍":"m","‍ᠮ":"m","ᠯ":"l","ᠯ‍":"l","‍ᠯ‍":"l","‍ᠯ":"l","ᠰ":"s","ᠰ‍":"s","‍ᠰ‍":"s","‍ᠰ":"s","ᠱ":"š","ᠱ‍":"š","‍ᠱ‍":"š","‍ᠱ":"š","ᠲ":"t","ᠲ‍":"t","‍ᠲ‍":"t","ᠳ":"d","ᠳ‍":"d","‍ᠳ‍":"d","‍ᠳ᠋‍":"d","‍ᠳ":"d","ᠴ":"č","ᠴ‍":"č","‍ᠴ‍":"č","ᠵ":"ǰ","ᠵ‍":"ǰ","‍ᠵ‍":"ǰ","ᠶ":"y","ᠶ‍":"y","‍ᠶ‍":"y","‍ᠶ":"y","ᠷ":"r","ᠷ‍":"r","‍ᠷ‍":"r","‍ᠷ":"r"}
    // hudum_punc = {"᠀":"","᠀᠋":"","᠀᠌":"","᠀᠍":"","᠂":",","᠈":",","᠉":".","᠃":".","᠅":"","᠁":"…","᠄":":","᠆":"­","᠇":"","᠊":"-"}
    
    // https://en.wikipedia.org/wiki/Galik_alphabet
    // galik_vow = {"ᠠ᠋":"a","ᠠ᠋᠎ᠠ":"ā","ᠢ":"i","ᠢᠢ":"ī","ᠦ᠋":"u","ᠤᠦ":"ū","ᠷᠢ":"ṛ","ᠷᠢᠢ":"ṝ","ᠯᠢ":"ḷ","ᠯᠢᠢ":"ḹ","ᠧ":"e","ᠧᠧ":"ai","ᠣᠸᠠ":"o","ᠣᠸᠸᠠ":"au","ᢀ᠋ᠠ᠋":"aṃ","ᠠ᠋ᢁ":"aḥ"}
    // galik_dia = {"ᢀ":"ã","ᢀ᠋":"ṃ","ᢁ":"ḥ","ᢁ᠋":"","ᢂ":"","ᢃ":"","ᢄ":"","ᢅ":"","ᢆ":""," ᢩ":""}
    // galik_con = {"ᢉᠠ":"ka","ᠻᠠ":"kha","ᠺᠠ":"ga","ᠺᠾᠠ᠋":"gha","ᢊᢇ":"ṅa","ᢋᠠ᠋":"ca","ᠼᠠ᠋":"cha","ᢖᠠ᠋":"ja","ᠽᠠ᠋":"ja","ᢖᠾᠠ᠋":"jha","ᠽᠾᠠ᠋":"jha","ᡛᠠ᠋":"ña","ᢌᠠ᠋":"ṭa","ᢍᠠ᠋":"ṭha","ᢎᠠ᠋":"ḍa","ᢎᠾᠠ᠋":"ḍha","ᢏᠠ᠋":"ṇa","ᢐᠠ᠋":"ta","ᠲᠠ᠋":"tha","ᡐᠠ᠋":"tha","ᢑᠠ᠋":"da","ᡑᠠ᠋":"da","ᢑᠾᠠ᠋":"dha","ᡑᠾᠠ᠋":"dha","ᠨᠠ᠋":"na","ᢒᠠ":"pa","ᠹᠠ":"pha","ᠪᠠ":"ba","ᠪᠾᠠ᠋":"bha","ᠮᠠ᠋":"ma","ᠶ᠋ᠠ᠋":"ya","ᠷᠠ᠋":"ra","ᠯᠠ᠋":"la","ᠸᠠ᠋":"va","ᢕᠠ᠋":"zha","ᠱᠠ᠋":"śa","ᢔᠠ᠋":"ṣa","ᠰᠠ᠋":"sa","ᠾᠠ᠋":"ha","ᢖᠠ᠋":"za","ᢗᠠ᠋":"'a","ᢉᢔᠠ᠋":"kṣa","ᢚ":"gha","ᢛ":"nga","ᢜ":"ca","ᢝ":"jha","ᢞ":"tta","ᢟ":"ddha","ᢠ":"ta","ᢡ":"dha","ᢢ":"ssa","ᢣ":"cya","ᢤ":"zha","ᢥ":"za","ᢦ":"ᴗ","ᢧ":"y","ᢨ":"bha","ᢪ":"lha"}
    
    // https://en.wikipedia.org/wiki/Clear_Script
    // oirat_vow = {"ᠠ‍":"a","‍ᠠ‍":"a","‍ᠠ":"a","ᡄ‍":"e","‍ᡄ‍":"e","‍ᡄ":"e","ᡅ‍":"i","‍ᡅ‍":"i","‍ᡅ":"i","ᡆ‍":"o","‍ᡆ‍":"o","‍ᡆ":"o","ᡇ‍":"u","‍ᡇ‍":"u","‍ᡇ":"u","ᡈ‍":"ö","‍ᡈ‍":"ö","‍ᡈ":"ö","ᡉ‍":"ü","‍ᡉ‍":"ü","‍ᡉ":"ü","ᠠᡃ‍":"âā","‍ᠠᡃ‍":"âā","ᡄᡃ‍":"êē","‍ᡄᡃ‍":"êē","‍ᡄᡃ":"êē","ᡅᡅ‍":"iyi ii ī","‍ᡅᡅ‍":"iyi ii ī","‍ᡅᡅ":"iyi ii ī","ᡆᡃ‍":"ô ō","‍ᡆᡃ‍":"ô ō","‍ᡆᡃ":"ô ō","ᡇᡇ᠌‍":"û uu ū","‍ᡇᡇ᠌‍":"û uu ū","‍ᡇᡇ᠋":"û uu ū","ᡈᡃ‍":"ö̂ ȫ","‍ᡈᡃ‍":"ö̂ ȫ","‍ᡈᡃ":"ö̂ ȫ","ᡉᡉ‍":"üü ǖ","‍ᡉᡉ‍":"üü ǖ","‍ᡉᡉ":"üü ǖ"}
    // oirat_con = {"ᡋ‍":"b‍","‍ᡋ‍":"b","‍ᡋ":"b","ᡏ‍":"m","‍ᡏ‍":"m","‍ᡏ":"m","ᠯ‍":"l","‍ᠯ‍":"l","‍ᠯ":"l","ᠰ‍":"s","‍ᠰ‍":"s","‍ᠰ":"s","ᠱ‍":"š ś","‍ᠱ‍":"š ś","‍ᠱ":"š ś","ᠨ‍":"n","‍ᠨ‍":"n","‍ᠨ᠋‍":"n","‍ᠨ":"n","ᡍ‍":"x","‍ᡍ‍":"x","ᡍ᠋‍":"k","‍ᡍ᠋‍":"k","ᡎ‍":"γ ġ","‍ᡎ‍":"γ ġ","ᡎ᠋‍":"q","‍ᡎ":"q","ᡐ‍":"t","‍ᡐ‍":"t","ᡑ‍":"d","‍ᡑ‍":"d","‍ᡑ":"d","ᡔ‍":"c č","‍ᡔ‍":"c č","ᡒ‍":"č","‍ᡒ‍":"č","ᠴ‍":"z j","‍ᠴ‍":"z j","ᡓ‍":"ǰ","‍ᡓ‍":"ǰ","ᡕ‍":"y","‍ᡕ‍":"y","ᠷ‍":"r","‍ᠷ‍":"r","‍ᠷ":"r","ᡊ‍":"ng","‍ᡊ":"ng","ᡌ‍":"f","‍ᡌ‍":"f","ᡙ‍":"h","‍ᡙ‍":"h","ᡘ‍":"g","‍ᡘ‍":"g","‍ᡘ":"g","ᡗ‍":"k’","‍ᡗ‍":"k’","ᡚ‍":"j z̦̆","‍ᡚ‍":"j z̦̆","ᡛ‍":"ñ","ᡜ‍":"j","‍ᡜ‍":"j","ᢘ‍":"—","‍ᢘ‍":"—","‍ᢘ":"—","ᢙ‍":"ź","‍ᢙ‍":"ź","ᠸ‍":"w/v","‍ᠸ‍":"w/v","‍ᠸ":"w/v","ᡖ‍":"v","‍ᡖ‍":"v","‍ᡖ":"v"}
    // oirat_liga = {"ᡋᠠ‍":"ba","ᡋᠠ‍":"ba","ᡋᠠ":"ba","ᡄ‍":"be","‍ᡋᡄ‍":"be","ᡋᡄ":"be","ᡋᡅ‍":"bi","ᡋᡅ‍":"bi","ᡋᡅ":"bi","ᡋᡆ‍":"bo","ᡋᡆ‍":"bo","ᡋᡆ":"bo","ᡋᡇ‍":"bu","‍ᡋᡇ":"bu","‍ᡋᡇ":"bu","ᡋᡈ‍":"bö","ᡋᡈ‍":"bö","ᡋᡈ":"bö","ᡋᡉ‍":"bü","ᡋᡉ‍":"bü","ᡋᡉ":"bü","ᡗᠠ‍":"ka","ᡗᠠ‍":"ka","ᡗᠠ":"ka","ᡍᡄ‍":"ke","ᡍᡄ‍":"ke","ᡍᡄ":"ke","ᡍᡅ‍":"ki,"‍ᡍᡅ‍":"ki,"‍ᡍᡅ":"ki","ᡗᡆ‍":"ko","ᡗᡆ‍":"ko","ᡗᡆ":"ko","ᡗᡇ‍":"ku","ᡗᡇ‍":"ku","ᡗᡇ":"ku","ᡍᡈ‍":"kö","ᡍᡈ‍":"kö","ᡍᡈ":"kö","ᡍᡉ‍":"kü","‍ᡍᡉ"‍:"kü",	"‍ᡍᡉ":"kü","ᡘᠠ‍"‍:"ga","ᡘᠠ‍":"ga","ᡘᠠ":"ga","ᡎᡄ‍ ‍ᡎᡄ‍	‍ᡎᡄ":"ge","ᡎᡅ‍ ‍ᡎᡅ‍ ‍ᡎᡅ":"gi","ᡘᡆ‍	‍ᡘᡆ‍	‍ᡘ":"go","ᡘᡇ‍	‍ᡘᡇ‍	‍ᡘᡇ":"gu","ᡎᡈ‍	‍ᡎᡈ‍	‍ᡎᡈ":"gö","ᡎᡉ‍	‍ᡎᡉ‍	‍ᡎᡉ":"gü"}

    // https://en.wikipedia.org/wiki/Manchu_alphabet
    // manchu_vow = {"ᠠ	ᠠ᠊	᠊ᠠ᠊	᠊ᠠ ᠊ᠠ᠋":"a","ᡝ	ᡝ᠊	᠊ᡝ᠊	᠊ᡝ ‍ᡝ᠋":"e","ᡳ	ᡳ᠊	᠊ᡳ᠊ ᠊ᡳ᠋᠊	᠊ᡳ ᠊ᡳ᠋":"i","ᠣ	ᠣ᠊	᠊ᠣ᠊	᠊ᠣ ᠊ᠣ᠋":"o","ᡠ	ᡠ᠊	᠊ᡠ᠊	᠊ᡠ":"u","ᡡ	ᡡ᠊	᠊ᡡ᠊	᠊ᡡ":"ū/uu","ᡟ᠊	᠊ᡟ":"y/y/i'","ᡳᠣᡳ	ᡳᠣᡳ᠊	᠊ᡳᠣᡳ᠊	᠊ᡳᠣᡳ":"ioi"}
    // manchu_con = {"ᠨ᠊	᠊ᠨ᠋᠊  ᠊ᠨ᠊	᠊ᠨ ᠊ᠨ᠋":"n","᠊ᠩ᠊	᠊ᠩ":"ng","ᡴ᠊	᠊ᡴ᠊ ᠊ᡴ᠋᠊	᠊ᡴ":"k","᠊ᡴ᠌᠊	᠊ᡴ᠋":"k","ᡤ᠊	᠊ᡤ᠊":"g","ᡥ᠊	᠊ᡥ᠊":"h","ᠪ᠊	᠊ᠪ᠊	᠊ᠪ":"b","ᡦ᠊	᠊ᡦ᠊":"p","ᠰ᠊	᠊ᠰ᠊	᠊ᠰ":"s","ᡧ᠊	᠊ᡧ᠊":"š","ᡨ᠋᠊	᠊ᡨ᠋᠊":"t","᠊ᡨ᠌᠊	᠊ᡨ":"t","ᡨ᠌᠊	᠊ᡨ᠍᠊":"t","ᡩ᠊	᠊ᡩ᠊":"d","ᡩ᠋᠊	᠊ᡩ᠋᠊":"d","ᠯ᠊	᠊ᠯ᠊	᠊ᠯ":"l","ᠮ᠊	᠊ᠮ᠊	᠊ᠮ":"m","ᠴ᠊	᠊ᠴ᠊":"c/ch/č/q","ᠵ᠊	᠊ᠵ᠊":"j/zh/ž","ᠶ᠊	᠊ᠶ᠊":"y","ᡵ᠊	᠊ᡵ᠊	᠊ᡵ":"r","ᡶ‍	‍ᡶ‍":"f","ᡶ᠋‍	‍ᡶ᠋‍":"f","ᠸ᠊	᠊ᠸ᠊":"v","ᠺ᠊	᠊ᠺ᠊":"k'/kk/k῾/k’","ᡬ᠊	᠊ᡬ᠊":"g'/gg/ǵ/g’","ᡭ᠊	᠊ᡭ᠊":"h'/hh/h́/h’","ᡮ᠊	᠊ᡮ":"ts'/c/ts῾/c","ᡯ᠊	᠊ᡯ᠊":"dz/z/dz/z","ᡰ᠊	᠊ᡰ᠊":"ž/rr/ž/r’","ᡱ᠊	᠊ᡱ":"c'/ch/c῾/c’","ᡷ᠊	᠊ᡷ᠊":"j/zh/j̊/j’"}

    let resultLa = "";
    let textMong = document.getElementById("textarea2").value;
    for (let u = 0 ; u < textMong.length ; u++ ) {
      if (textMong[u].indexOf("\n") > -1) {
        resultLa = resultLa + "\n";
      } else if (mongolianToLatin[textMong[u]] != undefined && mongolianToLatin[textMong[u]] != null && textMong[u] != "") {
        resultLa = resultLa + mongolianToLatin[textMong[u]];
      }
    }
    document.getElementById("textarea1").value = resultLa;
    document.getElementById("textarea1").innerHTML = resultLa;
  }
}

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function openTab(evt, localeName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(localeName).style.display = "block";
  evt.currentTarget.className += " active";
  localStorage.setItem("encoding", localeName);
  transliterate();
}

function top2bottom() {
  if (localStorage.getItem("vertical") == null || localStorage.getItem("vertical") == undefined || localStorage.getItem("vertical") == "false") {
    document.getElementById("Mongolian").classList.add("top2Bottom");
    localStorage.setItem("vertical", "true");
  } else {
    document.getElementById("Mongolian").classList.remove("top2Bottom");
    localStorage.setItem("vertical", "false");
  }
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
document.getElementById("textarea1").focus();
if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "mongolian2latin") {
  localStorage.setItem("direction", "latin2mongolian");
  localStorage.setItem("encoding", "Latin");
} else if (localStorage.getItem("direction") != "mongolian2latin" && localStorage.getItem("direction") != "latin2mongolian") {
  localStorage.clear();
}

if (screen.width >= 300 && screen.width <= 500) {
  document.getElementById("Mongolian").classList.remove("mongolianTabText");
  document.getElementById("Mongolian").classList.add("mongolianTabSmallScreen");
  document.getElementById("Latin").classList.remove("tabcontent");
  document.getElementById("Latin").classList.add("tabcontentSmallScreen");
}
