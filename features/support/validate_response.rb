class ValidateResponse
  include RSpec::Matchers

  attr_reader :response

  delegate :status_code, to: Rack::Utils

  def initialize(response)
    @response = response
  end

  def self.with(response)
    new(response)
  end

  def expect_status(status)
    expect(status_code(response.status)).to eq(status_code(status))
    self
  end

  def expect_schema(schema)
    errors = JSON::Validator.fully_validate(schema, response.body, strict: true)

    if errors.any?
      raise RSpec::Expectations::ExpectationNotMetError.new(errors)
    end

    self
  end

  def expect_body(body)
    expect(JSON.parse(response.body)).to eq(body)
    self
  end

end
