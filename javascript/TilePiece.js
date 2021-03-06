var drawInfo = [[0, 0], [1, 0], [0, 1], [1, 1]];
var drawOrder = [[3, 2, 1, 0], [1, 0, 3, 2], [2, 3, 0, 1], [0, 1, 2, 3]];
function TilePiece(heightMask, tiles) {
    this.tiles = tiles;

    this.click = function (x, y, state) {


        //sonicManager.SonicLevel.Tiles[this.tiles[_H.floor(x / 8) + _H.floor(y / 8) * 2]].changeColor(x % 8, y % 8, new Color(0, 0, 0));



    };
    this.mouseOver = function (x, y) {
        //sonicManager.SonicLevel.Tiles[this.tiles[_H.floor(x / 8) + _H.floor(y / 8) * 2]].tempColor(x % 8, y % 8, new Color(122, 5, 122));
    };
    this.onlyBackground = function () {
        for (var i = 0; i < this.tiles.length; i++) {
            var mj = this.tiles[i];
            if (sonicManager.SonicLevel.Tiles[mj.Tile]) {
                if (mj.Priority == true) {
                    return false;
                }
            }
        }
        return true;
    };
    this.drawUI = function (canvas, position, scale, xflip, yflip) {
        var drawOrderIndex = 0;
        if (xflip) {
            if (yflip) {
                drawOrderIndex = 0;
            } else {
                drawOrderIndex = 1;
            }
        } else {
            if (yflip) {
                drawOrderIndex = 2;

            } else {
                drawOrderIndex = 3;
            }
        }
        for (var i = 0; i < this.tiles.length; i++) {
            var mj = sonicManager.SonicLevel.Tiles[this.tiles[i].Tile];
            if (mj) {
                var df = drawInfo[drawOrder[drawOrderIndex][i]];
                TilePiece.__position.x = position.x + df[0] * 8 * scale.x;
                TilePiece.__position.y = position.y + df[1] * 8 * scale.y;
                mj.drawUI(canvas, TilePiece.__position, scale, (xflip^ mj.XFlip), (yflip^mj.YFlip), mj.Palette);


            }
            /* canvas.lineWidth = 2;
            canvas.strokeStyle = "#D142AA";
            canvas.strokeRect(position.x, position.y, 16 * scale.x, 16 * scale.y);*/
        }


        //canvas.fillStyle = "#FFFFFF";
        //canvas.fillText(sonicManager.SonicLevel.Blocks.indexOf(this), position.x + 8 * scale.x, position.y + 8 * scale.y);


        return true;
    };

    var cx = 8 * window.sonicManager.scale.x * 2;
    var cy = 8 * window.sonicManager.scale.y * 2;
    this.image = [];

    this.getCache = function (layer, scale, drawOrder, animationFrame, palAn) {
        //return false;
        var val = ((drawOrder + 1)) + (scale.x * 10) + ((!animationFrame ? 0 : animationFrame) * 1000) + ((layer + 1) * 10000);

        for (var i = 0;  i < this.animatedFrames.length; i+=1) {
            val += palAn[this.animatedFrames[i]] + " ";
        }
        if (!this.image[val]) return undefined;
        if (this.image[val].image && this.image[val].image.loaded)
            return this.image[val].image;
        return this.image[val].canvas;

    };
    this.setCache = function (layer, scale, drawOrder, animationFrame, palAn, image) {
        //   return;
        var val = ((drawOrder + 1) ) + (scale.x * 10) + ((!animationFrame ? 0 : animationFrame) * 1000) + ((layer + 1) * 10000);

        for (var i = 0; i < this.animatedFrames.length; i+=1) {
            val += palAn[this.animatedFrames[i]] + " ";
        }
        //var img = new Image();
        //img.src = image.toDataURL();
        //img.onload = function () { img.loaded = true; }
        image.loaded = true;
        this.image[val] = { canvas: image, image: image };

    };
    this.draw = function (canvas, position, scale, layer, xflip, yflip, animationFrame, bounds) {

        if (bounds && !bounds.intersects(position)) {
            return true;
        }
        var drawOrderIndex = 0;
        if (xflip) {
            if (yflip) {
                drawOrderIndex = 0;
            } else {
                drawOrderIndex = 1;
            }
        } else {
            if (yflip) {
                drawOrderIndex = 2;

            } else {
                drawOrderIndex = 3;
            }
        }
        var fd = this.getCache(layer, scale, drawOrderIndex, animationFrame, sonicManager.SonicLevel.palAn);
        if (!fd) {
            var ac = _H.defaultCanvas(cx, cy);
            var sX=8 * scale.x;
            var sY=8 * scale.y;
            for (var i = 0; i < this.tiles.length; i++) {
                var mj = this.tiles[i];
                if (sonicManager.SonicLevel.Tiles[mj.Tile]) {
                    if (mj.Priority == layer) {
                        var _xf = (xflip^ mj.XFlip);
                        var _yf = (yflip^mj.YFlip);
                        var df = drawInfo[drawOrder[drawOrderIndex][i]];
                        TilePiece.__position.x = df[0] * sX;
                        TilePiece.__position.y = df[1] * sY;
                        sonicManager.SonicLevel.Tiles[mj.Tile].draw(ac.context, TilePiece.__position, scale, _xf, _yf, mj.Palette, layer, animationFrame);
                    }
                }
            }
            fd = ac.canvas;
            this.setCache(layer, scale, drawOrderIndex, animationFrame, sonicManager.SonicLevel.palAn, fd);

        }
        this.drawIt(canvas, fd, position);
        return true;
    };
    this.drawIt = function (canvas, fd, position) {
        canvas.drawImage(fd, position.x, position.y);

    };
    this.equals = function (tp) {
        for (var i = 0; i < this.tiles.length; i++) {

            if (tp[i] != this.tiles[i])
                return false;
        }
        return true;
    };

}
TilePiece.__position = { x: 0, y: 0 };


RotationMode = {
    Floor: 134,
    RightWall: 224,
    Ceiling: 314,
    LeftWall: 44
}; /* 


function defaultTiles(tile) {
    var tiles = [];
    for (var x = 0; x < 16; x++) {
        for (var y = 0; y < 16; y++) {
            tiles.push(tile);
        }
    }
    return tiles;
}

function defaultBlocks(heightMask) {
    var tilePieces = [];
    var ind = 0;
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            tilePieces.push(new TilePiece(heightMask, [ind, ind + 1, ind + 2, ind + 3],RotationMode.Floor));
            ind += 4;
        }
    }
    return tilePieces;
}
function defaultChunks() {
    var tileChunks = [];
    for (var x = 0; x < 1; x++) {
        for (var y = 0; y < 1; y++) {
            var ind = 0;
            var tilePieces = [];
            for (var x_ = 0; x_ < 8; x_++) {
                for (var y_ = 0; y_ < 8; y_++) {
                    tilePieces.push(ind++);
                }
            }
            tileChunks.push(new TileChunk(tilePieces));

        }
    }

    return tileChunks;
}
function defaultColors(col) {
    var cols = [];
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            cols.push(col);
        }
    }
    return cols;
}


function randColor() {
    return "rgb(" + _H.floor(Math.random() * 255) + "," + _H.floor(Math.random() * 255) + "," + _H.floor(Math.random() * 255) + ")";
}
*/