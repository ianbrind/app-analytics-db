/**
* @overview Define the destinations of file uploads within the application
*/
const multer = require("multer");
const crypto = require("crypto");
	console.log(require("./index"));
//Base directory where the uploads are stored.
const async = require("async");
const sharp = require("sharp");
const fs = require("fs");

const ASSET_BASE_URL = "assets/app/";


const calcFilename = function (req, file, cb) {

    const file_extension = file.mimetype.split("/")[1] || "jpg";
    const seed = crypto.randomBytes(20);
    const uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');
    cb(null, file.fieldname + '-' + uniqueSHA1String + "." + file_extension);
};

module.exports = {

	ASSET_BASE_URL: ASSET_BASE_URL,


	compressImages: (req, res, next) => {

		const images = [];
		
		let files = [];

		if (req.file) {
			files = [req.file];
		}
		if (req.files) {
			files = [...files, ...req.files];
		}

		//Go get the images sent with the request.
		files.forEach((file) => {
			if (file.mimetype.indexOf("image") !== -1) {
				images.push(file);
			}
		});

		//Now compress them.

		async.each(images, 
		(img, each_cb) => {
                        
			//Check for image format..
			let imageFormat = "jpeg";
			let newFilePath = img.path + `compressed.${imageFormat}`;
			
			if (img.mimetype.indexOf("png") !== -1) {
				imageFormat = "png";
			}
			
			sharp(img.path)
				.resize(1200,1000)
				.min()
				.toFormat(imageFormat, {
					quality: 72
				})
                .withoutEnlargement()	
				.toFile(filePath)
				.then((result) => {


					//Remove the original file...
					fs.unlink(img.path, () => {
						img.path = newFilePath;
						img.filename = img.path.replace(/^.*[\\\/]/, '');
						img.size = result.size;

						each_cb(null);
					});

				});
		}, 

		(err, result) => {
			
			if (err) {
				console.warn("Error compressing images.")
				return next(err);
			}

			next();
		});
	},

	/**
	* @description Where user profile pictures are stored 
	*/
	Offer: multer({ 
		storage: multer.diskStorage({
		    destination: function (req, file, cb) {
		        const path = ASSET_BASE_URL + "tmp";
		        
		        cb(null, path);
		    },
		    filename: calcFilename
		})
	}),

	/**
	* @description Where user profile pictures are stored 
	*/
	Business: multer({ 
		storage: multer.diskStorage({
		    destination: function (req, file, cb) {
		        const path = ASSET_BASE_URL + "tmp";
		        
		        cb(null, path);
		    },
		    filename: calcFilename
		})
	}),

	/**
	* @description Where Gallery Item photos go 
	*/
	GalleryItem: multer({ 
		storage: multer.diskStorage({
		    destination: function (req, file, cb) {
		        const path = ASSET_BASE_URL + "tmp";
		        
		        cb(null, path);
		    },
		    filename: calcFilename
		})
	})
};
