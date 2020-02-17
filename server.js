const express = require("express");
const fs = require("fs");
var path = require('path');

var shuffle = require('shuffle-array')

let datetoday = new Date();
let hours = datetoday.getHours();
let minutes = datetoday.getMinutes();
let seconds = datetoday.getSeconds();
let days = datetoday.getDay();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

var listItems = ['nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'a sheet -- css basics', 'a hammer', 'a rusted key', 'a meditation guide'];
var listResults = ['nothing happened.','nothing happened.','nothing happened.','great effort.','not this way.','good choice','the subject earsed the wall and escaped','the wall is unbreakable','magical! the key is stuck in the keyhole','great. the subject has decided to spend the rest of your life with this page'];
var listLinks = ['javascript: void(0)','javascript: void(0)','javascript: void(0)','javascript: void(0)','javascript: void(0)','javascript: void(0)','/escaped','javascript: void(0)','javascript: void(0)','/room'];
var ranNums = [0,1,2,3,4,5,6,7,8,9];
//var ranNums = [];

// non-repeating random number from 0 - 5

// for (var i = listNums.length; i > 0; i--) {
//        var  j = Math.floor(Math.random() * (i));
//         ranNums.push(listNums[j]);
//         listNums.splice(j,1);
// }
shuffle(ranNums);

app.get("/", (req,res) => {
    var whatday;
    var whattime;

    if (days < 6 && days > 0){
        whatday = "working day";
    } else {
        whatday = "weekend";
    }

    if (hours < 4 && hours > -1){
        whattime = "midnight";
    } else if (hours < 7 && hours > 3) {
        whattime = "down";
    } else if (hours < 12 && hours > 6) {
        whattime = "morning";
    } else if (hours == 12) {
        whattime = "noon";
    } else if (hours > 12 && hours < 18) {
        whattime = "afternoon";
    } else if (hours > 17 && hours < 22) {
        whattime = "evening";
    } else if (hours > 21 && hours < 24) {
        whattime = "night";
    }
    
    const time = hours + ":" + minutes + ":" + seconds + " -- " + whatday + " -- " + whattime;
    console.log(days, time);

    const template = fs.readFileSync("template/homepage.html", "utf8");
    const currentTime = template.replace("%%TIME%%", time);
    res.send(currentTime);
})

    // var timeInterval = Math.floor((cDate_ob-date_ob)/1000);

    // console.log(timeInterval);

    // setTimeout(function () {
    //     console.log('timeout completed'); 
    //     app.get("/awhiteroom", (req,res) => {
    //         const template2 = fs.readFileSync("template/room.html", "utf8");
    //         res.send(template2);
    //     })
    // }, 5000); 

var counter = 0;

app.get("/room", (req,res) => {
    // random number from 0 - 5
    // listNums = Array.from({length: 6}, () => Math.floor(Math.random() * 6));
    console.log(ranNums,counter);

    let template = fs.readFileSync("template/room2.html", "utf8");

    let item0 = template.replace("%%TEXT00%%", listItems[parseInt(ranNums[0])]);
    let item1 = item0.replace("%%TEXT01%%", listItems[parseInt(ranNums[1])]);
    let item2 = item1.replace("%%TEXT02%%", listItems[parseInt(ranNums[2])]);
    let item3 = item2.replace("%%TEXT03%%", listItems[parseInt(ranNums[3])]);
    let item4 = item3.replace("%%TEXT04%%", listItems[parseInt(ranNums[4])]);
    let item5 = item4.replace("%%TEXT05%%", listItems[parseInt(ranNums[5])]);

    //let result0 = item5.replace("result0()", "result()");
    let result0 = item5.replace("%%result0%%", listResults[parseInt(ranNums[0])]);
    let result1 = result0.replace("%%result1%%", listResults[parseInt(ranNums[1])]);
    let result2 = result1.replace("%%result2%%", listResults[parseInt(ranNums[2])]);
    let result3 = result2.replace("%%result3%%", listResults[parseInt(ranNums[3])]);
    let result4 = result3.replace("%%result4%%", listResults[parseInt(ranNums[4])]);
    let result5 = result4.replace("%%result5%%", listResults[parseInt(ranNums[5])]);

    let ending0 = result5.replace("/ending0", listLinks[parseInt(ranNums[0])]);
    let ending1 = ending0.replace("/ending1", listLinks[parseInt(ranNums[1])]);
    let ending2 = ending1.replace("/ending2", listLinks[parseInt(ranNums[2])]);
    let ending3 = ending2.replace("/ending3", listLinks[parseInt(ranNums[3])]);
    let ending4 = ending3.replace("/ending4", listLinks[parseInt(ranNums[4])]);
    let ending5 = ending4.replace("/ending5", listLinks[parseInt(ranNums[5])]);

    res.send(ending5);

    counter++;

    if (counter > 0){
        shuffle(ranNums);
    }
})

app.get("/escaped", (req,res) => {
    const template = fs.readFileSync("template/ending.html", "utf8");
    res.send(template);
})

app.listen(3000, () => {
    console.log("the server is ready")
});