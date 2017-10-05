class AddStaffPicksToForms < ActiveRecord::Migration
  def change
    add_column :forms, :staff_picks, :boolean
  end
end
