"use strict";

const fElement = document.getElementById("form");
const iElement = document.getElementById("input");
const bEncrypt = document.getElementById("encrypter");
const bDecrypt = document.getElementById("decrypt");
const rEncryptElement = document.getElementById("result-encrypt");
const rTextElement = document.getElementById("result");
const bCopy = document.getElementById("copy");
const bodyEl = document.getElementsByTagName("body")[0];

const bElement = document.querySelector(".banner");
const wResultElement = document.querySelector(".with-result");

const normText = (t) => {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[!@#^{}[\]]/g, "");
};

let mColorMode = true;

const encText = (t) => {
  const reps = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  let encStr = t;
  for (let j = 0; j < reps.length; j++) {
    const [ch, rep] = reps[j];
    encStr = encStr.replace(new RegExp(ch, "g"), rep);
  }

  return encStr;
};

const decText = (t) => {
  return t
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
};

fElement.addEventListener("submit", (e) => {
  e.preventDefault();
});

iElement.addEventListener("input", (e) => {
  const t = e.target.value;

  e.target.value = normText(t);
});

bEncrypt.addEventListener("click", () => {
  const t = encText(iElement.value);

  bElement.classList.add("hide");
  wResultElement.classList.remove("hide");

  rTextElement.innerHTML = t;
});

bDecrypt.addEventListener("click", () => {
  const t = decText(iElement.value);

  bElement.classList.add("hide");
  wResultElement.classList.remove("hide");

  rTextElement.innerHTML = t;
});

bCopy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(rTextElement.innerText)
    .then(() => alert("Texto copiado en el clipboard"))
    .catch((err) => console.error("Error al copiar", err));
});

function changeMode() {
  if (!mColorMode) {
    mColorMode = true;
  } else {
    mColorMode = false;
  }
  if (mColorMode) {
    /* LIGHT MODE */
    bodyEl.style.backgroundColor = "#303030";
  } else {
    /* DARK MODE */
    bodyEl.style.backgroundColor = "#f3f5fc";
  }
}
