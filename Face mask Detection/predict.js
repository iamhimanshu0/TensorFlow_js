let video;
let mobilenet, classifier;
let label = '';


// load custom model 
function modelReady(){
	console.log('Model is Ready');
	classifier.load('model.json',customModelReady);
	
}

// make prediction with custom model
function customModelReady(){
	console.log('custom model loaded');
	// setTimeout(function(){ console.log("Hello"); }, 3000);
	label = "Model Ready";
	classify();
}


// just for video
function vidoeReady(){
	console.log('video is Ready');
}


// fucntion for classification
function classify(){
	classifier.classify(gotResult);
}

// get the result
function gotResult(error, result){
	if(error){
		console.log(error);
	}else{
		label = result[0]['label'];
		classify();
	}
}


// p5.js setup function
function setup(){
	noCanvas();

	// create video Object
	video = createCapture(VIDEO);
	video.parent('videoContainer');

	// loading model
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	setTimeout(function(){ console.log("Hello"); }, 30000);
	classifier = mobilenet.classification(video, vidoeReady);

}

function draw(){
	select('#result').html(label);
	if(label == "Mask Off"){
		select('#body').style('background-color','red');
		select('#showAdvice').style('color','yellow');
		select('#showAdvice').html("Please Wear Mask To Stay Safe")
	}else if(label == "Mask On"){
		select('#body').style('background-color','#343a40');
		select('#showAdvice').style('color','green');
		select('#showAdvice').html("Good Stay Safe...")

	}
}