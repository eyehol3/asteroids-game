import World from "./world.js";
import Ship from "./ship.js";

import { Vector } from "./vectors";
import { keyIsDown } from "./handleInput";
export default class Game {
	constructor() {
		this.container = document.getElementById("content");
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.prevUpdateTime = 0;
		this.height = 0;
		this.width = 0;

		this.init();
	}

	init() {
		window.addEventListener("resize", (x) => this.onResize());
		this.onResize();

		this.world = new World(this.width, this.height);
		this.ship = new Ship(
			new Vector(this.width / 2, this.height / 2),
			this.world
		);

		requestAnimationFrame((time) => this.update(time));
	}

	draw() {
		this.world.draw();
		this.ship.draw();
	}
	onResize() {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	update(time) {
		this.handleKeys();
		const dt = (time - this.prevUpdateTime) / 16;
		this.prevUpdateTime = time;
		this.ctx.fillStyle = "rgb(20, 20, 20)";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.ship.isDead === false) {
			this.ship.update(dt);
			this.world.update(dt);

			this.draw();
		} else {
			this.restartScreen();
		}

		requestAnimationFrame((time) => this.update(time));
	}
	handleKeys() {
		if (keyIsDown("Space")) {
			this.ship.boost();
		}
		if (keyIsDown("KeyX")) {
			this.ship.shoot();
		}

		if (keyIsDown("ArrowLeft")) {
			//rotate counterclock
			this.ship.rotate(-0.05);
		} else if (keyIsDown("ArrowRight")) {
			//rotate clockwise
			this.ship.rotate(0.05);
		}

		if (keyIsDown("KeyR")) {
			this.restart();
		}
	}
	restartScreen() {
		this.ctx.fillStyle = "rgb(200,200,200)";
		this.ctx.font = "32px monospace";
		this.ctx.textAlign = "center";
		this.ctx.fillText(
			"score: " + this.world.score,
			this.width * 0.5,
			this.height * 0.2
		);
		this.ctx.fillText("r to restart", this.width * 0.5, this.height * 0.5);
		this.ctx.fillText(
			"x to shoot,\n space to boost, \nleft right to rotate",
			this.width * 0.5,
			this.height * 0.7
		);
	}
	restart() {
		this.world.init();
		this.ship = new Ship(
			new Vector(this.width / 2, this.height / 2),
			this.world
		);
	}
}

new Game();
