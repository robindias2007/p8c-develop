class AddImage1ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :image1, :string
  end
end
