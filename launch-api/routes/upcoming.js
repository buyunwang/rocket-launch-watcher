var express = require("express");
var router = express.Router();
const fetch = require("isomorphic-fetch");

router.get("/:n", async function(req, res, next) {
  const d = await fetch(
    "http://launchlibrary.net/1.4/launch/next/" + req.params.n
  );
  const data = await d.json();
  let respond = {
    launches: [],
    count: data.count,
  };
  for (let i = 0; i < data.count; i++) {
    let launch = data.launches[i];
    let item = {
      name: launch.name,
      rocket: {
        name: launch.rocket.name,
        link: launch.rocket.wikiURL
      },
      agency: {
        name: launch.lsp.name,
        link: launch.lsp.wikiURL
      },
      location: launch.location.name,
      time: launch.isonet,
      links: launch.vidURLs
    };
    respond.launches.push(item);
  }
  res.json(respond);
});

module.exports = router;
