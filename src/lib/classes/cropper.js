const sharp = require("sharp");

class Cropper {

    static crop (input, output, width = 20, height = 20, cb = ()=>{}) {

        sharp(input)
            .resize(width, height)
            .crop(sharp.strategy.entropy)
            .withoutEnlargement()
            .toFile(output, cb);
    }
}

module.exports = Cropper;