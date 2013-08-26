/// <reference path="../../src/Kiwi.ts" />

class movement extends Kiwi.State {

    constructor() {
        super('basictiles');
    }

    preload() {
        this.addJSON('desert', 'assets/tilemaps/desert.json', false);
        this.addSpriteSheet('tiles', 'assets/tiles/tmw_desert_spacing.png', 32, 32, false, 6 * 8, 6, 8, 1, 1, 1, 1);
        this.addImage('ufo', 'assets/sprites/ufo.png', false);
    }

    create() {

        this.tileMap = new Kiwi.GameObjects.Tilemap.TileMap();
        this.addChild(this.tileMap); //has to be added to the stage first
        this.tileMap.createFromCache('desert', this.textures.tiles, this.game, Kiwi.GameObjects.Tilemap.TileMap.FORMAT_TILED_JSON);

        this.textfield = new Kiwi.GameObjects.Textfield('', 400, 10, '#000', 12);
        this.textfield.textAlign = 'center';
        this.addChild(this.textfield);

        this.ufo = new Kiwi.GameObjects.Sprite(this.textures.ufo, 400, 300);
        this.addChild(this.ufo);

        this.game.input.mouse.mouseUp.add(this.check, this);
    }

    check() {

        var tile = this.tileMap.getTileFromInputXY();

        this.textfield.text = tile.tileType.toString();

    }

    update() {
        
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP)) {
            this.tileMap.currentLayer.transform.y += 5;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.DOWN)) {
            this.tileMap.currentLayer.transform.y -= 5;
        }

        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
            this.tileMap.currentLayer.transform.x += 5;
        } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
            this.tileMap.currentLayer.transform.x -= 5;
        }

        

        super.update();
    }

    public tileMap: Kiwi.GameObjects.Tilemap.TileMap;
    public ufo: Kiwi.GameObjects.Sprite;
    public textfield: Kiwi.GameObjects.Textfield;

}