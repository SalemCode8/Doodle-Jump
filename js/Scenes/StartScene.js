class StartScene{
    constructor(gameManager){
        this._gameManager = gameManager;
        this._buildTitle();
        this._buildButton();
    }


    _buildTitle(){
        this._title = document.createElement('h1');
        this._title.style.paddingTop = '20px';
        this._title.style.textAlign = 'center';
        this._title.style.color = 'black';
        this._title.textContent = 'Welcome to My Game';
        this._gameManager._grid.addChild(this._title);
    }
    _buildButton(){
        this._button = document.createElement('button');
        this._button.style.position = 'absolute';
        this._button.style.top = '50%';
        this._button.style.left = '50%';
        this._button.style.transform = 'translate(-50%, -50%)';
        this._button.style.padding = '10px 20px';
        this._button.style.backgroundColor = '#0d6efd';
        this._button.style.color = 'white';
        this._button.style.border = 'none';
        this._button.style.borderRadius = '.25rem';
        this._button.textContent = 'Start';
        this._button.onclick = () => this._gameManager.loadScene(GameScene);;
        this._gameManager._grid.addChild(this._button);
    }

    destroy(){
        this._title.remove();
        this._button.remove();
    }
}