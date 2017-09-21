class RemoveSlugFromForm < ActiveRecord::Migration
 def change
    remove_column :forms, :slug
  end
end
