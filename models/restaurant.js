const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename), 
  'data', 
  'restaurant.json'
);


const getRestaurantsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Restaurant {
  constructor(name, address, phone) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }

  
  save() {

    // 파일에 저장한 데이터를 가져오는 코드 (데이터 베이스x)
    getRestaurantsFromFile(Restaurants => {
        const existingIndex = Restaurants.findIndex(restaurant => restaurant.name === this.name);
        if(existingIndex === -1) {
           Restaurants.push(this);
        fs.writeFile(p, JSON.stringify(Restaurants), err => {
          console.log(err);
        }); 
      }  else {
        const updatedRestaurants = [...Restaurants];
        updatedRestaurants[existingIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedRestaurants), err => {
          console.log(err);
        }); 
        }
        
      });
    
      
  }

  static deleteByName(name) {
    // 파일에 저장한 데이터를 삭제하는 코드 (데이터 베이스x)
    getRestaurantsFromFile(Restaurants => {
      const Restaurant = Restaurants.find(p => p.name === name);
      const updatedRestaurants = Restaurants.filter(p => p.name !== name);
      fs.writeFile(p, JSON.stringify(updatedRestaurants), err => {
        console.log("err");
      });
    });
  }

  static fetchAll(cb) {
  //   파일에 저장한 데이터를 가져오는 코드 (데이터 베이스x)
    getRestaurantsFromFile(cb);
  }

  static findByName(name, cb) {
    getRestaurantsFromFile(restaurants => {
      const restaurant = restaurants.find(p => p.name === name);
      cb(restaurant);
    });
  }

  static findById(id) {
    // 데이터베이스에서 특정 아이디의 포스트를 가져오는 코드
    return db.execute('SELECT * FROM posts WHERE posts.id = ?', [id]);
  }
};