class AddUnspecifiedEasyInvolvedAdvancedToForms < ActiveRecord::Migration
  def change
    add_column :forms, :unspecified, :boolean
    add_column :forms, :easy, :boolean
    add_column :forms, :involved, :boolean
    add_column :forms, :advanced, :boolean
  end
end
