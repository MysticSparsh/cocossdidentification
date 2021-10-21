img= "";
Status = "";
objects = [];

//preload function
function preload()
{
    img = loadImage('dog_cat.jpg');
}
//setup function
function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
//draw function
function draw()
{
    image(img , 0 ,0,640,420);
    
    if(Status != "" )
    {
      for (i = 0 ; i < objects.length ; i++) 
      {
          document.getElementById("status").innerHTML = "Status : Object Detected";

          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15 );
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y , objects[i].width , objects[i].height);
      } 
    }
}

// Checking if model is loaded
function modelLoaded()
{
    console.log("Model Loaded Successfully");
    Status = true;
    objectDetector.detect(img, gotResults);
}
// Exectuing  the model  on console
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}