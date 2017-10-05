class AddMostPopularToForms < ActiveRecord::Migration
  def change
    add_column :forms, :most_popular, :boolean
  end
end
