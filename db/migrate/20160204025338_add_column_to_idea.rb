class AddColumnToIdea < ActiveRecord::Migration
  def change
    add_column :ideas, :tags, :string
  end
end
