const flipCard = document.getElementById("flipCard");

setTimeout(() => {
    flipCard.classList.add("flipped");
}, 2500);

flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("flipped");
});

const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confetti = [];

function createBurst() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 250; i++) {
        confetti.push({
            x: centerX,
            y: centerY,
            size: Math.random() * 8 + 4,
            color: [
                "#ff17e8",
                "#F3B4D8",
                "#FFFFFF",
                "#FFD700"
            ][Math.floor(Math.random() * 4)],
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20,
            gravity: 0.25,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 15
        });
    }
}

function createRain() {
    for (let i = 0; i < 10; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 8 + 4,
            color: [
                "#ff17e8",
                "#F3B4D8",
                "#FFFFFF",
                "#FFD700"
            ][Math.floor(Math.random() * 4)],
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 2,
            gravity: 0.05,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((p, index) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);

        ctx.fillStyle = p.color;
        ctx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size * 0.6
        );

        ctx.restore();

        if (p.y > canvas.height + 100) {
            confetti.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

createBurst();

const rainInterval = setInterval(createRain, 100);

setTimeout(() => {
    clearInterval(rainInterval);
}, 5000);

animate();