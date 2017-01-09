class AddDescription1Description2Description3Description4Description5ToForms < ActiveRecord::Migration
  def change
    add_column :forms, :description1, :string
    add_column :forms, :description2, :string
    add_column :forms, :description3, :string
    add_column :forms, :description4, :string
    add_column :forms, :description5, :string
  end
end
