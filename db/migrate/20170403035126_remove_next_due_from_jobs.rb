class RemoveNextDueFromJobs < ActiveRecord::Migration[5.0]
  def up
    remove_column :jobs, :next_due
  end

  def down
    add_column :jobs, :next_due, :datetime
  end
end
