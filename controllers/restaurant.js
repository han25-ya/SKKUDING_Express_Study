const Restaurant = require('../models/restaurant');

exports.getRestaurants = (req, res, next) => {
  Restaurant.fetchAll(
    restaurants => {
    res.render('index', {
      content: restaurants,
      pageTitle: 'Home'
    });
  });
}

exports.getRestaurantByName = (req, res, next) => {
  const restaurantName = req.params.name;
  Restaurant.findByName(restaurantName, restaurant => {
    if (restaurant) {
      console.log(restaurant);
      res.render('index', {
        content: restaurant,
        pageTitle: restaurant.name
      });
    } else {
      res.status(404).render('404', { error: "해당 맛집 정보가 존재하지 않습니다." });
    }
  });
}

exports.getAddPost = (req, res, next) => {
  res.render('add', {
    editing: false
  });
};

exports.AddRestaurant = (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;

  const restaurant = new Restaurant(name, address, phone);
  Restaurant.findByName(name, existingRestaurant => {
    if (existingRestaurant) {
      res.status(404).render('404', { error: "이미 해당 맛집 정보가 존재합니다." });
    } else {
      restaurant.save();

      res.render('index', {
        content: {"name": name, "address": address, "phone": phone},
        pageTitle: restaurant.name
      });
    }});
  
};

exports.AddRestaurantPage = (req, res, next) => {
  res.render('add', {
    editing: false
   });
};

exports.deleteRestaurant = (req, res, next) => {
  const restaurantName = req.params.name;
  
  Restaurant.findByName(restaurantName, existingRestaurant => {
    if (!existingRestaurant) {
      res.status(404).render('404', { error: "이미 해당 맛집 정보가 존재하지 않습니다." });
    } else {
      Restaurant.deleteByName(restaurantName);
      res.render('index', {
        content: {"name": existingRestaurant.name, "address": existingRestaurant.address, "phone": existingRestaurant.phone}
      });
    }});
};

exports.editRestaurant = (req, res, next) => {
  const name = req.query.name;
  const address = req.query.address;
  const phone = req.query.phone;

  const restaurant = new Restaurant(name, address, phone);
  Restaurant.findByName(name, existingRestaurant => {
    if (!existingRestaurant) {
      res.status(404).render('404', { error: "이미 해당 맛집 정보가 존재하지 않습니다." });
    } else {
      restaurant.save();

      res.render('index', {
        content: {"name": name, "address": address, "phone": phone},
        pageTitle: restaurant.name
      });
    }});
}