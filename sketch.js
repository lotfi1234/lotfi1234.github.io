const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let audioContext;
let MicStream;
let freq=0;
let threshold=1;
let notes=[
    { note:'Do',freq:261.6,posx:15,posy:377},
  {note:'Re',freq:293.7,posx:15,posy:367},
  {note: 'Mi',freq:329.6,posx:15,posy:360},
  {note:'Fa',freq:349.9954,posx:15,posy:352},
  {note:'Sol',freq:392.9954,posx:15,posy:345},
  {note:'La',freq:440,posx:15,posy:337},
  {note:'Si',freq:493.9954,posx:15,posy:330}
  
];
function setup() {

  createCanvas(1000, 650);
  background(255);
  audioContext=getAudioContext();
  MicStream=new p5.AudioIn();
  MicStream.start(listening);
 
}
function draw() {
  textAlign(CENTER,CENTER);
  fill(0);
  textSize(22);
  text(freq.toFixed(2)+" HZ",width/2,height-180);
  fill(0);
  textSize(20)
  pause=createButton("Pause");
  pause.position(width/2+150,height/2-90);
  pause.size(80);
  start=createButton("Start");
  start.position(width/2+250,height/2-90);
  start.size(80);
  save=createButton("Save as PDF");
  save.position(width/2+340,height/2-90);
  save.size(130);
  let closeNote=-1;
  let recordDiff=Infinity;
  
  for(let i=0;i<notes.length;i++){
   let diff=abs(freq-notes[i].freq); 
    if((diff)<recordDiff){
      closeNote=notes[i];
      recordDiff=diff;
    }
  }
  textSize(44);
  text(closeNote.note,width/2,height-140);
  stroke(0);
  circle(closeNote.posx,closeNote.posy,5);
  noStroke();
  let diff=recordDiff;
  let alpha=map(abs(diff),0,100,255,0);
  // let r=color(255,0,0);
  // let g=color(0,255,0);
  // let col=lerpColor(g,r,amt);
  // fill(col);
  rectMode(CENTER);
  fill(0,alpha);
  stroke(0);
  strokeWeight(1);
  if(abs(diff)<threshold){
   fill(0,0,0); 
  }
  rect(width/2,100,100,50);
  stroke(0);
  strokeWeight(4);
  line(width/2,5,width/2,200);
  noStroke();
  fill(0,0,0);
  if(abs(diff)<threshold){
    fill(0,0,0);
  }
  rect(width/2+diff/10,100,10,75);
  stroke(0);
  strokeWeight(3);
    line(width,300,0,300);
      line(width,315,0,315);
      line(width,330,0,330);
      line(width,345,0,345);
      line(width,360,0,360);

  noStroke();

}
function listening(){
  console.log("listening");
   pitch=ml5.pitchDetection(
   model_url,
  audioContext,
  MicStream.stream,
  modelLoaded);
  
}
function gotPitch(error,frequency){
  if (error) {
    console.error(error);
  } else {
    //console.log(frequency);
    if (frequency) {
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }

}
function modelLoaded(){
  pitch.getPitch(gotPitch);

}

