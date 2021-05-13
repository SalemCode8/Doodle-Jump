class Grid {
    constructor(gameManager) {
        this._gameManager = gameManager;
        this._create();
    }

    addChild(child) {
        this._el.appendChild(child);
    }

    _create() {
        this._el = document.createElement('div');
        this._createStyle();
        document.body.appendChild(this._el);
    }

    _createStyle() {
        this._el.style.width = '400px';
        this._el.style.height = '600px';
        this._el.style.backgroundColor = 'yellow';
        this._el.style.position = 'relative';
    }
}