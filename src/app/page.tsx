'use client'

import { useEffect, useState } from 'react'
import {
  ConfigType,
  ErrorType,
  FormDataType,
  TabConfigType,
} from '@/types/tab-form'
import dynamic from 'next/dynamic'
import MultiStepProgressBar from './progressbar/page'

const Interest = dynamic(() => import('@/components/tab-form/Interests'))
const Profile = dynamic(() => import('@/components/tab-form/Profile'))
const Settings = dynamic(() => import('@/components/tab-form/Settings'))
const AutoComplete = dynamic(() => import('@/app/autocomplete/page'))
const Matrix = dynamic(() => import('@/app/dfs-bfs/page'))
const Iframe = dynamic(() => import('@/app/iframe/page'))
const Temp = dynamic(() => import('@/app/temp/page'))
const ReactCopyToClipboard = dynamic(
  () => import('@/app/react-copy-to-clipboard/page')
)
const About = dynamic(() => import('@/app/about/page'))
const Carousel = dynamic(() => import('@/app/carousel/page'))
const EmailInput = dynamic(() => import('@/app/email-input/page'))
const Http2 = dynamic(() => import('@/app/http2/page'))
const InfiniteScroll = dynamic(() => import('@/app/infinite-scroll/page'))
const WebcamComponent = dynamic(() => import('@/app/react-webcam/page'))
const Login = dynamic(() => import('./login/page'))
const PollWidget = dynamic(() => import('./poll-widget/page'))

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
      name: 'Poll Widget',
      component: PollWidget,
    },
    {
      name: 'About',
      component: About,
    },
    {
      name: 'AutoComplete',
      component: AutoComplete,
    },
    {
      name: 'Carousel',
      component: Carousel,
    },

    {
      name: 'Matrix',
      component: Matrix,
    },
    {
      name: 'EmailInput',
      component: EmailInput,
    },
    {
      name: 'Http2',
      component: Http2,
    },
    {
      name: 'Iframe',
      component: Iframe,
    },
    {
      name: 'InfiniteScroll',
      component: InfiniteScroll,
    },
    {
      name: 'Login',
      component: Login,
    },
    {
      name: 'ReactCopyToClipboard',
      component: ReactCopyToClipboard,
    },
    {
      name: 'WebcamComponent',
      component: WebcamComponent,
    },
    {
      name: 'MultiStepProgressBar',
      component: MultiStepProgressBar,
    },
    {
      name: 'Temp',
      component: Temp,
    },
  ])

  // useEffect(() => {
  //   setTabIndex(tabConfig.length - 1)
  // }, [tabConfig.length])

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
        <ActiveTabComponent
          data={data}
          setData={setData}
          errors={errors}
        />
      </div>
    </div>
  )
}

export default TabForm
