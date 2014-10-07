App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function(){
    // child routes
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
})

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function() {
      this.set('isEditing', true)
    },
    doneEditing: function() {
      this.set('isEditing', false)
    }
  }
});

var posts = [{
  id: '1',
  author: {
    name: 'kevin'
  },
  date: new Date('09-09-2014'),
  title: 'post numero uno',
  body: 'blah blah uno blah'
},{
  id: '2',
  author: {
    name: 'bob'
  },
  date: new Date('09-09-2014'),
  title: 'my time in the lodge',
  body: 'blah blah blah walk with me blah'
}]
