class Idea < ActiveRecord::Base
  default_scope {order("ID ASC")}
end
