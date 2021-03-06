import { circle, canvas, ctx } from "./draw";
const velocity = 6;

export default class Bullet {
	constructor(position, direction) {
		this.position = position;
		this.direction = direction.setMag(velocity);
		this.ttl = canvas.width;
	}
	update() {
		let vector = this.direction;
		this.position.add(vector);
		this.ttl -= vector.mag();
	}
	draw() {
		ctx.fillStyle = "rgb(200,200,200)";
		circle(this.position.x, this.position.y, 4);
		this.bounds();
	}
	bounds() {
		this.position.x = (this.position.x + canvas.width) % canvas.width;
		this.position.y = (this.position.y + canvas.height) % canvas.height;
	}
	destroy() {
		this.isDead = true;
	}
}
