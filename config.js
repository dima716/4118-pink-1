module.exports = {
  src: {
    html: "./*.html",
    precss: "./postcss/style.css",
    js: "./js/*.js",
    img: "./img/**/*.{png,jpg,svg}",
    fonts: "./fonts/**/*.{woff,woff2}"
  },
  watch: {
    precss: "./postcss/**/*.css"
  },
  build: {
    js: "./build/js",
    css: "./build/css",
    img: "./build/img",
    fonts: "./build/fonts",
  },
  dest: "./build"
};
