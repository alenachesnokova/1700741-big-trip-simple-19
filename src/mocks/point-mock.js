import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    'base_price': 1100,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': {
      'id': 1,
      'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      'name': 'Chamonix',
      'pictures': [
        {
          'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
          'description': 'Chamonix parliament building'
        }
      ]
    },
    'id': '0',
    'offers': {
      'id': 1,
      'title': 'Upgrade to a business class',
      'price': 120
    },
    'type': 'taxi'
  },

  {
    'base_price': 500,
    'date_from': '2019-10-10T22:55:56.845Z',
    'date_to': '2019-10-11T11:22:13.375Z',
    'destination': {
      'id': 2,
      'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      'name': 'GENEVA',
      'pictures': [
        {
          'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
          'description': 'GENEVA parliament building'
        }
      ]
    },
    'id': '1',
    'offers': {
      'id': 2,
      'title': 'Upgrade to a business class',
      'price': 160
    },
    'type': 'Flight'
  },

  {
    'base_price': 200,
    'date_from': '2019-10-10T22:55:56.845Z',
    'date_to': '2019-10-11T11:22:13.375Z',
    'destination': {
      'id': 1,
      'description': ' is a city in Switzerland that lies at the southern tip of expansive Lac Léman.',
      'name': 'Amsterdam',
      'pictures': [
        {
          'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
          'description': 'Amsterdam parliament building'
        }
      ]
    },
    'id': '2',
    'offers': {
      'id': 3,
      'title': ' Add luggage +€  50',
      'price': 250
    },
    'type': 'Drive'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
