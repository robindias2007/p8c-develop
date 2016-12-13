class AddPublishToForms < ActiveRecord::Migration
  def change
    add_column :forms, :publish, :boolean
  end
end
