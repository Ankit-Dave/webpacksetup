module.exports = {
  "root": {
    "src": "./src",
    "dest": "./build"
  },
  "tasks": {
    "js": {
      "src": "./",
      "dest": "js",
      "entries": {
        "common": ["babel-polyfill", "./modules/util/common.js"],
        "entry1": ["babel-polyfill", "./entry1.js"],
        "entry2": ["babel-polyfill", "./entry2.js"]
      },
      "babel": {
        "presets": ["es2015", "stage-2"],
        "plugins": []
      }
    }
  }
};