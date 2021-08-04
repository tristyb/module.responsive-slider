# Tristan's Responsive Slider

This module uses [Glide Js](https://glidejs.com/) to make a responsive slider for your site.

# Development

Make sure you have npm installed and gulp installed globally.

```
npm install --global gulp-cli
```

Open a terminal and navigate to the root folder of this project and run

```
npm install
```

Go into the gulpfile and you'll find a variable called `copyLocation`. Copy this to the module folder in your development site if you want to benefit from constant updating.

Now you have three gulp commands at your disposal...

1. `gulp dev` - Will build the module and copy to your `copyLocation`.
2. `gulp build` - Build the module into a dist.zip in the dist folder.
3. `gulp` - Run gulp dev and then watch for changes, copying each time into your `copyLocation`.



