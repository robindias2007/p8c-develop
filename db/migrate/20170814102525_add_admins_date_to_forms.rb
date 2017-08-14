class AddAdminsDateToForms < ActiveRecord::Migration
  def change
    add_column :forms, :admins_date, :datetime
  end
end
