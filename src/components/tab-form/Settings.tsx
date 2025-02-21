import { FormPropType } from '@/types/tab-form'

const Settings = ({ data, setData, errors }: FormPropType) => {
  const { gender } = data
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, gender: event.target.name }))
  }

  return (
    <div className='settings-main'>
      <h3>Settings</h3>
      <div className='settings-list'>
        <label htmlFor='male'>
          <input
            type='radio'
            name='male'
            id='male'
            value='male'
            checked={gender === 'male'}
            onChange={handleRadioChange}
          />
          Male
        </label>

        <label htmlFor='female'>
          <input
            type='radio'
            name='female'
            id='female'
            value='female'
            checked={gender === 'female'}
            onChange={handleRadioChange}
          />
          Female
        </label>
        {errors.gender && <span className='error'>{errors.gender}</span>}
      </div>
    </div>
  )
}

export default Settings
