module.exports = function(eleventyConfig) {
  // Copy admin folder
  eleventyConfig.addPassthroughCopy("admin");
  
  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");
  
  // Copy uploads folder
  eleventyConfig.addPassthroughCopy("uploads");
  
  // Copy robots.txt for SEO
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Netlify Image CDN: resize + compress our own uploads on the fly (external URLs are left as they are)
  eleventyConfig.addFilter("cdn", function(src, width) {
    if (!src || typeof src !== "string" || !src.startsWith("/uploads/") || /\.(svg|gif|mp4)$/i.test(src)) return src;
    return "/.netlify/images?url=" + encodeURIComponent(src) + "&w=" + (width || 1200);
  });

  // Create collection from projects
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/projects/*.md").sort((a, b) => {
      return (a.data.order || 99) - (b.data.order || 99);
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
