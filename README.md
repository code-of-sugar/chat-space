## DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null:false,unique: true|
|mail|string|null: false|

### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members
