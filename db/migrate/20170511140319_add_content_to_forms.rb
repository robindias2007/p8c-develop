class AddContentToForms < ActiveRecord::Migration
  def change
    add_column :forms, :content, :string
  end
end
