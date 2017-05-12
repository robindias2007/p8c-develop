class AddContent2Content3Content4Content5ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :content2, :string
    add_column :forms, :content3, :string
    add_column :forms, :content4, :string
    add_column :forms, :content5, :string
  end
end
