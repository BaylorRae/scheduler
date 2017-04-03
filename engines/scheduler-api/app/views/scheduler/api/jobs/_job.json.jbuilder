json.(job,
      :command,
      :dyno_size,
      :frequency,
      :last_run,
      :next_due
)
json.run_at job.run_at.strftime("%H:%M")
