import React, { Component } from 'react'
import '../Home/Home.css'

const Instruction = (props) => {
  return (
    <div style={{paddingTop: '20px'}}>
      <h2 className="home-container-h2">Instructions</h2>
      <p className="home-container-p">The exploration tab allows for the general overview of the database as based on the selection and visual variables of your choice. By default the entire database will be selected; however, should you wish to select a different, specific cohort that option is also available.</p>
      <p className="home-container-p">Information that has been greyed out or is faint in colour is not selected by default in this section. Should you wish to include or exclude information please select or deselect the respective option. Options selected or deselected in the selection criteria determine the cohort of your choosing. The more options selected, often the fewer results, the less the more.</p>
      <p className="home-container-p">All or None buttons within the visual options will quick select all or none of the options within a section, respectfully. Other sections will also have an option for a specific variable type. Certain variables are measured multiple times per intensive care unit (ICU) stay and require either a selection among Admission, Discharge, Minimum, Maximum, or Average values from the ICU stay. This will apply that option to the entire section of variables. By default Admission is the default selection option in this circumstance.</p>
      <p className="home-container-p">In order to process or complete the visualization please follow the steps below:</p>
      <ul>
        <li>Select a patient cohort by selecting the criteria of your choosing in the appropriate Selection Criteria panel below</li>
        <li>Select the variables that you wish to be visualized through selecting or deselecting options under the respective category</li>
        <li>Click the Plot button. The process should take approximately a minute to complete, should it take longer please try again and refresh the page</li>
        <li>The visuals in this section are displayed through a histogram for count data and pie charts for categorical data</li>
        <li>Should you wish to visualize a different cohort, please follow the steps one through four again</li>
      </ul>
    </div>
  )
}

export default Instruction
