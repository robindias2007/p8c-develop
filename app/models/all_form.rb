class AllForm < ActiveRecord::Base
	serialize :form_ids, Array
end