class RetryScene{
    constructor(gameManager){
        this._gameManager = gameManager;
        this._buildBoard();
        this._buildButton();
    }

    _buildBoard(){
        this._board = document.createElement('h1');
        this._board.style.textAlign = 'center';
        this._board.style.color = 'black';
        this._board.style.paddingTop = '20px';
        this._board.textContent = 'You\'ve Scored ' + this._gameManager._score + ' Points';
        this._gameManager._grid.addChild(this._board);
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
        this._button.textContent = 'Retry';
        this._button.onclick = () => this._gameManager.loadScene(GameScene);;
        this._gameManager._grid.addChild(this._button);
    }

    destroy(){
        this._board.remove();
        this._button.remove();
    }
}