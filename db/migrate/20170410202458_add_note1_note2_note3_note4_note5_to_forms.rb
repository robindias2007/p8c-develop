class AddNote1Note2Note3Note4Note5ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :note1, :string
    add_column :forms, :note2, :string
    add_column :forms, :note3, :string
    add_column :forms, :note4, :string
    add_column :forms, :note5, :string
  end
end
