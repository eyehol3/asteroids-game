(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _vectors = require("./vectors");

var _draw = require("./draw");

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var minVelocity = 1,
    maxVelocity = 5;

var Asteroid = function () {
	function Asteroid(position, size, direction, velocity) {
		_classCallCheck(this, Asteroid);

		this.position = position;
		this.size = size;
		this.direction = direction;
		this.velocity = velocity;
	}

	_createClass(Asteroid, [{
		key: "draw",
		value: function draw() {
			_draw.ctx.fillStyle = "rgba(0,0,0,0)";
			_draw.ctx.strokeStyle = "rgb(200,200,200)";
			(0, _draw.circle)(this.position.x, this.position.y, this.radius());
		}
	}, {
		key: "update",
		value: function update(dt) {
			this.position.add(this.direction.copy().mult(dt).limit(this.velocity));
			this.bounds();
		}
	}, {
		key: "bounds",
		value: function bounds() {
			this.position.x = (this.position.x + _draw.canvas.width) % _draw.canvas.width;
			this.position.y = (this.position.y + _draw.canvas.height) % _draw.canvas.height;
		}
	}, {
		key: "radius",
		value: function radius() {
			switch (this.size) {
				case 3:
					return 40;
				case 2:
					return 30;
				case 1:
					return 15;
			}
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.isDead = true;
		}
	}]);

	return Asteroid;
}();

var AsteroidGenerator = function () {
	function AsteroidGenerator() {
		_classCallCheck(this, AsteroidGenerator);

		this.asteroids = [];
	}

	_createClass(AsteroidGenerator, [{
		key: "newAsteroid",
		value: function newAsteroid(size, position) {
			if (typeof position === "undefined") {
				position = (0, _vectors.random2D)().setMag(Math.random() * _draw.canvas.width * 0.3);
			}
			var direction = (0, _vectors.random2D)();
			if (typeof size === "undefined") {
				size = Math.floor(Math.random() * Math.floor(max));
			}
			var velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
			this.asteroids.push(new Asteroid(position, size, direction, velocity));
		}
	}, {
		key: "update",
		value: function update(dt) {
			this.cleanup();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.asteroids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var a = _step.value;

					a.update(dt);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "cleanup",
		value: function cleanup() {
			this.asteroids = this.asteroids.filter(function (a) {
				return !a.isDead && a.size > 0;
			});
		}
	}, {
		key: "draw",
		value: function draw() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.asteroids[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var a = _step2.value;

					a.draw();
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: "collide",
		value: function collide(bullets, updateScore) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.asteroids[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var a = _step3.value;
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;

					try {
						for (var _iterator4 = bullets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var b = _step4.value;

							if (a.radius() > a.position.dist(b.position)) {
								b.destroy();
								a.destroy();
								updateScore();
								this.newAsteroid(a.size - 1, a.position.copy());
								this.newAsteroid(a.size - 1, a.position.copy());
							}
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4.return) {
								_iterator4.return();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		}
	}, {
		key: "generate",
		value: function generate(complexity) {
			var n = Math.round((complexity * 5) ** 0.6);
			for (var i = 0; i < n; i++) {
				this.newAsteroid(3);
			}
		}
	}]);

	return AsteroidGenerator;
}();

exports.default = AsteroidGenerator;

},{"./draw":3,"./vectors":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _draw = require("./draw");

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var velocity = 6;

var Bullet = function () {
	function Bullet(position, direction) {
		_classCallCheck(this, Bullet);

		this.position = position;
		this.direction = direction.setMag(velocity);
		this.ttl = _draw.canvas.width;
	}

	_createClass(Bullet, [{
		key: "update",
		value: function update(dt) {
			var vector = this.direction.copy().mult(dt);
			this.position.add(vector);
			this.ttl -= vector.mag();
		}
	}, {
		key: "draw",
		value: function draw() {
			_draw.ctx.fillStyle = "rgb(200,200,200)";
			(0, _draw.circle)(this.position.x, this.position.y, 4);
			this.bounds();
		}
	}, {
		key: "bounds",
		value: function bounds() {
			this.position.x = (this.position.x + _draw.canvas.width) % _draw.canvas.width;
			this.position.y = (this.position.y + _draw.canvas.height) % _draw.canvas.height;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.isDead = true;
		}
	}]);

	return Bullet;
}();

exports.default = Bullet;

},{"./draw":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var canvas = exports.canvas = document.getElementById("canvas");
var ctx = exports.ctx = canvas.getContext("2d");

var circle = exports.circle = function circle(centerX, centerY, radius) {
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();
};
var drawTriangle = exports.drawTriangle = function drawTriangle(base, head) {
	var height = head.mag();
	var direction = head.heading();
	var width = 20;
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var keyIsDown = exports.keyIsDown = function () {
    var state = {};
    window.addEventListener('keyup', function (e) {
        return state[e.code] = false;
    });
    window.addEventListener('keydown', function (e) {
        return state[e.code] = true;
    });

    return function (code) {
        return state.hasOwnProperty(code) && state[code] || false;
    };
}();

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _world = require("./world.js");

var _world2 = _interopRequireDefault(_world);

var _ship = require("./ship.js");

var _ship2 = _interopRequireDefault(_ship);

var _vectors = require("./vectors");

var _handleInput = require("./handleInput");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.container = document.getElementById("content");
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.prevUpdateTime = 0;
		this.height = 0;
		this.width = 0;

		this.init();
	}

	_createClass(Game, [{
		key: "init",
		value: function init() {
			var _this = this;

			window.addEventListener("resize", function (x) {
				return _this.onResize();
			});
			this.onResize();

			this.world = new _world2.default(this.width, this.height);
			this.ship = new _ship2.default(new _vectors.Vector(this.width / 2, this.height / 2), this.world);

			requestAnimationFrame(function (time) {
				return _this.update(time);
			});
		}
	}, {
		key: "draw",
		value: function draw() {
			this.world.draw();
			this.ship.draw();
		}
	}, {
		key: "onResize",
		value: function onResize() {
			this.width = this.container.clientWidth;
			this.height = this.container.clientHeight;

			this.canvas.width = this.width;
			this.canvas.height = this.height;
		}
	}, {
		key: "update",
		value: function update(time) {
			var _this2 = this;

			this.handleKeys();
			var dt = (time - this.prevUpdateTime) / 16;
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

			requestAnimationFrame(function (time) {
				return _this2.update(time);
			});
		}
	}, {
		key: "handleKeys",
		value: function handleKeys() {
			if ((0, _handleInput.keyIsDown)("Space")) {
				this.ship.boost();
			}
			if ((0, _handleInput.keyIsDown)("KeyX")) {
				this.ship.shoot();
			}

			if ((0, _handleInput.keyIsDown)("ArrowLeft")) {
				//rotate counterclock
				this.ship.rotate(-0.05);
			} else if ((0, _handleInput.keyIsDown)("ArrowRight")) {
				//rotate clockwise
				this.ship.rotate(0.05);
			}

			if ((0, _handleInput.keyIsDown)("KeyR")) {
				this.restart();
			}
		}
	}, {
		key: "restartScreen",
		value: function restartScreen() {
			this.ctx.fillStyle = "rgb(200,200,200)";
			this.ctx.font = "32px monospace";
			this.ctx.textAlign = "center";
			this.ctx.fillText("score: " + this.world.score, this.width * 0.5, this.height * 0.2);
			this.ctx.fillText("r to restart", this.width * 0.5, this.height * 0.5);
			this.ctx.fillText("x to shoot,\n space to boost, \nleft right to rotate", this.width * 0.5, this.height * 0.7);
		}
	}, {
		key: "restart",
		value: function restart() {
			this.world.init();
			this.ship = new _ship2.default(new _vectors.Vector(this.width / 2, this.height / 2), this.world);
		}
	}]);

	return Game;
}();

exports.default = Game;

new Game();

},{"./handleInput":4,"./ship.js":6,"./vectors":7,"./world.js":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _vectors = require("./vectors");

var _draw = require("./draw");

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Ship = function () {
	function Ship(position, world) {
		_classCallCheck(this, Ship);

		this.position = position;
		this.acceleration = new _vectors.Vector(0, 0);
		this.velocity = new _vectors.Vector(0, 0);
		this.direction = new _vectors.Vector(20, 0);
		this.HITBOX_RADIUS = 3;
		this.world = world;
		this.isDead = false;
	}

	_createClass(Ship, [{
		key: "draw",
		value: function draw() {
			_draw.ctx.fillStyle = "rgb(200,200,200)";
			(0, _draw.drawTriangle)(this.position.copy(), this.direction.copy());
			(0, _draw.circle)(this.position.x, this.position.y, this.HITBOX_RADIUS);
		}
	}, {
		key: "update",
		value: function update(dt) {
			this.velocity.add(this.acceleration);
			this.acceleration.mult(0.3);
			this.velocity.mult(0.99);
			this.velocity.limit(5);
			this.position.add(this.velocity.copy().mult(dt));
			this.bounds();
			this.detectCollision();
		}
	}, {
		key: "bounds",
		value: function bounds() {
			this.position.x = (this.position.x + _draw.canvas.width) % _draw.canvas.width;
			this.position.y = (this.position.y + _draw.canvas.height) % _draw.canvas.height;
		}
	}, {
		key: "boost",
		value: function boost() {
			this.acceleration.add(this.direction.copy().setMag(0.05));
			this.acceleration.limit(3);
		}
	}, {
		key: "rotate",
		value: function rotate(angle) {
			if (angle) {
				this.direction.rotate(angle);
			}
		}
	}, {
		key: "shoot",
		value: function shoot() {
			this.world.newBullet(this.position.copy(), this.direction.copy());
		}
	}, {
		key: "detectCollision",
		value: function detectCollision() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.world.asteroidGen.asteroids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var a = _step.value;

					if (this.HITBOX_RADIUS > this.position.dist(a.position) - a.radius()) {
						this.destroy();
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.isDead = true;
		}
	}]);

	return Ship;
}();

exports.default = Ship;

},{"./draw":3,"./vectors":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Vector = exports.Vector = function () {
	function Vector(x, y) {
		_classCallCheck(this, Vector);

		this.x = x;
		this.y = y;
	}

	_createClass(Vector, [{
		key: "add",
		value: function add(v) {
			this.x += v.x;
			this.y += v.y;
		}
	}, {
		key: "copy",
		value: function copy() {
			return new Vector(this.x, this.y);
		}
	}, {
		key: "mult",
		value: function mult(s) {
			this.x *= s;
			this.y *= s;
			return this;
		}
	}, {
		key: "mag",
		value: function mag() {
			return Math.sqrt(this.x ** 2 + this.y ** 2);
		}
	}, {
		key: "limit",
		value: function limit(s) {
			if (this.mag > s) this.setMag(s);
			return this;
		}
	}, {
		key: "setMag",
		value: function setMag(s) {
			return this.normalize().mult(s);
		}
	}, {
		key: "normalize",
		value: function normalize() {
			var len = this.mag();
			if (len !== 0) this.mult(1 / len);
			return this;
		}
	}, {
		key: "rotate",
		value: function rotate(rad) {
			var heading = this.heading() + rad;
			var mag = this.mag();
			this.x = Math.cos(heading) * mag;
			this.y = Math.sin(heading) * mag;
			return this;
		}
	}, {
		key: "heading",
		value: function heading() {
			return Math.atan2(this.y, this.x);
		}
	}, {
		key: "sub",
		value: function sub(v) {
			this.x -= v.x;
			this.y -= v.y;
			return this;
		}
	}, {
		key: "dist",
		value: function dist(v) {
			return v.copy().sub(this).mag();
		}
	}]);

	return Vector;
}();

var random2D = exports.random2D = function random2D() {
	var a = Math.random() * Math.PI * 2;
	return new Vector(1, 0).rotate(a);
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _asteroids = require("./asteroids");

var _asteroids2 = _interopRequireDefault(_asteroids);

var _bullet = require("./bullet");

var _bullet2 = _interopRequireDefault(_bullet);

var _draw = require("./draw");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var newBulletCooldown = 20;

var World = function () {
	function World() {
		var _this = this;

		_classCallCheck(this, World);

		this.complexity = 1;
		this.bullets = [];
		this.bulletCoolDown = 0;
		this.asteroidGen = new _asteroids2.default();
		this.score = 0;
		this.updateScore = function () {
			_this.score += 20;
		};
	}

	_createClass(World, [{
		key: "update",
		value: function update(dt) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.bullets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var p = _step.value;

					p.update(dt);
					this.removeOldBullets();
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.bulletCoolDown -= 1;

			this.asteroidGen.collide(this.bullets, this.updateScore);
			this.asteroidGen.update(dt);

			if (this.asteroidGen.asteroids.length == 0) {
				this.complexity += 1;
				this.asteroidGen.generate(this.complexity);
			}
		}
	}, {
		key: "removeOldBullets",
		value: function removeOldBullets() {
			this.bullets = this.bullets.filter(function (p) {
				return p.ttl > 0 && !p.isDead;
			});
		}
	}, {
		key: "draw",
		value: function draw() {
			_draw.ctx.fillStyle = "rgb(200,200,200)";
			_draw.ctx.textAlign = "center";
			_draw.ctx.font = "48px monospace";
			_draw.ctx.fillText("score: " + this.score, _draw.canvas.width * 0.5, 50);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.bullets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var p = _step2.value;

					p.draw();
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.asteroidGen.draw();
		}
	}, {
		key: "newBullet",
		value: function newBullet(pos, dir) {
			if (this.bulletCoolDown <= 0) {
				this.bullets.push(new _bullet2.default(pos, dir));
				this.bulletCoolDown = newBulletCooldown;
			}
		}
	}, {
		key: "init",
		value: function init() {
			this.score = 0;
			this.complexity = 1;
			this.asteroidGen.asteroids = [];
			this.bullets = [];
			this.asteroidGen.generate(this.complexity);
		}
	}]);

	return World;
}();

exports.default = World;

},{"./asteroids":1,"./bullet":2,"./draw":3}]},{},[5])
//# sourceMappingURL=game.js.map
