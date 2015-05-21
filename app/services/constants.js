import Ember from 'ember';

var Constants = Ember.Service.extend({

  MEDIA: {
    'sm'    : '(max-width: 600px)',
    'gt-sm' : '(min-width: 600px)',
    'md'    : '(min-width: 600px) and (max-width: 960px)',
    'gt-md' : '(min-width: 960px)',
    'lg'    : '(min-width: 960px) and (max-width: 1200px)',
    'gt-lg' : '(min-width: 1200px)'
  },

  KEYCODE: {
    ENTER:          13,
    ESCAPE:         27,
    SPACE:          32,
    LEFT_ARROW:     37,
    UP_ARROW:       38,
    RIGHT_ARROW:    39,
    DOWN_ARROW:     40,
    TAB:            9
  }



});

export default Constants;
