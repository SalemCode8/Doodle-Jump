class GameManager {
    constructor(maxPlatforms = 5, startSpeed = 30) {
        this._maxPlatforms = maxPlatforms;
        this._speed = startSpeed;
        this._score = 15;
        this._grid = new Grid(this);
    }

    get grid() {
        return this._grid;
    }
    

    increaseScore(){
        this._score++;
    }

    loadScene(scene){
        if(this._scene)
            this._scene.destroy();
        this._scene = new scene(this);
    }

}