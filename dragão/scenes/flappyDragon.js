// Definindo a cena principal do jogo usando a biblioteca Phaser
class FlappyDragon extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super('FlappyDragon');
    }

    init() {
        this.score = 0;
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image('bg', 'assets/green hill.png');
        this.load.image('player', 'assets/robotinik.png');
        
        this.load.image('turbo', 'assets/turbo.png');
        this.load.image('gameOver', 'assets/gameover.png');
        this.load.image('restart', 'assets/restart.png');
        this.load.image('coin', 'assets/moedaFeia.png');
        this.load.image('concrete', 'assets/blocoConcretoMario.png');
    }

    // Criação de elementos e configurações iniciais da cena
    create() {
        // Adiciona a imagem de fundo e define seu tamanho
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);

        
        // Adiciona o obstáculo, o concreto
        
        
        // Adiciona o turbo que acompanha o player
        this.fire = this.add.sprite(0, 0, 'turbo');
        this.fire.setVisible(false);
        this.concrete = this.physics.add.staticImage(this.game.config.width / 2, this.game.config.height / 2, 'concrete').setScale(0.08)
        // Adiciona o player
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 6, 'player').setScale(0.05);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.concrete);

        // Adiciona moeda para o player coletar
        this.coin = this.physics.add.sprite(this.game.config.width / 2, 0, 'coin').setScale(0.1);
        this.coin.setCollideWorldBounds(true);
        this.coin.setBounce(0.7);
         this.physics.add.collider(this.coin, this.concrete);

        // Adiciona o placar
        this.scoreText = this.add.text(50, 30, 'Moedas: ' + this.score, { fontSize: '25px', fill: '#495613' });

        // Faz a moeda aparecer aleatoriamente
        this.physics.add.overlap(this.player, this.coin, () => {

            this.coin.setVisible(false); // Moeda fica invisível

            var coinPositionY = Phaser.Math.RND.between(50, 650); // Sorteia número

            this.coin.setPosition(coinPositionY, 10); // Ajusta a posição da moeda

            this.score += 1; // Soma a pontuação
            this.scoreText.setText('Moedas: ' + this.score); // Atualiza o texto do placar

            this.coin.setVisible(true); // Ativa a visão da moeda novamente dando a ilusão de ser uma "nova moeda"
        });
        // Controles do teclado
        this.cursors = this.input.keyboard.createCursorKeys();


       
        

        
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

        
        if (this.score > 15)  {
            this.scene.start('Welcome', this.game);
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

