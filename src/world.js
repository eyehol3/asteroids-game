const newBulletCooldown = 20;
import AsteroidGenerator from "./asteroids";
import Bullet from "./bullet";
import { canvas, ctx } from "./draw";

export default class World {
	constructor() {
		this.complexity = 1;
		this.bullets = [];
		this.bulletCoolDown = 0;
		this.asteroidGen = new AsteroidGenerator();
		this.score = 0;
		this.updateScore = () => {
			this.score += 20;
		};
	}

	update() {
		for (let p of this.bullets) {
			p.update();
			this.removeOldBullets();
		}
		this.bulletCoolDown -= 1;

		this.asteroidGen.collide(this.bullets, this.updateScore);
		this.asteroidGen.update();

		if (this.asteroidGen.asteroids.length == 0) {
			this.complexity += 1;
			this.asteroidGen.generate(this.complexity);
		}
	}

	removeOldBullets() {
		this.bullets = this.bullets.filter((p) => p.ttl > 0 && !p.isDead);
	}
	draw() {
		ctx.fillStyle = "rgb(200,200,200)";
		ctx.textAlign = "center";
		ctx.font = "48px monospace";
		ctx.fillText("score: " + this.score, canvas.width * 0.5, 50);
		for (let p of this.bullets) {
			p.draw();
		}
		this.asteroidGen.draw();
	}

	newBullet(pos, dir) {
		if (this.bulletCoolDown <= 0) {
			this.bullets.push(new Bullet(pos, dir));
			this.bulletCoolDown = newBulletCooldown;
		}
	}

	init() {
		this.score = 0;
		this.complexity = 1;
		this.asteroidGen.asteroids = [];
		this.bullets = [];
		this.asteroidGen.generate(this.complexity);
	}
}
