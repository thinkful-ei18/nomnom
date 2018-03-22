'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSpies = require('chai-spies');
const expect = chai.expect;

const mongoose = require('mongoose');
const { TEST_MONGODB_URI } = require('../config');
const Recipe = require('../models/recipe');

chai.use(chaiHttp);
chai.use(chaiSpies);

const User = require('../models/user');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const username = 'exampleUser';
const password = 'examplePass';
let id;
let token;
let seedRecipes;

describe('Before and After hooks', function() {
  before(function() {
    return mongoose.connect(TEST_MONGODB_URI, { autoIndex: false });
  });

  beforeEach(function() {
    return User.hashPassword(password)
      .then(digest => User.create({ username, password: digest }))
      .then(user => {
        id = user.id;
        token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
        seedRecipes = [
          {
            ingredients: [
              '4 cups fresh blueberries',
              '3/4 cup white sugar',
              '3 tablespoons cornstarch',
              '1 tablespoon butter',
              '1/2 teaspoon ground cinnamon'
            ],
            directions: [
              'Preheat oven to 425 degrees F (220 degrees C).',
              'Mix sugar, cornstarch, salt, and cinnamon, and sprinkle over blueberries.',
              'Line pie dish with one pie crust. Pour berry mixture into the crust, and dot with butter. Cut remaining pastry into 1/2 - 3/4 inch wide strips, and make lattice top. Crimp and flute edges.',
              'Bake pie on lower shelf of oven for about 50 minutes, or until crust is golden brown.'
            ],
            created: '2018-03-20T17:59:00.736Z',
            title: 'Blueberry Pie',
            image:
              'https://www.drweil.com/wp-content/uploads/2016/12/diet-nutrition_recipes_blueberry-pie_3872x2592_000050543646-1024x768.jpg',
            prepTime: 20,
            cookTime: 40,
            userId: id,
            username: 'exampleUser',
            _id: '000000000000000000000001'
          },
          {
            ingredients: [
              '1 pinch salt',
              '5 apples - peeled, cored and sliced',
              '1 pastry for double-crust pie (see footnote for recipe link)',
              '6 tablespoons unsalted butter'
            ],
            directions: [
              'Preheat oven to 425 degrees F (220 degrees C).',
              'Combine butter, white sugar, brown sugar, water, cinnamon, and salt in a saucepan over medium heat. Bring to a boil, remove from heat and set aside.',
              'Roll out half the pastry to fit a 9-inch pie plate. Place bottom crust in pie plate; pour in apple slices.',
              'Roll out top crust into a 10-inch circle. Cut into 8 (1-inch) wide strips with a sharp paring knife or pastry wheel. Weave the pastry strips, one at a time, into a lattice pattern. Fold the ends of the lattice strips under the edge of the bottom crust and crimp to seal.'
            ],
            created: '2018-03-20T21:10:54.969Z',
            title: 'Apple Pie',
            image:
              'https://prods3.imgix.net/images/articles/2016_10/Non-Feature-Instagram-Pie-Crust.jpg',
            prepTime: 30,
            cookTime: 50,
            userId: id,
            username: 'exampleUser'
          },
          {
            ingredients: [
              '1/2 teaspoon ground ginger',
              '1/2 teaspoon ground nutmeg',
              '1/2 teaspoon ground nutmeg',
              '1 (15 ounce) can pumpkin'
            ],
            directions: [
              'Preheat oven to 425 degrees F. Whisk pumpkin, sweetened condensed milk, eggs, spices and salt in medium bowl until smooth. Pour into crust. Bake 15 minutes.',
              'Reduce oven temperature to 350 degrees F and continue baking 35 to 40 minutes or until knife inserted 1 inch from crust comes out clean. Cool. Garnish as desired. Store leftovers covered in refrigerator.'
            ],
            created: '2018-03-20T21:22:38.732Z',
            title: 'Pumpkin Pie',
            image:
              'https://www.simplyrecipes.com/wp-content/uploads/2014/11/pumpkin-pie-method-6-600x400.jpg',
            prepTime: 20,
            cookTime: 40,
            userId: id,
            username: 'exampleUser'
          }
        ];
      })
      .then(() => Recipe.insertMany(seedRecipes))
      .then(() => Recipe.ensureIndexes());
  });

  afterEach(function() {
    return mongoose.connection.db.dropDatabase();
  });

  after(function() {
    return mongoose.disconnect();
  });

  describe('GET /recipes', function() {
    it('should return the correct number of recipes', function() {
      const dbPromise = Recipe.find();
      const apiPromise = chai
        .request(app)
        .get('/api/recipes')
        .set('Authorization', `Bearer ${token}`);

      // 2) Wait for both promises to resolve using `Promise.all`
      return (
        Promise.all([dbPromise, apiPromise])
          // 3) **then** compare database results to API response
          .then(([data, res]) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body).to.have.length(data.length);
          })
      );
    });

    it('should find result by search term', function() {
      const search = 'pie';
      return chai
        .request(app)
        .get(`/api/recipes/?searchTerm=${search}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res.body).to.have.length(3);
        });
    });
  });

  describe('GET /api/recipes/:id', function() {
    it('should return the correct recipe', function() {
      let data;
      return Recipe.findOne()
        .select('id title content')
        .then(_data => {
          data = _data;
          return chai
            .request(app)
            .get(`/api/recipes/${data.id}`)
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            'id',
            'title',
            'ingredients',
            'directions',
            'cookTime',
            'created',
            'image',
            'prepTime',
            'userId',
            'username'
          );
          expect(res.body.id).to.equal(data.id);
          expect(res.body.title).to.equal(data.title);
          expect(res.body.content).to.equal(data.content);
        });
    });
  });

  describe('POST /api/recipes', function() {
    it('should create and return a new recipe when provided with valid data', function() {
      const newItem = {
        ingredients: [
          '4 cups fresh blueberries',
          '3/4 cup white sugar',
          '3 tablespoons cornstarch',
          '1 tablespoon butter',
          '1/2 teaspoon ground cinnamon'
        ],
        directions: [
          'Preheat oven to 425 degrees F (220 degrees C).',
          'Mix sugar, cornstarch, salt, and cinnamon, and sprinkle over blueberries.',
          'Line pie dish with one pie crust. Pour berry mixture into the crust, and dot with butter. Cut remaining pastry into 1/2 - 3/4 inch wide strips, and make lattice top. Crimp and flute edges.',
          'Bake pie on lower shelf of oven for about 50 minutes, or until crust is golden brown.'
        ],
        title: 'Blueberry Pie Pie',
        image:
          'https://www.drweil.com/wp-content/uploads/2016/12/diet-nutrition_recipes_blueberry-pie_3872x2592_000050543646-1024x768.jpg',
        prepTime: 20,
        cookTime: 40,
        userId: id
      };
      let body;
      return (
        chai
          .request(app)
          .post('/api/recipes')
          .send(newItem)
          .set('Authorization', `Bearer ${token}`)
          .then(function(res) {
            body = res.body;
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(body).to.be.a('object');
            expect(body).to.include.keys('title', 'cookTime', 'userId');
            return Recipe.findById(body.id);
          })
          // 3) **then** compare
          .then(data => {
            expect(body.title).to.equal(data.title);
            expect(body.image).to.equal(data.image);
          })
      );
    });

    it('should return an error when missing "title" field', function() {
      const newItem = {
        content: 'bar'
      };
      const spy = chai.spy();
      return chai
        .request(app)
        .post('/api/recipes')
        .send(newItem)
        .set('Authorization', `Bearer ${token}`)
        .then(spy)
        .then(() => {
          expect(spy).to.not.have.been.called();
        })
        .catch(err => {
          const res = err.response;
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `title` in request body');
        });
    });
  });

  describe('GET /api/recipes/:badId', function() {
    it('should respond with a 400 for improperly formatted id', function() {
      const badId = '99-99-99';
      const spy = chai.spy();
      return chai
        .request(app)
        .get(`/api/recipes/${badId}`)
        .set('Authorization', `Bearer ${token}`)
        .then(spy)
        .then(() => {
          expect(spy).to.not.have.been.called();
        })
        .catch(err => {
          const res = err.response;
          expect(res).to.have.status(400);
          expect(res.body.message).to.eq(`${badId} is not a valid ID`);
        });
    });
  });

  describe('PUT /api/recipes/:id', function() {
    it('should update the recipe', function() {
      let body;
      const updateItem = {
        id: '000000000000000000000001',
        title: 'What about dogs?!',
        prepTime: 5
      };
      return chai
        .request(app)
        .put('/api/recipes/000000000000000000000001')
        .send(updateItem)
        .set('Authorization', `Bearer ${token}`)
        .then(function(res) {
          body = res.body;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'title', 'prepTime');
          return Recipe.findById(body.id);
        })
        .then(data => {
          expect(body.title).to.equal(data.title);
          expect(body.prepTime).to.equal(data.prepTime);
          expect(body.id).to.equal(data.id);
        });
    });

    it('should return an error when not provided with a matching id', function() {
      const updateItem = {
        id: '000000000000000000000000',
        title: 'What about dogs?!',
        content: 'woof woof'
      };
      const id = '000000000000000000000001';
      return chai
        .request(app)
        .put(`/api/recipes/${id}`)
        .send(updateItem)
        .set('Authorization', `Bearer ${token}`)
        .catch(function(res) {
          expect(res).to.have.status(400);
          expect(res).to.be.a('error');
          expect(res.response.body.message).to.equal(
            'Params id and body id must match'
          );
        });
    });

    it('should return an error when param id is invalid', function() {
      const updateItem = {
        id: '000000000000000000000000',
        title: 'What about dogs?!',
        content: 'woof woof'
      };
      const id = '000000000000000000000001dededededed';
      return chai
        .request(app)
        .put(`/api/recipes/${id}`)
        .send(updateItem)
        .set('Authorization', `Bearer ${token}`)
        .catch(function(res) {
          expect(res).to.have.status(400);
          expect(res).to.be.a('error');
          expect(res.response.body.message).to.equal(`${id} is not a valid ID`);
        });
    });
  });

  describe('DELETE /api/recipes', function() {
    it('should permanently delete a recipe', function() {
      return chai
        .request(app)
        .delete('/api/recipes/000000000000000000000001')
        .set('Authorization', `Bearer ${token}`)
        .then(function(res) {
          expect(res).to.have.status(204);
          return Recipe.findById('000000000000000000000001');
        })
        .then(data => {
          expect(data).to.be.null;
        });
    });
  });
});
