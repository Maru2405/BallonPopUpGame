class BalloonGame extends Phaser.Scene {
    constructor() {
        super({ key: 'BalloonGame' });
    }

    preload() {
        this.load.image('background', 'https://c8.alamy.com/comp/2E064N7/plain-white-background-or-wallpaper-abstract-image-2E064N7.jpg');
        this.load.image('balloon', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGQ-26MUYGB3cFuwcXUdpbHlQ6HIXeJVQ1jw&s');
        this.load.image('pump', 'https://www.shutterstock.com/image-vector/mini-balloon-pump-vector-cartoon-600nw-2454294953.jpg');
        this.load.image('burst', 'https://i.pinimg.com/736x/03/36/d4/0336d464e7c460c984e1b0aec0859434.jpg');
    }
    create() {
        this.add.image(400, 300, 'background').setScale(4);
        this.pump = this.add.image(400, 500, 'pump').setInteractive().setScale(0.3);
        this.balloon = this.add.image(400, 300, 'balloon').setScale(0.2).setVisible(false);
        this.burstEffect = this.add.image(400, 300, 'burst').setScale(0.3).setVisible(false); 

        this.pumpClicks = 0;
        this.isFloating = false;

        this.pump.on('pointerdown', () => this.inflateBalloon());
        this.balloon.setInteractive();
        this.balloon.on('pointerdown', () => this.burstBalloon());
    }

    burstBalloon() {
        this.balloon.setTexture('burst');
        this.tweens.killTweensOf(this.balloon);
        this.time.delayedCall(500, () => {
            this.balloon.setVisible(false);
            this.balloon.setPosition(400, 300);
            this.pumpClicks = 0;
            this.isFloating = false;
            this.balloon.setScale(0.1).setTexture('balloon');
        });
    }

    inflateBalloon() {
        if (this.pumpClicks < 10) {
            this.pumpClicks++;
            this.balloon.setVisible(true);
            this.balloon.setScale(0.1 + this.pumpClicks * 0.1);
        }
        if (this.pumpClicks === 10 && !this.isFloating) {
            this.floatBalloon();
        }
    }

    floatBalloon() {
        this.isFloating = true;
        this.tweens.add({
            targets: this.balloon,
            x: Phaser.Math.Between(100, 700),
            y: 100,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: BalloonGame
};

const game = new Phaser.Game(config);
