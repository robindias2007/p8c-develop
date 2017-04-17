class AddReadtimeToForms < ActiveRecord::Migration
  def change
    add_column :forms, :readtime, :string
  end
end
