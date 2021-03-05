export class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
	}

	copy() {
		return new Vector(this.x, this.y);
	}

	mult(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	mag() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	limit(s) {
		if (this.mag > s) this.setMag(s);
		return this;
	}

	setMag(s) {
		return this.normalize().mult(s);
	}

	normalize() {
		const len = this.mag();
		if (len !== 0) this.mult(1 / len);
		return this;
	}
	rotate(rad) {
		let heading = this.heading() + rad;
		let mag = this.mag();
		this.x = Math.cos(heading) * mag;
		this.y = Math.sin(heading) * mag;
		return this;
	}
	heading() {
		return Math.atan2(this.y, this.x);
	}

	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	dist(v) {
		return v.copy().sub(this).mag();
	}
}

export const random2D = () => {
	let a = Math.random() * Math.PI * 2;
	return new Vector(1, 0).rotate(a);
};
