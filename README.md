# Meteor-team-wiki

## Install Meteor
$ curl https://install.meteor.com/ | sh


## config external mongo db
export MONGO_URL=mongodb://SERVERNAME:PORT/YOUR_DB_APP

## Install dependencies
npm install

## Remove and Install : Meteor Bootstrap React
meteor npm install --save react-addons-pure-render-mixin
meteor add react-meteor-data
meteor add fourseven:scss
meteor add twbs:bootstrap
meteor npm install --save react-router react-router-dom
meteor npm install --save bcrypt
meteor add accounts-ui accounts-password
