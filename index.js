const hazard=localStorage.getItem("hazards")


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


c.fillRect(0, 0, canvas.width, canvas.height)

var count=0
var count2=0

const gravity = 0.9
map=String('./img/Backgrounds/'+ String(Math.floor(Math.random()*7)+1) + '.png')
const background= new Sprite({
  position: {
    x: -10,
    y: -10,
  },

  imageSrc: map
})

const floor = new Sprite({
  position: {
    x: 0,
    y: canvas.height-96,
  },

  imageSrc: './img/floor.png'
})

const player = new Fighter({
  position: {
    x: 300,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6
    },
    attack2: {
      imageSrc: './img/samuraiMack/Attack2.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

const enemy = new Fighter({
  position: {
    x: canvas.width-300,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    attack2: {
      imageSrc: './img/kenji/Attack2.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})


// HAZARDS WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO


// Define dagger image and properties
const daggerImage = new Image();
daggerImage.src = "Dagger.png"; // Replace with your dagger image URL
const daggerWidth = 50;
const daggerHeight = 25;
let daggerSpeed = 5;

// Function to generate a random starting position for daggers off-screen
function randomOffscreenPosition(isLeftSide) {
    const yPosition = Math.floor(Math.random() * canvas.height);
    const xPosLeft = -daggerWidth;
    const xPosRight = canvas.width + daggerWidth;
    return {
        x: isLeftSide ? xPosLeft : xPosRight,
        y: yPosition
    }
}

// Class representing a flying dagger
class Dagger {
    constructor() {
        this.position = randomOffscreenPosition(Math.random() < 0.5);
        this.facing="R"
    }

    draw() {
        const context = canvas.getContext('2d');
        if (this.facing=="R"){daggerImage.src="Dagger.png"}
        else{daggerImage.src="Dagger2.png"}
        context.drawImage(daggerImage, this.position.x, this.position.y, daggerWidth, daggerHeight);
    }

    update() {
      if (this.facing=="R"){
        this.position.x += daggerSpeed;}
      else{this.position.x -= daggerSpeed;}


        // Check if dagger goes off-screen on the other side
        if (this.position.x > canvas.width && this.facing=="R") {
            this.position = randomOffscreenPosition(this.position.x < canvas.width-0.5);
            this.facing="L"
        }
        if (this.position.x < 0 && this.facing=="L") {
          this.position = randomOffscreenPosition(this.position.x < 0.5);
          this.facing="R"
      }
    }
}

const daggers = [];
// Create an array of daggers
if (hazard.includes("Daggers")){
for (let i = 0; i < 10; i++) {
    daggers.push(new Dagger());
}}



const spearImage = new Image();
spearImage.src = "spear.png"; // Replace with your dagger image URL
class Spear {
  constructor() {
      this.position={x:Math.floor(Math.random() * (canvas.width+1)),y:-100};
      this.width=20
      this.height=100
  }

  draw() {
      const context = canvas.getContext('2d');
      context.drawImage(spearImage, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.y+=5
    if (this.position.y>canvas.height){this.position.x=Math.floor(Math.random() * (canvas.width+1));this.position.y=-100}
    console.log(this.position)
  }
}


const spears = [];
// Create an array of spears
if (hazard.includes("Falling Spears")){
for (let i = 0; i < 6; i++) {
    spears.push(new Spear());
}}















const leftwallImage = new Image();
leftwallImage.src = "img/Leftwall.png"; // Replace with your image path
const rightwallImage = new Image();
rightwallImage.src = "img/Rightwall.png"; // Replace with your image path
wall_width=50
wall_height=500
function wall_update(){
  const context = canvas.getContext('2d');
  context.drawImage(leftwallImage,0,150,wall_width,wall_height)
  context.drawImage(rightwallImage,canvas.width-wall_width,150,wall_width,wall_height)}



// HAZARDS WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO


player.facing="R"
enemy.facing="L"
player.damage=30
enemy.damage=10


const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  Shift:{pressed:false},
  e:{pressed:false},
  slash:{pressed:false},
  q:{pressed:false}
}

function myadjustments(){
  count+=1
  count2+=1
  if (count>50){count=0;keys.slash.pressed=false}
  if ((keys.slash.pressed) && (player.isAttacking) && (enemy.position.x>player.position.x && enemy.position.x-player.position.x<170) && (enemy.position.y-player.position.y<25 && enemy.position.y-player.position.y>-25)){player.velocity.x=-20;player.velocity.y=-10;enemy.health+=player.damage}
  if (count2>50){count2=0;keys.q.pressed=false}
  if ((keys.q.pressed) && (enemy.isAttacking) && (enemy.position.x>player.position.x && enemy.position.x-player.position.x<170) && (enemy.position.y-player.position.y<25 && enemy.position.y-player.position.y>-25)){enemy.velocity.x=20;enemy.velocity.y=-10;player.health+=enemy.damage}
  if (player.health>1000){player.health=1000}
  if (enemy.health>1000){enemy.health=1000}
  if (player.velocity.x>0){player.velocity.x -= 0.5}
  if (player.velocity.x<0){player.velocity.x += 0.5}
  if (enemy.velocity.x>0){enemy.velocity.x -= 0.5}
  if (enemy.velocity.x<0){enemy.velocity.x += 0.5}
  if (enemy.position.x<0){enemy.position.x=0}
  if (enemy.position.x>canvas.width-100){enemy.position.x=canvas.width-100}
  if (player.position.x<0){player.position.x=0}
  if (player.position.x>canvas.width-100){player.position.x=canvas.width-100}
  if (player.at==1){player.damage=60}
  if (player.at==2){player.damage=30}
  if (enemy.at==1){enemy.damage=20}
  if (enemy.at==2){enemy.damage=10}
  if (player.velocity.y>0){player.damage+=player.velocity.y*5}
  if (enemy.velocity.y>0){enemy.damage+=enemy.velocity.y*5}

  daggers.forEach(dagger => {
    if(isColliding(dagger,player)){player.health-=2}
    if(isColliding(dagger,enemy)){enemy.health-=2}
});

spears.forEach(spear => {
  if(spearcollide(spear,player)){player.health-=5}
  if(spearcollide(spear,enemy)){enemy.health-=5}
});

  if (hazard.includes("Spikes Wall")){
    wall_update()
    if (player.position.x<=0 || player.position.x>=canvas.width-100){player.health-=10}
    if (enemy.position.x<=0 || enemy.position.x>=canvas.width-100){enemy.health-=10}
  }

}  

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  floor.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  myadjustments()
  player.update()
  enemy.update()


  // Draw and update each dagger
  daggers.forEach(dagger => {
      dagger.draw();
      dagger.update();
  });

  spears.forEach(spear => {
    spear.draw();
    spear.update();
});


  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    if (!(player.position.x<0)){
    player.velocity.x = -5}
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    if (!(player.position.x>canvas.width-100)){
    player.velocity.x = 5}
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping animation
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    if (!(enemy.position.x<0)){
    enemy.velocity.x = -5}
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    if (!(enemy.position.x>canvas.width-100)){
    enemy.velocity.x = 5}
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }
  if (keys.Shift.pressed && enemy.lastKey === 'Shift') {
    keys.Shift.pressed = false
    enemy.velocity.x=-20}
  if (keys.e.pressed && player.lastKey === 'e') {
    keys.e.pressed = false
    player.velocity.x=20}
  // jumping animation
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit(player.damage)
    player.isAttacking = false
    enemy.isAttacking = false
    enemy.velocity.x=20
    enemy.velocity.y=-5


  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit(enemy.damage)
    player.isAttacking = false
    enemy.isAttacking = false
    player.velocity.x=-10
    player.velocity.y=-5
  }

  gsap.to('#playerHealth', {
    width: player.health/10 + '%'
  })
  gsap.to('#enemyHealth', {
    width: enemy.health/10 + '%'
  })

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

//key check and jump


function isColliding(dagger,thing) {
  return (
      dagger.position.x < thing.position.x + thing.width &&
      dagger.position.x + daggerWidth > thing.position.x &&
      dagger.position.y < thing.position.y + thing.height &&
      dagger.position.y + daggerHeight > thing.position.y
  );}

  function spearcollide(spear,thing) {
    return (
        spear.position.x < thing.position.x + thing.width &&
        spear.position.x + spear.width > thing.position.x &&
        spear.position.y < thing.position.y + thing.height &&
        spear.position.y + spear.height > thing.position.y
    );}

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        if (player.velocity.y==0 | ((player.velocity.y<10) & (player.position.y>150))){
        player.velocity.y = -20}
        break
      case ' ':
        player.attack()
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'Shift':
          keys.Shift.pressed = true
          enemy.lastKey = 'Shift'
          enemy.attack()
          break
        case 'e':
          keys.e.pressed = true
          player.lastKey = 'e'
          player.attack()
          break
      case 'ArrowUp':
        if (enemy.velocity.y==0 | ((enemy.velocity.y<10) & (enemy.position.y>150))){
          enemy.velocity.y = -20}
          break
      case 'ArrowDown':
        enemy.attack()
        break
      case '/':
        keys.slash.pressed=true
        enemy.switchSprite('attack1')
        break
      case 'q':
        keys.q.pressed=true
        player.switchSprite('attack1')
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'Shift':
      keys.Shift.pressed = false
      break
    case 'e':
      keys.e.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})

function reset(){location.reload()}