const express = require("express");
const router = express.Router();
const Joi = require("joi");

const parcels = [
  {
    id: 1,
    category: "50-100kg",
    price: 0,
    pickuploc: "kigali",
    destination: "new york",
    receiver: "gloria",
    re_email: "murediana@gmail.com",
    re_phoneno: "+250782798310",
    status: "pending"
  },
  {
    id: 2,
    category: "50-100kg",
    price: 0,
    pickuploc: "kigali",
    destination: "new york",
    receiver: "gloria",
    re_email: "murediana@gmail.com",
    re_phoneno: "+250782798310",
    status: "In transit"
  },
  {
    id: 3,
    category: "50-100kg",
    price: "$100",
    pickuploc: "kigali",
    destination: "new york",
    receiver: "gloria",
    re_email: "murediana@gmail.com",
    re_phoneno: "+250782798310",
    status: "delivered"
  }
];

router.put("/:id", function(req, res) {
  let parcel = parcels.find(p => p.id === parseInt(req.params.id));
  if (!parcel)
    res.status(404).send("the parcels with a given id doesnot exist");
  const { error } = validateParcel(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  parcel.status = req.body.status;
  res.send(parcel);
});

router.get("/", function(req, res) {
  res.send(parcels);
});
router.get("/:id", function(req, res) {
  let parcel = parcels.find(p => p.id === parseInt(req.params.id));
  if (!parcel)
    res.status(404).send("the parcels with a given id doesnot exist");
  res.send(parcel);
});
router.post("/", function(req, res) {
  const { error } = validateParcel(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let parcel = {
    id: parcels.length + 1,
    category: req.body.category,
    price: req.body.price,
    pickuploc: req.body.pickuploc,
    destination: req.body.destination,
    receiver: req.body.receiver,
    re_email: req.body.re_email,
    re_phoneno: req.body.re_phoneno,
    status: req.body.status
  };
  parcels.push(parcel);
  res.send(parcel);
});
function validateParcel(parcel) {
  const schema = {
    category: Joi.string()
      .min(4)
      .required(),
    price: Joi.number()
      .min(1)
      .required(),
    pickuploc: Joi.string()
      .min(4)
      .required(),
    destination: Joi.string()
      .min(4)
      .required(),
    receiver: Joi.string()
      .min(3)
      .required(),
    re_email: Joi.string()
      .min(4)
      .required(),
    re_phoneno: Joi.string()
      .min(4)
      .required(),
    status: Joi.string()
      .min(4)
      .required()
  };
  return Joi.validate(parcel, schema);
}
module.exports = router;
