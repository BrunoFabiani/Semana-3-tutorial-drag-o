// Definindo a cena principal do jogo usando a biblioteca Phaser
class Welcome extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super('Welcome');
    }

    init() {
        this.score = 0;
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image('bg', 'assets/green hill.png');
        this.load.image('player', 'assets/robotinik.png');
        this.load.image('concrete', 'assets/blocoConcretoMario.png');
        this.load.image('turbo', 'assets/turbo.png');
        this.load.image('gameOver', 'assets/gameover.png');
        this.load.image('restart', 'assets/restart.png');
        this.load.image('coin', 'assets/moedaFeia.png');
        this.load.image('sonic', 'assets/super_sonic.png');
    }

    // Criação de elementos e configurações iniciais da cena
    create() {
        // Adiciona a imagem de fundo e define seu tamanho
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);

        this.inZone = false;
        
        // Adiciona o obstáculo, o concreto
        this.concrete = this.physics.add.staticImage(this.game.config.width / 2, this.game.config.height / 2, 'concrete').setScale(0.08)
        
        // Adiciona o turbo que acompanha o player
        this.fire = this.add.sprite(0, 0, 'turbo');
        this.fire.setVisible(false);

        // Adiciona o player
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 6, 'player').setScale(0.05);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.concrete);

        this.sonic= this.physics.add.sprite(0, 0, 'sonic').setPushable(true)
        
        // Controles do teclado
        this.cursors = this.input.keyboard.createCursorKeys();


        this.physics.add.collider(this.player, this.sonic, () => {
            this.inZone = true;
        });
        

        
    }

    // Atualização lógica do jogo a cada frame
    update() {
        // Movimento para esquerda
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-150);
        }
        // Movimento para direita
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(150);
        }
        // Sem movimento horizontal
        else {
            this.player.setVelocityX(0);
        }

        // Movimento para cima
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-150);
            this.activateTurbo();
        }
        // Movimento para baixo
        else {
            this.player.setVelocityY(150);
            this.deactivateTurbo();
        }

        if (this.sonic.x == 100) {
            this.sonic.setFlip(false, false); //reverte qualquer flip que tenha sido feito para o sprite do passarinho, fazendo ele ser igual de quando o código começou
            this.sonic.ida = true;
            }
        if (this.sonic.x < 700 && this.sonic.ida === true) {
            this.sonic.x += 5;
            }
        if (this.sonic.x == 700) {
            this.sonic.setFlip(true, false);
            this.sonic.ida = false; //prepara a váriavel do passarinho.ida para que no próximo if ele seja considerado falso e o código funcione.
            }
        if (this.sonic.x > 100 && this.sonic.ida === false) {
            this.sonic.x -= 5;
            }

        if (inZone == true) {
            this.player.destroy();
            }

        // Ação de gravidade do jogo em Y
        this.fire.setPosition(this.player.x, this.player.y + this.player.height / 2);
        this.fire.setScale(0.05);

    }

    activateTurbo() {
        this.fire.setVisible(true);
    }

    deactivateTurbo() {
        this.fire.setVisible(false);
    }
}

