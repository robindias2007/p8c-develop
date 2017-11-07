class AddHostToForm < ActiveRecord::Migration
  def change
  	add_column :forms, :host1, :string
  	add_column :forms, :host2, :string
  	add_column :forms, :host3, :string
  	add_column :forms, :host4, :string
  	add_column :forms, :host5, :string
  end
end
