class AddSlugAndSecureIdToForm < ActiveRecord::Migration
  def change
  	add_column :forms, :slug, :string
    add_index :forms, :slug, unique: true
    add_column :forms, :secure_id, :string
    add_index :forms, :secure_id, unique: true
  end
end
