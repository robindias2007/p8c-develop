class CreateUserFormBookmarks < ActiveRecord::Migration
  def change
    create_table :user_form_bookmarks do |t|
    	t.references :user
    	t.references :form
    	
      t.timestamps null: false
    end
  end
end
