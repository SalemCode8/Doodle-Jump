class PlayerController{
    constructor(scene, gameManager, left = 50, moveSpeed = 2){
        this._scene = scene;
        this._gameManager  = gameManager;
        this._lastOffset = null;
        this._startPoint = 150;
        this._offset = [left, this._startPoint];
        this._upTimer = null;
        this._downTimer = null;
        this._leftTimer = null;
        this._rightTimer = null
        this.isJumping = false;
        this.isMovingRight = false;
        this.isMovingLeft = false;
        this._moveSpeed = moveSpeed;
        this._create();
        this.jump();

        document.addEventListener('keydown', this.move.bind(this));
        document.addEventListener('keyup', this.stop.bind(this));
    }

    _create(){
        this._el = document.createElement('div');
        this._createStyle();
        this._setPosition();
        this._gameManager.grid.addChild(this._el);
    }

    _createStyle(){
        this._el.style.width = '60px';
        this._el.style.height = '85px';
        this._el.style.backgroundColor = 'red';
        this._el.style.position = 'absolute';
    }

    _setPosition(){
        this._el.style.left = this._offset[0] + 'px';
        this._el.style.bottom = this._offset[1] + 'px';
        /*if(this._lastOffset){
            if(this._lastOffset[0] !== this._offset[0]){
                this._el.style.left = this._offset[0] + 'px';
            }
            if(this._lastOffset[1] !== this._offset[1]){
                this._el.style.bottom = this._offset[1] + 'px';
            }

                this._lastOffset = this._offset;
            if(this._lastOffset[0] !== this._offset[0] || this._lastOffset[1] !== this._offset[1]){
            }
        }else{

            this._lastOffset = this._offset;
        }*/

    }

    jump(){
        clearInterval(this._downTimer);
        this.isJumping = true;
        this._upTimer = setInterval(() => {
            this._offset[1] += 20;
            this._setPosition();
            if(this._offset[1] > this._startPoint + 200){
                this._fall();
            }
        }, this._gameManager._speed);
    }

    _fall(){
        clearInterval(this._upTimer);
        this.isJumping = false;
        this._downTimer = setInterval(() => {
            this._offset[1] -= 5;
            this._setPosition();
            if(this._offset[1] <= 0){
                this._scene.gameOver();
            }
            this._checkForPlatforms();
        }, this._gameManager._speed);
    }


    _checkForPlatforms(){
        this._scene._platforms.forEach((platform) => {
            if(
            (this._offset[1] >= platform._offset[1]) &&
             (this._offset[1] <= (platform._offset[1] + 15)) &&
             ((this._offset[0] + 60) >= platform._offset[0]) &&
             (this._offset[0] <= (platform._offset[0] + 85)) && !this.isJumping){
                this.jump();
                this._startPoint = this._offset[1];
                this._gameManager.increaseScore();
            }
        });
    }
    destroy(){
        clearInterval(this._upTimer);
        clearInterval(this._downTimer);
        this._el.remove();
    }


    move(e){
        if(e.key == 'ArrowLeft'){
            this.left();
        }else if(e.key == 'ArrowRight'){
            this.right();
        }
    }

    right() {
        this.stop();
        this.isMovingRight = true;
        this._rightTimer = setInterval(() => {
            if(this._offset[0] <= 340){
                this._offset[0] += this._moveSpeed;
                this._setPosition();
            }else{
                this.left();
            }
        }, this._speed);
    }
    left() {
        this.stop();
        this.isMovingLeft = true;
        this._leftTimer = setInterval(() => {
            if(this._offset[0] >= 0){
                this._offset[0] -= this._moveSpeed;
                this._setPosition();
            }else{
                this.right();
            }
        }, this._speed);
    }

    stop(){
        clearInterval(this._leftTimer);
        clearInterval(this._rightTimer);
        this.isMovingLeft = this.isMovingRight = false;
    }
}