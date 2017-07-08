var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");


//app config
mongoose.connect("mongodb://localhost/thomas_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//mongoose config
var blogSchema = new mongoose.Schema({
    title: String,
    author: {type: String, default: "Thomas Draxler"},
    body: String,
    comments: [{body: String, date: {type: Date, default: Date.now}}],
    created: {type: Date, default: Date.now},
    hidden: {type: Boolean, default: false}
});
//compile schema model
var Blog = mongoose.model("Blog", blogSchema);

/*Blog.create({
    title: "Test Post",
    image: "http://i.imgur.com/WFRbVb.jpg",
    body: "Hello there! How are you today?"
})*/

//RESTFUL ROUTES


app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) console.log(err);
        else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.get("*", function(req, res) {
    res.render("notfound");
});

app.listen(3000, function() {
    console.log("Server is running!");
});