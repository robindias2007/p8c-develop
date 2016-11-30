class AddTitle5ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :title5, :string
  end
end
