let bob;
let pivot;

function setup() {
  createCanvas(400, 300);

  pivot = createVector(width / 2, 30);   // 진자가 매달린 점
  bob = new Particle(pivot, 180);        // 줄 길이 180
}

function draw() {
  background(220);

  let gravity = createVector(0, 0.3);
  bob.addForce(gravity);

  bob.checkTouch();   // 마우스로 건드렸는지 확인
  bob.update();
  bob.show();
}
