class AddImage2Image3Image4Image5ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :image2, :string
    add_column :forms, :image3, :string
    add_column :forms, :image4, :string
    add_column :forms, :image5, :string
  end
end
