/*jslint es6 node: true */
"use strict";


const db = require("../db/main");
const fs = require("fs");

/**
 * @name FileSchema
 * @description Metadata schema for MediaEntity files.
 *
 * @property {String} filesize The size of the file.
 * @property {String} mimetype The MIME Type of the file.
 */
let FileSchema = new db.Schema({
    "filename": {
        "type": String,
        "select": false
    },
    "filesize": {
        "type": String,
        "select": false
    },
    "mimetype": {
        "type": String,
        "select": false
    }
});


/**
 * @name MediaEntity
 * @description This represents all user generated Siequence media.
 *
 * @property {User} user A reference to the user who uploaded this media.
 * @property {number} total_interactions A counter of how many user interactions this media has recieved.
 * @property {[InteractionSchema]} interactions An array of individual user interactions.
 * @property {FileSchema} metadata A reference to the metadata of the media file.
 * @property {[CommentSchema]} comments An array of comments the media entity has recieved.
 * @property {Date} createdon A timestamp of when this media entity was created.
 */
let MediaEntity = new db.Schema({
    "user": {
        "type": db.Schema.Types.ObjectId,
        "ref": "User",
        "select": false,
        "required": true,
        "index": true
    },
    "src": {
        "type": String,
        "select": false,
        "required": true
    },
    
    "metadata": {
        "type": FileSchema,
        "select": false
    },
    
    "createdon": {
        "type": Date,
        "select": false,
        "default": Date.now
    },
    //Is this media item accessible outside of the private context?
    "public": {
        "type": Boolean,
        "select": false,
        "default": true,
        "index": true
    }
});


/**
 * @description Remove the file from persistant storage
 */
MediaEntity.post("remove", function (next) {

    /**
     * Stubbed out logic below as an example
     */
     console.log(this);
     console.log("this - media");
    // const filepath = "FILE_PATH_HERE";

    // fs.unlink(filepath, function (err) {
    //     next(err);
    // });
    next();
});

let MediaEntityModel = db.model("MediaEntity", MediaEntity);

module.exports = MediaEntityModel;