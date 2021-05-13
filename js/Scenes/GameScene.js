class GameScene{
    constructor(gameManager){
        this._gameManager = gameManager;
        this._build();
    }

    _build(){
        this._platforms = [];
        this._createPlatforms();
        this._player = new PlayerController(this,this._gameManager, this._platforms[0]._offset[0]);
        this._movePlatformsTimer = setInterval(this._movePlatforms.bind(this), this._gameManager._speed);
        
    }


    

    _createPlatforms() {
        var max = this._gameManager._maxPlatforms;
        for (var i = this._platforms.length; i < max; i++) {
            var gap = 600 / max;
            var bottom = 100 + i * gap;
            this._platforms.push(new Platform(this._gameManager, bottom));
        }
    }

    _movePlatforms() {
        this._platforms.forEach((platform) => {
            platform.move();
            if (platform._offset[1] < 1 && !this._gameOver) {
                this.destroyFirst();
            }
        });
    }

    gameOver() {
        this._gameManager.loadScene(RetryScene);
    }

    _destroyPlatforms(){
        this._platforms.forEach(platform => {
            platform._el.remove();
        });
        this._platforms = [];
        clearInterval(this._movePlatformsTimer);
    }

    

    destroyFirst() {
        this._platforms[0]._el.remove();
        this._platforms.shift();
        this._createPlatforms();
    }

    destroy(){
        this._player.destroy();
        this._destroyPlatforms();
    }


}