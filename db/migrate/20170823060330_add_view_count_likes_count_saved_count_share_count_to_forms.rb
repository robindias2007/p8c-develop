class AddViewCountLikesCountSavedCountShareCountToForms < ActiveRecord::Migration
  def change
    add_column :forms, :view_count, :integer
    add_column :forms, :likes_count, :integer
    add_column :forms, :saved_count, :integer
    add_column :forms, :share_count, :integer
  end
end
