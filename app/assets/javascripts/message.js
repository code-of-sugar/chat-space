$(function(){
  function buildHTML(message){

    var image = message.image.url ? `<img src="${message.image.url}">` : ``

    var html =  `<div class="message-post__post", data-id="${message.id}">
                   <div class="message-post__upper-info">
                     <div class="message-post__upper-info--user-name">
                       ${message.user_name}
                     </div>
                     <div class="message-post__upper-info--time">
                       ${message.date}
                     </div>
                   </div>
                     <div class="message-post__message">
                       <p> ${message.body} </p>
                       ${image}
                     </div>
                 </div>`
    return html;
  }



  
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData($('form#new_message').get(0));
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-post__messages').append(html)
      $('.message-post__box').animate({scrollTop: $('.message-post__box').get(0).scrollHeight}, 'fast');
      $('#new_message')[0].reset();
      $('.form__send-btn').prop('disabled',false);
    })
    .fail(function(){
      alert('error')
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message-post__post:last').data('id')  
    $.ajax({
      url: './api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.message-post__messages').append(insertHTML)    
      })
      $('.message-post__box').animate({scrollTop: $('.message-post__box').get(0).scrollHeight}, 'fast');
    })
    .fail(function() {
      console.log('error');
    });
  };
   $(function() {
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        setInterval(reloadMessages, 5000);
      }
    });
});