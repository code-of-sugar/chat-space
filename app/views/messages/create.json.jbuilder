json.user_name @message.user.name
json.body @message.body
json.image @message.image
json.date @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
json.id @message.id