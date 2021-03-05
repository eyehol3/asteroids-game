import { circle } from "./draw";
const velocity = 6;

export default class Bullet {
	constructor(position, direction) {
		this.position = position;
		this.direction = direction.setMag(velocity);

		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.ttl = this.canvas.width;
	}
	update() {
		let vector = this.direction;
		this.position.add(vector);
		this.ttl -= vector.mag();
	}
	draw() {
		this.ctx.fillStyle = "rgb(200,200,200)";
		circle(this.position.x, this.position.y, 4);
		this.bounds();
	}
	bounds() {
		this.position.x =
			(this.position.x + this.canvas.width) % this.canvas.width;
		this.position.y =
			(this.position.y + this.canvas.height) % this.canvas.height;
	}
	destroy() {
		this.isDead = true;
	}
}
