export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d")

export const circle = (centerX, centerY, radius) => {
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
};
export const drawTriangle = (base, head) => {
	let height = head.mag();
	let direction = head.heading();
	let width = 20;
	ctx.translate(base.x, base.y);
	ctx.rotate(direction - Math.PI / 2);
	ctx.beginPath();
	ctx.moveTo(-width / 2, 0);
	ctx.lineTo(width / 2, 0);
	ctx.lineTo(0, height);
	ctx.rotate(-direction + Math.PI / 2);
	ctx.translate(-base.x, -base.y);
	ctx.stroke();
	ctx.fill();
};
