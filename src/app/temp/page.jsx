'use client'

import React, { useState } from 'react'

const MultiTabForm = () => {
  // Form state for all tabs
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [addressInfo, setAddressInfo] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  })

  const [employmentInfo, setEmploymentInfo] = useState({
    company: '',
    position: '',
    experience: '',
    salary: '',
  })

  // Active tab state
  const [activeTab, setActiveTab] = useState(0)

  // Tab switching handler
  const handleTabSwitch = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      personal: personalInfo,
      address: addressInfo,
      employment: employmentInfo,
    }
    console.log('Form submitted:', formData)
  }

  // Styles
  const styles = {
    container: {
      backgroundColor: 'white',
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: 'black',
    },
    tabList: {
      display: 'flex',
      listStyle: 'none',
      padding: 0,
      margin: '0 0 20px 0',
      borderBottom: '1px solid #ccc',
    },
    tab: {
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ccc',
      borderBottom: 'none',
      marginRight: '5px',
      borderRadius: '4px 4px 0 0',
    },
    activeTab: {
      backgroundColor: '#fff',
      borderBottom: '1px solid #fff',
      marginBottom: '-1px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      fontWeight: 'bold',
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  }

  return (
    <div style={styles.container}>
      <ul style={styles.tabList}>
        <li
          style={{
            ...styles.tab,
            ...(activeTab === 0 ? styles.activeTab : {}),
          }}
          onClick={() => handleTabSwitch(0)}
        >
          Personal Info
        </li>
        <li
          style={{
            ...styles.tab,
            ...(activeTab === 1 ? styles.activeTab : {}),
          }}
          onClick={() => handleTabSwitch(1)}
        >
          Address
        </li>
        <li
          style={{
            ...styles.tab,
            ...(activeTab === 2 ? styles.activeTab : {}),
          }}
          onClick={() => handleTabSwitch(2)}
        >
          Employment
        </li>
      </ul>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >
        {/* Personal Info Tab */}
        {activeTab === 0 && (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                type='text'
                style={styles.input}
                value={personalInfo.firstName}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                type='text'
                style={styles.input}
                value={personalInfo.lastName}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type='email'
                style={styles.input}
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type='tel'
                style={styles.input}
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

        {/* Address Tab */}
        {activeTab === 1 && (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Street Address</label>
              <input
                type='text'
                style={styles.input}
                value={addressInfo.street}
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    street: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input
                type='text'
                style={styles.input}
                value={addressInfo.city}
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>State</label>
              <input
                type='text'
                style={styles.input}
                value={addressInfo.state}
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    state: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Zip Code</label>
              <input
                type='text'
                style={styles.input}
                value={addressInfo.zipCode}
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    zipCode: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

        {/* Employment Tab */}
        {activeTab === 2 && (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Company</label>
              <input
                type='text'
                style={styles.input}
                value={employmentInfo.company}
                onChange={(e) =>
                  setEmploymentInfo({
                    ...employmentInfo,
                    company: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Position</label>
              <input
                type='text'
                style={styles.input}
                value={employmentInfo.position}
                onChange={(e) =>
                  setEmploymentInfo({
                    ...employmentInfo,
                    position: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Years of Experience</label>
              <input
                type='number'
                style={styles.input}
                value={employmentInfo.experience}
                onChange={(e) =>
                  setEmploymentInfo({
                    ...employmentInfo,
                    experience: e.target.value,
                  })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Expected Salary</label>
              <input
                type='number'
                style={styles.input}
                value={employmentInfo.salary}
                onChange={(e) =>
                  setEmploymentInfo({
                    ...employmentInfo,
                    salary: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

        <button
          type='submit'
          style={styles.button}
        >
          Submit Form
        </button>
      </form>
    </div>
  )
}

export default MultiTabForm
