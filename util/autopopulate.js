// Middleware function ensures that the specified field is populated with the referenced documents before a find query is executed

module.exports = (field) => function (next) {
    //function will populate the specified field with the referenced documents before the find query is executed. 
    this.populate(field);
    //next parameter is a callback function that signals to the Mongoose middleware that it has finished executing, 
    // and that the next middleware in the chain can be executed.
    next();
};