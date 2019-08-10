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
                       <p> ${message.body} </p>
                       ${image}
                     </div>
                 </div>`
    return html;
  }

  var buildMessageHTML = function(message){
    if (message.content && message.image.url){
      var html = `<div class="message-post__post", data-id="${message.id}">
                    <div class="message-post__upper-info">
                      <div class="message-post__upper-info--user-name">
                        ${message.user_name}
                      </div>
                      <div class="message-post__upper-info--time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-post__message">
                      <p> ${message.body} </p>
                      <img src="${message.image.url}">
                  </div>`
    }else if (message.content){
      var html = `<div class="message-post__post", data-id="${message.id}">
                    <div class="message-post__upper-info">
                      <div class="message-post__upper-info--user-name">
                        ${message.user_name}
                      </div>
                      <div class="message-post__upper-info--time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-post__message">
                      <p> ${message.body} </p>
                  </div>`
    }else if (message.image.url){
      var html = `<div class="message-post__post", data-id="${message.id}">
                    <div class="message-post__upper-info">
                      <div class="message-post__upper-info--user-name">
                        ${message.user.name}
                      </div>
                      <div class="message-post__upper-info--time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-post__message">
                      <img src="${message.image.url}">
                  </div>`
    }
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message-post__post:last').data('id')  
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: './api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
        insertHTML = buildMessageHTML(message)
      //メッセージが入ったHTMLを取得
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