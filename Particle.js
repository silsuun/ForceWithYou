
class Particle {
  constructor(pivot, len) {
    this.pivot = pivot;
    this.len = len;

    // 처음엔 약간 기울어진 위치에서 시작 (HALF_PI = 수직 아래)
    this.pos = p5.Vector.add(pivot, p5.Vector.fromAngle(HALF_PI + 0.5, len));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.c = color(0);
    this.w = 50;
    this.damping = 0.995;  // 공기저항: 1에 가까울수록 오래 흔들림
  }

  addForce(aForce) {
    this.acc.add(aForce);
  }

  // 마우스가 공을 스치면, 마우스가 움직인 방향으로 힘을 줌
  checkTouch() {
    let mouse = createVector(mouseX, mouseY);
    let d = p5.Vector.dist(mouse, this.pos);

    if (d < this.w / 2) {
      let push = createVector(mouseX - pmouseX, mouseY - pmouseY);
      push.mult(0.4);    // 미는 세기
      push.limit(8);
      this.addForce(push);
      this.c = color(200, 0, 0);
    } else {
      this.c = color(0);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(this.damping);
    this.vel.limit(25);
    this.pos.add(this.vel);

    this.acc.set(0, 0);
    this.constrainString();
  }

  // 줄 길이 유지 (checkEdge 대신 들어간 부분)
  constrainString() {
    // 1) 위치: pivot에서 len만큼 떨어진 곳으로 되돌림
    let dir = p5.Vector.sub(this.pos, this.pivot);
    dir.setMag(this.len);
    this.pos = p5.Vector.add(this.pivot, dir);

    // 2) 속도: 줄 방향(반지름 방향) 성분을 빼서 원을 따라서만 움직이게
    let n = dir.copy().normalize();
    let radial = p5.Vector.mult(n, this.vel.dot(n));
    this.vel.sub(radial);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    line(this.pivot.x, this.pivot.y, this.pos.x, this.pos.y);

    noStroke();
    fill(this.c);
    circle(this.pos.x, this.pos.y, this.w);
    fill(0);
    circle(this.pivot.x, this.pivot.y, 8);
  }
}