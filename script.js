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

// navigator.mediaDevices.getUserMedia(constraints)
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
            recordbtn.classList.add("scale-record")
        }else{//stop
            recorder.stop();
            recordbtn.classList.remove("scale-record")
        }
})

