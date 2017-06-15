class RemoveColumnNameFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :fname, :string
    remove_column :users, :lname, :string
  end
end
