const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");

  // Shortcode for general responsive images (with srcset)
  eleventyConfig.addNunjucksShortcode("responsive_image", (folder, baseName, altText, ratioClass = "", imgClass, loading = "lazy") => {
    const inputDir = path.join(__dirname, "images", "web", folder);
    const widths = [600, 800, 1200, 1600];

    const availableWidths = widths.filter(width => {
      const filePath = path.join(inputDir, `${baseName}-${width}.jpg`);
      return fs.existsSync(filePath);
    });

    if (availableWidths.length === 0) {
      return `<img alt="${altText}" />`;
    }

    const srcset = availableWidths
      .map(w => `/images/web/${folder}/${baseName}-${w}.jpg ${w}w`)
      .join(",\n            ");

    const smallestWidth = Math.min(...availableWidths);

    const wrapperStart = ratioClass ? `<div class="${ratioClass}">` : "";
    const wrapperEnd = ratioClass ? `</div>` : "";
    const finalImgClass = ratioClass ? "w-100 h-100 object-fit-cover" : "img-fluid";

    return `
      ${wrapperStart}
        <img
          class="${finalImgClass}"
          src="/images/web/${folder}/${baseName}-${smallestWidth}.jpg"
          srcset="
            ${srcset}
          "
          sizes="(max-width: 600px) 600px,
                 (max-width: 900px) 800px,
                 (max-width: 1200px) 1200px,
                 1600px"
          alt="${altText}"
          loading="${loading}"
        />
      ${wrapperEnd}
    `;
  });

  // Shortcode for hero image (no srcset, forces large image)
  eleventyConfig.addNunjucksShortcode("responsive_image_hero", (folder, baseName, altText, imgClass = "") => {
    const widths = [1600, 1200, 800, 600];
    let selectedSrc = "";

    for (const width of widths) {
      const fullPath = path.join(__dirname, "images", "web", folder, `${baseName}-${width}.jpg`);
      if (fs.existsSync(fullPath)) {
        selectedSrc = `/images/web/${folder}/${baseName}-${width}.jpg`;
        break;
      }
    }

    if (!selectedSrc) {
      return `<img alt="${altText}" />`;
    }

    // Force full width and height, overriding Bootstrap's img-fluid height:auto
    const finalClass = `${imgClass} w-100 h-100 object-fit-cover`.trim();

    return `
      <div style="width: 100vw; height: 100vh; overflow: hidden;">
        <img
          class="${finalClass}"
          src="${selectedSrc}"
          alt="${altText}"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      </div>
    `;
  });

  // Masonry images
  eleventyConfig.addNunjucksShortcode("responsive_image_masonry", (
    baseName,
    altText,
    ratioClass = "",
    imgClass = "",
    loading = "eager"
  ) => {
    const folder = "masonry";
    const inputDir = path.join(__dirname, "images", "web", folder);
    const widths = [600, 800, 1200, 1600];

    const availableWidths = widths.filter(width => {
      const filePath = path.join(inputDir, `${baseName}-${width}.jpg`);
      return fs.existsSync(filePath);
    });

    if (availableWidths.length === 0) {
      return `<img alt="${altText}" />`;
    }

    const srcset = availableWidths
      .map(w => `/images/web/${folder}/${baseName}-${w}.jpg ${w}w`)
      .join(",\n            ");

    const smallestWidth = Math.min(...availableWidths);

    const wrapperStart = ratioClass ? `<div class="${ratioClass}">` : "";
    const wrapperEnd = ratioClass ? `</div>` : "";

    const finalImgClass = ratioClass
      ? "w-100 h-100 object-fit-cover"
      : (imgClass || "img-fluid");

    return `
      ${wrapperStart}
        <img
          class="${finalImgClass}"
          src="/images/web/${folder}/${baseName}-${smallestWidth}.jpg"
          srcset="
            ${srcset}
          "
          sizes="(max-width: 600px) 600px,
                (max-width: 900px) 800px,
                (max-width: 1200px) 1200px,
                1600px"
          alt="${altText}"
          loading="${loading}"
        />
      ${wrapperEnd}
    `;
  });



  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
