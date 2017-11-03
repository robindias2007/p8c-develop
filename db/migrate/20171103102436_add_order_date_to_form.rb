class AddOrderDateToForm < ActiveRecord::Migration
  def change
  	add_column :forms, :order_date, :datetime
  end
end
