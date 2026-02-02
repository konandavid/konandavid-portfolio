module.exports = function(eleventyConfig) {
  // Copy admin folder
  eleventyConfig.addPassthroughCopy("admin");
  
  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");
  
  // Copy uploads folder
  eleventyConfig.addPassthroughCopy("uploads");

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
