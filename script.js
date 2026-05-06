let startTime, interval;
let score = 0;

let studyData = JSON.parse(localStorage.getItem("studyData")) || [];

function formatTime(sec){
    let m = Math.floor(sec/60);
    let s = sec%60;
    return (m<10?"0":"")+m+":"+(s<10?"0":"")+s;
}

function start(){
    startTime = Date.now();

    interval = setInterval(()=>{
        let sec = Math.floor((Date.now()-startTime)/1000);
        document.getElementById("timer").innerText = formatTime(sec);
    },1000);
}

function stop(){
    clearInterval(interval);

    let sec = Math.floor((Date.now()-startTime)/1000);

    let result = "";
    let emoji = "";

    if(sec < 300){
        result = "🍞 Undercooked";
        emoji = "🍞";
        score -= 5;
    }
    else if(sec <= 900){
        result = "🍳 Perfect";
        emoji = "🍳";
        score += 10;
    }
    else{
        result = "🔥 Overcooked";
        emoji = "🔥";
        score -= 2;
    }

    document.getElementById("food").innerText = emoji;
    document.getElementById("result").innerText = result;
    document.getElementById("score").innerText = "Score: " + score;

    saveSession(sec);
}

function reset(){
    clearInterval(interval);
    document.getElementById("timer").innerText = "00:00";
    document.getElementById("food").innerText = "🍳";
    document.getElementById("result").innerText = "";
}

function saveSession(seconds){
    studyData.push(seconds);
    localStorage.setItem("studyData", JSON.stringify(studyData));
    drawChart();
}

let chart;

function drawChart(){
    let ctx = document.getElementById("studyChart");

    if(chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: studyData.map((_,i)=>"S"+(i+1)),
            datasets: [{
                label: 'Study Time (sec)',
                data: studyData
            }]
        }
    });
}

// Load chart when page opens
drawChart();
