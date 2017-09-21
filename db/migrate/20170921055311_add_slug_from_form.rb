class AddSlugFromForm < ActiveRecord::Migration
  def change
  	add_column :forms, :slug, :string
  end
end
