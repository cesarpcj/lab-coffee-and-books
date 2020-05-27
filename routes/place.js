const { Router } = require("express");
const router = Router();
const Place = require("./../models/place");

router.get("create", (req, res, next) => {
  res.render("/create");
});

router.post("create", (req, res, next) => {
  const { name, type, lng, lat } = req.body;
  Place.create({
    name,
    type,
    location: {
      coordinates: [lng, lat],
    },
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get(":placeId/edit", (req, res, next) => {
  Place.findById(req.params.placeId)
    .then((place) => {
      res.render("/edit", { place });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(":placeId/edit", (req, res, next) => {
  const { name, type, lng, lat } = req.body;
  Place.findByIdAndUpdate(req.params.placeId, {
    name,
    type,
    location: {
      coordinates: [lng, lat],
    },
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.post(":placeId/delete", (req, res, next) => {
  Place.findByIdAndRemove(req.params.placeId)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});
