"use strict";

// required environment variables
[
    "NODE_ENV",
    //"PORT"
].forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Uh Ohh!!! Femgoose doesn't look happy!...\n\n
                                   ___
                               ,-""   \`.
                             ,'  _   e )\`-._    
                            /  ,' \`-._<.===-' Where's my qua*ing ${name} fool?!
                           /  /
                          /  ;
              _          /   ;
 (\`._    _.-"" ""--..__,'    |
 <_  \`-""                     \
  <\`-                          :
   (__   <__.                  ;
     \`-.   '-.__.      _.'    /
        \      \`-.__,-'    _,'
         \`._    ,    /__,-'
            ""._\__,'< <____
                 | |  \`----.\`.
                 | |        \ \`.
                 ; |___      \-\`\`
                 \   --<
                  \`.\`.<
                    \`-'`)
    }
})

const ENV = process.env.NODE_ENV || "development";

const config = require(`./config.${ENV}.js`);
config.app.uploads = require("./uploads");

//Export the config respective of the environment the app is running on, e.g. development/staging/production.
module.exports = config;
