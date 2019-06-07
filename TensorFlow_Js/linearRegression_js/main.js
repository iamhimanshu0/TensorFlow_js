// linear Regression using Tensorflow.js and p5 js 
// intrective program  //

// ******************** //
    // Himanshu Tripathi
// ******************** //

let x_val = [];
let y_val = [];

let m,b;


// SELECT LEARNING RATE AND OPTIMIZER

//learning rate and optimizer
const learningRate = 0.2;
// const optimizer = tf.train.sgd(learningRate);
const optimizer = tf.train.adam(learningRate);

function setup() {
    createCanvas(400,400);

    //random choose the values of m and b for the starting point
    //the value of m and b is changing over time so we have to use "tf.variable"
    m = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));

}

//loss function
function loss(pred,labels){
    return pred.sub(labels).square().mean();
}


//Predict the value
function predict(x){
    //change the xs into the 1D tensor
    const xs = tf.tensor1d(x);

    //y = mx + b;
    const ys = xs.mul(m).add(b);

    return ys;
}



//for creating a point using mousePressed
function mousePressed(){
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    x_val.push(x);
    y_val.push(y);
}

function draw()
{
    tf.tidy(() => {
        //minimize the loss  //optimize the value of M and B
        if(x_val.length > 0)
        {
            const ys = tf.tensor1d(y_val);
            optimizer.minimize(() => loss(predict(x_val),ys));
        }
    });


    background(0);
    stroke(255);
    strokeWeight(8);
    for(let i =0;i< x_val.length; i++)
    {
        let px = map(x_val[i], 0, 1, 0, width);
        let py = map(y_val[i], 0, 1, height, 0);
        point(px,py);
    }

    tf.tidy(() =>{
        //draw a line
        const lineX = [0,1];
        //const xs = tf.tensor1d(lineX);
        const ys = predict(lineX);
        // xs.print();
        // ys.print();

        // Y is the tensor first we have to get back the data 
        let lineY = ys.dataSync();


        let x1 = map(lineX[0], 0, 1, 0, width);
        let x2 = map(lineX[1], 0, 1, 0, height);

        

        let y1 = map(lineY[0], 0, 1, height, 0);
        let y2 = map(lineY[1], 0, 1, height, 0);

        strokeWeight(2);
        line(x1,y1,x2,y2);
        // console.log(tf.memory().numTensors);
    });


     
}
