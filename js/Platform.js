class Platform{
    constructor(gameManager, bottom){
        this._gameManager = gameManager;
        this._offset = [
            Math.random() * 315,
            bottom
        ]
        this._leftUpdated = this.isDestroyed = false;
        this._create();
    }

    _create(){
        this._el = document.createElement('div');
        this._el.classList.add('platform');
        this._gameManager.grid.addChild(this._el);
        this._createStyle();
    }

    _createStyle(){
        this._setPosition();
        if(!document.querySelector('#platformStyle')){
            var style = document.createElement('style');
            style.id = 'platformStyle';
            style.textContent = `
                .platform{
                    width: 85px;
                    height: 15px;
                    background-color: green;
                    position: absolute;
                }
            `;
            document.head.appendChild(style);
        }

    }

    _setPosition(){
        if(!this._leftUpdated){
            this._el.style.left = this._offset[0] + 'px';
            this._leftUpdated = true;
        }
        this._el.style.bottom = this._offset[1] + 'px';
    }

    move(){
        this._offset[1] -= 4;
        this._setPosition();

    }

}