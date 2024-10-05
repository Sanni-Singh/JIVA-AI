const button = document.getElementById("btn");
const jiva = document.getElementById("message");

const voice = document.getElementById("voice")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;

    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day = new Date();
    let hours = day.getHours();
    if(hours >= 0 && hours < 12){
        speak("Good Morning Guyz Chai Pilo")
    }
    else if(hours >= 12 && hours <= 16){
        speak("Good Afternon Dosto Lunch kr Lo");
    }
    else {
        speak("Good evening Mitro samose Kah lo")
    }
}

// window.addEventListener('load' , ()=> {
//     wishMe();
// })

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult =(event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    jiva.innerText = transcript;
    takeCommand(transcript);
}

button.addEventListener('click',()=>{
    recognition.start();
    button.style.display="none";
    voice.style.display="block";
});

voice.addEventListener('click' ,()=>{
    button.style.display="flex";
    voice.style.display="none";
})

function takeCommand(message) {
    button.style.display="flex";
    voice.style.display="none";
    if(message.includes("hello") || message.includes("hey")) {
        speak("hello dost ! btao kya madad chahie");
    }
    else if(message.includes("who are you") || message.includes("hu")) {
        speak("mai jiva hu ! ab bata bhi do kya madad chahie");
    }

    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute :"numeric"})
        speak(time);
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month :"short"})
        speak(date);
    }
    else {
        let final = "lo Yahi mila hai mujhe internet se" + message.replace("jiva" , "") || message.replace("jiu" , "");
        speak(final);
        window.open(`https://google.com/search?q=${message.replace("jiva" ,"")}`,"_blank")
    }
}