class AddCategoryNameToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :category_name, :string
  end
end
