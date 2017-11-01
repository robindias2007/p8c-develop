class AddRankToCategory < ActiveRecord::Migration
  def change
  	add_column :categories, :rank, :integer
  	add_column :categories, :tag, :string
  end
end
