class AddWeightageToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :weightage, :integer
  end
end
