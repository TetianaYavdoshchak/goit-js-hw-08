import Player from "@vimeo/player";
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const saveCurentTimeJson = localStorage.getItem("videoplayer-current-time");

playSaveTime(saveCurentTimeJson);

player.on('timeupdate', throttle(saveCurentTime, 1000));
player.off('timeupdate', saveCurentTime);

function playSaveTime(saveTimeJson) {
    if (!saveTimeJson) {
        return;
    };
    try {
        const seconds = JSON.parse(saveTimeJson).seconds;
        player.setCurrentTime(seconds);
    } catch (error) {
        console.log(error.name); // "SyntaxError"
        console.log(error.message); // "Unexpected token u in JSON at position 1"
    }
}

function saveCurentTime(currentTime) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(currentTime));
}
