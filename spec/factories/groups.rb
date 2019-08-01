FactoryBot.define do
  fatory :group do
    name {Faker::Team.name}
  end
end
