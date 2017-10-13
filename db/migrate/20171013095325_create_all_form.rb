class CreateAllForm < ActiveRecord::Migration
  	def self.up
		create_table :all_forms do |t|
	    	t.string :forms_type
	    	t.string :form_ids

	    	t.timestamps null: false
    	end


	  # populate the table
	  AllForm.create :forms_type => "t_b", :form_ids => []
	  AllForm.create :forms_type => "s_b", :form_ids => []
	  AllForm.create :forms_type => "m_v_b", :form_ids => []
	  AllForm.create :forms_type => "m_sa_b", :form_ids => []
	  AllForm.create :forms_type => "m_l_b", :form_ids => []
	  AllForm.create :forms_type => "m_r_b", :form_ids => []
	  AllForm.create :forms_type => "m_sh_b", :form_ids => []
	  AllForm.create :forms_type => "m_p_b", :form_ids => []
    end

    def self.down
      drop_table :all_forms
    end
end
