class AddAuthorToUsers < ActiveRecord::Migration
  def change
    add_column :users, :author, :string
  end
end
