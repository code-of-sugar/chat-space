$(function(){
  function buildHTML(message){

    var image = message.image.url ? `<img src="${message.image.url}">` : ``

    var html =  `<div class="message-post__post">
                   <div class="message-post__upper-info">
                     <div class="message-post__upper-info--user-name">
                       ${message.user_name}
                     </div>
                     <div class="message-post__upper-info--time">
                       ${message.date}
                     </div>
                   </div>
                     <div class="message-post__message">
                       ${message.body}
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
})