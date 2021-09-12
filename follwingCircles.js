var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d"),
    i,
    j,
    k,
    mouse = {
        x: undefined,
        y: undefined
    };
var circlesArray = [];

function generateRandomRange(firstNum, lastNum) {
    return (Math.random() * firstNum) + lastNum;
}

function generateRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

window.addEventListener("mousemove",function (e) {
	mouse = {
		x : e.x,
		y : e.y
	}
   
});
/* resize */

canvas.width = innerWidth;
canvas.height = innerHeight;
function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
window.onresize = function () {
    resize();
};

/* end resize */

/* classes */

/* FollwingCircles */

class FollwingCircles {
    constructor(x, y, r, color, v) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = "#fff";
        this.v = v;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke()
        c.closePath();
    }
    update() {
				this.angle = Math.atan2(this.y - mouse.y,this.x - mouse.x);
				this.v = {
						x: -Math.cos(this.angle) * 2,
           	y: -Math.sin(this.angle) * 2
				}
        this.x = this.x + this.v.x;
        this.y = this.y + this.v.y;
				if (
						Math.abs(mouse.x - this.x) < 20 &&
					 	Math.abs(mouse.y - this.y) < 20
					 ) {
						gsap.to(this,{
						r:0
					})
				} else if (
						Math.abs(mouse.x - this.x) < 160 &&
					 	Math.abs(mouse.y - this.y) < 160 && this.r > 1
				) {
					this.r -= 0.5;
				} else if (this.r > 1) {
					this.r -= 0.2;
				}
        this.draw()
    }
}

function spwanFollwingCircles() {
   setInterval(function () {
        var x,
            y,
            r = generateRandomRange(30,20)
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - 30 : canvas.width + 30,
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width,
            y = Math.random() < 0.5 ? 0 - 30 : canvas.height + 30;
        }
        var angle = Math.atan2(y - mouse.y,x - mouse.x),
            v = {
                x: -Math.cos(angle) * 2,
                y: -Math.sin(angle) * 2
            };
        circlesArray.push(new FollwingCircles(x,y,r,"#bf5151",v))
   },200);
};
/* FollwingCircles */

/*  end classes */


var animationId;

function animate() {
    // animation loop
    
    animationId  = requestAnimationFrame(animate);
    
    // clearing canvas 
    
    c.fillStyle = "rgba(0, 235, 255, 0.1)";
    
    c.fillRect(0, 0, innerWidth, innerHeight);
        
    for (i = 0; i < circlesArray.length ; i++) {
        	circlesArray[i].update();
			if (circlesArray[i].r <= 0.01) {
				var l = i;
				setTimeout(function () {
					circlesArray.splice(l,1);
				},0)
			}
		}
}
animate();
spwanFollwingCircles();