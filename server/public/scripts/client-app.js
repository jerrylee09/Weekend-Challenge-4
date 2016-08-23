$(document).ready(function() {
	// append post!
  $('#add_button').on('click', postlist);
  $('#list-form').on('click', '.update', putList);
  $('#list-form').on('click', '.delete', deletelist);

});

getList();

function postlist() {
  event.preventDefault();

  var list = {};

  $.each($('#list-form').serializeArray(), function (i, field) {
        list[field.name] = field.value;
      });

  console.log('list: ', list);

  $.ajax({
      type: 'POST',
      url: '/list',
      data: list,
      success: function () {
          console.log('POST /lists works!');
          $('.list-input').empty();
           getList();
        },

      error: function (response) {
          console.log('POST /lists does not work...');
        },
    });
}

function getList(statuscomplete) {
  var url = '/list';
    if (statuscomplete) {
        url += '/' + statuscomplete;
    }
  $.ajax({
    type: 'GET',
    url: url,
    success: function(list) {
      list.forEach(function(list) {
        var color = "";

        var $el = $('<div class="col-md-6"></div>');
        var listProperties = ['to_do_list', 'status'];
        listProperties.forEach(function (property) {
          if (list.status == 'complete'){
            color = 'green';
          } else {
            color = 'red';
          }
          var $input = $('<input  class="form-control ' + color + '" type="text" id="' + property + '"name="' + property + '" />');
                    $input.val(list[property]);
                    $el.append($input);
        });
        $el.data('listId', list.id);
        $el.append('<button class="update btn btn-default">Update</button>');
        $el.append('<button class="delete btn btn-default">Delete</button>');
        $('.list-input').append($el);

      });
      console.log('getPost is success!!');

    },
    error: function() {
      console.log('GETPOST has fail!! TRY AGAIN!');
    }
  });
}



function putList() {

  var list = {}
  var inputs = $(this).parent().children().serializeArray();
  $.each(inputs, function(i, field){
    list[field.name] = field.value;
  });
  console.log('the listing inputting!!', list);
  var listid = $(this).parent().data('listId');
  $.ajax({
    type: 'PUT', 
    url: '/list/' + listId,
    data: list,
    success: function(){
      $('.list-input').empty();
      getList();

      console.log('Update has been success!!');
    },
    error: function() {
      console.log(' Error PUT /list/' + listId);
    }
  });
}

function deletelist() {
  var listId = $(this).parent().data('listId');
console.log('delete has been click');
  $.ajax({
    type: 'DELETE',
    url: '/list/' + listId,
    success: function () {
      console.log('DELETE success');
      $('.list-input').empty();
      getList();
    },
    error: function () {
      console.log('DELETE failed');
    }
  });
}























