const express = require('express');
const Cafe = require('../models/Cafe.js');
const Hotel = require('../models/Hotel.js');
const Location = require('../models/Location.js');
const Pharmacie = require('../models/Pharmacie.js');
const Restaurant = require('../models/Restaurant.js');
const TravelAgencie = require('../models/TravelAgencie.js');
const AllPosts = require('../models/AllPosts.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

const { uploadFileToS3, upload } = require('./upload.js')
const router = express.Router();


const ObjectId = mongoose.Types.ObjectId;




const models = {
  cafe: Cafe,
  allposts: AllPosts,
  hotel: Hotel,
  location: Location,
  pharmacie: Pharmacie,
  restaurant: Restaurant,
  travelagencie: TravelAgencie,
  user: User
};

router.post(`/api/v1/:modelType`, upload.array('photo', 6), async (req, res) => {

  try {
    const Model = models[req.params.modelType];
    var entity = new Model(req.body);

    // Upload each file to S3 and get the URL
    const uploadedImages = await Promise.all(
      req.files.map(file => uploadFileToS3(file))
    );

    for (var i = 0; i < uploadedImages.length; i++) {
      entity.photo.push(uploadedImages[i]);
    }

    const savedEntity = await entity.save();

    try {
      var post = new AllPosts(
        {
          posts: {
            postid: new ObjectId(savedEntity._id),
            name: savedEntity.name,
            title: savedEntity.title,
            photo: savedEntity.photo[0],
            category: savedEntity.category,
            subcategory: savedEntity.subcategory,
          }
        }
      )
      // console.log(post)
      const posta = await post.save();
      // console.log(posta)
      res.json(savedEntity);
    } catch (updateError) {
      console.error('Error updating AllPosts:', updateError);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (saveError) {
    console.error('Error saving entity:', saveError);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an entity by ID
router.put(`/api/v1/:modelType/:id`, async (req, res) => {
  try {
    const Model = models[req.params.modelType];
    const entity = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entity) {
      return res.status(404).send();
    }
    //   const post = await AllPosts.findOne({
    //     "posts.postid" : entity._id
    //  });
    // const post = await AllPosts.find({postid: ObjectId(entity._id)});
    const post = await AllPosts.findOneAndUpdate({
      "posts.postid": entity._id
    },
      {
        $set: {
          "posts.$.postid": entity._id,
          "posts.$.name": entity.name,
          "posts.$.title": entity.title,
          "posts.$.photo": entity.photo[0],
          "posts.$.category": entity.category,
          "posts.$.subcategory": entity.subcategory,
        }
      },
      { new: true }

    );
    console.log(post)
    // res.json(post);
    res.send(entity);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

// Delete an entity by ID
router.delete(`/api/v1/:modelType/:id`, async (req, res) => {
  try {
    const Model = models[req.params.modelType];
    const entity = await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Successfully deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete',
    });
  }
});

// Get single item by ID
router.get(`/api/v1/:modelType/:id`, async (req, res) => {
  const Model = models[req.params.modelType];
  if (!Model) return res.status(400).send('Invalid model');

  try {
    const item = await Model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    var entity = item
    if (item.photo[0].length < 20) {
      { entity.image ? entity.image : entity.image = 'https://analytikas-images-buckets.s3.us-east-1.amazonaws.com/1727239327842_ADB.png' }
    }
    else {
      entity.image = item.photo[0] || 'https://analytikas-images-buckets.s3.us-east-1.amazonaws.com/1727239327842_ADB.png'
    }
    console.log(entity)
    res.status(200).json({ success: true, message: 'Successful', data: entity });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found lee' });
  }
});

// Get all items with pagination
router.get(`/api/v1/:modelType`, async (req, res) => {
  const Model = models[req.params.modelType];
  if (!Model) return res.status(400).send('Invalid model');

  const page = parseInt(req.query.page) || 0;
  const limit = 108;

  try {
    const items = await Model.find({})
      .skip(page * limit)
      .limit(limit)
      .sort({ age: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      message: 'Successful',
      data: items,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found lelo' });
  }
});

// Get items by search
router.get(`/api/v1/:modelType/search/search`, async (req, res) => {
  const Model = models[req.query.type];
  if (!Model) return res.status(400).send('Invalid model');

  const city = new RegExp(req.query.city, 'i');
  const name = new RegExp(req.query.name, 'i');
  const type = new RegExp(req.query.type, 'i');

  try {
    const items = await Model.find({ city, name, type })
      .sort({ age: -1 });

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: items,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Not found lolol' });
  }
});

// Get recommended locations
router.get(`/api/v1/:modelType/search/recommended`, async (req, res) => {
  try {
    const Model = models[req.params.modelType];
    console.log(Model)
    const recommandations = await Model.find({ recommended: true })
      .sort({ age: -1 });
    // const locations = await Location.find({ recommended: true });

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: recommandations,
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({ success: false, message: 'Not found lelele' });
  }
});

// Get item count
router.get(`/api/v1/:modelType/search/count`, async (req, res) => {
  const Model = models[req.params.modelType];
  if (!Model) return res.status(400).send('Invalid model');

  try {
    const itemCount = await Model.estimatedDocumentCount();
    res.status(200).json({ success: true, data: itemCount });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch' });
  }
});

module.exports = router;
