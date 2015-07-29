Package.describe({
  name: "deanius:bound",
  summary: "Allow `console.bound.log` as an alternative to `console.log.bind(console)`, for example.",
  version: "0.1.0",
  git: "https://github.com/deanius/meteor-bound",
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["meteor", "underscore"]);

  api.addFiles("shared/index.js", ["client", "server"]);
});

Package.onTest(function (api) {
  api.use(["mike:mocha-package", "practicalmeteor:chai"]);
  api.use("coffeescript");
  api.use("deanius:bound");

  api.addFiles("tests/shared/index.coffee", ["client", "server"]);
});
