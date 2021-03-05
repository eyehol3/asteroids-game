import { random2D } from "./vectors";
const [minVelocity, maxVelocity] = [1, 5];
import { circle } from "./draw";

class Asteroid {
	constructor(position, size, direction, velocity) {
		this.position = position;
		this.size = size;
		this.direction = direction;
		this.velocity = velocity;

		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
	}
	draw() {
		this.ctx.fillStyle = "rgba(0,0,0,0)";
		this.ctx.strokeStyle = "rgb(200,200,200)";
		circle(this.position.x, this.position.y, this.radius());
	}

	update() {
		this.position.add(this.direction.copy().limit(this.velocity));
		this.bounds();
	}

	bounds() {
		this.position.x =
			(this.position.x + this.canvas.width) % this.canvas.width;
		this.position.y =
			(this.position.y + this.canvas.height) % this.canvas.height;
	}

	radius() {
		switch (this.size) {
			case 3:
				return 40;
			case 2:
				return 30;
			case 1:
				return 15;
		}
	}

	destroy() {
		this.isDead = true;
	}
}

export default class AsteroidGenerator {
	constructor() {
		this.asteroids = [];
	}
	newAsteroid(size, position) {
		if (typeof position === "undefined") {
			position = random2D();
		}
		let direction = random2D();
		if (typeof size === "undefined") {
			size = Math.floor(Math.random() * Math.floor(max));
		}
		let velocity =
			Math.random() * (maxVelocity - minVelocity) + minVelocity;
		this.asteroids.push(new Asteroid(position, size, direction, velocity));
	}

	update() {
		this.cleanup();
		for (let a of this.asteroids) {
			a.update();
		}
	}
	cleanup() {
		this.asteroids = this.asteroids.filter((a) => !a.isDead && a.size > 0);
	}
	draw() {
		for (let a of this.asteroids) {
			a.draw();
		}
	}
	collide(bullets, updateScore) {
		for (let a of this.asteroids) {
			for (let b of bullets) {
				if (a.radius() > a.position.dist(b.position)) {
					b.destroy();
					a.destroy();
					updateScore();
					this.newAsteroid(a.size - 1, a.position.copy());
					this.newAsteroid(a.size - 1, a.position.copy());
				}
			}
		}
	}

	generate(complexity) {
		let n = Math.round((complexity * 5) ** 0.6);
		for (let i = 0; i < n; i++) {
			this.newAsteroid(3);
		}
	}
}
