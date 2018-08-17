const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const Handlebars = require("handlebars");

const questions = [
    {
        type: "input",
        name: "modelName",
        message: "What is the EntityName?",
        validate: function (input) {
            // Couple of things we need to validate against the model name
            // First is that it's appropriate (case, characters, etc) and secondly
            // that the model doens't already exist.
            //
            // We need to declare `done` in order to execute asyncronously
            var done = this.async();

            // Check the quality of the string name
            if (/^[A-Za-z]+$/.test(input) === false) {
                return done("Entity name should be CamelCase and only letters.");
            }

            // Check the model exists already
            var moduleName = getModuleName(input);
            var modelLocation = modelsDir + moduleName + ".js"; 

            fs.exists(modelLocation, (found) => {
                if (found) {
                    done("Model already exists @ " + modelLocation);
                    return;
                }
                done(null, true); // g2g
            });
        }
    },
    { type: "confirm", name: "modelSoftDelete", message: "Do you want enable soft delete?", default: false },
    { type: "confirm", name: "modelProcessors", message: "Do you want to create CRUD processors?", default: true },
    { type: "confirm", name: "modelRoutes", message: "Do you want to create API routes?", default: true },
    { type: "confirm", name: "modelViews", message: "Do you want to create Bootstrap views?", default: false }
];

// This could be read from the global app config 
// as it"s unreliable , i.e, config["app_models_dir"]
const cwd = process.cwd();
const modelsDir = path.join(cwd, "/src/model/");
const processorsDir = path.join(cwd, "/src/processors/");
const controllersDir = path.join(cwd, "/src/controllers/private/");

function getModuleName(name) {
    return name.split(/(?=[A-Z])/).join("-").toLowerCase();
}

module.exports = () => {
    inquirer
        .prompt(questions)
        .then((answers) => {
            var modelFsFriendlyName, modelFilename, modelFileContents, rawTemplate, templateFn;

            // Create a file system friendly name for the folder and file names
            // Basically we are splitting the CamelCase string and joining with a hyphen
            modelFsFriendlyName = getModuleName(answers.modelName);
            modelFilename = modelFsFriendlyName + ".js";

            answers.modelModuleName = modelFsFriendlyName;

            // Get the raw string from the template file
            rawTemplate = fs.readFileSync(__dirname + "/templates/model.hbs", "utf-8");

            // Convert the raw string template into a Handlebars compilable template
            templateFn = Handlebars.compile(rawTemplate);

            // Finally we compile the Handlebars template into it"s final string
            // form ready to be written to disk.
            modelFileContents = templateFn(answers);

            // Write the model file
            fs.writeFile(modelsDir + modelFilename, modelFileContents, (err) => {
                if (err) {
                    return console.log(err);
                }

                // Now we can create the processor files
                // first we check it exists and create any dirs if needed
                if (answers.modelProcessors) {
                    var modelProcessorsDir = processorsDir + modelFsFriendlyName + "/";
                    fs.exists(modelProcessorsDir, (found) => {
                        if (!found) {
                            fs.mkdirSync(modelProcessorsDir);
                        }
        
                        // Render the processor templates using the same Handlebars logic above
                        ["save", "delete", "get", "getlist"].forEach((process) => {
                            var rawTemplate = fs.readFileSync(__dirname + "/templates/processor." + process + ".hbs", "utf-8");
                            var templateFn = Handlebars.compile(rawTemplate);
                            var fileContents = templateFn(answers);
                            fs.writeFileSync(modelProcessorsDir + process + ".js", fileContents);
                        });
                    });
                }

                // Now try create the API controllers
                if (answers.modelRoutes) {
                    var modelControllerDir = controllersDir + modelFsFriendlyName + "/";
                    fs.exists(modelControllerDir, (found) => {
                        if (!found) {
                            fs.mkdirSync(modelControllerDir);
                        }
                        var rawTemplate = fs.readFileSync(__dirname + "/templates/routes.index.hbs", "utf-8");
                        var templateFn = Handlebars.compile(rawTemplate);
                        var fileContents = templateFn(answers);
                        fs.writeFileSync(modelControllerDir + "index.js", fileContents);
                    });
                }
            });
        })
};