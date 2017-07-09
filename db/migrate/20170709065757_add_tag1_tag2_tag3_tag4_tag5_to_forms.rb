class AddTag1Tag2Tag3Tag4Tag5ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :tag1, :string
    add_column :forms, :tag2, :string
    add_column :forms, :tag3, :string
    add_column :forms, :tag4, :string
    add_column :forms, :tag5, :string
  end
end
