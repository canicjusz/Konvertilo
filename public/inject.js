'use strict';

const iframes = document.querySelectorAll("iframe");
let alreadyListening = false;
let isOn = false;
let localSuffix;
const addListenerToFrames = () => {
    alreadyListening = true;
    iframes.forEach((el) => {
        if (el.contentWindow) {
            const element = el.contentWindow;
            element.addEventListener("keydown", (e) => captureEvent(e, el.contentWindow), true);
        }
    });
};
let input;
let range;
let globalEvent;
let lettersRegex;
const getPreviousLetterInput = (value, carret, key) => {
    const previousIndex = carret - 1;
    const previousLetter = value[previousIndex];
    if (localSuffix.test(key)) {
        switch (previousLetter) {
            case "h":
                replaceInputValue(1, value, previousIndex, carret, "ĥ");
                break;
            case "H":
                replaceInputValue(1, value, previousIndex, carret, "Ĥ");
                break;
            case "ĥ":
                replaceInputValue(2, value, previousIndex, carret, "h" + key);
                break;
            case "Ĥ":
                replaceInputValue(2, value, previousIndex, carret, "H" + key);
                break;
            case "g":
                replaceInputValue(1, value, previousIndex, carret, "ĝ");
                break;
            case "G":
                replaceInputValue(1, value, previousIndex, carret, "Ĝ");
                break;
            case "ĝ":
                replaceInputValue(2, value, previousIndex, carret, "g" + key);
                break;
            case "Ĝ":
                replaceInputValue(2, value, previousIndex, carret, "G" + key);
                break;
            case "j":
                replaceInputValue(1, value, previousIndex, carret, "ĵ");
                break;
            case "J":
                replaceInputValue(1, value, previousIndex, carret, "Ĵ");
                break;
            case "ĵ":
                replaceInputValue(2, value, previousIndex, carret, "j" + key);
                break;
            case "Ĵ":
                replaceInputValue(2, value, previousIndex, carret, "J" + key);
                break;
            case "u":
                replaceInputValue(1, value, previousIndex, carret, "ŭ");
                break;
            case "U":
                replaceInputValue(1, value, previousIndex, carret, "Ŭ");
                break;
            case "ŭ":
                replaceInputValue(2, value, previousIndex, carret, "u" + key);
                break;
            case "Ŭ":
                replaceInputValue(2, value, previousIndex, carret, "U" + key);
                break;
            case "ĉ":
                replaceInputValue(2, value, previousIndex, carret, "c" + key);
                break;
            case "Ĉ":
                replaceInputValue(2, value, previousIndex, carret, "C" + key);
                break;
            case "c":
                replaceInputValue(1, value, previousIndex, carret, "ĉ");
                break;
            case "C":
                replaceInputValue(1, value, previousIndex, carret, "Ĉ");
                break;
            case "ŝ":
                replaceInputValue(2, value, previousIndex, carret, "s" + key);
                break;
            case "Ŝ":
                replaceInputValue(2, value, previousIndex, carret, "S" + key);
                break;
            case "s":
                replaceInputValue(1, value, previousIndex, carret, "ŝ");
                break;
            case "S":
                replaceInputValue(1, value, previousIndex, carret, "Ŝ");
                break;
        }
    }
};
function replaceInputValue(offset, str, start, end, replacement) {
    globalEvent.preventDefault();
    const newValue = str.slice(0, start) + replacement + str.slice(end);
    input.value = newValue;
    input.selectionEnd = input.selectionStart = start + offset;
}
function replaceContentEditable(offset, replacement, parent, value) {
    globalEvent.preventDefault();
    const end = range.endOffset;
    const savedRange = end + offset;
    const newValue = value.slice(0, end - 1) + replacement + value.slice(end);
    parent.textContent = newValue;
    range.setStart(parent, savedRange);
}
function getPreviousLetterContent(key) {
    const node = range.endContainer;
    const value = node.textContent;
    if (value) {
        const previousLetter = value[range.endOffset - 1];
        if (localSuffix.test(key)) {
            switch (previousLetter) {
                case "h":
                    replaceContentEditable(0, "ĥ", node, value);
                    break;
                case "H":
                    replaceContentEditable(0, "Ĥ", node, value);
                    break;
                case "ĥ":
                    replaceContentEditable(1, "h" + key, node, value);
                    break;
                case "Ĥ":
                    replaceContentEditable(1, "H" + key, node, value);
                    break;
                case "g":
                    replaceContentEditable(0, "ĝ", node, value);
                    break;
                case "G":
                    replaceContentEditable(0, "Ĝ", node, value);
                    break;
                case "ĝ":
                    replaceContentEditable(1, "g" + key, node, value);
                    break;
                case "Ĝ":
                    replaceContentEditable(1, "G" + key, node, value);
                    break;
                case "c":
                    replaceContentEditable(0, "ĉ", node, value);
                    break;
                case "C":
                    replaceContentEditable(0, "Ĉ", node, value);
                    break;
                case "ĉ":
                    replaceContentEditable(1, "c" + key, node, value);
                    break;
                case "Ĉ":
                    replaceContentEditable(1, "C" + key, node, value);
                    break;
                case "j":
                    replaceContentEditable(0, "ĵ", node, value);
                    break;
                case "J":
                    replaceContentEditable(0, "Ĵ", node, value);
                    break;
                case "ĵ":
                    replaceContentEditable(1, "j" + key, node, value);
                    break;
                case "Ĵ":
                    replaceContentEditable(1, "J" + key, node, value);
                    break;
                case "s":
                    replaceContentEditable(0, "ŝ", node, value);
                    break;
                case "S":
                    replaceContentEditable(0, "Ŝ", node, value);
                    break;
                case "ŝ":
                    replaceContentEditable(1, "s" + key, node, value);
                    break;
                case "Ŝ":
                    replaceContentEditable(1, "S" + key, node, value);
                    break;
                case "u":
                    replaceContentEditable(0, "ŭ", node, value);
                    break;
                case "U":
                    replaceContentEditable(0, "Ŭ", node, value);
                    break;
                case "ŭ":
                    replaceContentEditable(1, "u" + key, node, value);
                    break;
                case "Ŭ":
                    replaceContentEditable(1, "U" + key, node, value);
                    break;
            }
        }
    }
}
const getInputValueAndCaret = (element, key) => {
    var _a;
    input = element;
    const elementValue = input.value;
    const carretPosition = (_a = input.selectionStart) !== null && _a !== void 0 ? _a : 0;
    if (carretPosition > 0) {
        getPreviousLetterInput(elementValue, carretPosition, key);
    }
};
const createSelectionAndRange = (win, key) => {
    const sel = win.getSelection();
    if (sel) {
        range = sel.getRangeAt(0);
        const clonedRange = range.cloneRange();
        clonedRange.setStart(range.startContainer, 0);
        const rangeLength = clonedRange.toString().length;
        if (rangeLength > 0) {
            getPreviousLetterContent(key);
        }
    }
};
const isEditable = (key) => lettersRegex.test(key) && globalEvent.ctrlKey === false;
function captureEvent(e, win) {
    if (isOn) {
        const element = e.target;
        const key = e.key;
        globalEvent = e;
        if (isEditable(key)) {
            if (element.matches("input, textarea")) {
                getInputValueAndCaret(element, key);
            }
            else if (element.matches("[contenteditable]")) {
                createSelectionAndRange(win, key);
            }
        }
    }
}
const startEventListeners = () => {
    window.addEventListener("keydown", (e) => captureEvent(e, window), true);
    addListenerToFrames();
};
const createLetterRegex = (letter) => {
    const safeLetter = letter.replace(/[.^$*+?()[{|]/, "\\$&");
    const regex = new RegExp(safeLetter, "i");
    localSuffix = regex;
    lettersRegex = new RegExp("^[scjugh" + safeLetter + "]$", "i");
};
chrome.storage.sync.get(["enabled", "currSystem"], ({ enabled, currSystem }) => {
    if (typeof enabled === "undefined")
        enabled = true;
    if (typeof currSystem === "undefined")
        currSystem = "x";
    isOn = enabled;
    chrome.runtime.sendMessage({ enabled });
    createLetterRegex(currSystem);
    if (enabled && !alreadyListening) {
        startEventListeners();
    }
});
chrome.storage.onChanged.addListener(({ enabled, currSystem }) => {
    if (currSystem) {
        createLetterRegex(currSystem.newValue);
    }
    else if (enabled) {
        isOn = enabled.newValue;
        if (isOn && !alreadyListening) {
            startEventListeners();
        }
    }
});
