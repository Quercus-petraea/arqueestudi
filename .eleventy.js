module.exports = function(eleventyConfig) {
  // Copy CSS, JS, images
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");

  return {
    dir: {
      input: ".",      // Make sure you're using the root as input
      output: "_site", // Default output folder
    }
  };
};
