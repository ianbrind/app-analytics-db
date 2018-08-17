#!/usr/bin/env node
const program = require('commander');
const modelAction = require('./lib/model');

/*******************************************/

// Create a new model Schema
// $ femgoose model
// $ femgoose m
program
    .command("model") // sub-command
    .alias("m") // alternative sub-command is `m`
    .description("Create a new Model") // command description

    // function to execute when command is uses
    .action(modelAction);


// allow commander to parse `process.argv`
program.parse(process.argv);