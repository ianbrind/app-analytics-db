const MediaEntity = require("../../model/mediaentity");
const FileSystem = require("./filesystem");

class Media {
	
	processMediaEntity (user_id, file, destination_path, cb)  {

		FileSystem.move(file.path, destination_path, (err) => {
			if (err) {

				return cb(err);
			}

			//Now create the new media entity
		    let media = new MediaEntity({
		        user: user_id,
		        src: destination_path,
		        metadata: {
		        	filename: file.filename,
		            mimetype: file.mimetype,
		            filesize: file.size
		        }
		    });

		    media.save(cb);
		});
		
	}
}

module.exports = new Media();