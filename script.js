let video=document.querySelector("video");
let recordbtncont=document.querySelector(".record-btn-cont")
let recordbtn=document.querySelector(".record-btn")
let capturebtncont=document.querySelector(".capture-btn-cont")
let capturebtn=document.querySelector(".capture-btn")

let recordFlag=false;
let recorder;
let chunks=[];
// console.log("hello");
let constraints={
    video:true,
    audio:true,
}

navigator.mediaDevices.getUserMedia(constraints)
.then((stream) =>{
    // console.log(stream);
    video.srcObject = stream;
    
    recorder=new MediaRecorder(stream);

    recorder.addEventListener("start" , (e)=>{
        chunks=[];
    })
    recorder.addEventListener("dataavailable" ,(e) => {
        chunks.push(e.data);
    })
    recorder.addEventListener("stop" ,(e)=>{
        //conversion chunk data to mvideo
        let blob=new Blob(chunks,{type:"video/mp4"});
        let videoUrl=URL.createObjectURL(blob)
        
        let a=document.createElement("a")
        a.href=videoUrl;
        a.download="stream.mp4"
        a.click();

    })
})

recordbtncont.addEventListener("click", (e) => {
        if(!recorder) return;

        recordFlag=!recordFlag;
        if(recordFlag){ //start
            recorder.start();
            recordbtn.classList.add("scale-record") //animation
            startTimer()
        }else{//stop
            recorder.stop();
            recordbtn.classList.remove("scale-record") //for animation
            stopTimer()
        }
})

let timerId;
let counter=0;
let timer=document.querySelector(".timer")
function startTimer(){
    timer.style.display="block"
   function displayTimer(){
   let totalnumber=counter;
   let hours=Number.parseInt(totalnumber / 3600);
   totalnumber = totalnumber % 3600 ; //remaining value

   let mins=Number.parseInt(totalnumber / 60);
   totalnumber = totalnumber % 60; //remaining value

   let second = totalnumber ;

   hours=(hours<10) ? `0${hours}` : hours;
   mins=(mins<10) ? `0${mins}` : mins;
   second=(second<10) ? `0${second}` : second;
    timer.innerText = `${hours} : ${mins} : ${second}`
    counter++;
   }
   timerId=setInterval(displayTimer,1000);

}

function stopTimer(){
        clearInterval(timerId);
        timer.innerText="00:00:00"
        timer.style.display="none"
}
