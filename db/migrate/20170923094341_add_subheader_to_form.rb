class AddSubheaderToForm < ActiveRecord::Migration
  def change
  	add_column :forms, :sub_header, :text
  end
end
