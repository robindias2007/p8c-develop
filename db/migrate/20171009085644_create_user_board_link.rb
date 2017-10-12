class CreateUserBoardLink < ActiveRecord::Migration
  def change
    create_table :user_form_links do |t|
    	t.references :user
    	t.references :form
    	t.boolean :link_1, :default => false
	    t.boolean :link_2, :default => false
	    t.boolean :link_3, :default => false
	    t.boolean :link_4, :default => false
	    t.boolean :link_5, :default => false
	    t.float :progress

	    t.timestamps null: false
    end
  end
end
