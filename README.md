## DB設計

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null:false,unique: true|
|mail|string|null: false|

### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members
