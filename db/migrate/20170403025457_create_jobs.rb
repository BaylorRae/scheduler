class CreateJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :jobs do |t|
      t.belongs_to :user
      t.string :command
      t.string :dyno_size
      t.string :frequency
      t.datetime :last_run
      t.datetime :next_due
      t.time :run_at

      t.timestamps
    end
  end
end
