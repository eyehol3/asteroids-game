import { Vector } from "./vectors";
import { drawTriangle, circle, canvas, ctx } from "./draw";

export default class Ship {
	constructor(position, world) {
		this.position = position;
		this.acceleration = new Vector(0, 0);
		this.velocity = new Vector(0, 0);
		this.direction = new Vector(20, 0);
		this.HITBOX_RADIUS = 3;
		this.world = world;
		this.isDead = false;
	}
	draw() {
		ctx.fillStyle = "rgb(200,200,200)";
		drawTriangle(this.position.copy(), this.direction.copy());
		circle(this.position.x, this.position.y, this.HITBOX_RADIUS);
	}
	update(dt) {
		this.velocity.add(this.acceleration);
		this.acceleration.mult(0.3);
		this.velocity.mult(0.99);
		this.velocity.limit(5);
		this.position.add(this.velocity.copy().mult(dt));
		this.bounds();
		this.detectCollision();
	}

	bounds() {
		this.position.x = (this.position.x + canvas.width) % canvas.width;
		this.position.y = (this.position.y + canvas.height) % canvas.height;
	}

	boost() {
		this.acceleration.add(this.direction.copy().setMag(0.05));
		this.acceleration.limit(3);
	}
	rotate(angle) {
		if (angle) {
			this.direction.rotate(angle);
		}
	}
	shoot() {
		this.world.newBullet(this.position.copy(), this.direction.copy());
	}

	detectCollision() {
		for (let a of this.world.asteroidGen.asteroids) {
			if (
				this.HITBOX_RADIUS >
				this.position.dist(a.position) - a.radius()
			) {
				this.destroy();
			}
		}
	}

	destroy() {
		this.isDead = true;
	}
}
