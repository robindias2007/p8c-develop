class AddCategoriesIdsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :categories_ids, :string, default: [].to_yaml
  end
end
