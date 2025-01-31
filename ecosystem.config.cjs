module.exports = {
  apps: [{
    name: "Snorkel",
    script: "./dist/snorkel.js",
    cwd: "./",
    time: true,
    log: true,
    node_args: "--env-file=.env"
  }]
}
