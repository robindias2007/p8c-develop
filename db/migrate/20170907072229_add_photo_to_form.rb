class AddPhotoToForm < ActiveRecord::Migration
  def up
    add_attachment :forms, :photo
  end
 
  def down
    remove_attachment :forms, :photo
  end
end
