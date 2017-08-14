class AddAdminsDateToForms < ActiveRecord::Migration
  def change
    add_column :forms, :admins_date, :date
  end
end
