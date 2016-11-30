class AddTitle1Title2Title3Title4Url4Url5ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :title1, :string
    add_column :forms, :title2, :string
    add_column :forms, :title3, :string
    add_column :forms, :titel4, :string
    add_column :forms, :url4, :string
    add_column :forms, :url5, :string
  end
end
