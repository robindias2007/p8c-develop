class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.string :title
      t.string :description
      t.string :url1
      t.string :url2
      t.string :url3

      t.timestamps null: false
    end
  end
end
