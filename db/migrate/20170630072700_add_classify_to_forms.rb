class AddClassifyToForms < ActiveRecord::Migration
  def change
    add_column :forms, :classify, :string
  end
end
