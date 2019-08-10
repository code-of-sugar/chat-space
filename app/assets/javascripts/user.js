$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);  
  }

  function appendUserMember(id,name){
    var html = 
    `<div class='chat-group-user' id='chat-group-user-${ id }'>
      <input name='group[user_ids][]' type='hidden' value=${ id }>
      <p class='chat-group-user__name'>${ name }</p>
      <a class='user-search-remove chat-group-user__btn  chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`

    $('#js-group-user').append(html)
  }

  function appendNoUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    一致するユーザーが見つかりません
                  </p>
                </div>`
    search_list.append(html)
  }
  $('#user-search-field').on('keyup',function(e){
    e.preventDefault();
    var input = $(this).val();
    
    $.ajax({
      url: '/users',
      type: 'GET',
      data: {keyword : input},
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty()
      if (users.length !== 0 && input.length !== 0 ){  
        users.forEach(function(user){
          appendUser(user)
        });
      }else{
        appendNoUser()
      }
    })
    .fail(function(){
      alert('error')
    })
  })

  $('#user-search-result').on('click','.user-search-add',function(){
    var id = $(this).attr("data-user-id")
    var name = $(this).attr("data-user-name")
    $(this).parent().remove();
    appendUserMember(id, name);  
  })

  $('.js-remove-btn').on('click',function(){
    $(this).parent().remove();
  })
})