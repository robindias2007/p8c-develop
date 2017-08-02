class AddCategoryIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :category_id, :integer, array: true, default: []
  end
end
