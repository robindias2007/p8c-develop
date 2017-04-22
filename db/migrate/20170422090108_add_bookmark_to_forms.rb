class AddBookmarkToForms < ActiveRecord::Migration
  def change
    add_column :forms, :bookmark, :boolean
  end
end
