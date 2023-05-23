import {Component} from 'react'
import './index.css'

class EmploymentSalary extends Component {
  state = {
    array: [],
  }

  render() {
    const {
      salaryRangesList,
      employmentTypesList,
      passRadioValue,
      passCheckBoxValue,
    } = this.props

    const {array} = this.state

    return (
      <div className="employment-salary-card">
        <hr className="line" />
        <h1 className="list-heading-element">Type of Employment</h1>
        <ul className="list-container">
          {employmentTypesList.map(eachEmployment => {
            this.getValues = event => {
              const {target} = event
              const {value} = target
              if (event.target.checked === true) {
                const arg = [...array, value]
                this.setState(
                  {
                    array: [...array, value],
                  },
                  passCheckBoxValue(arg.join()),
                )
              } else {
                const arr = [...array]
                const val = array.find(item => item === value)
                const newArray = arr.filter(eachItem => eachItem !== val)
                this.setState(
                  {
                    array: [...newArray],
                  },
                  passCheckBoxValue(newArray.join()),
                )
              }
            }

            return (
              <li className="list-item">
                <input
                  onChange={this.getValues}
                  value={eachEmployment.employmentTypeId}
                  id={eachEmployment.employmentTypeId}
                  type="checkBox"
                  className="checkbox-element"
                />
                <label
                  className="labels"
                  htmlFor={eachEmployment.employmentTypeId}
                >
                  {eachEmployment.label}
                </label>
              </li>
            )
          })}
        </ul>

        <hr className="line" />
        <h1 className="list-heading-element">Salary Range</h1>
        <ul className="list-container">
          {salaryRangesList.map(eachSalaryRange => {
            this.getValue = event => {
              passRadioValue(event.target.value)
            }

            return (
              <li className="list-item">
                <input
                  className="radio-element"
                  onChange={this.getValue}
                  value={eachSalaryRange.salaryRangeId}
                  id={eachSalaryRange.salaryRangeId}
                  type="radio"
                  name="salaryInfo"
                />
                <label
                  className="labels"
                  htmlFor={eachSalaryRange.salaryRangeId}
                >
                  {eachSalaryRange.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default EmploymentSalary
