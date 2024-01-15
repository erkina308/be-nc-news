# Northcoders News API

To connect to the environment variables the user must first install node-postgres; which allows the user to establish a connection with the database.

node-postgres can be installed with: npm install pg

After installation, create a file called connection.js; this file will establish the connection to the database through the environment variables.

Within this file you need to require in the postgres modules using 'pg', to get the specific method you want you can use destructring like so:
const { Pool } = reqiure('pg')

You can now use the Pool method; which you can export and use to make queries to the database elsewhere in your code.

Before exporting the Pool method you need to actually attain the environment variables from .env files.

.env files will be present in the folder which contain information as to which database you need to connect to.

To actually load the environment variables you need a module called Dotenv; which can be installed locally using: npm install dotenv --save

Dotenv loads the environment variables into the property: process.env

process.env can be used like so:

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
path: `${__dirname}/../.env.${ENV}`,
});

This block of code will now create the connection to the test database with process.env.NODE_ENV or the development database and can now be used in NODE.

The .config method takes the object that includes the path as to where the .env file is and which database will be accessed.

Finally before exporting you need to check whether a database has been set, or else you won't have any data to make queries to. To check this you use an if statement like so:

if (!process.env.PGDATABASE) {
throw new Error('PGDATABASE not set');
}

Now you can export with: module.exports = new Pool()
