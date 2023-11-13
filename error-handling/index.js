module.exports = (app) => {
  app.use((req, res) => {
    // FOR WHEN THE PAGE IS NOT AVAILABLE
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res) => {
    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};
