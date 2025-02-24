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
import Temp from '../temp/page'

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
    },
    {
      name: 'Interest',
      component: Interest,
    },
    {
      name: 'Settings',
      component: Settings,
    },
    {
      name: 'AutoComplete',
      component: AutoComplete,
    },
    {
      name: 'Temp',
      component: Temp,
    },
    // {
    //   name: 'Iframe',
    //   component: Iframe,
    // },
    // {
    //   name: 'Login',
    //   component: Login,
    // },
    // {
    //   name: 'Matrix',
    //   component: Matrix,
    // },
  ])

  useEffect(() => {
    console.log('🚀 ~ TabForm ~ tabConfig:', tabConfig)
    setTabIndex(tabConfig.length - 1)
  }, [tabConfig.length])

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

  const handleRemoveExistingTab = (name: string) => {
    console.log('🚀 ~ handleRemoveExistingTab ~ name:', name)
    setTabConfig((prev) => prev.filter((tab) => tab.name !== name))
  }

  const ActiveTabComponent =
    tabConfig[tabIndex]?.component ??
    function () {
      return <>Empty </>
    }

  return (
    <div className='main'>
      <div className='tab-list-main'>
        <ul className='tab-list'>
          {tabConfig.map((tab: ConfigType, index: number) => (
            <li
              key={index}
              className={`tab ${index === tabIndex ? 'active-tab' : ''}`}
              onClick={() => setTabIndex(index)}
            >
              <div>
                {tab.name}
                <div
                  className='close-icon'
                  onClick={() => handleRemoveExistingTab(tab.name)}
                />
              </div>
            </li>
          ))}
          <li>
            <div
              onClick={handleAddNewTab}
              className='add-tab'
            ></div>
          </li>
        </ul>
        <div
          id='under-line'
          className='under-line'
        ></div>
      </div>

      <div className='tab-nativation-body'>
        {
          <ActiveTabComponent
            data={data}
            setData={setData}
            errors={errors}
          />
        }
      </div>
    </div>
  )
}

export default TabForm
