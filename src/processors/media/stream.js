/** 
 * @overview Media Stream processor, this is the gateway which all media requests (images & videos) will pass through
*/
const MediaEntity = require("../../model/mediaentity");
const config = require("../../../config").app.uploads;
const fs = require("fs");
const Cropper = require("../../lib/classes/cropper");

/**
 * @description Available image crop dimensions the API provides,
 * the client requests these by the respective string key, e.g. 'profile-picture'
 */
const IMAGE_SIZES = {

    /*
    * @description This is for requesting the original image.
    */ 
    "original": {
        width: null,
        height: null
    },

    "thumb-50": {
        width: 50,
        height: 50
    },

    "card": {
        width: 480,
        height: 320
    }

};

/**
 * @description Finds the media entity requested
 * @param {*} id - MediaEntity ObjectID 
 * @param {*} cb - Callback
 */
const findOne = (id, isPublic, cb) => {

    let q = {
        _id: id
    };

    if (isPublic === true) {
        q.public = true;
    }
    
    MediaEntity
        .findOne(q)
        .select("metadata src")
        .exec(cb);
};

/**
 * @function stream Returns a stream to a file to the client
 * @param {Object} res - Response object
 * @param {Object} media - MediaEntity database entity
 */
const stream = (res, media) => {
    
    res.setHeader("Content-Type", media.metadata.mimetype);

    fs.createReadStream(media.src)
        .pipe(res);
};

const cropImage = (media, input, output, width = 100, height = 100, cb) => {

    Cropper.crop(input, output , width, height, (err, data) => {

        if (err) {
            console.log(err);
            // return res.status(500).json({message: "Error cropping image."});
        }

        return cb();   
    });
}

const cropExists = (src, cb) => {
    fs.access(src, fs.constants.R_OK, cb);
}

const processor = (req, res, next) => {

    const asset_dir = config.ASSET_BASE_URL;
    const display = req.query.display || "thumb-50";
    const width =  IMAGE_SIZES[display].width; 
    const height = IMAGE_SIZES[display].height;
    const isPublic = req.query.public || req.params.public || false;

    findOne(req.params.media_id, isPublic, (err, media) => {

   
        if (err) { return res.status(500).json({message: "Error finding media."}); }
        if (!media) { return res.status(404).json({message: "No media found"}); }

        console.log(media);
        console.log("MEDIA");
        const file_input = media.src;
        const crop_src = asset_dir + "crops/" + width + "-" + height + "-" + media.metadata.filename;

        //Return the original file if requested
        if (display === "original" || display === "video") {

            return stream(res, {
                _id: media._id,
                src: file_input,
                metadata: media.metadata
            });
        }

        //Check if the crop exists
        cropExists(crop_src, (err, data) => {

            if (!err) {
                //We found the cached crop..
                return stream(res, {
                    _id: media._id,
                    src: crop_src,
                    metadata: media.metadata
                });
            }

            console.log("Cropping image");
            console.log(`asset dir  = ${asset_dir}`);
            console.log(file_input);
            console.log(crop_src);

            //No cached crop found 
            cropImage(media, file_input, crop_src, width, height, (err) => {

                if (err) {
                    return res.status(500).json({message: "Error cropping image."});
                }

                return stream(res, {
                    _id: media._id,
                    src: crop_src,
                    metadata: media.metadata
                });
            });
        });
        
        
    });
};

module.exports = processor;