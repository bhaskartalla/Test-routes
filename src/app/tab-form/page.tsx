'use client'

import { useEffect, useState } from 'react'
import {
  ConfigType,
  ErrorType,
  FormDataType,
  TabConfigType,
} from '@/types/tab-form'

import './styles.css'

import Interest from '@/components/tab-form/Interests'
import Profile from '@/components/tab-form/Profile'
import Settings from '@/components/tab-form/Settings'
import AutoComplete from '../autocomplete/page'
import Matrix from '../dfs-bfs/page'
import Iframe from '../iframe/page'
import { Login } from '@mui/icons-material'

const TabForm = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [data, setData] = useState<FormDataType>({
    name: '',
    age: 0,
    email: '',
    interests: [],
    gender: '',
  })
  const [errors, setErrors] = useState<ErrorType>({
    age: '',
    email: '',
    gender: '',
    interests: '',
    name: '',
  })

  const [tabConfig, setTabConfig] = useState<TabConfigType>([
    {
      name: 'Profile',
      component: Profile,
      validate: () => {
        const error = { name: '', age: '', email: '' }
        if (!data.name) {
          error.name = 'Name is not valid'
        }
        if (!data.age) {
          error.age = 'Age is not valid'
        }
        if (!data.email) {
          error.email = 'Email is not valid'
        }
        setErrors((prev) => ({ ...prev, ...error }))
        return error.name || error.age || error.email
      },
    },
    {
      name: 'Interest',
      component: Interest,
      validate: function () {
        let error = ''
        if (!data.interests.length) {
          error = 'Please select atleast on interest'
        }

        setErrors((prev) => ({
          ...prev,
          interests: error,
        }))
        return !!error
      },
    },
    {
      name: 'Settings',
      component: Settings,
      validate: function () {
        let error = ''
        if (!data.gender) {
          error = 'Please select gender'
        }
        setErrors((prev) => ({
          ...prev,
          gender: error,
        }))

        return !!error
      },
    },
    {
      name: 'AutoComplete',
      component: AutoComplete,
      validate: () => true,
    },
    // {
    //   name: 'Iframe',
    //   component: Iframe,
    //   validate: () => true,
    // },
    // {
    //   name: 'Login',
    //   component: Login,
    //   validate: () => true,
    // },
    // {
    //   name: 'Matrix',
    //   component: Matrix,
    //   validate: () => true,
    // },
  ])

  useEffect(() => {
    console.log('🚀 ~ TabForm ~ tabConfig:', tabConfig)
    setTabIndex(tabConfig.length - 1)
  }, [tabConfig.length])

  const handlePrevClick = () => {
    setTabIndex((prev) => prev - 1)
  }

  const handleNextClick = () => {
    if (!tabConfig[tabIndex].validate()) {
      setTabIndex((prev) => prev + 1)
    }
  }

  const handleSubmitClick = () => {
    if (!tabConfig[tabIndex].validate()) {
      console.log({ data })
    }
  }

  const handleAddNewTab = () => {
    setTabConfig((prev) => [
      ...prev,
      {
        name: 'New Tab',
        component: () => <>New Component</>,
        validate: () => true,
      },
    ])
  }

  const ActiveTabComponent = tabConfig[tabIndex].component

  return (
    <div className='main'>
      <ul className='tab-list'>
        {tabConfig.map((tab: ConfigType, index: number) => (
          <li
            key={index}
            className={`tab ${index === tabIndex ? 'active-tab' : ''}`}
            onClick={() => setTabIndex(index)}
          >
            {tab.name}
          </li>
        ))}
        <li>
          <div
            onClick={handleAddNewTab}
            className='add-tab'
          ></div>
        </li>
      </ul>
      <div className='tab-nativation-body'>
        {
          <ActiveTabComponent
            data={data}
            setData={setData}
            errors={errors}
          />
        }
      </div>
      <div className='tab-nativation-footer'>
        {tabIndex > 0 && (
          <button
            className='navigate-button'
            onClick={handlePrevClick}
          >
            Prev
          </button>
        )}
        {tabIndex < tabConfig.length - 1 && (
          <button
            className='navigate-button'
            onClick={handleNextClick}
          >
            Next
          </button>
        )}
        {tabIndex === tabConfig.length - 1 && (
          <button
            className='navigate-button'
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default TabForm
