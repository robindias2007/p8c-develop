class AddScoreAndWeightToForm < ActiveRecord::Migration
  def change
  	add_column :forms, :score, :float
  	add_column :forms, :extra_weight, :float
  end
end
