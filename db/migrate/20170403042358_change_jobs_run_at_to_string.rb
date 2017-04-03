class ChangeJobsRunAtToString < ActiveRecord::Migration[5.0]
  def up
    change_column :jobs, :run_at, :string
  end

  def down
    change_column :jobs, :run_at, :time
  end
end
