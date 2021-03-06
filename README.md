## DB設計

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null:false,unique: true|
|mail|string|null: false,unique: true|

### Association
- has_many :groups, through: :group_users
- has_many :messages
- has_many :group_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

### Association
- has_many :users, through: :group_users
- has_many :messages
- has_many :group_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|references||null: false, foreign_key: true|
|user_id|references||null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group